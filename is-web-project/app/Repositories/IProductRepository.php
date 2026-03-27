<?php

namespace App\Repositories;

interface IProductRepository
{
    public function getTitleRecomendedProducts(int $limit, int $last_id = 0);

    public function getTitleProductsByCategory(string $slug, int $limit, int $last_id = 0);

    public function getProductByID(int $product_id);

    public function calculatePriceForListProductVariants(array $products);

    public function searchMobile(
        ?string $slug = null,
        ?string $keyword = null,
        ?array $color = null,
        ?array $ram = null,
        ?array $storage = null,
        ?array $processor = null,
        ?array $display = null,
        ?float $min_price = null,
        ?float $max_price = null,
        int $last_id = 0,
        int $limit = 20,
        string $sort = 'desc' // 'asc' or 'desc'
    );

    public function searchTV(
        ?string $slug = null,
        ?string $keyword = null,
        ?array $resolution = null,      // e.g. ['4K UHD', '8K UHD']
        ?array $technology = null,      // e.g. ['OLED', 'QLED']
        ?array $processor = null,       // e.g. ['α9 Gen6 AI Processor', 'Neural Quantum Processor 4K']
        ?array $screenSize = null,      // e.g. ['55-inch', '65-inch']
        ?float $min_price = null,
        ?float $max_price = null,
        int $last_id = 0,
        int $limit = 20,
        string $sort = 'desc'           // 'asc' or 'desc'
    );

    public function searchComputing(
        ?string $slug = null,
        ?string $keyword = null,
        ?array $battery = null,         // e.g. ['76Wh', '63Wh']
        ?array $graphics = null,        // CHANGED: was 'graphic' → now 'graphics'
        ?array $ram = null,
        ?array $storage = null,
        ?array $processor = null,
        ?array $color = null,
        ?float $min_price = null,
        ?float $max_price = null,
        int $last_id = 0,
        int $limit = 20,
        string $sort = 'desc'
    );

    public function searchAll(
        ?string $keyword = null,
        ?float $min_price = null,
        ?float $max_price = null,
        int $last_id = 0,
        int $limit = 20,
        string $sort = 'none',
        ?array $child_slugs = null
    );

    public function getProductImages(int $product_id): array;
}
