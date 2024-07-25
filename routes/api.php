<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProductsController;
use App\Http\Controllers\CategoriesController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserProductController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


// Route::get('/welcome', function(){
//     return "trying my api";
// });
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');




Route::resource('userProducts', UserProductController::class);

Route::apiResource('products', ProductsController::class);
Route::apiResource('categories', CategoriesController::class);
Route::apiResource('users', UserController::class);