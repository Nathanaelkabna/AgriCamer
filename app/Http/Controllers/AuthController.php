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
        
        
        /** @var  \App\Models\User $user */
        
        // $image = $request->validated('image');
        // $imagePath = Storage::disk('public')->put('images', $image);
        // $imageUrl = asset('storage/images/'.$image);
        // $data['image'] = $imageUrl;

        

        $image = $data['image'];
        if($image !== null && !$image->getError()){
            $imagePath = $image->store('users', 'public');
        }

        $data['image'] = $imagePath;
            
        
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

    private function saveImage($image){
        if(preg_match('/^data:image\/(\w+);base64,/', $image, $type)){
            $image = substr($image, strpos($image, ',') + 1);
            $type = strtolower($type[1]);
        
            if(!in_array($type, ['png', 'jpg', 'jpeg', 'gif'])){
                throw new \Exception('invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if($image === false){
                throw new \Exception('base64_decode failed');
            }
        }else{
            throw new \Exception('did not match data url with image data');
        }


        $dir = 'images/';
        $file = Str::random().'.'.$type; 
        $absolutePath = public_path($dir);
        $relativePath = $dir.$file;

        if(!File::exists($absolutePath)){
            File::makeDirectory($absolutePath, 0755, true);
        }

        file_put_contents($relativePath, $image);
        
        return $relativePath;
    }
}
