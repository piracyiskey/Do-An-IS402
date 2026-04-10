<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductVariant extends Model
{
    protected $table = 'product_variants';

    protected $primaryKey = 'variant_id';

    public $timestamps = false;

    protected $fillable = [
        'product_id',
        'variant_name',
        'sku',
        'attributes',
        'additional_price',
        'stock_quantity',
    ];

    protected $casts = [
        'attributes' => 'array', // JSON cast to array
    ];

    public function product()
    {
        return $this->belongsTo(Product::class, 'product_id');
    }

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'variant_id');
    }

    public function cartItems()
    {
        return $this->hasMany(CartItem::class, 'variant_id');
    }

    public function orderItems()
    {
        return $this->hasMany(OrderItem::class, 'variant_id');
    }
}
