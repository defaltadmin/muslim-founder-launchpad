(() => {
  // === i18n dictionary ===
  const I18N = {
    en: {
      nav_how: 'How it works', nav_examples: 'Examples', nav_cta: 'Share your idea',
      hero_eyebrow: 'For Muslim founders, makers & community builders',
      hero_h1: 'Bring the idea.<br><em>Leave the tech to me.</em>',
      hero_lede: 'I help turn good ideas into clear, professional websites — with the setup, hosting and domain email handled without the usual technical stress.',
      why_eyebrow: 'WHY THIS EXISTS',
      why_h2: 'Good ideas should not get stuck at the technical part.',
      work_eyebrow: 'SELECTED WORK', work_h2: 'A few things I have shipped.',
      sabil_h2: 'Fi sabilillah.',
      process_eyebrow: 'PROCESS', process_h2: 'Three steps. No jargon.',
      form_eyebrow: 'START HERE', form_h2: 'Tell me about your idea.',
      form_submit: 'Send project request'
    },
    ar: {
      nav_how: 'كيف يعمل', nav_examples: 'أعمالي', nav_cta: 'شارك فكرتك',
      hero_eyebrow: 'للمسلمين المؤسسين والصانعين وبناء المجتمعات',
      hero_h1: 'أحضر الفكرة.<br><em>اترك التقنية لي.</em>',
      hero_lede: 'أساعد في تحويل الأفكار الجيدة إلى مواقع ويب احترافية واضحة — مع التعامل مع الإعداد والاستضافة وبريد النطاق الخاص بدون التوتر التقني المعتاد.',
      why_eyebrow: 'لماذا هذا موجود',
      why_h2: 'الأفكار الجيدة لا يجب أن تتعطل عند الجزء التقني.',
      work_eyebrow: 'أعمال مختارة', work_h2: 'بعض ما أنجزته.',
      sabil_h2: 'في سبيل الله.',
      process_eyebrow: 'آلية العمل', process_h2: 'ثلاث خطوات. بدون تعقيد.',
      form_eyebrow: 'ابدأ هنا', form_h2: 'أخبرني عن فكرتك.',
      form_submit: 'أرسل طلب المشروع'
    }
  };

  // === Theme ===
  const applyTheme = (t) => {
    document.documentElement.setAttribute('data-theme', t);
    localStorage.setItem('mfl-theme', t);
    document.querySelectorAll('.theme-dot').forEach(b => b.classList.toggle('active', b.dataset.t === t));
  };
  document.querySelectorAll('.theme-dot').forEach(btn => btn.addEventListener('click', () => applyTheme(btn.dataset.t)));
  applyTheme(localStorage.getItem('mfl-theme') || 'green');

  // === Language ===
  const applyLang = (lang) => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    localStorage.setItem('mfl-lang', lang);
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    const dict = I18N[lang] || I18N.en;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key]) el.innerHTML = dict[key];
    });
  };
  document.querySelectorAll('.lang-btn').forEach(btn => btn.addEventListener('click', () => applyLang(btn.dataset.lang)));
  applyLang(localStorage.getItem('mfl-lang') || 'en');

  // === Scroll reveal ===
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  // === Form ===
  const form = document.querySelector('.intake-form');
  const progress = document.querySelector('.progress-fill');
  const success = document.querySelector('.form-success');
  const domainSelect = form?.querySelector('[name="domain-status"]');
  const domainField = form?.querySelector('.domain-field');
  const fileInput = form?.querySelector('[name="assets"]');

  const updateProgress = () => {
    if (!form || !progress) return;
    const required = [...form.querySelectorAll('[required]')];
    const complete = required.filter(f => f.type === 'checkbox' || f.type === 'radio' ? f.checked : f.value.trim()).length;
    progress.style.width = Math.max(25, Math.round((complete / required.length) * 100)) + '%';
  };
  const updateDomain = () => {
    if (!domainSelect || !domainField) return;
    domainField.classList.toggle('show', domainSelect.value === 'have-domain' || domainSelect.value === 'chosen');
  };
  domainSelect?.addEventListener('change', updateDomain);
  form?.addEventListener('input', updateProgress);
  form?.addEventListener('change', updateProgress);

  form?.addEventListener('submit', async (event) => {
    if (!form.checkValidity()) { event.preventDefault(); form.reportValidity(); return; }
    event.preventDefault();
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn?.textContent;
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = '...'; }
    try {
      const response = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (response.ok) {
        success?.classList.add('visible');
        success?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        form.reset(); updateProgress(); updateDomain();
      } else {
        const data = await response.json();
        alert(data.errors ? data.errors.map(e => e.message).join(', ') : 'Something went wrong. Please try again.');
      }
    } catch { alert('Network error. Please check your connection and try again.'); }
    finally { if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = originalText; } }
  });

  updateDomain(); updateProgress();
})();
