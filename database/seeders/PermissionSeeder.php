<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    public function run(): void
    {
        $permissions = [
            ['name' => 'manage_users', 'description' => 'Create, read, update, delete users'],
            ['name' => 'manage_posts', 'description' => 'Moderate and manage all posts'],
            ['name' => 'manage_settings', 'description' => 'Manage application settings'],
            ['name' => 'view_analytics', 'description' => 'View analytics and reports'],
            ['name' => 'view_audit_logs', 'description' => 'View audit logs'],
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate($permission);
        }
    }
}
