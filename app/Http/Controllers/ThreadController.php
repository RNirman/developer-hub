<?php

namespace App\Http\Controllers;

use App\Models\Thread;
use App\Models\Vote;
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
        $userId = Auth::id();
        
        $threads = Thread::with([
            'user:id,name,reputation', 
            'comments.user:id,name'
        ])
        ->withCount('votes')
        ->latest()
        ->get()
        ->map(function ($thread) use ($userId) {
            $thread->user_has_voted = $thread->votes()->where('user_id', $userId)->exists();
            return $thread;
        });

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

        $thread->load('user:id,name,reputation');

        ThreadCreated::dispatch($thread);

        return redirect()->route('threads.index');
    }

    /**
     * Upvote a thread.
     */
    public function upvote(Thread $thread)
    {
        $userId = Auth::id();

        // Prevent upvoting own thread or duplicate votes
        if ($thread->user_id === $userId) {
            return back()->with('error', 'Cannot upvote your own thread.');
        }

        $voteExists = Vote::where('user_id', $userId)->where('thread_id', $thread->id)->exists();

        if (!$voteExists) {
            Vote::create([
                'user_id' => $userId,
                'thread_id' => $thread->id,
            ]);

            $thread->user->increment('reputation', 1);
        }

        return redirect()->route('threads.index');
    }
}