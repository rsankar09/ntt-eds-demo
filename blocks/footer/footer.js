export default function decorate(block) {
  const rows = [...block.children];
  const data = {};

  rows.forEach((row) => {
    const p = row.querySelector('p');
    if (!p) return;
    const [key, value] = p.textContent.split('|').map((s) => s.trim());
    data[key.toLowerCase()] = value;
  });

  const col1 = data.column1.split(',').map(i => i.trim());
  const col2 = data.column2.split(',').map(i => i.trim());
  const col3 = data.column3.split(',').map(i => i.trim());
  const ctas = data.cta.split(',').map(i => i.trim());
  const legal = data.legal.split(',').map(i => i.trim());
  const socials = data.social.split(',').map(i => i.trim());

  const wrapper = document.createElement('div');
  wrapper.className = 'nttfooter-wrapper';

  // Build columns
  const nav = document.createElement('div');
  nav.className = 'nttfooter-columns';

  const makeCol = (items) => {
    const col = document.createElement('div');
    col.className = 'nttfooter-col';
    items.forEach((item) => {
      const a = document.createElement('a');
      a.href = '#';
      a.textContent = item;
      col.append(a);
    });
    return col;
  };

  nav.append(makeCol(col1));
  nav.append(makeCol(col2));
  nav.append(makeCol(col3));

  // CTA buttons
  const ctaWrap = document.createElement('div');
  ctaWrap.className = 'nttfooter-cta';
  ctas.forEach((item) => {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = item;
    a.className = 'nttfooter-cta-btn';
    ctaWrap.append(a);
  });

  // Social icons
  const socialWrap = document.createElement('div');
  socialWrap.className = 'nttfooter-social';
  socials.forEach((item) => {
    const span = document.createElement('span');
    span.className = 'nttfooter-social-icon';
    span.textContent = item;
    socialWrap.append(span);
  });

  // Legal links
  const legalWrap = document.createElement('div');
  legalWrap.className = 'nttfooter-legal';
  legal.forEach((item) => {
    const a = document.createElement('a');
    a.href = '#';
    a.textContent = item;
    legalWrap.append(a);
  });

  wrapper.append(nav, ctaWrap, socialWrap, legalWrap);
  block.replaceChildren(wrapper);
}
