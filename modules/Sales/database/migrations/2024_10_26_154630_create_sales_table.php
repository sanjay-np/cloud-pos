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
        Schema::create('sales', function (Blueprint $table) {
            $table->id();
            $table->date('date');
            $table->string('reference');
            $table->unsignedBigInteger('customer_id')->nullable();
            $table->unsignedBigInteger('fiscal_year_id')->nullable();
            $table->float('tax_percentage')->default(0);
            $table->float('tax_amount')->default(0);
            $table->float('discount_amount')->default(0);
            $table->float('shipping_amount')->default(0);
            $table->float('total_amount')->default(0);
            $table->float('paid_amount')->default(0);
            $table->float('due_amount')->default(0);
            $table->string('status');
            $table->string('payment_status');
            $table->string('payment_method');
            $table->text('note')->nullable();
            $table->foreign('customer_id')->references('id')->on('customers')->nullOnDelete();
            $table->foreign('fiscal_year_id')->references('id')->on('fiscal_years')->nullOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sales');
    }
};
