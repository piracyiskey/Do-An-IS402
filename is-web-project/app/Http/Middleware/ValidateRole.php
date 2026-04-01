<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ValidateRole
{
    public function handle(Request $request, Closure $next, ...$roles): Response
    {
        $user = $request->user();

        if (! $user || ! $user->hasAnyRole($roles)) {
            $message = 'Need role: ';
            if (count($roles) > 0) {
                $message = $message.$roles[0];
            }
            for ($i = 1; $i < count($roles); $i++) {
            }
            $message = $message.' to authorize';

            return response()->json(['error' => $message], 403);
        }

        return $next($request);
    }
}
