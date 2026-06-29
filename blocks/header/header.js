import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  const rows = [...block.children];
  const data = {};

  // Read "key | value" from each row
  rows.forEach((row) => {
    const p = row.querySelector('p');
    if (!p) return;

    const [key, value] = p.textContent.split('|').map((s) => s.trim());
    data[key.toLowerCase()] = value;
  });

  // Parse nav items
  const navItems = data.nav.split(',').map((i) => i.trim());

  // Build wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'nttheader-wrapper-inner';

  // Logo
  const logo = document.createElement('a');
  logo.href = '/en-us/';
  logo.className = 'ntt-logo';
  logo.append(createOptimizedPicture(data.logo, 'NTT DATA Logo', false, [{ width: '750' }]));

  // Nav
  const nav = document.createElement('ul');
  nav.className = 'ntt-nav';
  navItems.forEach((item) => {
    const li = document.createElement('li');
    li.textContent = item;
    nav.append(li);
  });

  // Actions
  const actions = document.createElement('div');
  actions.className = 'ntt-actions';

  const lang = document.createElement('span');
  lang.className = 'ntt-lang';
  lang.textContent = data.lang;

  const search = document.createElement('span');
  search.className = 'ntt-search';
  search.textContent = 'Search';

  const contact = document.createElement('a');
  contact.className = 'ntt-contact';
  contact.href = data.contact;
  contact.textContent = 'Contact Us';

  const menu = document.createElement('span');
  menu.className = 'ntt-menu';
  menu.textContent = 'Menu';

  actions.append(lang, search, contact, menu);

  // Mobile nav
  const mobileNav = document.createElement('div');
  mobileNav.className = 'ntt-mobile-nav';

  navItems.forEach((item) => {
    const div = document.createElement('div');
    div.className = 'ntt-mobile-item';
    div.textContent = item;
    mobileNav.append(div);
  });

  menu.addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });

  // Mega menu container
  const mega = document.createElement('div');
  mega.className = 'ntt-mega';

  nav.querySelectorAll('li').forEach((li) => {
    li.addEventListener('mouseenter', () => {
      mega.classList.add('open');
      mega.textContent = li.textContent;
    });
    li.addEventListener('mouseleave', () => {
      mega.classList.remove('open');
    });
  });

  wrapper.append(logo, nav, actions, mobileNav, mega);

  block.replaceChildren(wrapper);
}
