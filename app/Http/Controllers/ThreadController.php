<?php

namespace App\Http\Controllers;

use App\Models\Thread;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;
use App\Events\ThreadCreated;

class ThreadController extends Controller
{
    /**
     * Display the main discussion board.
     */
    public function index()
    {
        $threads = Thread::with(['user:id,name', 'comments.user:id,name'])->latest()->get();

        return Inertia::render('Threads/Index', [
            'threads' => $threads
        ]);
    }

    /**
     * Save a new thread to the database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'required|string|max:50',
        ]);

        $thread = Auth::user()->threads()->create($validated);

        $thread->load('user:id,name');

        ThreadCreated::dispatch($thread);

        return redirect()->route('threads.index');
    }
}