<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PromotionController extends Controller
{
    public function checkPromotionExist(Request $request)
    {
        // $code comes from route param; ensure it's present
        $code = $request->query('code');
        if (empty($code) || ! is_string($code)) {
            return response()->json([
                'exists' => false,
                'message' => 'Promotion code is required.',
            ], 422);
        }

        $promotion = DB::table('promotions')->where('promotion_code', $code)->first();

        if ($promotion && $promotion->is_active) {
            return response()->json([
                'exists' => true,
                'promotion' => $promotion,
            ], 200);
        } else {
            return response()->json([
                'exists' => false,
                'message' => 'Promotion code not found',
            ], 404);
        }
    }
}
