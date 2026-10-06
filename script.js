(() => {
  // Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('visible'));
  }

  // Form
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
  fileInput?.addEventListener('change', () => {
    const help = fileInput.parentElement.querySelector('.field-help');
    if (fileInput.files?.length && help) help.textContent = fileInput.files[0].name + ' selected.';
  });

  form?.addEventListener('submit', async (event) => {
    if (!form.checkValidity()) { event.preventDefault(); form.reportValidity(); return; }
    event.preventDefault();
    const submitBtn = form.querySelector('[type="submit"]');
    const originalText = submitBtn?.textContent;
    if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Sending...'; }
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
