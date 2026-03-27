<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateRefreshTokensTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('refresh_tokens', function (Blueprint $table) {
            $table->string('token', 16)->primary(); // Primary key, increased length for hashed tokens
            $table->unsignedBigInteger('user_id'); // Foreign key column
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade'); // References 'user_id' on 'users' table
            $table->timestamp('expires_at');
            $table->boolean('revoked')->default(false);
            $table->timestamps(); // Optional: created_at and updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('refresh_tokens');
    }
}
