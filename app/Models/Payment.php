<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'amount',  
        'currency',
        'status',
        'transaction_id',
        'user_id', // Si vous avez un système d'authentification
    ];

    protected $casts = [
        'amount' => 'decimal:2', // Pour stocker les montants en euros avec deux décimales
    ];
}
