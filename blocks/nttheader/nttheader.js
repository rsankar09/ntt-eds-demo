export default function decorate(block) {
    block.classList.add('header-wrapper');
  
    const logo = block.querySelector('img');
    logo.classList.add('header-logo');
  
    const navList = block.querySelector('ul');
    navList.classList.add('header-nav');
  
    [...navList.children].forEach((li) => {
      li.classList.add('header-nav-item');
      li.setAttribute('role', 'button');
    });
  
    const actions = block.querySelector('div:last-of-type');
    actions.classList.add('header-actions');
  
    actions.querySelector('.lang')?.classList.add('header-lang');
    actions.querySelector('.search')?.classList.add('header-search');
    actions.querySelector('.contact')?.classList.add('header-contact');
    actions.querySelector('.menu')?.classList.add('header-menu');
  
    // Mobile toggle
    actions.querySelector('.menu')?.addEventListener('click', () => {
      navList.classList.toggle('open');
    });
  }
  