<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    protected $table = 'users';

    protected $primaryKey = 'user_id';

    protected $fillable = [
        'email',
        'password_hash',
        'full_name',
        'phone',
        'avatar_url',
        'date_of_birth',
        'gender',
        'email_verified',
        'reward_points',
        'verification_code',
        'membership_tier_id',
    ];

    protected $casts = [
        'email_verified' => 'boolean',
        'gender' => 'string', // ENUM cast to string
    ];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'user_roles', 'user_id', 'role_id');
    }

    public function membershipTier()
    {
        return $this->belongsTo(MembershipTier::class, 'membership_tier_id');
    }

    public function addresses()
    {
        return $this->hasMany(Address::class, 'user_id');
    }

    public function cart()
    {
        return $this->hasOne(Cart::class, 'user_id');
    }

    public function orders()
    {
        return $this->hasMany(Order::class, 'user_id');
    }

    public function reviews()
    {
        return $this->hasMany(Review::class, 'user_id');
    }

    public function refreshtokens()
    {
        return $this->hasMany(RefreshToken::class, 'user_id');
    }

    /**
     * Get the password for the user.
     */
    public function getAuthPassword()
    {
        return $this->password_hash;
    }

    /**
     * Get the identifier that will be stored in the JWT subject claim.
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key-value array, containing any custom claims to be added to the JWT.
     */
    public function getJWTCustomClaims()
    {
        // Fetch user's roles (array of role_ids or role_desc, depending on what you need)
        $roles = $this->roles->pluck('role_id')->toArray();  // e.g., ['admin', 'user']

        return [
            'roles' => $roles,  // Custom claim: array of roles
            // Add other claims if needed, e.g., 'permissions' => ['read', 'write']
        ];
    }

    /**
     * Check if user has any of the given roles.
     */
    public function hasAnyRole(array $roles)
    {
        return $this->roles()->whereIn('roles.role_id', $roles)->exists();
    }
}
