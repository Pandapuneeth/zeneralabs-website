/* ══ ZENERA LABS — script.js ══ */

// ── CURSOR ────────────────────────────────
const cur = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

(function tick() {
  rx += (mx - rx) * 0.12; ry += (my - ry) * 0.12;
  cur.style.left  = mx + 'px'; cur.style.top  = my + 'px';
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(tick);
})();

document.querySelectorAll('a, button, .svc, .tmember, .impact-card, .clink').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('ch'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('ch'));
});

// ── LOADER ───────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => { document.getElementById('loader').classList.add('hidden'); }, 1600);
});

// ── NAVBAR SCROLL ─────────────────────────
const nav = document.getElementById('navbar');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });

// ── HAMBURGER ─────────────────────────────
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobile-nav').classList.toggle('open');
});
function closeMobile() {
  document.getElementById('mobile-nav').classList.remove('open');
}

// ── REVEAL ON SCROLL ──────────────────────
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ── COUNT-UP ──────────────────────────────
function countUp(el, target, dur = 1600) {
  let start = null;
  const step = ts => {
    if (!start) start = ts;
    const p = Math.min((ts - start) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.floor(ease * target);
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target;
  };
  requestAnimationFrame(step);
}

const cntObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      countUp(e.target, parseInt(e.target.dataset.target));
      cntObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.ic-num').forEach(el => cntObs.observe(el));

// ── CANVAS PARTICLES ──────────────────────
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let W, H;
function resize() {
  W = canvas.width  = window.innerWidth;
  H = canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize, { passive: true });

const PINK = [255, 0, 127];
const dots = Array.from({ length: 60 }, () => ({
  x: Math.random() * window.innerWidth,
  y: Math.random() * window.innerHeight,
  vx: (Math.random() - 0.5) * 0.3,
  vy: (Math.random() - 0.5) * 0.3,
  r: Math.random() * 1.4 + 0.5,
  o: Math.random() * 0.25 + 0.05
}));

// Mouse parallax
let pmx = 0, pmy = 0;
document.addEventListener('mousemove', e => { pmx = e.clientX; pmy = e.clientY; }, { passive: true });

function drawCanvas() {
  ctx.clearRect(0, 0, W, H);

  dots.forEach(d => {
    d.x += d.vx; d.y += d.vy;
    if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
    if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
  });

  // Connections
  const MAX = 130;
  for (let i = 0; i < dots.length; i++) {
    for (let j = i + 1; j < dots.length; j++) {
      const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MAX) {
        const a = (1 - dist / MAX) * 0.07;
        ctx.beginPath();
        ctx.moveTo(dots[i].x, dots[i].y);
        ctx.lineTo(dots[j].x, dots[j].y);
        ctx.strokeStyle = `rgba(${PINK},${a})`;
        ctx.lineWidth = .8;
        ctx.stroke();
      }
    }
  }

  // Mouse glow
  const grd = ctx.createRadialGradient(pmx, pmy, 0, pmx, pmy, 200);
  grd.addColorStop(0, 'rgba(255,0,127,.04)');
  grd.addColorStop(1, 'transparent');
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, W, H);

  // Dots
  dots.forEach(d => {
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${PINK},${d.o})`;
    ctx.fill();
  });

  requestAnimationFrame(drawCanvas);
}
drawCanvas();

// ── ACTIVE NAV HIGHLIGHT ──────────────────
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#desktop-nav a[href^="#"]');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 130) cur = s.id; });
  navLinks.forEach(a => {
    const active = a.getAttribute('href') === '#' + cur;
    a.style.color = active ? 'white' : '';
  });
}, { passive: true });

// ── SMOOTH CARD TILT ──────────────────────
document.querySelectorAll('.svc, .impact-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    card.style.transform = `translateY(-4px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── OPEN LINK ─────────────────────────────
function openLink(url) { window.open(url, '_blank'); }
