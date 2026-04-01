<?php

namespace App\Repositories;

class ManagerRepository
{
    public function __construct()
    {
        $this->cartrepository = new CartRepository;
        $this->productrepository = new ProductRepository;
        $this->categoryrepository = new CategoryRepository;
        $this->promotionrepository = new PromotionRepository;
    }

    public $cartrepository;

    public $productrepository;

    public $categoryrepository;

    public $promotionrepository;
}
