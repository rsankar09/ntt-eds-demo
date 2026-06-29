export default function decorate(block) {
  const rows = [...block.querySelectorAll('tr')];

  const logoUrl = rows[1]?.cells[0]?.textContent.trim();
  const navItems = rows[2]?.cells[0]?.textContent.split(',').map(i => i.trim());
  const lang = rows[3]?.cells[0]?.textContent.trim();
  const contactUrl = rows[4]?.cells[0]?.textContent.trim();

  block.innerHTML = `
    <div class="header-top">
      <a href="/en-us/" class="header-logo">
        <img src="${logoUrl}" alt="NTT DATA Logo">
      </a>

      <ul class="header-nav">
        ${navItems.map(i => `<li>${i}</li>`).join('')}
      </ul>

      <div class="header-actions">
        <span class="header-lang">${lang}</span>
        <span class="header-search">Search</span>
        <a href="${contactUrl}" class="header-contact">Contact Us</a>
        <span class="header-menu">Menu</span>
      </div>
    </div>

    <div class="header-mobile-nav"></div>
    <div class="header-mega"></div>
  `;

  // Mobile nav
  const mobileNav = block.querySelector('.header-mobile-nav');
  navItems.forEach(item => {
    const div = document.createElement('div');
    div.className = 'mobile-item';
    div.textContent = item;
    mobileNav.appendChild(div);
  });

  block.querySelector('.header-menu').addEventListener('click', () => {
    mobileNav.classList.toggle('open');
  });
}
