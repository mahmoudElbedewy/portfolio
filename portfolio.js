/* =====================================================
   MAHMOUD ELBEDEWY — Portfolio JS
   ===================================================== */

/* =====================================================
   1. CUSTOM CURSOR
   ===================================================== */
const cursorDot  = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursorDot.style.left = mouseX + 'px';
  cursorDot.style.top  = mouseY + 'px';
});

// Lagging ring for smooth follow
function animateCursor() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top  = ringY + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

// Cursor scale on interactive elements
document.querySelectorAll('a, button, .skill-box, .card, .tl-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.style.width  = '10px';
    cursorDot.style.height = '10px';
    cursorRing.style.width  = '56px';
    cursorRing.style.height = '56px';
    cursorRing.style.borderColor = 'rgba(0,210,255,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.style.width  = '6px';
    cursorDot.style.height = '6px';
    cursorRing.style.width  = '36px';
    cursorRing.style.height = '36px';
    cursorRing.style.borderColor = 'rgba(0,210,255,0.5)';
  });
});

/* =====================================================
   2. SCROLL PROGRESS BAR
   ===================================================== */
const progressBar = document.querySelector('.scroll-progress');

window.addEventListener('scroll', () => {
  const scrolled    = window.scrollY;
  const totalHeight = document.body.scrollHeight - window.innerHeight;
  const pct = (scrolled / totalHeight) * 100;
  progressBar.style.width = pct + '%';
});

/* =====================================================
   3. NAV — Scroll State + Active Link
   ===================================================== */
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Active nav link on scroll
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-link');

function updateActiveNav() {
  const scrollPos = window.scrollY + 100;
  sections.forEach(section => {
    const top    = section.offsetTop;
    const height = section.offsetHeight;
    const id     = section.getAttribute('id');
    if (scrollPos >= top && scrollPos < top + height) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

/* =====================================================
   4. HAMBURGER MENU
   ===================================================== */
const menuToggle = document.getElementById('menuToggle');
const navMenu    = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
  menuToggle.classList.toggle('open');
});

document.querySelectorAll('.menu a').forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('active');
    menuToggle.classList.remove('open');
  });
});

/* =====================================================
   5. 3D TILT CARDS — Refined
   ===================================================== */
document.querySelectorAll('.card[data-tilt]').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect    = card.getBoundingClientRect();
    const x       = e.clientX - rect.left;
    const y       = e.clientY - rect.top;
    const cx      = rect.width  / 2;
    const cy      = rect.height / 2;
    const rotateX = ((y - cy) / cy) * -7;
    const rotateY = ((x - cx) / cx) *  7;
    card.style.transition = 'none';
    card.style.transform  = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    card.style.transform  = 'perspective(1200px) rotateX(0) rotateY(0) scale3d(1,1,1)';
  });
});

/* =====================================================
   6. SCROLL TO TOP
   ===================================================== */
const scrollBtn = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 500 ? 'flex' : 'none';
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* =====================================================
   7. SKILLS TABS
   ===================================================== */
const tabs   = document.querySelectorAll('.skill-tab');
const panels = document.querySelectorAll('.skills-panel');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    panels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    const target = document.getElementById('tab-' + tab.dataset.tab);
    if (target) target.classList.add('active');
  });
});

/* =====================================================
   8. COUNTER ANIMATION
   ===================================================== */
function animateCounter(el) {
  const target   = parseInt(el.dataset.target, 10);
  const duration = 1600;
  const step     = target / (duration / 16);
  let current    = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target + '+';
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// Trigger counters when hero stats come into view
const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(n => counterObserver.observe(n));

/* =====================================================
   9. INTERSECTION OBSERVER — Reveal Animations
   ===================================================== */
const revealEls = document.querySelectorAll(
  '.skill-box, .card, .tl-item, .trait-item, .about-card, .section-header'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Small stagger based on element index within its parent
      const siblings = [...entry.target.parentNode.children];
      const idx = siblings.indexOf(entry.target);
      const delay = Math.min(idx * 80, 400);

      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0) scale(1)';
      }, delay);

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity    = '0';
  el.style.transform  = 'translateY(28px) scale(0.98)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

/* =====================================================
   10. TEXT SCRAMBLE ON SECTION TITLES
   ===================================================== */
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&';

function scrambleText(el, originalText) {
  let iterations = 0;
  const interval = setInterval(() => {
    el.textContent = originalText
      .split('')
      .map((char, idx) => {
        if (idx < iterations) return originalText[idx];
        if (char === ' ') return ' ';
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join('');
    if (iterations >= originalText.length) {
      clearInterval(interval);
      el.textContent = originalText;
    }
    iterations += 0.5;
  }, 30);
}

document.querySelectorAll('.section-title').forEach(title => {
  const originalText = title.textContent;
  const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        scrambleText(title, originalText);
        titleObserver.unobserve(title);
      }
    });
  }, { threshold: 0.5 });
  titleObserver.observe(title);
});

/* =====================================================
   11. MAGNETIC BUTTONS
   ===================================================== */
document.querySelectorAll('.magnetic').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x    = e.clientX - rect.left - rect.width  / 2;
    const y    = e.clientY - rect.top  - rect.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.4}px)`;
  });

  btn.addEventListener('mouseleave', () => {
    btn.style.transition = 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    btn.style.transform  = 'translate(0, 0)';
  });

  btn.addEventListener('mouseenter', () => {
    btn.style.transition = 'none';
  });
});

/* =====================================================
   12. TERMINAL — Blinking cursor is CSS-driven
       But let's add a typing effect for the cmd line
   ===================================================== */
const cmdEl = document.querySelector('.t-cmd');
if (cmdEl) {
  const cmdText = cmdEl.textContent;
  cmdEl.textContent = '';
  let i = 0;
  const typingDelay = setTimeout(() => {
    const interval = setInterval(() => {
      cmdEl.textContent += cmdText[i];
      i++;
      if (i >= cmdText.length) clearInterval(interval);
    }, 60);
  }, 800);
}

/* =====================================================
   13. PAGE LOAD — Orchestrated Entrance
   ===================================================== */
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.5s ease';

  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  // Hero elements entrance
  const heroTag      = document.querySelector('.hero-tag');
  const heroGreeting = document.querySelector('.hero-greeting');
  const glitch       = document.querySelector('.glitch');
  const heroDesc     = document.querySelector('.hero-desc');
  const heroBtns     = document.querySelector('.hero-buttons');
  const heroStats    = document.querySelector('.hero-stats');
  const terminalCard = document.querySelector('.terminal-card');

  const heroEls = [heroTag, heroGreeting, glitch, heroDesc, heroBtns, heroStats];

  heroEls.forEach((el, i) => {
    if (!el) return;
    el.style.opacity   = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = `opacity 0.7s ease ${300 + i * 120}ms, transform 0.7s ease ${300 + i * 120}ms`;
    requestAnimationFrame(() => {
      el.style.opacity   = '1';
      el.style.transform = 'translateY(0)';
    });
  });

  if (terminalCard) {
    terminalCard.style.opacity   = '0';
    terminalCard.style.transform = 'translateY(40px) scale(0.95)';
    terminalCard.style.transition = 'opacity 0.8s ease 600ms, transform 0.8s ease 600ms';
    requestAnimationFrame(() => {
      terminalCard.style.opacity   = '1';
      terminalCard.style.transform = 'translateY(0) scale(1)';
    });
  }
});