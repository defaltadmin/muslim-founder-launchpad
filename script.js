(() => {
  // === THEME TOGGLE ===
  const themeToggle = document.getElementById('themeToggle');
  const saved = localStorage.getItem('mfl-theme') || 'light';
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  themeToggle?.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) { document.documentElement.removeAttribute('data-theme'); localStorage.setItem('mfl-theme', 'light'); }
    else { document.documentElement.setAttribute('data-theme', 'dark'); localStorage.setItem('mfl-theme', 'dark'); }
  });

  // === SCROLL REVEAL ===
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    reveals.forEach(el => io.observe(el));
  } else { reveals.forEach(el => el.classList.add('visible')); }

  // === CANVAS BACKGROUND (desktop only) ===
  const canvas = document.getElementById('bg-canvas');
  if (canvas && window.innerWidth > 768) {
    const ctx = canvas.getContext('2d');
    let W, H, particles = [], scrollY = 0, raf;
    const COUNT = 60;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
    for (let i = 0; i < COUNT; i++) {
      particles.push({
        x: Math.random() * W, y: Math.random() * H,
        r: Math.random() * 2.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.4 + 0.1
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const color = isDark() ? '78,201,138' : '26,107,74';
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy - scrollY * 0.0003;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color},${p.o})`; ctx.fill();
      });
      // Connect nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y); ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(${color},${0.06 * (1 - dist / 140)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    window.addEventListener('scroll', () => { scrollY = window.scrollY; }, { passive: true });
    draw();
  }

  // === FORM ===
  const form = document.querySelector('.intake-form');
  const progress = document.querySelector('.progress-fill');
  const success = document.querySelector('.form-success');
  const updateProgress = () => {
    if (!form || !progress) return;
    const req = [...form.querySelectorAll('[required]')];
    const done = req.filter(f => f.type === 'checkbox' ? f.checked : f.value.trim()).length;
    progress.style.width = Math.max(25, Math.round((done / req.length) * 100)) + '%';
  };
  form?.addEventListener('input', updateProgress);
  form?.addEventListener('change', updateProgress);
  form?.addEventListener('submit', async (e) => {
    if (!form.checkValidity()) { e.preventDefault(); form.reportValidity(); return; }
    e.preventDefault();
    const btn = form.querySelector('[type="submit"]');
    const orig = btn?.textContent;
    if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) {
        success?.classList.add('visible');
        success?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        form.reset(); updateProgress();
      } else {
        const data = await res.json();
        alert(data.errors ? data.errors.map(x => x.message).join(', ') : 'Something went wrong. Please try again.');
      }
    } catch { alert('Network error. Please check your connection and try again.'); }
    finally { if (btn) { btn.disabled = false; btn.textContent = orig; } }
  });
  updateProgress();
})();
