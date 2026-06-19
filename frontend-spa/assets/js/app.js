const { createApp } = Vue;
const { createRouter, createWebHashHistory } = VueRouter;

const apiUrl = 'e-reportwarga.gt.tc';

// --- AXIOS INTERCEPTORS ---
// 1. Menyuntikkan Token otomatis setiap kali nge-request ke server
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// 2. Menangkap Error 401 secara Global (KECUALI SAAT LAGI DI HALAMAN LOGIN)
axios.interceptors.response.use((response) => {
    return response;
}, (error) => {
    // Kunci utama: Cek apakah user lagi di halaman login atau bukan
    const isDiHalamanLogin = window.location.hash === '#/login';

    if (error.response && error.response.status === 401 && !isDiHalamanLogin) {
        Swal.fire({
            icon: 'error',
            title: 'Sesi Berakhir',
            text: 'Token Anda tidak sah atau sudah habis. Silakan login kembali.'
        }).then(() => {
            // Baru reload SETELAH user mencet OK
            localStorage.clear();
            window.location.href = '#/login';
            window.location.reload();
        });
    }
    return Promise.reject(error);
});

// --- VUE ROUTER & NAVIGATION GUARDS ---
const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
    { 
        path: '/dashboard', 
        component: Dashboard,
        meta: { requiresAuth: true } // Kunci halaman ini!
    }
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

// Pencegat Rute (Navigation Guards)
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';

    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated) {
        Swal.fire({
            toast: true,
            position: 'top-end',
            icon: 'warning',
            title: 'Akses Ditolak!',
            text: 'Silakan login sebagai admin.',
            showConfirmButton: false,
            timer: 3000
        });
        next('/login');
    } else {
        next();
    }
});

// --- INISIALISASI VUE APP ---
const app = createApp({
    data() {
        return {
            isLoggedIn: false,
            userRole: ''
        }
    },
    mounted() {
        this.checkAuth();
    },
    methods: {
        checkAuth() {
            this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            this.userRole = localStorage.getItem('userRole') || '';
        },
        logout() {
            Swal.fire({
                title: 'Yakin ingin keluar?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#d33',
                cancelButtonColor: '#3085d6',
                confirmButtonText: 'Ya, Logout!'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear();
                    this.isLoggedIn = false;
                    this.userRole = '';
                    this.$router.push('/');
                    Swal.fire({ toast: true, position: 'top-end', icon: 'success', title: 'Berhasil logout', showConfirmButton: false, timer: 2000 });
                }
            });
        }
    }
});

app.use(router);
app.mount('#app');