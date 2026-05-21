<?php

namespace App\Http\Controllers;

use App\Models\Thread;
use App\Models\Comment;
use App\Events\CommentCreated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(Request $request, Thread $thread)
    {
        $validated = $request->validate([
            'body' => 'required|string|max:1000',
        ]);

        $comment = $thread->comments()->create([
            'body' => $validated['body'],
            'user_id' => Auth::id(),
        ]);

        // Load the user data before broadcasting
        $comment->load('user:id,name,role');

        CommentCreated::dispatch($comment);

        return back(); // Inertia will smoothly update the page behind the scenes
    }

    public function destroy(Comment $comment)
    {
        $user = Auth::user();

        if ($user->isAdmin() || $user->id === $comment->user_id) {
            $comment->delete();
            return back()->with('success', 'Comment deleted successfully.');
        }

        return back()->with('error', 'Unauthorized access.');
    }
}