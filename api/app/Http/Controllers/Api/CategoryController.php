<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = Category::withCount('products')->orderBy('name')->get();
        
        return CategoryResource::collection($categories)
        ->response()
        ->setStatusCode(200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $category = Category::create($request->validated());
        
        return new CategoryResource($category)
        ->response()
        ->setStatusCode(201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, string $id)
    {
        $category = Category::findOrFail($id);
        
        $category->update($request->validated());
        
        return new CategoryResource($category)
        ->response()
        ->setStatusCode(200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::findOrFail($id);
        
        $productsCount = $category->products()->count();
        
        if($productsCount > 0){
            return response()->json([
                'message' => "Deze categorie bevat nog {$productsCount} producten en kan niet worden verwijderd.",
            ], 409);
        }
        
        $category->delete();
        
        return response()->noContent();
    }
}
