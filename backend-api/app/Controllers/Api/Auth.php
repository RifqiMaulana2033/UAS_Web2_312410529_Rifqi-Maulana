<?php
namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\UserModel;

class Auth extends ResourceController
{
    protected $format = 'json';

    public function login()
    {
        $json = $this->request->getJSON();
        $email = $json->email ?? $this->request->getVar('email');
        $password = $json->password ?? $this->request->getVar('password');

        if (empty($email) || empty($password)) {
            return $this->failUnauthorized('Email atau Password tidak boleh kosong.');
        }

        $model = new UserModel();
        $user = $model->where('email', $email)->first();

        if ($user) {
            // Karena ini project baru, kita asumsikan password disimpen polos dulu biar gampang ngetesnya. 
            // Kalau mau dipakein password_verify juga aman.
            if ($password === $user['password'] || password_verify($password, $user['password'])) {
                return $this->respond([
                    'status'   => 200,
                    'messages' => 'Login Berhasil',
                    'data'     => [
                        'id'       => $user['id'],
                        'username' => $user['username'],
                        'role'     => $user['role'],
                        'token'    => base64_encode("TOKEN-RAHASIA-UAS-" . $user['id'])
                    ]
                ], 200);
            }
        }
        return $this->failUnauthorized('Email atau Password salah.');
    }
}