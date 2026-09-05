/* ===================================================================
   Ataevler Hurda Metal - main.js
=================================================================== */
(function () {
  'use strict';
  var WA = '905379439836';      // WhatsApp numarası
  var TEL = '+905379439836';    // Telefon

  document.addEventListener('DOMContentLoaded', function () {

    /* ---------- Mobil menü ---------- */
    var burger = document.querySelector('.burger');
    var menu = document.querySelector('.menu');
    var overlay = document.querySelector('.nav-overlay');

    function closeMenu() {
      if (!menu) return;
      menu.classList.remove('open');
      if (burger) burger.classList.remove('open');
      if (overlay) overlay.classList.remove('show');
      document.body.style.overflow = '';
    }
    if (burger && menu) {
      burger.addEventListener('click', function () {
        var open = menu.classList.toggle('open');
        burger.classList.toggle('open', open);
        if (overlay) overlay.classList.toggle('show', open);
        document.body.style.overflow = open ? 'hidden' : '';
      });
    }
    if (overlay) overlay.addEventListener('click', closeMenu);

    /* Mobilde alt menü aç/kapa */
    document.querySelectorAll('.has-sub > a').forEach(function (a) {
      a.addEventListener('click', function (e) {
        if (window.innerWidth <= 860) {
          e.preventDefault();
          a.parentElement.classList.toggle('open');
        }
      });
    });
    document.querySelectorAll('.menu a').forEach(function (a) {
      a.addEventListener('click', function () {
        if (!a.parentElement.classList.contains('has-sub')) closeMenu();
      });
    });

    /* ---------- Aktif menü işaretleme ---------- */
    var path = location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.menu a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (href === path || (path === 'index.html' && href === 'index.html')) {
        a.classList.add('active');
        var p = a.closest('.has-sub');
        if (p) p.querySelector('a').classList.add('active');
      }
    });

    /* ---------- FAQ akordeon ---------- */
    document.querySelectorAll('.faq-q').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var item = btn.parentElement;
        var ans = item.querySelector('.faq-a');
        var isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(function (o) {
          o.classList.remove('open');
          o.querySelector('.faq-a').style.maxHeight = null;
        });
        if (!isOpen) {
          item.classList.add('open');
          ans.style.maxHeight = ans.scrollHeight + 'px';
        }
      });
    });

    /* ---------- Yorum slider (varsa) ---------- */
    var track = document.querySelector('.tst-track');
    if (track) {
      var prev = document.querySelector('.tst-prev');
      var next = document.querySelector('.tst-next');
      var idx = 0;
      function perView() {
        if (window.innerWidth <= 860) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
      }
      function maxIdx() {
        return Math.max(0, track.children.length - perView());
      }
      function go() {
        idx = Math.min(idx, maxIdx());
        var card = track.children[0];
        var gap = 26;
        var step = card.getBoundingClientRect().width + gap;
        track.style.transform = 'translateX(-' + (idx * step) + 'px)';
      }
      if (next) next.addEventListener('click', function () {
        idx = idx >= maxIdx() ? 0 : idx + 1; go();
      });
      if (prev) prev.addEventListener('click', function () {
        idx = idx <= 0 ? maxIdx() : idx - 1; go();
      });
      var auto = setInterval(function () {
        idx = idx >= maxIdx() ? 0 : idx + 1; go();
      }, 5500);
      track.parentElement.addEventListener('mouseenter', function () { clearInterval(auto); });
      window.addEventListener('resize', go);
      go();
    }

    /* ---------- Fiyat teklifi formu -> WhatsApp ---------- */
    document.querySelectorAll('form[data-wa]').forEach(function (form) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var g = function (n) { var el = form.querySelector('[name="' + n + '"]'); return el ? el.value.trim() : ''; };
        var ad = g('ad'), tel = g('tel'), hizmet = g('hizmet'),
            miktar = g('miktar'), adres = g('adres'), mesaj = g('mesaj');
        if (!ad || !tel) {
          alert('Lütfen ad ve telefon bilgisini giriniz.');
          return;
        }
        var t = '*Yeni Bilgi Talebi - Ataevler Hurda Metal*%0A%0A';
        t += '👤 Ad Soyad: ' + ad + '%0A';
        t += '📞 Telefon: ' + tel + '%0A';
        if (hizmet) t += '♻️ Hurda Türü: ' + hizmet + '%0A';
        if (miktar) t += '⚖️ Tahmini Miktar: ' + miktar + '%0A';
        if (adres) t += '📍 Adres/İlçe: ' + adres + '%0A';
        if (mesaj) t += '📝 Not: ' + mesaj + '%0A';
        window.open('https://wa.me/' + WA + '?text=' + encodeURIComponent(decodeURIComponent(t)), '_blank');
        form.reset();
        var btn = form.querySelector('[type="submit"]');
        if (btn) { var o = btn.innerHTML; btn.innerHTML = '✓ Talebiniz iletiliyor...'; setTimeout(function () { btn.innerHTML = o; }, 4000); }
      });
    });

    /* ---------- Galeri lightbox ---------- */
    var lb = document.querySelector('.lightbox');
    if (lb) {
      var lbImg = lb.querySelector('img');
      document.querySelectorAll('[data-lb]').forEach(function (el) {
        el.addEventListener('click', function () {
          lbImg.src = el.getAttribute('data-lb');
          lb.classList.add('show');
          document.body.style.overflow = 'hidden';
        });
      });
      function closeLb() { lb.classList.remove('show'); document.body.style.overflow = ''; }
      lb.addEventListener('click', closeLb);
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeLb(); });
    }

    /* ---------- Scroll reveal + sayaç ---------- */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add('in');
          if (en.target.dataset.count) runCount(en.target);
          io.unobserve(en.target);
        }
      });
    }, { threshold: .15 });
    document.querySelectorAll('.reveal,[data-count]').forEach(function (el) { io.observe(el); });

    function runCount(el) {
      var end = parseFloat(el.dataset.count), suf = el.dataset.suffix || '';
      var dur = 1600, t0 = null;
      function tick(ts) {
        if (!t0) t0 = ts;
        var p = Math.min((ts - t0) / dur, 1);
        var val = Math.floor((1 - Math.pow(1 - p, 3)) * end);
        el.textContent = val.toLocaleString('tr-TR') + suf;
        if (p < 1) requestAnimationFrame(tick);
        else el.textContent = end.toLocaleString('tr-TR') + suf;
      }
      requestAnimationFrame(tick);
    }

    /* ---------- Yıl ---------- */
    var y = document.getElementById('yil');
    if (y) y.textContent = new Date().getFullYear();

    /* ---------- Çerez onayı (KVKK / Google Ads uyumluluğu) ---------- */
    var CONSENT_KEY = 'ih_cerez_onay';
    var banner = document.querySelector('.cookie-banner');
    function applyConsent(granted) {
      if (typeof window.ihApplyConsent === 'function') window.ihApplyConsent(granted);
    }
    if (banner) {
      var saved = localStorage.getItem(CONSENT_KEY);
      if (saved) {
        applyConsent(saved === 'kabul');
      } else {
        setTimeout(function () { banner.classList.add('show'); }, 600);
      }
      var accept = banner.querySelector('.cb-accept');
      var reject = banner.querySelector('.cb-reject');
      if (accept) accept.addEventListener('click', function () {
        localStorage.setItem(CONSENT_KEY, 'kabul');
        banner.classList.remove('show');
        applyConsent(true);
      });
      if (reject) reject.addEventListener('click', function () {
        localStorage.setItem(CONSENT_KEY, 'red');
        banner.classList.remove('show');
        applyConsent(false);
      });
    }
  });
})();
