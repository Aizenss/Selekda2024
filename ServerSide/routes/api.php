<?php

use App\Http\Controllers\Api\ApiController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\PortfoliogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::post("register", [ApiController::class, "register"]);
Route::post("login", [ApiController::class, "login"]);

Route::group(['prefix' => 'blog'], function () {
    Route::get("/", [BlogController::class, "index"]);
    Route::post("/", [BlogController::class, "store"]);
    Route::put("/{request}", [BlogController::class, "update"]);
    Route::delete("/{id}", [BlogController::class, "destroy"]);
});

Route::group(['prefix' => 'portfolio'], function () {
    Route::get("/", [PortfoliogController::class, "index"]);
    Route::post("/", [PortfoliogController::class, "store"]);
    Route::put("/{request}", [PortfoliogController::class, "update"]);
    Route::delete("/{request}", [PortfoliogController::class, "destroy"]);
});

