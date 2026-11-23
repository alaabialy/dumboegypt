(() => {
  // قائمة الموبايل
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('primary-menu');
  if (toggle && menu) {
    const setOpen = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(!menu.classList.contains('is-open')));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
  }

  // ظهور العناصر عند التمرير
  const items = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('is-visible'); io.unobserve(en.target); } });
    }, { threshold: 0.12 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('is-visible'));
  }

  // تبويبات المنيو
  const tabs = document.querySelectorAll('.menu-tab');
  const cards = document.querySelectorAll('.menu-card');
  tabs.forEach(tab => tab.addEventListener('click', () => {
    const cat = tab.dataset.cat;
    tabs.forEach(t => { t.classList.toggle('is-active', t === tab); t.setAttribute('aria-selected', String(t === tab)); });
    cards.forEach(c => { c.hidden = cat !== 'all' && c.dataset.cat !== cat; });
  }));

  // الأصناف الأساسية تفتح تبويب المنيو المناسب
  document.querySelectorAll('[data-jump]').forEach(a => a.addEventListener('click', () => {
    const t = document.querySelector('.menu-tab[data-cat="' + a.dataset.jump + '"]');
    if (t) t.click();
  }));

  // سنة الفوتر
  const y = document.getElementById('current-year');
  if (y) y.textContent = new Date().getFullYear();
})();
