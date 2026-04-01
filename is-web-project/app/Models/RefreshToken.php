<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class RefreshToken extends Model
{
    // If your primary key is not "id"
    protected $primaryKey = 'token';

    // Disable auto-incrementing (because the PK is a string)
    public $incrementing = false;

    // If the primary key is not an integer
    protected $keyType = 'string';

    // Table name (optional if it follows Laravel's naming convention)
    protected $table = 'refresh_tokens';

    // Fillable or guarded fields
    protected $fillable = [
        'token',
        'user_id',
        'expires_at',
        'revoked',
    ];

    // Cast columns to proper types
    protected $casts = [
        'expires_at' => 'datetime',
        'revoked' => 'boolean',
    ];

    /**
     * Get the user that owns this refresh token.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }
}
