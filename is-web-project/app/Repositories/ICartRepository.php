<?php

namespace App\Repositories;

interface ICartRepository
{
    public function getCartInfo($userId);

    public function calculateCartTotalPrice(array $cartItems);
}
