<?php

namespace App\Repositories;

use Illuminate\Support\Facades\DB;

class CategoryRepository implements ICategoryRepository
{
    public function getCategoryInfoBySlug(string $slug)
    {
        $result = DB::select('SELECT category_name, image_url FROM categories WHERE slug = :slug', ['slug', $slug]);

        return $result;
    }

    public function getAllChildSlug()
    {
        $result = DB::select('SELECT category_name, image_url FROM categories WHERE parent_id IS NOT NULL');

        return $result;
    }
}
