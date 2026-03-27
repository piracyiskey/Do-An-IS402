<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('categories', function (Blueprint $table) {
            $table->id('category_id');
            $table->string('category_name', 100);
            $table->string('slug', 200)->unique();
            $table->unsignedBigInteger('parent_id')->nullable();
            $table->text('descriptions')->nullable();
            $table->string('image_url', 500)->nullable();
            $table->integer('display_order')->default(0);
            $table->string('meta_title', 255)->nullable();
            $table->text('meta_description')->nullable();
            $table->timestamp('created_at')->useCurrent();

            $table->foreign('parent_id')->references('category_id')->on('categories')->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
