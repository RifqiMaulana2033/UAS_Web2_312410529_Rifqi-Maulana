const Dashboard = {
    template: `
        <div>
            <div class="flex justify-between items-center mb-6">
                <div>
                    <h2 class="text-3xl font-bold text-gray-800">
                        {{ role === 'admin' ? 'Panel Admin' : 'Dashboard Warga' }}
                    </h2>
                    <p class="text-gray-500">
                        {{ role === 'admin' ? 'Kelola aduan masuk dan update status penanganan' : 'Pantau dan laporkan keluhan Anda di sini' }}
                    </p>
                </div>
                
                <button v-if="role === 'masyarakat'" @click="openModal" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg shadow transition flex items-center gap-2">
                    <span>+ Buat Laporan</span>
                </button>
            </div>

            <div class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-800 text-white text-sm uppercase tracking-wider">
                            <th class="p-4 border-b">Tgl Lapor</th>
                            <th class="p-4 border-b">Pelapor</th>
                            <th class="p-4 border-b">Kategori</th>
                            <th class="p-4 border-b">Isi Aduan</th>
                            <th class="p-4 border-b text-center">Status</th>
                            <th v-if="role === 'admin'" class="p-4 border-b text-center">Aksi Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="pengaduanList.length === 0">
                            <td colspan="6" class="p-6 text-center text-gray-500 italic">Belum ada data pengaduan...</td>
                        </tr>
                        <tr v-for="item in pengaduanList" :key="item.id" class="hover:bg-gray-50 border-b border-gray-100 transition">
                            <td class="p-4 text-sm text-gray-600 font-medium">{{ formatTanggal(item.tanggal_lapor) }}</td>
                            <td class="p-4 font-semibold text-gray-800">{{ item.username || 'Sistem' }}</td>
                            <td class="p-4 text-sm text-gray-600">{{ item.nama_kategori }}</td>
                            <td class="p-4 text-gray-600">{{ item.isi_laporan }}</td>
                            <td class="p-4 text-center">
                                <span :class="{'bg-yellow-100 text-yellow-800': item.status === 'menunggu', 'bg-blue-100 text-blue-800': item.status === 'diproses', 'bg-green-100 text-green-800': item.status === 'selesai'}" class="px-3 py-1 rounded-full text-xs font-bold uppercase">
                                    {{ item.status }}
                                </span>
                            </td>
                            <!-- Tombol ACC dan Hapus HANYA BUAT ADMIN -->
                            <td v-if="role === 'admin'" class="p-4 align-middle w-32">
                                <div class="flex flex-col gap-2">
                                    <!-- Select ditarik value-nya dari item.status -->
                                    <select @change="updateStatus(item.id, $event.target.value)" :value="item.status" class="w-full text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-md px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer shadow-sm hover:border-blue-400 transition">
                                        <option value="menunggu">Menunggu</option>
                                        <option value="diproses">Diproses</option>
                                        <option value="selesai">Selesai</option>
                                    </select>
                                    
                                    <button @click="hapusData(item.id)" class="w-full text-xs font-bold text-red-600 border border-red-200 bg-red-50 hover:bg-red-500 hover:text-white px-2 py-1.5 rounded-md transition duration-200 shadow-sm flex items-center justify-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        Hapus
                                    </button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="showModal && role === 'masyarakat'" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                <div class="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                    <div class="bg-gray-50 px-6 py-4 border-b border-gray-100 flex justify-between items-center">
                        <h3 class="font-bold text-xl text-gray-800">Kirim Aduan Baru</h3>
                        <button @click="closeModal" class="text-gray-400 hover:text-red-500 text-2xl font-bold">&times;</button>
                    </div>
                    
                    <form @submit.prevent="simpanData" class="p-6 space-y-4">
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Kategori Aduan</label>
                            <select v-model="form.id_kategori" required class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none">
                                <option value="1">Infrastruktur (Jalan, Jembatan)</option>
                                <option value="2">Keamanan (Kriminalitas)</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-semibold text-gray-700 mb-1">Isi Laporan</label>
                            <textarea v-model="form.isi_laporan" required rows="4" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Ceritakan detail aduan Anda..."></textarea>
                        </div>
                        
                        <div class="flex justify-end gap-3 mt-6">
                            <button type="button" @click="closeModal" class="px-5 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold transition">Batal</button>
                            <button type="submit" class="px-5 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition">Kirim Aduan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    data() {
        return {
            pengaduanList: [],
            showModal: false,
            role: localStorage.getItem('userRole') || 'masyarakat', // Tarik role dari penyimpanan login
            form: {
                id_user: localStorage.getItem('userId'),
                id_kategori: '1',
                isi_laporan: '',
                status: 'menunggu'
            }
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        formatTanggal(teksTanggal) {
            if (!teksTanggal) return '-';
            const date = new Date(teksTanggal);
            return new Intl.DateTimeFormat('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            }).format(date) + ' WIB';
        },
        fetchData() {
            axios.get(apiUrl + '/pengaduan')
                .then(res => {
                    this.pengaduanList = res.data;
                })
                .catch(err => console.error(err));
        },
        openModal() {
            this.form.isi_laporan = '';
            this.showModal = true;
        },
        closeModal() {
            this.showModal = false;
        },
        simpanData() {
            axios.post(apiUrl + '/pengaduan', this.form)
                .then(res => {
                    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Aduan berhasil dikirim!', showConfirmButton: false, timer: 2000 });
                    this.closeModal();
                    this.fetchData();
                })
                .catch(err => {
                    Swal.fire('Error', 'Gagal menyimpan data (Cek Token/Koneksi)', 'error');
                });
        },
        // FUNGSI BARU BUAT ADMIN: EDIT STATUS
        updateStatus(id, statusBaru) {
            axios.put(apiUrl + '/pengaduan/' + id, { status: statusBaru })
                .then(res => {
                    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Status diperbarui!', showConfirmButton: false, timer: 2000 });
                    this.fetchData();
                })
                .catch(err => {
                    Swal.fire('Error', 'Gagal update status', 'error');
                });
        },
        hapusData(id) {
            Swal.fire({
                title: 'Hapus Aduan?',
                text: "Data yang dihapus tidak bisa dikembalikan!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ya, Hapus!'
            }).then((result) => {
                if (result.isConfirmed) {
                    axios.delete(apiUrl + '/pengaduan/' + id)
                        .then(res => {
                            Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Terhapus!', showConfirmButton: false, timer: 2000 });
                            this.fetchData();
                        })
                        .catch(err => console.error(err));
                }
            })
        }
    }
};