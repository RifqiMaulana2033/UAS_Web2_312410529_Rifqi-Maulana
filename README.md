# UAS Pemrograman Web 2 - E-Report Warga 🚀

**Sistem Pelaporan Pengaduan Layanan Masyarakat (E-Report)**  
Proyek Ujian Akhir Semester (UAS) mata kuliah Pemrograman Web 2, Universitas Pelita Bangsa.

👤 **Pengembang:** Rifqi Maulana  
💳 **NIM:** 312410529
📚 **Arsitektur:** Decoupled Architecture (Backend Server & Frontend SPA Terpisah)

---

## 📝 Deskripsi Singkat
E-Report adalah sistem informasi berbasis web yang memfasilitasi masyarakat untuk melaporkan keluhan terkait infrastruktur dan keamanan. Sistem ini memisahkan hak akses antara Masyarakat (Pelapor) dan Administrator, serta dibangun menggunakan arsitektur RESTful API.

**Teknologi yang Digunakan:**
*   **Backend:** CodeIgniter 4 (RESTful API Server)
*   **Frontend:** VueJS 3 (CDN) & Vue Router
*   **UI/UX:** TailwindCSS (Utility-first framework)
*   **Database:** MySQL
*   **HTTP Client:** Axios

---

## 📸 Dokumentasi Sistem

### 1. Skema Relasi Database
![Relasi Tabel Database](https://github.com/RifqiMaulana2033/UAS_Web2_312410529_Rifqi-Maulana/blob/main/Screenshot/Tabel%20relasi.png)
*Relasi antara tabel users, kategori, dan pengaduan.*

### 2. Proteksi Keamanan Server (Error 401 Unauthorized)
![Postman Error 401](https://github.com/RifqiMaulana2033/UAS_Web2_312410529_Rifqi-Maulana/blob/main/Screenshot/postman401.png)
*Uji coba tembak endpoint API tanpa melampirkan Authorization Bearer Token via Postman.*

### 3. Antarmuka Pengguna (User Interface)
*Aplikasi didesain sepenuhnya menggunakan utility class dari TailwindCSS.*

**A. Halaman Login**  
![Halaman Login](https://github.com/RifqiMaulana2033/UAS_Web2_312410529_Rifqi-Maulana/blob/main/Screenshot/login.png)

**B. Dashboard Admin & Tabel Data**  
![Dashboard Admin](https://github.com/RifqiMaulana2033/UAS_Web2_312410529_Rifqi-Maulana/blob/main/Screenshot/admin%20page.png)

**C. Modal Tambah/Edit Data (Aduan)**  
![Form tambahl](https://github.com/RifqiMaulana2033/UAS_Web2_312410529_Rifqi-Maulana/blob/main/Screenshot/tambah%20data.png)
![Form editl](https://github.com/RifqiMaulana2033/UAS_Web2_312410529_Rifqi-Maulana/blob/main/Screenshot/edit.png)

---

## ⚙️ Petunjuk Instalasi (Localhost)

Jika ingin menjalankan aplikasi ini di komputer lokal, ikuti langkah berikut:

### Persiapan Backend (API)
1. Aktifkan Apache dan MySQL pada XAMPP.
2. Buat database baru bernama `uas_ereport`.
3. Import file `database.sql` yang terdapat di dalam folder `backend-api` ke database tersebut.
4. Buka terminal/command prompt di dalam folder `backend-api`.
5. Jalankan perintah berikut untuk mengaktifkan server CodeIgniter 4:
```bash
   php spark serve
```
API akan berjalan di http://localhost:8080

## Persiapan Frontend (SPA)
Buka folder frontend-spa.

Edit file assets/js/app.js dan pastikan variabel URL mengarah ke localhost:
```bash
const apiUrl = 'http://localhost:8080/api';
```

1. Buka file index.html langsung melalui web browser (direkomendasikan menggunakan ekstensi Live Server di VSCode).
2. Aplikasi siap digunakan.

(Catatan: Aplikasi ini dapat mengalami CORS Block/Error jika di-hosting terpisah pada layanan Free Hosting tertentu yang memiliki sistem keamanan Anti-Bot ketat. Menjalankan di Localhost sangat direkomendasikan untuk pengujian penuh).

## 🔗 Tautan
🌐 Link Live Demo (Vercel): https://uas-web2-312410529-rifqi-maulana.vercel.app/#/

🎬 Link Video Presentasi: 
