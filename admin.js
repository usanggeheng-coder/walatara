/* ==========================================
   WALATRA HERBAL ADMIN PANEL JAVASCRIPT
   Author: Antigravity AI
   Logika Dashboard & Sinkronisasi LocalStorage
   ========================================== */

// ==========================================
// 0. DATABASE LAYER (LocalStorage)
// ==========================================
const WalatraDB = {
    KEYS: {
        PRODUCTS: 'walatra_products',
        BARCODES: 'walatra_barcodes',
        MESSAGES: 'walatra_messages',
        LOGS: 'walatra_verification_logs'
    },

    // --- Default Seed Data ---
    DEFAULT_PRODUCTS: [
        {
            id: 1, name: 'QnC Jelly Gamat', category: 'cairan', price: 180000,
            description: 'Formulasi ekstrak Teripang Emas murni multikhasiat untuk mempercepat penyembuhan luka lambung, peradangan, dan regenerasi sel.',
            bpom_number: 'POM TR193629311',
            image_main: "data:image/svg+xml;utf8,<svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect width='100%25' height='100%25' fill='%23f4fbf7'/><circle cx='200' cy='200' r='130' fill='%23e1f5ec'/><rect x='170' y='90' width='60' height='20' rx='5' fill='%23d4af37'/><path d='M150,110 h100 v150 c0,20 -15,35 -35,35 h-30 c-20,0 -35,-15 -35,-35 z' fill='%23095c37'/><rect x='165' y='160' width='70' height='90' rx='5' fill='%23ffffff' stroke='%23d4af37' stroke-width='2'/><text x='200' y='195' font-size='14' font-family='sans-serif' font-weight='bold' fill='%23095c37' text-anchor='middle'>QnC</text><text x='200' y='215' font-size='9' font-family='sans-serif' fill='%23d4af37' font-weight='600' text-anchor='middle'>JELLY GAMAT</text></svg>",
            images_additional: [
                "data:image/svg+xml;utf8,<svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect width='100%25' height='100%25' fill='%23f4fbf7'/><circle cx='200' cy='200' r='130' fill='%23fffcf2'/><path d='M100,220 h200 c0,30 -40,50 -100,50 s-100,-20 -100,-50 z' fill='%23e9ecef'/><path d='M150,220 C180,180 220,180 250,220' fill='none' stroke='%23d4af37' stroke-width='4'/></svg>"
            ],
            badge_text: 'Best Seller', badge_class: 'bg-success-light', is_active: true
        },
        {
            id: 2, name: 'Propolis SM', category: 'cairan', price: 85000,
            description: 'Terbuat dari 100% Propolis Brazil asli yang diolah dengan Nano Technology untuk menangkal radikal bebas, infeksi, dan menjaga imunitas.',
            bpom_number: 'POM TR193624961',
            image_main: "data:image/svg+xml;utf8,<svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect width='100%25' height='100%25' fill='%23fffdf5'/><circle cx='200' cy='200' r='130' fill='%23fef5e7'/><rect x='180' y='90' width='40' height='25' rx='3' fill='%23222222'/><path d='M160,115 h80 v140 c0,15 -10,25 -25,25 h-30 c-15,0 -25,-10 -25,-25 z' fill='%239e5828'/><rect x='170' y='160' width='60' height='80' rx='3' fill='%23ffffff' stroke='%23222222' stroke-width='1.5'/><text x='200' y='195' font-size='11' font-family='sans-serif' font-weight='bold' fill='%239e5828' text-anchor='middle'>PROPOLIS</text><text x='200' y='212' font-size='9' font-family='sans-serif' fill='%23ffc107' font-weight='bold' text-anchor='middle'>SM</text></svg>",
            images_additional: [
                "data:image/svg+xml;utf8,<svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect width='100%25' height='100%25' fill='%23fffdf5'/><path d='M170,150 L200,135 L230,150 L230,180 L200,195 L170,180 Z' fill='none' stroke='%23ffc107' stroke-width='3'/></svg>"
            ],
            badge_text: 'Nano Technology', badge_class: 'bg-warning-light', is_active: true
        },
        {
            id: 3, name: 'Keloreena', category: 'kapsul', price: 87000,
            description: 'Ekstrak Daun Kelor (Moringa Oleifera) berkualitas tinggi yang kaya akan antioksidan, mineral, dan vitamin untuk menutrisi tubuh secara menyeluruh.',
            bpom_number: 'POM TR193332021',
            image_main: "data:image/svg+xml;utf8,<svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect width='100%25' height='100%25' fill='%23f1faf4'/><circle cx='200' cy='200' r='130' fill='%23e8f8f0'/><rect x='175' y='90' width='50' height='20' rx='3' fill='%23198754'/><path d='M160,110 h80 v150 c0,15 -10,25 -25,25 h-30 c-15,0 -25,-10 -25,-25 z' fill='%23ffffff' stroke='%23198754' stroke-width='2'/><rect x='162' y='150' width='76' height='80' fill='%23e8f8f0'/><text x='200' y='185' font-size='10' font-family='sans-serif' font-weight='bold' fill='%23198754' text-anchor='middle'>KELOREENA</text></svg>",
            images_additional: [
                "data:image/svg+xml;utf8,<svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect width='100%25' height='100%25' fill='%23f1faf4'/><path d='M150,200 Q200,150 250,200 Q200,250 150,200 Z' fill='%23198754'/></svg>"
            ],
            badge_text: 'Superfood', badge_class: 'bg-info-light', is_active: true
        },
        {
            id: 4, name: 'Sendifit', category: 'kapsul', price: 95000,
            description: 'Kombinasi Jahe Merah, Daun Salam, sambiloto, dan kayu manis yang diformulasikan khusus untuk kesehatan sendi, rematik, dan asam urat.',
            bpom_number: 'POM TR193328661',
            image_main: "data:image/svg+xml;utf8,<svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect width='100%25' height='100%25' fill='%23faf7f2'/><circle cx='200' cy='200' r='130' fill='%23f7ebd3'/><rect x='175' y='90' width='50' height='20' rx='3' fill='%23fd7e14'/><path d='M160,110 h80 v150 c0,15 -10,25 -25,25 h-30 c-15,0 -25,-10 -25,-25 z' fill='%236f4e37'/><rect x='165' y='150' width='70' height='80' fill='%23ffffff' stroke='%23fd7e14' stroke-width='1.5'/><text x='200' y='185' font-size='11' font-family='sans-serif' font-weight='bold' fill='%23fd7e14' text-anchor='middle'>SENDIFIT</text></svg>",
            images_additional: [
                "data:image/svg+xml;utf8,<svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect width='100%25' height='100%25' fill='%23faf7f2'/><circle cx='200' cy='200' r='30' fill='none' stroke='%23fd7e14' stroke-width='4'/></svg>"
            ],
            badge_text: '', badge_class: '', is_active: true
        },
        {
            id: 5, name: 'Bio Squalene', category: 'kapsul', price: 99000,
            description: 'Minyak hati hiu pilihan yang diolah dengan Nano Technology untuk membantu menurunkan kolesterol jahat, menjaga kesehatan jantung, dan otak.',
            bpom_number: 'POM TR212334131',
            image_main: "data:image/svg+xml;utf8,<svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect width='100%25' height='100%25' fill='%23f0f4f8'/><circle cx='200' cy='200' r='130' fill='%23dbeafe'/><rect x='175' y='90' width='50' height='20' rx='3' fill='%23d4af37'/><path d='M160,110 h80 v150 c0,15 -10,25 -25,25 h-30 c-15,0 -25,-10 -25,-25 z' fill='%231e3a8a'/><rect x='165' y='150' width='70' height='80' fill='%23ffffff' stroke='%23d4af37' stroke-width='1.5'/><text x='200' y='180' font-size='9' font-family='sans-serif' font-weight='bold' fill='%231e3a8a' text-anchor='middle'>BIO</text><text x='200' y='198' font-size='9' font-family='sans-serif' font-weight='bold' fill='%23d4af37' text-anchor='middle'>SQUALENE</text></svg>",
            images_additional: [
                "data:image/svg+xml;utf8,<svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect width='100%25' height='100%25' fill='%23f0f4f8'/><rect x='150' y='180' width='100' height='40' rx='20' fill='%23ffca3a' opacity='0.8' stroke='%23ffb703' stroke-width='3'/></svg>"
            ],
            badge_text: 'Premium', badge_class: 'bg-gold-light', is_active: true
        },
        {
            id: 6, name: 'Susu Kambing Etaku', category: 'lainnya', price: 75000,
            description: 'Susu kambing etawa murni yang kaya nutrisi, dipadukan dengan albumin ikan gabus, ekstrak pegagan, dan kedelai untuk kepadatan tulang.',
            bpom_number: 'POM TR242006761',
            image_main: "data:image/svg+xml;utf8,<svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect width='100%25' height='100%25' fill='%23f8fafc'/><circle cx='200' cy='200' r='130' fill='%23f1f5f9'/><path d='M150,100 h100 v180 h-100 z' fill='%23ffffff' stroke='%23198754' stroke-width='3'/><rect x='150' y='100' width='100' height='40' fill='%23198754'/><text x='200' y='125' font-size='12' font-family='sans-serif' font-weight='bold' fill='%23ffffff' text-anchor='middle'>ETAKU</text><text x='200' y='190' font-size='8' font-family='sans-serif' fill='%23198754' font-weight='bold' text-anchor='middle'>SUSU KAMBING</text></svg>",
            images_additional: [
                "data:image/svg+xml;utf8,<svg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'><rect width='100%25' height='100%25' fill='%23f8fafc'/><path d='M160,160 h80 v70 c0,15 -10,25 -25,25 h-30 c-15,0 -25,-10 -25,-25 z' fill='%23e2e8f0'/></svg>"
            ],
            badge_text: '', badge_class: '', is_active: true
        }
    ],

    DEFAULT_BARCODES: [
        { id: 1, code: 'WALATRA-QNC88', product_id: 1, status: 'genuine', batch_number: 'QNC-2026-04A', production_date: '2026-04-01', expiry_date: '2028-04-01' },
        { id: 2, code: 'WALATRA-PROP12', product_id: 2, status: 'genuine', batch_number: 'PSM-2026-02C', production_date: '2026-02-15', expiry_date: '2028-02-15' },
        { id: 3, code: 'WALATRA-EXPIRED', product_id: 1, status: 'expired', batch_number: 'QNC-2024-01B', production_date: '2024-01-10', expiry_date: '2025-01-10' }
    ],

    _get(key, defaults) {
        const data = localStorage.getItem(key);
        if (data) {
            const parsed = JSON.parse(data);
            // Migrasi otomatis jika data di LocalStorage masih versi lama (menggunakan icon)
            if (key === this.KEYS.PRODUCTS && parsed.length > 0 && !parsed[0].image_main) {
                localStorage.setItem(key, JSON.stringify(defaults));
                return defaults;
            }
            return parsed;
        }
        if (defaults) { localStorage.setItem(key, JSON.stringify(defaults)); return defaults; }
        return [];
    },
    _set(key, data) { localStorage.setItem(key, JSON.stringify(data)); },

    // --- Products CRUD ---
    getProducts()       { return this._get(this.KEYS.PRODUCTS, this.DEFAULT_PRODUCTS); },
    saveProducts(list)  { this._set(this.KEYS.PRODUCTS, list); },
    addProduct(prod) {
        const list = this.getProducts();
        prod.id = list.length > 0 ? Math.max(...list.map(p => p.id)) + 1 : 1;
        list.push(prod);
        this.saveProducts(list);
        return prod;
    },
    updateProduct(id, updatedProd) {
        const list = this.getProducts();
        const index = list.findIndex(p => p.id === parseInt(id));
        if (index !== -1) {
            list[index] = { ...list[index], ...updatedProd };
            this.saveProducts(list);
            return true;
        }
        return false;
    },
    deleteProduct(id) {
        const list = this.getProducts();
        const filtered = list.filter(p => p.id !== parseInt(id));
        this.saveProducts(filtered);
        
        // Opsional: Hapus barcode yang terelasi
        const barcodes = this.getBarcodes();
        const filteredBarcodes = barcodes.filter(b => b.product_id !== parseInt(id));
        this.saveBarcodes(filteredBarcodes);
    },

    // --- Barcodes CRUD ---
    getBarcodes()       { return this._get(this.KEYS.BARCODES, this.DEFAULT_BARCODES); },
    saveBarcodes(list)  { this._set(this.KEYS.BARCODES, list); },
    addBarcode(bc) {
        const list = this.getBarcodes();
        bc.id = list.length > 0 ? Math.max(...list.map(b => b.id)) + 1 : 1;
        bc.code = bc.code.trim().toUpperCase();
        list.push(bc);
        this.saveBarcodes(list);
        return bc;
    },
    updateBarcode(id, updatedBc) {
        const list = this.getBarcodes();
        const index = list.findIndex(b => b.id === parseInt(id));
        if (index !== -1) {
            updatedBc.code = updatedBc.code.trim().toUpperCase();
            list[index] = { ...list[index], ...updatedBc };
            this.saveBarcodes(list);
            return true;
        }
        return false;
    },
    deleteBarcode(id) {
        const list = this.getBarcodes();
        const filtered = list.filter(b => b.id !== parseInt(id));
        this.saveBarcodes(filtered);
    },

    // --- Messages ---
    getMessages()       { return this._get(this.KEYS.MESSAGES); },
    saveMessages(list)  { this._set(this.KEYS.MESSAGES, list); },
    markMessageAsRead(id) {
        const list = this.getMessages();
        const index = list.findIndex(m => m.id === parseInt(id));
        if (index !== -1) {
            list[index].status = 'read';
            this.saveMessages(list);
        }
    },
    deleteMessage(id) {
        const list = this.getMessages();
        const filtered = list.filter(m => m.id !== parseInt(id));
        this.saveMessages(filtered);
    },

    // --- Verification Logs ---
    getLogs()           { return this._get(this.KEYS.LOGS); },
    saveLogs(list)      { this._set(this.KEYS.LOGS, list); },
    deleteLog(id) {
        const list = this.getLogs();
        const filtered = list.filter(l => l.id !== parseInt(id));
        this.saveLogs(filtered);
    },
    clearLogs() {
        this.saveLogs([]);
    }
};

// ==========================================
// 1. SINKRONISASI ELEMEN UI & STATE
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
    
    // Elements - Login
    const loginWrapper = document.getElementById('login-wrapper');
    const adminLayout = document.getElementById('admin-layout');
    const loginForm = document.getElementById('login-form');
    const loginAlert = document.getElementById('login-alert');
    const togglePwBtn = document.getElementById('toggle-pw');
    const passwordInput = document.getElementById('password');

    // Elements - Sidebar / Navigation
    const sidebarLinks = document.querySelectorAll('.sidebar-nav .sidebar-link');
    const adminSections = document.querySelectorAll('.admin-section');
    const sectionTitle = document.getElementById('current-section-title');
    const sectionSubtitle = document.getElementById('current-section-subtitle');
    const btnLogout = document.getElementById('btn-logout');
    const adminMobileToggle = document.getElementById('admin-mobile-toggle');
    const adminSidebar = document.getElementById('admin-sidebar');
    const unreadBadge = document.getElementById('unread-badge');

    // Elements - Modals & Forms (CRUD)
    const productModalEl = document.getElementById('modal-product');
    const barcodeModalEl = document.getElementById('modal-barcode');
    const messageModalEl = document.getElementById('modal-message');

    const productModal = new bootstrap.Modal(productModalEl);
    const barcodeModal = new bootstrap.Modal(barcodeModalEl);
    const messageModal = new bootstrap.Modal(messageModalEl);

    const formProduct = document.getElementById('form-product');
    const formBarcode = document.getElementById('form-barcode');

    // ==========================================
    // 1.5. LOGIKA UPLOAD GAMBAR PRODUK (Shopee-like)
    // ==========================================
    let currentProductImages = {
        main: '',
        sub1: '',
        sub2: '',
        sub3: '',
        sub4: ''
    };

    window.removeProductImage = function(slot) {
        currentProductImages[slot === 'main' ? 'main' : slot.replace('-', '')] = '';
        const input = document.getElementById('upload-' + slot);
        if (input) input.value = '';

        const img = document.getElementById('img-preview-' + slot);
        const placeholder = document.getElementById('placeholder-' + slot);
        const removeBtn = document.querySelector(`#preview-${slot}-box .btn-remove-image`);

        img.src = '';
        img.classList.add('d-none');
        placeholder.classList.remove('d-none');
        if (removeBtn) removeBtn.classList.add('d-none');
    };

    function resetImageUploads() {
        currentProductImages = { main: '', sub1: '', sub2: '', sub3: '', sub4: '' };
        ['main', 'sub-1', 'sub-2', 'sub-3', 'sub-4'].forEach(slot => {
            const input = document.getElementById('upload-' + slot);
            if (input) input.value = '';
            const img = document.getElementById('img-preview-' + slot);
            const placeholder = document.getElementById('placeholder-' + slot);
            const removeBtn = document.querySelector(`#preview-${slot}-box .btn-remove-image`);

            if (img) { img.src = ''; img.classList.add('d-none'); }
            if (placeholder) placeholder.classList.remove('d-none');
            if (removeBtn) removeBtn.classList.add('d-none');
        });
    }

    function setPreview(slot, base64) {
        const jsSlot = slot === 'main' ? 'main' : slot.replace('-', '');
        currentProductImages[jsSlot] = base64;

        const img = document.getElementById('img-preview-' + slot);
        const placeholder = document.getElementById('placeholder-' + slot);
        const removeBtn = document.querySelector(`#preview-${slot}-box .btn-remove-image`);

        if (img) {
            img.src = base64;
            img.classList.remove('d-none');
        }
        if (placeholder) placeholder.classList.add('d-none');
        if (removeBtn) removeBtn.classList.remove('d-none');
    }

    function handleImageUpload(inputEl, slot) {
        const file = inputEl.files[0];
        if (!file) return;

        if (!file.type.match('image.*')) {
            alert('Harap pilih file gambar (.jpg, .jpeg, .png)!');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(e) {
            const img = new Image();
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const maxW = 400;
                const maxH = 400;
                let w = img.width;
                let h = img.height;

                if (w > h) {
                    if (w > maxW) {
                        h *= maxW / w;
                        w = maxW;
                    }
                } else {
                    if (h > maxH) {
                        w *= maxH / h;
                        h = maxH;
                    }
                }

                canvas.width = w;
                canvas.height = h;
                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, w, h);

                const base64 = canvas.toDataURL('image/jpeg', 0.7);
                setPreview(slot, base64);
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }

    ['main', 'sub-1', 'sub-2', 'sub-3', 'sub-4'].forEach(slot => {
        const input = document.getElementById('upload-' + slot);
        if (input) {
            input.addEventListener('change', function() {
                handleImageUpload(this, slot);
            });
        }
    });

    // ==========================================
    // 2. SISTEM LOGIN & SESI
    // ==========================================

    function checkSession() {
        const session = localStorage.getItem('walatra_admin_session');
        if (session) {
            loginWrapper.classList.add('d-none');
            adminLayout.classList.remove('d-none');
            initDashboard();
        } else {
            loginWrapper.classList.remove('d-none');
            adminLayout.classList.add('d-none');
        }
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const userVal = document.getElementById('username').value.trim();
        const passVal = passwordInput.value.trim();

        if (userVal === 'admin' && passVal === 'admin123') {
            loginAlert.classList.add('d-none');
            const sessionData = {
                username: userVal,
                logged_at: new Date().toISOString()
            };
            localStorage.setItem('walatra_admin_session', JSON.stringify(sessionData));
            loginForm.reset();
            checkSession();
        } else {
            loginAlert.classList.remove('d-none');
            loginForm.querySelector('button[type="submit"]').classList.add('shake');
            setTimeout(() => {
                loginForm.querySelector('button[type="submit"]').classList.remove('shake');
            }, 500);
        }
    });

    togglePwBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        const icon = togglePwBtn.querySelector('i');
        icon.className = type === 'password' ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';
    });

    btnLogout.addEventListener('click', function() {
        if (confirm('Apakah Anda yakin ingin keluar dari Panel Admin?')) {
            localStorage.removeItem('walatra_admin_session');
            checkSession();
        }
    });

    // Mobile Sidebar Toggle
    adminMobileToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        adminSidebar.classList.toggle('open');
        const icon = adminMobileToggle.querySelector('i');
        icon.className = adminSidebar.classList.contains('open') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered';
    });

    document.addEventListener('click', function(e) {
        if (window.innerWidth < 992 && !adminSidebar.contains(e.target) && !adminMobileToggle.contains(e.target)) {
            adminSidebar.classList.remove('open');
            adminMobileToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';
        }
    });

    // ==========================================
    // 3. NAVIGASI TAB MENU
    // ==========================================
    const sectionMetadata = {
        'section-overview': {
            title: 'Ringkasan Dasbor',
            subtitle: 'Statistik umum dan aktivitas terbaru data Walatra Herbal.'
        },
        'section-products': {
            title: 'Kelola Produk',
            subtitle: 'Tambah, edit, atau nonaktifkan produk herbal dari katalog utama.'
        },
        'section-barcodes': {
            title: 'Kelola Barcode Keaslian',
            subtitle: 'Kelola database kode verifikasi produk untuk konsumen.'
        },
        'section-messages': {
            title: 'Kotak Masuk Pesan',
            subtitle: 'Konsultasi pelanggan yang masuk melalui formulir kontak.'
        },
        'section-logs': {
            title: 'Log Verifikasi Keaslian',
            subtitle: 'Riwayat pemindaian barcode yang dilakukan pelanggan secara real-time.'
        }
    };

    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            sidebarLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');

            const targetSection = this.getAttribute('data-target');
            adminSections.forEach(sec => sec.classList.remove('active'));
            document.getElementById(targetSection).classList.add('active');

            // Update Header Title
            const meta = sectionMetadata[targetSection];
            sectionTitle.textContent = meta.title;
            sectionSubtitle.textContent = meta.subtitle;

            // Close Mobile Sidebar
            adminSidebar.classList.remove('open');
            adminMobileToggle.querySelector('i').className = 'fa-solid fa-bars-staggered';

            // Refresh data tab spesifik
            renderSectionData(targetSection);
        });
    });

    // ==========================================
    // 4. RENDERING DATA & CRUD LOGIC
    // ==========================================

    // Format Rupiah
    function formatPrice(num) {
        return 'Rp ' + num.toLocaleString('id-ID');
    }

    // Format Date / Time
    function formatDateTime(isoString) {
        if (!isoString) return '-';
        const d = new Date(isoString);
        return d.toLocaleString('id-ID', {
            year: 'numeric', month: '2-digit', day: '2-digit',
            hour: '2-digit', minute: '2-digit', second: '2-digit'
        }).replace(/\//g, '-');
    }

    // Pembersihan nomor whatsapp
    function formatWhatsAppLink(phone) {
        let cleaned = phone.replace(/[^0-9]/g, '');
        if (cleaned.startsWith('0')) {
            cleaned = '62' + cleaned.substring(1);
        } else if (cleaned.startsWith('8')) {
            cleaned = '62' + cleaned;
        }
        return `https://wa.me/${cleaned}`;
    }

    // Inisialisasi awal dashboard data
    function initDashboard() {
        // Panggil seeder default jika kosong
        WalatraDB.getProducts();
        WalatraDB.getBarcodes();
        
        // Render & Update counter ringkasan
        updateCounters();
        renderOverviewLists();
    }

    // Render data seksi spesifik
    function renderSectionData(sectionId) {
        updateCounters();
        switch (sectionId) {
            case 'section-overview':
                renderOverviewLists();
                break;
            case 'section-products':
                renderProductsTable();
                break;
            case 'section-barcodes':
                renderBarcodesTable();
                break;
            case 'section-messages':
                renderMessagesTable();
                break;
            case 'section-logs':
                renderLogsTable();
                break;
        }
    }

    // Update Counter Atas
    function updateCounters() {
        const prodCount = WalatraDB.getProducts().length;
        const bcCount = WalatraDB.getBarcodes().length;
        const messages = WalatraDB.getMessages();
        const unreadCount = messages.filter(m => m.status === 'unread').length;
        const logCount = WalatraDB.getLogs().length;

        document.getElementById('stat-total-products').textContent = prodCount;
        document.getElementById('stat-total-barcodes').textContent = bcCount;
        document.getElementById('stat-unread-messages').textContent = unreadCount;
        document.getElementById('stat-total-scans').textContent = logCount;

        // Unread badge in sidebar
        if (unreadCount > 0) {
            unreadBadge.textContent = unreadCount;
            unreadBadge.classList.remove('d-none');
        } else {
            unreadBadge.classList.add('d-none');
        }
    }

    // --- OVERVIEW SECTION LOGIC ---
    function renderOverviewLists() {
        // 1. Render Last 5 Scan Logs
        const logs = WalatraDB.getLogs();
        const recentLogs = [...logs].reverse().slice(0, 5);
        const logsContainer = document.getElementById('overview-logs-table');
        logsContainer.innerHTML = '';

        if (recentLogs.length === 0) {
            logsContainer.innerHTML = '<tr><td colspan="3" class="text-center text-white-50 py-3">Belum ada aktivitas verifikasi.</td></tr>';
        } else {
            recentLogs.forEach(log => {
                let badgeClass = '';
                let resultText = '';
                if (log.result === 'genuine') {
                    badgeClass = 'badge-admin genuine'; resultText = '<i class="fa-solid fa-circle-check"></i> ASLI';
                } else if (log.result === 'expired') {
                    badgeClass = 'badge-admin expired'; resultText = '<i class="fa-solid fa-triangle-exclamation"></i> EXPIRED';
                } else {
                    badgeClass = 'badge-admin fake'; resultText = '<i class="fa-solid fa-circle-xmark"></i> PALSU';
                }

                logsContainer.insertAdjacentHTML('beforeend', `
                    <tr>
                        <td class="text-white-50">${formatDateTime(log.scanned_at)}</td>
                        <td class="fw-bold text-white">${log.barcode_scanned}</td>
                        <td><span class="${badgeClass}">${resultText}</span></td>
                    </tr>
                `);
            });
        }

        // 2. Render Last 3 Unread / Recent Messages
        const messages = WalatraDB.getMessages();
        const recentMessages = [...messages].reverse().slice(0, 3);
        const msgContainer = document.getElementById('overview-messages-list');
        msgContainer.innerHTML = '';

        if (recentMessages.length === 0) {
            msgContainer.innerHTML = '<div class="text-center text-white-50 py-3">Tidak ada pesan masuk.</div>';
        } else {
            recentMessages.forEach(msg => {
                const bgClass = msg.status === 'unread' ? 'rgba(212, 175, 55, 0.08)' : 'rgba(255,255,255,0.02)';
                const borderLeftColor = msg.status === 'unread' ? 'var(--color-secondary)' : 'rgba(255,255,255,0.1)';
                const statusIcon = msg.status === 'unread' ? '<i class="fa-solid fa-circle text-warning font-size-xs me-1" style="font-size: 8px;"></i>' : '';

                msgContainer.insertAdjacentHTML('beforeend', `
                    <div class="p-3 rounded d-flex justify-content-between align-items-start" style="background: ${bgClass}; border-left: 3px solid ${borderLeftColor}; border-top: 1px solid rgba(255,255,255,0.03); border-right: 1px solid rgba(255,255,255,0.03); border-bottom: 1px solid rgba(255,255,255,0.03);">
                        <div style="flex-grow: 1; min-width: 0;">
                            <div class="d-flex justify-content-between align-items-center mb-1">
                                <span class="fw-bold text-white font-poppins text-truncate">${statusIcon}${msg.sender_name}</span>
                                <span class="small text-white-50" style="font-size: 0.75rem;">${formatDateTime(msg.created_at)}</span>
                            </div>
                            <div class="small text-warning fw-semibold mb-1">${msg.subject}</div>
                            <p class="mb-0 text-white-50 text-truncate small">"${msg.message_body}"</p>
                        </div>
                    </div>
                `);
            });
        }
    }

    // --- PRODUCTS SECTION LOGIC ---
    const searchProductsInput = document.getElementById('search-products');
    searchProductsInput.addEventListener('input', () => renderProductsTable());

    function renderProductsTable() {
        const query = searchProductsInput.value.toLowerCase();
        const products = WalatraDB.getProducts();
        const tableBody = document.getElementById('products-table-body');
        tableBody.innerHTML = '';

        const filtered = products.filter(p => p.name.toLowerCase().includes(query) || p.category.toLowerCase().includes(query));

        if (filtered.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="9" class="text-center text-white-50 py-4">Produk tidak ditemukan atau database kosong.</td></tr>';
            return;
        }

        filtered.forEach(p => {
            const activeBadge = p.is_active 
                ? '<span class="badge-admin active"><i class="fa-solid fa-circle-check"></i> Aktif</span>'
                : '<span class="badge-admin inactive"><i class="fa-solid fa-circle-xmark"></i> Nonaktif</span>';

            const badgeText = p.badge_text ? `<span class="badge ${p.badge_class}">${p.badge_text}</span>` : '<span class="text-white-50">-</span>';

            tableBody.insertAdjacentHTML('beforeend', `
                <tr data-id="${p.id}">
                    <td>${p.id}</td>
                    <td><img src="${p.image_main}" style="width: 40px; height: 40px; object-fit: contain; border-radius: 4px; border: 1px solid rgba(255,255,255,0.1); background-color: white; padding: 2px;"></td>
                    <td class="fw-bold text-white">${p.name}</td>
                    <td class="text-capitalize text-white-50">${p.category}</td>
                    <td class="fw-bold text-white">${formatPrice(p.price)}</td>
                    <td class="text-white-50">${p.bpom_number}</td>
                    <td>${badgeText}</td>
                    <td>${activeBadge}</td>
                    <td class="text-end">
                        <div class="d-inline-flex gap-2">
                            <button class="btn-action edit" onclick="window.editProduct(${p.id})" title="Edit Produk"><i class="fa-solid fa-pen"></i></button>
                            <button class="btn-action delete" onclick="window.deleteProduct(${p.id})" title="Hapus Produk"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </td>
                </tr>
            `);
        });
    }

    // Tambah Produk
    document.getElementById('btn-add-product').addEventListener('click', function() {
        formProduct.reset();
        resetImageUploads();
        document.getElementById('product-id-val').value = '';
        document.getElementById('modal-product-title').textContent = 'Tambah Produk Baru';
        productModal.show();
    });

    // Edit Produk (Global function so it can be called from onclick in HTML)
    window.editProduct = function(id) {
        const products = WalatraDB.getProducts();
        const p = products.find(x => x.id === id);
        if (!p) return;

        document.getElementById('product-id-val').value = p.id;
        document.getElementById('product-name').value = p.name;
        document.getElementById('product-category').value = p.category;
        document.getElementById('product-price').value = p.price;
        document.getElementById('product-bpom').value = p.bpom_number;
        
        // Reset state & load images
        resetImageUploads();
        if (p.image_main) {
            setPreview('main', p.image_main);
        }
        if (p.images_additional && p.images_additional.length > 0) {
            p.images_additional.forEach((img, idx) => {
                if (idx < 4) {
                    setPreview('sub-' + (idx + 1), img);
                }
            });
        }

        document.getElementById('product-badge-text').value = p.badge_text || '';
        document.getElementById('product-badge-class').value = p.badge_class || '';
        document.getElementById('product-is-active').checked = p.is_active;

        document.getElementById('product-desc').value = p.description;

        document.getElementById('modal-product-title').textContent = 'Edit Informasi Produk';
        productModal.show();
    };

    // Hapus Produk
    window.deleteProduct = function(id) {
        if (confirm('Apakah Anda yakin ingin menghapus produk ini? Semua barcode yang terelasi dengan produk ini juga akan terhapus.')) {
            WalatraDB.deleteProduct(id);
            renderProductsTable();
            updateCounters();
        }
    };

    formProduct.addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('product-id-val').value;
        const name = document.getElementById('product-name').value.trim();
        const category = document.getElementById('product-category').value;
        const price = parseInt(document.getElementById('product-price').value);
        const bpom = document.getElementById('product-bpom').value.trim();
        const badgeText = document.getElementById('product-badge-text').value.trim();
        const badgeClass = document.getElementById('product-badge-class').value;
        const desc = document.getElementById('product-desc').value.trim();
        const isActive = document.getElementById('product-is-active').checked;

        // Validasi Foto Utama
        if (!currentProductImages.main) {
            alert('Foto Utama wajib diisi!');
            return;
        }

        const additionalImgs = [];
        for (let i = 1; i <= 4; i++) {
            if (currentProductImages['sub' + i]) {
                additionalImgs.push(currentProductImages['sub' + i]);
            }
        }

        const productData = {
            name: name,
            category: category,
            price: price,
            description: desc,
            bpom_number: bpom,
            image_main: currentProductImages.main,
            images_additional: additionalImgs,
            badge_text: badgeText,
            badge_class: badgeClass,
            is_active: isActive
        };

        if (id) {
            WalatraDB.updateProduct(id, productData);
        } else {
            WalatraDB.addProduct(productData);
        }

        productModal.hide();
        renderProductsTable();
        updateCounters();
    });


    // --- BARCODES SECTION LOGIC ---
    const searchBarcodesInput = document.getElementById('search-barcodes');
    searchBarcodesInput.addEventListener('input', () => renderBarcodesTable());

    function renderBarcodesTable() {
        const query = searchBarcodesInput.value.toLowerCase();
        const barcodes = WalatraDB.getBarcodes();
        const products = WalatraDB.getProducts();
        const tableBody = document.getElementById('barcodes-table-body');
        tableBody.innerHTML = '';

        const filtered = barcodes.filter(b => b.code.toLowerCase().includes(query) || b.batch_number.toLowerCase().includes(query));

        if (filtered.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="8" class="text-center text-white-50 py-4">Barcode tidak ditemukan atau database kosong.</td></tr>';
            return;
        }

        filtered.forEach(b => {
            const product = products.find(p => p.id === b.product_id);
            const productName = product ? product.name : '<span class="text-danger">Produk Terhapus</span>';

            let statusBadge = '';
            if (b.status === 'genuine') {
                statusBadge = '<span class="badge-admin genuine"><i class="fa-solid fa-circle-check"></i> Asli (Genuine)</span>';
            } else if (b.status === 'expired') {
                statusBadge = '<span class="badge-admin expired"><i class="fa-solid fa-triangle-exclamation"></i> Kadaluarsa</span>';
            } else {
                statusBadge = '<span class="badge-admin revoked"><i class="fa-solid fa-circle-xmark"></i> Dicabut</span>';
            }

            tableBody.insertAdjacentHTML('beforeend', `
                <tr data-id="${b.id}">
                    <td>${b.id}</td>
                    <td class="fw-bold text-white tracking-wide">${b.code}</td>
                    <td>${productName}</td>
                    <td>${statusBadge}</td>
                    <td class="text-white-50">${b.batch_number}</td>
                    <td class="text-white-50">${b.production_date}</td>
                    <td class="text-white-50">${b.expiry_date}</td>
                    <td class="text-end">
                        <div class="d-inline-flex gap-2">
                            <button class="btn-action edit" onclick="window.editBarcode(${b.id})" title="Edit Barcode"><i class="fa-solid fa-pen"></i></button>
                            <button class="btn-action delete" onclick="window.deleteBarcode(${b.id})" title="Hapus Barcode"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </td>
                </tr>
            `);
        });
    }

    // Populate Product Options in Barcode Form
    function populateBarcodeProductSelect() {
        const select = document.getElementById('barcode-product-id');
        select.innerHTML = '<option value="" disabled selected>-- Pilih Relasi Produk --</option>';
        
        const products = WalatraDB.getProducts().filter(p => p.is_active);
        products.forEach(p => {
            select.insertAdjacentHTML('beforeend', `<option value="${p.id}">${p.name} (${p.category})</option>`);
        });
    }

    // Tambah Barcode
    document.getElementById('btn-add-barcode').addEventListener('click', function() {
        formBarcode.reset();
        populateBarcodeProductSelect();
        document.getElementById('barcode-id-val').value = '';
        document.getElementById('barcode-code').readOnly = false;
        document.getElementById('modal-barcode-title').textContent = 'Tambah Barcode Baru';
        barcodeModal.show();
    });

    // Edit Barcode
    window.editBarcode = function(id) {
        const barcodes = WalatraDB.getBarcodes();
        const b = barcodes.find(x => x.id === id);
        if (!b) return;

        populateBarcodeProductSelect();

        document.getElementById('barcode-id-val').value = b.id;
        document.getElementById('barcode-code').value = b.code;
        document.getElementById('barcode-code').readOnly = true; // Code cannot be edited to preserve consistency
        document.getElementById('barcode-product-id').value = b.product_id;
        document.getElementById('barcode-status').value = b.status;
        document.getElementById('barcode-batch').value = b.batch_number;
        document.getElementById('barcode-prod-date').value = b.production_date;
        document.getElementById('barcode-exp-date').value = b.expiry_date;

        document.getElementById('modal-barcode-title').textContent = 'Edit Informasi Barcode';
        barcodeModal.show();
    };

    // Hapus Barcode
    window.deleteBarcode = function(id) {
        if (confirm('Apakah Anda yakin ingin menghapus barcode ini dari database?')) {
            WalatraDB.deleteBarcode(id);
            renderBarcodesTable();
            updateCounters();
        }
    };

    formBarcode.addEventListener('submit', function(e) {
        e.preventDefault();
        const id = document.getElementById('barcode-id-val').value;
        const code = document.getElementById('barcode-code').value.trim().toUpperCase();
        const product_id = parseInt(document.getElementById('barcode-product-id').value);
        const status = document.getElementById('barcode-status').value;
        const batch = document.getElementById('barcode-batch').value.trim();
        const prodDate = document.getElementById('barcode-prod-date').value;
        const expDate = document.getElementById('barcode-exp-date').value;

        // Validasi Duplikat Barcode Baru
        if (!id) {
            const exists = WalatraDB.getBarcodes().some(b => b.code === code);
            if (exists) {
                alert(`Error: Kode Barcode "${code}" sudah terdaftar di database! Harap gunakan kode unik.`);
                return;
            }
        }

        const barcodeData = {
            code: code,
            product_id: product_id,
            status: status,
            batch_number: batch,
            production_date: prodDate,
            expiry_date: expDate
        };

        if (id) {
            WalatraDB.updateBarcode(id, barcodeData);
        } else {
            WalatraDB.addBarcode(barcodeData);
        }

        barcodeModal.hide();
        renderBarcodesTable();
        updateCounters();
    });


    // --- MESSAGES (PESAN MASUK) SECTION LOGIC ---
    const searchMessagesInput = document.getElementById('search-messages');
    searchMessagesInput.addEventListener('input', () => renderMessagesTable());

    function renderMessagesTable() {
        const query = searchMessagesInput.value.toLowerCase();
        const messages = WalatraDB.getMessages();
        const tableBody = document.getElementById('messages-table-body');
        tableBody.innerHTML = '';

        const filtered = messages.filter(m => 
            m.sender_name.toLowerCase().includes(query) || 
            m.subject.toLowerCase().includes(query) || 
            m.message_body.toLowerCase().includes(query)
        );

        if (filtered.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="7" class="text-center text-white-50 py-4">Kotak masuk kosong.</td></tr>';
            return;
        }

        // Render from newest to oldest
        [...filtered].reverse().forEach(m => {
            const statusLabel = m.status === 'unread' 
                ? '<span class="badge bg-warning text-dark"><i class="fa-solid fa-envelope me-1"></i> Baru</span>'
                : '<span class="badge bg-secondary text-white-50"><i class="fa-solid fa-envelope-open me-1"></i> Dibaca</span>';

            const waLink = formatWhatsAppLink(m.sender_phone);

            tableBody.insertAdjacentHTML('beforeend', `
                <tr data-id="${m.id}" style="${m.status === 'unread' ? 'background-color: rgba(212,175,55,0.03)' : ''}">
                    <td>${statusLabel}</td>
                    <td class="fw-bold text-white">${m.sender_name}</td>
                    <td>
                        <a href="${waLink}" target="_blank" class="text-success fw-semibold text-decoration-none d-inline-flex align-items-center">
                            <i class="fa-brands fa-whatsapp me-1 text-success"></i> ${m.sender_phone}
                        </a>
                    </td>
                    <td class="text-warning fw-medium">${m.subject}</td>
                    <td><div class="text-truncate" style="max-width: 250px;">"${m.message_body}"</div></td>
                    <td class="text-white-50 small">${formatDateTime(m.created_at)}</td>
                    <td class="text-end">
                        <div class="d-inline-flex gap-2">
                            <button class="btn-action view" onclick="window.viewMessage(${m.id})" title="Lihat Pesan Lengkap"><i class="fa-solid fa-eye"></i></button>
                            <button class="btn-action delete" onclick="window.deleteMessage(${m.id})" title="Hapus Pesan"><i class="fa-solid fa-trash-can"></i></button>
                        </div>
                    </td>
                </tr>
            `);
        });
    }

    // Detail Pesan Dialog
    window.viewMessage = function(id) {
        const messages = WalatraDB.getMessages();
        const m = messages.find(x => x.id === id);
        if (!m) return;

        // Tandai sebagai dibaca di database
        WalatraDB.markMessageAsRead(id);
        
        // Tampilkan data modal
        document.getElementById('msg-detail-name').textContent = m.sender_name;
        document.getElementById('msg-detail-phone').textContent = m.sender_phone;
        document.getElementById('msg-detail-subject').textContent = m.subject;
        document.getElementById('msg-detail-time').textContent = formatDateTime(m.created_at);
        document.getElementById('msg-detail-body').textContent = m.message_body;

        const waLinkBtn = document.getElementById('msg-detail-wa-link');
        waLinkBtn.href = formatWhatsAppLink(m.sender_phone);

        // Tampilkan modal
        messageModal.show();

        // Refresh UI
        renderMessagesTable();
        updateCounters();
    };

    // Hapus Pesan
    window.deleteMessage = function(id) {
        if (confirm('Apakah Anda yakin ingin menghapus pesan ini secara permanen dari inbox?')) {
            WalatraDB.deleteMessage(id);
            renderMessagesTable();
            updateCounters();
        }
    };


    // --- VERIFICATION LOGS SECTION LOGIC ---
    const searchLogsInput = document.getElementById('search-logs');
    searchLogsInput.addEventListener('input', () => renderLogsTable());

    function renderLogsTable() {
        const query = searchLogsInput.value.toLowerCase();
        const logs = WalatraDB.getLogs();
        const tableBody = document.getElementById('logs-table-body');
        tableBody.innerHTML = '';

        const filtered = logs.filter(l => l.barcode_scanned.toLowerCase().includes(query) || l.result.toLowerCase().includes(query));

        if (filtered.length === 0) {
            tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-white-50 py-4">Log verifikasi kosong.</td></tr>';
            return;
        }

        [...filtered].reverse().forEach(l => {
            let resultBadge = '';
            if (l.result === 'genuine') {
                resultBadge = '<span class="badge-admin genuine"><i class="fa-solid fa-circle-check"></i> Asli (Genuine)</span>';
            } else if (l.result === 'expired') {
                resultBadge = '<span class="badge-admin expired"><i class="fa-solid fa-triangle-exclamation"></i> Kadaluarsa</span>';
            } else {
                resultBadge = '<span class="badge-admin fake"><i class="fa-solid fa-circle-xmark"></i> Palsu (Not Found)</span>';
            }

            tableBody.insertAdjacentHTML('beforeend', `
                <tr>
                    <td class="text-white-50">${formatDateTime(l.scanned_at)}</td>
                    <td class="fw-bold text-white tracking-wide">${l.barcode_scanned}</td>
                    <td>${resultBadge}</td>
                    <td><div class="text-white-50 small text-truncate" style="max-width: 400px;" title="${l.user_agent}">${l.user_agent}</div></td>
                    <td class="text-end">
                        <button class="btn-action delete" onclick="window.deleteLog(${l.id})" title="Hapus Log"><i class="fa-solid fa-trash-can"></i></button>
                    </td>
                </tr>
            `);
        });
    }

    // Hapus Satuan Log
    window.deleteLog = function(id) {
        if (confirm('Apakah Anda yakin ingin menghapus catatan log scan ini?')) {
            WalatraDB.deleteLog(id);
            renderLogsTable();
            updateCounters();
        }
    };

    // Bersihkan Semua Logs
    document.getElementById('btn-clear-logs').addEventListener('click', function() {
        if (confirm('PERINGATAN: Apakah Anda yakin ingin menghapus SELURUH catatan verifikasi barcode? Tindakan ini tidak dapat dibatalkan.')) {
            WalatraDB.clearLogs();
            renderLogsTable();
            updateCounters();
        }
    });


    // ==========================================
    // 5. BOOTSTRAP RUN & INITIAL CHECK
    // ==========================================
    checkSession();
});
