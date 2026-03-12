<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use App\Models\User;

class ReportController extends Controller
{
    public function team()
    {
        $teamSize = User::query()->where('role', 'employee')->count();
        $totalTasks = Ticket::count();
        $closedTasks = Ticket::query()->where('status', 'done')->count();
        $distributedBadges = User::query()->where('role', 'employee')->withCount('badges')->get()->sum('badges_count');

        $rows = [
            ['metric', 'value'],
            ['team_size', $teamSize],
            ['total_tasks', $totalTasks],
            ['closed_tasks', $closedTasks],
            ['distributed_badges', $distributedBadges],
        ];

        $filename = 'team-report-' . now()->format('Ymd-His') . '.csv';

        return response()->streamDownload(function () use ($rows) {
            $handle = fopen('php://output', 'w');
            foreach ($rows as $row) {
                fputcsv($handle, $row);
            }
            fclose($handle);
        }, $filename, [
            'Content-Type' => 'text/csv',
        ]);
    }
}
