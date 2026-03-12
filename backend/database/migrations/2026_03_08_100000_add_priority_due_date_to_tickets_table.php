<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            if (!Schema::hasColumn('tickets', 'priority')) {
                $table->string('priority')->default('medium')->after('status');
            }

            if (!Schema::hasColumn('tickets', 'due_date')) {
                $table->date('due_date')->nullable()->after('source');
            }
        });
    }

    public function down(): void
    {
        Schema::table('tickets', function (Blueprint $table) {
            if (Schema::hasColumn('tickets', 'priority')) {
                $table->dropColumn('priority');
            }

            if (Schema::hasColumn('tickets', 'due_date')) {
                $table->dropColumn('due_date');
            }
        });
    }
};
