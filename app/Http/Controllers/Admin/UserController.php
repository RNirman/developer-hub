<?php

namespace App\Http\Controllers\Admin;

use App\Models\User;
use App\Models\AuditLog;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController
{
    public function index(Request $request)
    {
        $query = User::query();

        if ($request->search) {
            $query->where('name', 'like', "%{$request->search}%")
                ->orWhere('email', 'like', "%{$request->search}%");
        }

        if ($request->role) {
            $query->where('role', $request->role);
        }

        $users = $query->paginate(15);

        return Inertia::render('AdminUsersIndex', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
            'roles' => ['user', 'moderator', 'admin'],
        ]);
    }

    public function create()
    {
        return Inertia::render('AdminUsersCreate', [
            'roles' => ['user', 'moderator', 'admin'],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:8',
            'role' => 'required|in:user,moderator,admin',
        ]);

        $user = User::create($validated);

        AuditLog::log('create_user', 'User', $user->id, null, "Created user: {$user->name}");

        return redirect()->route('admin.users.index')->with('success', 'User created successfully');
    }

    public function show(User $user)
    {
        return Inertia::render('AdminUsersShow', [
            'user' => $user,
            'audit_logs' => $user->auditLogs()->latest()->limit(20)->get(),
        ]);
    }

    public function edit(User $user)
    {
        return Inertia::render('AdminUsersEdit', [
            'user' => $user,
            'roles' => ['user', 'moderator', 'admin'],
        ]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'role' => 'required|in:user,moderator,admin',
        ]);

        $changes = [];
        foreach ($validated as $key => $value) {
            if ($user->$key !== $value) {
                $changes[$key] = ['old' => $user->$key, 'new' => $value];
            }
        }

        $user->update($validated);

        AuditLog::log('update_user', 'User', $user->id, $changes, "Updated user: {$user->name}");

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully');
    }

    public function updateRole(Request $request, User $user)
    {
        $validated = $request->validate([
            'role' => 'required|in:user,moderator,admin',
        ]);

        $old_role = $user->role;
        $user->update($validated);

        AuditLog::log('update_role', 'User', $user->id, ['role' => $old_role, 'new_role' => $validated['role']], "Changed role for {$user->name}");

        return redirect()->back()->with('success', 'User role updated successfully');
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return redirect()->back()->with('error', 'You cannot delete your own account');
        }

        AuditLog::log('delete_user', 'User', $user->id, null, "Deleted user: {$user->name}");
        
        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully');
    }
}
