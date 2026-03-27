<?php

namespace App\Enums;

enum ProductType: string
{
    case COMPUTING = 'computing';
    case MOBILE = 'mobile';
    case TELEVISION = 'tvs';
    case ALL = 'all';
}
