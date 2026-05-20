/* ══ ZENERA LABS — contact.js ══ */

// ── EmailJS config ──
const EMAILJS_SERVICE_ID  = 'service_xdlvzze';
const EMAILJS_TEMPLATE_ID = 'template_fu7588d';
const EMAILJS_PUBLIC_KEY  = 'pD_FAm9FzOx9KgQ5h';

// ── Pre-select service from URL param (?service=xxx) ──
(function() {
  const params = new URLSearchParams(window.location.search);
  const svc = params.get('service');
  if (svc) {
    document.addEventListener('DOMContentLoaded', () => {
      const chip = [...document.querySelectorAll('.chip')]
        .find(c => c.dataset.value === svc);
      if (chip) { chip.click(); chip.scrollIntoView({ behavior: 'smooth', block: 'center' }); }
    });
  }
})();

// ── Service chips ──
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    document.getElementById('selectedService').value = chip.dataset.value;
    document.getElementById('serviceError').style.display = 'none';
  });
});

// ── Char counter ──
const msgArea = document.getElementById('fmsg');
const counter = document.getElementById('charCount');
if (msgArea) {
  msgArea.addEventListener('input', () => {
    const len = msgArea.value.length;
    counter.textContent = `${len} / 1000`;
    if (len > 900) counter.style.color = '#ff007f';
    else counter.style.color = '';
    if (len > 1000) msgArea.value = msgArea.value.slice(0, 1000);
  });
}

// ── Floating label effect ──
document.querySelectorAll('.input-wrap input, .textarea-wrap textarea').forEach(el => {
  el.addEventListener('focus', () => el.parentElement.classList.add('focused'));
  el.addEventListener('blur',  () => el.parentElement.classList.remove('focused'));
});

// ── Validation ──
function validateForm() {
  let valid = true;
  const service = document.getElementById('selectedService').value;
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const msg     = document.getElementById('fmsg').value.trim();

  if (!service) {
    document.getElementById('serviceError').style.display = 'block';
    valid = false;
  }
  if (!name) {
    document.getElementById('nameError').style.display = 'block';
    document.getElementById('fname').closest('.input-wrap').classList.add('error');
    valid = false;
  } else {
    document.getElementById('nameError').style.display = 'none';
    document.getElementById('fname').closest('.input-wrap').classList.remove('error');
  }
  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRe.test(email)) {
    document.getElementById('emailError').style.display = 'block';
    document.getElementById('femail').closest('.input-wrap').classList.add('error');
    valid = false;
  } else {
    document.getElementById('emailError').style.display = 'none';
    document.getElementById('femail').closest('.input-wrap').classList.remove('error');
  }
  if (!msg || msg.length < 10) {
    document.getElementById('msgError').style.display = 'block';
    document.getElementById('fmsg').closest('.textarea-wrap').classList.add('error');
    valid = false;
  } else {
    document.getElementById('msgError').style.display = 'none';
    document.getElementById('fmsg').closest('.textarea-wrap').classList.remove('error');
  }
  return valid;
}

// ── Form submit ──
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    const btn = document.getElementById('formSubmit');
    btn.querySelector('.submit-text').style.display = 'none';
    btn.querySelector('.submit-arrow').style.display = 'none';
    btn.querySelector('.submit-loading').style.display = 'inline-flex';
    btn.disabled = true;

    const name    = document.getElementById('fname').value.trim();
    const email   = document.getElementById('femail').value.trim();
    const phone   = document.getElementById('fphone').value.trim();
    const service = document.getElementById('selectedService').value;
    const msg     = document.getElementById('fmsg').value.trim();
    const time    = new Date().toLocaleString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
      hour: '2-digit', minute: '2-digit', hour12: true
    });

    // ── Send email via EmailJS ──
    let emailSent = false;
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  name,
          from_email: email,
          phone:      phone || 'Not provided',
          service:    service,
          message:    msg,
          time:       time
        },
        EMAILJS_PUBLIC_KEY
      );
      emailSent = true;
      showToast('Message sent! We\'ll be in touch soon 🚀', 'success');
    } catch (err) {
      console.error('EmailJS error:', err);
      showToast('Email failed — but WhatsApp is opening as backup!', 'info');
    }

    // ── Always open WhatsApp too ──
    const waText = encodeURIComponent(
      `*New Inquiry — Zenera Labs Website*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      (phone ? `*Phone:* ${phone}\n` : '') +
      `*Service:* ${service}\n\n` +
      `*Message:*\n${msg}`
    );
    window.open(`https://wa.me/918073378278?text=${waText}`, '_blank');

    // ── Show success overlay ──
    document.getElementById('successOverlay').classList.add('active');
    form.reset();
    document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
    document.getElementById('selectedService').value = '';
    counter.textContent = '0 / 1000';

    btn.querySelector('.submit-text').style.display = '';
    btn.querySelector('.submit-arrow').style.display = '';
    btn.querySelector('.submit-loading').style.display = 'none';
    btn.disabled = false;
  });
}

// ── Success overlay ──
function closeSuccess() {
  document.getElementById('successOverlay').classList.remove('active');
}
document.getElementById('successOverlay')?.addEventListener('click', (e) => {
  if (e.target === e.currentTarget) closeSuccess();
});

// ── FAQ accordion ──
function toggleFaq(el) {
  const isOpen = el.classList.contains('open');
  document.querySelectorAll('.faq-item.open').forEach(f => f.classList.remove('open'));
  if (!isOpen) el.classList.add('open');
}
