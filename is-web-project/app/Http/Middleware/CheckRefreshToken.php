<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;
use App\Models\RefreshToken;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;

class CheckRefreshToken
{
    public function handle(Request $request, Closure $next)
    {
        if ($request->header('Authorization')) {
            try {
                $user = JWTAuth::parseToken()->authenticate(false); // Pass false to avoid exceptions

                if ($user) {
                    Auth::setUser($user);
                    $user->load('roles'); // Load roles relationship
                    // Instead of blocking, return a friendly message indicating they're already logged in
                    return response()->json([
                        'success' => true,
                        'message' => 'You are already logged in.',
                        'user' => $user,
                        'redirect' => '/'
                    ], 200);
                }
            } catch (JWTException $e) {
                // Token is invalid or expired, continue with the request
            }
        }

        $accessToken = $this->refresh($request);

        if ($accessToken !== null) {
            $user = JWTAuth::setToken($accessToken)->authenticate();
            if ($user) {
                $user->load('roles');
            }
            return response()->json([
                'success' => true,
                'access_token' => $accessToken,
                'user' => $user,
            ], 200);
        }

        return $next($request);
    }

    public function refresh(Request $request)
    {
        $refreshToken = RefreshToken::with('user.roles')
            ->where('token', $request->header('refresh-token'))
            ->where('revoked', false)
            ->where('expires_at', '>', now())
            ->first();

        if (!$refreshToken || !$refreshToken->user) {
            return null;
        }
        return JWTAuth::fromUser($refreshToken->user);
    }
}
