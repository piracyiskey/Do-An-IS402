<?php

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('etl:import-products {--file=database/etl/products.sample.csv} {--dry-run}', function () {
    $file = base_path((string) $this->option('file'));
    $dryRun = (bool) $this->option('dry-run');

    if (! file_exists($file)) {
        $this->error("CSV file not found: {$file}");

        return 1;
    }

    $handle = fopen($file, 'r');
    if ($handle === false) {
        $this->error("Cannot open CSV file: {$file}");

        return 1;
    }

    $header = fgetcsv($handle);
    if ($header === false) {
        fclose($handle);
        $this->error('CSV is empty.');

        return 1;
    }

    $header = array_map(static fn ($h) => trim((string) $h), $header);
    $requiredColumns = [
        'product_name',
        'slug',
        'sku',
        'brand_slug',
        'brand_name',
        'category_slugs',
        'base_price',
        'image_files',
    ];

    foreach ($requiredColumns as $col) {
        if (! in_array($col, $header, true)) {
            fclose($handle);
            $this->error("Missing required column: {$col}");

            return 1;
        }
    }

    $rows = [];
    while (($data = fgetcsv($handle)) !== false) {
        if (count($data) === 1 && trim((string) $data[0]) === '') {
            continue;
        }

        $row = [];
        foreach ($header as $idx => $col) {
            $row[$col] = isset($data[$idx]) ? trim((string) $data[$idx]) : '';
        }
        $rows[] = $row;
    }

    fclose($handle);

    if ($dryRun) {
        DB::beginTransaction();
    }

    $processed = 0;
    $created = 0;
    $updated = 0;
    $failed = 0;

    foreach ($rows as $index => $row) {
        $lineNumber = $index + 2;

        try {
            DB::transaction(function () use ($row, &$created, &$updated, &$processed): void {
                $productName = $row['product_name'];
                $slug = Str::slug($row['slug'] ?: $productName);
                $sku = $row['sku'];
                $brandSlug = Str::slug($row['brand_slug']);
                $brandName = $row['brand_name'];

                if ($productName === '' || $slug === '' || $sku === '' || $brandSlug === '' || $brandName === '') {
                    throw new RuntimeException('Required fields are missing (product_name/slug/sku/brand_slug/brand_name).');
                }

                $categorySlugs = array_values(array_filter(array_map(
                    static fn ($v) => Str::slug(trim($v)),
                    explode('|', (string) $row['category_slugs'])
                )));

                if (empty($categorySlugs)) {
                    throw new RuntimeException('category_slugs is empty.');
                }

                $categories = Category::query()
                    ->whereIn('slug', $categorySlugs)
                    ->get(['category_id', 'slug']);

                if ($categories->count() !== count(array_unique($categorySlugs))) {
                    $found = $categories->pluck('slug')->all();
                    $missing = array_values(array_diff(array_unique($categorySlugs), $found));
                    throw new RuntimeException('Unknown category slug(s): '.implode(', ', $missing));
                }

                $imageFiles = array_values(array_filter(array_map(
                    static fn ($v) => trim($v),
                    explode('|', (string) $row['image_files'])
                )));

                if (empty($imageFiles)) {
                    throw new RuntimeException('image_files is empty.');
                }

                $brand = Brand::query()->firstOrCreate(
                    ['slug' => $brandSlug],
                    ['brand_name' => $brandName]
                );

                $payload = [
                    'product_name' => $productName,
                    'sku' => $sku,
                    'brand_id' => $brand->brand_id,
                    'short_description' => $row['short_description'] !== '' ? $row['short_description'] : null,
                    'full_description' => $row['full_description'] !== '' ? $row['full_description'] : null,
                    'base_price' => (float) $row['base_price'],
                    'sale_price' => $row['sale_price'] !== '' ? (float) $row['sale_price'] : null,
                    'stock_quantity' => $row['stock_quantity'] !== '' ? (int) $row['stock_quantity'] : 0,
                    'is_featured' => in_array(strtolower((string) $row['is_featured']), ['1', 'true', 'yes'], true),
                ];

                $product = Product::query()->where('slug', $slug)->first();

                if ($product === null) {
                    $payload['slug'] = $slug;
                    $product = Product::query()->create($payload);
                    $created++;
                } else {
                    $product->fill($payload);
                    $product->save();
                    $updated++;
                }

                $product->categories()->sync($categories->pluck('category_id')->all());

                ProductImage::query()->where('product_id', $product->product_id)->delete();
                foreach ($imageFiles as $position => $filename) {
                    $altPrefix = $row['image_alt_prefix'] !== '' ? $row['image_alt_prefix'] : $productName;

                    ProductImage::query()->create([
                        'product_id' => $product->product_id,
                        'variant_id' => null,
                        'image_url' => '/images/products/'.$slug.'/'.$filename,
                        'alt_text' => $altPrefix.' image '.($position + 1),
                        'display_order' => $position + 1,
                        'is_primary' => $position === 0,
                    ]);
                }

                $processed++;
            });
        } catch (Throwable $e) {
            $failed++;
            $this->warn("Line {$lineNumber} failed: {$e->getMessage()}");
        }
    }

    if ($dryRun) {
        DB::rollBack();
    }

    $this->newLine();
    $this->info('ETL import summary');
    $this->line('File: '.$file);
    $this->line('Dry-run: '.($dryRun ? 'yes (rolled back)' : 'no'));
    $this->line('Processed: '.$processed);
    $this->line('Created: '.$created);
    $this->line('Updated: '.$updated);
    $this->line('Failed: '.$failed);

    return $failed > 0 ? 1 : 0;
})->purpose('Import products from CSV into products/categories/images (no variants)');
