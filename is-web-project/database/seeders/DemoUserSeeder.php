<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class DemoUserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->updateOrInsert(
            ['email' => 'demo@esapp.local'],
            [
                'password_hash' => Hash::make('Demo@12345'),
                'full_name' => 'Demo User',
                'email_verified' => true,
                'membership_tier_id' => 'silver',
                'reward_points' => 0,
                'updated_at' => now(),
                'created_at' => now(),
            ]
        );

        $userId = DB::table('users')->where('email', 'demo@esapp.local')->value('user_id');

        DB::table('user_roles')->updateOrInsert(
            ['user_id' => $userId, 'role_id' => 'member'],
            ['user_id' => $userId, 'role_id' => 'member']
        );

        DB::table('carts')->insertOrIgnore([
            'user_id' => $userId,
        ]);
    }
}
