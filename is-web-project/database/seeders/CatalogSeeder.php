<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CatalogSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('brands')->updateOrInsert(
            ['slug' => 'samsung'],
            [
                'brand_name' => 'Samsung',
                'logo_url' => 'https://images.samsung.com/is/image/samsung/assets/global/about-samsung/brand/logo/360_197_1.png',
                'descriptions' => 'Samsung Electronics brand profile',
                'website_url' => 'https://www.samsung.com',
                'created_at' => now(),
            ]
        );

        $brandId = DB::table('brands')->where('slug', 'samsung')->value('brand_id');

        $parentCategories = [
            [
                'slug' => 'mobile',
                'category_name' => 'Mobile',
                'descriptions' => 'Samsung mobile products',
                'display_order' => 1,
            ],
            [
                'slug' => 'tv-av',
                'category_name' => 'TV & AV',
                'descriptions' => 'Samsung TV and AV products',
                'display_order' => 2,
            ],
            [
                'slug' => 'computing-displays',
                'category_name' => 'Computing & Displays',
                'descriptions' => 'Samsung computing devices',
                'display_order' => 3,
            ],
        ];

        foreach ($parentCategories as $category) {
            DB::table('categories')->updateOrInsert(
                ['slug' => $category['slug']],
                [
                    'category_name' => $category['category_name'],
                    'parent_id' => null,
                    'descriptions' => $category['descriptions'],
                    'display_order' => $category['display_order'],
                    'created_at' => now(),
                ]
            );
        }

        $childCategories = [
            ['slug' => 'galaxy-smartphone', 'name' => 'Galaxy Smartphone', 'parent_slug' => 'mobile', 'order' => 1],
            ['slug' => 'premium-flagship-tvs', 'name' => 'Premium & Flagship TVs', 'parent_slug' => 'tv-av', 'order' => 1],
            ['slug' => 'galaxy-book-laptop', 'name' => 'Galaxy Book & Laptop', 'parent_slug' => 'computing-displays', 'order' => 1],
        ];

        foreach ($childCategories as $child) {
            $parentId = DB::table('categories')->where('slug', $child['parent_slug'])->value('category_id');
            DB::table('categories')->updateOrInsert(
                ['slug' => $child['slug']],
                [
                    'category_name' => $child['name'],
                    'parent_id' => $parentId,
                    'descriptions' => $child['name'],
                    'display_order' => $child['order'],
                    'created_at' => now(),
                ]
            );
        }

        $products = [
            [
                'slug' => 'galaxy-s24-ultra',
                'sku' => 'SM-S24U-256-BLK',
                'product_name' => 'Galaxy S24 Ultra',
                'base_price' => 29990000,
                'sale_price' => 27990000,
                'stock_quantity' => 120,
                'is_featured' => true,
                'category_slug' => 'galaxy-smartphone',
                'image_url' => '/images/products/galaxy-s24-ultra.webp',
                'specification' => [
                    'processor' => 'Snapdragon 8 Gen 3',
                    'display' => '6.8-inch QHD+',
                    'battery' => '5000mAh',
                    'graphics' => 'Adreno 750',
                ],
                'variant' => [
                    'sku' => 'SM-S24U-256-BLK-V1',
                    'name' => '12GB / 256GB Black',
                    'attributes' => ['ram' => '12GB', 'storage' => '256GB', 'color' => 'Black'],
                ],
            ],
            [
                'slug' => 'neo-qled-8k-qn900d',
                'sku' => 'TV-QN900D-65',
                'product_name' => 'Neo QLED 8K QN900D',
                'base_price' => 89990000,
                'sale_price' => 84990000,
                'stock_quantity' => 30,
                'is_featured' => true,
                'category_slug' => 'premium-flagship-tvs',
                'image_url' => '/images/products/neo-qled-8k-qn900d.webp',
                'specification' => [
                    'resolution' => '8K UHD',
                    'technology' => 'Neo QLED',
                    'processor' => 'NQ8 AI Gen3 Processor',
                ],
                'variant' => [
                    'sku' => 'TV-QN900D-65-V1',
                    'name' => '65-inch',
                    'attributes' => ['screen_size' => '65-inch'],
                ],
            ],
            [
                'slug' => 'galaxy-book4-ultra',
                'sku' => 'NP960XGL-X01VN',
                'product_name' => 'Galaxy Book4 Ultra',
                'base_price' => 52990000,
                'sale_price' => 49990000,
                'stock_quantity' => 45,
                'is_featured' => false,
                'category_slug' => 'galaxy-book-laptop',
                'image_url' => '/images/products/galaxy-book4-ultra.webp',
                'specification' => [
                    'battery' => '76Wh',
                    'graphics' => 'NVIDIA RTX 4050',
                    'processor' => 'Intel Core Ultra 9',
                ],
                'variant' => [
                    'sku' => 'NP960XGL-X01VN-V1',
                    'name' => '16GB / 1TB Gray',
                    'attributes' => ['ram' => '16GB', 'storage' => '1TB', 'processor' => 'Intel Core Ultra 9', 'color' => 'Gray'],
                ],
            ],
        ];

        foreach ($products as $product) {
            DB::table('products')->updateOrInsert(
                ['slug' => $product['slug']],
                [
                    'product_name' => $product['product_name'],
                    'sku' => $product['sku'],
                    'brand_id' => $brandId,
                    'short_description' => $product['product_name'],
                    'full_description' => $product['product_name'],
                    'specification' => json_encode($product['specification']),
                    'base_price' => $product['base_price'],
                    'sale_price' => $product['sale_price'],
                    'cost_price' => $product['base_price'] * 0.7,
                    'stock_quantity' => $product['stock_quantity'],
                    'is_featured' => $product['is_featured'],
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );

            $productId = DB::table('products')->where('slug', $product['slug'])->value('product_id');
            $categoryId = DB::table('categories')->where('slug', $product['category_slug'])->value('category_id');

            DB::table('product_categories')->updateOrInsert(
                ['product_id' => $productId, 'category_id' => $categoryId],
                ['product_id' => $productId, 'category_id' => $categoryId]
            );

            DB::table('product_images')->updateOrInsert(
                ['product_id' => $productId, 'display_order' => 0],
                [
                    'variant_id' => null,
                    'image_url' => $product['image_url'],
                    'alt_text' => $product['product_name'],
                    'is_primary' => true,
                ]
            );

            DB::table('product_variants')->updateOrInsert(
                ['sku' => $product['variant']['sku']],
                [
                    'product_id' => $productId,
                    'variant_name' => $product['variant']['name'],
                    'attributes' => json_encode($product['variant']['attributes']),
                    'additional_price' => 0,
                    'stock_quantity' => $product['stock_quantity'],
                ]
            );
        }
    }
}
