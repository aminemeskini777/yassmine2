<?php

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
        if (! Schema::hasColumn('tickets', 'source')) {
            Schema::table('tickets', function (Blueprint $table) {
                $table->string('source')->nullable();
            });
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        if (Schema::hasColumn('tickets', 'source')) {
            Schema::table('tickets', function (Blueprint $table) {
                $table->dropColumn('source');
            });
        }
    }
};
