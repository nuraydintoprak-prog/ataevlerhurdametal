// Kurumsal/statik sayfaları (hakkımızda, iletişim, sss, hizmet bölgeleri, yasal, 404) üretir.
// Çalıştırma: node generate-pages.mjs
import { writeFileSync } from "node:fs";

const PHONE_DISPLAY = "0537 943 98 36";
const PHONE_TEL = "+905379439836";
const WA = "905379439836";
const DOMAIN = "https://ataevlerhurdametal.com.tr";
const BRAND = "Ataevler Hurda Metal";
const FAVICON = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2320262b' stroke-width='2'%3E%3Cpath d='M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' fill='%23c1440e'/%3E%3Cpath d='m9 12 2 2 4-4'/%3E%3C/svg%3E";

const NAV_ITEMS = [
  ["demir-celik-hurda.html", "Demir-Çelik Hurda"],
  ["bakir-hurda.html", "Bakır Hurda"],
  ["aluminyum-hurda.html", "Alüminyum Hurda"],
  ["kablo-hurda.html", "Kablo Hurda"],
  ["beyaz-esya-hurdasi.html", "Beyaz Eşya Hurdası"],
  ["klima-hurdasi.html", "Klima Hurdası"],
  ["aku-hurdasi.html", "Akü Hurdası"],
];

const DISTRICTS = ["Nilüfer", "Osmangazi", "Yıldırım", "Gemlik", "İnegöl", "Mudanya", "Karacabey", "Orhangazi", "Yenişehir", "Kestel", "Gürsu"];

const WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15l-1.3 4.9 5-1.3A10 10 0 1012 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3-1.3-5-4.4-5.1-4.6-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.2.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.9-.1 1.6z"/></svg>';
const TEL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.4 2.1L8 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c1 .3 1.9.6 2.9.7A2 2 0 0122 16.9z"/></svg>';
const PIN_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>';
const MAIL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></svg>';
const CLOCK_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>';

function navHtml(currentSlug) {
  return NAV_ITEMS.map(([href, label]) => {
    const active = href === `${currentSlug}.html` ? ' style="color:var(--orange-dark);font-weight:700"' : "";
    return `<a href="${href}"${active}>${label} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></a>`;
  }).join("");
}

function otherServicesFooterLinks() {
  return NAV_ITEMS.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("\n          ");
}

function shell({ slug, title, desc, breadcrumb, heroTitle, heroDesc, body, extraHead = "" }) {
  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title} | ${BRAND}</title>
<meta name="description" content="${desc}">
<meta name="author" content="${BRAND}">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#20262b">
<link rel="canonical" href="${DOMAIN}/${slug}.html">
<meta property="og:type" content="website">
<meta property="og:title" content="${title} | ${BRAND}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="${DOMAIN}/${slug}.html">
<meta property="og:image" content="${DOMAIN}/img/bursa-tesis.avif">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="${BRAND}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${FAVICON}">
<link rel="manifest" href="site.webmanifest">
<link rel="preload" href="fonts/poppins-latin-ext-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/poppins-latin-ext-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" as="image" href="img/ataevler-logo.avif" fetchpriority="high">
<link rel="stylesheet" href="css/style.css">
${extraHead}<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TSPPNVZX');</script>
<!-- End Google Tag Manager -->
<script src="https://anticlick.com.tr/anticlick.js"
  data-key="cf_live_531ba780982eda24a3a0574435221b3ea9da"
  data-campaign="yaz-kampanyasi"
  data-protect-forms="true"
  data-protect-gtag="true"
  async></script>
<link rel="preconnect" href="https://anticlick.com.tr">
<link rel="preconnect" href="https://www.googletagmanager.com">
</head>
<body>
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TSPPNVZX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
<header class="header">
  <div class="container nav">
    <a href="index.html" class="logo" aria-label="Ataevler Hurda Metal ana sayfa">
      <img src="img/ataevler-logo.avif" alt="Ataevler Hurda Metal" width="560" height="154">
    </a>
    <ul class="menu">
      <li><a href="index.html">Anasayfa</a></li>
      <li><a href="hakkimizda.html"${slug === "hakkimizda" ? ' class="active"' : ""}>Kurumsal</a></li>
      <li class="has-sub">
        <a href="hizmetlerimiz.html"${slug === "hizmetlerimiz" ? ' class="active"' : ""}>Hizmetlerimiz</a>
        <div class="dropdown">
          <a href="demir-celik-hurda.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="9" width="18" height="7" rx="1"/><path d="M3 9l3-5h12l3 5"/></svg> Demir-Çelik Hurda</a>
          <a href="bakir-hurda.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M9 9h6v6H9z"/></svg> Bakır Hurda</a>
          <a href="aluminyum-hurda.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12h16"/></svg> Alüminyum Hurda</a>
          <a href="kablo-hurda.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4v6a4 4 0 004 4h8a4 4 0 014 4v6"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="20" r="2"/></svg> Kablo Hurda</a>
          <a href="beyaz-esya-hurdasi.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="1.5"/><path d="M5 9h14"/><path d="M8 5v2M8 12v3"/></svg> Beyaz Eşya Hurdası</a>
          <a href="klima-hurdasi.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="6" width="20" height="8" rx="2"/><path d="M6 18v2M12 18v2M18 18v2"/></svg> Klima Hurdası</a>
          <a href="aku-hurdasi.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="8" width="16" height="10" rx="1"/><path d="M19 11h2v4h-2zM7 8V6h4v2"/></svg> Akü Hurdası</a>
        </div>
      </li>
      <li><a href="hizmet-bolgelerimiz.html"${slug === "hizmet-bolgelerimiz" ? ' class="active"' : ""}>Hizmet Bölgeleri</a></li>
      <li><a href="sss.html"${slug === "sss" ? ' class="active"' : ""}>S.S.S.</a></li>
      <li><a href="iletisim.html"${slug === "iletisim" ? ' class="active"' : ""}>İletişim</a></li>
    </ul>
    <div class="nav-cta">
      <a href="tel:${PHONE_TEL}" class="nav-phone">
        <span class="ico">${TEL_ICON}</span>
        <span><small>Hemen Arayın</small><b>${PHONE_DISPLAY}</b></span>
      </a>
      <button class="burger" aria-label="Menüyü aç/kapat"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="nav-overlay"></div>
<section class="phero"><div class="container">
  <div class="crumb"><a href="index.html">Anasayfa</a> <span>›</span> ${breadcrumb}</div>
  <h1>${heroTitle}</h1><p>${heroDesc}</p>
</div></section>
${body}
<footer class="footer">
  <div class="container">
    <div class="f-grid">
      <div>
        <span style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:1.15rem;color:#fff">
          <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="#c1440e" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
          Ataevler <span style="color:#c1440e">Hurda Metal</span>
        </span>
        <p>Nilüfer merkezli, Bursa'nın tüm ilçelerinde güvenilir metal hurda alımı yapıyoruz.</p>
        <div class="f-soc">
          <a href="https://wa.me/${WA}" aria-label="WhatsApp" target="_blank" rel="noopener">${WA_ICON}</a>
          <a href="tel:${PHONE_TEL}" aria-label="Telefon">${TEL_ICON}</a>
        </div>
      </div>
      <div>
        <h4>Hızlı Erişim</h4>
        <ul class="f-links">
          <li><a href="index.html">Anasayfa</a></li>
          <li><a href="hakkimizda.html">Hakkımızda</a></li>
          <li><a href="hizmetlerimiz.html">Hizmetlerimiz</a></li>
          <li><a href="sss.html">Sıkça Sorulan Sorular</a></li>
          <li><a href="iletisim.html">İletişim</a></li>
        </ul>
      </div>
      <div>
        <h4>Hizmetlerimiz</h4>
        <ul class="f-links">
          ${otherServicesFooterLinks()}
          <li><a href="hizmet-bolgelerimiz.html">Hizmet Bölgeleri</a></li>
        </ul>
      </div>
      <div>
        <h4>İletişim</h4>
        <ul class="f-contact">
          <li>${PIN_ICON}<span>Tahtalı Mah. Bursa Yolu Cad. No:92, Nilüfer / Bursa</span></li>
          <li>${TEL_ICON}<a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a></li>
          <li>${MAIL_ICON}<a href="mailto:info@ataevlerhurdametal.com.tr">info@ataevlerhurdametal.com.tr</a></li>
          <li>${CLOCK_ICON}<span>Her gün 08:00 - 20:00</span></li>
        </ul>
        <a href="iletisim.html" class="btn btn-primary" style="margin-top:8px">Ücretsiz Bilgi Al</a>
      </div>
    </div>
    <div class="f-bottom">
      <span>© <span id="yil">2026</span> ${BRAND} — Tüm hakları saklıdır.</span>
      <span class="f-legal">
        <a href="gizlilik-politikasi.html">Gizlilik Politikası</a>
        <a href="cerez-politikasi.html">Çerez Politikası</a>
        <a href="kullanim-sartlari.html">Kullanım Şartları</a>
      </span>
    </div>
  </div>
</footer>
<div class="fab">
  <a class="f-wa" href="https://wa.me/${WA}?text=Merhaba,%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener" aria-label="WhatsApp">${WA_ICON}</a>
  <a class="f-tel" href="tel:${PHONE_TEL}" aria-label="Telefon">${TEL_ICON}</a>
</div>
<div class="mbar">
  <a class="m-tel" href="tel:${PHONE_TEL}">${TEL_ICON} Hemen Ara</a>
  <a class="m-wa" href="https://wa.me/${WA}" target="_blank" rel="noopener">${WA_ICON} WhatsApp</a>
</div>
<div class="cookie-banner" role="dialog" aria-label="Çerez onayı">
  <p>Bu sitede, deneyiminizi iyileştirmek ve (etkinleştirildiğinde) reklam performansını ölçmek için çerezler kullanılır. Detaylar için <a href="cerez-politikasi.html">Çerez Politikası</a>'nı inceleyebilirsiniz.</p>
  <div class="cb-acts">
    <button type="button" class="cb-accept">Kabul Et</button>
    <button type="button" class="cb-reject">Reddet</button>
  </div>
</div>
<script src="js/main.js" defer></script>
</body>
</html>
`;
}

/* ===================== HİZMETLERİMİZ ===================== */
const servCards = [
  ["demir-celik-hurda.html", "bursa-demir-celik-hurdasi.avif", "Demir-Çelik Hurda", "İnşaat demiri, sac, profil, makine ve döküm hurdası; güncel piyasa fiyatından, yerinde tartım ile alınır.", '<rect x="3" y="9" width="18" height="7" rx="1"/><path d="M3 9l3-5h12l3 5"/>'],
  ["bakir-hurda.html", "bursa-bakir-hurdasi.avif", "Bakır Hurda", "Temiz bakır, kablo bakırı, radyatör ve sarı pirinç; türüne göre en yüksek güncel fiyattan değerlendirilir.", '<circle cx="12" cy="12" r="9"/><path d="M9 9h6v6H9z"/>'],
  ["aluminyum-hurda.html", "bursa-aluminyum-hurdasi.avif", "Alüminyum Hurda", "Doğrama profili, jant, döküm ve levha alüminyum; her ölçekte yerinde tartım ve anında ödeme ile alınır.", '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12h16"/>'],
  ["kablo-hurda.html", "bursa-kablo-hurdasi.avif", "Kablo Hurda", "Elektrik, enerji ve data kablolarınız içerdiği bakır/alüminyum oranına göre değerlendirilir.", '<path d="M4 4v6a4 4 0 004 4h8a4 4 0 014 4v6"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="20" r="2"/>'],
  ["beyaz-esya-hurdasi.html", "bursa-beyaz-esya.avif", "Beyaz Eşya Hurdası", "Buzdolabı, çamaşır makinesi, bulaşık makinesi ve fırınınızı adresinizden alıyor, kapıda ödemesini yapıyoruz.", '<rect x="5" y="2" width="14" height="20" rx="1.5"/><path d="M5 9h14"/><path d="M8 5v2M8 12v3"/>'],
  ["klima-hurdasi.html", "bursa-is-makinesi.avif", "Klima Hurdası", "Split, salon tipi ve VRF klimalarınızın iç/dış ünitesini söküp, bakır/alüminyum radyatör değerine göre alıyoruz.", '<rect x="2" y="6" width="20" height="8" rx="2"/><path d="M6 18v2M12 18v2M18 18v2"/>'],
  ["aku-hurdasi.html", "bursa-aku-hurdasi.avif", "Akü Hurdası", "Araç, iş makinesi ve UPS akülerinizi kurşun içeriğine göre değerlendirip yerinde nakit ödüyoruz.", '<rect x="3" y="8" width="16" height="10" rx="1"/><path d="M19 11h2v4h-2zM7 8V6h4v2"/>'],
];

const servGrid = servCards
  .map(
    ([href, img, title, desc, icon]) => `      <article class="serv-card reveal">
        <div class="serv-img">
          <img src="img/${img}" alt="Bursa ${title.toLowerCase()}" loading="lazy">
          <span class="serv-ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">${icon}</svg></span>
        </div>
        <div class="serv-body">
          <h3>${title}</h3>
          <p>${desc}</p>
          <a href="${href}" class="serv-link">Detaylı Bilgi <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a>
        </div>
      </article>`
  )
  .join("\n");

writeFileSync(
  "hizmetlerimiz.html",
  shell({
    slug: "hizmetlerimiz",
    title: "Hizmetlerimiz",
    desc: "Ataevler Hurda Metal - demir-çelik, bakır, alüminyum, kablo, beyaz eşya, klima ve akü hurdası alım hizmetlerimizin tamamı.",
    breadcrumb: "Hizmetlerimiz",
    heroTitle: "Hizmetlerimiz",
    heroDesc: "Bursa genelinde tüm hurda metal türlerinde profesyonel alım hizmeti veriyoruz. Aşağıdan hurda türünüzü seçip detaylı bilgi alabilirsiniz.",
    body: `<section class="sec"><div class="container"><div class="serv-grid">
${servGrid}
    </div></div></section>
<div class="container" style="padding-bottom:80px"><div class="cta-band reveal">
  <div><h2>Hurdanızı Değerlendirmeye Hazır mısınız?</h2><p>Güncel piyasa fiyatı ve yerinde tartım için bir telefon kadar yakınız.</p></div>
  <div class="acts">
    <a href="tel:${PHONE_TEL}" class="btn btn-primary btn-lg">${PHONE_DISPLAY}</a>
    <a href="https://wa.me/${WA}" target="_blank" rel="noopener" class="btn btn-ghost btn-lg">WhatsApp'tan Yaz</a>
  </div>
</div></div>`,
  }),
  "utf8"
);
console.log("yazıldı: hizmetlerimiz.html");

/* ===================== HAKKIMIZDA ===================== */
writeFileSync(
  "hakkimizda.html",
  shell({
    slug: "hakkimizda",
    title: "Hakkımızda",
    desc: "Ataevler Hurda Metal hakkında: Nilüfer merkezli, Bursa genelinde doğru tartım ve adil fiyatla hurda metal geri dönüşümü.",
    breadcrumb: "Hakkımızda",
    heroTitle: "Hakkımızda",
    heroDesc: "Nilüfer merkezli, Bursa'nın tüm ilçelerinde metal hurda geri dönüşümünde güvenilir çözüm ortağınızız.",
    body: `<section class="content"><div class="container content-grid">
      <div class="prose reveal">
        <p class="lead">Ataevler Hurda Metal olarak, Bursa'da bireysel ve kurumsal müşterilerimize demir-çelik, bakır, alüminyum, kablo, beyaz eşya, klima ve akü hurdası alım hizmeti sunuyoruz.</p>
        <h2>Kimiz?</h2>
        <p>Nilüfer merkezli ekibimiz, hurda metal geri dönüşümünü sadece bir alım-satım işi değil, çevreye ve şehrimize katkı olarak görüyor. Her hurda türünü doğru sınıflandırıp, yerinde hassas tartım ile güncel piyasa fiyatı üzerinden değerlendiriyoruz.</p>
        <h2>Neden Bizi Tercih Etmelisiniz?</h2>
        <div class="feat-grid" style="margin-top:10px">
          <div class="feat"><div class="fi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18M5 7h14M5 7L2 15a4 4 0 008 0L5 7zM19 7l-3 8a4 4 0 008 0l-3-8z"/></svg></div><h3>Şeffaf Tartım</h3><p>Hassas terazilerde, gözünüzün önünde tartım yapılır; sonuç birlikte teyit edilir.</p></div>
          <div class="feat"><div class="fi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg></div><h3>Anında Ödeme</h3><p>Tartım biter bitmez, anlaşılan tutarı yerinde nakit öderiz.</p></div>
          <div class="feat"><div class="fi"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg></div><h3>Hızlı Randevu</h3><p>Nilüfer ve çevresinde çoğunlukla aynı gün içinde adresinize geliyoruz.</p></div>
        </div>
        <h2>Misyonumuz</h2>
        <p>Hurda metalin çevreye zarar vermeden, katma değere dönüşmesine aracılık ederken; müşterilerimize dürüst, şeffaf ve hızlı bir hizmet deneyimi sunmak temel önceliğimizdir.</p>
        <div class="note-box"><b>Ücretsiz Değerlendirme:</b> Hurdanızı yerinde tartıp güncel piyasa fiyatı üzerinden ödeme yapıyoruz. Hemen arayın: <a href="tel:${PHONE_TEL}" style="color:var(--orange-dark);font-weight:700">${PHONE_DISPLAY}</a></div>
      </div>
      <aside class="sidebar">
        <div class="side-card"><h4>Hizmetlerimiz</h4><ul class="side-links">${navHtml("")}</ul></div>
        <div class="side-card side-cta">
          <h4>Ücretsiz Bilgi Alın</h4>
          <p>Hurdanızın türünü ve miktarını söyleyin, size güncel fiyatı hemen verelim.</p>
          <span class="ph">${PHONE_DISPLAY}</span>
          <a href="tel:${PHONE_TEL}" class="btn btn-primary btn-block">Hemen Ara</a>
          <a href="https://wa.me/${WA}" target="_blank" rel="noopener" class="btn btn-wa btn-block" style="margin-top:10px">${WA_ICON} WhatsApp</a>
        </div>
        <div class="side-card">
          <h4>Hizmet Bölgeleri</h4>
          <p class="muted" style="font-size:.92rem;margin:0">${DISTRICTS.join(", ")}'da hizmetinizdeyiz.</p>
        </div>
      </aside>
    </div></section>`,
  }),
  "utf8"
);
console.log("yazıldı: hakkimizda.html");

/* ===================== İLETİŞİM ===================== */
writeFileSync(
  "iletisim.html",
  shell({
    slug: "iletisim",
    title: "İletişim",
    desc: "Ataevler Hurda Metal iletişim bilgileri: telefon, WhatsApp, adres ve çalışma saatleri.",
    breadcrumb: "İletişim",
    heroTitle: "İletişim",
    heroDesc: "Sorularınız ve hurda değerlendirme talepleriniz için bize ulaşın, aynı gün içinde dönüş yapalım.",
    body: `<section class="sec"><div class="container cnt-grid">
      <div class="cnt-cards reveal">
        <div class="cnt-card"><div class="ci">${PIN_ICON.replace("currentColor", "#fff")}</div><div><h4>Adres</h4><p>Tahtalı Mah. Bursa Yolu Cad. No:92, Nilüfer / Bursa</p></div></div>
        <div class="cnt-card"><div class="ci">${TEL_ICON.replace("currentColor", "#fff")}</div><div><h4>Telefon</h4><a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a></div></div>
        <div class="cnt-card"><div class="ci">${WA_ICON}</div><div><h4>WhatsApp</h4><a href="https://wa.me/${WA}" target="_blank" rel="noopener">${PHONE_DISPLAY}</a></div></div>
        <div class="cnt-card"><div class="ci">${MAIL_ICON.replace("currentColor", "#fff")}</div><div><h4>E-posta</h4><a href="mailto:info@ataevlerhurdametal.com.tr">info@ataevlerhurdametal.com.tr</a></div></div>
        <div class="cnt-card"><div class="ci">${CLOCK_ICON.replace("currentColor", "#fff")}</div><div><h4>Çalışma Saatleri</h4><p>Her gün 08:00 - 20:00</p></div></div>
      </div>
      <div class="map-wrap reveal"><iframe src="https://maps.google.com/maps?q=Nil%C3%BCfer,%20Bursa&t=&z=13&ie=UTF8&iwloc=&output=embed" loading="lazy" title="Ataevler Hurda Metal konum haritası"></iframe></div>
    </div></section>
<section class="sec quote" style="padding-top:0" id="teklif">
  <div class="container quote-wrap">
    <div class="quote-info reveal">
      <span class="sec-tag">Ücretsiz Bilgi ve Randevu</span>
      <h2>Dakikalar İçinde Bilgi Alın</h2>
      <p>Formu doldurun, ekibimiz en kısa sürede sizi arasın veya doğrudan WhatsApp üzerinden bilgi alın.</p>
      <ul class="quote-list">
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Ücretsiz bilgi ve danışmanlık</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Yerinde hassas tartım</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Kapıda ödeme</li>
        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg> Bursa'nın tüm ilçelerine hizmet</li>
      </ul>
    </div>
    <div class="form-box reveal">
      <h3>Bilgi ve Randevu Formu</h3>
      <p class="fsub">Bilgilerinizi girin, talebiniz WhatsApp üzerinden bize ulaşsın.</p>
      <form data-wa>
        <div class="fgrid">
          <div class="field"><label>Ad Soyad *</label><input type="text" name="ad" placeholder="Adınız Soyadınız" required></div>
          <div class="field"><label>Telefon *</label><input type="tel" name="tel" placeholder="05__ ___ __ __" required></div>
        </div>
        <div class="field"><label>Adres / İlçe</label><input type="text" name="adres" placeholder="Örn: Nilüfer, Görükle"></div>
        <div class="field"><label>Mesajınız</label><textarea name="mesaj" placeholder="Hurda türü ve miktarı hakkında bilgi verin"></textarea></div>
        <button type="submit" class="btn btn-wa btn-block btn-lg">${WA_ICON} WhatsApp ile Bilgi İste</button>
        <p class="form-note">Bilgileriniz yalnızca size dönüş yapmak için kullanılır, üçüncü kişilerle paylaşılmaz.</p>
      </form>
    </div>
  </div>
</section>`,
  }),
  "utf8"
);
console.log("yazıldı: iletisim.html");

/* ===================== SSS ===================== */
const faqs = [
  ["Hangi hurda türlerini alıyorsunuz?", "Demir-çelik, bakır, alüminyum, kablo, beyaz eşya, klima ve akü hurdası başta olmak üzere tüm metal hurda türlerini değerlendiriyoruz."],
  ["Fiyatlar nasıl belirleniyor?", "Fiyatlar, hurdanın türüne, temizliğine ve o günkü güncel piyasa değerine göre belirlenir. Sabit bir fiyat listemiz yoktur; en güncel fiyatı telefonla veya WhatsApp'tan öğrenebilirsiniz."],
  ["Ödeme nasıl yapılıyor?", "Tartım işlemi tamamlanır tamamlanmaz, anlaşılan tutarı yerinde ve nakit olarak ödüyoruz."],
  ["Hangi ilçelere hizmet veriyorsunuz?", `Nilüfer merkezli olarak ${DISTRICTS.join(", ")} dahil Bursa'nın tüm ilçelerine hizmet veriyoruz.`],
  ["Randevu almam gerekiyor mu?", "Evet, bizi arayarak veya WhatsApp'tan yazarak hurdanızın tür ve miktarını iletmeniz yeterli; size en uygun gün ve saati birlikte planlıyoruz."],
  ["Küçük miktarlarda hurda alıyor musunuz?", "Evet, hem bireysel küçük miktarları hem de işletmelerin toplu hurda stoklarını değerlendiriyoruz."],
  ["Beyaz eşya ve klimanın sökümünü siz mi yapıyorsunuz?", "Evet, beyaz eşya ve klima sökümünü ekibimiz üstlenir; siz sadece yerini gösterin."],
  ["Tartı aletiniz onaylı mı?", "Tartım işlemleri hassas ve düzenli kontrol edilen terazilerle, sizin gözünüzün önünde yapılır."],
];

const faqHtml = faqs
  .map(
    ([q, a]) => `      <div class="faq-item">
        <button class="faq-q" type="button">${q}<span class="pm">+</span></button>
        <div class="faq-a"><p>${a}</p></div>
      </div>`
  )
  .join("\n");

writeFileSync(
  "sss.html",
  shell({
    slug: "sss",
    title: "Sıkça Sorulan Sorular",
    desc: "Ataevler Hurda Metal hakkında merak edilenler: fiyatlandırma, ödeme, hizmet bölgeleri ve randevu süreci.",
    breadcrumb: "S.S.S.",
    heroTitle: "Sıkça Sorulan Sorular",
    heroDesc: "Hurda alım sürecimiz hakkında en çok merak edilen soruları sizin için derledik.",
    body: `<section class="sec"><div class="container"><div class="faq">
${faqHtml}
    </div></div></section>`,
  }),
  "utf8"
);
console.log("yazıldı: sss.html");

/* ===================== HİZMET BÖLGELERİMİZ ===================== */
const regionCards = DISTRICTS.map(
  (d) => `      <a href="iletisim.html" class="region-card">${PIN_ICON}<span><b>${d}</b><small>Hurda alımı</small></span></a>`
).join("\n");

writeFileSync(
  "hizmet-bolgelerimiz.html",
  shell({
    slug: "hizmet-bolgelerimiz",
    title: "Hizmet Bölgelerimiz",
    desc: "Ataevler Hurda Metal - Nilüfer merkezli, Bursa'nın tüm ilçelerinde hurda metal alım hizmeti.",
    breadcrumb: "Hizmet Bölgeleri",
    heroTitle: "Hizmet Bölgelerimiz",
    heroDesc: "Nilüfer merkezli ekibimiz, Bursa'nın tüm ilçelerinde adrese servis ile hurda alımı yapıyor.",
    body: `<section class="sec"><div class="container">
      <div class="content-grid" style="grid-template-columns:1fr">
        <div class="prose reveal">
          <p class="lead">Bursa'nın neresinde olursanız olun, ekibimiz randevu sonrası adresinize gelip yerinde tartım yapar ve ödemeyi kapıda gerçekleştirir.</p>
          <h2>Hizmet Verdiğimiz İlçeler</h2>
          <p>Nilüfer merkezli olmakla birlikte, ${DISTRICTS.join(", ")} dahil Bursa'nın tüm ilçelerinden gelen hurda alım taleplerini değerlendiriyoruz. Uzak ilçelerde toplu/yüksek miktarlı hurdalar için öncelikli randevu ayarlıyoruz.</p>
        </div>
      </div>
      <div class="region-grid reveal" style="margin-top:30px">
${regionCards}
      </div>
    </div></section>
<div class="container" style="padding-bottom:80px"><div class="cta-band reveal">
  <div><h2>Bulunduğunuz İlçede Hizmet Var mı?</h2><p>Hemen arayın, size en yakın randevu saatini birlikte belirleyelim.</p></div>
  <div class="acts">
    <a href="tel:${PHONE_TEL}" class="btn btn-primary btn-lg">${PHONE_DISPLAY}</a>
    <a href="https://wa.me/${WA}" target="_blank" rel="noopener" class="btn btn-ghost btn-lg">WhatsApp'tan Yaz</a>
  </div>
</div></div>`,
  }),
  "utf8"
);
console.log("yazıldı: hizmet-bolgelerimiz.html");

/* ===================== YASAL SAYFALAR ===================== */
function legalPage(slug, title, sections) {
  const sectionsHtml = sections.map(([h, ps]) => `      <h2>${h}</h2>\n` + ps.map((p) => `      <p>${p}</p>`).join("\n")).join("\n");
  writeFileSync(
    `${slug}.html`,
    shell({
      slug,
      title,
      desc: `Ataevler Hurda Metal ${title.toLowerCase()} metni.`,
      breadcrumb: title,
      heroTitle: title,
      heroDesc: "",
      body: `<section class="legal-body"><div class="container">
      <p class="updated">Son güncelleme: Eylül 2026</p>
${sectionsHtml}
    </div></section>`,
    }),
    "utf8"
  );
  console.log(`yazıldı: ${slug}.html`);
}

legalPage("gizlilik-politikasi", "Gizlilik Politikası", [
  ["Genel", ["Ataevler Hurda Metal olarak, bu web sitesi üzerinden bizimle iletişime geçen ziyaretçilerin kişisel verilerinin güvenliğine önem veriyoruz. Bu metin, hangi bilgilerin toplandığını ve nasıl kullanıldığını açıklar."]],
  ["Toplanan Bilgiler", ["Web sitemizdeki iletişim formu veya WhatsApp üzerinden bize ilettiğiniz ad-soyad, telefon numarası, adres/ilçe ve mesaj içeriği gibi bilgiler yalnızca talebinize dönüş yapmak amacıyla işlenir."]],
  ["Bilgilerin Kullanımı", ["Paylaştığınız bilgiler yalnızca sizinle iletişime geçmek, randevu planlamak ve hizmet sunmak amacıyla kullanılır; üçüncü kişi veya kurumlarla paylaşılmaz, pazarlama amacıyla satılmaz."]],
  ["İletişim", [`Gizlilik politikamızla ilgili sorularınız için <a href="mailto:info@ataevlerhurdametal.com.tr">info@ataevlerhurdametal.com.tr</a> adresinden veya ${PHONE_DISPLAY} numaralı telefondan bize ulaşabilirsiniz.`]],
]);

legalPage("cerez-politikasi", "Çerez Politikası", [
  ["Çerezler Hakkında", ["Web sitemiz, deneyiminizi iyileştirmek ve (etkinleştirildiğinde) reklam performansını ölçmek amacıyla çerezler (cookie) kullanabilir."]],
  ["Çerez Türleri", ["Zorunlu çerezler sitenin temel işlevlerini (menü, form gönderimi) çalıştırmak için kullanılır. Tercihe bağlı çerezler ise yalnızca onayınız halinde, ziyaret istatistiklerini ölçmek için kullanılabilir."]],
  ["Tercihlerinizi Yönetme", ["Site ilk ziyaretinizde açılan çerez onay bandından tercihlerinizi 'Kabul Et' veya 'Reddet' seçenekleriyle belirleyebilir, tarayıcı ayarlarınızdan çerezleri istediğiniz zaman silebilirsiniz."]],
]);

legalPage("kullanim-sartlari", "Kullanım Şartları", [
  ["Kabul", ["Bu web sitesini kullanarak aşağıdaki kullanım şartlarını kabul etmiş sayılırsınız."]],
  ["Hizmet Kapsamı", ["Sitede yer alan bilgiler Ataevler Hurda Metal'in sunduğu hurda metal alım hizmetlerini tanıtım amaçlı içerir. Sitede yer alan fiyat aralıkları veya örnek ifadeler bağlayıcı bir teklif niteliği taşımaz; güncel fiyat telefon/WhatsApp üzerinden teyit edilir."]],
  ["Fikri Mülkiyet", ["Sitedeki metin, görsel ve tasarım unsurları Ataevler Hurda Metal'e aittir; izinsiz kopyalanamaz veya çoğaltılamaz."]],
  ["Değişiklikler", ["Bu kullanım şartları, önceden haber verilmeksizin güncellenebilir. Güncel sürüm her zaman bu sayfada yayınlanır."]],
]);

/* ===================== 404 ===================== */
writeFileSync(
  "404.html",
  shell({
    slug: "404",
    title: "Sayfa Bulunamadı",
    desc: "Aradığınız sayfa bulunamadı.",
    breadcrumb: "404",
    heroTitle: "404 — Sayfa Bulunamadı",
    heroDesc: "Aradığınız sayfa taşınmış veya kaldırılmış olabilir.",
    body: `<section class="sec"><div class="container center" style="padding:20px 0 60px">
      <p class="muted" style="margin-bottom:26px">Anasayfaya dönüp aradığınız hurda hizmetine oradan ulaşabilirsiniz.</p>
      <a href="index.html" class="btn btn-primary btn-lg">Anasayfaya Dön</a>
    </div></section>`,
  }),
  "utf8"
);
console.log("yazıldı: 404.html");
