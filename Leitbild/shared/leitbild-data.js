/*
 * Leitbild der VS Puch bei Weiz - 1:1 aus "UNSER LEITBILD VS PUCH bei WEIZ.docx" uebernommen.
 * Alle Mockup-Varianten lesen ihre Texte aus diesem einen Objekt, damit der Inhalt ueberall
 * identisch ist und nur die Darstellung verglichen wird.
 * In OrchardCore wuerde das spaeter z.B. ein Content-Type "Leitbild" mit einem BagPart
 * "Schwerpunkte" (Titel, Text, Icon) sein.
 */
window.LEITBILD = {
    titel: 'Unser Leitbild',
    motto: ['Gemeinsam lernen.', 'Gemeinsam wachsen.', 'Zukunft gestalten.'],
    mittelpunkt: {
        titel: 'Das Kind steht im Mittelpunkt',
        absaetze: [
            'Jedes Kind ist einzigartig. Wir nehmen seine Persönlichkeit, Interessen, Fähigkeiten und Bedürfnisse wahr und begleiten es auf seinem individuellen Lern- und Entwicklungsweg.',
            'Wir schaffen eine wertschätzende und vertrauensvolle Lernumgebung, in der sich jedes Kind angenommen und wohlfühlt. Wir fördern individuelle Stärken, wecken Freude am Lernen und unterstützen die Kinder dabei, sich zu selbstbewussten, selbstständigen und verantwortungsvollen Persönlichkeiten zu entwickeln.'
        ]
    },
    // gruppe: thematische Buendelung fuer Varianten, die die 12 Punkte gliedern wollen
    // (Herz = Persoenlichkeit & Miteinander, Kopf = Wissen & Koennen, Hand = Tun & Gestalten, Welt = Natur & Zukunft)
    schwerpunkte: [
        { nr: 1, id: 'musik', icon: '🎵', gruppe: 'hand', titel: 'Musik und Chorgesang', kurz: 'Singen, Musizieren, Gemeinschaft',
          text: 'Wir fördern musikalische Begabungen, Kreativität und Gemeinschaft durch gemeinsames Singen und Musizieren. Musik eröffnet neue Ausdrucksmöglichkeiten und bereichert unser Schulleben.' },
        { nr: 2, id: 'digital', icon: '💻', gruppe: 'kopf', titel: 'Digitales Lernen', kurz: 'Fit für die digitale Welt',
          text: 'Wir machen Kinder fit für die digitale Welt und fördern einen kreativen, verantwortungsvollen und bewussten Umgang mit digitalen Medien. Wir nutzen digitale Technologien als sinnvolle Ergänzung des Lernens.' },
        { nr: 3, id: 'lesen', icon: '📚', gruppe: 'kopf', titel: 'Lesen und Bibliothek', kurz: 'Lesefreude und Fantasie',
          text: 'Unsere kindgerechte Bibliothek mit einladenden Leseplätzen weckt Lesefreude, Fantasie und die Lust auf Geschichten und Wissen. Wir fördern Lesekompetenz und die Freude am Lesen.' },
        { nr: 4, id: 'sport', icon: '⚽', gruppe: 'hand', titel: 'Bewegung und Sport', kurz: 'Gesundheit und Fairness',
          text: 'Wir fördern Freude an Bewegung, Gesundheit, Körperbewusstsein und Fairness durch vielfältige sportliche Aktivitäten. Bewegung ist für uns ein wichtiger Bestandteil ganzheitlichen Lernens.' },
        { nr: 5, id: 'kreativ', icon: '🎨', gruppe: 'hand', titel: 'Kreativität und Gestalten', kurz: 'Fantasie und eigene Ideen',
          text: 'Wir fördern Fantasie und schöpferisches Denken als festen Bestandteil des Unterrichts. Zusätzliche freiwillige Lernangebote eröffnen Raum, eigene Ideen umzusetzen und kreative Talente weiterzuentwickeln.' },
        { nr: 6, id: 'mint', icon: '🔬', gruppe: 'kopf', titel: 'MINT – Forschen und Entdecken', kurz: 'Experimentieren und Fragen stellen',
          text: 'Wir wecken Neugier und fördern mathematisches, naturwissenschaftliches und technisches Denken durch Experimentieren, Forschen und Entdecken. Wir ermutigen Kinder, Fragen zu stellen und eigene Lösungen zu finden.' },
        { nr: 7, id: 'sprache', icon: '💬', gruppe: 'kopf', titel: 'Sprache und Kommunikation', kurz: 'Gedanken und Gefühle ausdrücken',
          text: 'Wir stärken Sprachkompetenz, Ausdrucksfähigkeit und Freude an Sprache als Grundlage für erfolgreiches Lernen und ein gutes Miteinander. Wir unterstützen Kinder dabei, ihre Gedanken und Gefühle auszudrücken.' },
        { nr: 8, id: 'inklusion', icon: '🌈', gruppe: 'herz', titel: 'Inklusion und Vielfalt', kurz: 'Teilhabe für alle',
          text: 'Wir begegnen jedem Kind mit Wertschätzung, achten individuelle Bedürfnisse und schaffen Möglichkeiten zur Teilhabe für alle. Vielfalt sehen wir als Bereicherung unserer Schulgemeinschaft.' },
        { nr: 9, id: 'gemeinschaft', icon: '🤝', gruppe: 'herz', titel: 'Gemeinschaft und Miteinander', kurz: 'Zusammenhalt und Respekt',
          text: 'Wir leben Zusammenhalt, Respekt und gegenseitige Unterstützung. Wir fördern soziale Kompetenzen, Hilfsbereitschaft und einen wertschätzenden Umgang miteinander. Jedes Kind ist ein wichtiger Teil unserer Schulgemeinschaft.' },
        { nr: 10, id: 'glueck', icon: '🍀', gruppe: 'herz', titel: 'Glücksunterricht und Wohlbefinden', kurz: 'Zertifizierte Glücksschule',
          text: 'Als zertifizierte Glücksschule legen wir besonderen Wert auf das Wohlbefinden und die Persönlichkeitsentwicklung unserer Kinder. Im Glücksunterricht stärken wir Selbstvertrauen, Selbstwertgefühl, Achtsamkeit und soziale Kompetenzen. Die Kinder lernen, eigene Gefühle wahrzunehmen, Herausforderungen positiv zu begegnen und ihr persönliches Glück sowie das Miteinander bewusst mitzugestalten.' },
        { nr: 11, id: 'natur', icon: '🌳', gruppe: 'welt', titel: 'Lernen in und mit der Natur', kurz: 'Entdecken, Erleben, Begreifen',
          text: 'Wir nutzen die Natur als vielfältigen Lern- und Erfahrungsraum. Durch unmittelbares Entdecken, Erleben und Begreifen ermöglichen wir nachhaltige Lernerfahrungen und stärken die Verbundenheit mit unserer Umwelt.' },
        { nr: 12, id: 'oeko', icon: '♻️', gruppe: 'welt', titel: 'Ökologie und Nachhaltigkeit', kurz: 'Verantwortung für morgen',
          text: 'Wir vermitteln einen achtsamen Umgang mit unserer Umwelt und stärken das Bewusstsein für Nachhaltigkeit und Verantwortung. Wir ermutigen Kinder, aktiv an einer lebenswerten Zukunft mitzuwirken.' }
    ],
    gruppen: {
        herz: { label: 'Herz', icon: '💛', beschreibung: 'Persönlichkeit & Miteinander' },
        kopf: { label: 'Kopf', icon: '💡', beschreibung: 'Wissen & Können' },
        hand: { label: 'Hand', icon: '✋', beschreibung: 'Tun & Gestalten' },
        welt: { label: 'Welt', icon: '🌍', beschreibung: 'Natur & Zukunft' }
    },
    ziel: {
        titel: 'Unser gemeinsames Ziel',
        absaetze: [
            'Wir wollen eine Schule sein, die Kinder stärkt, begeistert und auf das Leben vorbereitet. Eine Schule, die individuelle Potenziale entfaltet, Vielfalt lebt, Gemeinschaft fördert und Zukunft gestaltet.',
            'Wir begleiten Kinder dabei, ihre Fähigkeiten zu entdecken, ihre Persönlichkeit zu entfalten und ihren eigenen Weg zu finden.'
        ],
        leitsaetze: ['Jedes Kind zählt.', 'Jedes Kind hat Stärken.', 'Jedes Kind darf wachsen.'],
        schluss: 'Gemeinsam schaffen wir Raum für Entwicklung, Vertrauen, Freude und Zukunft.'
    }
};
