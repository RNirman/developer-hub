<?php

namespace App\Http\Controllers\Admin;

use App\Models\Thread;
use App\Models\AuditLog;
use Inertia\Inertia;
use Illuminate\Http\Request;

class PostController
{
    public function index(Request $request)
    {
        $query = Thread::with('user');

        if ($request->search) {
            $query->where('title', 'like', "%{$request->search}%")
                ->orWhere('body', 'like', "%{$request->search}%");
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $posts = $query->paginate(15);

        return Inertia::render('AdminPostsIndex', [
            'posts' => $posts,
            'filters' => $request->only(['search', 'status']),
            'statuses' => ['published', 'draft', 'archived'],
        ]);
    }

    public function create()
    {
        return Inertia::render('AdminPostsCreate', [
            'statuses' => ['published', 'draft', 'archived'],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'status' => 'required|in:published,draft,archived',
        ]);

        $validated['user_id'] = auth()->id();
        $post = Thread::create($validated);

        AuditLog::log('create_post', 'Thread', $post->id, null, "Created post: {$post->title}");

        return redirect()->route('admin.posts.index')->with('success', 'Post created successfully');
    }

    public function show(Thread $post)
    {
        return Inertia::render('AdminPostsShow', [
            'post' => $post->load('user', 'comments.user'),
        ]);
    }

    public function edit(Thread $post)
    {
        return Inertia::render('AdminPostsEdit', [
            'post' => $post,
            'statuses' => ['published', 'draft', 'archived'],
        ]);
    }

    public function update(Request $request, Thread $post)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'status' => 'required|in:published,draft,archived',
        ]);

        $changes = [];
        foreach ($validated as $key => $value) {
            if ($post->$key !== $value) {
                $changes[$key] = ['old' => $post->$key, 'new' => $value];
            }
        }

        $post->update($validated);

        AuditLog::log('update_post', 'Thread', $post->id, $changes, "Updated post: {$post->title}");

        return redirect()->route('admin.posts.index')->with('success', 'Post updated successfully');
    }

    public function updateStatus(Request $request, $id)
    {
        $post = Thread::findOrFail($id);
        
        $validated = $request->validate([
            'status' => 'required|in:published,draft,archived',
        ]);

        $old_status = $post->status ?? 'published';
        $post->update($validated);

        AuditLog::log('update_post_status', 'Thread', $post->id, 
            ['status' => $old_status, 'new_status' => $validated['status']], 
            "Changed post status: {$post->title}");

        return redirect()->back()->with('success', 'Post status updated successfully');
    }

    public function destroy(Thread $post)
    {
        $title = $post->title;
        AuditLog::log('delete_post', 'Thread', $post->id, null, "Deleted post: {$title}");
        
        $post->delete();

        return redirect()->route('admin.posts.index')->with('success', 'Post deleted successfully');
    }
}
