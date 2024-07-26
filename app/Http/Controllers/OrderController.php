<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderStoreRequest;
use App\Http\Requests\OrderUpdateRequest;
use App\Models\OrderProduct;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = OrderProduct::all();
        return response()->json([
            'order' => $orders
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderStoreRequest $request)
    {
        $data = $request->validated();
        $order = OrderProduct::create($data);
        return response()->json([
            'order' => $order,
            'message' => 'order successfully registered',
        ], 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = OrderProduct::where('user_id',$id)->orderBy('id', 'desc')->get();
        return response()->json([
            'order' => $order,
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderUpdateRequest $request, string $id)
    {
        $data = $request->validated();
        $order = OrderProduct::find($id);
        $order->update($data);
        $order->save();
        return response()->json(
            [
                'message' => 'order successfully updated'
            ],200
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $order = OrderProduct::where('user_id',$id);
        $order->delete();
        return response()->json(
            [
               'message' => 'order successfully deleted'
            ],200
        );
    }
}
