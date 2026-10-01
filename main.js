/* Shanel Foods — shared site behaviour (uses products.js) */

const TYPE_LABELS = { veg: 'Veg', egg: 'Contains egg', nonveg: 'Non-veg' };

function waLink(message) {
  return 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(message);
}

function enquiryMessage(p) {
  if (p.enquiry) return p.enquiry;
  return "Hi Shanel Foods! I'd like to enquire about the " + p.name + '.';
}

const WA_ICON = '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

function productMedia(p, cls) {
  if (p.image) return '<img class="' + cls + '" src="' + p.image + '" alt="' + p.name + ' by Shanel Foods" loading="lazy">';
  return '<div class="' + cls + ' media-icon" role="img" aria-label="' + p.name + '"><span>' + (p.icon || '🥗') + '</span></div>';
}

function typeBadge(p) {
  return '<span class="type-badge type-' + p.type + '"><i></i>' + TYPE_LABELS[p.type] + '</span>';
}

function productCard(p) {
  return (
    '<article class="pcard reveal" data-category="' + p.category + '">' +
      '<button class="pcard-media" type="button" data-open="' + p.id + '" aria-label="View details of ' + p.name + '">' +
        productMedia(p, 'pcard-img') +
        (p.badge ? '<span class="pcard-badge">' + p.badge + '</span>' : '') +
        '<span class="pcard-view">View details</span>' +
      '</button>' +
      '<div class="pcard-body">' +
        '<div class="pcard-meta"><span class="pcard-cat">' + CATEGORIES[p.category] + '</span>' + typeBadge(p) + '</div>' +
        '<h3 class="pcard-name">' + p.name + '</h3>' +
        '<p class="pcard-tagline">' + p.tagline + '</p>' +
        (p.rotation
          ? '<p class="rotation-label">Rotates daily between</p>' +
            '<ul class="pcard-chips rotation">' + p.rotation.map(c => '<li>' + c + '</li>').join('') + '</ul>'
          : '<ul class="pcard-chips">' + p.contents.slice(0, 3).map(c => '<li>' + c + '</li>').join('') +
            (p.contents.length > 3 ? '<li class="more">+' + (p.contents.length - 3) + ' more</li>' : '') + '</ul>') +
        '<a class="btn btn-wa btn-block" href="' + waLink(enquiryMessage(p)) + '" target="_blank" rel="noopener">' + WA_ICON + 'Enquire on WhatsApp</a>' +
      '</div>' +
    '</article>'
  );
}

/* ── Product grids ── */
function renderProducts() {
  document.querySelectorAll('[data-products]').forEach(grid => {
    const mode = grid.dataset.products;
    const list = mode === 'featured' ? PRODUCTS.filter(p => p.featured) : PRODUCTS;
    grid.innerHTML = list.map(productCard).join('');
  });

  const chips = document.querySelector('[data-filter-chips]');
  if (chips) {
    const counts = PRODUCTS.reduce((acc, p) => (acc[p.category] = (acc[p.category] || 0) + 1, acc), {});
    chips.innerHTML =
      '<button class="chip active" data-filter="all">All <span>' + PRODUCTS.length + '</span></button>' +
      Object.keys(CATEGORIES).filter(k => counts[k]).map(k =>
        '<button class="chip" data-filter="' + k + '">' + CATEGORIES[k] + ' <span>' + counts[k] + '</span></button>'
      ).join('');
    chips.addEventListener('click', e => {
      const btn = e.target.closest('.chip');
      if (!btn) return;
      chips.querySelectorAll('.chip').forEach(c => c.classList.toggle('active', c === btn));
      const f = btn.dataset.filter;
      document.querySelectorAll('[data-products] .pcard').forEach(card => {
        card.hidden = f !== 'all' && card.dataset.category !== f;
      });
    });
  }
}

/* ── Product detail dialog ── */
function setupDialog() {
  const dialog = document.createElement('dialog');
  dialog.className = 'pdialog';
  document.body.appendChild(dialog);

  document.addEventListener('click', e => {
    const opener = e.target.closest('[data-open]');
    if (!opener) return;
    const p = PRODUCTS.find(x => x.id === opener.dataset.open);
    if (!p) return;
    dialog.innerHTML =
      '<div class="pdialog-inner">' +
        '<button class="pdialog-close" type="button" aria-label="Close">&times;</button>' +
        '<div class="pdialog-media">' + productMedia(p, 'pdialog-img') + '</div>' +
        '<div class="pdialog-body">' +
          '<div class="pcard-meta"><span class="pcard-cat">' + CATEGORIES[p.category] + '</span>' + typeBadge(p) + '</div>' +
          '<h2>' + p.name + '</h2>' +
          '<p class="pdialog-tagline">' + p.tagline + '</p>' +
          '<p>' + p.description + '</p>' +
          (p.rotation ? '<h4>Daily rotating menu</h4><ul class="pcard-chips rotation">' + p.rotation.map(c => '<li>' + c + '</li>').join('') + '</ul>' : '') +
          '<h4>What\'s inside</h4>' +
          '<ul class="pdialog-list">' + p.contents.map(c => '<li>' + c + '</li>').join('') + '</ul>' +
          '<p class="pdialog-note">' + (p.rotation ? 'Ask us on WhatsApp for today\'s menu. ' : 'Contents may vary slightly with the season. ') + 'Daily, weekly & monthly plans available.</p>' +
          '<a class="btn btn-wa btn-block" href="' + waLink(enquiryMessage(p)) + '" target="_blank" rel="noopener">' + WA_ICON + 'Enquire on WhatsApp</a>' +
        '</div>' +
      '</div>';
    dialog.showModal();
  });

  dialog.addEventListener('click', e => {
    if (e.target === dialog || e.target.closest('.pdialog-close')) dialog.close();
  });
}

/* ── Hero card stack ── */
function setupHeroStack() {
  const stack = document.querySelector('[data-hero-stack]');
  if (!stack) return;
  const items = PRODUCTS.filter(p => p.featured && p.image);
  stack.innerHTML = items.map((p, i) =>
    '<figure class="stack-card" data-pos="' + Math.min(i, 3) + '">' +
      '<img src="' + p.image + '" alt="' + p.name + '"' + (i > 2 ? ' loading="lazy"' : '') + '>' +
      '<figcaption><span>' + CATEGORIES[p.category] + '</span>' + p.name + '</figcaption>' +
    '</figure>'
  ).join('');

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = [...stack.children];
  let front = 0;
  const cycle = () => {
    front = (front + 1) % cards.length;
    cards.forEach((card, i) => {
      const pos = (i - front + cards.length) % cards.length;
      card.dataset.pos = Math.min(pos, 3);
    });
  };
  let timer = setInterval(cycle, 3200);
  stack.addEventListener('click', () => { clearInterval(timer); cycle(); timer = setInterval(cycle, 3200); });
}

/* ── Marquee of product names ── */
function setupMarquee() {
  document.querySelectorAll('[data-marquee]').forEach(track => {
    const row = PRODUCTS.map(p => '<span>' + p.name + '</span><i>✦</i>').join('');
    track.innerHTML = row + row;
  });
}

/* ── WhatsApp enquiry builder ── */
function setupEnquiryForm() {
  document.querySelectorAll('[data-enquiry-form]').forEach(form => {
    const select = form.querySelector('[name="product"]');
    Object.keys(CATEGORIES).forEach(cat => {
      const group = document.createElement('optgroup');
      group.label = CATEGORIES[cat];
      PRODUCTS.filter(p => p.category === cat).forEach(p => group.appendChild(new Option(p.name, p.name)));
      if (group.children.length) select.appendChild(group);
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      const d = new FormData(form);
      const lines = ['Hi Shanel Foods! I have an enquiry.'];
      if (d.get('name')) lines.push('Name: ' + d.get('name'));
      lines.push('Interested in: ' + (d.get('product') || 'Not sure yet — please suggest'));
      if (d.get('plan')) lines.push('Plan: ' + d.get('plan'));
      if (d.get('area')) lines.push('Area: ' + d.get('area'));
      if (d.get('note')) lines.push('Note: ' + d.get('note'));
      window.open(waLink(lines.join('\n')), '_blank', 'noopener');
    });
  });
}

/* ── Header, mobile nav, scroll reveal, FAQ ── */
function setupChrome() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 24);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (toggle) toggle.addEventListener('click', () => {
    const open = header.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open);
  });

  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const reveals = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { reveals.forEach(el => el.classList.add('visible')); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); io.unobserve(entry.target); }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  reveals.forEach(el => io.observe(el));
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupDialog();
  setupHeroStack();
  setupMarquee();
  setupEnquiryForm();
  setupChrome();
});
