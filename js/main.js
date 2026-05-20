// ============================================================
// Europe Immigration Advisory - Main JS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- MOBILE MENU ----
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const overlay = document.querySelector('.nav-overlay');

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      overlay.classList.toggle('open');
    });
    overlay && overlay.addEventListener('click', () => {
      navLinks.classList.remove('open');
      overlay.classList.remove('open');
    });
  }

  // ---- FAQ ACCORDION ----
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ---- ACTIVE NAV LINK ----
  const page = window.location.pathname.split('/').filter(Boolean).pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === page || link.getAttribute('href') === page.replace('.html', '')) {
      link.classList.add('active');
    }
  });

  // ---- SCROLL ANIMATIONS ----
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
  }, { threshold: 0.1 });
  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

  // ---- CONTACT FORM SUBMIT ----
  const forms = document.querySelectorAll('.contact-form');
  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Sending...';
      setTimeout(() => {
        btn.textContent = '✓ Message Sent! We will contact you soon.';
        btn.style.background = '#22c55e';
        form.reset();
        setTimeout(() => { btn.textContent = 'Submit Application'; btn.style.background = ''; }, 4000);
      }, 1500);
    });
  });

  // ---- SMOOTH COUNTER ----
  const counters = document.querySelectorAll('.counter');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        let count = 0;
        const inc = target / 60;
        const timer = setInterval(() => {
          count = Math.min(count + inc, target);
          el.textContent = Math.floor(count) + suffix;
          if (count >= target) clearInterval(timer);
        }, 25);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ---- STICKY HEADER SHADOW ----
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
      header.style.boxShadow = window.scrollY > 50 ? '0 4px 24px rgba(0,0,0,0.12)' : '0 2px 20px rgba(0,0,0,0.08)';
    }
  });
});
