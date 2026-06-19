<?php
namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\PengaduanModel;

class Pengaduan extends ResourceController
{
    protected $modelName = 'App\Models\PengaduanModel';
    protected $format    = 'json';

    // GET: Tampil semua data (Akan kita Join sama tabel User & Kategori biar namanya muncul)
    public function index()
    {
        $db = \Config\Database::connect();
        $builder = $db->table('pengaduan');
        $builder->select('pengaduan.*, users.username, kategori_aduan.nama_kategori');
        $builder->join('users', 'users.id = pengaduan.id_user', 'left');
        $builder->join('kategori_aduan', 'kategori_aduan.id = pengaduan.id_kategori', 'left');
        $builder->orderBy('pengaduan.tanggal_lapor', 'DESC');
        
        return $this->respond($builder->get()->getResult());
    }

    // POST: Tambah Laporan Baru
    public function create()
    {
        $data = $this->request->getJSON(true) ?? $this->request->getPost();
        if ($this->model->insert($data)) {
            return $this->respondCreated(['status' => 201, 'messages' => 'Aduan berhasil dikirim!']);
        }
        return $this->fail('Gagal mengirim aduan.');
    }

    // PUT: Update Status (Misal dari "menunggu" jadi "diproses")
    public function update($id = null)
    {
        $data = $this->request->getJSON(true) ?? $this->request->getRawInput();
        if ($this->model->update($id, $data)) {
            return $this->respond(['status' => 200, 'messages' => 'Status aduan berhasil diupdate!']);
        }
        return $this->fail('Gagal mengupdate data.');
    }

    // DELETE: Hapus Data Laporan
    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted(['status' => 200, 'messages' => 'Data aduan berhasil dihapus!']);
        }
        return $this->failNotFound('Data tidak ditemukan.');
    }
}