<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\SignUpRequest;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{
    public function signup(SignUpRequest $request)
    {
        $data = $request->validated();
        /**
         * @var UploadedFile|null $image
         */

        $image = $data['image'];
        try {
            $imageName = Str::random(32).".".$image->getClientOriginalExtension();

            $user = User::create([
                'name' => $data['name'],
                'image' => $imageName,
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
                'address' =>  $data['address'],
                'phone_number' => $data['phone_number']
            ]);

            Storage::disk('public')->put($imageName, file_get_contents($image));

            $token = $user->createToken('main')->plainTextToken;
    
            return response(compact('user', 'token'));
        } catch (Exception $e) {
            return response()->json([
                'message' => 'Invalid image'
            ], 500);
        }
          
        
    }

    public function login(LoginRequest $request)
    {
        $credentials = $request->validated();
        if(!Auth::attempt($credentials))
        {
            $error = 'the provided credentials are not correct';
            return response(compact('error'), 422);
        }

        /** @var  \App\Models\User $user */

        $user = Auth::user();
        $token = $user->createToken('main')->plainTextToken;

        return response(compact('user', 'token'));
    }
    public function logout(Request $request)
    {
        /** @var  \App\Models\User $user */
        $user = Auth::user();
        $user->currentAccessToken()->delete();

        return response(
            [
                'success' => true
            ]
        );
    }
}
