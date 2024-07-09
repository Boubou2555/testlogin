<?php
$data = json_decode(file_get_contents('php://input'), true);
$email = $data['email'];
$password = $data['password'];

$users = json_decode(file_get_contents('users.json'), true);

foreach ($users as $user) {
    if ($user['email'] === $email && $user['password'] === $password) {
        echo json_encode(['name' => $user['name'], 'message' => 'تم تسجيل الدخول بنجاح']);
        exit;
    }
}

echo json_encode(['message' => 'البريد الإلكتروني أو كلمة المرور غير صحيحة']);
http_response_code(400);
?>
