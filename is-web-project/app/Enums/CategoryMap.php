<?php

namespace App\Enums;

class CategoryMap
{
    public static array $childToParent = [

        // Mobile
        'galaxy-smartphone' => 'mobile',
        'galaxy-tab' => 'mobile',
        // 'galaxy-watch'        => 'mobile',
        // 'galaxy-buds'         => 'mobile',
        // 'galaxy-ring'         => 'mobile',
        // 'galaxy-accessories'  => 'mobile',
        'certified-re-newed' => 'mobile',

        // TV & AV
        'premium-flagship-tvs' => 'tv-av',
        'qled-uhd-tvs' => 'tv-av',
        'lifestyle-tvs' => 'tv-av',

        // 'sound-devices'       => 'tv-av',
        // 'projectors'          => 'tv-av',
        // 'tv-accessories'      => 'tv-av',

        // Computing & Displays
        'galaxy-book-laptop' => 'computing-displays',
        // 'monitors'            => 'computing-displays',
        // 'memory-storage'      => 'computing-displays',
    ];
}
