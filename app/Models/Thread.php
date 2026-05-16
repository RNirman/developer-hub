<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Thread extends Model
{
    use HasFactory;

    // Allow these fields to be saved from our controller
    protected $fillable = ['title', 'body', 'category'];

    // A thread belongs to the user who created it
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}