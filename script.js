/**
 * Tracing Poetry — Main Application
 * Getty Tracing Art-inspired landing with poem library
 * Depends on: poems.js, gsap.min.js, ScrollTrigger.min.js
 */
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // ========================
  // INTRO — Getty-style phased reveal
  // ========================
  const introEl = document.getElementById('intro');
  const introBrand = document.getElementById('introBrand');
  const introTitle = document.getElementById('introTitle');
  const brandText = introBrand.querySelector('.intro__brand-text');
  const h1El = introTitle.querySelector('.intro__h1');

  let introComplete = false;

  const introTL = gsap.timeline({
    onComplete: () => {
      if (introComplete) return;
      introComplete = true;
      introEl.classList.add('done');
      document.body.classList.remove('is-loading');
      animateLanding();
    }
  });

  // Phase 1: "Tracing Poetry" brand fades in centered
  introTL.to(brandText, { opacity: 1, duration: 1, ease: 'power2.out', delay: 0.3 });

  // Phase 2: Brand fades out, big "Tracing Poetry" title scales up
  introTL.to(brandText, { opacity: 0, duration: 0.5, ease: 'power2.in' }, '+=0.8');
  introTL.to(introTitle, { opacity: 1, duration: 0.01 }, '-=0.1');
  introTL.fromTo(h1El,
    { opacity: 0, scale: 0.85, y: 20 },
    { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'power3.out' },
    '-=0.1'
  );

  // Phase 3: Title holds, then the whole intro dissolves away revealing the landing
  introTL.to(introEl, {
    opacity: 0,
    duration: 0.8,
    ease: 'power2.inOut',
    delay: 0.9
  });

  setTimeout(() => {
    if (!introComplete) {
      introComplete = true;
      introEl.classList.add('done');
      document.body.classList.remove('is-loading');
      animateLanding();
    }
  }, 6000);

  // ========================
  // LANDING — FLOATING ARTWORKS (Getty style)
  // ========================
  const floatContainer = document.getElementById('landingFloat');

  const floatingItems = [
    { img: HERO_ARTS[0], w: 140, h: 180, x: '3%',  y: '8%' },
    { img: HERO_ARTS[1], w: 120, h: 155, x: '82%', y: '5%' },
    { img: HERO_ARTS[2], w: 170, h: 120, x: '70%', y: '55%' },
    { img: HERO_ARTS[3], w: 105, h: 140, x: '2%',  y: '58%' },
    { img: HERO_ARTS[4], w: 150, h: 105, x: '86%', y: '30%' },
    { img: HERO_ARTS[5], w: 100, h: 130, x: '18%', y: '68%' },
    { img: POEMS[0].image, w: 165, h: 210, x: '22%', y: '12%', poem: 0 },
    { img: POEMS[3].image, w: 195, h: 140, x: '65%', y: '70%', poem: 3 },
    { ghost: true, w: 80, h: 55,  x: '55%', y: '3%' },
    { ghost: true, w: 50, h: 65,  x: '12%', y: '38%' },
    { ghost: true, w: 90, h: 65,  x: '52%', y: '82%' },
    { ghost: true, w: 60, h: 45,  x: '92%', y: '18%' },
    { ghost: true, w: 45, h: 50,  x: '35%', y: '80%' },
    { ghost: true, w: 70, h: 50,  x: '78%', y: '88%' },
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

  function animateLanding() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // Header and nav appear
    tl.to('.landing__brand', { opacity: 1, duration: 0.8, delay: 0.1 })
      .to('.landing__nav-link', { opacity: 1, duration: 0.6, stagger: 0.08 }, '-=0.4');

    // Floating artworks scatter in from random positions (Getty-style)
    const floats = floatContainer.querySelectorAll('.float-item');
    floats.forEach((el, i) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 120 + Math.random() * 200;
      const startX = Math.cos(angle) * dist;
      const startY = Math.sin(angle) * dist;
      const delay = 0.15 + i * 0.06 + Math.random() * 0.15;

      gsap.fromTo(el,
        { opacity: 0, x: startX, y: startY, scale: 0.7 },
        { opacity: 1, x: 0, y: 0, scale: 1, duration: 1.4, delay, ease: 'power3.out' }
      );
    });

    // Center text appears after images start scattering
    tl.to('.landing__eyebrow', { opacity: 1, duration: 0.8 }, '+=0.3')
      .fromTo('.landing__heading',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 1 }, '-=0.4'
      )
      .to('.landing__scroll', { opacity: 1, duration: 0.6 }, '-=0.3')
      .to('.landing__hint', { opacity: 1, duration: 0.5 }, '-=0.2');

    // Gentle continuous drift for floating items
    setTimeout(() => {
      floats.forEach(el => {
        const drift = (Math.random() - 0.5) * 14;
        gsap.to(el, {
          x: drift, y: drift * 0.5,
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
    }, 2000);
  }

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
