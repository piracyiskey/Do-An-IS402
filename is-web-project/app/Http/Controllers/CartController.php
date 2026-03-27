<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use App\Models\CartItem;
use App\Repositories\ICartRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CartController extends Controller
{
    protected $cartRepository;

    public function __construct(ICartRepository $cartRepository)
    {
        $this->cartRepository = $cartRepository;
    }

    public function cart(Request $request)
    {
        $cartItems = $this->cartRepository->getCartInfo($request->user()->getKey());
        if (empty($cartItems) || count($cartItems) === 0) {
            return response()->json([
                'success' => false,
                'message' => 'Cart is empty.',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $cartItems,
            'total_price' => $this->cartRepository->calculateCartTotalPrice($cartItems),
        ]);
    }

    public function addItem(Request $request)
    {
        // Validate the request
        $validated = $request->validate([
            'product_id' => 'required',
            'variant_id' => 'required',
            'quantity' => 'required|integer|min:1',
        ]);

        // Get the authenticated user
        $user = $request->user();

        // Find or create the cart for the user
        $cart = Cart::firstOrCreate(
            ['user_id' => $user->getKey()],
            ['created_at' => now(), 'updated_at' => now()]
        );
        // Check if the item (product_id and variant_id) already exists in the cart
        $cartItem = CartItem::where([
            'cart_id' => $cart->cart_id,
            'product_id' => $validated['product_id'],
            'variant_id' => $validated['variant_id'],
        ])->first();

        if ($cartItem) {
            // Update quantity if item exists
            $cartItem->update([
                'quantity' => $cartItem->quantity + $validated['quantity'],
            ]);
        } else {
            // Create new cart item
            CartItem::create([
                'cart_id' => $cart->cart_id,
                'product_id' => $validated['product_id'],
                'variant_id' => $validated['variant_id'],
                'quantity' => $validated['quantity'],
                'added_at' => now(),
            ]);
        }

        // API response
        return response()->json([
            'message' => 'Item added to cart',
            'product_id' => $validated['product_id'],
            'variant_id' => $validated['variant_id'],
            'quantity' => $validated['quantity'],
        ]);
    }

    public function removeFromCart(Request $request)
    {
        // Try to get cart_item_id from route parameter or request input
        $cart_item_id = $request->route('cart_item_id') ?? $request->input('cart_item_id');

        if (empty($cart_item_id)) {
            return response()->json([
                'success' => false,
                'message' => 'cart_item_id is required.',
            ], 422);
        }

        $cartItem = CartItem::where('cart_item_id', $cart_item_id)->first();
        if (! $cartItem) {
            return response()->json([
                'success' => false,
                'message' => 'Cart item not found.',
            ], 404);
        }

        $cartItem->delete();

        return response()->json([
            'success' => true,
            'message' => 'Cart item removed successfully.',
        ]);
    }

    public function clearCart(Request $request)
    {
        $user = $request->user();
        $cart = Cart::where('user_id', $user->getKey())->first();

        if (! $cart) {
            return response()->json([
                'success' => false,
                'message' => 'Cart not found.',
            ], 404);
        }

        DB::transaction(function () use ($cart) {
            CartItem::where('cart_id', $cart->cart_id)->delete();
        });

        return response()->json([
            'success' => true,
            'message' => 'Cart cleared successfully.',
        ]);
    }

    public function updateCartItemQuantity(Request $request)
    {
        $validated = $request->validate([
            'cart_item_id' => 'required',
            'quantity' => 'required|integer|min:1',
        ]);
        $cartItem = CartItem::where('cart_item_id', $validated['cart_item_id'])->first();
        if (! $cartItem) {
            return response()->json([
                'success' => false,
                'message' => 'Cart item not found.',
            ], 404);
        }

        // Update the cart item quantity
        $cartItem->update([
            'quantity' => $validated['quantity'],
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Cart item updated successfully.',
            'data' => $cartItem,
        ]);
    }
}
