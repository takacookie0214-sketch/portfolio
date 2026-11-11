/* =========================================================
   Nagao Takahiro — Portfolio
   Vanilla JS SPA: hash router + cinematic transitions
   ========================================================= */
(() => {
  'use strict';

  const S = window.SITE;
  const app = document.getElementById('app');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EASE = 'cubic-bezier(0.76, 0, 0.24, 1)';

  /* ---------- helpers ---------- */
  const esc = (s = '') =>
    String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = (n) => String(n).padStart(2, '0');
  const wait = (ms) => new Promise((r) => setTimeout(r, reduced ? 0 : ms));
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  const img = (name, alt = '', { sizes = '100vw', eager = false, cls = '' } = {}) =>
    `<img class="${cls}" src="assets/img/${name}.webp" srcset="assets/img/${name}-s.webp 900w, assets/img/${name}.webp 2000w" sizes="${sizes}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async" />`;

  /* 1文字ずつ下からせり上がるテキスト */
  const split = (text, delay = 0) =>
    Array.from(text)
      .map((ch, i) =>
        ch === ' '
          ? '<span class="split"><span>&nbsp;</span></span>'
          : `<span class="split"><span style="--i:${i};--d:${delay}ms">${esc(ch)}</span></span>`
      )
      .join('');


  /* ロゴの線画（たかのキャラ）。k で線の太さを調整、pathLength=1 で描画アニメ用 */
  const LOGO = '<path d="M168 200 C150 175 140 150 146 125 C156 82 200 48 258 42 C310 38 352 58 378 86 C398 108 404 140 400 168 C397 186 392 198 386 206"/><path d="M168 200 C190 186 220 180 250 184 C290 189 320 196 350 208"/><path d="M182 162 L194 190 M226 166 L234 184 M266 172 L280 187 M308 166 L320 182"/><path d="M328 24 L333 46 L350 34"/><path d="M168 202 C168 230 176 248 196 258 L214 264"/><path d="M350 214 C352 236 340 254 322 264"/><path d="M352 210 C376 200 392 232 364 242"/><circle cx="364" cy="249" r="4" stroke-width="4"/><path d="M216 205 L216 213 M270 206 L270 214" stroke-width="8"/><path d="M239 228 L246 228" stroke-width="5"/><path d="M190 224 L196 216 M198 226 L204 218 M206 228 L212 220 M284 226 L290 218 M292 228 L298 220 M300 230 L306 222" stroke-width="4"/><path d="M66 252 L232 262 Q240 263 241 271 L247 352 Q247 362 238 362 L74 360 Q66 360 66 352 L60 260 Q59 251 66 252 Z"/><path d="M126 330 L125 310 Q140 307 141 315 Q141 323 126 323 M162 312 Q148 309 148 320 Q149 330 162 327" stroke-width="5"/><path d="M140 362 L143 380 M92 381 L192 385 L190 394 L94 391 Z"/><path d="M210 384 L304 390 L322 402 L218 402 Z"/><path d="M228 394 L304 397" stroke-width="4"/><path d="M288 380 Q296 362 318 368 Q332 376 322 388"/><path d="M243 282 L276 300 L346 262"/><path d="M346 262 C384 276 404 320 402 396"/><path d="M326 360 Q352 366 358 390"/><path d="M300 300 l5 6 l5 -6 M332 292 l5 6 l5 -6 M362 312 l5 6 l5 -6 M318 332 l5 6 l5 -6 M372 344 l5 6 l5 -6 M288 348 l5 6 l5 -6" stroke-width="4"/><path d="M258 402 L440 418"/><path d="M37 210 Q40 224 54 227 Q40 230 37 244 Q34 230 20 227 Q34 224 37 210 Z" stroke-width="5"/><path d="M30 248 Q32 256 40 258 Q32 260 30 268 Q28 260 20 258 Q28 256 30 248 Z" stroke-width="4"/><path d="M436 354 L440 376 M447 352 L448 366" stroke-width="5"/>';
  const logoSVG = (k = 1, cls = '') =>
    `<svg class="${cls}" xmlns="http://www.w3.org/2000/svg" viewBox="14 12 444 414" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="${7 * k}" aria-hidden="true">` +
    LOGO.replace(/stroke-width="([\d.]+)"/g, (_, w) => `stroke-width="${w * k}"`).replace(/<(path|circle)\b/g, '<$1 pathLength="1"') +
    '</svg>';

  const findWork = (slug) => S.works.findIndex((w) => w.slug === slug);

  /* ---------- views ---------- */
  const footer = () => {
    const c = S.contact || {};
    const links = [
      c.email && `<a href="mailto:${esc(c.email)}" data-cursor="hover">Mail</a>`,
      c.x && `<a href="${esc(c.x)}" target="_blank" rel="noopener" data-cursor="hover">X</a>`,
      c.instagram && `<a href="${esc(c.instagram)}" target="_blank" rel="noopener" data-cursor="hover">Instagram</a>`,
      c.artstation && `<a href="${esc(c.artstation)}" target="_blank" rel="noopener" data-cursor="hover">ArtStation</a>`,
    ].filter(Boolean);
    return `
      <footer class="footer">
        <p class="footer__big" data-reveal>Let’s create<br /><em>something cinematic.</em></p>
        ${links.length ? `<div class="footer__links" data-reveal>${links.join('')}</div>` : ''}
        <div class="footer__bottom">
          <span>© ${new Date().getFullYear()} ${esc(S.name.en)}</span>
          <span>${esc(S.location)}</span>
          <button class="to-top" data-to-top data-cursor="hover">Back to top ↑</button>
        </div>
      </footer>`;
  };

  const viewHome = () => {
    const reelItems = S.works
      .map(
        (w, i) => `
        <li class="reel__item" data-reveal style="--d:${i * 70}ms">
          <a class="reel__link" href="#work-${w.slug}" data-index="${i}" data-cursor="view" data-cursor-text="View">
            <span class="num">${pad(i + 1)}</span>
            <span class="reel__name">${esc(w.title)}${w.titleEn !== w.title ? `<small>${esc(w.titleEn)}</small>` : ''}</span>
            <span class="reel__cat">${esc(w.category)}</span>
            <span class="reel__period">${esc(w.period)}</span>
          </a>
        </li>`
      )
      .join('');
    const stage = S.works
      .map((w, i) => `<figure class="${i === 0 ? 'is-active' : ''}">${img(w.cover, '', { sizes: '100vw' })}</figure>`)
      .join('');

    return `
      <section class="hero letterbox" data-inview>
        <div class="hero__media" data-parallax>${img('hero', 'Portfolio key visual', { eager: true })}</div>
        <div class="hero__content">
          <span class="eyebrow">Portfolio — ${esc(S.role)}</span>
          <h1 class="hero__title">
            <span class="row">${split('Nagao', 200)}</span>
            <span class="row row--indent">${split('Takahiro', 420)}</span>
          </h1>
          <div class="hero__sub" data-reveal style="--d:900ms">
            <span class="eyebrow">3DCG / VFX / Environment</span>
            <p>${esc(S.name.ja)} — 映像とリアルタイムの境界で、物語のある一枚をつくる。</p>
          </div>
        </div>
        <div class="hero__foot">
          <span class="eyebrow">${esc(S.location)}</span>
          <span class="scroll-cue eyebrow"><i></i>Scroll</span>
        </div>
      </section>

      <section class="showreel">
        <div class="showreel__head">
          <h2 class="section-title" data-reveal>Demo <em>Reel</em></h2>
          <a class="link-line" href="#professional" data-cursor="hover" data-reveal><i></i>Professional work</a>
        </div>
        ${reelBlock('Professional Work ' + S.reel.years)}
      </section>

      <section class="reel">
        <div class="reel__bg" aria-hidden="true"><div class="reel__stage">${stage}</div></div>
        <div class="reel__head">
          <h2 class="section-title" data-reveal>Selected <em>Works</em></h2>
          <span class="eyebrow" data-reveal>${pad(S.works.length)} Projects</span>
        </div>
        <ul class="reel__list">${reelItems}</ul>
      </section>

      <section class="statement">
        <span class="eyebrow" data-reveal>Statement</span>
        <div>
          <p class="statement__text" data-reveal>
            From original worlds to faithful studies — every frame is built to tell a story.
            <span class="ja">${esc(S.profile.statement)}</span>
          </p>
          <a class="link-line" href="#about" data-cursor="hover" data-reveal><i></i>About me</a>
        </div>
      </section>
      ${footer()}`;
  };

  const viewWorks = () => {
    const cards = S.works
      .map(
        (w, i) => `
        <a class="card ${w.portrait ? 'card--portrait' : ''}" href="#work-${w.slug}" data-cursor="view" data-cursor-text="View">
          <div class="card__media" data-reveal-img>${img(w.cover, w.title, { sizes: '(max-width: 900px) 100vw, 60vw' })}</div>
          <div class="card__info" data-reveal>
            <span class="num">${pad(i + 1)}</span>
            <h2 class="card__title">${esc(w.title)}</h2>
            <span class="card__meta">${esc(w.category)}<br />${esc(w.period)}</span>
          </div>
        </a>`
      )
      .join('');
    return `
      <section class="page-head" data-inview>
        <span class="eyebrow">Index of projects</span>
        <h1 class="page-head__title">${split('Works')}<sup>(${pad(S.works.length)})</sup></h1>
        <div class="page-head__row" data-reveal style="--d:500ms">
          <p>${esc(S.profile.statement)}</p>
          <span class="eyebrow">Personal Works</span>
        </div>
      </section>
      <section class="works">${cards}</section>
      ${footer()}`;
  };

  const viewWork = (slug) => {
    const i = findWork(slug);
    if (i < 0) return viewNotFound();
    const w = S.works[i];
    const next = S.works[(i + 1) % S.works.length];
    const meta = [
      ['No.', pad(i + 1) + ' / ' + pad(S.works.length)],
      ['Category', w.category],
      ['Period', '制作期間 ' + w.period],
      w.texture && ['Texture', w.texture],
      w.note && ['Note', w.note],
    ]
      .filter(Boolean)
      .map(([k, v]) => `<li><span>${esc(k)}</span><span>${esc(v)}</span></li>`)
      .join('');
    const sections = (w.sections || [])
      .map((s) => `<div class="w-section" data-reveal><h3>${esc(s.h)}</h3><p>${esc(s.p)}</p></div>`)
      .join('');
    const gallery = (w.gallery || [])
      .map(
        (g, gi) => `
        <figure data-reveal-img data-lightbox="${gi + 1}" data-cursor="view" data-cursor-text="Zoom">
          ${img(g, `${w.title} — ${gi + 2}`, { sizes: gi % 3 === 0 ? '100vw' : '(max-width: 900px) 100vw, 50vw' })}
        </figure>`
      )
      .join('');

    return `
      <section class="w-hero letterbox ${w.portrait ? 'w-hero--portrait' : ''}" data-inview>
        <div class="w-hero__media" data-parallax data-lightbox="0" data-cursor="view" data-cursor-text="Zoom">${img(w.cover, w.title, { eager: true })}</div>
        <div class="w-hero__content">
          <span class="eyebrow"><span class="num">${pad(i + 1)}</span> — ${esc(w.category)}</span>
          <h1 class="w-hero__title">${split(w.title, 300)}</h1>
          ${w.titleEn !== w.title ? `<span class="eyebrow" data-reveal style="--d:800ms">${esc(w.titleEn)}</span>` : ''}
        </div>
      </section>

      <section class="w-info">
        <ul class="w-meta" data-reveal>${meta}</ul>
        <div>
          ${w.lead ? `<p class="w-lead" data-reveal>${esc(w.lead)}</p>` : ''}
          ${sections}
        </div>
      </section>

      ${gallery ? `<section class="w-gallery">${gallery}</section>` : ''}

      <a class="next" href="#work-${next.slug}" data-cursor="view" data-cursor-text="Next">
        <div class="next__media">${img(next.cover, '', { sizes: '100vw' })}</div>
        <div class="next__content">
          <span class="eyebrow">Next Project</span>
          <h2 class="next__title">${esc(next.title)}</h2>
          <span class="eyebrow">${esc(next.category)}</span>
        </div>
      </a>
      ${footer()}`;
  };

  const viewAbout = () => {
    const p = S.profile;
    const career = p.career
      .map(
        (c) => `
        <li data-reveal>
          <span class="timeline__year">${esc(c.year)}</span>
          <ul>${c.items.map((it) => `<li>${esc(it)}</li>`).join('')}</ul>
        </li>`
      )
      .join('');
    const tools = (arr, cls = '') => `<ul class="tools__list ${cls}">${arr.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>`;
    const likes = p.likes.map((l) => `<div data-reveal><dt>${esc(l.k)}</dt><dd>${esc(l.v)}</dd></div>`).join('');

    return `
      <section class="page-head" data-inview>
        <span class="eyebrow">Profile</span>
        <h1 class="page-head__title">${split('About')}</h1>
      </section>

      <section class="about-intro">
        <div class="about-side">
          <figure class="about-photo" data-reveal-img>
            <img src="assets/img/profile.webp" srcset="assets/img/profile-s.webp 800w, assets/img/profile.webp 1230w" sizes="(max-width: 900px) 100vw, 30vw" alt="${esc(S.name.ja)}のポートレート" loading="lazy" decoding="async" />
          </figure>
          <div class="about-name" data-reveal>
            <span class="kana">${esc(S.name.kana)}</span>
            <span class="ja">${esc(S.name.ja)}</span>
            <span class="eyebrow">${esc(S.name.en)} — ${esc(S.role)}</span>
            <span class="from">${esc(p.from)}</span>
          </div>
        </div>
        <p class="about-lead" data-reveal style="--d:120ms">
          CG artist working across <em>real-time worlds</em>, <em>film VFX</em> and original stories —
          from metaverse venues to feature-film shots.
        </p>
      </section>

      <section class="block">
        <h2 class="block__title" data-reveal>Career</h2>
        <ul class="timeline">${career}</ul>
      </section>

      <section class="block">
        <h2 class="block__title" data-reveal>Tools</h2>
        <div class="tools">
          <div class="tools__row" data-reveal><span class="eyebrow">Main</span>${tools(p.tools.main)}</div>
          <div class="tools__row" data-reveal><span class="eyebrow">Sub</span>${tools(p.tools.sub, 'tools__list--sub')}</div>
        </div>
      </section>

      <section class="block">
        <h2 class="block__title" data-reveal>Likes</h2>
        <dl class="likes">${likes}</dl>
      </section>
      ${footer()}`;
  };


  /* デモリール：無音ループのティーザー＋クリックで本編をフル再生 */
  const reelBlock = (label) => `
    <div class="reelplayer" data-reveal>
      <video class="reelplayer__loop" muted loop playsinline preload="metadata" poster="${S.reel.poster}" ${reduced ? '' : 'autoplay'}>
        <source src="${S.reel.teaser}" type="video/mp4" />
      </video>
      <button class="reelplayer__play" data-reel-open data-cursor="view" data-cursor-text="Play" aria-label="デモリールを再生">
        <span class="reelplayer__icon" aria-hidden="true"></span>
        <span class="reelplayer__text">
          <span class="eyebrow">${esc(label)}</span>
          <span class="reelplayer__title">Demo Reel</span>
          <span class="eyebrow">${esc(S.reel.years)} · ${esc(S.reel.duration)}</span>
        </span>
      </button>
    </div>`;

  const proImages = () => {
    const P = S.professional;
    return [
      ...P.shots.map((sh) => ({ src: `assets/img/${sh.img}.webp`, alt: sh.note })),
      ...P.cluster.feature.images.map((im) => ({ src: `assets/img/${im.img}.webp`, alt: im.cap })),
      ...P.cluster.gallery.map((g) => ({ src: `assets/img/${g}.webp`, alt: 'cluster' })),
    ];
  };

  const viewProfessional = () => {
    const P = S.professional;
    const C = P.cluster;
    const F = C.feature;
    const nShots = P.shots.length;
    const nFeat = F.images.length;

    const credits = P.vfx.credits
      .map(
        (c) => `
        <li class="credit" data-reveal>
          <span class="credit__kind">${esc(c.kind)}</span>
          <span class="credit__title">${esc(c.title)}<small>${esc(c.role)}</small></span>
          <span class="credit__role">${esc(c.period)}</span>
        </li>`
      )
      .join('');
    const shots = P.shots
      .map(
        (sh, i) => `
        <figure class="shot" data-lightbox="${i}" data-cursor="view" data-cursor-text="Zoom">
          <div class="shot__media" data-reveal-img>${img(sh.img, sh.note, { sizes: i === 0 ? '100vw' : '(max-width: 900px) 100vw, 50vw' })}</div>
          <figcaption data-reveal>
            <span class="shot__role">${esc(sh.role)}</span>
            <span class="shot__note">${esc(sh.note)}</span>
          </figcaption>
        </figure>`
      )
      .join('');
    const feat = F.images
      .map(
        (im, i) => `
        <figure class="feat__fig${i < 2 ? ' feat__fig--main' : ''}" data-lightbox="${nShots + i}" data-cursor="view" data-cursor-text="Zoom">
          <div class="feat__media" data-reveal-img>${img(im.img, im.cap, { sizes: i < 2 ? '(max-width: 900px) 100vw, 50vw' : '(max-width: 900px) 50vw, 20vw' })}</div>
          <figcaption>${esc(im.cap)}</figcaption>
        </figure>`
      )
      .join('');
    const works = C.works
      .map((w) => `<li data-reveal><span>${esc(w.client)}</span><span>${esc(w.role)}</span></li>`)
      .join('');
    const mosaic = C.gallery
      .map(
        (g, i) => `
        <figure class="mosaic__item" data-lightbox="${nShots + nFeat + i}" data-cursor="view" data-cursor-text="Zoom" data-reveal-img style="--d:${(i % 4) * 60}ms">
          <img src="assets/img/${g}-s.webp" srcset="assets/img/${g}-s.webp 520w, assets/img/${g}.webp 1170w" sizes="(max-width: 900px) 50vw, 25vw" alt="cluster での制作物 ${i + 1}" loading="lazy" decoding="async" />
        </figure>`
      )
      .join('');

    return `
      <section class="page-head" data-inview>
        <span class="eyebrow">Client work</span>
        <h1 class="page-head__title">${split('Professional')}</h1>
        <div class="page-head__row" data-reveal style="--d:500ms">
          <p>${esc(P.lead)}</p>
          <span class="eyebrow">Film · Drama · Metaverse</span>
        </div>
      </section>

      <section class="showreel showreel--page">${reelBlock('Professional Work')}</section>

      <section class="block">
        <div class="block__title">
          <h2 data-reveal>Film &amp; Drama<br /><em>VFX</em></h2>
          <span class="eyebrow" data-reveal>${esc(P.vfx.company)}</span>
        </div>
        <ul class="credits">${credits}</ul>
      </section>

      <section class="breakdown">
        <div class="breakdown__head">
          <h2 class="section-title" data-reveal>Shot <em>Breakdown</em></h2>
          <span class="eyebrow" data-reveal>From the demo reel</span>
        </div>
        <div class="breakdown__grid">${shots}</div>
      </section>

      <section class="metaverse">
        <div class="metaverse__head">
          <span class="eyebrow" data-reveal>${esc(C.company)}</span>
          <h2 class="section-title" data-reveal>Metaverse <em>Worlds</em></h2>
          <p data-reveal>${esc(C.lead)}</p>
        </div>

        <article class="feat">
          <div class="feat__intro">
            <h3 class="feat__title" data-reveal>${esc(F.title)}</h3>
            <span class="eyebrow" data-reveal>${esc(F.sub)}</span>
          </div>
          <div class="feat__grid">${feat}</div>
          <div class="feat__text">
            ${F.text.map((t) => `<p data-reveal>${esc(t)}</p>`).join('')}
            <ul class="tools__list" data-reveal>${F.tools.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
          </div>
        </article>

        <div class="cworks">
          <div class="cworks__list">
            <h3 class="cworks__title" data-reveal>Works</h3>
            <p class="cworks__note" data-reveal>クラスター株式会社での各案件の成果物を一部抜粋。</p>
            <ul>${works}</ul>
          </div>
          <div class="mosaic">${mosaic}</div>
        </div>
      </section>
      ${footer()}`;
  };

  const viewNotFound = () => `
    <section class="page-head" data-inview>
      <span class="eyebrow">404</span>
      <h1 class="page-head__title">${split('Lost')}</h1>
      <div class="page-head__row"><p>ページが見つかりませんでした。</p><a class="link-line" href="#index" data-cursor="hover"><i></i>Back to index</a></div>
    </section>`;

  /* ---------- router ---------- */
  /* URL: #index / #works / #work-<slug> / #about（旧形式 #/works/<slug> も受け付ける） */
  const parse = () => {
    const h = decodeURIComponent(location.hash.replace(/^#\/?/, '')).replace(/\/$/, '');
    const legacy = h.match(/^works\/(.+)$/);
    const slug = legacy ? legacy[1] : h.startsWith('work-') ? h.slice(5) : null;
    if (!h || h === 'index') return { name: 'home', label: 'Index' };
    if (slug) {
      const w = S.works[findWork(slug)];
      return { name: 'work', slug, label: w ? w.title : 'Works', sub: w ? 'Project' : '' };
    }
    if (h === 'works') return { name: 'works', label: 'Works' };
    if (h === 'about') return { name: 'about', label: 'About' };
    if (h === 'professional') return { name: 'professional', label: 'Professional' };
    return { name: '404', label: 'Lost' };
  };

  const render = (r) => {
    let html;
    if (r.name === 'home') html = viewHome();
    else if (r.name === 'works') html = viewWorks();
    else if (r.name === 'work') html = viewWork(r.slug);
    else if (r.name === 'about') html = viewAbout();
    else if (r.name === 'professional') html = viewProfessional();
    else html = viewNotFound();
    app.innerHTML = html;

    const title = r.name === 'home' ? '' : `${r.label} — `;
    document.title = `${title}${S.name.en} — ${S.role}`;
    $$('.header__nav a').forEach((a) => {
      const n = a.dataset.nav;
      a.classList.toggle('is-current', n === r.name || (n === 'works' && r.name === 'work'));
    });
    window.scrollTo(0, 0);
    app.focus({ preventScroll: true });
    mount();
  };

  /* ---------- curtain transition ---------- */
  const curtain = $('.curtain');
  const panelA = $('.curtain__panel--a');
  const panelB = $('.curtain__panel--b');
  const label = $('.curtain__label');

  const anim = (el, frames, opts) =>
    el.animate(frames, { duration: reduced ? 1 : opts.duration, delay: reduced ? 0 : opts.delay || 0, easing: opts.easing || EASE, fill: 'forwards' }).finished;

  const cover = async (r) => {
    curtain.classList.add('is-active');
    label.innerHTML = `<div>${r.sub ? `<small>${esc(r.sub)}</small>` : ''}${esc(r.label)}</div>`;
    panelA.style.transformOrigin = panelB.style.transformOrigin = 'bottom';
    await Promise.all([
      anim(panelA, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 800 }),
      anim(panelB, [{ transform: 'scaleY(0)' }, { transform: 'scaleY(1)' }], { duration: 800, delay: 120 }),
      anim(label, [{ opacity: 0, transform: 'translateY(30px)', filter: 'blur(8px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: 700, delay: 420, easing: 'cubic-bezier(0.22,1,0.36,1)' }),
    ]);
  };

  const uncover = async () => {
    panelA.style.transformOrigin = panelB.style.transformOrigin = 'top';
    await Promise.all([
      anim(label, [{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'translateY(-24px)' }], { duration: 500 }),
      anim(panelB, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }], { duration: 900, delay: 200 }),
      anim(panelA, [{ transform: 'scaleY(1)' }, { transform: 'scaleY(0)' }], { duration: 900, delay: 320 }),
    ]);
    curtain.classList.remove('is-active');
  };

  let busy = false;
  let pending = false;
  const navigate = async () => {
    if (busy) { pending = true; return; }
    busy = true;
    const r = parse();
    closeLightbox(true);
    closePlayer(true);
    await cover(r);
    render(r);
    await wait(250);
    const done = uncover();
    await wait(380);
    inView();
    await done;
    busy = false;
    if (pending) { pending = false; navigate(); }
  };

  /* ---------- intro loader ---------- */
  const intro = async () => {
    const loader = $('.loader');
    const bar = $('.loader__line i');
    const count = $('.loader__count');
    const heroImg = new Image();
    const loaded = new Promise((res) => { heroImg.onload = heroImg.onerror = res; });
    heroImg.src = 'assets/img/hero.webp';

    const start = performance.now();
    const minTime = reduced ? 0 : 2300;
    let done = false;
    loaded.then(() => (done = true));
    await new Promise((res) => {
      const tick = (t) => {
        const tp = Math.min((t - start) / minTime, 1);
        const p = done ? tp : Math.min(tp, 0.9);
        bar.style.setProperty('--p', p);
        count.textContent = String(Math.round(p * 100)).padStart(3, '0');
        if (p >= 1) res(); else requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });

    render(parse());
    await wait(200);
    loader.classList.add('is-done');
    document.body.classList.remove('is-loading');
    await wait(300);
    inView();
  };

  /* ---------- per-view mounting ---------- */
  let io;
  const mount = () => {
    // scroll reveals
    if (io) io.disconnect();
    io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }),
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 }
    );
    $$('[data-reveal], [data-reveal-img]', app).forEach((el) => io.observe(el));

    // reel hover → background stage
    // 作品リストの背景：画面の真ん中に一番近い作品に合わせる（PCはマウスを乗せた作品を優先）
    reelSync = null;
    const figs = $$('.reel__stage figure', app);
    const links = $$('.reel__link', app);
    if (links.length) {
      let current = -1;
      let hoverLock = false;
      const activate = (idx) => {
        if (idx === current || idx < 0) return;
        current = idx;
        figs.forEach((f, i) => f.classList.toggle('is-active', i === idx));
        links.forEach((l, i) => l.parentElement.classList.toggle('is-active', i === idx));
      };
      const pickCenter = () => {
        if (hoverLock) return;
        const mid = window.innerHeight / 2;
        let best = 0;
        let bd = Infinity;
        links.forEach((l, i) => {
          const r = l.getBoundingClientRect();
          const d = Math.abs((r.top + r.bottom) / 2 - mid);
          if (d < bd) { bd = d; best = i; }
        });
        activate(best);
      };
      const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      links.forEach((a) => {
        if (fine) a.addEventListener('mouseenter', () => { hoverLock = true; activate(+a.dataset.index); });
        a.addEventListener('focus', () => activate(+a.dataset.index));
      });
      if (fine) $('.reel__list', app).addEventListener('mouseleave', () => { hoverLock = false; pickCenter(); });
      // スクロールしたらマウス優先を解除して、真ん中の作品に合わせ直す
      reelSync = () => { hoverLock = false; pickCenter(); };
      // 背景画像は切り替えた瞬間に出せるよう先に読み込んでおく
      figs.forEach((f) => { const im = f.querySelector('img'); if (im) im.loading = 'eager'; });
      pickCenter();
    }

    // lightbox
    $$('[data-lightbox]', app).forEach((el) =>
      el.addEventListener('click', () => openLightbox(+el.dataset.lightbox))
    );

    // to top
    $$('[data-to-top]', app).forEach((b) =>
      b.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' }))
    );

    // demo reel
    $$('[data-reel-open]', app).forEach((b) => b.addEventListener('click', openPlayer));
    if (!reduced) $$('.reelplayer__loop', app).forEach((v) => { const pr = v.play(); if (pr) pr.catch(() => {}); });

    parallaxEls = $$('[data-parallax]', app);
  };

  /* 最初のビュー（ヒーロー）の演出開始 */
  const inView = () => $$('[data-inview]', app).forEach((el) => el.classList.add('is-in'));

  /* ---------- parallax ---------- */
  let parallaxEls = [];
  let reelSync = null;
  let ticking = false;
  let lastY = 0;
  const header = $('.header');
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      // 下にスクロールしたらヘッダーを隠し、上に戻したら出す
      header.classList.toggle('is-hidden', y > 160 && y > lastY);
      lastY = y;
      ticking = false;
      if (reelSync) reelSync();
      if (reduced) return;
      const vh = window.innerHeight;
      parallaxEls.forEach((el) => {
        if (y < vh * 1.2) el.style.transform = `translate3d(0, ${y * 0.32}px, 0)`;
      });
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { if (reelSync) reelSync(); });

  /* ---------- lightbox ---------- */
  const lb = $('.lightbox');
  const lbImg = $('.lightbox__figure img');
  const lbCount = $('.lightbox__count');
  let lbList = [];
  let lbIndex = 0;

  const currentImages = () => {
    const r = parse();
    if (r.name === 'professional') return proImages();
    if (r.name !== 'work') return [];
    const w = S.works[findWork(r.slug)];
    return w ? [w.cover, ...(w.gallery || [])].map((n) => ({ src: `assets/img/${n}.webp`, alt: w.title })) : [];
  };

  const showLb = (i) => {
    lbIndex = (i + lbList.length) % lbList.length;
    const it = lbList[lbIndex];
    lbImg.classList.add('is-swap');
    setTimeout(() => {
      lbImg.src = it.src;
      lbImg.alt = it.alt;
      lbImg.onload = () => lbImg.classList.remove('is-swap');
      if (lbImg.complete) lbImg.classList.remove('is-swap');
    }, reduced ? 0 : 200);
    lbCount.textContent = `${pad(lbIndex + 1)} / ${pad(lbList.length)}`;
  };

  let lastFocus = null;
  const openLightbox = (i) => {
    lbList = currentImages();
    if (!lbList.length) return;
    lastFocus = document.activeElement;
    lb.hidden = false;
    document.body.classList.add('is-locked');
    requestAnimationFrame(() => lb.classList.add('is-open'));
    showLb(i);
    $('.lightbox__close').focus();
  };
  function closeLightbox(instant) {
    if (lb.hidden) return;
    lb.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    const hide = () => { lb.hidden = true; };
    if (instant || reduced) hide(); else setTimeout(hide, 600);
    if (lastFocus && !instant) lastFocus.focus({ preventScroll: true });
  }
  $('.lightbox__close').addEventListener('click', () => closeLightbox());
  $('.lightbox__nav--prev').addEventListener('click', () => showLb(lbIndex - 1));
  $('.lightbox__nav--next').addEventListener('click', () => showLb(lbIndex + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb || e.target.classList.contains('lightbox__figure')) closeLightbox(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showLb(lbIndex - 1);
    if (e.key === 'ArrowRight') showLb(lbIndex + 1);
  });


  /* ---------- reel player (modal) ---------- */
  const player = document.createElement('div');
  player.className = 'player';
  player.hidden = true;
  player.setAttribute('role', 'dialog');
  player.setAttribute('aria-modal', 'true');
  player.setAttribute('aria-label', 'Demo reel');
  player.innerHTML = `
    <button class="player__close" data-cursor="hover">Close</button>
    <div class="player__frame"><video controls playsinline preload="none"></video></div>
    <div class="player__meta"><span class="eyebrow">Demo Reel — ${esc(S.name.en)}</span><span class="eyebrow">${esc(S.reel.years)}</span></div>`;
  document.body.appendChild(player);
  const pv = $('video', player);
  let playerFocus = null;

  function openPlayer() {
    playerFocus = document.activeElement;
    pv.innerHTML = S.reel.sources.map((src) => `<source src="${src}" type="video/mp4" />`).join('');
    pv.poster = S.reel.poster;
    pv.load();
    $$('.reelplayer__loop').forEach((v) => v.pause());
    player.hidden = false;
    document.body.classList.add('is-locked');
    requestAnimationFrame(() => player.classList.add('is-open'));
    const pr = pv.play();
    if (pr) pr.catch(() => {});
    $('.player__close', player).focus();
  }
  function closePlayer(instant) {
    if (player.hidden) return;
    pv.pause();
    player.classList.remove('is-open');
    document.body.classList.remove('is-locked');
    const done = () => {
      player.hidden = true;
      pv.removeAttribute('src');
      pv.innerHTML = '';
      pv.load();
    };
    if (instant || reduced) done(); else setTimeout(done, 600);
    if (!reduced) $$('.reelplayer__loop').forEach((v) => { const pr = v.play(); if (pr) pr.catch(() => {}); });
    if (playerFocus && !instant) playerFocus.focus({ preventScroll: true });
  }
  $('.player__close', player).addEventListener('click', () => closePlayer());
  player.addEventListener('click', (e) => { if (e.target === player) closePlayer(); });
  document.addEventListener('keydown', (e) => { if (!player.hidden && e.key === 'Escape') closePlayer(); });

  /* ---------- custom cursor ---------- */
  const setupCursor = () => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || reduced) return;
    document.body.classList.add('has-cursor');
    const c = $('.cursor');
    const dot = $('.cursor__dot');
    const ring = $('.cursor__ring');
    const txt = $('.cursor__ring em');
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
    }, { passive: true });
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener('mouseover', (e) => {
      const t = e.target.closest('[data-cursor], a, button');
      c.classList.remove('is-hover', 'is-view');
      if (!t) return;
      if (t.dataset.cursor === 'view') { c.classList.add('is-view'); txt.textContent = t.dataset.cursorText || 'View'; }
      else c.classList.add('is-hover');
    });
    document.addEventListener('mouseleave', () => c.classList.remove('is-hover', 'is-view'));
  };


  /* ---------- cursor light trail ---------- */
  /* カーソルの軌跡に金色の光の粒が舞って消える（映写機の光の中の埃のイメージ） */
  function setupTrail() {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches || reduced) return;
    const cv = document.createElement('canvas');
    cv.className = 'trail';
    cv.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cv);
    const ctx = cv.getContext('2d');
    let dpr = 1, W = 0, H = 0;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cv.width = W * dpr; cv.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const parts = [];
    const ribbon = [];
    let px = null, py = null, running = false;
    const COLORS = ['232, 200, 140', '245, 232, 205', '200, 170, 120'];

    const spawn = (x, y, vx, vy) => {
      const star = Math.random() < 0.12;
      parts.push({
        x, y,
        vx: vx * 0.04 + (Math.random() - 0.5) * 0.6,
        vy: vy * 0.04 + (Math.random() - 0.5) * 0.6 - 0.15,
        r: star ? 2.6 + Math.random() * 2.4 : 0.6 + Math.random() * 1.4,
        life: 0,
        max: 50 + Math.random() * 50,
        star,
        rot: Math.random() * Math.PI,
        c: COLORS[(Math.random() * COLORS.length) | 0],
      });
    };

    window.addEventListener('mousemove', (e) => {
      const x = e.clientX, y = e.clientY;
      if (px !== null) {
        const dx = x - px, dy = y - py;
        const dist = Math.hypot(dx, dy);
        const n = Math.min(Math.floor(dist / 9), 6);
        for (let i = 0; i < n; i++) spawn(px + (dx * i) / n, py + (dy * i) / n, dx, dy);
      }
      ribbon.push({ x, y, t: performance.now() });
      px = x; py = y;
      if (!running) { running = true; requestAnimationFrame(frame); }
    }, { passive: true });

    const drawStar = (p, a) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.fillStyle = `rgba(${p.c}, ${a})`;
      const r = p.r * 2.2;
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.quadraticCurveTo(0, 0, r, 0);
      ctx.quadraticCurveTo(0, 0, 0, r);
      ctx.quadraticCurveTo(0, 0, -r, 0);
      ctx.quadraticCurveTo(0, 0, 0, -r);
      ctx.fill();
      ctx.restore();
    };

    function frame(now) {
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = 'lighter';

      // 細い光の尾
      while (ribbon.length && now - ribbon[0].t > 260) ribbon.shift();
      if (ribbon.length > 1) {
        for (let i = 1; i < ribbon.length; i++) {
          const a = 1 - (now - ribbon[i].t) / 260;
          ctx.strokeStyle = `rgba(232, 205, 150, ${a * 0.35})`;
          ctx.lineWidth = a * 2.2;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(ribbon[i - 1].x, ribbon[i - 1].y);
          ctx.lineTo(ribbon[i].x, ribbon[i].y);
          ctx.stroke();
        }
      }

      // 光の粒
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.life++;
        p.x += p.vx; p.y += p.vy;
        p.vx *= 0.97; p.vy = p.vy * 0.97 - 0.006;
        const t = p.life / p.max;
        if (t >= 1) { parts.splice(i, 1); continue; }
        const a = Math.sin(Math.PI * Math.min(t * 2.5, 1)) * (1 - t);
        if (p.star) {
          p.rot += 0.03;
          drawStar(p, a * 0.9);
        } else {
          const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 4);
          g.addColorStop(0, `rgba(${p.c}, ${a * 0.9})`);
          g.addColorStop(1, `rgba(${p.c}, 0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (parts.length > 400) parts.splice(0, parts.length - 400);

      if (parts.length || ribbon.length > 1) requestAnimationFrame(frame);
      else { running = false; ctx.clearRect(0, 0, W, H); }
    }
  }

  /* ---------- clock ---------- */
  const clock = $('[data-clock]');
  const fmt = new Intl.DateTimeFormat('ja-JP', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tokyo', hour12: false });
  const tickClock = () => { clock.textContent = fmt.format(new Date()); };
  tickClock();
  setInterval(tickClock, 15000);

  /* ---------- boot ---------- */
  document.body.classList.add('is-loading');
  $('.header__mark').innerHTML = logoSVG(1.7, 'logo');
  $('.loader__art').innerHTML = logoSVG(0.9, 'logo logo--draw');
  $$('.loader__art .logo > *').forEach((el, i) => { el.style.animationDelay = (i * 55) + 'ms'; });
  setupTrail();
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  window.addEventListener('hashchange', navigate);
  setupCursor();
  intro();
})();
