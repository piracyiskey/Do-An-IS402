<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_variants', function (Blueprint $table) {
            $table->id('variant_id');
            $table->unsignedBigInteger('product_id');
            $table->string('variant_name', 255)->nullable();
            $table->string('sku', 100)->unique()->nullable();
            $table->json('attributes')->nullable();
            $table->decimal('additional_price', 15, 2)->default(0);
            $table->integer('stock_quantity')->default(0);
            $table->foreign('product_id')->references('product_id')->on('products')->onDelete('cascade');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_variants');
    }
};
