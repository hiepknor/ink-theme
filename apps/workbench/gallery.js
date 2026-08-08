const preview = document.querySelector('#theme-preview');
const toggle = document.querySelector('#strict-toggle');
const status = document.querySelector('#strict-status');
const reactSection = document.querySelector('#react-preview')?.closest('section');
const catalogHidden = [...preview.children].filter((element) => element !== reactSection);

function updateStrictMode(enabled) {
  preview.classList.toggle('ink-strict', enabled);
  toggle.checked = enabled;
  status.textContent = enabled ? 'Square geometry enabled' : 'Application geometry visible';
}

toggle.addEventListener('change', () => updateStrictMode(toggle.checked));
updateStrictMode(toggle.checked);

function updateCatalogVisibility() {
  const catalogMode = window.location.hash !== '#/all';
  for (const element of catalogHidden) {
    element.hidden = catalogMode;
    element.inert = catalogMode;
  }
  const legacyHeading = reactSection?.querySelector('#react-ui-title');
  if (legacyHeading) legacyHeading.hidden = catalogMode;
}

window.addEventListener('hashchange', updateCatalogVisibility);
updateCatalogVisibility();
