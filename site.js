const redirects = { '#services': 'consulting.html#services', '#about': 'about.html#about', '#testimonials': 'consulting.html#testimonials', '#contact': 'contact.html#contact' };
if ((location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) && redirects[location.hash]) {
  location.replace(redirects[location.hash]);
}
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });
