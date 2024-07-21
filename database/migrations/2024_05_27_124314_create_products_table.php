<?php

use App\Models\Farmer;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('image');
            $table->string('product_name', 100);
            $table->text('description')->nullable();
            $table->float('price_per_unit', 2);
            $table->string('unit')->default('XAF'); 
            $table->boolean('status')->default(0); 
            $table->foreignIdFor(Farmer::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
