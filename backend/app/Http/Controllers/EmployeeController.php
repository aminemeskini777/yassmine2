<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = User::query()
            ->where('role', 'employee')
            ->withCount('tickets')
            ->with('badges:id,name')
            ->orderBy('name')
            ->get();

        return response()->json($employees);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'max:255', 'unique:users,email'],
            'password' => ['required', 'string', 'min:6'],
            'status' => ['nullable', 'in:active,inactive'],
        ]);

        $employee = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => Hash::make($data['password']),
            'role' => 'employee',
            'status' => $data['status'] ?? 'active',
        ]);

        return response()->json($employee, 201);
    }

    public function update(Request $request, int $id)
    {
        $employee = User::query()->where('role', 'employee')->findOrFail($id);

        $data = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'email' => ['sometimes', 'required', 'email', 'max:255', 'unique:users,email,' . $employee->id],
            'password' => ['nullable', 'string', 'min:6'],
            'status' => ['sometimes', 'required', 'in:active,inactive'],
        ]);

        if (array_key_exists('password', $data) && $data['password']) {
            $data['password'] = Hash::make($data['password']);
        } else {
            unset($data['password']);
        }

        $employee->update($data);

        return response()->json($employee);
    }

    public function destroy(int $id)
    {
        $employee = User::query()->where('role', 'employee')->findOrFail($id);
        $employee->delete();

        return response()->json(['message' => 'Employee deleted']);
    }
}
