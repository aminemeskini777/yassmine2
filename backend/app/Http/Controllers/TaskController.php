<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request)
    {
        $query = Ticket::query()->with('user:id,name');

        if ($request->filled('employee_id')) {
            $query->where('user_id', $request->integer('employee_id'));
        }

        if ($request->filled('status')) {
            $query->where('status', $request->string('status'));
        }

        if ($request->filled('priority')) {
            $query->where('priority', $request->string('priority'));
        }

        if ($request->filled('source')) {
            $query->where('source', $request->string('source'));
        }

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'priority' => ['required', 'in:low,medium,high'],
            'user_id' => ['required', 'exists:users,id'],
            'due_date' => ['nullable', 'date'],
            'source' => ['nullable', 'in:internal,jira'],
            'status' => ['nullable', 'in:todo,in_progress,done'],
        ]);

        $employee = User::query()->findOrFail($data['user_id']);
        if ($employee->role !== 'employee') {
            return response()->json(['message' => 'Selected user is not an employee'], 422);
        }

        $ticket = Ticket::create([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'priority' => $data['priority'],
            'user_id' => $data['user_id'],
            'due_date' => $data['due_date'] ?? null,
            'source' => $data['source'] ?? 'internal',
            'status' => $data['status'] ?? 'todo',
        ]);

        return response()->json($ticket->load('user:id,name'), 201);
    }

    public function update(Request $request, int $id)
    {
        $ticket = Ticket::query()->findOrFail($id);

        $data = $request->validate([
            'status' => ['required', 'in:todo,in_progress,done'],
        ]);

        $ticket->update($data);

        return response()->json($ticket->fresh()->load('user:id,name'));
    }
}
