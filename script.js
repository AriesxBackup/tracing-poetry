/**
 * Tracing Poetry — Main Application
 * Depends on: poems.js (POEMS, HERO_ARTS, HERO_BACKGROUNDS)
 *             gsap.min.js, ScrollTrigger.min.js
 */
document.addEventListener('DOMContentLoaded', () => {
  gsap.registerPlugin(ScrollTrigger);

  // ========================
  // FILMSTRIP PRELOADER
  // ========================

  const filmstripEl = document.getElementById('filmstrip');
  const preloaderEl = document.getElementById('preloader');

  POEMS.forEach(poem => {
    const strip = document.createElement('div');
    strip.className = 'filmstrip__strip';
    strip.style.backgroundImage = `url('${poem.image}')`;
    filmstripEl.appendChild(strip);
  });

  const strips = filmstripEl.querySelectorAll('.filmstrip__strip');
  const stripCount = strips.length;
  const stripCenter = (stripCount - 1) / 2;
  let filmstripReady = false;
  let imagesLoaded = 0;

  strips.forEach(strip => {
    const url = strip.style.backgroundImage.slice(5, -2);
    const img = new Image();
    img.onload = img.onerror = () => {
      imagesLoaded++;
      if (imagesLoaded >= stripCount) startFilmstrip();
    };
    img.src = url;
  });

  setTimeout(() => { if (!filmstripReady) startFilmstrip(); }, 2500);

  function startFilmstrip() {
    if (filmstripReady) return;
    filmstripReady = true;

    // Phase 1: Position strips in a wide concave arc, start far away
    strips.forEach((strip, i) => {
      const n = stripCenter === 0 ? 0 : (i - stripCenter) / stripCenter;
      const x = (i - stripCenter) * 58;
      const rotY = -n * 28;
      const z = -(n * n) * 110;
      // Start pushed further back and transparent
      strip.style.transform = `translateX(${x}px) rotateY(${rotY}deg) translateZ(${z - 80}px) scale(0.85)`;
    });

    // Phase 2: Stagger in from edges, pull forward into final arc position
    strips.forEach((strip, i) => {
      const n = stripCenter === 0 ? 0 : (i - stripCenter) / stripCenter;
      const x = (i - stripCenter) * 58;
      const rotY = -n * 28;
      const z = -(n * n) * 110;
      const edgeDelay = Math.abs(n) * 0.06;

      gsap.to(strip, {
        opacity: 1,
        duration: 0.7,
        delay: 0.1 + edgeDelay,
        ease: 'power2.out'
      });

      gsap.to(strip, {
        keyframes: [
          { transform: `translateX(${x}px) rotateY(${rotY}deg) translateZ(${z}px) scale(1)`, duration: 0.8, ease: 'power3.out' },
        ],
        delay: 0.1 + edgeDelay,
      });
    });

    // Phase 3: Hold for 2s, then dramatic exit — fan out like pages
    setTimeout(() => {
      strips.forEach((strip, i) => {
        const n = stripCenter === 0 ? 0 : (i - stripCenter) / stripCenter;
        const exitRotY = n * 60;
        const exitX = n * 300;

        gsap.to(strip, {
          x: exitX,
          rotationY: exitRotY,
          scale: 1.3,
          opacity: 0,
          y: -40,
          duration: 1.4,
          delay: (1 - Math.abs(n)) * 0.1,
          ease: 'power3.in'
        });
      });

      // Fade out brand text
      const brandEl = document.querySelector('.preloader__brand');
      if (brandEl) gsap.to(brandEl, { opacity: 0, y: -20, duration: 0.6, delay: 0.3, ease: 'power2.in' });

      setTimeout(() => {
        preloaderEl.classList.add('done');
        document.body.classList.remove('is-loading');
      }, 1300);
    }, 2600);
  }

  // ========================
  // HERO BACKGROUND CYCLING
  // ========================

  const heroBgEl = document.getElementById('heroBg');
  HERO_BACKGROUNDS.forEach((url, i) => {
    const slide = document.createElement('div');
    slide.className = 'hero__bg-slide' + (i === 0 ? ' active' : '');
    slide.style.backgroundImage = `url('${url}')`;
    heroBgEl.appendChild(slide);
  });

  const heroSlides = heroBgEl.querySelectorAll('.hero__bg-slide');
  let heroIndex = 0;
  setInterval(() => {
    heroSlides[heroIndex].classList.remove('active');
    heroIndex = (heroIndex + 1) % heroSlides.length;
    heroSlides[heroIndex].classList.add('active');
  }, 5000);

  // ========================
  // FLOATING HERO ART
  // ========================

  const floatContainer = document.getElementById('heroFloat');
  if (floatContainer) {
    const positions = [
      { img: HERO_ARTS[0], w: 130, h: 170, x: '6%',  y: '10%' },
      { img: HERO_ARTS[1], w: 115, h: 150, x: '80%', y: '8%' },
      { img: HERO_ARTS[2], w: 160, h: 115, x: '72%', y: '60%' },
      { img: HERO_ARTS[3], w: 100, h: 135, x: '4%',  y: '62%' },
      { img: HERO_ARTS[4], w: 140, h: 100, x: '84%', y: '36%' },
      { img: HERO_ARTS[5], w: 95,  h: 125, x: '20%', y: '70%' },
      { ghost: true, w: 70, h: 55, x: '52%', y: '5%' },
      { ghost: true, w: 45, h: 60, x: '14%', y: '40%' },
      { ghost: true, w: 80, h: 60, x: '58%', y: '78%' },
      { ghost: true, w: 55, h: 45, x: '90%', y: '20%' },
    ];

    positions.forEach(item => {
      const el = document.createElement('div');
      el.className = item.ghost ? 'float-item float-item--ghost' : 'float-item float-item--painting';
      el.style.cssText = `left:${item.x};top:${item.y};width:${item.w}px;height:${item.h}px;`;
      if (!item.ghost) {
        const img = document.createElement('img');
        img.src = item.img;
        img.alt = '';
        el.appendChild(img);
      }
      el.dataset.speed = (Math.random() * 25 + 8).toFixed(0);
      floatContainer.appendChild(el);
    });

    setTimeout(() => {
      const floats = floatContainer.querySelectorAll('.float-item');
      gsap.to(floats, { opacity: 1, duration: 1.2, stagger: 0.12, delay: 0.3, ease: 'power2.out' });
      floats.forEach(el => {
        const drift = (Math.random() - 0.5) * 18;
        gsap.to(el, { x: drift, y: drift * 0.6, duration: 4 + Math.random() * 3, repeat: -1, yoyo: true, ease: 'sine.inOut' });
        gsap.to(el, {
          yPercent: -parseInt(el.dataset.speed || '15'),
          ease: 'none',
          scrollTrigger: { trigger: '.collection-intro', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
        });
      });
    }, 3800);
  }

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

  // Auto-generate rows: 3 poems per row, with editorial text + solo features interspersed
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

    // Insert editorial text after every 3 poems (if available)
    if (textIdx < editorialTexts.length && poemIdx < POEMS.length) {
      addEditorialText(editorialTexts[textIdx]);
      textIdx++;
    }

    // Insert a solo hero feature for the 7th poem (or every 7th)
    if (poemIdx === 7 && poemIdx < POEMS.length) {
      // already placed poem 6 (index 6) in the row, feature it as solo too? skip for now
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

  gsap.to('.hero__bg', {
    yPercent: 20, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

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
      yPercent: -speed, ease: 'none',
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
});
