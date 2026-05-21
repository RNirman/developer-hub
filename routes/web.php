<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\Admin\DashboardController as AdminDashboardController;
use App\Http\Controllers\Admin\UserController as AdminUserController;
use App\Http\Controllers\Admin\PostController as AdminPostController;
use App\Http\Controllers\Admin\SettingController as AdminSettingController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\ThreadController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// Grouping routes that require a user to be logged in
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/threads', [ThreadController::class, 'index'])->name('threads.index');
    Route::post('/threads', [ThreadController::class, 'store'])->name('threads.store');
    Route::delete('/threads/{thread}', [ThreadController::class, 'destroy'])->name('threads.destroy');
    Route::post('/threads/{thread}/upvote', [ThreadController::class, 'upvote'])->name('threads.upvote');
    Route::post('/threads/{thread}/comments', [CommentController::class, 'store'])->name('comments.store');
    Route::delete('/comments/{comment}', [CommentController::class, 'destroy'])->name('comments.destroy');
});

// Admin Routes
Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminDashboardController::class, 'index'])->name('dashboard');
    
    Route::resource('users', AdminUserController::class);
    Route::post('users/{user}/update-role', [AdminUserController::class, 'updateRole'])->name('users.update-role');
    
    Route::resource('posts', AdminPostController::class);
    Route::post('posts/{id}/update-status', [AdminPostController::class, 'updateStatus'])->name('posts.update-status');
    
    Route::resource('settings', AdminSettingController::class)->only(['index', 'update']);
});

require __DIR__.'/auth.php';
