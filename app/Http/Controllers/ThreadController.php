<?php

namespace App\Http\Controllers;

use App\Models\Thread;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class ThreadController extends Controller
{
    /**
     * Display the main discussion board.
     */
    public function index()
    {
        // Fetch threads, newest first. 
        // We use 'with' to grab the author's name at the same time (Eager Loading) to prevent extra database queries.
        $threads = Thread::with('user:id,name')->latest()->get();

        // Pass the data to a React component named 'Threads/Index'
        return Inertia::render('Threads/Index', [
            'threads' => $threads
        ]);
    }

    /**
     * Save a new thread to the database.
     */
    public function store(Request $request)
    {
        // 1. Validate the incoming React form data
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'category' => 'required|string|max:50',
        ]);

        // 2. Create the thread attached to the currently logged-in user
        $thread = Auth::user()->threads()->create($validated);

        // TODO: In the next phase, we will trigger our Reverb WebSocket Event here!
        // ThreadCreated::dispatch($thread);

        // 3. Redirect back to the index (Inertia handles this without a full page reload)
        return redirect()->route('threads.index');
    }
}