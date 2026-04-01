<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->string('role_id', 50);
            $table->string('role_desc', 100);
            $table->primary('role_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('roles');
    }
};
