<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create(table: 'products', callback: function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('sku')->nullable();
            $table->string('short_description')->nullable();
            $table->text('description')->nullable();
            $table->string('main_image')->nullable();
            $table->string('purchase_price');
            $table->string('price');
            $table->string('stock');
            $table->json('category_ids')->nullable();
            $table->json('attributes')->nullable();
            $table->integer('brand_id')->nullable();
            $table->integer('supplier_id')->nullable();
            $table->json('tags')->nullable();
            $table->string('type');
            $table->string('status');
            $table->json('gallery_images')->nullable();
            $table->timestamps();
            $table->softDeletes();
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
