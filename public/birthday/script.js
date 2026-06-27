(() => {
  'use strict';

  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));

  /* ── AOS ── */
  if (window.AOS) {
    AOS.init({ once: true, duration: 800, easing: 'ease-out-cubic' });
  }

  /* ── Nav scroll ── */
  const nav = $('#nav');
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        nav.classList.toggle('scrolled', window.scrollY > 60);
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  /* ── Mobile menu ── */
  const menuBtn = $('#menuBtn');
  const navLinks = $('.nav-links');
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.addEventListener('click', (e) => {
    if (e.target.tagName === 'A') {
      menuBtn.classList.remove('open');
      navLinks.classList.remove('open');
    }
  });

  /* ── Scroll Progress ── */
  const progressBar = $('#scrollProgress');
  const updateProgress = () => {
    const h = document.documentElement;
    const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
    progressBar.style.width = (p * 100) + '%';
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  /* ── Balloons ── */
  (function initBalloons() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const container = $('#balloon-container');
    const emojis = ['🎈', '🎈', '🎈', '🎉', '🌟'];
    const count = Math.min(12, Math.max(6, Math.floor(window.innerWidth / 100)));
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'balloon-el';
      el.textContent = emojis[i % emojis.length];
      el.style.left = (5 + Math.random() * 90) + '%';
      el.style.fontSize = (24 + Math.random() * 20) + 'px';
      el.style.animationDuration = (8 + Math.random() * 8) + 's';
      el.style.animationDelay = (-Math.random() * 15) + 's';
      container.appendChild(el);
    }
  })();

  /* ── Sparkles ── */
  (function initSparkles() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const container = $('#sparkle-container');
    const count = Math.min(20, Math.max(8, Math.floor(window.innerWidth / 50)));
    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      el.className = 'sparkle';
      el.style.left = Math.random() * 100 + '%';
      el.style.top = Math.random() * 100 + '%';
      el.style.animationDelay = (Math.random() * 5) + 's';
      el.style.animationDuration = (2 + Math.random() * 3) + 's';
      el.style.width = el.style.height = (2 + Math.random() * 4) + 'px';
      container.appendChild(el);
    }
  })();

  /* ── Cake candles ── */
  const blowBtn = $('#blowBtn');
  const flames = $$('.candle-flame');
  let candlesBlown = false;

  blowBtn.addEventListener('click', () => {
    if (candlesBlown) return;
    candlesBlown = true;
    flames.forEach((f, i) => {
      setTimeout(() => {
        f.classList.add('extinguished');
        if (i === flames.length - 1) {
          confetti({
            particleCount: 120,
            spread: 100,
            origin: { y: 0.4 },
            colors: ['#FF8FAB', '#D4AF37', '#C8B8E8', '#E85D8A']
          });
        }
      }, i * 200);
    });
  });

  /* ── Music Player ── */
  const audio = $('#bgAudio');
  const playBtn = $('#playBtn');
  const musicLabel = $('#musicLabel');
  const bars = $$('.music-bar');

  audio.volume = 0.5;

  playBtn.addEventListener('click', async () => {
    try {
      if (audio.paused) {
        await audio.play();
        playBtn.textContent = '⏸';
        musicLabel.textContent = 'Playing for Sama 🎶';
        bars.forEach(b => b.classList.remove('paused'));
      } else {
        audio.pause();
        playBtn.textContent = '▶';
        musicLabel.textContent = 'Tap play for Sama';
        bars.forEach(b => b.classList.add('paused'));
      }
    } catch {
      playBtn.textContent = '♫';
      musicLabel.textContent = 'Add a song to play';
    }
  });

  audio.addEventListener('ended', () => {
    playBtn.textContent = '▶';
    musicLabel.textContent = 'Tap play for Sama';
    bars.forEach(b => b.classList.add('paused'));
  });

  /* ── Confetti helper ── */
  const cCount = (n) => Math.max(10, Math.min(n, Math.floor(n * (window.innerWidth / 1920))));

  /* ── Celebrate ── */
  const celebrateBtn = $('#celebrateBtn');
  celebrateBtn.addEventListener('click', fireCelebration);

  function fireCelebration() {
    fireConfetti();
    fireFireworks();
  }

  function fireConfetti() {
    const duration = 2000;
    const end = Date.now() + duration;
    (function frame() {
      confetti({
        particleCount: cCount(6),
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#FF8FAB', '#D4AF37', '#C8B8E8', '#E85D8A', '#FFF8F0']
      });
      confetti({
        particleCount: cCount(6),
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#FF8FAB', '#D4AF37', '#C8B8E8', '#E85D8A', '#FFF8F0']
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  }

  function fireFireworks() {
    const duration = 2000;
    const end = Date.now() + duration;
    (function burst() {
      confetti({
        particleCount: cCount(30),
        spread: 120,
        origin: { y: 0.3 + Math.random() * 0.4, x: 0.2 + Math.random() * 0.6 },
        colors: ['#FF8FAB', '#D4AF37', '#C8B8E8', '#E85D8A', '#FFD700'],
        startVelocity: 25 + Math.random() * 15,
        ticks: 80
      });
      if (Date.now() < end) {
        setTimeout(() => requestAnimationFrame(burst), 150 + Math.random() * 200);
      }
    })();
  }

  /* ── Back to Top ── */
  const topBtn = $('#topBtn');
  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── Typewriter effect on hero sub ── */
  // Already handled by AOS

  /* ── Year ── */
  const yearEl = $('#year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
