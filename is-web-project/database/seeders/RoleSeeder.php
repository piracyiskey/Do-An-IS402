<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoleSeeder extends Seeder
{
    public function run(): void
    {
        $roles = [
            ['role_id' => 'member', 'role_desc' => 'Member'],
            ['role_id' => 'admin', 'role_desc' => 'Administrator'],
        ];

        foreach ($roles as $role) {
            DB::table('roles')->updateOrInsert(
                ['role_id' => $role['role_id']],
                ['role_desc' => $role['role_desc']]
            );
        }
    }
}
