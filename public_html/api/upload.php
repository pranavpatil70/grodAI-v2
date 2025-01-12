<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Authorization, Content-Type');
header('Content-Type: application/json');

try {
    $headers = getallheaders();
    $api_key = isset($headers['Authorization']) ? str_replace('Bearer ', '', $headers['Authorization']) : '';

    if ($_FILES['file']) {
        $upload_dir = '../uploads/tts-files/';
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0755, true);
        }

        $file = $_FILES['file'];
        $filename = uniqid() . '_' . basename($file['name']);
        $target_path = $upload_dir . $filename;

        if (move_uploaded_file($file['tmp_name'], $target_path)) {
            $file_url = 'https://grodai.in/uploads/tts-files/' . $filename;
            echo json_encode(['success' => true, 'fileUrl' => $file_url]);
        } else {
            throw new Exception('Failed to move uploaded file');
        }
    } else {
        echo json_encode(['error' => 'No file provided']);
    }
} catch (Exception $e) {
    error_log($e->getMessage());
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?> 