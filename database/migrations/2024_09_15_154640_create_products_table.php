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
            $table->string('sku');
            $table->string('bar_code')->unique()->nullable();
            $table->text('description')->nullable();
            $table->string('main_image')->nullable();
            $table->json('gallery_images')->nullable();
            $table->float('purchase_price');
            $table->float('sale_price');
            $table->string('stock_qty')->nullable();
            $table->json('category_ids')->nullable();
            $table->integer('brand_id')->nullable();
            $table->integer('supplier_id')->nullable();
            $table->json('tags')->nullable();
            $table->string('product_type')->nullable();
            $table->string('unit')->nullable();
            $table->string('status');
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
