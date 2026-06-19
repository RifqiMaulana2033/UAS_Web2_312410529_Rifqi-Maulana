const Login = {
    template: `
        <div class="max-w-md mx-auto mt-10 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
            <div class="text-center mb-8">
                <h2 class="text-3xl font-bold text-gray-800">Masuk Akun</h2>
                <p class="text-gray-500 text-sm mt-2">Silakan login untuk mengelola pengaduan</p>
            </div>

            <div v-if="errorMsg" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
                <p class="font-bold">Error</p>
                <p>{{ errorMsg }}</p>
            </div>

            <form @submit.prevent="doLogin" class="space-y-6">
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                    <input type="email" v-model="email" required 
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                        placeholder="admin@ereport.com">
                </div>
                
                <div>
                    <label class="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                    <input type="password" v-model="password" required 
                        class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition" 
                        placeholder="••••••••">
                </div>

                <button type="submit" :disabled="isLoading" 
                    class="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition disabled:opacity-50">
                    {{ isLoading ? 'Memproses...' : 'Masuk Aplikasi' }}
                </button>
            </form>
        </div>
    `,
    data() {
        return {
            email: '',
            password: '',
            errorMsg: '',
            isLoading: false
        }
    },
    methods: {
        doLogin() {
            this.isLoading = true;
            this.errorMsg = '';
            
            // Tembak API CI4 lu
            axios.post(apiUrl + '/login', {
                email: this.email,
                password: this.password
            })
            .then(response => {
                const res = response.data;
                if(res.status === 200) {
                    // Simpan data ke Brankas Browser
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('userToken', res.data.token);
                    localStorage.setItem('userRole', res.data.role);
                    localStorage.setItem('userName', res.data.username);
                    localStorage.setItem('userId', res.data.id);
                    
                    // Kasih tau app.js kalau kita udah login
                    this.$root.checkAuth(); 
                    
                    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Login Berhasil!', showConfirmButton: false, timer: 2000 });
                    
                    // Pindah ke Dashboard
                    this.$router.push('/dashboard');
                }
            })
            .catch(error => {
                if (error.response && error.response.data.messages) {
                    this.errorMsg = error.response.data.messages.error || error.response.data.messages;
                } else {
                    this.errorMsg = 'Kesalahan jaringan atau server mati.';
                }
            })
            .finally(() => {
                this.isLoading = false;
            });
        }
    }
};