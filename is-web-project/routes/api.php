<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\GoogleController;

Route::middleware('check.refresh.token')->group(function () {
    Route::post('/register', [AuthController::class, 'post_register']);
    Route::get('/register', [AuthController::class, 'get_register']);
    Route::post('/login', [AuthController::class, 'post_login']);
    Route::get('/login', [AuthController::class, 'login']);
});
Route::post('/send-code', [AuthController::class, 'sendCode']);
Route::post('/verify-code', [AuthController::class, 'verifyCode']);

// Google OAuth route (must be outside auth:api middleware)
Route::post('/auth/google/exchange', [GoogleController::class, 'exchange']);

Route::middleware('auth:api')->prefix('auth')->group(function () {
    // Admin routes
    route::get('/admin/orders', [\App\Http\Controllers\AdminController::class, 'getAllOrders']);
    route::get('/admin/order/{order_id}', [\App\Http\Controllers\AdminController::class, 'getOrderDetails']);
    route::get('/verify-payment', [\App\Http\Controllers\AdminController::class, 'is_pay']);
    
    // User routes
    route::get('/user', [\App\Http\Controllers\UserController::class, 'user']);
    route::get('/buyvip', [\App\Http\Controllers\UserController::class, 'buyVip']);
    route::get('/redeem-points', [\App\Http\Controllers\UserController::class, 'redeemPoints']);
    route::get('/my-promotions', [\App\Http\Controllers\UserController::class, 'myPromotions']);
    route::get('/cart', [\App\Http\Controllers\CartController::class, 'cart']);
    route::post('/cart/additem', [\App\Http\Controllers\CartController::class, 'addItem']);
    route::delete('/cart/cart-item/{cart_item_id}', [\App\Http\Controllers\CartController::class, 'removeFromCart']);
    route::patch('/cart/updatequantity', [\App\Http\Controllers\CartController::class, 'updateCartItemQuantity']);
    route::get('/check-coupon', [\App\Http\Controllers\PromotionController::class, 'checkPromotionExist']);
    route::post('/create-order', [\App\Http\Controllers\OrderController::class, 'createOrder']);
    route::get('/getallorder', [\App\Http\Controllers\OrderController::class, 'getAllUserOrders']);
    route::get('/order/{order_id}', [\App\Http\Controllers\OrderController::class, 'getOrderDetails']);
    route::get('/cart/clear', [\App\Http\Controllers\CartController::class, 'clearCart']);
    route::get('/order/cancel/{order_id}', [\App\Http\Controllers\OrderController::class, 'cancelOrder']);
});
Route::get('/getallchildslug', [CategoryController::class, 'getAllChildSlug']);
Route::get('/products/recommended', [ProductController::class, 'getRecommendedProducts']);
Route::get('/mobile/{child_slug}', [ProductController::class, 'searchMobile']);
Route::get('/tv-av/{child_slug}', [ProductController::class, 'searchTVAV']);
Route::get('/computing-displays/{child_slug}', [ProductController::class, 'searchComputing']);
Route::get('/product/{product_id}', [ProductController::class, 'getProductDetails']);
Route::get('/products/search', [ProductController::class, 'searchAll']);
Route::get('/mobile-all', [ProductController::class, 'getAllMobiles']);