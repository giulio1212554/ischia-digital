// Ischia Digital landing scripts
const BOOKING_URL = 'https://cal.com/nyx-tv-9oruth/30min';
const WHATSAPP_NUMBER = '393791453413';

function trackVisit() {
  const visits = JSON.parse(localStorage.getItem('id_visits') || '[]');
  const visit = {
    id: Date.now(),
    date: new Date().toISOString(),
    path: window.location.pathname,
    referrer: document.referrer || 'direct',
    userAgent: navigator.userAgent.substring(0, 120)
  };
  visits.push(visit);
  if (visits.length > 200) visits.shift();
  localStorage.setItem('id_visits', JSON.stringify(visits));
}
trackVisit();

function openBooking() {
  const clicks = JSON.parse(localStorage.getItem('id_booking_clicks') || '[]');
  clicks.push({ id: Date.now(), date: new Date().toISOString() });
  if (clicks.length > 100) clicks.shift();
  localStorage.setItem('id_booking_clicks', JSON.stringify(clicks));
  window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
}

const sticky = document.getElementById('stickyCta');
if (sticky) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) sticky.classList.add('visible');
    else sticky.classList.remove('visible');
  }, { passive: true });
}

const themeToggle = document.getElementById('themeToggle');
const root = document.documentElement;
function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('id_theme', theme);
  if (themeToggle) themeToggle.textContent = theme === 'light' ? '\u25D1' : '\u25D0';
}
const savedTheme = localStorage.getItem('id_theme');
if (savedTheme) applyTheme(savedTheme);
else if (window.matchMedia('(prefers-color-scheme: light)').matches) applyTheme('light');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    applyTheme(current === 'light' ? 'dark' : 'light');
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const toggle = document.getElementById('menuToggle');
const links = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('click', () => links.classList.remove('open'));
  });
}
