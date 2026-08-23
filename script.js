// Progressive enhancement — the site is fully usable without this file.
document.documentElement.classList.add('js');

// Mobile nav toggle
var toggle = document.querySelector('.nav-toggle');
var menu = document.getElementById('nav-menu');
if (toggle && menu) {
  toggle.addEventListener('click', function () {
    var open = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(open));
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}

// Reveal-on-scroll + nav scrollspy
var reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(function (el) { revealObserver.observe(el); });

  var navLinks = {};
  document.querySelectorAll('.nav-menu a[href^="#"]').forEach(function (a) {
    navLinks[a.getAttribute('href').slice(1)] = a;
  });
  var spyObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      var link = navLinks[entry.target.id];
      if (link && entry.isIntersecting) {
        Object.keys(navLinks).forEach(function (id) { navLinks[id].classList.remove('active'); });
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  document.querySelectorAll('main section[id]').forEach(function (s) { spyObserver.observe(s); });
} else {
  reveals.forEach(function (el) { el.classList.add('visible'); });
}

// Footer year
var year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());
