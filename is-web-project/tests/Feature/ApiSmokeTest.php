<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class ApiSmokeTest extends TestCase
{
    use RefreshDatabase;

    public function test_auth_endpoints_expose_expected_guest_behavior(): void
    {
        $this->getJson('/api/login')
            ->assertStatus(401)
            ->assertJson([
                'success' => false,
                'message' => 'Unauthorized',
            ]);

        $this->getJson('/api/register')
            ->assertStatus(401)
            ->assertJson([
                'success' => false,
                'message' => 'Unauthorized',
            ]);

        $this->postJson('/api/login', [])
            ->assertStatus(422)
            ->assertJson([
                'success' => false,
            ]);
    }

    public function test_product_endpoint_is_publicly_reachable(): void
    {
        $this->getJson('/api/product/1')
            ->assertOk()
            ->assertJsonStructure([
                'success',
                'product_variants',
                'images',
            ]);
    }

    public function test_cart_and_order_endpoints_are_protected_by_auth_middleware(): void
    {
        $this->getJson('/api/auth/cart')->assertUnauthorized();

        $this->postJson('/api/auth/create-order', [
            'city' => 'Ho Chi Minh',
            'district' => 'District 1',
            'ward' => 'Ben Nghe',
            'address_type' => 'home',
            'address_line1' => '123 Sample St',
            'receiver_phone' => '0900000000',
        ])->assertUnauthorized();
    }
}
