<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Models\Category;
use Exception;
use Illuminate\Http\Request;

class CategoriesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
        try {
            $categories = Category::paginate(10);
            return response()->json([
            'category' => $categories
        ], 200);
        } catch (Exception $e) {
            return response()->json(
                [
                    'message' => 'unable to fetch categories from database',
                    'error' => $e->getMessage()
                ]
                );
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {

        try {
            $data = $request->validated();
            $category = Category::create($data);
            return response()->json([
               'message' => 'Category created successfully',
                'category' => $category
            ], 201);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'unable to store data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $category = Category::find($id);
            return response()->json([
                'category' => $category
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => 'unable to show data',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(CategoryRequest $request, string $id)
    {
        $data = $request->validated();
        try {
            $category = Category::find($id);
            if(!$category){
                return response()->json([
                   'message' => 'Category not found'
                ], 404);
            }
            $category->name = $data['name'];
            $category->save();
            return response()->json([
               'message' => 'Category updated successfully',
                'category' => $category
            ], 200);
        } catch (Exception $e) {
            return response()->json([
               'message' => 'Error occurred while updating category',
                'error' => $e->getMessage()
            ], 500);
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = Category::find($id);
        $category->delete();
        return response()->json([
           'message' => 'Category deleted successfully'
        ], 200);
    }
}
