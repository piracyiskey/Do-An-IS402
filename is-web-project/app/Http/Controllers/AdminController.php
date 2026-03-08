<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;

class AdminController extends Controller
{
    // Check if user is admin
    private function isAdmin($user)
    {
        return $user->hasAnyRole(['admin']);
    }

    // Get all orders (admin only)
    public function getAllOrders(Request $request)
    {
        $user = $request->user();
        if (!$this->isAdmin($user)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access.'
            ], 403);
        }

        $orders = Order::with('user')->orderBy('created_at', 'desc')->get();
        
        return response()->json([
            'success' => true,
            'orders' => $orders,
        ]);
    }

    // Get order details (admin only)
    public function getOrderDetails(Request $request, $order_id)
    {
        $user = $request->user();
        if (!$this->isAdmin($user)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access.'
            ], 403);
        }

        $order = Order::with('user')->where('order_id', $order_id)->first();
        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found.'
            ], 404);
        }

        $items = OrderItem::where('order_id', $order_id)->get();

        return response()->json([
            'success' => true,
            'order' => $order,
            'items' => $items,
        ]);
    }

    // Verify payment (admin only)
    public function is_pay(Request $request)
    {
        $user = $request->user();
        if (!$this->isAdmin($user)) {
            return response()->json([
                'success' => false,
                'message' => 'Unauthorized access.'
            ], 403);
        }
        
        $order_id = $request->query('order_id');
        if (!$order_id) {
            return response()->json([
                'success' => false,
                'message' => 'order_id is required.'
            ], 422);
        }

        $order = Order::where('order_id', $order_id)->first();
        if (!$order) {
            return response()->json([
                'success' => false,
                'message' => 'Order not found.'
            ], 404);
        }

        if ($order->payment_status === 'paid') {
            return response()->json([
                'success' => false,
                'message' => 'Order is already paid.'
            ], 400);
        }

        $order->update([
            'payment_status' => 'paid',
            'order_status' => 'processing',
        ]);

        $orderUser = $order->user;
        $points_per_dollar = $orderUser->membershipTier->points_per_dollar ?? 1;
        $received_points = round($order->total_amount * $points_per_dollar / 100);
        $orderUser->increment('reward_points', $received_points);

        return response()->json([
            'success' => true,
            'message' => 'Order marked as paid successfully.',
            'received_points' => $received_points,
            'user_email' => $orderUser->email,
            'new_points_balance' => $orderUser->reward_points,
        ]);
    }
}
