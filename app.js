/* ==========================================
   WALATRA HERBAL PREMIUM JAVASCRIPT
   Author: Antigravity AI
   Interactive Features & LocalStorage Sync
   ========================================== */

// ==========================================
// 0. DATABASE LAYER (LocalStorage)
// ==========================================
const WalatraDB = {
    // --- Key Constants ---
    KEYS: {
        PRODUCTS: 'walatra_products',
        BARCODES: 'walatra_barcodes',
        MESSAGES: 'walatra_messages',
        LOGS: 'walatra_verification_logs'
    },

    // --- Default Seed Data (dipakai jika LocalStorage kosong) ---
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

    // --- Generic CRUD Helpers ---
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

    // --- Products ---
    getProducts() { return this._get(this.KEYS.PRODUCTS, this.DEFAULT_PRODUCTS); },
    saveProducts(list) { this._set(this.KEYS.PRODUCTS, list); },

    // --- Barcodes ---
    getBarcodes() { return this._get(this.KEYS.BARCODES, this.DEFAULT_BARCODES); },
    saveBarcodes(list) { this._set(this.KEYS.BARCODES, list); },



    // --- Messages ---
    getMessages() { return this._get(this.KEYS.MESSAGES); },
    addMessage(msg) {
        const list = this.getMessages();
        msg.id = list.length > 0 ? Math.max(...list.map(m => m.id)) + 1 : 1;
        msg.status = 'unread';
        msg.created_at = new Date().toISOString();
        list.push(msg);
        this._set(this.KEYS.MESSAGES, list);
        return msg;
    },

    // --- Verification Logs ---
    getLogs() { return this._get(this.KEYS.LOGS); },
    addLog(log) {
        const list = this.getLogs();
        log.id = list.length > 0 ? Math.max(...list.map(l => l.id)) + 1 : 1;
        log.scanned_at = new Date().toISOString();
        list.push(log);
        this._set(this.KEYS.LOGS, list);
    }
};


document.addEventListener('DOMContentLoaded', function () {

    // ==========================================
    // 1. STICKY HEADER & NAV ACTIVE STATES
    // ==========================================
    const header = document.querySelector('.main-header');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link-custom');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            updateActiveLinks(currentSectionId);
        }
    });

    function updateActiveLinks(sectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) link.classList.add('active');
        });
        mobileLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) link.classList.add('active');
        });
    }

    // ==========================================
    // 2. MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileDropdownMenu = document.getElementById('mobile-dropdown-menu');

    mobileMenuBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        mobileDropdownMenu.classList.toggle('show');
        const icon = mobileMenuBtn.querySelector('i');
        icon.className = mobileDropdownMenu.classList.contains('show') ? 'fa-solid fa-xmark' : 'fa-solid fa-bars-staggered';
    });

    document.querySelectorAll('.mobile-dropdown a').forEach(link => {
        link.addEventListener('click', function () {
            mobileDropdownMenu.classList.remove('show');
            mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars-staggered';
        });
    });

    document.addEventListener('click', function (e) {
        if (!mobileDropdownMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileDropdownMenu.classList.remove('show');
            mobileMenuBtn.querySelector('i').className = 'fa-solid fa-bars-staggered';
        }
    });

    // ==========================================
    // 3. DYNAMIC PRODUCT RENDERING FROM DB
    // ==========================================
    const productsGrid = document.getElementById('products-grid');
    const filterButtons = document.querySelectorAll('.btn-filter');

    function formatPrice(num) {
        return 'Rp ' + num.toLocaleString('id-ID');
    }

    function renderProducts(filterCategory) {
        const products = WalatraDB.getProducts().filter(p => p.is_active);
        productsGrid.innerHTML = '';

        products.forEach(product => {
            if (filterCategory && filterCategory !== 'semua' && product.category !== filterCategory) return;

            const badgeHTML = product.badge_text
                ? `<span class="product-badge ${product.badge_class}">${product.badge_text}</span>`
                : '';

            const waText = encodeURIComponent(`Halo Walatra Herbal, saya tertarik membeli ${product.name}`);

            const cardHTML = `
                <div class="col-lg-4 col-md-6 product-item" data-category="${product.category}">
                    <div class="product-card">
                        ${badgeHTML}
                        <div class="product-visual">
                            <div class="product-visual-slider" id="slider-${product.id}">
                                <div class="slider-wrapper">
                                    <img src="${product.image_main}" class="slider-img active" data-index="0" alt="${product.name}">
                                    ${product.images_additional && product.images_additional.length > 0
                    ? product.images_additional.map((img, idx) => `<img src="${img}" class="slider-img" data-index="${idx + 1}" alt="${product.name} ${idx + 1}">`).join('')
                    : ''
                }
                                </div>
                                ${product.images_additional && product.images_additional.length > 0 ? `
                                <button class="slider-arrow prev" onclick="event.preventDefault(); window.rotateProductSlider(${product.id}, -1)"><i class="fa-solid fa-angle-left"></i></button>
                                <button class="slider-arrow next" onclick="event.preventDefault(); window.rotateProductSlider(${product.id}, 1)"><i class="fa-solid fa-angle-right"></i></button>
                                <div class="slider-dots">
                                    <span class="slider-dot active" data-index="0" onclick="event.preventDefault(); window.setProductSlider(${product.id}, 0)"></span>
                                    ${product.images_additional.map((_, idx) => `<span class="slider-dot" data-index="${idx + 1}" onclick="event.preventDefault(); window.setProductSlider(${product.id}, ${idx + 1})"></span>`).join('')}
                                </div>
                                ` : ''}
                            </div>
                        </div>
                        <div class="product-body text-start">
                            <div class="d-flex justify-content-between align-items-center mb-2">
                                <span class="product-category text-uppercase">${product.category}</span>
                                <span class="product-price">${formatPrice(product.price)}</span>
                            </div>
                            <h4 class="product-title font-poppins">${product.name}</h4>
                            <p class="product-desc text-muted mb-3">${product.description}</p>
                            <div class="d-flex justify-content-between align-items-center border-top border-light-green pt-3">
                                <span class="cert-text text-success"><i class="fa-solid fa-shield-check me-1"></i> BPOM ${product.bpom_number}</span>
                                <a href="https://wa.me/6282147425390?text=${waText}" target="_blank" class="btn-buy" aria-label="Beli ${product.name}"><i class="fa-brands fa-whatsapp"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            productsGrid.insertAdjacentHTML('beforeend', cardHTML);
        });

        // Animate in
        requestAnimationFrame(() => {
            productsGrid.querySelectorAll('.product-item').forEach((item, i) => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s`;
                requestAnimationFrame(() => { item.style.opacity = '1'; item.style.transform = 'translateY(0)'; });
            });
        });
    }



    // Initial render
    renderProducts('semua');

    // Filter buttons
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function () {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            renderProducts(this.getAttribute('data-filter'));
        });
    });

    // ==========================================
    // 4. BARCODE VERIFICATION (from LocalStorage DB)
    // ==========================================
    const verifyForm = document.getElementById('verify-form');
    const barcodeInput = document.getElementById('barcode-input');
    const verifyResult = document.getElementById('verify-result');
    const statusBadge = document.getElementById('result-status-badge');
    const resultTitle = document.getElementById('result-title');
    const resultDesc = document.getElementById('result-desc');
    const resultMessageContainer = document.querySelector('.result-message');

    verifyForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const verifyBtn = verifyForm.querySelector('button');
        const originalBtnText = verifyBtn.innerHTML;
        verifyBtn.disabled = true;
        verifyBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-1"></i> Memproses...';
        verifyResult.classList.add('d-none');

        setTimeout(() => {
            const inputVal = barcodeInput.value.trim().toUpperCase();
            resultMessageContainer.className = 'result-message p-3 rounded';
            statusBadge.className = 'badge';

            // Cari barcode di LocalStorage database
            const barcodes = WalatraDB.getBarcodes();
            const products = WalatraDB.getProducts();
            const match = barcodes.find(b => b.code === inputVal);

            let logResult = 'fake';

            if (match) {
                const product = products.find(p => p.id === match.product_id);
                const productName = product ? product.name : 'Produk Tidak Dikenal';

                if (match.status === 'genuine') {
                    logResult = 'genuine';
                    statusBadge.innerHTML = '<i class="fa-solid fa-circle-check me-1"></i> ASLI';
                    statusBadge.classList.add('bg-success', 'text-white');
                    resultMessageContainer.classList.add('genuine');
                    resultTitle.textContent = 'PRODUK 100% ASLI & TERDAFTAR';
                    resultDesc.textContent = `${productName} ini terdaftar sebagai produk resmi PT Walatra Herbal. Nomor Batch: ${match.batch_number}. Tanggal Produksi: ${match.production_date}. Aman untuk dikonsumsi.`;
                } else {
                    logResult = 'expired';
                    statusBadge.innerHTML = '<i class="fa-solid fa-triangle-exclamation me-1"></i> KADALUARSA';
                    statusBadge.classList.add('bg-warning', 'text-dark');
                    resultMessageContainer.classList.add('expired');
                    resultTitle.textContent = 'BARCODE ASLI - KADALUARSA ATAU DINAKTIFKAN';
                    resultDesc.textContent = `Kode ini terdaftar untuk ${productName}, namun telah melewati masa berlaku (${match.expiry_date}) atau ditarik dari peredaran. Disarankan untuk tidak mengonsumsi produk ini.`;
                }
            } else {
                statusBadge.innerHTML = '<i class="fa-solid fa-circle-xmark me-1"></i> TIDAK TERDAFTAR';
                statusBadge.className = 'badge bg-danger text-white';
                resultMessageContainer.classList.add('fake');
                resultTitle.textContent = 'PERINGATAN: KODE TIDAK DIKENAL (POTENSI PALSU)';
                resultDesc.textContent = 'Kode barcode "' + inputVal + '" tidak ditemukan dalam database resmi Walatra Herbal. Waspadalah terhadap produk tiruan yang dapat membahayakan kesehatan Anda.';
            }

            // Simpan log verifikasi ke database
            WalatraDB.addLog({
                barcode_scanned: inputVal,
                result: logResult,
                user_agent: navigator.userAgent
            });

            verifyBtn.disabled = false;
            verifyBtn.innerHTML = originalBtnText;
            verifyResult.classList.remove('d-none');
            verifyResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

        }, 1200);
    });

    // ==========================================
    // 5. CONTACT FORM → WhatsApp + Save to DB
    // ==========================================
    const contactForm = document.getElementById('contact-form');
    const contactSuccess = document.getElementById('contact-success');

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const nameVal = document.getElementById('contact-name').value.trim();
        const phoneVal = document.getElementById('contact-phone').value.trim();
        const subjectSelect = document.getElementById('contact-subject');
        const subjectVal = subjectSelect.options[subjectSelect.selectedIndex].text;
        const messageVal = document.getElementById('contact-message').value.trim();

        const submitBtn = contactForm.querySelector('.btn-submit-form');
        const originalBtnText = submitBtn.innerHTML;

        // Simpan pesan ke database lokal agar admin bisa membaca
        WalatraDB.addMessage({
            sender_name: nameVal,
            sender_phone: phoneVal,
            subject: subjectVal,
            message_body: messageVal
        });

        // Formulasi & buka WhatsApp
        const waNumber = '6282147425390';
        const textMessage = `Halo Customer Service Walatra Herbal,\n\nSaya ingin berkonsultasi/mengajukan pertanyaan melalui website. Berikut detailnya:\n\n*Nama:* ${nameVal}\n*WhatsApp Pengirim:* ${phoneVal}\n*Keperluan:* ${subjectVal}\n*Pesan:* \n"${messageVal}"\n\nTerima kasih.`;

        const waUrl = `https://wa.me/${waNumber}?text=${encodeURIComponent(textMessage)}`;
        window.open(waUrl, '_blank');

        // Reset form
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;

        contactSuccess.innerHTML = '<i class="fa-solid fa-circle-check me-2"></i> Berhasil! Pesan Anda tersimpan dan dialihkan ke WhatsApp Customer Service kami.';
        contactSuccess.classList.remove('d-none');

        setTimeout(() => { contactSuccess.classList.add('d-none'); }, 6000);
    });

    // ==========================================
    // LOGIKA SLIDER GAMBAR CARD PRODUK
    // ==========================================
    window.setProductSlider = function (productId, index) {
        const slider = document.getElementById(`slider-${productId}`);
        if (!slider) return;

        const imgs = slider.querySelectorAll('.slider-img');
        const dots = slider.querySelectorAll('.slider-dot');

        imgs.forEach((img, idx) => {
            if (idx === index) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });

        dots.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    };

    window.rotateProductSlider = function (productId, step) {
        const slider = document.getElementById(`slider-${productId}`);
        if (!slider) return;

        const imgs = slider.querySelectorAll('.slider-img');
        let activeIdx = -1;
        imgs.forEach((img, idx) => {
            if (img.classList.contains('active')) {
                activeIdx = idx;
            }
        });

        if (activeIdx !== -1) {
            let nextIdx = activeIdx + step;
            if (nextIdx >= imgs.length) nextIdx = 0;
            if (nextIdx < 0) nextIdx = imgs.length - 1;
            window.setProductSlider(productId, nextIdx);
        }
    };

});
