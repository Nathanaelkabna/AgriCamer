<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Services\NotchPayService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function store(Request $request)
    {
        // Validation des données
        $request->validate([
            'amount' => 'required|numeric',
            'email' => 'required|email',
        ]);

        // Création d'un nouveau paiement
        $payment = new Payment([
            'amount' => $request->amount,
            'currency' => 'XAF', // Ou la devise souhaitée
            'user_id' => 1, // Si l'utilisateur est authentifié
        ]);

        // Appel du service NotchPay
        $notchPay = new NotchPayService();
        $notchPayResponse = $notchPay->createPayment($request->all());

        // Mise à jour du modèle avec la réponse de NotchPay
        $payment->transaction_id = $notchPayResponse->transactionId;
        $payment->status = $notchPayResponse->status;
        $payment->save();

        return response()->json(['message' => 'Paiement en cours de traitement'], 202);
    }
}
