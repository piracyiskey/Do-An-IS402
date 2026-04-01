<?php

namespace App\Repositories;

use App\Models\Promotion;

interface IPromotionRepository
{
    public function calculateDiscount(Promotion $promotion, float $amount);
}
