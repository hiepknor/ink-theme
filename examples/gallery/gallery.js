const preview = document.querySelector('#theme-preview');
const toggle = document.querySelector('#strict-toggle');
const status = document.querySelector('#strict-status');

function updateStrictMode(enabled) {
  preview.classList.toggle('ink-strict', enabled);
  toggle.checked = enabled;
  status.textContent = enabled ? 'Square geometry enabled' : 'Application geometry visible';
}

toggle.addEventListener('change', () => updateStrictMode(toggle.checked));
updateStrictMode(toggle.checked);
