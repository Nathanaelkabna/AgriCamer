<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json([
            'users' => $users
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $user = User::find($id);
            return response()->json([
                'user' => $user,
            ], 200);
        } catch (Exception $e) {
            return response()->json([
                'message' => "user not found",
                'error' => $e->getMessage(),
            ], 404);
        }

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
