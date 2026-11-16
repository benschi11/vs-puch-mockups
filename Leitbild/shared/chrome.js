/*
 * Gemeinsames Seiten-"Chrome" fuer die Leitbild-Mockups: Header, PageHero, Footer, Mockup-Leiste.
 * Markup 1:1 aus src/Theme/OrchardCore.VsPuch.Theme/Views/Header.liquid, PageHero.liquid und
 * Footer*.liquid nachgebaut, damit die Mockups mit dem echten kompilierten Tailwind-CSS
 * (css/site.css, aus dem Theme kopiert) exakt wie die Live-Seite aussehen.
 *
 * Konfiguration pro Seite ueber <body>-Attribute:
 *   data-nav="flat|dropdown|mega"  wie der Menuepunkt "Schule" aufgebaut ist
 *   data-active="schule|leitbild"  welcher (Unter-)Punkt aktiv ist
 *   data-variant="A|B|C"           fuer die Mockup-Leiste
 * und window.MOCKUP = { schule: 'url', leitbild: 'url' } fuer die Ziele im Schule-Menue.
 */
(function () {
    const body = document.body;
    const nav = body.dataset.nav || 'flat';
    const active = body.dataset.active || 'schule';
    const variant = body.dataset.variant || '';
    const cfg = Object.assign({ schule: '#', leitbild: '#' }, window.MOCKUP || {});
    const L = window.LEITBILD;

    const phone = '<svg aria-hidden="true" class="inline-block w-5 h-5 -mt-0.5" viewBox="0 0 24 24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>';
    const chevron = '<svg aria-hidden="true" class="mk-chevron" viewBox="0 0 20 20" fill="currentColor"><path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z"/></svg>';

    const others = [
        ['📚', 'Klassen'], ['📰', 'Aktuelles'], ['👩‍🏫', 'Team'], ['ℹ️', 'Informationen']
    ];
    const dummy = (icon, label, cls) => `<a href="#" class="${cls}" data-mk-dummy><span aria-hidden="true">${icon}</span> ${label}</a>`;
    const isSchool = active === 'schule' || active === 'leitbild';

    function schoolDesktop() {
        if (nav === 'flat') {
            return `<a href="${cfg.schule}" class="nav-link${isSchool ? ' is-active' : ''}" ${isSchool ? 'aria-current="page"' : ''}><span aria-hidden="true">🏫</span> Schule</a>`;
        }
        const sub = (key, icon, label, desc) =>
            `<a href="${cfg[key]}" class="mk-sub${active === key ? ' is-active' : ''}" ${active === key ? 'aria-current="page"' : ''}>
                <span class="mk-sub-icon" aria-hidden="true">${icon}</span>
                <span><span class="mk-sub-label">${label}</span><span class="mk-sub-desc">${desc}</span></span></a>`;
        let panel;
        if (nav === 'mega') {
            const items = L.schwerpunkte.map(s =>
                `<a href="${cfg.leitbild}#${s.id}" class="mk-mega-chip"><span aria-hidden="true">${s.icon}</span>${s.titel.replace(' – Forschen und Entdecken', '')}</a>`).join('');
            panel = `<div class="mk-panel mk-panel-mega" role="menu">
                <div class="mk-mega-left">
                    ${sub('schule', '🏫', 'Unsere Schule', 'Wer wir sind und wie wir arbeiten')}
                    ${sub('leitbild', '🌱', 'Unser Leitbild', 'Gemeinsam lernen. Gemeinsam wachsen.')}
                </div>
                <div class="mk-mega-right">
                    <p class="mk-mega-title">Unsere 12 Schwerpunkte</p>
                    <div class="mk-mega-grid">${items}</div>
                </div>
            </div>`;
        } else {
            panel = `<div class="mk-panel" role="menu">
                ${sub('schule', '🏫', 'Unsere Schule', 'Wer wir sind und wie wir arbeiten')}
                ${sub('leitbild', '🌱', 'Unser Leitbild', 'Gemeinsam lernen. Gemeinsam wachsen.')}
            </div>`;
        }
        return `<div class="mk-dd" data-mk-dd>
            <button type="button" class="nav-link mk-dd-btn${isSchool ? ' is-active' : ''}" aria-expanded="false" aria-haspopup="true"><span aria-hidden="true">🏫</span> Schule ${chevron}</button>
            ${panel}
        </div>`;
    }

    function schoolMobile() {
        if (nav === 'flat') {
            return `<a href="${cfg.schule}" class="mobile-link${isSchool ? ' is-active' : ''}"><span aria-hidden="true">🏫</span> Schule</a>`;
        }
        return `<details class="mk-mobile-group" ${isSchool ? 'open' : ''}>
            <summary class="mobile-link${isSchool ? ' is-active' : ''}"><span aria-hidden="true">🏫</span> Schule ${chevron}</summary>
            <a href="${cfg.schule}" class="mk-mobile-sub${active === 'schule' ? ' is-active' : ''}">Unsere Schule</a>
            <a href="${cfg.leitbild}" class="mk-mobile-sub${active === 'leitbild' ? ' is-active' : ''}">Unser Leitbild</a>
        </details>`;
    }

    const header = `
<a href="#page-content" class="skip-link">Zum Inhalt springen</a>
<header class="fixed top-0 left-0 right-0 z-50 bg-surface/95 backdrop-blur-md border-b-2 border-primary/10 shadow-sm">
    <div class="container-page h-20 flex items-center justify-between">
        <a href="index.html" class="flex items-center gap-3">
            <img src="img/logo.svg" alt="Logo VS Puch" class="h-16 w-auto">
            <div class="hidden sm:block">
                <p class="font-display font-semibold text-xl text-primary">VS Puch</p>
                <p class="text-xs text-tertiary/70 -mt-0.5">bei Weiz</p>
            </div>
        </a>
        <nav class="hidden md:flex items-center gap-1" aria-label="Hauptnavigation">
            ${dummy('🏠', 'Startseite', 'nav-link')}
            ${schoolDesktop()}
            ${others.map(o => dummy(o[0], o[1], 'nav-link')).join('')}
            <a href="#" class="ml-3 px-5 py-3 bg-primary text-white rounded-2xl font-semibold" data-mk-dummy>${phone} Kontakt</a>
        </nav>
        <button class="md:hidden p-3 rounded-xl hover:bg-surface-alt" data-menu-button aria-label="Menü öffnen" aria-expanded="false" aria-controls="mobile-menu">☰</button>
    </div>
    <nav id="mobile-menu" class="hidden md:hidden bg-surface px-6 pb-5 shadow-ambient-lg" data-mobile-menu aria-label="Mobile Navigation">
        ${dummy('🏠', 'Startseite', 'mobile-link')}
        ${schoolMobile()}
        ${others.map(o => dummy(o[0], o[1], 'mobile-link')).join('')}
        <a href="#" class="mobile-link" data-mk-dummy>${phone} Kontakt</a>
    </nav>
</header>`;

    const footer = `
<footer class="bg-on-surface text-white">
    <div class="container-page py-14">
        <div class="grid gap-10 sm:grid-cols-2 md:grid-cols-3">
            <div>
                <h3 class="font-display font-semibold text-lg mb-4 pb-4 border-b border-white/10"><span aria-hidden="true">🕐</span> Schulzeiten</h3>
                <dl class="space-y-2 text-sm text-white/65">
                    <div class="flex justify-between gap-4"><dt>1. Stunde</dt><dd>07:40–08:30</dd></div>
                    <div class="flex justify-between gap-4"><dt>2. Stunde</dt><dd>08:35–09:25</dd></div>
                    <div class="flex justify-between gap-4"><dt>3. Stunde</dt><dd>09:35–10:25</dd></div>
                    <div class="flex justify-between gap-4"><dt>4. Stunde</dt><dd>10:45–11:35</dd></div>
                    <div class="flex justify-between gap-4"><dt>5. Stunde</dt><dd>11:40–12:30</dd></div>
                    <div class="flex justify-between gap-4"><dt>6. Stunde</dt><dd>12:35–13:20</dd></div>
                </dl>
            </div>
            <div>
                <h3 class="font-display font-semibold text-lg mb-4 pb-4 border-b border-white/10">Wichtige Links</h3>
                <div class="flex flex-col gap-3 text-sm text-white/65">
                    <a href="#" class="footer-link" data-mk-dummy>Impressum</a>
                    <a href="#" class="footer-link" data-mk-dummy>Datenschutz</a>
                </div>
            </div>
            <div class="space-y-8">
                <div>
                    <h3 class="font-display font-semibold text-lg mb-4 pb-4 border-b border-white/10">Kontakt</h3>
                    <div class="space-y-3 text-sm text-white/65">
                        <p class="flex items-start gap-2"><span aria-hidden="true">📍</span> Puch 104 · 8182 Puch bei Weiz</p>
                        <p class="flex items-center gap-2"><span aria-hidden="true">📞</span> +43 3177 2228</p>
                        <p class="flex items-center gap-2"><span aria-hidden="true">✉️</span> direktion@vs-puch.at</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="text-primary/25" aria-hidden="true">
        <svg viewBox="0 0 1440 40" class="w-full h-8" preserveAspectRatio="none" fill="currentColor"><path d="M0,20 C240,40 480,0 720,20 C960,40 1200,0 1440,20 L1440,40 L0,40 Z"></path></svg>
    </div>
    <div class="container-page pb-8 text-center text-sm text-white/50">© 2026 Volksschule Puch bei Weiz</div>
</footer>`;

    const variants = window.MOCKUP_VARIANTS || [
        ['A', 'Variante A', 'a-schule.html'],
        ['B', 'Variante B', 'b-schule.html'],
        ['C', 'Variante C', 'c-schule.html'],
        ['D', 'Variante D', 'd-schule.html'],
        ['E', 'Variante E', 'e-schule.html'],
        ['F', 'Variante F', 'f-schule.html'],
        ['G', 'G · Farbenfroh', 'g-schule.html'],
        ['H', 'H · Zeichenheft', 'h-schule.html'],
        ['I', 'I · Kleine Welt', 'i-schule.html']
    ];
    const bar = `
<div class="mk-bar" role="region" aria-label="Mockup-Navigation">
    <a href="index.html" class="mk-bar-home">◧ Übersicht</a>
    ${variants.map(v => `<a href="${v[2]}" class="${v[0] === variant ? 'is-active' : ''}">${v[1]}</a>`).join('')}
</div>
<div class="mk-toast" role="status" aria-live="polite" hidden>Dieser Link ist nicht Teil des Mockups.</div>`;

    /* PageHero-Shape als Helfer: identisch zu Views/PageHero.liquid, Breadcrumb mehrstufig. */
    window.pageHero = function ({ icon, eyebrow, title, crumbs = [], waveFill = 'fill-surface', extra = '' }) {
        const trail = crumbs.map((c, i) => i === crumbs.length - 1
            ? `<span aria-current="page">${c[0]}</span>`
            : `<a href="${c[1]}" class="hover:underline">${c[0]}</a><span class="opacity-60">›</span>`).join('');
        return `
<section class="page-hero fun-pattern pt-10 relative overflow-hidden">
    <div class="container-page pb-16 text-center">
        <span class="inline-flex px-5 py-2 bg-secondary-container text-secondary-dark rounded-full font-display font-semibold">
            <span aria-hidden="true">${icon}</span>&nbsp;${eyebrow}
        </span>
        <h1 class="font-display font-extrabold text-white text-5xl md:text-7xl leading-tight mt-6 max-w-4xl mx-auto">${title}</h1>
        ${extra}
        <nav aria-label="Breadcrumb" class="inline-flex items-center gap-2 mt-6 px-5 py-2 bg-white/15 text-white rounded-full font-semibold text-sm">
            <a href="#" class="hover:underline" data-mk-dummy><span aria-hidden="true">🏠</span> Startseite</a>
            <span class="opacity-60">›</span>
            ${trail}
        </nav>
    </div>
    <svg class="block w-full" viewBox="0 0 1440 100" preserveAspectRatio="none" style="height: 72px" aria-hidden="true">
        <path d="M0,32 C280,80 620,0 900,28 C1140,52 1300,44 1440,20 L1440,100 L0,100 Z" class="fill-secondary-container"/>
        <path d="M0,48 C280,96 620,16 900,44 C1140,68 1300,60 1440,36 L1440,100 L0,100 Z" class="${waveFill}"/>
    </svg>
</section>`;
    };

    /* Bestehender Schulprofil-Inhalt (aus Design/site.js, pages.schulprofil) - fuer die
       "Unsere Schule"-Seiten der Varianten, damit sichtbar ist, wo das Leitbild andockt. */
    window.schulprofilIntro = `
<div class="mk-prose">
    <h2>Unsere Schule</h2>
    <p>Bei uns kennt man sich. Kinder, Familien und Pädagoginnen arbeiten gemeinsam daran, dass Lernen Freude macht und jedes Kind seinen eigenen Weg gehen kann.</p>
    <p>Wir verbinden verlässliche Grundlagen mit kreativen Projekten, Bewegung und einem achtsamen Miteinander. Dabei darf jedes Kind Fragen stellen, ausprobieren und an seinen Aufgaben wachsen.</p>
</div>`;

    body.insertAdjacentHTML('afterbegin', header);
    body.insertAdjacentHTML('beforeend', footer + bar);

    /* Mobile-Menue (wie Assets/js/site.js) */
    const btn = document.querySelector('[data-menu-button]');
    const menu = document.querySelector('[data-mobile-menu]');
    btn.addEventListener('click', () => {
        const open = menu.classList.toggle('hidden') === false;
        btn.setAttribute('aria-expanded', String(open));
    });

    /* Dropdown: Hover auf Desktop, Klick/Tastatur fuer alle */
    document.querySelectorAll('[data-mk-dd]').forEach(dd => {
        const b = dd.querySelector('button');
        let t;
        const set = open => { dd.classList.toggle('is-open', open); b.setAttribute('aria-expanded', String(open)); };
        b.addEventListener('click', () => set(!dd.classList.contains('is-open')));
        dd.addEventListener('mouseenter', () => { clearTimeout(t); set(true); });
        dd.addEventListener('mouseleave', () => { t = setTimeout(() => set(false), 180); });
        dd.addEventListener('keydown', e => { if (e.key === 'Escape') { set(false); b.focus(); } });
        document.addEventListener('click', e => { if (!dd.contains(e.target)) set(false); });
    });

    /* Dummy-Links */
    const toast = document.querySelector('.mk-toast');
    let tt;
    document.addEventListener('click', e => {
        const a = e.target.closest('[data-mk-dummy]');
        if (!a) return;
        e.preventDefault();
        toast.hidden = false;
        clearTimeout(tt);
        tt = setTimeout(() => { toast.hidden = true; }, 1800);
    });
})();
