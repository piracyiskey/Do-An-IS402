<?php

namespace App\Http\Controllers;

use App\Repositories\ICategoryRepository;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    private readonly ICategoryRepository $categoryRepository;

    public function __construct(ICategoryRepository $categoryRepository)
    {
        $this->categoryRepository = $categoryRepository;
    }

    public function getCategoryInfoBySlug(Request $request)
    {
        $request->merge($request->route()->parameters());
        $request->validate([
            'slug' => 'required|string',
        ]);
        $slug = $request->input('slug');
        $categoryInfo = $this->categoryRepository->getCategoryInfoBySlug($slug);

        return response()->json([
            'success' => true,
            'data' => $categoryInfo,
        ]);
    }

    public function getAllChildSlug()
    {
        $childSlugs = $this->categoryRepository->getAllChildSlug();

        return response()->json([
            'success' => true,
            'data' => $childSlugs,
        ]);
    }
}
