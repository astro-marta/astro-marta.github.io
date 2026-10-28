// Progressive enhancement: the complete biography and every mission remain in the HTML.
const menuButton = document.querySelector('.menu-toggle');
const mobileNavigation = document.querySelector('#mobile-navigation');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
  mobileNavigation.hidden = true;
}
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(expanded));
  menuButton.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
  mobileNavigation.hidden = !expanded;
});
mobileNavigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !mobileNavigation.hidden) { closeMenu(); menuButton.focus(); }
});
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
window.matchMedia('(min-width: 601px)').addEventListener('change', event => { if (event.matches) closeMenu(); });

const tabList = document.querySelector('.mission-tabs');
const tabs = [...tabList.querySelectorAll('[role="tab"]')];
function selectMission(tab, focus = false) {
  tabs.forEach(item => {
    const active = item === tab;
    item.setAttribute('aria-selected', String(active));
    item.tabIndex = active ? 0 : -1;
    const panel = document.getElementById(item.getAttribute('aria-controls'));
    panel.hidden = !active;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', item.id);
    panel.tabIndex = 0;
  });
  if (focus) tab.focus();
}
tabList.hidden = false;
selectMission(tabs[0]);
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectMission(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next !== undefined) { event.preventDefault(); selectMission(tabs[next], true); }
  });
});

const filters = [...document.querySelectorAll('[data-filter]')];
const mediaCards = [...document.querySelectorAll('[data-type]')];
document.querySelector('.media-filters').hidden = false;
filters.forEach(button => button.addEventListener('click', () => {
  const type = button.dataset.filter;
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  let count = 0;
  mediaCards.forEach(card => {
    card.hidden = type !== 'all' && card.dataset.type !== type;
    if (!card.hidden) count++;
  });
  document.querySelector('.filter-status').textContent = `${count} ${count === 1 ? 'perspective' : 'perspectives'} shown.`;
}));

const creditsDialog = document.querySelector('#credits-dialog');
document.querySelector('[data-open-credits]').addEventListener('click', () => {
  creditsDialog.showModal();
  document.body.classList.add('dialog-open');
});
document.querySelector('.dialog-close').addEventListener('click', () => creditsDialog.close());
creditsDialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
creditsDialog.addEventListener('click', event => {
  const bounds = creditsDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) creditsDialog.close();
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Motion is optional and never hides the site's essential content.
if ('IntersectionObserver' in window) {
  const navigationLinks = [...document.querySelectorAll('.desktop-nav a')];
  const navigationObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = navigationLinks.find(item => item.hash === `#${entry.target.id}`);
      if (!link) return;
      if (entry.isIntersecting) {
        navigationLinks.forEach(item => item.removeAttribute('aria-current'));
        link.setAttribute('aria-current', 'location');
      } else { link.removeAttribute('aria-current'); }
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('#about, #missions, #impact, #perspectives').forEach(section => navigationObserver.observe(section));
}
