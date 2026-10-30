const redirects = { '#services': 'consulting.html#services', '#about': 'about.html#about', '#testimonials': 'consulting.html#testimonials', '#contact': 'contact.html#contact' };
if ((location.pathname.endsWith('/') || location.pathname.endsWith('/index.html')) && redirects[location.hash]) {
  location.replace(redirects[location.hash]);
}
document.querySelectorAll('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

/* Navigation disclosure stays keyboard accessible and closes predictably. */
document.addEventListener('click',event=>{document.querySelectorAll('.site-more[open]').forEach(menu=>{if(!menu.contains(event.target))menu.open=false})});document.addEventListener('keydown',event=>{if(event.key==='Escape')document.querySelectorAll('.site-more[open]').forEach(menu=>{menu.open=false;menu.querySelector('summary').focus()})});
