<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    protected $table = 'orders';

    protected $primaryKey = 'order_id';

    protected $fillable = [
        'order_code',
        'user_id',
        'shipping_address_id',
        'billing_address_id',
        'order_status',
        'payment_status',
        'payment_method',
        'subtotal',
        'shipping_fee',
        'tax_amount',
        'discount_amount',
        'total_amount',
        'customer_note',
        'admin_note',
        'estimated_delivery',
        'delivered_at',
        'cancelled_at',
    ];

    protected $casts = [
        'order_status' => 'string',
        'payment_status' => 'string',
        'payment_method' => 'string',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function shippingAddress()
    {
        return $this->belongsTo(Address::class, 'shipping_address_id');
    }

    public function billingAddress()
    {
        return $this->belongsTo(Address::class, 'billing_address_id');
    }

    public function items()
    {
        return $this->hasMany(OrderItem::class, 'order_id');
    }

    public function promotions()
    {
        return $this->belongsToMany(Promotion::class, 'order_promotions', 'order_id', 'promotion_id')
            ->withPivot('discount_applied');
    }
}
