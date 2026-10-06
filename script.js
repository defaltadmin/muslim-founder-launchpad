(() => {
  // === THEME ===
  const toggle = document.getElementById('themeToggle');
  toggle?.addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', cur);
    localStorage.setItem('mfl-theme', cur);
  });

  // === SCROLL PROGRESS BAR ===
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);
  const onScroll = () => {
    const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    bar.style.transform = 'scaleX(' + pct + ')';
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // === TEXT REVEAL (word by word) ===
  document.querySelectorAll('.hero-title, .section-title').forEach(el => {
    const parts = el.innerHTML.split(/(<br\s*\/?>)/i);
    let out = '', idx = 0;
    parts.forEach(part => {
      if (/<br/i.test(part)) { out += part; return; }
      out += part.split(/(\s+)/).map(w => {
        if (!w.trim()) return w;
        return '<span class="word" style="--wi:' + (idx++) + '">' + w + '</span>';
      }).join('');
    });
    el.innerHTML = out;
  });
  const wordObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.querySelectorAll('.word').forEach(w => w.classList.add('revealed')); wordObs.unobserve(e.target); }
    });
  }, { threshold: 0.3 });
  document.querySelectorAll('.hero-title, .section-title').forEach(el => wordObs.observe(el));

  // === SCROLL REVEAL ===
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // === PARALLAX HERO ===
  const ht = document.querySelector('.hero-title');
  const hs = document.querySelector('.hero-sub');
  const hc = document.querySelector('.hero-cta');
  const hg = document.querySelector('.hero-tag');
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (hg) { hg.style.transform = 'translateY(' + y * 0.2 + 'px)'; }
    if (ht) { ht.style.transform = 'translateY(' + y * 0.15 + 'px)'; ht.style.opacity = Math.max(0, 1 - y / 700); }
    if (hs) { hs.style.transform = 'translateY(' + y * 0.1 + 'px)'; hs.style.opacity = Math.max(0, 1 - y / 500); }
    if (hc) { hc.style.transform = 'translateY(' + y * 0.05 + 'px)'; }
  }, { passive: true });

  // === BIG ANIMATED BACKGROUND ===
  const canvas = document.getElementById('bg-canvas');
  if (canvas && window.innerWidth > 768) {
    const ctx = canvas.getContext('2d');
    let W, H, scrollY = 0;
    const resize = () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';
    const orbs = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random() * W, y: Math.random() * H,
      r: 250 + Math.random() * 350,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      hue: 150 + i * 10
    }));
    const parts = Array.from({ length: 80 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      r: Math.random() * 4 + 1,
      vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
      o: Math.random() * 0.5 + 0.15
    }));
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const dark = isDark();
      orbs.forEach(orb => {
        orb.x += orb.vx; orb.y += orb.vy - scrollY * 0.0008;
        if (orb.x < -orb.r) orb.x = W + orb.r; if (orb.x > W + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = H + orb.r; if (orb.y > H + orb.r) orb.y = -orb.r;
        const g = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        g.addColorStop(0, dark ? 'hsla(' + orb.hue + ',50%,30%,0.12)' : 'hsla(' + orb.hue + ',45%,45%,0.08)');
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2); ctx.fill();
      });
      const color = dark ? '78,201,138' : '26,107,74';
      parts.forEach(p => {
        p.x += p.vx; p.y += p.vy - scrollY * 0.0004;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + color + ',' + p.o + ')'; ctx.fill();
      });
      for (let i = 0; i < parts.length; i++) {
        for (let j = i + 1; j < parts.length; j++) {
          const dx = parts[i].x - parts[j].x, dy = parts[i].y - parts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 160) {
            ctx.beginPath(); ctx.moveTo(parts[i].x, parts[i].y); ctx.lineTo(parts[j].x, parts[j].y);
            ctx.strokeStyle = 'rgba(' + color + ',' + (0.08 * (1 - dist / 160)) + ')';
            ctx.lineWidth = 0.6; ctx.stroke();
          }
        }
      }
      requestAnimationFrame(draw);
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
      if (res.ok) { success?.classList.add('visible'); success?.scrollIntoView({ behavior: 'smooth', block: 'center' }); form.reset(); updateProgress(); }
      else { const data = await res.json(); alert(data.errors ? data.errors.map(x => x.message).join(', ') : 'Something went wrong.'); }
    } catch { alert('Network error. Please try again.'); }
    finally { if (btn) { btn.disabled = false; btn.textContent = orig; } }
  });
  updateProgress();
})();
