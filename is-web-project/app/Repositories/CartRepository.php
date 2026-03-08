<?php


namespace App\Repositories;

use App\Models;
use App\Repositories\ICartRepository;
use Illuminate\Support\Facades\DB;

class CartRepository implements ICartRepository
{
    public function getCartInfo($userId)
    {
        $cart = DB::select('
            select p.product_name, p.base_price, p.sale_price, ci.quantity, ci.*, pv.additional_price, pi.image_url, pi.alt_text 
            from carts c 
            join cart_items ci on c.cart_id = ci.cart_id
            join products p on ci.product_id = p.product_id
            join product_variants pv on pv.variant_id = ci.variant_id
            left join product_images pi on p.product_id = pi.product_id and pi.is_primary = 1
            where c.user_id = :userId
        ', ['userId' => $userId]);
        if (empty($cart) || count($cart) === 0)
            return null;
        return $cart;
    }
    public function calculateCartTotalPrice(array $cartItems)
    {
        $totalPrice = 0;
        foreach ($cartItems as $item) {
            $item_additional = $item->additional_price ?? ($item->additionnal_price ?? 0);
            $totalPrice += ($item->sale_price + $item_additional) * $item->quantity;
        }
        return $totalPrice;
    }
}
