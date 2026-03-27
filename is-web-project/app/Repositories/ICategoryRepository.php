<?php

namespace App\Repositories;

interface ICategoryRepository
{
    public function getCategoryInfoBySlug(string $slug);

    public function getAllChildSlug();
}
