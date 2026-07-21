# Design System Document



## 1. Overview & Creative North Star

### The Creative North Star: "The Living Meadow"

This design system moves away from the rigid, institutional "grid-and-box" aesthetic typical of primary schools. Instead, it embraces a **High-End Editorial** approach that reflects the organic beauty of the poppy flower and the growth of a child. We define this as "The Living Meadow"—a digital environment that feels breathable, tactile, and intentionally soft.



By utilizing **intentional asymmetry**, large-scale typography, and overlapping container systems, we create a signature visual identity. We reject "standard" UI defaults in favor of a layered, premium experience that feels as curated as a high-end educational publication.



## 2. Colors

Our palette is rooted in the natural vibrancy of the poppy and the grounded greens of the forest.



### Tonal Strategy

* **Primary (`#bb0600`):** The Vibrant Poppy Red. Used as a high-energy focal point for major CTAs and "Hero" highlights.

* **Secondary (`#4d6622`):** The Moss Green. Provides a stable, nurturing anchor for interactive elements and supportive navigation.

* **Tertiary (`#565f47`):** The Deep Forest. Used for refined depth and authoritative text.

* **Surface Foundation (`#f9fbed`):** A warm, soft sage-tinted cream that replaces stark white to reduce eye strain and feel more "organic paper" than "digital screen."



### The "No-Line" Rule

To maintain a high-end, modern feel, **1px solid borders are strictly prohibited** for sectioning. Structural boundaries must be defined through:

1. **Background Color Shifts:** Use `surface-container-low` sections against a `background` surface.

2. **Vertical Rhythm:** Use the Spacing Scale (specifically `12`, `16`, or `20`) to create distinct zones.



### Surface Hierarchy & Nesting

Treat the UI as a series of physical layers. Content should be organized by nesting `surface-container` tiers:

* **Base:** `surface` (The meadow)

* **Section:** `surface-container-low` (The soft clearing)

* **Component:** `surface-container-lowest` (The focal point/paper)



### The "Glass & Gradient" Rule

For floating announcements or navigation headers, use **Glassmorphism**. Apply a semi-transparent `surface` color with a `backdrop-blur-md` effect. This prevents the UI from feeling "clipped on" and allows the poppy-red accents to bleed through softly.



**Signature Texture:** Use a subtle linear gradient from `primary` (`#bb0600`) to `primary-container` (`#e90900`) for Hero buttons to add a "petal-like" depth.



## 3. Typography

We use a dual-font strategy to balance playful approachability with editorial authority.



* **Display & Headlines (Plus Jakarta Sans):** A modern, geometric sans-serif with friendly curves. Use `display-lg` (3.5rem) with tight tracking (-0.02em) for hero sections to create a high-end editorial look.

* **Body & Titles (Lexend):** Specifically designed to reduce visual stress and improve reading proficiency—perfect for an educational context.



The hierarchy conveys **Intentional Warmth**. Large headlines aren't just for information; they are design elements. Use `headline-lg` for section headers, ensuring they have ample "breathing room" (at least `spacing-12`) from the content below.



## 4. Elevation & Depth

Depth in this design system is achieved through **Tonal Layering** rather than artificial shadows.



* **The Layering Principle:** Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a "soft lift" that feels natural and premium.

* **Ambient Shadows:** If a card must float (e.g., a critical alert), use a shadow with a blur of `xl` or `2xl`, but set the opacity to a mere `6%`. The shadow color should be a tinted `secondary` (Moss Green) rather than gray, mimicking light passing through a leaf.

* **The "Ghost Border" Fallback:** If a container requires more definition, use a "Ghost Border": `outline-variant` (`#eabcb4`) at `20%` opacity. **Never use 100% opaque borders.**

* **Roundedness Scale:** We embrace soft, friendly curves.

* **Default:** `1rem` (For standard cards)

* **Large (lg):** `2rem` (For hero images and section containers)

* **Extra Large (xl):** `3rem` (For main layout wrappers)



## 5. Components

### Buttons

* **Primary:** `bg-primary`, `rounded-full`, `px-8`, `py-4`. Use the "Signature Texture" gradient. Typography: `label-md` in uppercase with letter-spacing for a premium feel.

* **Secondary:** `bg-secondary-container` with `on-secondary-container` text. No border.



### Cards & Lists

* **Forbid Divider Lines.** Use `spacing-6` or background shifts to separate items.

* **Cards:** Use `rounded-lg` or `rounded-xl`. Headlines inside cards should use `title-lg`.

* **Lists:** Items should sit on alternating `surface-container-low` and `surface-container-highest` backgrounds for "Zebra" striping without lines.



### Inputs & Fields

* **Style:** `bg-surface-container-high`, `border-none`, `rounded-md`.

* **Focus State:** A soft `2px` glow using `primary` at `30%` opacity.



### Featured Components (School Context)

* **The "Meadow" Gallery:** An asymmetrical grid of photos with varying `rounded-xl` corners (e.g., `rounded-tl-xl`, `rounded-br-xl`) to mimic the organic shape of poppy petals.

* **Class Chips:** Use `secondary-container` for active filters. These should feel like smooth river stones—highly rounded (`rounded-full`) and tactile.



## 6. Do's and Don'ts



### Do

* **DO** use whitespace as a functional element. Give headlines room to "sing."

* **DO** overlap elements. Let an image `translate-y-12` over a background color shift to break the grid.

* **DO** use the poppy red sparingly as a "heartbeat" throughout the site—too much will feel aggressive; just enough feels alive.



### Don't

* **DON'T** use black (`#000000`) for text. Use `on-surface` (`#1a1d15`) to maintain the organic, high-end feel.

* **DON'T** use "Default" Tailwind shadows (e.g., `shadow-md`). They are too dark. Stick to the **Ambient Shadow** rule.

* **DON'T** align everything perfectly to the left. Introduce slight offsets in your layout to create a rhythmic, editorial flow.
