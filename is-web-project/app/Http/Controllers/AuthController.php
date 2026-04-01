<?php

namespace App\Http\Controllers;

use App\Mail\VerifyCode;
use App\Models\User;
use App\Repositories\RefreshTokenRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash; // Adjust to your User model namespace
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;

class AuthController extends Controller
{
    /**
     * Register a new user.
     */
    private $refreshTokenRepository;

    public function __construct(RefreshTokenRepository $refreshTokenRepository)
    {
        $this->refreshTokenRepository = $refreshTokenRepository;
    }

    public function post_register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'full_name' => 'required|string|max:100',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation errors',
                'data' => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'full_name' => $request->input('full_name'),
            'email' => $request->input('email'),
            'password_hash' => Hash::make($request->input('password')),
            'verification_code' => (string) random_int(100000, 999999),
        ]);

        DB::insert('
        INSERT INTO user_roles (user_id, role_id)
        VALUES (:user_id, :role_id)', [
            'user_id' => $user->user_id,
            'role_id' => 'member',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'User registered successfully',
            'email' => $user->email,
        ], 201);
    }

    public function get_register(Request $request)
    {
        return response()->json([
            'success' => false,
            'message' => 'Unauthorized',
        ], 401);
    }

    public function sendCode(Request $request)
    {
        if (! $request->has('email')) {
            return response()->json([
                'sent' => false,
                'message' => 'Email is required.',
            ], 422);
        }
        $user = User::where('email', $request->email)->first();
        if ($user == null) {
            return response()->json([
                'sent' => false,
                'message' => 'The email not found',
            ], 404);
        }
        if ($user->email_verified == true) {
            return response()->json([
                'sent' => false,
                'message' => 'This email has verified',
            ], 200);
        }
        Mail::to($user->email)->send(new VerifyCode($user->verification_code));

        return response()->json([
            'sent' => true,
            'message' => 'Verification code sent to your email.',
        ]);
    }

    public function verifyCode(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'code' => 'required|string|size:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'verified' => false,
                'message' => 'Validation errors',
                'data' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();
        if ($user == null) {
            return response()->json([
                'verified' => false,
                'message' => 'The email not found',
            ], 404);
        }
        if ($user->verification_code !== $request->code) {
            return response()->json([
                'verified' => false,
                'message' => 'Invalid verification code',
            ], 400);
        }

        $user->email_verified = true;
        $user->verification_code = (string) random_int(100000, 999999);
        $user->save();

        return response()->json([
            'verified' => true,
            'message' => 'Email verified successfully.',
        ]);
    }

    /**
     * Authenticate a user and return a token.
     */
    public function login(Request $request)
    {
        return response()->json([
            'success' => false,
            'message' => 'Unauthorized',
        ], 401);
    }

    public function post_login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|max:255',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Wrong email or password',
                'data' => $validator->errors(),
            ], 422);
        }

        // Get the credentials from the request
        $credentials = $request->only('email', 'password');

        // Try to find the user by email
        $user = User::where('email', $credentials['email'])->first();

        // Check if user exists first
        if (! $user) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        // Check email verified
        if ($user->email_verified == false) {
            return response()->json([
                'success' => false,
                'message' => 'Email not verified',
            ], 401);
        }

        // Check password
        if (! Hash::check($credentials['password'], $user->password_hash)) {
            // Password doesn't match
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials',
            ], 401);
        }

        // If credentials are correct, generate a token
        try {
            if (! $token = JWTAuth::fromUser($user)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Could not create token',
                ], 500);
            }
        } catch (JWTException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Could not create token',
            ], 500);
        }
        $refreshToken = $this->refreshTokenRepository->generateRefreshTokenForUser($user);

        // Load user's roles
        $user->load('roles');

        // Return the success response with the token and user data
        return response()->json([
            'success' => true,
            'access_token' => $token,
            'refresh_token' => $refreshToken,
            'user' => $user,
        ]);
    }
}
