<?php
$data = json_decode(file_get_contents('php://input'), true);
$name = $data['name'];
$email = $data['email'];
$password = $data['password'];

$users = json_decode(file_get_contents('users.json'), true);

foreach ($users as $user) {
    if ($user['email'] === $email) {
        echo json_encode(['message' => 'البريد الإلكتروني مستخدم بالفعل']);
        http_response_code(400);
        exit;
    }
}

$users[] = ['name' => $name, 'email' => $email, 'password' => $password];
file_put_contents('users.json', json_encode($users, JSON_PRETTY_PRINT));

echo json_encode(['message' => 'تم التسجيل بنجاح']);
?>
