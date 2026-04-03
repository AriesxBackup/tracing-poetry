/**
 * Tracing Poetry — Main Application
 * Getty Tracing Art-inspired landing with poem library
 * Depends on: poems.js, gsap.min.js, ScrollTrigger.min.js
 */
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // ========================
  // LANDING — FLOATING ARTWORKS (Getty style)
  // ========================
  const floatContainer = document.getElementById('landingFloat');

  const floatingItems = [
    // Top row — paintings and ghosts across the top
    { img: HERO_ARTS[0], w: 110, h: 140, x: '1%',  y: '2%' },
    { ghost: true,        w: 80,  h: 55,  x: '14%', y: '1%' },
    { img: POEMS[0].image, w: 155, h: 195, x: '18%', y: '8%', poem: 0 },
    { ghost: true,        w: 65,  h: 45,  x: '42%', y: '2%' },
    { img: HERO_ARTS[1], w: 130, h: 95,  x: '52%', y: '5%' },
    { ghost: true,        w: 55,  h: 70,  x: '72%', y: '1%' },
    { img: HERO_ARTS[2], w: 155, h: 110, x: '80%', y: '6%' },

    // Middle-left area
    { img: HERO_ARTS[3], w: 100, h: 130, x: '0%',  y: '32%' },
    { ghost: true,        w: 50,  h: 60,  x: '11%', y: '42%' },
    { img: POEMS[5].image, w: 140, h: 175, x: '15%', y: '52%', poem: 5 },

    // Middle-right area
    { img: HERO_ARTS[4], w: 145, h: 105, x: '85%', y: '28%' },
    { ghost: true,        w: 70,  h: 50,  x: '78%', y: '40%' },
    { img: POEMS[3].image, w: 165, h: 120, x: '65%', y: '48%', poem: 3 },

    // Bottom spread
    { img: HERO_ARTS[5], w: 90,  h: 115, x: '0%',  y: '72%' },
    { ghost: true,        w: 60,  h: 40,  x: '12%', y: '78%' },
    { img: HERO_ARTS[6], w: 130, h: 165, x: '25%', y: '70%' },
    { ghost: true,        w: 55,  h: 55,  x: '42%', y: '82%' },
    { img: HERO_ARTS[7], w: 120, h: 85,  x: '52%', y: '76%' },
    { ghost: true,        w: 70,  h: 50,  x: '68%', y: '85%' },
    { img: POEMS[7].image, w: 110, h: 140, x: '78%', y: '68%', poem: 7 },
    { ghost: true,        w: 45,  h: 60,  x: '92%', y: '78%' },

    // Extra scattered ghosts for density
    { ghost: true,        w: 90,  h: 60,  x: '35%', y: '3%' },
    { ghost: true,        w: 60,  h: 80,  x: '93%', y: '50%' },
    { ghost: true,        w: 50,  h: 35,  x: '60%', y: '90%' },
  ];

  floatingItems.forEach(item => {
    const el = document.createElement('div');
    el.className = item.ghost ? 'float-item float-item--ghost' : 'float-item float-item--painting';
    el.style.cssText = `left:${item.x};top:${item.y};width:${item.w}px;height:${item.h}px;`;

    if (!item.ghost) {
      const img = document.createElement('img');
      img.src = item.img;
      img.alt = '';
      img.loading = 'eager';
      el.appendChild(img);
      if (item.poem !== undefined) {
        el.addEventListener('click', () => openReader(item.poem));
      }
    }
    el.dataset.speed = (Math.random() * 25 + 8).toFixed(0);
    floatContainer.appendChild(el);
  });

  // ========================
  // GETTY-STYLE LANDING REVEAL
  // ========================
  // 1. Brand fades in, centered in the viewport (hold ~1.5s)
  // 2. Brand slides up to top + shrinks while full page fades in simultaneously
  // 3. Gentle drift begins after reveal completes

  document.body.classList.remove('is-loading');

  const brand = document.getElementById('landingBrand');
  const page  = document.getElementById('landingPage');
  const floats = floatContainer.querySelectorAll('.float-item');

  const brandRect = brand.getBoundingClientRect();
  const targetY   = 28;
  const centerY   = brandRect.top;
  const deltaY    = targetY - centerY;

  const masterTL = gsap.timeline();

  // Phase 1 — brand fades in at dead center (0.3s → visible, hold until ~1.6s)
  masterTL.to(brand, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0.3);

  // Phase 2 — brand slides up to top + page content fades in simultaneously
  masterTL.to(brand, {
    y: deltaY,
    fontSize: 'clamp(1.1rem, 2vw, 1.5rem)',
    duration: 1.2,
    ease: 'power3.inOut'
  }, 1.8);

  masterTL.to(page, {
    opacity: 1,
    duration: 1.2,
    ease: 'power2.out'
  }, 1.8);

  // Phase 3 — gentle drift after reveal settles
  masterTL.call(() => {
    floats.forEach(el => {
      const drift = (Math.random() - 0.5) * 12;
      gsap.to(el, {
        x: drift, y: drift * 0.4,
        duration: 5 + Math.random() * 4,
        repeat: -1, yoyo: true, ease: 'sine.inOut'
      });

      gsap.to(el, {
        yPercent: -parseInt(el.dataset.speed || '15'),
        ease: 'none',
        scrollTrigger: {
          trigger: '.landing',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5
        }
      });
    });
  }, null, 3.5);

  // ========================
  // NARRATIVE SECTION
  // ========================
  const featuredPoem = POEMS[0];
  const narrativePainting = document.getElementById('narrativePainting');
  const narrativeTitle = document.getElementById('narrativeTitle');
  const narrativeCaption = document.getElementById('narrativeCaption');
  const narrativeTexts = document.getElementById('narrativeTexts');

  narrativePainting.style.backgroundImage = `url('${featuredPoem.image}')`;
  narrativeTitle.textContent = `${featuredPoem.painting}, ${featuredPoem.artist}`;
  narrativeCaption.textContent = `Associated with "${featuredPoem.title}" by ${featuredPoem.author}`;

  const storyTexts = [
    'Studying a poem\'s trajectory — from the moment it\'s written, then as it moves between new <em>readers</em> and <em>cultures</em>',
    'and eventually reaches its present place in the <em>canon</em> — is the literary researcher\'s joy.',
    'Through centuries of verse, we can see that poets <em>captured</em> what painters <em>rendered</em> — the eternal human condition.',
  ];

  storyTexts.forEach(text => {
    const p = document.createElement('p');
    p.className = 'narrative__text';
    p.innerHTML = text;
    narrativeTexts.appendChild(p);
  });

  gsap.fromTo(narrativePainting,
    { opacity: 0, y: 60 },
    { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out',
      scrollTrigger: { trigger: narrativePainting, start: 'top 85%', once: true } }
  );

  gsap.fromTo(narrativeTitle,
    { opacity: 0, y: 20 },
    { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: narrativeTitle, start: 'top 90%', once: true } }
  );

  gsap.fromTo(narrativeCaption,
    { opacity: 0, y: 15 },
    { opacity: 1, y: 0, duration: 0.8, delay: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: narrativeCaption, start: 'top 92%', once: true } }
  );

  document.querySelectorAll('.narrative__text').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', once: true } }
    );
  });

  // ========================
  // COLLECTION — AUTO LAYOUT
  // ========================
  const gridEl = document.getElementById('poemGrid');
  const sizes = ['md', 'sm', 'lg', 'lg', 'sm', 'md', 'md', 'md', 'sm', 'md', 'xl', 'sm'];
  const offsets = ['', 'down2', 'up', '', 'down', 'up', '', '', 'down2', 'up', 'down', ''];
  const rowStyles = [
    'scatter-row scatter-row--spread',
    'scatter-row scatter-row--offset',
    'scatter-row scatter-row--right',
    'scatter-row scatter-row--spread',
  ];
  const editorialTexts = [
    'the <em>World</em><br>of <em>Poetry</em>',
    'Words that <em>endure</em> across centuries,<br>speaking to every generation.',
    'Through it, we can see<br>that poets <em>captured</em> what<br>painters <em>rendered.</em>',
  ];
  const ghostSizes = ['xs', 'sm', 'md', 'lg'];

  function createGhost(size) {
    const el = document.createElement('div');
    el.className = `ghost ghost--${size}`;
    el.dataset.parallax = (Math.random() * 20 + 5).toFixed(0);
    return el;
  }

  function createCard(poem, index, size, offset, landscape) {
    const card = document.createElement('div');
    card.className = [
      'poem-card', `poem-card--${size}`,
      offset ? `poem-card--${offset}` : '',
      landscape ? 'poem-card--landscape' : ''
    ].filter(Boolean).join(' ');
    card.dataset.index = index;
    card.dataset.parallax = (Math.random() * 30 + 10).toFixed(0);
    card.innerHTML = `
      <div class="poem-card__frame">
        <div class="poem-card__img" style="background-image:url('${poem.image}')"></div>
      </div>
      <div class="poem-card__overlay">
        <span class="poem-card__number">${String(index + 1).padStart(2, '0')} / ${poem.category.toUpperCase()}</span>
        <h3 class="poem-card__title">${poem.title}</h3>
        <span class="poem-card__author">${poem.author}</span>
      </div>`;
    card.addEventListener('click', () => openReader(index));
    return card;
  }

  function createSolo(poem, index) {
    const wrap = document.createElement('div');
    wrap.className = 'scatter-solo';
    const card = document.createElement('div');
    card.className = 'scatter-solo__card poem-card poem-card--xl';
    card.dataset.index = index;
    card.dataset.parallax = '12';
    card.innerHTML = `
      <div class="poem-card__frame">
        <div class="poem-card__img poem-card__img--landscape" style="background-image:url('${poem.image}')"></div>
      </div>
      <div class="scatter-solo__meta">
        <span class="poem-card__number">${String(index + 1).padStart(2, '0')} / ${poem.category.toUpperCase()}</span>
        <h3 class="poem-card__title">${poem.title}</h3>
        <span class="poem-card__author">${poem.author}</span>
      </div>`;
    card.addEventListener('click', () => openReader(index));
    wrap.appendChild(card);
    return wrap;
  }

  function addEditorialText(text) {
    const el = document.createElement('div');
    el.className = 'scatter-text';
    el.innerHTML = `<h3 class="scatter-text__heading">${text}</h3>`;
    gridEl.appendChild(el);
  }

  let poemIdx = 0;
  let rowIdx = 0;
  let textIdx = 0;

  while (poemIdx < POEMS.length) {
    const poemsInRow = Math.min(3, POEMS.length - poemIdx);
    const row = document.createElement('div');
    row.className = rowStyles[rowIdx % rowStyles.length];

    row.appendChild(createGhost(ghostSizes[Math.floor(Math.random() * ghostSizes.length)]));

    for (let j = 0; j < poemsInRow; j++) {
      const i = poemIdx + j;
      const size = sizes[i % sizes.length];
      const offset = offsets[i % offsets.length];
      const landscape = size === 'lg' && j === poemsInRow - 1;
      row.appendChild(createCard(POEMS[i], i, size, offset, landscape));
      if (j < poemsInRow - 1) {
        row.appendChild(createGhost(ghostSizes[Math.floor(Math.random() * ghostSizes.length)]));
      }
    }

    row.appendChild(createGhost(ghostSizes[Math.floor(Math.random() * ghostSizes.length)]));
    gridEl.appendChild(row);
    poemIdx += poemsInRow;
    rowIdx++;

    if (textIdx < editorialTexts.length && poemIdx < POEMS.length) {
      addEditorialText(editorialTexts[textIdx]);
      textIdx++;
    }
  }

  // ========================
  // POEM READER
  // ========================
  const readerEl = document.getElementById('reader');
  let currentPoem = 0;

  function openReader(index) {
    currentPoem = index;
    const poem = POEMS[index];

    document.getElementById('readerNumber').textContent =
      `${String(index + 1).padStart(2, '0')} / ${String(POEMS.length).padStart(2, '0')}`;
    document.getElementById('readerCategory').textContent = poem.category;
    document.getElementById('readerTitle').textContent = poem.title;
    document.getElementById('readerAuthor').textContent = poem.author;
    document.getElementById('readerPainting').style.backgroundImage = `url('${poem.image}')`;
    document.getElementById('readerAttribution').textContent = `${poem.painting} \u2014 ${poem.artist}`;

    const bodyEl = document.getElementById('readerBody');
    const stanzas = Array.isArray(poem.body) ? poem.body : poem.body.split('\n\n');
    bodyEl.innerHTML = stanzas.map(s => `<span class="stanza">${s}</span>`).join('');

    readerEl.classList.add('open');
    document.body.style.overflow = 'hidden';
    readerEl.scrollTop = 0;

    gsap.fromTo('#readerPainting', { scale: 1.1 }, { scale: 1, duration: 8, ease: 'power1.out' });
    gsap.fromTo(bodyEl.querySelectorAll('.stanza'),
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.5, stagger: 0.12, delay: 0.4, ease: 'power2.out' }
    );
  }

  function closeReader() {
    readerEl.classList.remove('open');
    document.body.style.overflow = '';
  }

  document.getElementById('readerClose').addEventListener('click', closeReader);
  readerEl.addEventListener('click', e => { if (e.target === readerEl) closeReader(); });
  document.getElementById('readerPrev').addEventListener('click', () =>
    openReader((currentPoem - 1 + POEMS.length) % POEMS.length));
  document.getElementById('readerNext').addEventListener('click', () =>
    openReader((currentPoem + 1) % POEMS.length));

  document.addEventListener('keydown', e => {
    if (!readerEl.classList.contains('open')) return;
    if (e.key === 'Escape') closeReader();
    if (e.key === 'ArrowLeft') openReader((currentPoem - 1 + POEMS.length) % POEMS.length);
    if (e.key === 'ArrowRight') openReader((currentPoem + 1) % POEMS.length);
  });

  // ========================
  // SCROLL ANIMATIONS
  // ========================
  document.querySelectorAll('.fade-up').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 92%', once: true } }
    );
  });

  document.querySelectorAll('.scatter-text').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
    );
  });

  document.querySelectorAll('.poem-card, .ghost').forEach(el => {
    const speed = parseInt(el.dataset.parallax || '12', 10);
    if (el.classList.contains('poem-card')) {
      gsap.fromTo(el,
        { opacity: 0, y: 70 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
          scrollTrigger: { trigger: el, start: 'top 95%', once: true } }
      );
    }
    gsap.to(el, {
      yPercent: -speed,
      ease: 'none',
      scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: 1.5 }
    });
  });

  document.querySelectorAll('.scatter-solo').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 90%', once: true } }
    );
  });

  // Hide landing hint on scroll
  const hintEl = document.querySelector('.landing__hint');
  if (hintEl) {
    ScrollTrigger.create({
      trigger: '.narrative',
      start: 'top 80%',
      once: true,
      onEnter: () => gsap.to(hintEl, { opacity: 0, duration: 0.4 })
    });
  }
});
