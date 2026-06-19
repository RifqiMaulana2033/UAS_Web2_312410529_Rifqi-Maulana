const Home = {
    template: `
        <div class="flex flex-col items-center justify-center py-20 text-center">
            <div class="bg-blue-50 p-10 rounded-3xl shadow-sm border border-blue-100 max-w-4xl">
                <h1 class="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                    Lapor Cepat, <span class="text-blue-600">Tindak Tepat!</span>
                </h1>
                <p class="text-lg text-gray-600 mb-8 leading-relaxed">
                    Selamat datang di <strong>E-Report Warga</strong>. Platform pengaduan masyarakat terpadu untuk infrastruktur, keamanan, dan kebersihan lingkungan Anda.
                </p>
                <div class="flex justify-center gap-4">
                    <router-link to="/login" class="bg-blue-600 text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 hover:-translate-y-1 transition transform duration-200">
                        Masuk ke Panel Laporan
                    </router-link>
                </div>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 w-full max-w-5xl">
                <div class="bg-white p-6 rounded-xl shadow border border-gray-100">
                    <div class="text-3xl mb-4">🛣️</div>
                    <h3 class="font-bold text-xl mb-2">Infrastruktur</h3>
                    <p class="text-gray-500 text-sm">Laporkan jalan rusak, lampu mati, atau fasilitas umum yang terbengkalai.</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow border border-gray-100">
                    <div class="text-3xl mb-4">👮</div>
                    <h3 class="font-bold text-xl mb-2">Keamanan</h3>
                    <p class="text-gray-500 text-sm">Laporkan gangguan ketertiban, premanisme, atau tindak kejahatan di lingkungan.</p>
                </div>
                <div class="bg-white p-6 rounded-xl shadow border border-gray-100">
                    <div class="text-3xl mb-4">🗑️</div>
                    <h3 class="font-bold text-xl mb-2">Kebersihan</h3>
                    <p class="text-gray-500 text-sm">Laporkan tumpukan sampah liar, saluran air mampet, atau pencemaran.</p>
                </div>
            </div>
        </div>
    `
};