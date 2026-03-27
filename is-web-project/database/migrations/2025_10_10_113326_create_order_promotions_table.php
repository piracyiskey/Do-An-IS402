<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('order_promotions', function (Blueprint $table) {
            $table->unsignedBigInteger('order_id');
            $table->unsignedBigInteger('promotion_id');
            $table->decimal('discount_applied', 15, 2);
            $table->primary(['order_id', 'promotion_id']);
            $table->foreign('order_id')->references('order_id')->on('orders')->onDelete('cascade');
            $table->foreign('promotion_id')->references('promotion_id')->on('promotions');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('order_promotions');
    }
};
