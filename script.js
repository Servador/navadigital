// ====== Minimal Storefront (clean build) ======

// === Google Sheets API (Apps Script) ===
const SHEETS_URL = 'https://script.google.com/macros/s/AKfycby8vQGRFQewbQJKuzhYAEoX3YCmC6UZ-2q2RtLEEnLkqI4zxkPOyFZsnwA34nMP7Ezn/exec';
const SHEETS_KEY = 'RAHASIA_AMAN'; // sama dgn API_KEY di Apps Script

// --- Config ---
const WHATSAPP_NUMBER = "6287882925751";
const CURRENCY = (n) => new Intl.NumberFormat('id-ID', { style:'currency', currency:'IDR', maximumFractionDigits:0 }).format(n);
function generateUniqueCode(){ return Math.floor(101 + Math.random()*799); }

// Payment info (edit as needed)
const PAYMENT_INFO = {
  QRIS: { type:"qris", },
  GoPay: { type:"ewallet", account:"082129837460", holder:"Muhammad Faiz Rizqi Pram" },
  SeaBank:{ type:"bank", bank:"SeaBank", account:"901922960772", holder:"Muhammad Faiz Rizqi Pram" },
  BCA:   { type:"bank", bank:"BCA", account:"6050649502", holder:"Muhammad Faiz Rizqi Pram" },
  Jago:  { type:"bank", bank:"Bank Jago", account:"105686282051", holder:"Muhammad Faiz Rizqi Pram" },
};

// Catalog
const PRODUCTS = [
  { id:"web-design",  
    name:"Jasa Pembuatan Website", 
    from:249000,  cat:"Lainnya", kind:"one_time", 
    desc:"Desain profesional & kolaborasi.",
    img:"assets/servadorcorp-icon.png",
    packages:[{id:"web-basic", title:"Basic", desc:"Note: landing page,e-commerce,bisnis profile | website berdurasi 1 tahun", price:249000}
    ] },
  { id:"netflix",     
    name:"Netflix Premium",         
    from:15000,   cat:"Streaming", kind:"subscription", 
    desc:"Streaming film & series terbaru.",
    img:"assets/netflix.jpg", 
    packages:[{id:"nflx-1p", title:"Sharing 1P2U 1 Bulan", desc:"Note: akun sharing 1 profil diisi 2 user", price:15000},
              {id:"nflx-2p", title:"Sharing 1P1U 1 Bulan", desc:"Note: akun sharing 1 profil diisi 1 user", price:20000},
              {id:"nflx-3p", title:"Netflix Private", desc:"Note: Jatah 1 profile boleh login 2 device (hp/tv) - bebas ubah nama/foto profile - garansi anti limit", price:25000},
              {id:"nflx-4p", title:"Netflix Group", desc:"Note: Dapat 5 Profil", price:100000},
    ] },
  { id:"spotify",     
    name:"Spotify Premium",         
    from:16000,   cat:"Musik", kind:"subscription", 
    desc:"Musik tanpa iklan & audio jernih.",
    img:"assets/spotify.png",
    packages:[{id:"spt-std1", title:"Spotify INDPLAN FG 1 Bulan", desc:"Note: Full Garansi", price:16000},
              {id:"spt-std2", title:"Spotify INDPLAN FG 2 Bulan", desc:"Note: Full Garansi", price:28000}
    ] },
  { id:"youtube",     
    name:"YouTube Premium",         
    from:3000,    cat:"Video", kind:"subscription", 
    desc:"Tanpa iklan + YouTube Music.",
    img:"assets/yt.png",
    packages:[{id:"yt1", title:"Invite 1 Bulan", desc:"Note: isi sesuai kebutuhan", price:3000},
    ] }, 
  { id:"canva",       
    name:"Canva Pro",               
    from:1000,    cat:"Design", kind:"subscription", 
    desc:"Desain profesional & kolaborasi.",
    img:"assets/canva.jpg",
    packages:[{ id:"cv1", title:"Member 1 Bulan", desc:"Note : Member + Free Designer", price:1000},
              { id:"cv2", title:"Member 1 Tahun", desc:"Note : Member + Free Designer", price:10000},
              { id:"cv3", title:"Admin 1 Bulan", desc:"Note : Bisa Invite 20 Member", price:12000},
              { id:"cv4", title:"Owner 1 Bulan", desc:"Note : Bisa Invite 100 Member", price:10000}
    ] },
  { id:"vidio",       
    name:"Vidio",                   
    from:15000,   cat:"Video", kind:"subscription", 
    desc:"Streaming film & series terbaru.",
    img:"assets/vidio.png",
    packages:[{id:"vd1", title:"Sharing 1 Bulan", desc:"Note : All Device, Full Garansi", price:15000},
              {id:"vd2", title:"Private 1 Bulan", desc:"Note : All Device, Full Garansi", price:25000},
              {id:"vd3", title:"Private (TV Only) 1 Tahun", desc:"Note : TV Only ! , Garansi only back free 1 bulan", price:10000}
    ] },
  { id:"wetv",        
    name:"WeTV",                    
    from:10000,   cat:"Video", kind:"subscription", 
    desc:"Streaming film & series terbaru.",
    img:"assets/wetv2.jpg",
    packages:[{id:"wt1", title:"Sharing 1 Bulan", desc:"Note : Full Garansi", price:10000},
              {id:"wt2", title:"Private 1 Bulan", desc:"Note : Anti Limir, Full Garansi", price:25000} 
    ] },
  { id:"prime",       
    name:"Prime Video",             
    from:8000,    cat:"Streaming", kind:"subscription", 
    desc:"Film & series dari Amazon Prime Video.",
    img:"assets/prime2.jpg",
    packages:[{id:"pm1", title:"Sharing 1 Bulan", desc:"Note : 3 user Ada Limit tapi jarang, Full Garansi", price:8000},
              {id:"pm2", title:"Sharing 2 Bulan", desc:"Note : 3 use Ada Limit tapi jarang, Full Garansi", price:12000},
              {id:"pm3", title:"Privat 1 Bulan", desc:"Note : Akun Dari Penjual, Full Garansi", price:15000}
    ] },
  { id:"picsart",     
    name:"Picsart",                 
    from:8000,    cat:"Design", kind:"subscription", 
    desc:"Edit foto & desain kreatif.",
    img:"assets/picsart.jpg",
    packages:[{id:"pc1", title:"PICSART PRO 1 Bulan", desc:"Note : Full Garansi", price:8000}
    ] },
  { id:"disney",      
    name:"Disney+",                 
    from:20000,   cat:"Streaming", kind:"subscription", 
    desc:"Film & series Disney, Marvel, Star.",
    img:"assets/disney.jpg",
    packages:[{id:"ds1", title:"Disney PLAN 1 Bulan", desc:"Note : 10 User, Sharing : login memakai otp, login 1 device, akun dari penjual Full Garansi", price:20000},
              {id:"ds2", title:"Disney PREM 1 Bulan", desc:"Note : Nomor Dari Pembeli - All Provider - Full Garansi", price:90000} 
    ] },
  { id:"viu",         
    name:"Viu",                     
    from:5000,    cat:"Video", kind:"subscription", 
    desc:"Drama Asia & variety show.",
    img:"assets/viu.png",
    packages:[{id:"v1", title:"Viu Private 1 Bulan", desc:"Note : Anti Limit - Full Garansi", price:5000}
    ] },
  { id:"vpn",         
    name:"VPN",                     
    from:8000,    cat:"Lainnya", kind:"subscription", 
    desc:"Akses aman & privat.",
    img:"assets/VPN.png",
    packages:[{id:"vp1", title:"VPN EXPRESS 1 Bulan", desc:"Note : Private - Full Garansi", price:8000},
              {id:"vp2", title:"VPN HMA 1 Bulan", desc:"Note : Private - Full Garansi", price:8000},
              {id:"vp3", title:"VPN WINDSCRIB 1 Bulan", desc:"Note : Sharing- Full Garansi", price:14000},
              {id:"vp4", title:"VPN SURFSHARK 1 Bulan", desc:"Note : Private - Full Garansi", price:14000},
              {id:"vp5", title:"VPN NORD 1 Tahun", desc:"Note : Sharing - Full Garansi", price:30000}
    ] },
  { id:"imei",        
    name:"Unblock IMEI",            
    from:120000,  cat:"Lainnya", kind:"one_time", 
    desc:"Layanan buka IMEI (one-time).",
    img:"assets/imei.jpg",
    packages:[{id:"i1", title:"Unblock iMei 1 Bulan", desc:"Note : Bisa Semua Kartu - Proses 1-2 Jam - Full Garansi", price:120000},
              {id:"i2", title:"Unblock iMei 3 Bulan", desc:"Note : Bisa Semua Kartu - Proses 1-2 Jam - Full Garansi", price:250000}
    ] },
  { id:"robux",       
    name:"Robux",                   
    from:12000,   cat:"Gaming", kind:"credits", 
    desc:"Kredit Robux untuk Roblox.",
    img:"assets/robux.jpg",
    packages:[{id:"rb1", title:"100 Robux", desc:"Note : Robux akan masuk dalam waktu maksimal 5 hari (120 jam) melalui Gamepass. ( AFTER TAX )", price:12000},
              {id:"rb2", title:"500 Robux", desc:"Note : Robux akan masuk dalam waktu maksimal 5 hari (120 jam) melalui Gamepass. ( AFTER TAX )", price:60000},
              {id:"rb3", title:"1.000 Robux", desc:"Note : Robux akan masuk dalam waktu maksimal 5 hari (120 jam) melalui Gamepass. ( AFTER TAX )", price:120000},
              {id:"rb4", title:"5.000 Robux", desc:"Note : Robux akan masuk dalam waktu maksimal 5 hari (120 jam) melalui Gamepass. ( AFTER TAX )", price:600000},
              {id:"rb5", title:"10.000 Robux", desc:"Note : Robux akan masuk dalam waktu maksimal 5 hari (120 jam) melalui Gamepass. ( AFTER TAX )", price:1200000}
    ] },
  { id:"turnitin",    
    name:"Cek Turnitin",            
    from:5000,    cat:"Lainnya", kind:"one_time", 
    desc:"Pemeriksaan kemiripan dokumen.",
    img:"assets/turnitin.png",
    packages:[{id:"t1", title:"Cek Turnitin 3x", desc:"Note : Bisa Cek Kapan Saja Intinya 3x pengecekan", price:5000}
    ] },
  { id:"capcut",      
    name:"CapCut",                  
    from:5000,    cat:"Video", kind:"subscription", 
    desc:"Edit video mudah & cepat.",
    img:"assets/capcut.png",
    packages:[{id:"c1", title:"Capcut Sharing 1 Bulan", desc:"Note : Akun Seller - Full Garansi", price:5000},
              {id:"c2", title:"Capcut Private 1 Bulan", desc:"Note : Akun Seller - Full Garansi", price:12000}
] },
  { id:"zoom",      
    name:"Zoom Pro",                  
    from:8000,    cat:"Lainnya", kind:"subscription", 
    desc:"Perekaman Cloud (Cloud Recording).",
    img:"assets/zoom.jpg",
    packages:[{id:"z1", title:"Zoom Pro 1 Bulan", desc:"Note : Full Garansi", price:8000},
] },
];

const LOGO_BG = {
  "Streaming":"linear-gradient(135deg,#1f3ae0,#5468ff)",
  "Musik":"linear-gradient(135deg,#0ea5e9,#60a5fa)",
  "Video":"linear-gradient(135deg,#f59e0b,#f97316)",
  "Design":"linear-gradient(135deg,#8b5cf6,#ec4899)",
  "Gaming":"linear-gradient(135deg,#22c55e,#06b6d4)",
  "Lainnya":"linear-gradient(135deg,#64748b,#94a3b8)",
};

// Helpers
const $ = (sel, root=document) => root.querySelector(sel);
const $$ = (sel, root=document) => [...root.querySelectorAll(sel)];
const save = (k,v) => localStorage.setItem(k, JSON.stringify(v));
const load = (k, fallback=null) => { try{ return JSON.parse(localStorage.getItem(k)) ?? fallback }catch{ return fallback } };

function buildPackages(product){
  if(Array.isArray(product.packages) && product.packages.length) return product.packages;
  return [{ id:`${product.id}-custom`, title:"Paket", desc:"Note: Sesuaikan paket di script.js", price: product.from }];
}

// Rendering
function renderProducts(list){
  const grid = $("#productGrid"); if(!grid) return;
  grid.innerHTML = "";
  list.forEach(p => {
    const card = document.createElement("div");
    card.className = "card";
    const logo = document.createElement("div");
logo.className = "logo";
if (p.img) {
  const img = document.createElement("img");
  img.src = p.img;
  img.alt = p.name;
  img.loading = "lazy";
  logo.appendChild(img);
} else {
  // fallback: tetap huruf awal bila tidak ada gambar
  logo.textContent = p.name[0];
}

    const meta = document.createElement("div");
    meta.className = "meta";
    meta.innerHTML = `<h3>${p.name}</h3><p>${p.desc}</p>`;
    const right = document.createElement("div");
    right.style.display = "grid"; right.style.justifyItems = "start"; right.style.gap = "6px";
    right.innerHTML = `<div class="price">Mulai ${CURRENCY(p.from)}</div>`;
    const btn = document.createElement("button");
    btn.className = "btn primary"; btn.textContent = "Pilih Paket";
    btn.addEventListener("click", () => openPackageModal(p.id));
    right.appendChild(btn);
    card.append(logo, meta, right);
    grid.appendChild(card);
  });
}

function openPackageModal(productId){
  // 1) Ambil produk & siapkan modal
  const product = PRODUCTS.find(x => x.id === productId);
  if(!product) return;

  const modal = $("#packageModal");
  $("#modalTitle").textContent = product.name;
  $("#modalSubtitle").textContent = product.desc || "";
  const list = $("#packageList"); list.innerHTML = "";

  // 2) Build paket
  const pkgs = buildPackages(product);
  pkgs.forEach((pkg, i) => {
    const item = document.createElement("label");
    item.className = "package-item";
    item.innerHTML = `
      <div class="left">
        <input type="radio" name="pkg" value="${pkg.id}" ${i===0 ? "checked" : ""}>
        <div>
          <div class="title">${pkg.title}</div>
          <div class="desc">${pkg.desc || "Note"}</div>
        </div>
      </div>
      <div class="price">${CURRENCY(pkg.price)}</div>
    `;
    list.appendChild(item);
    item.addEventListener("click", ()=>{
      list.querySelectorAll(".package-item").forEach(el=>el.classList.remove("is-selected"));
      item.classList.add("is-selected");
      item.querySelector("input").checked = true;
    });
  });
  const first = list.querySelector(".package-item"); if(first) first.classList.add("is-selected");

  // 3) Klik "Lanjut Checkout" → buat order + simpan
  $("#toCheckoutBtn").onclick = () => {
    const selected = $('input[name="pkg"]:checked', list)?.value;
    const picked = pkgs.find(x => x.id === selected);
    if(!picked) return;

    const kodeUnik = Math.floor(101 + Math.random() * 799);
    const order = {
      id: "NV" + Date.now(),
      productId: product.id,
      productName: product.name,
      category: product.cat,
      packageId: picked.id,
      packageTitle: picked.title,
      basePrice: picked.price,
      uniqueCode: kodeUnik,
      total: picked.price + kodeUnik,
      contact: "",
      method: "QRIS",
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 5 * 60 * 1000).toISOString()
    };

    saveOrder(order);
    location.href = "checkout.html";
  };

  // buka modal
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add('is-modal-open');
}


// Checkout
function loadCheckout(){
  const order = load("order"); if(!order){ location.href="./"; return }
  $("#orderSummary").innerHTML = `
    <div class="row between">
      <div>
        <h3 style="margin:.2rem 0 .2rem">${order.productName}</h3>
        <div class="tiny muted">Paket: ${order.packageTitle}</div>
      </div>
      <div class="price">${CURRENCY(order.basePrice)}</div>
    </div>
  `;

  // logika pilih metode (klik kartu -> radio checked)
  const methods = $$(".method-item");
  if(methods.length){
    methods[0].classList.add("is-selected");
    methods.forEach(card=>{
      card.addEventListener("click", ()=>{
        methods.forEach(c=>c.classList.remove("is-selected"));
        card.classList.add("is-selected");
        const input = card.querySelector("input"); if(input){ input.checked = true; }
      });
    });
  }

  $('#buyerForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    const contact = $("#contactInput").value.trim();
    if(!contact){
      const el=$("#contactInput"); el.classList.add("input-error");
      setTimeout(()=>el.classList.remove("input-error"), 1200);
      return;
    }
    order.contact = contact;
    order.note = $("#noteInput").value.trim();
    const pickedMethod = document.querySelector('input[name="method"]:checked')?.value || 'QRIS';
    order.method = pickedMethod;
    saveOrder(order);
    location.href = "pay.html";
  });
}

// Pay
function loadPay(){
  const order = load("order"); if(!order){ location.href="./"; return }

  // hitung total = base + kode unik (fallback jika belum tersimpan)
  const total = (order.total != null)
    ? order.total
    : (order.basePrice || 0) + (order.uniqueCode || 0);

  // ringkasan atas (tampilkan Harga, Kode Unik, Total)
  $("#paySummary").innerHTML = `
    <div class="row between">
      <div class="summary-top">
        <h3 style="margin:.2rem 0 .2rem">${order.productName}</h3>
        <div class="tiny muted">Paket: ${order.packageTitle}</div>
        <div class="tiny">Kontak: ${order.contact}</div>
        <div class="bill-mini">
          <div class="cell"><span class="tag">Harga</span><strong>${CURRENCY(order.basePrice || 0)}</strong></div>
          <div class="cell"><span class="tag">Kode Unik</span><strong>${order.uniqueCode || 0}</strong></div>
          <div class="cell"><span class="tag">Total</span><strong>${CURRENCY(total)}</strong></div>
        </div>
      </div>
      <div class="price">
        ${CURRENCY(total)}
        <div class="tiny muted" style="text-align:right">Metode: ${order.method}</div>
      </div>
    </div>
  `;

  // detail metode (blok di atas nomor/rek/atas nama/nominal)
  renderMethodDetail(order);

  // QR hanya untuk QRIS (elemen ada di pay.html)
  const qrBox = document.getElementById("qrisSection") || document.querySelector('.pay-box .qris-box')?.parentElement;
  if(qrBox){ qrBox.style.display = (order.method === 'QRIS') ? "block" : "none"; }

  // countdown (opsional)
  // setelah render ringkasan & method detail...
const timerEl = document.getElementById("timer");
const paidBtn = document.getElementById("paidBtn");

// kalau order belum punya expiresAt (misal order lama), buat sekarang
if(!order.expiresAt){
  order.expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  saveOrder(order);
}

function fmt(t){
  const m = Math.floor(t/60), s = t%60;
  return String(m).padStart(2,'0') + ":" + String(s).padStart(2,'0');
}

function updateTimer(){
  const deadline = new Date(order.expiresAt).getTime();
  const now = Date.now();
  let remain = Math.max(0, Math.floor((deadline - now)/1000));

  if(timerEl){
    timerEl.textContent = remain > 0 ? `Waktu tersisa: ${fmt(remain)}` : "Waktu habis. Silakan buat order baru.";
  }
  if(remain <= 0){
    // matikan tombol selesai kalau habis
    if(paidBtn){
      paidBtn.disabled = true;
      paidBtn.classList.add("disabled");
      paidBtn.textContent = "Selesai (expired)";
    }
    clearInterval(tick);
  }
}

const tick = setInterval(updateTimer, 1000);
updateTimer(); // panggil sekali di awal


// --- di dalam loadPay() ---
let isSubmitting = false;

document.querySelectorAll("#paidBtn").forEach(btn=>{
  btn.addEventListener("click", async ()=>{
    if (isSubmitting) return;          // anti double
    isSubmitting = true;

    const fileEl = document.getElementById("proof");
    const refEl  = document.getElementById("refInput");
    const note   = (refEl?.value || "").trim();

    // UI: loading
    const originalHTML = btn.innerHTML;
    btn.disabled = true;
    btn.classList.add("disabled");
    btn.innerHTML = `<span class="spinner" aria-hidden="true"></span><span>Mengunggah…</span>`;

    // siapkan meta order
    order.paidAt = new Date().toISOString();
    order.status = 'paid';
    order.total  = total;

    try{
      if (fileEl?.files?.[0]) {
        // 1) compress (≤1200px, kualitas 0.75)
        const compressedBlob = await compressImage(fileEl.files[0], 1200, 0.75);

        // 2) konversi ke base64
        const base64 = await blobToBase64(compressedBlob);

        // 3) timeout supaya ga ngegantung
        const controller = new AbortController();
        const to = setTimeout(()=>controller.abort(), 25000); // 25s

        // 4) kirim ke Apps Script
        const body = new URLSearchParams();
        body.append("key", SHEETS_KEY);
        body.append("action", "upload_proof");
        body.append("mimeType", compressedBlob.type || "image/jpeg");
        body.append("filename", fileEl.files[0].name || `proof-${order.id}.jpg`);
        body.append("order", JSON.stringify(order));
        body.append("note", note);
        body.append("data", base64);

        await fetch(SHEETS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
          signal: controller.signal
        }).finally(()=>clearTimeout(to));
      }

      else {
  // Kirim notifikasi teks saja (tanpa gambar)
  const controller = new AbortController();
  const to = setTimeout(()=>controller.abort(), 15000);

  const body = new URLSearchParams();
  body.append("key", SHEETS_KEY);
  body.append("action", "notify_payment");   // <— aksi baru
  body.append("order", JSON.stringify(order));
  body.append("note", note);

  await fetch(SHEETS_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    signal: controller.signal
  }).finally(()=>clearTimeout(to));
}

      // simpan status ke localStorage & lanjut
      saveOrder(order);
      location.href = "success.html";
    }catch(err){
      console.warn("Upload gagal:", err);
      alert("Upload bukti gagal, tapi pesanan tetap diproses. Kamu bisa kirim bukti via WA admin.");
      saveOrder(order);
      location.href = "success.html";
    }finally{
      // kalau halaman belum pindah, pulihkan tombol
      btn.innerHTML = originalHTML;
      btn.classList.remove("disabled");
      btn.disabled = false;
      isSubmitting = false;
    }
  });
});

// --- helper: compress + base64 ---
async function compressImage(file, maxW=1200, quality=0.75){
  // jika file sudah kecil (< 400KB), langsung pakai
  if (file.size <= 400 * 1024) return file;

  const img = await new Promise((res, rej)=>{
    const i = new Image();
    i.onload = ()=>res(i);
    i.onerror = rej;
    i.src = URL.createObjectURL(file);
  });

  // hitung dimensi baru
  let { width, height } = img;
  if (width > maxW){
    height = Math.round(height * (maxW / width));
    width = maxW;
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  ctx.drawImage(img, 0, 0, width, height);

  const blob = await new Promise((res)=>canvas.toBlob(res, "image/jpeg", quality));
  return blob || file; // fallback kalau toBlob gagal
}

function blobToBase64(blob){
  return new Promise((resolve, reject)=>{
    const r = new FileReader();
    r.onload = () => resolve(String(r.result).split(",")[1]); // buang header dataURL
    r.onerror = reject;
    r.readAsDataURL(blob);
  });
}
}


// Success (Invoice)
function loadSuccess(){
  const order = load("order"); 
  if(!order){ location.href="./"; return }
  
  const created = new Date(order.createdAt).toLocaleString("id-ID", {
  timeZone: "Asia/Jakarta",
  hour12: false
});

  // hitung total (base + kode unik)
  const total = (order.basePrice || 0) + (order.uniqueCode || 0);

  $("#successSummary").innerHTML = `
    <div class="invoice" style="text-align:left">
      <h2>Invoice</h2>
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Tanggal:</strong> ${created}</p>
      <hr>
      <p><strong>Produk:</strong> ${order.productName}</p>
      <p><strong>Paket:</strong> ${order.packageTitle}</p>
      <p><strong>Kontak:</strong> ${order.contact}</p>
      <hr>
      <div class="row between">
        <div><strong>Total</strong></div>
        <div class="price">${CURRENCY(total)}</div>
      </div>
    </div>
  `;

  const msg = encodeURIComponent(
    `Halo Admin NavaDigital, saya sudah membayar pesanan:\n\n`+
    `Order ID: ${order.id}\n`+
    `Produk: ${order.productName}\n`+
    `Paket: ${order.packageTitle}\n`+
    `Total: ${CURRENCY(total)}\n`+
    `Kontak: ${order.contact}\n`+
    `Waktu: ${created}\n\nMohon diproses ya. Terima kasih!`
  );
  $("#waShareBtn").href = `https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`;
}


// Method detail
function renderMethodDetail(order){
  const box = document.getElementById("methodDetail"); if(!box) return;

  const total = (order.total != null)
    ? order.total
    : (order.basePrice || 0) + (order.uniqueCode || 0);

  const info = PAYMENT_INFO[order.method] || {};
  if(info.type === "bank"){
    box.innerHTML = `
      <h3>Transfer Bank (${info.bank})</h3>
      <div class="kv">
        <div class="k">No. Rekening</div><div class="v">${info.account}</div>
        <div class="k">Atas Nama</div><div class="v">${info.holder}</div>
        <div class="k">Nominal</div><div class="v price">${CURRENCY(total)}</div>
      </div>
      <p class="tiny muted">Mohon transfer sesuai nominal hingga 3 digit terakhir.</p>
    `;
  } else if(info.type === "ewallet"){
    box.innerHTML = `
      <h3>Transfer E-Wallet (${order.method})</h3>
      <div class="kv">
        <div class="k">Nomor</div><div class="v">${info.account}</div>
        <div class="k">Nama</div><div class="v">${info.holder}</div>
        <div class="k">Nominal</div><div class="v price">${CURRENCY(total)}</div>
      </div>
      <p class="tiny muted">Mohon transfer sesuai nominal hingga 3 digit terakhir.</p>
    `;
  } else {
    // QRIS: tetap tampilkan nominal di blok info, QR ditampilkan di section khusus
    box.innerHTML = `
      <h3>QRIS</h3>
      <div class="kv">
        <div class="k">Nominal</div><div class="v price">${CURRENCY(total)}</div>
      </div>
      <p class="tiny muted">Scan QR di bawah dengan aplikasi pembayaran kamu.</p>
    `;
  }
}

// Orders history
function saveOrder(order){
  // simpan lokal (cache)
  save("order", order);
  const all = load("orders", []);
  const i = all.findIndex(o => o.id === order.id);
  if(i >= 0) all[i] = order; else all.push(order);
  save("orders", all);

  // sinkron ke Apps Script (best-effort, tanpa preflight)
  try{
    const body = `key=${encodeURIComponent(SHEETS_KEY)}&payload=${encodeURIComponent(JSON.stringify(order))}`;
    fetch(SHEETS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body
    }).catch(()=>{});
  }catch(e){ console.warn('Sync Sheets gagal', e); }
}

// === Promo slider (auto-rotate + dots) ===
function initPromo(){
  const rail  = document.querySelector('.promo-rail');
  if(!rail) return;
  const track = rail.querySelector('[data-promos]');
  const dots  = [...rail.querySelectorAll('.dot')];
  if(!track || !dots.length) return;

  let i = 0;
  const n = track.children.length;

  const go = (to) => {
    i = (to + n) % n;
    track.scrollTo({ left: track.clientWidth * i, behavior: 'smooth' });
    dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));
  };

  // auto-rotate
  let timer = setInterval(() => go(i + 1), 4000);
  const stop  = () => clearInterval(timer);
  const start = () => timer = setInterval(() => go(i + 1), 4000);

  // klik dots
  dots.forEach((d, idx) => d.addEventListener('click', () => { go(idx); stop(); start(); }));

  // sinkron saat user swipe
  track.addEventListener('scroll', () => {
    const cur = Math.round(track.scrollLeft / track.clientWidth);
    if (cur !== i) {
      i = cur;
      dots.forEach((d, idx) => d.classList.toggle('is-active', idx === i));
    }
  });

  rail.addEventListener('mouseenter', stop);
  rail.addEventListener('mouseleave', start);
  window.addEventListener('resize', () => go(i));
}

// --- kategori helper untuk produk ---
function getCategory(p){
  // pakai properti yang ada dulu
  const c = p.cat || p.category || p.kind;
  if (c) return c;
  // fallback berdasar nama
  const n = (p.name || "").toLowerCase();
  if (/spotify|music|yt ?music|apple music/.test(n)) return "Musik";
  if (/netflix|viu|vidio|wetv|prime|disney|hbo|video|youtube/.test(n)) return "Streaming";
  if (/canva|capcut|picsart|adobe|design|logo|edit/.test(n)) return "Design";
  if (/robux|game|steam|mlbb|genshin|pubg|valorant|voucher|psn/.test(n)) return "Gaming";
  return "Lainnya";
}
function bindFilters(){
  const tabs = Array.from(document.querySelectorAll('.tabs .tab'));
  if (!tabs.length) return;

  const setActive = (el) => {
    tabs.forEach(t => {
      const on = t === el;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const f = (tab.dataset.filter || 'all').toLowerCase();
      setActive(tab);

      const list = (f === 'all')
        ? PRODUCTS
        : PRODUCTS.filter(p => String(p.cat || '').toLowerCase() === f);

      renderProducts(list);
      tab.blur();
      document.getElementById('productGrid')?.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
}
// Router
function closeModal(){
  const modal = document.getElementById("packageModal");
  if (!modal) return;
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("is-modal-open");   // <- penting!
}

function init(){
  // close modal binding (biarkan)
  $$("#packageModal [data-close]").forEach(el => el.addEventListener("click", closeModal));
  document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

  // Pastikan semua cara penutupan lewat closeModal()
(function(){
  const modal = document.getElementById("packageModal");
  if(!modal) return;

  // klik tombol [data-close] atau klik area gelap/backdrop
  modal.addEventListener("click", (e)=>{
    if (e.target === modal || e.target.closest("[data-close]")) {
      closeModal();
    }
  });

  // tekan ESC
  document.addEventListener("keydown", (e)=>{
    if (e.key === "Escape" && modal.getAttribute("aria-hidden") === "false") {
      closeModal();
    }
  });
})();

  const page = document.body.dataset.page;
  if(page === "home"){
    renderProducts(PRODUCTS);
    bindFilters();      // <— WAJIB: pasang listener kategori
    initPromo();        // slider + dots
  } else if(page === "checkout"){
    loadCheckout();
  } else if(page === "pay"){
    loadPay();
  } else if(page === "success"){
    loadSuccess();
  } else if(page === "cek"){
    loadCek();
  }
}
document.addEventListener("DOMContentLoaded", init);


async function loadCek(){
  const form = document.getElementById("cekForm");
  const input = document.getElementById("cekInput");
  const out   = document.getElementById("cekResult");
  if(!form) return;

  const urlId = new URLSearchParams(location.search).get('id');
  if(urlId){ input.value = urlId; }

  form.addEventListener("submit", async (e)=>{
    e.preventDefault();
    out.style.display = "block";                 // <- pastikan box tampil

    const id = input.value.trim();
    if(!id){ out.innerHTML = '<p class="muted">Masukkan Order ID.</p>'; return; }

    out.innerHTML = '<p class="muted">Mencari…</p>';

    // 1) Coba ambil dari Google Sheets (timeout 8 dtk)
    let o = null;
    try{
      const controller = new AbortController();
      const timer = setTimeout(()=>controller.abort(), 8000);
      const r = await fetch(`${SHEETS_URL}?id=${encodeURIComponent(id)}`, {
        signal: controller.signal,
        cache: "no-store"
      });
      clearTimeout(timer);
      if(r.ok){
        const data = await r.json();
        o = data?.results?.[0] || null;
         suppress_notify: "1"
      }
    }catch(err){ console.warn('Sheets fetch error/timeout:', err); }

    // 2) Kalau belum dapat → fallback localStorage
    if(!o){
      o = (load("orders", []) || []).find(x => String(x.id) === id) || null;
    }

    // 3) Render hasil (jangan biarkan "Mencari…" menggantung)
    out.innerHTML = o ? renderCek(o) : '<p class="muted">Order tidak ditemukan.</p>';
  });

  if(urlId){ form.dispatchEvent(new Event('submit')); }
}

function renderCek(o){
  const total = (Number(o.total)|| (Number(o.basePrice)||0) + (Number(o.uniqueCode)||0));
  return `
    <div class="checkout-card" style="text-align:left">
      <div class="row between">
        <div>
          <div class="tiny muted">Order ID</div>
          <strong>${o.id}</strong>
        </div>
        <div>
          <div class="tiny muted">Status</div>
          <span class="badge">${(o.status||'pending')}</span>
        </div>
      </div>
      <hr>
      <p><strong>Produk:</strong> ${o.productName||'-'}</p>
      <p><strong>Paket:</strong> ${o.packageTitle||'-'}</p>
      <p><strong>Metode:</strong> ${o.method||'-'}</p>
      <p><strong>Kontak:</strong> ${o.contact||'-'}</p>
      <hr>
      <div class="row between">
        <div><strong>Total</strong></div>
        <div class="price">${CURRENCY(total)}</div>
      </div>
    </div>
  `;
}
