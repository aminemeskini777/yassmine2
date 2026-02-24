<?php

use App\Http\Middleware\RoleMiddleware;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;

return Application::configure(basePath: dirname(__DIR__))

    // Routes
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        api: __DIR__.'/../routes/api.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )

    // Middleware
    ->withMiddleware(function (Middleware $middleware): void {
        // Middleware global (cors, logging…)
        $middleware->use([\Illuminate\Http\Middleware\HandleCors::class]);

        // Middleware alias pour routes API / web
        $middleware->alias([
            'role' => RoleMiddleware::class,   // ton middleware role
            'auth' => \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);

        // Middleware par groupe si besoin
        $middleware->api([
            'auth' => \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
        ]);
    })

    // Exceptions personnalisées
    ->withExceptions(function (Exceptions $exceptions): void {
        // Exemple : personnaliser la réponse JSON pour les erreurs
        $exceptions->render(function (Throwable $e, Request $request) {
            return response()->json([
                'message' => $e->getMessage()
            ], $e->getCode() ?: 500);
        });
    })

    ->create();
