// Kategori sayfalarını (hurda türleri) tek şablondan üretir.
// Çalıştırma: node generate-categories.mjs
import { writeFileSync } from "node:fs";

const PHONE_DISPLAY = "0537 943 98 36";
const PHONE_TEL = "+905379439836";
const WA = "905379439836";
const DOMAIN = "https://ataevlerhurdametal.com.tr";
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

const ICONS = {
  "demir-celik-hurda.html": '<rect x="3" y="9" width="18" height="7" rx="1"/><path d="M3 9l3-5h12l3 5"/>',
  "bakir-hurda.html": '<circle cx="12" cy="12" r="9"/><path d="M9 9h6v6H9z"/>',
  "aluminyum-hurda.html": '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M4 12h16"/>',
  "kablo-hurda.html": '<path d="M4 4v6a4 4 0 004 4h8a4 4 0 014 4v6"/><circle cx="4" cy="4" r="2"/><circle cx="20" cy="20" r="2"/>',
  "beyaz-esya-hurdasi.html": '<rect x="5" y="2" width="14" height="20" rx="1.5"/><path d="M5 9h14"/><path d="M8 5v2M8 12v3"/>',
  "klima-hurdasi.html": '<rect x="2" y="6" width="20" height="8" rx="2"/><path d="M6 18v2M12 18v2M18 18v2"/>',
  "aku-hurdasi.html": '<rect x="3" y="8" width="16" height="10" rx="1"/><path d="M19 11h2v4h-2zM7 8V6h4v2"/>',
};

const CATS = [
  {
    slug: "demir-celik-hurda",
    title: "Demir-Çelik Hurda",
    metaTitle: "Bursa Demir-Çelik Hurda Alımı",
    desc: "İnşaat demiri, sac, profil, makine ve döküm hurdanızı Nilüfer merkezli ekibimiz yerinde tartıp güncel piyasa fiyatı üzerinden değerlendiriyor.",
    img: "bursa-demir-celik-hurdasi.avif",
    lead: "Demir-çelik, hurda piyasasının en yüksek hacimli kalemidir; doğru tasnif ve doğru tartım burada da fark yaratır. Ataevler Hurda Metal olarak demir-çelik hurdanızı yerinde inceleyip türüne göre en adil fiyatı sunuyoruz.",
    types: [
      ["İnşaat demiri:", "Nervürlü beton demiri, hurda inşaat çeliği."],
      ["Sac ve profil:", "Galvanizli/galvanizsiz sac, kutu profil, lama."],
      ["Döküm parçalar:", "Makine gövdesi, döküm demir aksam."],
      ["Makine ve şasi hurdası:", "Hurdaya ayrılmış iş makinesi ve araç şasisi."],
      ["Sanayi artığı çelik:", "Üretim fazlası ve talaş çelik parçalar."],
    ],
    whyTitle: "Neden Ağırlığa Göre Doğru Fiyat Önemli?",
    whyText: "Demir-çelik hurdasının kalınlığı, temizliği (boya/yağ oranı) ve türü fiyatı etkiler. Telefonda hurdanızı tarif edin, size en güncel fiyat aralığını hemen verelim.",
  },
  {
    slug: "bakir-hurda",
    title: "Bakır Hurda",
    metaTitle: "Bursa Bakır Hurda Alımı",
    desc: "Temiz bakır, kablo bakırı, radyatör ve sarı pirinç hurdanızı Nilüfer merkezli ekibimiz en yüksek güncel fiyattan değerlendiriyor.",
    img: "bursa-bakir-hurdasi.avif",
    lead: "Bakır hurdası piyasada en yüksek değere sahip metallerden biridir; bu yüzden doğru sınıflandırma ve doğru tartım büyük fark yaratır. Ataevler Hurda Metal olarak bakır hurdanızı yerinde inceleyip türüne göre en adil fiyatı sunuyoruz.",
    types: [
      ["Temiz bakır (1. hamur):", "Boru, levha ve tel bakır artıkları."],
      ["Kablo bakırı:", "İzoleli veya soyulmuş elektrik kablosu bakırı."],
      ["Radyatör bakırı:", "Bakır-pirinç radyatör petekleri."],
      ["Sarı pirinç ve bronz:", "Musluk, vana, dişli ve döküm pirinç parçalar."],
      ["Motor sargısı:", "Elektrik motoru ve trafo bakır sargıları."],
    ],
    whyTitle: "Neden Türüne Göre Ayrı Fiyat?",
    whyText: "Bakırın saflık oranı ve alaşım durumu fiyatı doğrudan etkiler. Temiz 1. hamur bakır en yüksek fiyattan alınırken, karışık veya izoleli kablo bakırı farklı bir tarifeden değerlendirilir.",
  },
  {
    slug: "aluminyum-hurda",
    title: "Alüminyum Hurda",
    metaTitle: "Bursa Alüminyum Hurda Alımı",
    desc: "Doğrama profili, jant, döküm ve levha alüminyum hurdanızı Nilüfer merkezli ekibimiz her ölçekte yerinde tartıp değerlendiriyor.",
    img: "bursa-aluminyum-hurdasi.avif",
    lead: "Alüminyum, hafifliği ve geri dönüştürülebilirliği sayesinde en çok aranan hurda metallerden biri. Ataevler Hurda Metal olarak alüminyum hurdanızı türüne göre ayırıp en adil fiyattan alıyoruz.",
    types: [
      ["Doğrama profili:", "PVC/alüminyum pencere-kapı doğrama artığı."],
      ["Jant:", "Araç alüminyum jantları."],
      ["Döküm alüminyum:", "Motor bloğu, döküm parçalar."],
      ["Levha/sac alüminyum:", "Temiz alüminyum levha ve sac artığı."],
      ["Alüminyum talaş:", "Sanayi üretim talaşı ve kırpıntı."],
    ],
    whyTitle: "Doğru Tasnif, Doğru Fiyat",
    whyText: "Alüminyumun alaşım oranı (saf, döküm, profil) fiyatı belirler. Hurdanızın türünü bildirin, size en güncel fiyat aralığını hemen verelim.",
  },
  {
    slug: "kablo-hurda",
    title: "Kablo Hurda",
    metaTitle: "Bursa Kablo Hurda Alımı",
    desc: "Elektrik, enerji ve data kablolarınızı içerdiği bakır/alüminyum oranına göre değerlendiriyor, Nilüfer merkezli ekibimizle adresinize geliyoruz.",
    img: "bursa-kablo-hurdasi.avif",
    lead: "Kablo hurdası, içerdiği bakır veya alüminyum oranına göre değerlendirilir. Ataevler Hurda Metal olarak her tür ve ölçekte kablo hurdanızı yerinde tartıp adil fiyattan alıyoruz.",
    types: [
      ["Elektrik tesisat kablosu:", "NYA, NYM ve benzeri bina içi kablolar."],
      ["Enerji nakil kablosu:", "Orta/yüksek gerilim enerji kabloları."],
      ["Data/network kablosu:", "Bakır özlü data ve telefon kabloları."],
      ["Otomotiv kablo demeti:", "Araç kablo demetleri (harness)."],
      ["İzoleli/soyulmuş kablo:", "Her iki türü de kabul ediyoruz."],
    ],
    whyTitle: "Bakır Oranına Göre Fiyatlandırma",
    whyText: "Kablonun izole/soyulmuş olması ve bakır çapı fiyatı belirler. Büyük miktarlarda yerinde soyma/ayırma hizmeti de sunuyoruz.",
  },
  {
    slug: "beyaz-esya-hurdasi",
    title: "Beyaz Eşya Hurdası",
    metaTitle: "Bursa Beyaz Eşya Hurdası Alımı",
    desc: "Buzdolabı, çamaşır makinesi, bulaşık makinesi ve fırınınızı adresinizden alıyor, Nilüfer merkezli ekibimizle kapıda ödeme yapıyoruz.",
    img: "bursa-beyaz-esya.avif",
    lead: "Ömrünü tamamlamış beyaz eşyanız evinizde/işyerinizde yer kaplamasın. Ataevler Hurda Metal olarak beyaz eşyanızı adresinizden alıp, içerdiği metal (çelik, bakır, alüminyum) değerine göre öderiz.",
    types: [
      ["Buzdolabı:", "Her boy ve model buzdolabı."],
      ["Çamaşır/bulaşık makinesi:", "Arızalı veya kullanılamaz durumdakiler dahil."],
      ["Fırın ve ocak:", "Ankastre ve serbest duran modeller."],
      ["Kurutma makinesi:", "Her marka ve model."],
      ["Diğer küçük ev aletleri:", "Toplu miktarlarda değerlendirilir."],
    ],
    whyTitle: "Neden Beyaz Eşyanızı Bize Verin?",
    whyText: "Beyaz eşyanın içindeki motor, bakır sargı ve çelik gövde ayrı ayrı değerlendirilir. Söküm ve taşıma bize ait, siz sadece yerini gösterin.",
  },
  {
    slug: "klima-hurdasi",
    title: "Klima Hurdası",
    metaTitle: "Bursa Klima Hurdası Alımı",
    desc: "Split, salon tipi ve VRF klimalarınızın iç/dış ünitesini söküp bakır/alüminyum radyatör değerine göre alıyoruz.",
    img: "bursa-is-makinesi.avif",
    lead: "Klima üniteleri, içerdiği bakır radyatör ve kompresör nedeniyle değerli bir hurda kalemidir. Ataevler Hurda Metal olarak klimanızın sökümünü de üstlenip, yerinde tartıp ödemesini yapıyoruz.",
    types: [
      ["Split klima:", "İç ve dış ünite birlikte veya ayrı ayrı."],
      ["Salon tipi klima:", "Büyük kapasiteli salon/mağaza klimaları."],
      ["VRF/VRV sistem klima:", "Çoklu iç üniteli merkezi sistemler."],
      ["Kanal tipi klima:", "Tavan gizli/kanal tipi üniteler."],
      ["Ticari soğutma üniteleri:", "Chiller ve benzeri sanayi tipi cihazlar."],
    ],
    whyTitle: "Söküm Dahil, Zahmetsiz Hizmet",
    whyText: "Klimanın duvardan/tavandan sökümünü ekibimiz yapar, siz sadece adresi ve klima sayısını bildirin. Kompresör ve bakır radyatör ayrı değerlendirilir.",
  },
  {
    slug: "aku-hurdasi",
    title: "Akü Hurdası",
    metaTitle: "Bursa Akü Hurdası Alımı",
    desc: "Araç, iş makinesi ve UPS akülerinizi kurşun içeriğine göre değerlendirip Nilüfer merkezli ekibimizle yerinde ödeme yapıyoruz.",
    img: "bursa-aku-hurdasi.avif",
    lead: "Akü hurdası, içerdiği kurşun ve asit nedeniyle özel bir değerlendirme gerektirir. Ataevler Hurda Metal olarak her tür aküyü mevzuata uygun şekilde teslim alıp, kilogram bazında adil fiyattan ödüyoruz.",
    types: [
      ["Araç aküsü:", "Binek ve ticari araç aküleri."],
      ["İş makinesi/forklift aküsü:", "Büyük kapasiteli sanayi tipi aküler."],
      ["UPS / kesintisiz güç kaynağı aküsü:", "Kuru tip UPS aküleri."],
      ["Jel akü:", "Motosiklet ve küçük ekipman aküleri."],
      ["Toplu akü stoku:", "İşletmelerden toplu teslim alımı."],
    ],
    whyTitle: "Çevreye Duyarlı, Mevzuata Uygun Teslim",
    whyText: "Akülerinizi çevreye zarar vermeden, kurşun içeriğine göre doğru tartıp değerlendiriyoruz. Toplu akü stokunuz için özel randevu ayarlıyoruz.",
  },
];

function navHtml(currentSlug) {
  return NAV_ITEMS.map(([href, label]) => {
    const active = href === `${currentSlug}.html` ? ' style="color:var(--orange-dark);font-weight:700"' : "";
    return `<a href="${href}"${active}>${label} <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg></a>`;
  }).join("");
}

function otherServicesFooterLinks() {
  return NAV_ITEMS.map(([href, label]) => `<li><a href="${href}">${label}</a></li>`).join("\n          ");
}

function page(cat) {
  const icon = ICONS[`${cat.slug}.html`];
  const typesList = cat.types
    .map(
      ([b, t]) =>
        `        <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg><span><b>${b}</b> ${t}</span></li>`
    )
    .join("\n");

  return `<!DOCTYPE html>
<html lang="tr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${cat.metaTitle} | Ataevler Hurda Metal</title>
<meta name="description" content="${cat.desc}">
<meta name="keywords" content="bursa ${cat.title.toLowerCase()}, nilüfer ${cat.title.toLowerCase()}, ataevler hurda metal, bursa hurdacı">
<meta name="author" content="Ataevler Hurda Metal">
<meta name="robots" content="index, follow">
<meta name="theme-color" content="#20262b">
<link rel="canonical" href="${DOMAIN}/${cat.slug}.html">
<meta property="og:type" content="website">
<meta property="og:title" content="${cat.metaTitle} | Ataevler Hurda Metal">
<meta property="og:description" content="${cat.desc}">
<meta property="og:url" content="${DOMAIN}/${cat.slug}.html">
<meta property="og:image" content="${DOMAIN}/img/${cat.img}">
<meta property="og:locale" content="tr_TR">
<meta property="og:site_name" content="Ataevler Hurda Metal">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="${FAVICON}">
<link rel="manifest" href="site.webmanifest">
<link rel="preload" href="fonts/poppins-latin-ext-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="fonts/poppins-latin-ext-700.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="css/style.css">
<link rel="preload" as="image" href="img/${cat.img}" fetchpriority="high">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Service","serviceType":"${cat.title} Alımı","provider":{"@type":"RecyclingCenter","name":"Ataevler Hurda Metal","telephone":"${PHONE_TEL}"},"areaServed":"Bursa","url":"${DOMAIN}/${cat.slug}.html"}</script>
</head>
<body>
<header class="header">
  <div class="container nav">
    <a href="index.html" class="logo" aria-label="Ataevler Hurda Metal ana sayfa">
      <span style="display:flex;align-items:center;gap:10px;font-weight:800;font-size:1.3rem;color:#20262b">
        <svg viewBox="0 0 24 24" width="34" height="34" fill="none" stroke="#c1440e" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
        Ataevler <span style="color:#c1440e">Hurda Metal</span>
      </span>
    </a>
    <ul class="menu">
      <li><a href="index.html">Anasayfa</a></li>
      <li><a href="hakkimizda.html">Kurumsal</a></li>
      <li class="has-sub">
        <a href="hizmetlerimiz.html">Hizmetlerimiz</a>
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
      <li><a href="hizmet-bolgelerimiz.html">Hizmet Bölgeleri</a></li>
      <li><a href="sss.html">S.S.S.</a></li>
      <li><a href="iletisim.html">İletişim</a></li>
    </ul>
    <div class="nav-cta">
      <a href="tel:${PHONE_TEL}" class="nav-phone">
        <span class="ico"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.4 2.1L8 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c1 .3 1.9.6 2.9.7A2 2 0 0122 16.9z"/></svg></span>
        <span><small>Hemen Arayın</small><b>${PHONE_DISPLAY}</b></span>
      </a>
      <button class="burger" aria-label="Menüyü aç/kapat"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
<div class="nav-overlay"></div><section class="phero"><div class="container">
  <div class="crumb"><a href="index.html">Anasayfa</a> <span>›</span> <a href="hizmetlerimiz.html">Hizmetlerimiz</a> <span>›</span> ${cat.title}</div>
  <h1>Bursa ${cat.title} Alımı</h1><p>${cat.desc}</p>
</div></section><section class="content"><div class="container content-grid">
      <div class="prose reveal">
        <img src="img/${cat.img}" alt="Bursa ${cat.title.toLowerCase()} - Ataevler Hurda Metal" width="960" height="640" fetchpriority="high" decoding="async">
      <p class="lead">${cat.lead}</p>
      <h2>Aldığımız ${cat.title} Türleri</h2>
      <ul class="ticks">
${typesList}
      </ul>
      <h2>${cat.whyTitle}</h2>
      <p>${cat.whyText}</p>
      <h3>Güvenli ve Şeffaf Tartım</h3>
      <p>Tüm tartım işlemleri hassas terazilerle, sizin gözünüzün önünde yapılır. Anlaşılan fiyat üzerinden ödeme yerinde gerçekleştirilir.</p>
        <div class="note-box"><b>Ücretsiz Değerlendirme:</b> Hurdanızı yerinde tartıp güncel piyasa fiyatı üzerinden ödeme yapıyoruz. Hemen arayın: <a href="tel:${PHONE_TEL}" style="color:var(--orange-dark);font-weight:700">${PHONE_DISPLAY}</a></div>
      </div>
      <aside class="sidebar">
    <div class="side-card"><h4>Tüm Hizmetlerimiz</h4><ul class="side-links">${navHtml(cat.slug)}</ul></div>
    <div class="side-card side-cta">
      <h4>Ücretsiz Bilgi Alın</h4>
      <p>Hurdanızın türünü ve miktarını söyleyin, size güncel fiyatı hemen verelim.</p>
      <span class="ph">${PHONE_DISPLAY}</span>
      <a href="tel:${PHONE_TEL}" class="btn btn-primary btn-block">Hemen Ara</a>
      <a href="https://wa.me/${WA}" target="_blank" rel="noopener" class="btn btn-wa btn-block" style="margin-top:10px"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15l-1.3 4.9 5-1.3A10 10 0 1012 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3-1.3-5-4.4-5.1-4.6-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.2.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.9-.1 1.6z"/></svg> WhatsApp</a>
    </div>
    <div class="side-card">
      <h4>Hizmet Bölgeleri</h4>
      <p class="muted" style="font-size:.92rem;margin:0">Nilüfer, Osmangazi, Yıldırım, Gemlik, İnegöl, Mudanya, Karacabey, Orhangazi, Yenişehir, Kestel ve Gürsu'da hizmetinizdeyiz.</p>
    </div>
  </aside>
    </div></section><div class="container" style="padding-bottom:80px"><div class="cta-band reveal">
  <div><h2>Hurdanızı Değerlendirmeye Hazır mısınız?</h2><p>Güncel piyasa fiyatı ve yerinde tartım için bir telefon kadar yakınız.</p></div>
  <div class="acts">
    <a href="tel:${PHONE_TEL}" class="btn btn-primary btn-lg">${PHONE_DISPLAY}</a>
    <a href="https://wa.me/${WA}" target="_blank" rel="noopener" class="btn btn-ghost btn-lg">WhatsApp'tan Yaz</a>
  </div>
</div></div>
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
          <a href="https://wa.me/${WA}" aria-label="WhatsApp" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15l-1.3 4.9 5-1.3A10 10 0 1012 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3-1.3-5-4.4-5.1-4.6-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.2.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.9-.1 1.6z"/></svg></a>
          <a href="tel:${PHONE_TEL}" aria-label="Telefon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.4 2.1L8 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c1 .3 1.9.6 2.9.7A2 2 0 0122 16.9z"/></svg></a>
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
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg><span>Tahtalı Mah. Bursa Yolu Cad. No:92, Nilüfer / Bursa</span></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.4 2.1L8 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c1 .3 1.9.6 2.9.7A2 2 0 0122 16.9z"/></svg><a href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 6l10 7 10-7"/></svg><a href="mailto:info@ataevlerhurdametal.com.tr">info@ataevlerhurdametal.com.tr</a></li>
          <li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg><span>Her gün 08:00 - 20:00</span></li>
        </ul>
        <a href="iletisim.html" class="btn btn-primary" style="margin-top:8px">Ücretsiz Bilgi Al</a>
      </div>
    </div>
    <div class="f-bottom">
      <span>© <span id="yil">2026</span> Ataevler Hurda Metal — Tüm hakları saklıdır.</span>
      <span class="f-legal">
        <a href="gizlilik-politikasi.html">Gizlilik Politikası</a>
        <a href="cerez-politikasi.html">Çerez Politikası</a>
        <a href="kullanim-sartlari.html">Kullanım Şartları</a>
      </span>
    </div>
  </div>
</footer>
<div class="fab">
  <a class="f-wa" href="https://wa.me/${WA}?text=Merhaba,%20${encodeURIComponent(cat.title)}%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." target="_blank" rel="noopener" aria-label="WhatsApp"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15l-1.3 4.9 5-1.3A10 10 0 1012 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3-1.3-5-4.4-5.1-4.6-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.2.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.9-.1 1.6z"/></svg></a>
  <a class="f-tel" href="tel:${PHONE_TEL}" aria-label="Telefon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.4 2.1L8 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c1 .3 1.9.6 2.9.7A2 2 0 0122 16.9z"/></svg></a>
</div>
<div class="mbar">
  <a class="m-tel" href="tel:${PHONE_TEL}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1 1 .4 2 .7 2.9a2 2 0 01-.4 2.1L8 10a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c1 .3 1.9.6 2.9.7A2 2 0 0122 16.9z"/></svg> Hemen Ara</a>
  <a class="m-wa" href="https://wa.me/${WA}" target="_blank" rel="noopener"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15l-1.3 4.9 5-1.3A10 10 0 1012 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.8-.6-3-1.3-5-4.4-5.1-4.6-.2-.2-1.3-1.7-1.3-3.2s.8-2.3 1-2.6c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .7.5l.9 2.1c.1.2.1.4 0 .6l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.2.4-.2.6-.1l2 1c.3.1.5.2.5.3.1.2.1.9-.1 1.6z"/></svg> WhatsApp</a>
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

for (const cat of CATS) {
  writeFileSync(`${cat.slug}.html`, page(cat), "utf8");
  console.log(`yazıldı: ${cat.slug}.html`);
}
