<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $seedMode = env('DB_SEED_MODE', 'baseline');

        if ($seedMode === 'snapshot') {
            $this->call([
                EsappSnapshotSeeder::class,
            ]);

            return;
        }

        $this->call([
            MembershipTierSeeder::class,
            RoleSeeder::class,
            CatalogSeeder::class,
            DemoUserSeeder::class,
        ]);
    }
}
