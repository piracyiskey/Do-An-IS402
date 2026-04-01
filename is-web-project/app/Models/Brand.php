<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Brand extends Model
{
    protected $table = 'brands';

    protected $primaryKey = 'brand_id';

    protected $fillable = [
        'brand_name',
        'slug',
        'logo_url',
        'descriptions',
        'website_url',
    ];

    public $timestamps = false;

    public function products()
    {
        return $this->hasMany(Product::class, 'brand_id');
    }
}
