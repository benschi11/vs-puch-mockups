/*
 * Gemeinsamer Aufbau der kindgerechten Varianten G, H und I (Weiterentwicklung von Variante F).
 *
 * Anders als a–f-schule.html erzeugt dieses Skript bewusst GENAU das Markup, das
 * src/Theme/OrchardCore.VsPuch.Theme/Views/Content__Leitbild.liquid + Content__Schwerpunkt.liquid
 * heute ausgeben (Klassen lb-*, data-sp-*-Attribute, ein gemeinsamer #schwerpunkt-dialog).
 * Damit ist jede Variante später reines CSS (components.css) plus statische Deko-Schnipsel im
 * Template – keine Änderung am Content-Type.
 *
 * Icons: Lucide (dieselben Dateien, die Assets/scripts/build-icons.mjs ins Icon-Shape baut),
 * hier inline als <svg class="icon …">, wie das Icon-Shape sie rendert.
 *
 * Aufruf je Variante:
 *   renderLeitbild({ deco: { intro, areas, goal, end }, tileDeco })
 * deco.*: zusätzliche, rein dekorative HTML-Schnipsel (aria-hidden) je Sektion.
 */
(function () {
    const L = window.LEITBILD;

    /* Lucide-Pfade (lucide-static, 24×24). Schlüssel = Icon-Namen aus leitbild.recipe.json. */
    const P = {
        music: '<path d="M21 16V3a1 1 0 0 0-1.28-.96l-10 2.917a1 1 0 0 0-.72.96V19"/><circle cx="18" cy="16" r="3"/><circle cx="6" cy="19" r="3"/>',
        monitor: '<path d="M18 8V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h8"/><path d="M10 19v-3.96 3.15"/><path d="M7 19h5"/><rect width="6" height="10" x="16" y="12" rx="2"/>',
        book: '<path d="M12 5v16"/><path d="M20.001 19A2 2 0 0022 17V5a2 2 0 00-1.999-2L16 3.002A5 5 0 0012 5a5 5 0 00-4-2H4a2 2 0 00-2 2v12a2 2 0 001.999 2H8a5 5 0 014 2 5 5 0 014-2z"/>',
        sport: '<path d="M11 7a16 16 20 0 1 10.98 4.362"/><path d="M12 12a13 13 0 0 1-8.66 5"/><path d="M16.83 13.634a16 16 0 0 1-9.267 7.328"/><path d="M20.66 17A13 13 0 0 0 12 12a13 13 0 0 1 0-10"/><path d="M8.17 15.366a16 16 0 0 1-1.713-11.69"/><circle cx="12" cy="12" r="10"/>',
        palette: '<path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z"/><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/>',
        flask: '<path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2"/><path d="M6.453 15h11.094"/><path d="M8.5 2h7"/>',
        messages: '<path d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/><path d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"/>',
        team: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><path d="M16 3.128a4 4 0 0 1 0 7.744"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><circle cx="9" cy="7" r="4"/>',
        handshake: '<path d="m11 17 2 2a1 1 0 1 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3"/><path d="M3 4h8"/>',
        clover: '<path d="M16.17 7.83 2 22"/><path d="M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12"/><path d="m7.83 7.83 8.34 8.34"/>',
        trees: '<path d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"/><path d="M7 16v6"/><path d="M13 19v3"/><path d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"/>',
        recycle: '<path d="M7 19H4.815a1.83 1.83 0 0 1-1.57-.881 1.785 1.785 0 0 1-.004-1.784L7.196 9.5"/><path d="M11 19h8.203a1.83 1.83 0 0 0 1.556-.89 1.784 1.784 0 0 0 0-1.775l-1.226-2.12"/><path d="m14 16-3 3 3 3"/><path d="M8.293 13.596 7.196 9.5 3.1 10.598"/><path d="m9.344 5.811 1.093-1.892A1.83 1.83 0 0 1 11.985 3a1.784 1.784 0 0 1 1.546.888l3.943 6.843"/><path d="m13.378 9.633 4.096 1.098 1.097-4.096"/>',
        close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
        'chevron-left': '<path d="m15 18-6-6 6-6"/>',
        'chevron-right': '<path d="m9 18 6-6-6-6"/>',
        'arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
        sprout: '<path d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"/><path d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"/><path d="M5 21h14"/>',
        /* Deko */
        sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>',
        cloud: '<path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>',
        star: '<path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"/>',
        sparkle: '<path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"/>',
        heart: '<path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/>',
        leaf: '<path d="M11 20a10 10 0 0010-10 25.9 25.9 0 00-1.04-7.281 1 1 0 00-1.755-.325C15.833 5.5 13 5.5 9.8 6.1A7 7 0 0011 20"/><path d="M2 21a5 5 0 012.911-4.544C7.613 15.212 8.351 15.24 11 13"/>',
        flower: '<path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1"/><circle cx="12" cy="8" r="2"/><path d="M12 10v12"/><path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z"/><path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z"/>',
        pencil: '<path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/>',
        check: '<path d="M20 6 9 17l-5-5"/>'
    };
    /* Zuordnung wie im Recipe (Schwerpunkt → Icon-Name) */
    const ICON_OF = { musik: 'music', digital: 'monitor', lesen: 'book', sport: 'sport', kreativ: 'palette', mint: 'flask',
        sprache: 'messages', inklusion: 'team', gemeinschaft: 'handshake', glueck: 'clover', natur: 'trees', oeko: 'recycle' };

    /* Wie das Icon-Shape: 1em groß, Farbe über currentColor, Größe über font-size. */
    const icon = (name, css = '', stroke = 2) =>
        `<svg class="icon${css ? ' ' + css : ''}" width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name]}</svg>`;
    window.lbIcon = icon;

    const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
    const slug = s => s.toLowerCase().replace(/ä/g, 'ae').replace(/ö/g, 'oe').replace(/ü/g, 'ue').replace(/ß/g, 'ss')
        .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    window.renderLeitbild = function ({ deco = {}, tileDeco = '' } = {}) {
        const S = L.schwerpunkte;
        const p1 = L.mittelpunkt.absaetze[0];
        const cut = p1.indexOf('. ') + 1;
        const leitsatz = p1.slice(0, cut), einleitung1 = p1.slice(cut).trim();
        const d = k => deco[k] ? `<div class="lb-deco lb-deco-${k}" aria-hidden="true">${deco[k]}</div>` : '';

        /* PageHero – wie {% shape "PageHero", icon: "sprout", eyebrow: "Unser Leitbild", title: DisplayText %} */
        const hero = window.pageHero({
            icon: icon('sprout'), eyebrow: 'Unser Leitbild', title: 'Unsere Schule',
            crumbs: [['Schule']], waveFill: 'fill-surface'
        });

        const intro = `
<section class="lb-intro" aria-labelledby="lb-motto">
    ${d('intro')}
    <div class="container-page lb-intro-grid">
        <div>
            <p class="lb-label">Unser Motto</p>
            <h2 class="lb-motto" id="lb-motto">${L.motto.map(m => `<span>${esc(m)}</span>`).join('')}</h2>
        </div>
        <div class="lb-intro-side">
            <p class="lb-kicker">${esc(L.mittelpunkt.titel)}</p>
            <p class="lb-quote">${esc(leitsatz)}</p>
            <div class="lb-lead"><p>${esc(einleitung1)}</p><p>${esc(L.mittelpunkt.absaetze[1])}</p></div>
        </div>
    </div>
</section>`;

        /* Kacheln – Markup 1:1 wie Content__Schwerpunkt.liquid */
        const tiles = S.map((s, i) => {
            const nr = i + 1, badge = s.id === 'glueck' ? s.kurz : '';
            return `
            <li class="lb-cell">
                <button type="button" class="lb-tile" id="${slug(s.titel)}" aria-haspopup="dialog"
                        data-sp-trigger data-sp-nr-value="${nr}" data-sp-total-value="${S.length}"
                        data-sp-title-value="${esc(s.titel)}" data-sp-text-value="${esc(s.text)}" data-sp-badge-value="${esc(badge)}">
                    ${tileDeco ? `<span class="lb-tile-deco" aria-hidden="true">${tileDeco}</span>` : ''}
                    <span class="lb-tile-top">
                        ${icon(ICON_OF[s.id], 'lb-tile-icon', 1.75)}
                        <span class="lb-tile-nr"><span class="sr-only">Schwerpunkt </span>${String(nr).padStart(2, '0')}</span>
                    </span>
                    <span class="lb-tile-title">${esc(s.titel)}</span>
                    ${badge ? `<span class="lb-badge">${icon(ICON_OF[s.id])}${esc(badge)}</span>` : `<span class="lb-tile-kurz">${esc(s.kurz)}</span>`}
                    <span class="lb-tile-more" aria-hidden="true">${icon('arrow-right')}</span>
                </button>
            </li>`;
        }).join('');

        const areas = `
<section class="lb-areas" aria-labelledby="lb-areas-title">
    ${d('areas')}
    <div class="container-page">
        <div class="lb-areas-head">
            <h2 id="lb-areas-title">Unsere ${S.length} Schwerpunkte</h2>
            <p>Ein Klick auf einen Schwerpunkt zeigt, was dahintersteht.</p>
        </div>
        <ul class="lb-tiles" role="list">${tiles}</ul>
    </div>
</section>`;

        /* Leitsätze wie im Template: "Jedes Kind *zählt.*" → Jedes Kind <em>zählt.</em> */
        const claims = L.ziel.leitsaetze.map(z => {
            const rest = z.replace(/^Jedes Kind /, '');
            return `<li>Jedes Kind <em>${esc(rest)}</em></li>`;
        }).join('');

        const goal = `
<section class="container-page lb-goal" aria-labelledby="lb-goal-title">
    ${d('goal')}
    <div class="lb-goal-grid">
        <div class="lb-goal-text">
            <p class="lb-label">Wohin wir wollen</p>
            <h2 id="lb-goal-title">${esc(L.ziel.titel)}</h2>
            ${L.ziel.absaetze.map(p => `<p>${esc(p)}</p>`).join('')}
        </div>
        <ul class="lb-claims" role="list">${claims}</ul>
    </div>
    <div class="lb-closing"><p>${esc(L.ziel.schluss)}</p></div>
</section>`;

        const end = d('end');

        const dialog = `
<dialog id="schwerpunkt-dialog" class="lb-dialog m-auto" aria-labelledby="schwerpunkt-dialog-title">
    <button type="button" class="lb-dialog-close" data-sp-close aria-label="Schließen">${icon('close')}</button>
    <div class="lb-dialog-body">
        <div class="lb-dialog-icon" data-sp-icon></div>
        <p class="lb-dialog-meta" data-sp-meta></p>
        <h2 class="lb-dialog-title" id="schwerpunkt-dialog-title" data-sp-title></h2>
        <p class="lb-badge" data-sp-badge hidden></p>
        <p class="lb-dialog-text" data-sp-text></p>
    </div>
    <div class="lb-dialog-nav">
        <button type="button" data-sp-step="-1">${icon('chevron-left')}<span><small>Zurück</small><b data-sp-prev></b></span></button>
        <button type="button" data-sp-step="1"><span><small>Weiter</small><b data-sp-next></b></span>${icon('chevron-right')}</button>
    </div>
</dialog>`;

        document.getElementById('page-content').innerHTML = hero + intro + areas + goal + end + dialog;
        setupSchwerpunktDialog();
    };

    /*
     * Port von setupSchwerpunktDialog() aus Assets/js/site.js – einzige Ergänzung (markiert):
     * die Farb-Variablen --lb-tint/--lb-tone/--lb-ink der geklickten Kachel (per :nth-child im
     * CSS gesetzt) werden auf den Dialog übertragen, damit er die Farbe des Schwerpunkts trägt.
     */
    function setupSchwerpunktDialog() {
        const dialog = document.getElementById('schwerpunkt-dialog');
        const tiles = Array.from(document.querySelectorAll('[data-sp-trigger]'));
        const $ = s => dialog.querySelector(s);
        const iconEl = $('[data-sp-icon]'), metaEl = $('[data-sp-meta]'), titleEl = $('[data-sp-title]'),
            badgeEl = $('[data-sp-badge]'), textEl = $('[data-sp-text]'), prevLabel = $('[data-sp-prev]'),
            nextLabel = $('[data-sp-next]'), prevButton = $('[data-sp-step="-1"]'), nextButton = $('[data-sp-step="1"]');
        let current = 0;
        const value = (tile, name) => tile.getAttribute('data-sp-' + name + '-value') || '';

        function show(index) {
            current = (index + tiles.length) % tiles.length;
            const tile = tiles[current];
            const prev = tiles[(current - 1 + tiles.length) % tiles.length];
            const next = tiles[(current + 1) % tiles.length];
            const ic = tile.querySelector('.lb-tile-icon');
            iconEl.innerHTML = '';
            if (ic) iconEl.appendChild(ic.cloneNode(true));
            metaEl.textContent = 'Schwerpunkt ' + value(tile, 'nr') + ' von ' + tiles.length;
            titleEl.textContent = value(tile, 'title');
            textEl.textContent = value(tile, 'text');
            badgeEl.textContent = value(tile, 'badge');
            badgeEl.hidden = !value(tile, 'badge');
            prevLabel.textContent = value(prev, 'title');
            nextLabel.textContent = value(next, 'title');
            prevButton.setAttribute('aria-label', 'Zurück: ' + value(prev, 'title'));
            nextButton.setAttribute('aria-label', 'Weiter: ' + value(next, 'title'));
            /* --- Ergänzung für G/H/I: Farbe der Kachel mitnehmen --- */
            const cs = getComputedStyle(tile);
            ['--lb-tint', '--lb-tone', '--lb-ink', '--lb-tilt'].forEach(p => {
                const v = cs.getPropertyValue(p).trim();
                if (v) dialog.style.setProperty(p, v); else dialog.style.removeProperty(p);
            });
            dialog.dataset.spNr = value(tile, 'nr');
            /* --- Ende Ergänzung --- */
            history.replaceState(null, '', '#' + tile.id);
        }
        function open(index) { show(index); if (!dialog.open) dialog.showModal(); }

        tiles.forEach((tile, index) => tile.addEventListener('click', () => open(index)));
        prevButton.addEventListener('click', () => show(current - 1));
        nextButton.addEventListener('click', () => show(current + 1));
        $('[data-sp-close]').addEventListener('click', () => dialog.close());
        dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
        dialog.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') { e.preventDefault(); show(current - 1); }
            if (e.key === 'ArrowRight') { e.preventDefault(); show(current + 1); }
        });
        dialog.addEventListener('close', () => {
            history.replaceState(null, '', location.pathname + location.search);
            tiles[current].focus();
        });
        function openFromHash() {
            const id = decodeURIComponent(location.hash.slice(1));
            const i = tiles.findIndex(t => t.id === id);
            if (i >= 0) open(i);
        }
        window.addEventListener('hashchange', openFromHash);
        openFromHash();
    }
})();
