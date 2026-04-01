<?php

namespace App\Http\Controllers;

use App\Models\Address;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Promotion;
use App\Repositories\ICartRepository;
use App\Repositories\PromotionRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    protected $cartRepository;

    protected $promotionRepository;

    public function __construct(ICartRepository $cartRepository, PromotionRepository $promotionRepository)
    {
        $this->cartRepository = $cartRepository;
        $this->promotionRepository = $promotionRepository;
    }

    public function createOrder(Request $request)
    {
        $data = $request->validate([
            'city' => 'required|string',
            'district' => 'required|string',
            'ward' => 'required|string',
            'address_type' => 'required|string|in:home,office,other',
            'address_line1' => 'required|string',
            'address_line2' => 'nullable|string',
            'receiver_name' => 'string',
            'receiver_phone' => 'required|string',
            'notes' => 'nullable|string',
            'promotion_codes' => 'nullable|array',
        ]);

        $address = Address::create([
            'user_id' => $request->user()->getKey(),
            'city' => $data['city'],
            'district' => $data['district'],
            'ward' => $data['ward'],
            'address_type' => $data['address_type'],
            'address_line1' => $data['address_line1'],
            'address_line2' => $data['address_line2'] ?? null,
            'receiver_name' => $data['receiver_name'] ?? null,
            'receiver_phone' => $data['receiver_phone'],
        ]);
        $cartItems = $this->cartRepository->getCartInfo($request->user()->getKey());
        $order_info = Order::create([
            'user_id' => $request->user()->getKey(),
            'status' => 'pending',
            'total_amount' => 0,
            'shipping_address' => $address->address_id,
            'payment_status' => 'pending',
            'created_at' => now(),
            'shipping_fee' => 10,
            'customer_note' => $data['notes'] ?? null,
            'subtotal' => 0,
            'shipping_address_id' => $address->address_id,
        ]);
        $order_total_price = 0;
        foreach ($cartItems as $item) {
            $item_additional = $item->additional_price ?? ($item->additionnal_price ?? 0);
            $total_item_price = ($item->sale_price + $item_additional) * $item->quantity;
            OrderItem::create([
                'order_id' => $order_info->order_id,
                'product_id' => $item->product_id,
                'variant_id' => $item->variant_id,
                'quantity' => $item->quantity,
                'created_at' => now(),
                'unit_price' => $item->sale_price + $item_additional,
                'total_price' => $total_item_price,
                'product_name' => $item->product_name,
            ]);
            $order_total_price += $total_item_price;
        }

        $promotionCodes = $data['promotion_codes'] ?? [];
        $total_discount = 0;
        foreach ($promotionCodes as $code) {
            $promotion = Promotion::where('promotion_code', $code)->firstOrFail();
            if ($promotion) {
                $total_discount += $this->promotionRepository->calculateDiscount($promotion, $order_total_price);
                Promotion::where('promotion_id', $promotion->promotion_id)->update([
                    'is_active' => 0,
                ]);
                DB::table('order_promotions')->insert([
                    'order_id' => $order_info->order_id,
                    'promotion_id' => $promotion->promotion_id,
                    'discount_applied' => $total_discount,
                ]);
            }
        }
        Order::where('order_id', $order_info->order_id)->update([
            'total_amount' => max(0, $order_total_price - $total_discount),
            'discount_amount' => $total_discount,
        ]);

        return response()->json([
            'message' => 'Order created successfully',
            'order_id' => $order_info->order_id,
            'total_amount' => max(0, $order_total_price - $total_discount),
            'discount_amount' => $total_discount,
        ], 201);
    }

    public function getAllUserOrders(Request $request)
    {
        $orders = Order::where('user_id', $request->user()->getKey())->get();

        return response()->json([
            'orders' => $orders,
        ], 200);
    }

    public function getOrderDetails(Request $request)
    {
        $order_id = $request->route('order_id') ?? $request->input('order_id');

        if (empty($order_id)) {
            return response()->json([
                'message' => 'order_id is required',
            ], 422);
        }

        $order = Order::where('order_id', $order_id)->first();
        if (! $order) {
            return response()->json([
                'message' => 'Order not found',
            ], 404);
        }
        $orderItems = OrderItem::where('order_id', $order_id)->get();

        return response()->json([
            'order' => $order,
            'items' => $orderItems,
        ], 200);
    }

    public function cancelOrder(Request $request)
    {
        $order_id = $request->route('order_id') ?? $request->input('order_id');

        if (empty($order_id)) {
            return response()->json([
                'message' => 'order_id is required',
            ], 422);
        }

        $order = Order::where('order_id', $order_id)->first();
        if (! $order) {
            return response()->json([
                'message' => 'Order not found',
            ], 404);
        }

        DB::transaction(function () use ($order_id, $order) {
            OrderItem::where('order_id', $order_id)->delete();
            $order->delete();
        });

        return response()->json([
            'message' => 'Order canceled successfully',
        ], 200);
    }
}
