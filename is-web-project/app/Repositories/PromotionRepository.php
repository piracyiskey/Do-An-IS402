<?php

namespace App\Repositories;

use App\Models\Promotion;

class PromotionRepository implements IPromotionRepository
{
    public function calculateDiscount(Promotion $promotion, float $amount)
    {
        $max_discount = $promotion->max_discount_amount ?? PHP_FLOAT_MAX;
        if ($promotion->discount_type === 'percentage') {
            return min($max_discount, $amount * ($promotion->discount_value / 100));
        } elseif ($promotion->discount_type === 'fixed_amount') {
            return min($max_discount, $promotion->discount_value);
        }

        return 0;
    }
}
