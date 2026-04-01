<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class ProductRepository implements IProductRepository
{
    public function getTitleRecomendedProducts(int $limit, int $last_id = 0): array
    {
        return DB::select('
            SELECT p.product_name, p.product_id, pi.image_url, pi.alt_text
            FROM products p
            JOIN product_images pi ON p.product_id = pi.product_id AND pi.is_primary = 1
            WHERE p.is_featured = 1 AND p.product_id > :last_id
            LIMIT :limit
        ', [
            'last_id' => $last_id,
            'limit' => $limit,
        ]);
    }

    public function getTitleProductsByCategory(string $slug, int $limit, int $last_id = 0): array
    {
        return DB::select('
        WITH target_category AS (
            SELECT category_id
            FROM categories
            WHERE slug = ?
            LIMIT 1
        )
        SELECT DISTINCT
            p.base_price,
            p.sale_price,
            p.product_name,
            p.product_id,
            pi.image_url,
            pi.alt_text
        FROM products p
        JOIN product_categories pc ON pc.product_id = p.product_id
        JOIN target_category tc ON pc.category_id = tc.category_id
        JOIN product_images pi ON pi.product_id = p.product_id AND pi.is_primary = 1
        WHERE p.product_id > ?
        ORDER BY p.product_id ASC
        LIMIT ?
    ', [$slug, $last_id, $limit]);
    }

    public function getProductByID(int $product_id): array
    {
        $products = DB::select('
            SELECT 
                p.product_name, p.slug, p.product_id, p.sku, p.brand_id, p.specification,
                p.base_price, p.sale_price, p.stock_quantity, p.weight, p.dimensions, 
                p.review_count, p.rating_avg, 
                pv.additional_price, pv.stock_quantity, pv.attributes, pv.variant_id
            FROM products p
            JOIN product_variants pv ON p.product_id = pv.product_id
            WHERE p.product_id = :product_id
        ', ['product_id' => $product_id]);

        return $products;
    }

    public function getProductImages(int $product_id): array
    {
        return DB::select('
            SELECT image_url, alt_text, is_primary
            FROM product_images
            WHERE product_id = :product_id
        ', ['product_id' => $product_id]);
    }

    public function searchAll(
        ?string $keyword = null,
        ?float $min_price = null,
        ?float $max_price = null,
        int $last_id = 0,
        int $limit = 20,
        string $sort = 'none',
        ?array $child_slugs = null
    ) {
        $query = '
        SELECT DISTINCT
            p.product_id,
            p.product_name,
            COALESCE(p.sale_price, p.base_price) AS price,
            pi.image_url
        FROM products p
        JOIN product_images pi 
            ON pi.product_id = p.product_id 
            AND pi.is_primary = 1
    ';

        $params = [];

        if (! empty($child_slugs)) {
            $placeholders = implode(',', array_fill(0, count($child_slugs), '?'));
            $query .= "
            JOIN product_categories pc ON pc.product_id = p.product_id
            JOIN categories c 
                ON c.category_id = pc.category_id 
                AND c.slug IN ($placeholders)
        ";
            $params = array_merge($params, $child_slugs);
        }

        $query .= '
        WHERE p.product_id > ?
        AND (? IS NULL OR LOWER(p.product_name) LIKE ?)
        AND COALESCE(p.sale_price, p.base_price) BETWEEN ? AND ?
    ';

        $params[] = $last_id;
        $params[] = $keyword;
        $params[] = $keyword ? '%'.strtolower($keyword).'%' : null;
        $params[] = $min_price ?? 0;
        $params[] = $max_price ?? 9999999999;

        if ($sort === 'asc' || $sort === 'desc') {
            $query .= ' ORDER BY COALESCE(p.sale_price, p.base_price) '.strtoupper($sort).', p.product_id DESC';
        } else {
            $query .= ' ORDER BY p.product_id DESC';
        }

        $query .= ' LIMIT ?';
        $params[] = $limit;

        return DB::select($query, $params);
    }

    public function calculatePriceForListProductVariants(array $products)
    {
        $totalPrice = 0;
        foreach ($products as $product) {
            $product->sale_price += ($product->sale_price ?? 0) + ($product->additional_price ?? 0);
            $product->base_price += ($product->base_price ?? 0) + ($product->additional_price ?? 0);
        }

        return $products;
    }

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
    ) {
        $query = "
    WITH target_category AS (
        SELECT category_id FROM categories WHERE slug = ? LIMIT 1
    )
    SELECT DISTINCT
        p.product_id,
        p.product_name,
        COALESCE(p.sale_price, p.base_price) AS price,
        pi.image_url
    FROM products p
    JOIN product_categories pc 
        ON pc.product_id = p.product_id 
        AND pc.category_id = (SELECT category_id FROM target_category)
    JOIN product_images pi 
        ON pi.product_id = p.product_id AND pi.is_primary = 1
    CROSS JOIN JSON_TABLE(
        p.specification, '$'
        COLUMNS(
            processor VARCHAR(200) PATH '$.processor',
            display   VARCHAR(100) PATH '$.display'
        )
    ) AS specs
    ";

        $params = [$slug, $last_id];
        $where = ['p.product_id > ?'];

        // Keyword
        if ($keyword !== null && trim($keyword) !== '') {
            $where[] = 'LOWER(p.product_name) LIKE ?';
            $params[] = '%'.strtolower(trim($keyword)).'%';
        }

        // Processor filter
        if (! empty($processor)) {
            $placeholders = implode(',', array_fill(0, count($processor), '?'));
            $where[] = "specs.processor IN ($placeholders)";
            $params = array_merge($params, $processor);
        }

        // Display filter
        if (! empty($display)) {
            $placeholders = implode(',', array_fill(0, count($display), '?'));
            $where[] = "specs.display IN ($placeholders)";
            $params = array_merge($params, $display);
        }

        // Price range
        $where[] = 'COALESCE(p.sale_price, p.base_price) BETWEEN ? AND ?';
        $params[] = $min_price ?? 0;
        $params[] = $max_price ?? 9999999999;

        // Join variants ONLY if needed
        $needVariantJoin = ! empty($ram) || ! empty($storage) || ! empty($color);

        if ($needVariantJoin) {
            $query .= "
        JOIN product_variants pv ON pv.product_id = p.product_id
        CROSS JOIN JSON_TABLE(
            pv.attributes, '$'
            COLUMNS(
                ram     VARCHAR(50) PATH '$.ram',
                storage VARCHAR(50) PATH '$.storage',
                color   VARCHAR(50) PATH '$.color'
            )
        ) AS v
        ";

            if (! empty($ram)) {
                $placeholders = implode(',', array_fill(0, count($ram), '?'));
                $where[] = "v.ram IN ($placeholders)";
                $params = array_merge($params, $ram);
            }

            if (! empty($storage)) {
                $placeholders = implode(',', array_fill(0, count($storage), '?'));
                $where[] = "v.storage IN ($placeholders)";
                $params = array_merge($params, $storage);
            }

            if (! empty($color)) {
                $placeholders = implode(',', array_fill(0, count($color), '?'));
                $where[] = "v.color IN ($placeholders)";
                $params = array_merge($params, $color);
            }
        }

        // Build final query
        $query .= ' WHERE '.implode(' AND ', $where);

        // Sort
        $direction = strtoupper($sort === 'asc' ? 'ASC' : 'DESC');
        $query .= " ORDER BY COALESCE(p.sale_price, p.base_price) $direction, p.product_id DESC";

        // Limit
        $query .= ' LIMIT ?';
        $params[] = $limit;

        return DB::select($query, $params);
    }

    public function searchTV(
        ?string $slug = null,           // e.g. 'tv-av' – makes it reusable for subcategories if needed
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
    ) {
        $query = "
        WITH target_category AS (
            SELECT category_id FROM categories WHERE slug = ? LIMIT 1
        )
        SELECT DISTINCT
            p.product_id,
            p.product_name,
            COALESCE(p.sale_price, p.base_price) AS price,
            pi.image_url
        FROM products p
        JOIN product_categories pc 
            ON pc.product_id = p.product_id 
            AND pc.category_id = (SELECT category_id FROM target_category)
        JOIN product_images pi 
            ON pi.product_id = p.product_id AND pi.is_primary = 1

        -- Extract fixed specs from product.specification JSON
        CROSS JOIN JSON_TABLE(
            p.specification, '$'
            COLUMNS(
                resolution VARCHAR(50)  PATH '$.resolution',
                technology VARCHAR(100) PATH '$.technology',
                processor  VARCHAR(150) PATH '$.processor'
            )
        ) AS specs
    ";

        $params = [$slug, $last_id];
        $where = ['p.product_id > ?'];

        // Keyword search
        if ($keyword !== null && trim($keyword) !== '') {
            $where[] = 'LOWER(p.product_name) LIKE ?';
            $params[] = '%'.strtolower(trim($keyword)).'%';
        }

        // Fixed spec filters (from specification JSON)
        if (! empty($resolution)) {
            $placeholders = implode(',', array_fill(0, count($resolution), '?'));
            $where[] = "specs.resolution IN ($placeholders)";
            $params = array_merge($params, $resolution);
        }

        if (! empty($technology)) {
            $placeholders = implode(',', array_fill(0, count($technology), '?'));
            $where[] = "specs.technology IN ($placeholders)";
            $params = array_merge($params, $technology);
        }

        if (! empty($processor)) {
            $placeholders = implode(',', array_fill(0, count($processor), '?'));
            $where[] = "specs.processor IN ($placeholders)";
            $params = array_merge($params, $processor);
        }

        // Price range
        $where[] = 'COALESCE(p.sale_price, p.base_price) BETWEEN ? AND ?';
        $params[] = $min_price ?? 0;
        $params[] = $max_price ?? 9999999999;

        // Only join variants if screenSize filter is applied
        $needVariantJoin = ! empty($screenSize);

        if ($needVariantJoin) {
            $query .= "
            JOIN product_variants pv ON pv.product_id = p.product_id
            CROSS JOIN JSON_TABLE(
                pv.attributes, '$'
                COLUMNS(
                    screen_size VARCHAR(50) PATH '$.screen_size'
                )
            ) AS v
        ";

            $placeholders = implode(',', array_fill(0, count($screenSize), '?'));
            $where[] = "v.screen_size IN ($placeholders)";
            $params = array_merge($params, $screenSize);
        }

        // Final WHERE clause
        $query .= ' WHERE '.implode(' AND ', $where);

        // Sorting: price first, then product_id as tie-breaker
        $direction = strtoupper($sort) === 'ASC' ? 'ASC' : 'DESC';
        $query .= " ORDER BY COALESCE(p.sale_price, p.base_price) $direction, p.product_id DESC";

        // Limit
        $query .= ' LIMIT ?';
        $params[] = $limit;

        return DB::select($query, $params);
    }

    // 4. Computing & Displays
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
    ) {
        $query = "
        WITH target_category AS (
            SELECT category_id FROM categories WHERE slug = ? LIMIT 1
        )
        SELECT DISTINCT
            p.product_id,
            p.product_name,
            COALESCE(p.sale_price, p.base_price) AS price,
            pi.image_url
        FROM products p
        JOIN product_categories pc 
            ON pc.product_id = p.product_id 
            AND pc.category_id = (SELECT category_id FROM target_category)
        JOIN product_images pi 
            ON pi.product_id = p.product_id AND pi.is_primary = 1

        -- Extract fixed specs from product.specification JSON
        CROSS JOIN JSON_TABLE(
            p.specification, '$'
            COLUMNS(
                battery   VARCHAR(100) PATH '$.battery',
                graphics  VARCHAR(150) PATH '$.graphics'  -- CHANGED: $.graphic → $.graphics
            )
        ) AS specs
    ";

        $params = [$slug, $last_id];
        $where = ['p.product_id > ?'];

        // Keyword search
        if ($keyword !== null && trim($keyword) !== '') {
            $where[] = 'LOWER(p.product_name) LIKE ?';
            $params[] = '%'.strtolower(trim($keyword)).'%';
        }

        // Fixed spec filters
        if (! empty($battery)) {
            $placeholders = implode(',', array_fill(0, count($battery), '?'));
            $where[] = "specs.battery IN ($placeholders)";
            $params = array_merge($params, $battery);
        }

        if (! empty($graphics)) {  // CHANGED
            $placeholders = implode(',', array_fill(0, count($graphics), '?'));
            $where[] = "specs.graphics IN ($placeholders)";  // CHANGED
            $params = array_merge($params, $graphics);
        }

        // Price range
        $where[] = 'COALESCE(p.sale_price, p.base_price) BETWEEN ? AND ?';
        $params[] = $min_price ?? 0;
        $params[] = $max_price ?? 9999999999;

        // Only join variants if any variant filter is used
        $needVariantJoin = ! empty($ram) || ! empty($storage) || ! empty($processor) || ! empty($color);

        if ($needVariantJoin) {
            $query .= "
            JOIN product_variants pv ON pv.product_id = p.product_id
            CROSS JOIN JSON_TABLE(
                pv.attributes, '$'
                COLUMNS(
                    ram       VARCHAR(50)  PATH '$.ram',
                    storage   VARCHAR(100) PATH '$.storage',
                    processor VARCHAR(150) PATH '$.processor',
                    color     VARCHAR(50)  PATH '$.color'
                )
            ) AS v
        ";

            if (! empty($ram)) {
                $placeholders = implode(',', array_fill(0, count($ram), '?'));
                $where[] = "v.ram IN ($placeholders)";
                $params = array_merge($params, $ram);
            }

            if (! empty($storage)) {
                $placeholders = implode(',', array_fill(0, count($storage), '?'));
                $where[] = "v.storage IN ($placeholders)";
                $params = array_merge($params, $storage);
            }

            if (! empty($processor)) {
                $placeholders = implode(',', array_fill(0, count($processor), '?'));
                $where[] = "v.processor IN ($placeholders)";
                $params = array_merge($params, $processor);
            }

            if (! empty($color)) {
                $placeholders = implode(',', array_fill(0, count($color), '?'));
                $where[] = "v.color IN ($placeholders)";
                $params = array_merge($params, $color);
            }
        }

        // Final WHERE clause
        $query .= ' WHERE '.implode(' AND ', $where);

        // Sorting
        $direction = strtoupper($sort) === 'ASC' ? 'ASC' : 'DESC';
        $query .= " ORDER BY COALESCE(p.sale_price, p.base_price) $direction, p.product_id DESC";

        // Limit
        $query .= ' LIMIT ?';
        $params[] = $limit;

        return DB::select($query, $params);
    }
}
