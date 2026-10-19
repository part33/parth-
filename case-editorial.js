(() => {
  const key = 'parth-case-return';
  const siteRoot = new URL('../', location.href);
  const isDocsPreview = siteRoot.pathname === '/docs/';
  const fallback = new URL(isDocsPreview ? 'prototypes/parth-content-v2/index.html#projects' : '#projects', siteRoot);
  const validEntrance = url => url.origin === location.origin && (
    isDocsPreview
      ? url.pathname === fallback.pathname
      : [siteRoot.pathname, siteRoot.pathname + 'index.html'].includes(url.pathname)
  );
  let back = fallback;
  try {
    const ref = new URL(document.referrer);
    if (validEntrance(ref)) sessionStorage.setItem(key, ref.pathname + ref.search + '#projects');
  } catch {}
  try {
    const saved = sessionStorage.getItem(key);
    if (saved) {
      const stored = new URL(saved, location.origin);
      if (validEntrance(stored)) { stored.hash = 'projects'; back = stored; }
      else sessionStorage.removeItem(key);
    }
  } catch {}
  document.querySelectorAll('[data-home]').forEach(a => a.href = back.href);
  const tabs = [...document.querySelectorAll('[role="tab"]')];
  function activate(tab, focus = false) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    });
    if (focus) tab.focus();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activate(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); activate(tabs[next], true); }
    });
  });
  const links = [...document.querySelectorAll('.case-toc a')];
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        links.forEach(link => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-12% 0px -62% 0px', threshold: 0 });
    document.querySelectorAll('.case-section').forEach(section => observer.observe(section));
  }
})();
