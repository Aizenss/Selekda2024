<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Portfolio;
use Illuminate\Http\Request;

class PortfoliogController extends Controller
{
    public function index()
    {
        $portfolio = Portfolio::all();
        return response()->json([
            'data' => $portfolio
        ], 200);
    }
    public function store(Request $request)
    {
        $validated = $request->validate([
            'portfoliotitle' => 'required',
            'portfolioimage' => 'nullable',
            'portfoliodescription' => 'required',
            'author' => 'required',
        ]);

        Portfolio::create($validated);
        return response()->json([
            'message' => 'Portfolio created successfully',
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'portfoliotitle' => 'required',
            'portfolioimage' => 'nullable',
            'portfoliodescription' => 'required',
            'author' => 'required',
        ]);

        $portfolio = Portfolio::findOrFail($id);
        $portfolio->update($validated);

        return response()->json([
            'message' => 'Portfolio updated successfully',
        ], 200);
    }

    public function destroy($id)
    {
        $portfolio = Portfolio::findOrFail($id);
        $portfolio->delete();

        return response()->json([
            'message' => 'Portfolio deleted successfully',
        ], 200);
    }
}
