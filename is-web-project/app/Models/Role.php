<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $table = 'roles';

    protected $primaryKey = 'role_id';

    public $incrementing = false; // Non-auto-incrementing primary key

    protected $keyType = 'string'; // VARCHAR(50) primary key

    protected $fillable = ['role_id', 'role_desc'];

    public $timestamps = false;

    public function users()
    {
        return $this->belongsToMany(User::class, 'user_roles', 'role_id', 'user_id');
    }
}
