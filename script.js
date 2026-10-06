(() => {
  const form = document.querySelector('.intake-form');
  const progress = document.querySelector('.progress-fill');
  const success = document.querySelector('.form-success');
  const domainSelect = form?.querySelector('[name="domain-status"]');
  const domainField = form?.querySelector('.domain-field');
  const startingPoint = form?.querySelectorAll('[name="starting-point"]');
  const fileInput = form?.querySelector('[name="assets"]');

  const updateProgress = () => {
    if (!form || !progress) return;
    const required = [...form.querySelectorAll('[required]')];
    const complete = required.filter((field) => field.type === 'checkbox' || field.type === 'radio' ? field.checked : field.value.trim()).length;
    progress.style.width = `${Math.max(25, Math.round((complete / required.length) * 100))}%`;
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
    if (fileInput.files?.length && help) help.textContent = `${fileInput.files[0].name} selected. You can replace it before sending.`;
  });
  startingPoint?.forEach((input) => input.addEventListener('change', updateProgress));
  form?.addEventListener('submit', (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      form.reportValidity();
      return;
    }
    // On a static preview, show a confirmation without pretending the form was delivered.
    if (location.protocol === 'file:') {
      event.preventDefault();
      success?.classList.add('visible');
      success?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
  updateDomain();
  updateProgress();
})();
