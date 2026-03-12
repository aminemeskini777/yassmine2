<?php

namespace App\Http\Controllers;

use App\Models\Badge;
use App\Models\User;
use Illuminate\Http\Request;

class BadgeController extends Controller
{
    public function index()
    {
        $defaults = [
            ['name' => 'Top Performer', 'description' => 'High impact contributor'],
            ['name' => 'Rapid Task', 'description' => 'Fast task closer'],
            ['name' => 'Quality Keeper', 'description' => 'Consistent quality delivery'],
        ];

        foreach ($defaults as $badge) {
            Badge::firstOrCreate(['name' => $badge['name']], $badge);
        }

        return response()->json(Badge::query()->orderBy('name')->get());
    }

    public function assign(Request $request)
    {
        $data = $request->validate([
            'badge_id' => ['required', 'exists:badges,id'],
            'user_id' => ['required', 'exists:users,id'],
        ]);

        $employee = User::query()->findOrFail($data['user_id']);
        if ($employee->role !== 'employee') {
            return response()->json(['message' => 'Badge can only be assigned to an employee'], 422);
        }

        $employee->badges()->syncWithoutDetaching([$data['badge_id']]);

        return response()->json([
            'message' => 'Badge assigned successfully',
            'user' => $employee->load('badges:id,name,description'),
        ]);
    }
}
