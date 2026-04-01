<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
    protected $table = 'addresses';

    public $timestamps = false;

    protected $primaryKey = 'address_id';

    protected $fillable = [
        'user_id',
        'recipient_name',
        'phone',
        'address_line1',
        'address_line2',
        'city',
        'district',
        'ward',
        'is_default',
        'address_type',
    ];

    protected $casts = [
        'is_default' => 'boolean',
        'address_type' => 'string', // ENUM cast to string
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function ordersAsShipping()
    {
        return $this->hasMany(Order::class, 'shipping_address_id');
    }

    public function ordersAsBilling()
    {
        return $this->hasMany(Order::class, 'billing_address_id');
    }
}
