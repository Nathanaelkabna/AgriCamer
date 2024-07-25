<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Http\Requests\ProductsRequest;
use App\Http\Requests\ProductUpdatRequest;
use Exception;
use Illuminate\Support\Facades\Storage;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        try {
            $products = Product::orderBy('id', 'DESC')->paginate(6);
            return response()->json([
            'product' => $products
            ], 200);
        } catch (Exception $e) {
            return response()->json(
                [
                    'message' => 'unable to fetch products from database',
                    'error' => $e->getMessage()
                ]
                );
        }
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductsRequest $request)
    {
        $data = $request->validated();

        $image = $data['image'];
        try {
            $imageName = Str::random(32).".".$image->getClientOriginalExtension();

            Storage::disk('public')->put($imageName, file_get_contents($image));

            $data['image'] = $imageName;

            $product = Product::create([
                'product_name' => $data['product_name'],
                'image' => $data['image'],
                'description' => $data['description'],
                'price_per_unit' => $data['price_per_unit'],
                'farmer_id' =>  $data['farmer_id'],
                'category_id' => $data['category_id']
            ]);
    
            return response()->json([
                'product' => $product
            ]);
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
            $product = Product::find($id);
            if(!$product){
                return response()->json([
                    'message' => 'Product not found'
                ], 404);
            }
            return response()->json([
                'product' => $product
            ], 200);
        } catch (Exception $e) {
            return response()->json(
                [
                    'message' => 'unable to show product',
                    'error' => $e->getMessage()
                ]
                );
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductUpdatRequest $request, string $id)
    {
        $data = $request->validated();
        try {
            $product = Product::find($id);
           
            if($data['image']){
                $storage = Storage::disk('public');

                if($storage->exists($product->image)){
                    $storage->delete($product->image);
                }
                
                
                
                $imageName = Str::random(32).".".$data['image']->getClientOriginalExtension();
    
                $storage->put($imageName, file_get_contents($data['image']));
    
                $data['image'] = $imageName;
            }
            $product->update($data);
            $product->save();
            return response()->json([
                'product' => $product
            ], 200);
        }  catch (Exception $e) {
            return response()->json(
                [
                    'message' => 'unable to update product',
                    'error' => $e->getMessage(),
                ]
                );
        }

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $product = Product::find($id);
            $product->delete();
            return response()->json([
               'message' => 'Product deleted successfully'
            ], 200);
        } catch (Exception $e) {
            return response()->json(
                [
                    'message' => 'unable to delete product',
                    'error' => $e->getMessage(),
                ]
                );
        }

    }
}
