<?php
// api/generate.php

// --- DEBUGGING: Display errors. REMOVE these two lines in production! ---
ini_set('display_errors', 1);
error_reporting(E_ALL);

// --- IMPORTANT SECURITY & CONFIGURATION ---
// 1. Get your API Key from Google AI Studio. This key is for the *Vertex AI API* which runs Imagen.
$apiKey = 'AIzaSyAg-qUtelgBrKR-CjVHquFD6aPtLcqb6ss';

// 2. Set your Google Cloud Project ID.
$projectId = 'gen-lang-client-0278563170';

// --- DO NOT EDIT BELOW THIS LINE ---

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit;
}

if (!isset($_FILES['image'])) {
    http_response_code(400);
    echo json_encode(['error' => 'No image file uploaded.']);
    exit;
}

$file = $_FILES['image'];

if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(500);
    echo json_encode(['error' => 'Error uploading file.']);
    exit;
}

$imageData = file_get_contents($file['tmp_name']);
$imageBase64 = base64_encode($imageData);

// CORRECTED: The API endpoint for the Imagen model, using your API key in the URL.
$url = "https://us-central1-aiplatform.googleapis.com/v1/projects/{$projectId}/locations/us-central1/publishers/google/models/imagegeneration@006:predict?key={$apiKey}";

$data = [
    'instances' => [
        [
            'prompt' => "A profile picture of a person, transformed to match the MOOB art style. The style is inspired by a cute, playful, retro gaming character named 'herio'. The colors should be vibrant and warm, blending pixel art with modern design.",
            'image' => [
                'bytesBase64Encoded' => $imageBase64
            ]
        ]
    ],
    'parameters' => [
        'sampleCount' => 1,
        'mimeType' => 'image/png'
    ]
];

$jsonData = json_encode($data);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json'
    // CORRECTED: The Authorization header is removed, as the API key is now in the URL.
]);

$response = curl_exec($ch);
$httpcode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpcode != 200) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to get a response from the AI model.', 'details' => json_decode($response)]);
    exit;
}

$responseData = json_decode($response, true);

if (isset($responseData['predictions'][0]['bytesBase64Encoded'])) {
    $generatedImageBase64 = $responseData['predictions'][0]['bytesBase64Encoded'];
    $generatedImageUrl = 'data:image/png;base64,' . $generatedImageBase64;
    echo json_encode(['imageUrl' => $generatedImageUrl]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'AI did not return a valid image.', 'details' => $responseData]);
}
