<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats()
    {
        $tickets = Ticket::count();
        $jira = Ticket::where('source', 'jira')->count();
        $internal = Ticket::where('source', 'internal')->count();
        $done = Ticket::where('status','done')->count();

        return response()->json([
            'tickets' => $tickets,
            'jira' => $jira,
            'internal' => $internal,
            'done' => $done,
        ]);
    }

    public function topEmployees()
    {
        $topEmployees = Ticket::query()
            ->join('users', 'users.id', '=', 'tickets.user_id')
            ->where('users.role', 'employee')
            ->where('tickets.status', 'done')
            ->groupBy('users.id', 'users.name')
            ->orderByDesc(DB::raw('COUNT(tickets.id)'))
            ->limit(5)
            ->get([
                'users.id',
                'users.name',
                DB::raw('COUNT(tickets.id) as tasks'),
            ]);

        return response()->json($topEmployees);
    }

    public function evolution()
    {
        $start = Carbon::now()->startOfMonth()->subMonths(5);

        $rows = Ticket::query()
            ->where('status', 'done')
            ->where('created_at', '>=', $start)
            ->selectRaw("DATE_FORMAT(created_at, '%Y-%m') as ym, COUNT(*) as tasksDone")
            ->groupBy('ym')
            ->pluck('tasksDone', 'ym');

        $evolution = collect(range(0, 5))->map(function ($offset) use ($rows, $start) {
            $monthDate = (clone $start)->addMonths($offset);
            $key = $monthDate->format('Y-m');

            return [
                'month' => $monthDate->format('M'),
                'tasksDone' => (int) ($rows[$key] ?? 0),
            ];
        });

        return response()->json($evolution->values());
    }

    public function employeeDetail(int $id)
    {
        $employee = User::query()
            ->where('role', 'employee')
            ->findOrFail($id);

        $doneCount = Ticket::query()
            ->where('user_id', $employee->id)
            ->where('status', 'done')
            ->count();

        $badges = [];
        if ($doneCount >= 5) {
            $badges[] = 'Rapid Task';
        }
        if ($doneCount >= 10) {
            $badges[] = 'Top Performer';
        }
        if ($doneCount >= 20) {
            $badges[] = 'Elite Closer';
        }

        $targets = [5, 10, 20, 30];
        $nextTarget = collect($targets)->first(fn ($value) => $doneCount < $value);
        $progress = $nextTarget ? min(100, (int) round(($doneCount / $nextTarget) * 100)) . '%' : '100%';

        $history = Ticket::query()
            ->where('user_id', $employee->id)
            ->latest()
            ->limit(10)
            ->get(['id', 'title', 'status', 'source', 'created_at'])
            ->map(function ($ticket) {
                return [
                    'id' => $ticket->id,
                    'title' => $ticket->title,
                    'status' => $ticket->status,
                    'source' => $ticket->source,
                    'createdAt' => optional($ticket->created_at)->toDateString(),
                ];
            })
            ->values();

        return response()->json([
            'id' => $employee->id,
            'name' => $employee->name,
            'tasks' => $doneCount,
            'badges' => $badges,
            'progress' => $progress,
            'history' => $history,
        ]);
    }
}
