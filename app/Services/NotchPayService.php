<?php

namespace App\Services;

use GuzzleHttp\Client;

class NotchPayService
{
    private $client;

    public function __construct()
    {
        $this->client = new Client([
            'base_uri' => 'https://api.notchpay.co',
            'headers' => [
                'Authorization' => 'Bearer ' . config("pk_test.Z7eYh55KCxSGMSGTcuO4Dbfo42RRYtFyZa2BEL8qFzNpIEnn8oS8gk08LHR4v8hdjRBAkEbhFFGbYokUZ8Ql76h71dh3exiz0HWt6ZFNVgEwhc62LZ5qlzjMlwIRd"),
            ],
        ]);
    }

    public function createPayment($data)
    {
        $response = $this->client->post('/payments', [
            'json' => $data
        ]);

        return json_decode($response->getBody(), true);
    }
}
