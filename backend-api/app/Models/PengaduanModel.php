<?php
namespace App\Models;
use CodeIgniter\Model;

class PengaduanModel extends Model
{
    protected $table = 'pengaduan';
    protected $primaryKey = 'id';
    protected $allowedFields = ['id_user', 'id_kategori', 'isi_laporan', 'foto_bukti', 'status', 'tanggal_lapor'];
}