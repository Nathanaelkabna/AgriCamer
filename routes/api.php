<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Route::get('/welcome', function(){
//     return "trying my api";
// });
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::get('images/{image}', function($image){
    $path =asset("storage/$image");
    return response(compact('path'));

})->where('image', '.*');

Route::resource('products', ProductController::class);
Route::resource('user-products', UserProductController::class);