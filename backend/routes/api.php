<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;

// Routes publiques
Route::post('/auth/login', [AuthController::class, 'login']);
Route::post('/users/activate', [UserController::class, 'activate']);

// Routes protégées par Sanctum
Route::middleware('auth:sanctum')->group(function () {
    // Auth
    Route::post('/auth/logout', [AuthController::class, 'logout']);
    Route::get('/auth/me', [AuthController::class, 'me']);

    // CRUD Utilisateurs (protégé par rôle manager)
    Route::middleware('role:manager')->group(function () {
        Route::get('/users', [UserController::class, 'index']);
        Route::post('/users', [UserController::class, 'store']);
        Route::put('/users/{id}', [UserController::class, 'update']);
        Route::delete('/users/{id}', [UserController::class, 'destroy']);
        Route::post('/users/{id}/resend-activation', [UserController::class, 'resendActivation']);
    });
});
