<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Promotion extends Model
{
    protected $table = 'promotions';

    protected $primaryKey = 'promotion_id';

    protected $fillable = [
        'promotion_name',
        'promotion_code',
        'description',
        'discount_type',
        'discount_value',
        'min_order_amount',
        'max_discount_amount',
        'start_date',
        'end_date',
        'usage_limit',
        'used_count',
        'is_active',
        'applicable_categories',
        'applicable_products',
    ];

    protected $casts = [
        'discount_type' => 'string',
        'is_active' => 'boolean',
        'applicable_categories' => 'array', // JSON cast to array
        'applicable_products' => 'array', // JSON cast to array
    ];

    public $timestamps = false;

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_promotions', 'promotion_id', 'order_id')
            ->withPivot('discount_applied');
    }
}
