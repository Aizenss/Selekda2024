<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::all();
        return response()->json([
            'data' => $blogs
        ], 200);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'blogimage' => 'nullable',
            'blogtitle' => 'required',
            'description' => 'required',
            'author' => 'required',
            'tags' => 'required',
        ]);

        Blog::create($validated);

        return response()->json([
            'message' => 'Blog created successfully',
        ], 201);
    }
    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'blogimage' => 'nullable',
            'blogtitle' => 'required',
            'description' => 'required',
            'author' => 'required',
            'tags' => 'required',
        ]);

        $blog = Blog::findOrFail($id);
        $blog->update($validated);

        return response()->json([
            'message' => 'Blog updated successfully',
        ], 200);
    }
    public function destroy($id)
    {
        $blog = Blog::findOrFail($id);
        $blog->delete();

        return response()->json([
            'message' => 'Blog deleted successfully',
        ], 200);
    }
}
