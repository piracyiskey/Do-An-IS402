<?php

namespace App\Repositories;

use App\Models\User;

class RefreshTokenRepository
{
    public function generateRefreshToken(User $user)
    {
        $randomBytes = random_bytes(12);

        $refreshToken = substr(
            str_replace(['+', '/', '='], ['-', '_', ''], base64_encode($randomBytes)),
            0,
            16
        );
        $user->refreshTokens()->create([
            'token' => $refreshToken, // 16-character Base64URL
            'expires_at' => now()->addDay(7),
            'revoked' => false,
            'user_id' => $user->user_id,
        ]);

        return $refreshToken;
    }

    public function generateRefreshTokenForUser(User $user)
    {
        $refreshToken = null;
        if ($user->refreshTokens()->first() == null) {
            $refreshToken = $this->generateRefreshToken($user);
        } elseif ($user->refreshTokens()->first()->expires_at <= now()) {
            $user->refreshTokens()->delete();
            $refreshToken = $this->generateRefreshToken($user);
        } else {
            $refreshToken = $user->refreshTokens()->first()->token;
        }

        return $refreshToken;
    }
}
