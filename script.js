// ======================= TopUpGaming Frontend Script =======================
document.addEventListener('DOMContentLoaded', () => {
  const $  = (s, ctx=document) => ctx.querySelector(s);
  const $$ = (s, ctx=document) => Array.from(ctx.querySelectorAll(s));
  try{ lucide?.createIcons(); }catch{}

  // ============================== KONFIGURASI ==============================
  // Nomor WhatsApp admin (format internasional 62...)
  const ADMIN_WA = "6282129837460";

  // Auto-buka WhatsApp setelah "Sudah Membayar" (opsional)
  const OPEN_WHATSAPP_ON_SUCCESS = true;

    // URL Google Apps Script Web App (/exec)
   const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbz-9Xa5NQfZlwujGST2jarCwP0f6oSrDcJ64LrhSgsVLhSygqfdJHtc8iPqe1kDKytY/exec";


  // Paket layanan contoh (boleh disesuaikan/ditambah)
  const PACKAGES = {
    "Jasa": [
      { id:"js1", name:"Landing Page",   price:"Rp 249.000", desc:"Note : Sudah termasuk domain dan hosting (1 Tahun) cek lebih lengkap www.servadorcorp.site" },
      { id:"js2", name:"Company Profile",   price:"Rp 799.000", desc:"Note : Sudah termasuk domain dan hosting (1 Tahun) cek lebih lengkap www.servadorcorp.site" },
      { id:"js1", name:"Toko Online",   price:"Rp 1.499.000", desc:"Note : Sudah termasuk domain dan hosting (1 Tahun) cek lebih lengkap www.servadorcorp.site" },
    ],
    "Netflix Premium": [
      { id:"np1", name:"Netflix Sharing 1 Bulan 1P2U",      price:"Rp 15.000", desc:"Note : 1 profil diisi 2 user" },
      { id:"np2", name:"Netflix Sharing 1 Bulan 1P1U",      price:"Rp 20.000", desc:"Note : 1 profil diisi 1 user" },
      { id:"np3", name:"Netflix Private 1 Bulan",      price:"Rp 30.000", desc:"Note : Jatah 1 profile boleh login 2 device (hp/tv) - bebas ubah nama/foto profile - garansi anti limit" },
      { id:"np4", name:"Netflix Group 1 Bulan",        price:"Rp 100.000", desc:"Note : Dapet 5 profil"}
    ],
    "Spotify Premium": [
      { id:"sp1", name:"Spotify INDPLAN FG 1 Bulan",   price:"Rp 16.000", desc:"Note : Full Garansi" },
      { id:"sp2", name:"Spotify INDPLAN FG 2 Bulan",   price:"Rp 28.000", desc:"Note : Full Garansi" }
    ],
    "YouTube Premium": [
      { id:"yt1", name:"FAMPLAN 1 Bulan",   price:"Rp 3.000", desc:"Note : Full Garansi (Akun buyer)" },
      { id:"yt2", name:"FAMHEAD 1 Bulan",   price:"Rp 6.000", desc:"Note : Full Garansi (Akun Seller)" }
    ],
    "Canva Pro": [
      { id:"cv1", name:"Member 1 Bulan",         price:"Rp 1.000", desc:"Note : Member + Free Designer" },
      { id:"cv2", name:"Member 1 Tahun",         price:"Rp 10.000", desc:"Note : Member + Free Designer" },
      { id:"cv3", name:"Admin 1 Bulan",          price:"Rp 12.000", desc:"Note : Bisa Invite 20 Member" },
      { id:"cv4", name:"Owner 1 Bulan",          price:"Rp 10.000", desc:"Note : Bisa Invite 100 Member" }
      
    ],
    "Vidio": [
      { id:"vd1", name:"Sharing 1 Bulan",           price:"Rp 15.000", desc:"Note : All Device, Full Garansi" },
      { id:"vd2", name:"Private 1 Bulan",           price:"Rp 25.000", desc:"Note : All Device, Full Garansi" },
      { id:"vd3", name:"Private (TV Only) 1 Tahun",           price:"Rp 10.000", desc:"Note : TV Only ! , Garansi only back free 1 bulan" },
    ],
    "WeTV": [
      { id:"wt1", name:"Sharing 1 Bulan",                price:"Rp 10.000", desc:"Note : Full Garansi" },
      { id:"wt2", name:"Private 1 Bulan",               price:"Rp 25.000", desc:"Note : Anti Limir, Full Garansi" },
    ],
    "prime video": [
      { id:"pm1", name:"Sharing 1 Bulan",           price:"Rp 8.000", desc:"Note : 3 user Ada Limit tapi jarang, Full Garansi" },
      { id:"pm2", name:"Sharing 2 Bulan",          price:"Rp 12.000", desc:"Note : 3 use Ada Limit tapi jarang, Full Garansi" },
      { id:"pm3", name:"Privat 1 Bulan",          price:"Rp 15.000", desc:"Note : Akun Dari Penjual, Full Garansi" },
      ],
    "picsart": [
      { id:"pc1", name:"PICSART PRO 1 Bulan",           price:"Rp 8.000", desc:"Note : Full Garansi" },
    ],
    "Disney": [
      { id:"ds1", name:"Disney PLAN 1 Bulan",           price:"Rp 20.000", desc:"Note : 10 User, Sharing : login memakai otp, login 1 device, akun dari penjualFull Garansi" },
      { id:"ds2", name:"Disney PREM 1 Bulan",           price:"Rp 90.000", desc:"Note : Nomor Dari Pembeli - All Provider - Full Garansi" },
    ],
    "Viu": [
      { id:"v1", name:"Viu Private 1 Bulan",           price:"Rp 5.000", desc:"Note : Anti Limit - Full Garansi" },
    ],
    "VPN": [
      { id:"vp1", name:"VPN EXPRESS 1 Bulan",           price:"Rp 8.000", desc:"Note : Private - Full Garansi" },
      { id:"vp1", name:"VPN HMA 1 Bulan",           price:"Rp 8.000", desc:"Note : Private - Full Garansi" },
      { id:"vp1", name:"VPN WINDSCRIB 1 Bulan",           price:"Rp 14.000", desc:"Note : Sharing- Full Garansi" },
      { id:"vp1", name:"VPN SURFSHARK 1 Bulan",           price:"Rp 14.000", desc:"Note : Private - Full Garansi" },
      { id:"vp1", name:"VPN NORD 1 Tahun",           price:"Rp 30.000", desc:"Note : Sharing - Full Garansi" },
    ],
    "imei": [
      { id:"i1", name:"Unblock iMei 1 Bulan",           price:"Rp 120.000", desc:"Note : Bisa Semua Kartu - Proses 1-2 Jam - Full Garansi" },
      { id:"i1", name:"Unblock iMei 3 Bulan",           price:"Rp 250.000", desc:"Note : Bisa Semua Kartu - Proses 1-2 Jam - Full Garansi" },
    ],
    "Robux": [
      { id:"rb1", name:"100 Robux",           price:"Rp 12.000", desc:"Note : Robux akan masuk dalam waktu maksimal 5 hari (120 jam) melalui Gamepass. ( AFTER TAX )" },
      { id:"rb2", name:"500 Robux",           price:"Rp 60.000", desc:"Note : Robux akan masuk dalam waktu maksimal 5 hari (120 jam) melalui Gamepass. ( AFTER TAX )" },
      { id:"rb3", name:"1.000 Robux",           price:"Rp 120.000", desc:"Note : Robux akan masuk dalam waktu maksimal 5 hari (120 jam) melalui Gamepass. ( AFTER TAX )" },
      { id:"rb4", name:"5.000 Robux",           price:"Rp 600.000", desc:"Note : Robux akan masuk dalam waktu maksimal 5 hari (120 jam) melalui Gamepass. ( AFTER TAX )" },
      { id:"rb5", name:"10.000 Robux",           price:"Rp 1.200.000", desc:"Note : Robux akan masuk dalam waktu maksimal 5 hari (120 jam) melalui Gamepass. ( AFTER TAX )" },
    ],
    "turnitin": [
      { id:"t1", name:"Cek Turnitin 3x",           price:"Rp 5.000", desc:"Note : Bisa Cek Kapan Saja Intinya 3x pengecekan" },
    ],
    "capcut": [
      { id:"c1", name:"Capcut Sharing 1 Bulan",           price:"Rp 5.000", desc:"Note : Akun Seller - Full Garansi" },
      { id:"c2", name:"Capcut Private 1 Bulan",           price:"Rp 12.000", desc:"Note : Akun Seller - Full Garansi" },
    ],
  };

  // Metode pembayaran manual (DATA SESUAI PERMINTAAN)
  const MANUAL_ACCOUNTS = {
    "QRIS": {
      type: "qris",
      note: "Scan QR berikut.",
      // Ganti ke gambar QRIS kamu
      qr: "asset/qris2.jpeg"
    },
    "BCA Transfer": {
      type: "bank",
      bank: "BCA",
      number: "6050649502",
      name: "Muhammad Faiz Rizqi Pram"
    },
    "GoPay": {
      type: "ewallet",
      number: "082129837460",
      name: "Muhammad Faiz"
    },
    "ShopeePay": {
      type: "ewallet",
      number: "082129837460",
      name: "Muhammad Faiz"
    },
    "SeaBank": {
      type: "bank",
      bank: "SEABANK",
      number: "901922960772", // isi jika ada
      name: "Muhammad Faiz"
    }
  };
  const DEFAULT_METHOD = "QRIS";

  // ============================ KODE UNIK (3 digit) =========================
  const UNIQUE_CODE = {
    enabled: true,
    applyFor: ["BCA Transfer", "GoPay", "ShopeePay", "SeaBank","QRIS"], // QRIS tidak pakai unik
    min: 111,
    max: 999
  };
  function genUniqueCode(method){
    if(!UNIQUE_CODE.enabled) return 0;
    if (UNIQUE_CODE.applyFor.length && !UNIQUE_CODE.applyFor.includes(method)) return 0;
    const {min,max} = UNIQUE_CODE;
    return Math.floor(Math.random()*(max-min+1))+min;
  }

  // ================================ UTIL ===================================
  const toast = $('#toast');
  function showToast(msg){
    if(!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'), 1600);
  }
  function parseRupiah(str){
    const n = Number((str||'').toString().replace(/[^\d]/g,''));
    return isNaN(n) ? 0 : n;
  }
  function formatRupiah(n){
    try{ return 'Rp ' + Number(n||0).toLocaleString('id-ID'); }
    catch{ return `Rp ${n}`; }
    function showQrisReminder(total, unique) {
  const wrap = document.getElementById('qrisNote');
  const txt  = document.getElementById('qrisNoteText');
  const totalEl = document.getElementById('qrisTotalText');
  if (!wrap || !txt || !totalEl) return;

  const totalFmt = formatRupiah(Number(total||0));
  totalEl.textContent = totalFmt;

  if (unique > 0) {
    txt.innerHTML = `Saat scan QRIS, masukkan nominal tepat <b id="qrisTotalText">${totalFmt}</b> (sudah termasuk kode unik <b>${unique}</b>).`;
  } else {
    txt.innerHTML = `Saat scan QRIS, masukkan nominal tepat <b id="qrisTotalText">${totalFmt}</b>.`;
  }

  wrap.hidden = false;
  wrap.classList.remove('pulse'); // reset animasi
  // trigger reflow agar animasi bisa diputar ulang
  void wrap.offsetWidth;
  wrap.classList.add('pulse');
}

function hideQrisReminder() {
  const wrap = document.getElementById('qrisNote');
  if (wrap) wrap.hidden = true;
}

  }
  function makeTxId(){
    const d=new Date(), p=n=>String(n).padStart(2,'0');
    return `TX-${d.getFullYear()}${p(d.getMonth()+1)}${p(d.getDate())}-${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}-${Math.random().toString(36).slice(2,6).toUpperCase()}`;
  }
  async function notifyBot(payload){
  if(!WEBHOOK_URL) return;
  try{
    await fetch(WEBHOOK_URL, {
      method: 'POST',
      mode: 'no-cors',                          // hindari preflight
      headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // bukan application/json
      body: JSON.stringify(payload)             // Apps Script tetap bisa parse
    });
    // Response akan "opaque" (normal untuk no-cors), kita tidak perlu bacanya.
  }catch(e){
    console.log('webhook error', e);
  }
}

  function openWA(text){
    const url = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(text)}`;
    window.open(url,'_blank');
  }
async function fileToBase64Compressed(file, maxW=1200, maxH=1200, quality=0.82){
  return new Promise((resolve, reject) => {
    try{
      const img = new Image();
      const reader = new FileReader();
      reader.onload = e => {
        img.onload = () => {
          let w = img.naturalWidth || img.width;
          let h = img.naturalHeight || img.height;
          const ratio = Math.min(maxW / w, maxH / h, 1);
          const cw = Math.round(w * ratio), ch = Math.round(h * ratio);

          const canvas = document.createElement('canvas');
          canvas.width = cw; canvas.height = ch;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, cw, ch);

          const mime = (file.type && file.type.startsWith('image/')) ? file.type : 'image/jpeg';
          const dataUrl = canvas.toDataURL(mime, quality);
          const base64 = dataUrl.split(',')[1];
          resolve({ base64, mime });
        };
        img.onerror = reject;
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    }catch(err){ reject(err); }
  });
}

  // =========================== UI: NAV / THEME =============================
  const yearEl = $('#year'); if (yearEl) yearEl.textContent = new Date().getFullYear();

  const themeToggle = $('#themeToggle');
  const storedTheme = localStorage.getItem('theme-dark');
  if (storedTheme === '1') document.body.classList.add('theme-dark');
  themeToggle?.addEventListener('click', () => {
    document.body.classList.toggle('theme-dark');
    localStorage.setItem('theme-dark', document.body.classList.contains('theme-dark') ? '1' : '0');
    themeToggle.innerHTML = document.body.classList.contains('theme-dark')
      ? '<i data-lucide="moon-star"></i><span class="hide-sm"> Mode</span>'
      : '<i data-lucide="sun"></i><span class="hide-sm"> Mode</span>';
    try{ lucide?.createIcons(); }catch{}
  });

  const mobileBtn = $('#mobileMenuBtn'), mobile = $('#mobileMenu');
  const menuIcon  = $('#menuIcon'), closeIcon = $('#closeIcon');
  mobileBtn?.addEventListener('click', () => {
    mobile?.classList.toggle('active');
    const open = mobile?.classList.contains('active');
    if(menuIcon && closeIcon){
      menuIcon.style.display = open ? 'none' : 'block';
      closeIcon.style.display= open ? 'block' : 'none';
    }
    mobileBtn.setAttribute('aria-expanded', open ? 'true':'false');
  });
  $$('.nav-mobile-link').forEach(a => a.addEventListener('click', ()=>{
    mobile?.classList.remove('active');
    if(menuIcon && closeIcon){ menuIcon.style.display='block'; closeIcon.style.display='none'; }
  }));

  // smooth scroll
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e=>{
    const id = a.getAttribute('href'); if(!id || id === '#') return;
    const t = document.querySelector(id); if(!t) return;
    e.preventDefault(); window.scrollTo({top: t.offsetTop - 64, behavior:'smooth'});
  }));

  // progress + float buttons
  const progress = $('#scrollProgress'), backTop = $('#backToTop'), waFloat = $('#waFloat');
  function onScroll(){
    const sc = window.scrollY;
    const h  = document.documentElement.scrollHeight - window.innerHeight;
    if(progress) progress.style.width = Math.max(0, Math.min(1, sc/h))*100 + '%';
    const show = sc > 400; [backTop, waFloat].forEach(el => el?.classList.toggle('show', show));
  }
  window.addEventListener('scroll', onScroll); onScroll();
  backTop?.addEventListener('click', e=>{ e.preventDefault(); window.scrollTo({top:0,behavior:'smooth'}); });

  // hero particles
  const partWrap = $('#particles');
  if (partWrap){
    const count = 36;
    for (let i=0;i<count;i++){
      const s = document.createElement('span');
      s.className = 'spark';
      s.style.left = (Math.random()*100)+'%';
      s.style.top  = (100+Math.random()*40)+'%';
      s.style.animationDelay = (Math.random()*6)+'s';
      s.style.opacity = (0.25+Math.random()*0.55).toFixed(2);
      partWrap.appendChild(s);
    }
  }

  // reveal anim untuk card
  const io = new IntersectionObserver((ents)=>{
    ents.forEach(e=>{
      if(e.isIntersecting){ e.target.style.opacity='1'; e.target.style.transform='translateY(0)'; }
    });
  },{threshold:.12, rootMargin:'0px 0px -40px 0px'});
  $$('.service-card').forEach(el=>{
    el.style.opacity='0'; el.style.transform='translateY(36px)';
    el.style.transition='opacity .6s ease, transform .6s ease';
    io.observe(el);
  });

  // filter & search
  const search = $('#serviceSearch'); const chips = $$('.chip'); const cards = $$('.service-card');
  let curFilter = 'all';
  function applyFilter(){
    const q = (search?.value || '').toLowerCase();
    cards.forEach(c=>{
      const cat = c.getAttribute('data-category') || '';
      const nm  = (c.getAttribute('data-name') || '').toLowerCase();
      const okCat  = (curFilter==='all' || cat===curFilter);
      const okText = (!q || nm.includes(q));
      c.style.display = (okCat && okText) ? '' : 'none';
    });
  }
  search?.addEventListener('input', applyFilter);
  chips.forEach(b=>b.addEventListener('click', ()=>{
    chips.forEach(x=>x.classList.remove('active'));
    b.classList.add('active'); curFilter = b.dataset.filter || 'all'; applyFilter();
  }));

  // ============================= MODAL: PAKET ==============================
  const pkgModal   = $('#packageModal');
  const list       = $('#packageList');
  const subtitle   = $('#modalSubtitle');
  const manualBtn  = $('#manualBtn');
  const buyNowBtn  = $('#buyNowBtn');

  function payMethodsHtml(defaultKey=DEFAULT_METHOD){
    const keys = Object.keys(MANUAL_ACCOUNTS);
    return `
      <div class="divider"></div>
      <div class="form">
        <h4 class="form-title">Masukkan Detail</h4>
        <p class="form-help">Opsional: Jika anda ingin mendapatkan bukti pembayaran atas pembelian anda, harap mengisi alamat emailnya yang terkirim akan di notify ke email kamu.</p>

        <label class="field">
          <span>Email untuk bukti (opsional)</span>
          <input type="email" id="emailReceipt" placeholder="nama@email.com" inputmode="email">
        </label>

        <label class="field required">
          <span>Harap masukkan email / no whatsapp <b>*</b></span>
          <input type="text" id="contactInput" placeholder="08123xxx / email" required>
        </label>

        <label class="check">
          <input type="checkbox" id="promoOptin">
          <span>Ya, Saya ingin menerima berita dan promosi melalui SMS atau Whatsapp</span>
        </label>

        <label class="field">
          <span>Kode Cashback (opsional)</span>
          <input type="text" id="cashbackCode" placeholder="CASHBACK20">
        </label>
      </div>

      <div class="divider"></div>
      <h4 class="form-title">Metode Pembayaran</h4>
      <div class="pay-methods" id="payMethods">
        ${keys.map((k)=>`
          <label class="pmethod">
            <input type="radio" name="payMethod" value="${k}" ${k===defaultKey?'checked':''}>
            <span>${k}</span>
          </label>
        `).join('')}
      </div>
      <div class="pay-note muted" id="payNote">${MANUAL_ACCOUNTS[defaultKey].note || ''}</div>
    `;
  }

  function openPackageModal(service){
    const items = PACKAGES[service] || [{id:"d1", name:"Default 1 Bulan", price:"Rp 0"}];
    if (subtitle) subtitle.textContent = service;

    const optionsHtml = items.map((p,i)=>`
      <label class="option">
        <div style="display:flex;align-items:center;gap:.6rem">
          <input type="radio" name="pkg" value="${p.name} — ${p.price}" ${i===0?'checked':''}>
          <div class="o-text">
            <div class="o-name">${p.name}</div>
            ${p.desc ? `<div class="o-desc">${p.desc}</div>` : ''}
          </div>
        </div>
        <div class="o-price">${p.price}</div>
      </label>
    `).join('');

    if (list) list.innerHTML = optionsHtml + payMethodsHtml(DEFAULT_METHOD);

    function currentAmount(){
      const chosen = document.querySelector('input[name="pkg"]:checked')?.value
                  || (items[0].name + ' — ' + items[0].price);
      const priceStr = (chosen.split('—').pop() || '').trim();
      return parseRupiah(priceStr);
    }

    function updateLink(){
      const chosen  = document.querySelector('input[name="pkg"]:checked')?.value
                   || (items[0].name + ' — ' + items[0].price);
      const contact = $('#contactInput')?.value.trim();
      const email   = $('#emailReceipt')?.value.trim();
      const code    = $('#cashbackCode')?.value.trim();
      const promo   = $('#promoOptin')?.checked ? 'Ya' : 'Tidak';
      const method  = document.querySelector('input[name="payMethod"]:checked')?.value || DEFAULT_METHOD;
      const amount  = currentAmount();

      let text = `Halo admin, saya mau beli ${service} — ${chosen}.
Nominal: ${formatRupiah(amount)}`;
      if(contact) text += `\nKontak: ${contact}`;
      if(email)   text += `\nEmail bukti: ${email}`;
      if(code)    text += `\nKode cashback: ${code}`;
      text += `\nBerlangganan promo: ${promo}`;
      text += `\nMetode bayar: ${method} (manual)`;

      if (buyNowBtn) buyNowBtn.href = `https://wa.me/${ADMIN_WA}?text=${encodeURIComponent(text)}`;
      const noteBox = $('#payNote'); if(noteBox) noteBox.textContent = MANUAL_ACCOUNTS[method]?.note || '';
    }

    list?.addEventListener('change', updateLink);
    list?.addEventListener('input',  updateLink);
    updateLink();

    // validasi sebelum ke WA
    buyNowBtn?.addEventListener('click', (e)=>{
      const contact = $('#contactInput')?.value.trim();
      if(!contact){
        e.preventDefault();
        const el = $('#contactInput'); el?.classList.add('input-error');
        showToast('Silahkan Scroll & Masukkan Email/No WhatsApp dulu ya 🙏');
        setTimeout(()=>el?.classList.remove('input-error'),1500);
      }
    }, { once:true });

    // tombol Bayar Manual → buka modal manual
    manualBtn?.addEventListener('click', (e)=>{
      e.preventDefault();
      const chosen = document.querySelector('input[name="pkg"]:checked')?.value
                  || (items[0].name + ' — ' + items[0].price);
      const method = document.querySelector('input[name="payMethod"]:checked')?.value || DEFAULT_METHOD;
      const contact = $('#contactInput')?.value.trim();
      const email = $('#emailReceipt')?.value.trim();
      const promo = $('#promoOptin')?.checked || false;
      const code  = $('#cashbackCode')?.value.trim();
      const amount= currentAmount();

      if(!contact){
        const el = $('#contactInput'); el?.classList.add('input-error');
        showToast('Silahkan Scroll & Masukkan Email/No WhatsApp dulu ya 🙏');
        setTimeout(()=>el?.classList.remove('input-error'),1500);
        return;
      }

      closeModal(pkgModal);
      openManualFlow({ service, chosen, method, contact, email, promo, code, amount });
    }, { once:true });

    openModal(pkgModal);
  }

  function openModal(el){
    if(!el) return;
    document.body.classList.add('lock-scroll');
    el.classList.add('show');
    el.setAttribute('aria-hidden','false');
    try{ lucide?.createIcons(); }catch{}
  }
  function closeModal(el){
    if(!el) return;
    el.classList.remove('show');
    el.setAttribute('aria-hidden','true');
    document.body.classList.remove('lock-scroll');
  }

  // hook tombol "Pilih Paket"
  $$('.buy-btn').forEach(btn=>btn.addEventListener('click', (e)=>{
    e.preventDefault();
    const service = btn.closest('.service-card')?.getAttribute('data-name')
                 || btn.closest('.service-card')?.querySelector('.service-title')?.textContent
                 || 'Layanan';
    openPackageModal(service);
  }));

  // tutup modal paket (backdrop/X/Escape)
  pkgModal?.addEventListener('click', (e)=>{
    if (e.target.closest('.modal-backdrop') || e.target.closest('[data-close]')) closeModal(pkgModal);
  });
  document.addEventListener('keydown', (e)=>{
    if(e.key === 'Escape' && pkgModal?.classList.contains('show')) closeModal(pkgModal);
  });

  // ========================= MODAL: PEMBAYARAN MANUAL ======================
  const manualModal    = $('#manualModal');
  const manualSubtitle = $('#manualSubtitle');
  const mService = $('#mService');
  const mPackage = $('#mPackage');
  const mMethod  = $('#mMethod');
  const mAmount  = $('#mAmount');              // nominal dasar
  const mUnique  = $('#mUnique');              // kode unik (3 digit)
  const mTotal   = $('#mTotal');               // total transfer
  const rowUnique= $('#rowUnique');            // row Kode Unik
  const rowTotal = $('#rowTotal');             // row Total Transfer

  const destBox  = $('#destBox');
  const qrWrap   = $('#qrWrap');
  const qrImg    = $('#qrImg');
  const proofFile= $('#proofFile');
  const proofPreview = $('#proofPreview');
  const proofImg = $('#proofImg');
  const refNote  = $('#refNote');
  const countdownEl = $('#countdown');
  const cancelManual = $('#cancelManual');
  const paidBtn  = $('#paidBtn');

  let manualTimer = null;
  let secondsLeft = 30;

  function openManualFlow(ctx){
    // ctx: {service, chosen, method, contact, email, promo, code, amount}
    const acc = MANUAL_ACCOUNTS[ctx.method] || MANUAL_ACCOUNTS[DEFAULT_METHOD];

    if (manualSubtitle) manualSubtitle.textContent = ctx.service;
    if (mService) mService.textContent = ctx.service;
    if (mPackage) mPackage.textContent = ctx.chosen;
    if (mMethod)  mMethod.textContent  = ctx.method;

    // Nominal dasar
    const baseAmount = Number(ctx.amount || 0);
    if (mAmount) mAmount.textContent = formatRupiah(baseAmount);

    // Kode unik & total
    const unique = genUniqueCode(ctx.method);
    const total  = baseAmount + unique;

    if (unique > 0){
      if (rowUnique) rowUnique.style.display = 'flex';
      if (rowTotal)  rowTotal.style.display  = 'flex';
      if (mUnique)   mUnique.textContent = String(unique).padStart(3,'0');
      if (mTotal)    mTotal.textContent  = formatRupiah(total);
    } else {
      if (rowUnique) rowUnique.style.display = 'none';
      if (rowTotal)  rowTotal.style.display  = 'none';
    }

    // Tujuan pembayaran
    if(acc.type === 'qris'){
      if (destBox) destBox.innerHTML = `<div class="copy-row"><span>Catatan:</span><span class="muted">${acc.note || ''}</span></div>`;
      if (qrWrap) { qrWrap.style.display = 'block'; }
      if (qrImg)  {
        qrImg.src = acc.qr || '';
        qrImg.onerror = ()=>{ if(qrWrap) qrWrap.style.display='none'; };
      }
    }else{
      if (qrWrap) qrWrap.style.display = 'none';
      if (destBox) destBox.innerHTML = `
        <div class="copy-row"><span>Atas Nama</span><span class="copy-value">${acc.name || '-'}</span></div>
        <div class="copy-row">
          <span>${acc.bank ? 'No. Rekening' : 'No. Akun'}</span>
          <span class="copy-value" id="copyNumber">${acc.number || '-'}</span>
        </div>
        <div style="display:flex;gap:.5rem;justify-content:flex-end">
          <button class="copy-btn" data-copy="${acc.number || ''}">Salin No</button>
          ${acc.bank ? `<span class="muted">${acc.bank}</span>` : ''}
        </div>
      `;
      destBox?.querySelectorAll('.copy-btn').forEach(b=>{
        b.addEventListener('click', ()=>{
          const text = b.dataset.copy || '';
          navigator.clipboard.writeText(text).then(()=>showToast('Disalin ✅'));
        });
      });
    }

    // Preview bukti
    if (proofFile) proofFile.value = '';
    if (proofPreview) proofPreview.style.display = 'none';
    if (proofFile) proofFile.onchange = (e)=>{
      const f = e.target.files?.[0];
      if(!f){ if(proofPreview) proofPreview.style.display='none'; return; }
      const url = URL.createObjectURL(f);
      if (proofImg)  proofImg.src = url;
      if (proofPreview) proofPreview.style.display = 'block';
    };

    // Countdown 30s
    secondsLeft = 120;
    if (countdownEl) countdownEl.textContent = secondsLeft;
    clearInterval(manualTimer);
    manualTimer = setInterval(()=>{
      secondsLeft--;
      if (countdownEl) countdownEl.textContent = secondsLeft;
      if(secondsLeft<=0){ clearInterval(manualTimer); }
    }, 1000);

    // Tombol Batalkan
    cancelManual?.addEventListener('click', ()=>{
      clearInterval(manualTimer);
      closeModal(manualModal);
    }, { once:true });

    // Tombol Sudah Membayar
    paidBtn?.addEventListener('click', async ()=>{
      clearInterval(manualTimer);
      const note    = refNote?.value || '-';
      const proofNm = proofFile?.files?.[0]?.name || '';
      const usedSec = 30 - secondsLeft;
      const txId    = makeTxId();
      let proofBase64 = '';
      let proofMime = '';
      const f = proofFile?.files?.[0];
      if (f) {
        try {
    const out = await fileToBase64Compressed(f, 1200, 1200, 0.85);
    proofBase64 = out.base64;   // JANGAN sertakan prefix data:
    proofMime   = out.mime;
  } catch (e) {
    console.log('compress proof error', e);
  }
}
      const payload = {
        txId,
        service: ctx.service,
        package: ctx.chosen,
        method:  ctx.method,
        amount:  baseAmount,
        amount_formatted: formatRupiah(baseAmount),
        unique_code: unique,
        amount_total: total,
        amount_total_formatted: formatRupiah(total),
        contact: ctx.contact || '',
        email:   ctx.email || '',
        cashback_code: ctx.code || '',
        promo_optin: !!ctx.promo,
        note,
        proof_filename: proofNm,
        proof_base64: proofBase64,
        proof_mime: proofMime,
        waited_seconds: usedSec,
        timestamp: new Date().toISOString()
      };
      notifyBot(payload);

      if (OPEN_WHATSAPP_ON_SUCCESS){
        const msg =
`Konfirmasi Pembayaran Manual
ID: ${txId}
Layanan: ${ctx.service}
Paket: ${ctx.chosen}
Nominal: ${formatRupiah(baseAmount)}
Kode Unik: ${unique>0?String(unique).padStart(3,'0'):'-'}
Total Transfer: ${unique>0?formatRupiah(total):formatRupiah(baseAmount)}
Metode: ${ctx.method}
Kontak: ${ctx.contact || '-'}
Email: ${ctx.email || '-'}
Cashback: ${ctx.code || '-'} | Promo: ${ctx.promo?'Ya':'Tidak'}
Note: ${note}
Bukti: ${proofNm || '-'}
Menunggu: ${usedSec}s`;
        openWA(msg);
      }

      closeModal(manualModal);
      openSuccess({ service: ctx.service, chosen: ctx.chosen, method: ctx.method, txId, amount: baseAmount, unique, total });
    }, { once:true });

    openModal(manualModal);
  }

  // Tutup manual modal via backdrop/X
  manualModal?.addEventListener('click', (e)=>{
    if (e.target.closest('.modal-backdrop') || e.target.closest('[data-close]')) {
      clearInterval(manualTimer);
      closeModal(manualModal);
    }
  });

  // ============================ MODAL: SUCCESS =============================
  const successModal   = $('#successModal');
  const successSummary = $('#successSummary');
  const successDone    = $('#successDone');

  function openSuccess(data){
    const rows = [
      ['Layanan', data.service],
      ['Paket', data.chosen],
      ['Metode', data.method],
      ['Nominal', formatRupiah(data.amount||0)]
    ];
    if ((data.unique||0) > 0){
      rows.push(['Kode Unik', String(data.unique).padStart(3,'0')]);
      rows.push(['Total Transfer', formatRupiah(data.total||0)]);
    }
    rows.push(['ID Transaksi', data.txId]);

    if (successSummary) successSummary.innerHTML =
      rows.map(([k,v])=>`<div class="row"><span>${k}</span><span>${v}</span></div>`).join('');

    openModal(successModal);
  }

  successDone?.addEventListener('click', ()=> closeModal(successModal));
  successModal?.addEventListener('click', (e)=>{
    if (e.target.closest('.modal-backdrop') || e.target.closest('[data-close]')) closeModal(successModal);
  });
});
// ==========================================================================
// === Testimonials Slider ===
document.addEventListener('DOMContentLoaded', () => {
  lucide?.createIcons?.(); // pastikan ikon di-render

  const slider   = document.getElementById('testiSlider');
  if (!slider) return;

  const viewport = slider.querySelector('.testi-viewport');
  const track    = slider.querySelector('.testi-track');
  const cards    = Array.from(track.children);
  const prevBtn  = slider.querySelector('.testi-arrow.prev');
  const nextBtn  = slider.querySelector('.testi-arrow.next');
  const dotsWrap = document.getElementById('testiDots');

  let perView = 1, page = 0, pages = 1, autoplayId = null;

  const getGap = () => {
    const s = getComputedStyle(track);
    const g = (s.gap || s.columnGap || '16px');
    return parseFloat(g) || 16;
  };

  function compute(){
    const w = viewport.clientWidth;
    perView = window.innerWidth >= 1024 ? 3 : (window.innerWidth >= 768 ? 2 : 1);
    const gap = getGap();
    const itemW = Math.floor((w - gap * (perView - 1)) / perView);
    cards.forEach(el => { el.style.minWidth = itemW + 'px'; });
    pages = Math.max(1, Math.ceil(cards.length / perView));
    page = Math.min(page, pages - 1);
    buildDots();
    go(page, false);
  }

  function buildDots(){
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    for (let i=0; i<pages; i++){
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'dot' + (i===page ? ' active' : '');
      b.setAttribute('aria-label', 'Halaman ' + (i+1));
      b.addEventListener('click', () => { go(i); restart(); });
      dotsWrap.appendChild(b);
    }
  }

  function updateDots(){
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('.dot').forEach((d, i) => {
      d.classList.toggle('active', i === page);
    });
  }

  function offsetForPage(p){
    const gap = getGap();
    const itemW = cards[0].getBoundingClientRect().width;
    // jumlah width item + gap untuk tiap “halaman” yang dilewati
    return - (p * (itemW * perView + gap * perView));
  }

  function go(p, animate = true){
    if (pages <= 1){ track.style.transform = 'translateX(0)'; return; }
    // wrap-around
    page = ((p % pages) + pages) % pages;
    const x = offsetForPage(page);
    track.style.transition = animate ? 'transform .45s ease' : 'none';
    track.style.transform  = `translateX(${x}px)`;
    if (!animate) requestAnimationFrame(() => track.style.transition = 'transform .45s ease');
    updateDots();
  }

  function next(){ go(page + 1); restart(); }
  function prev(){ go(page - 1); restart(); }

  function start(){ stop(); autoplayId = setInterval(() => go(page + 1), 5000); }
  function stop(){ if (autoplayId) clearInterval(autoplayId), autoplayId = null; }
  function restart(){ stop(); start(); }

  // events
  nextBtn?.addEventListener('click', next);
  prevBtn?.addEventListener('click', prev);
  slider.addEventListener('mouseenter', stop);
  slider.addEventListener('mouseleave', start);
  window.addEventListener('resize', compute);

  // init
  compute();
  if (pages > 1) start();
});

// ====== TESTIMONIALS scroll-snap controller ======
(function () {
  const vp   = document.querySelector('.testi-viewport');
  const prev = document.querySelector('.testi-arrow.prev');
  const next = document.querySelector('.testi-arrow.next');
  if (!vp) return;

  const GAP = 16; // harus sama dengan --t-gap

  // lebar 1 langkah geser = lebar kartu + gap
  const stepWidth = () => {
    const card = vp.querySelector('.testi-card');
    if (!card) return vp.clientWidth;
    return card.getBoundingClientRect().width + GAP;
  };

  prev?.addEventListener('click', () =>
    vp.scrollBy({ left: -stepWidth(), behavior: 'smooth' })
  );
  next?.addEventListener('click', () =>
    vp.scrollBy({ left:  stepWidth(), behavior: 'smooth' })
  );

  // sinkronkan bullets (opsional)
  const dots = document.querySelectorAll('.testi-bullets button');
  function updateDots() {
    if (!dots.length) return;
    const i = Math.round(vp.scrollLeft / stepWidth());
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));
  }
  vp.addEventListener('scroll', () => requestAnimationFrame(updateDots));
  updateDots();
})();

/* ===== Testimoni (Apa kata mereka) ===== */

/** Data testimoni — bebas kamu ganti/expand */
const TESTI_DATA = [
  { name: "Andika", city: "Jakarta", text: "Transaksi super cepat. Langsung masuk dalam 10 detik!", avatar: "AK" },
  { name: "Nara",   city: "Bandung", text: "Harga bersahabat, CS responsif. Recommended!", avatar: "NR" },
  { name: "Safira", city: "Surabaya", text: "Website rapi, proses gampang, hasil sesuai.", avatar: "SF" },
  { name: "Rehan",  city: "Makassar", text: "Instruksi jelas, pembayaran mudah. Mantap!", avatar: "RH" },
  { name: "Mila",   city: "Depok",    text: "Top up premium aman & cepat, repeat order.", avatar: "ML" },
  { name: "Kevin",  city: "Semarang", text: "UI enak dipakai, harga transparan.", avatar: "KV" }
];

(function initTestimonials(){
  const track = document.getElementById('tTrack');
  const dots  = document.getElementById('tDots');
  if (!track || !dots) return;

  // Render cards
  track.innerHTML = TESTI_DATA.map(t => `
    <li>
      <article class="t-card">
        <p class="t-quote">“${t.text}”</p>
        <div class="t-user">
          <div class="t-avatar">${(t.avatar||t.name||'?').slice(0,2).toUpperCase()}</div>
          <div class="t-meta">
            <span class="t-name">${t.name}</span>
            <span class="t-city">${t.city}</span>
          </div>
        </div>
      </article>
    </li>
  `).join('');

  // Slider logic
  const mask  = track.closest('.mask');
  const prev  = track.closest('.viewport').querySelector('.t-nav.prev');
  const next  = track.closest('.viewport').querySelector('.t-nav.next');

  let page = 0, pages = 1;

  function per(){
    // sinkron dengan CSS media query
    return window.matchMedia('(max-width:640px)').matches ? 1 :
           window.matchMedia('(max-width:1024px)').matches ? 2 : 3;
  }
  function calcPages(){
    pages = Math.ceil(TESTI_DATA.length / per());
  }
  function go(to){
    page = Math.max(0, Math.min(pages - 1, to));
    const step = mask.clientWidth;
    track.style.transform = `translateX(${-page * step}px)`;
    updateDots();
    if (prev) prev.disabled = (page === 0);
    if (next) next.disabled = (page === pages - 1);
  }
  function buildDots(){
    dots.innerHTML = Array.from({length: pages}, (_,i) =>
      `<button class="t-dot${i===0?' active':''}" aria-label="Halaman ${i+1}" data-i="${i}"></button>`
    ).join('');
  }
  function updateDots(){
    dots.querySelectorAll('.t-dot').forEach((d,i)=>{
      d.classList.toggle('active', i === page);
    });
  }

  function onResize(){
    const oldPages = pages;
    calcPages();
    buildDots();
    // jaga agar tetap pada group yang sama
    page = Math.min(page, pages - 1);
    go(page);
  }

  // Events
  dots.addEventListener('click', e=>{
    const btn = e.target.closest('.t-dot');
    if (!btn) return;
    go(+btn.dataset.i);
  });
  prev && prev.addEventListener('click', ()=> go(page - 1));
  next && next.addEventListener('click', ()=> go(page + 1));
  window.addEventListener('resize', onResize);

  // Init
  onResize();
})();

let auto = setInterval(()=> go((page+1) % pages), 6000);
mask.addEventListener('mouseenter', ()=> clearInterval(auto));
mask.addEventListener('mouseleave', ()=> auto = setInterval(()=> go((page+1) % pages), 6000));

// util untuk menampilkan pesan error lalu scroll ke field
function showFieldError(input, message) {
  // cari/tambahkan wadah hint di bawah input
  let hint = input.parentElement.querySelector('.field-hint');
  if (!hint) {
    hint = document.createElement('div');
    hint.className = 'field-hint';
    input.parentElement.appendChild(hint);
  }
  hint.textContent = message;
  hint.classList.add('error');
  input.classList.add('is-invalid');

  // bawa field ke tengah viewport modal
  input.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// contoh validasi pada tombol "Checkout Sekarang"
const checkoutBtn = document.querySelector('#checkoutNowBtn'); // sesuaikan id-nya
const contactInput = document.querySelector('#contact');       // id input WA/email kamu

checkoutBtn?.addEventListener('click', (e) => {
  const val = (contactInput?.value || '').trim();

  if (!val) {
    e.preventDefault(); // jangan lanjut
    showFieldError(contactInput, 'Harap masukkan email atau nomor WhatsApp.');
    return;
  }

  // lanjut proses kalau valid...
});

 $("#waBtn").href = Flow.waLink(text);

