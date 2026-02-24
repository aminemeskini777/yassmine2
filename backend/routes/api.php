<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


Route::post('/auth/login',[AuthController::class,'login']);
Route::post('/auth/logout',[AuthController::class,'logout'])->middleware('auth:sanctum');
Route::get('/auth/me',[AuthController::class,'me'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

    Route::middleware(['auth:sanctum', 'role:manager'])->group(function () {
    Route::post('/users', [UserController::class, 'store']); // Créer un employé
    });
?>

