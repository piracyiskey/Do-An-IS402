<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB;
use Illuminate\Http\JsonResponse;

class HealthController extends Controller
{
    /**
     * Health check endpoint
     * Verifies app and database readiness
     * 
     * @return JsonResponse
     */
    public function check(): JsonResponse
    {
        $status = [
            'status' => 'ok',
            'timestamp' => now()->toIso8601String(),
            'checks' => []
        ];

        // Check app status
        $status['checks']['app'] = [
            'status' => 'ok',
            'message' => 'Application is running'
        ];

        // Check database connectivity
        try {
            DB::connection()->getPdo();
            $status['checks']['database'] = [
                'status' => 'ok',
                'message' => 'Database connection successful'
            ];
        } catch (\Exception $e) {
            $status['checks']['database'] = [
                'status' => 'error',
                'message' => 'Database connection failed: ' . $e->getMessage()
            ];
            return response()->json($status, 503); // Service Unavailable
        }

        return response()->json($status, 200);
    }
}
