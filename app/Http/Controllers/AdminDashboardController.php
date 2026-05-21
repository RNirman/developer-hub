<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\Thread;
use App\Models\AuditLog;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class DashboardController
{
    public function index()
    {
        $stats = [
            'total_users' => User::count(),
            'total_posts' => Thread::count(),
            'active_users' => User::where('updated_at', '>=', now()->subDays(7))->count(),
            'new_users' => User::where('created_at', '>=', now()->subDays(7))->count(),
        ];

        $user_growth = User::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('count(*) as count')
        )
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $post_growth = Thread::select(
            DB::raw('DATE(created_at) as date'),
            DB::raw('count(*) as count')
        )
            ->where('created_at', '>=', now()->subDays(30))
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        $recent_activities = AuditLog::with('user')
            ->latest()
            ->limit(10)
            ->get();

        $recent_users = User::latest()
            ->limit(5)
            ->get();

        return Inertia::render('AdminDashboard', [
            'stats' => $stats,
            'user_growth' => $user_growth,
            'post_growth' => $post_growth,
            'recent_activities' => $recent_activities,
            'recent_users' => $recent_users,
        ]);
    }
}
