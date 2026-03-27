<?php

test('api routes file contains smoke-critical auth product cart and order routes', function () {
    $apiRoutes = file_get_contents(__DIR__.'/../../routes/api.php');

    expect($apiRoutes)->not->toBeFalse();
    expect($apiRoutes)
        ->toContain("Route::post('/login'")
        ->toContain("Route::post('/register'")
        ->toContain("Route::get('/product/{product_id}'")
        ->toContain("route::get('/cart'")
        ->toContain("route::post('/create-order'");
});
