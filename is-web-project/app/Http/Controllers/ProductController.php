<?php

namespace App\Http\Controllers;

use App\Enums\CategoryMap;
use App\Models\Category;
use App\Models\Product;
use App\Repositories\IProductRepository;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    private readonly IProductRepository $productRepository;

    public function __construct(IProductRepository $productRepository)
    {
        $this->productRepository = $productRepository;
    }

    public function getRecommendedProducts(Request $request)
    {
        $request->merge($request->route()->parameters());
        $request->validate([
            'limit' => 'nullable|integer|min:0',
            'last_id' => 'integer|min:0',
        ]);
        if ($request->input('last_id') === null) {
            $request->merge(['last_id' => 0]);
        }

        return $this->productRepository->getTitleRecomendedProducts(
            $request->input('limit'),
            $request->input('last_id')
        );
    }

    public function getProductDetails(Request $request)
    {
        $request->merge($request->route()->parameters());
        $request->validate([
            'product_id' => 'required|integer|min:0',
        ]);

        $product = $this->productRepository->getProductByID(
            $request->input('product_id')
        );
        $images = $this->productRepository->getProductImages(
            $request->input('product_id')
        );

        return response()->json([
            'success' => true,
            'product_variants' => $this->productRepository->calculatePriceForListProductVariants($product),
            'images' => $images,
        ]);
    }

    public function searchAll(Request $request)
    {
        $request->validate([
            'keyword' => 'nullable|string',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0',
            'last_id' => 'integer|min:0',
            'limit' => 'integer|min:1|max:100',
            'sort' => 'nullable|string|in:asc,desc,none',
            'child_slugs' => 'nullable|string',
        ]);

        $categories = $this->parseCsv($request->input('child_slugs'));
        if ($categories === null) {
            $categories = array_keys(CategoryMap::$childToParent);
        } else {
            foreach ($categories as $slug) {
                if (! array_key_exists($slug, CategoryMap::$childToParent)) {
                    return response()->json([
                        'message' => "Category slug '$slug' not found",
                    ], 404);
                }
            }
        }

        return $this->productRepository->searchAll(
            keyword: $request->input('keyword'),
            min_price: $request->input('min_price'),
            max_price: $request->input('max_price'),
            last_id: $request->input('last_id', 0),
            limit: $request->input('limit', 20),
            sort: $request->input('sort', 'desc'),
            child_slugs: $categories
        );
    }

    private function parseCsv(?string $value): ?array
    {
        if ($value === null || trim($value) === '') {
            return null;
        }

        return array_values(array_filter(
            array_map('trim', explode(',', $value)),
            fn ($v) => $v !== ''
        ));
    }

    public function searchMobile(Request $request)
    {
        $ctpc = CategoryMap::$childToParent;
        $childSlug = $request->route('child_slug');

        if (! isset($ctpc[$childSlug]) || $ctpc[$childSlug] !== 'mobile') {
            return response()->json([
                'message' => 'Category not found',
            ], 404);
        }

        $request->validate([
            'keyword' => 'nullable|string',
            'color' => 'nullable|string',
            'ram' => 'nullable|string',
            'storage' => 'nullable|string',
            'processor' => 'nullable|string',
            'display' => 'nullable|string',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0',
            'last_id' => 'integer|min:0',
            'limit' => 'integer|min:1|max:100',
            'sort' => 'nullable|string|in:asc,desc',
        ]);

        return $this->productRepository->searchMobile(
            slug: $childSlug,
            keyword: $request->input('keyword'),
            color: $this->parseCsv($request->input('color')),
            ram: $this->parseCsv($request->input('ram')),
            storage: $this->parseCsv($request->input('storage')),
            processor: $this->parseCsv($request->input('processor')),
            display: $this->parseCsv($request->input('display')),
            min_price: $request->input('min_price'),
            max_price: $request->input('max_price'),
            last_id: $request->input('last_id', 0),
            limit: $request->input('limit', 20),
            sort: $request->input('sort', 'desc')
        );
    }

    public function searchTVAV(Request $request)
    {
        $ctpc = CategoryMap::$childToParent;
        $childSlug = $request->route('child_slug');

        if (! isset($ctpc[$childSlug]) || $ctpc[$childSlug] !== 'tv-av') {
            return response()->json([
                'message' => 'Category not found',
            ], 404);
        }

        $request->validate([
            'keyword' => 'nullable|string',
            'resolution' => 'nullable|string',
            'technology' => 'nullable|string',
            'processor' => 'nullable|string',
            'screenSize' => 'nullable|string',  // e.g. "55-inch,65-inch"
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0',
            'last_id' => 'integer|min:0',
            'limit' => 'integer|min:1|max:100',
            'sort' => 'nullable|string|in:asc,desc',
        ]);

        return $this->productRepository->searchTV(
            slug: $childSlug,
            keyword: $request->input('keyword'),
            resolution: $this->parseCsv($request->input('resolution')),
            technology: $this->parseCsv($request->input('technology')),
            processor: $this->parseCsv($request->input('processor')),
            screenSize: $this->parseCsv($request->input('screenSize')),
            min_price: $request->input('min_price'),
            max_price: $request->input('max_price'),
            last_id: $request->input('last_id', 0),
            limit: $request->input('limit', 20),
            sort: $request->input('sort', 'desc')
        );
    }

    public function searchComputing(Request $request)
    {
        $ctpc = CategoryMap::$childToParent;
        $childSlug = $request->route('child_slug');

        // Parent category slug – adjust if needed (e.g. 'computing', 'laptops', etc.)
        if (! isset($ctpc[$childSlug]) || $ctpc[$childSlug] !== 'computing-displays') {
            return response()->json([
                'message' => 'Category not found',
            ], 404);
        }

        $request->validate([
            'keyword' => 'nullable|string',
            'battery' => 'nullable|string',
            'graphics' => 'nullable|string',  // CHANGED: 'graphic' → 'graphics'
            'ram' => 'nullable|string',
            'storage' => 'nullable|string',
            'processor' => 'nullable|string',
            'color' => 'nullable|string',
            'min_price' => 'nullable|numeric|min:0',
            'max_price' => 'nullable|numeric|min:0',
            'last_id' => 'integer|min:0',
            'limit' => 'integer|min:1|max:100',
            'sort' => 'nullable|string|in:asc,desc',
        ]);

        return $this->productRepository->searchComputing(
            slug: $childSlug,
            keyword: $request->input('keyword'),
            battery: $this->parseCsv($request->input('battery')),
            graphics: $this->parseCsv($request->input('graphics')),  // CHANGED: graphic → graphics
            ram: $this->parseCsv($request->input('ram')),
            storage: $this->parseCsv($request->input('storage')),
            processor: $this->parseCsv($request->input('processor')),
            color: $this->parseCsv($request->input('color')),
            min_price: $request->input('min_price'),
            max_price: $request->input('max_price'),
            last_id: $request->input('last_id', 0),
            limit: $request->input('limit', 20),
            sort: $request->input('sort', 'desc')
        );
    }
    // app/Http/Controllers/ProductController.php

    public function show($id)
    {
        // Phải viết hoa chữ P và đảm bảo đã import Model Product ở đầu file
        $product = Product::with('images')->where('product_id', $id)->first();

        return response()->json($product);
    }
}
