<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MembershipTierSeeder extends Seeder
{
    public function run(): void
    {
        $tiers = [
            [
                'tier_id' => 'silver',
                'tier_name' => 'Silver',
                'min_points' => 0,
                'max_points' => 499,
                'points_per_dollar' => 1,
                'accessory_discount_percent' => 0,
                'care_plus_discount_percent' => 0,
                'haul_away_discount_percent' => 0,
                'free_care_plus_years' => 0,
            ],
            [
                'tier_id' => 'gold',
                'tier_name' => 'Gold',
                'min_points' => 500,
                'max_points' => 2499,
                'points_per_dollar' => 2,
                'accessory_discount_percent' => 10,
                'care_plus_discount_percent' => 0,
                'haul_away_discount_percent' => 0,
                'free_care_plus_years' => 0,
            ],
            [
                'tier_id' => 'platinum',
                'tier_name' => 'Platinum',
                'min_points' => 2500,
                'max_points' => null,
                'points_per_dollar' => 3,
                'accessory_discount_percent' => 10,
                'care_plus_discount_percent' => 20,
                'haul_away_discount_percent' => 20,
                'free_care_plus_years' => 0,
            ],
            [
                'tier_id' => 'vip',
                'tier_name' => 'VIP Advantage',
                'min_points' => null,
                'max_points' => null,
                'points_per_dollar' => 6,
                'accessory_discount_percent' => 10,
                'care_plus_discount_percent' => 20,
                'haul_away_discount_percent' => 20,
                'free_care_plus_years' => 7,
            ],
        ];

        foreach ($tiers as $tier) {
            DB::table('membership_tiers')->updateOrInsert(
                ['tier_id' => $tier['tier_id']],
                array_merge($tier, [
                    'updated_at' => now(),
                    'created_at' => now(),
                ])
            );
        }
    }
}
