# design.md – Julia Kramer (julia-kramer.de)
**Mental Load Labor · Non-commercial Honeypot**  
Extrahiert & adaptiert aus hochwertigen SaaS-/Platform-Patterns (u. a. UiPath Workflow-Stage),  
übersetzt in eine ruhige, erwachsene, systemische Ästhetik.

---

## 1. Markenkern

| Aspekt | Wert |
|--------|------|
| Name | Julia Kramer |
| Positionierung | Mental Load sichtbar machen und mit Systemen reduzieren |
| Haltung | Klar, ruhig, kompetent, nicht-wertend, systemisch |
| Versprechen | Systeme statt Schuldgefühle. Klarheit statt Optimierungsdruck. |
| Tonalität | Erwachsen, präzise, warm – nie coaching-mäßig oder kuschelig |

---

## 2. Farb-Tokens (konkret)

```css
:root {
  /* Primary – ruhiges Petrol/Teal */
  --color-primary:        #0F4C5C;
  --color-primary-hover:  #0A3A46;
  --color-primary-soft:   #E6F0F2;

  /* Accent – gedämpftes Terracotta (nur sparsam für CTAs) */
  --color-accent:         #C45C3E;
  --color-accent-hover:   #A84B32;

  /* Neutrals */
  --color-bg:             #F7F3EB;   /* warmes Cream */
  --color-bg-elevated:    #FFFFFF;
  --color-bg-subtle:      #F0EBE3;
  --color-border:         #E5DFD6;
  --color-border-strong:  #D4CDC2;

  /* Text */
  --color-text:           #1A1A1A;
  --color-text-muted:     #5C5C5C;
  --color-text-subtle:    #8A8A8A;

  /* Semantic (für Workflow-States) */
  --color-complete:       #0F4C5C;
  --color-active:         #C45C3E;
  --color-pending:        #D4CDC2;
  --color-exception:      #8B5E3C;
}
```

**Verwendung**
- Primary: Überschriften, aktive States, primäre Buttons, Fortschrittsbalken
- Accent: nur für starke CTAs („Check starten“, „Zur Begleitung“)
- Cream-Hintergrund: gesamte Seite – warm, nicht klinisch
- Kein grelles Orange, kein Corporate-Blau

---

## 3. Typografie

```css
:root {
  --font-sans: "Inter", system-ui, -apple-system, sans-serif;
  --font-serif: "Source Serif 4", "Source Serif Pro", Georgia, serif;

  --text-xs:   0.75rem;
  --text-sm:   0.875rem;
  --text-base: 1rem;
  --text-lg:   1.125rem;
  --text-xl:   1.25rem;
  --text-2xl:  1.5rem;
  --text-3xl:  1.875rem;
  --text-4xl:  2.25rem;
  --text-5xl:  3rem;

  --leading-tight:   1.25;
  --leading-snug:    1.375;
  --leading-normal:  1.5;
  --leading-relaxed: 1.625;
}
```

**Hierarchie**
- H1: text-4xl / text-5xl, font-medium, tracking-tight
- H2: text-2xl / text-3xl, font-medium
- Body: text-base / text-lg, leading-relaxed, color-text-muted
- Labels / Stage: text-sm, tracking-wide, color-text-subtle

---

## 4. Spacing & Radii

```css
:root {
  --space-1:  0.25rem;
  --space-2:  0.5rem;
  --space-3:  0.75rem;
  --space-4:  1rem;
  --space-5:  1.25rem;
  --space-6:  1.5rem;
  --space-8:  2rem;
  --space-10: 2.5rem;
  --space-12: 3rem;
  --space-16: 4rem;
  --space-20: 5rem;
  --space-24: 6rem;

  --radius-sm:   0.5rem;
  --radius-md:   0.75rem;
  --radius-lg:   1rem;
  --radius-xl:   1.25rem;
  --radius-2xl:  1.5rem;
  --radius-full: 9999px;
}
```

---

## 5. Komponenten-Patterns (aus Workflow-Stage adaptiert)

### 5.1 Stage / Node Card

```html
<article class="stage-node" data-state="complete | active | pending">
  <div class="stage-node__icon">…</div>
  <div class="stage-node__body">
    <h3 class="stage-node__title">Mental-Load-Check</h3>
    <p class="stage-node__stage">Werkzeug 01</p>
  </div>
  <div class="stage-node__chip" data-status="done">Abgeschlossen</div>
</article>
```

```css
.stage-node {
  position: relative;
  background: var(--color-bg-elevated);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-5) var(--space-6);
  transition: border-color 0.2s, box-shadow 0.2s;
}

.stage-node[data-state="active"] {
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px var(--color-primary-soft);
}

.stage-node[data-state="complete"] {
  border-color: var(--color-primary);
}

.stage-node__chip {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  font-size: var(--text-xs);
  font-weight: 500;
  background: var(--color-primary-soft);
  color: var(--color-primary);
}

.stage-node__chip[data-status="active"] {
  background: color-mix(in srgb, var(--color-accent) 15%, white);
  color: var(--color-accent);
}
```

### 5.2 Workflow-Edge (Scrolling / Progress-Effekt)

Aus dem UiPath-SVG-Pattern (stroke-dashoffset):

```css
.workflow-edge {
  stroke: var(--color-border-strong);
  stroke-width: 2;
  fill: none;
}

.workflow-edge--grow {
  stroke: var(--color-primary);
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  transition: stroke-dashoffset 0.8s ease-out;
}

.workflow-edge.is-lit .workflow-edge--grow {
  stroke-dashoffset: 0;
}

.workflow-edge-arrow {
  fill: var(--color-border-strong);
  transition: fill 0.3s;
}

.workflow-edge.is-lit .workflow-edge-arrow {
  fill: var(--color-primary);
}
```

**Nutzung auf julia-kramer.de**
Mental-Load-Prozess als Stages:
1. Sichtbar machen (Check)
2. Verteilen (Wochen-Last)
3. Entscheiden (Entscheidungs-Filter)
4. Entlasten (Systeme / Begleitung)

Beim Scrollen oder Fortschritt werden Edges nacheinander `.is-lit`.

### 5.3 Button

```css
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-md);
  font-weight: 500;
  font-size: var(--text-base);
  transition: background 0.15s, color 0.15s, border-color 0.15s;
}

.btn--primary {
  background: var(--color-primary);
  color: white;
}
.btn--primary:hover {
  background: var(--color-primary-hover);
}

.btn--accent {
  background: var(--color-accent);
  color: white;
}

.btn--ghost {
  background: transparent;
  border: 1px solid var(--color-border-strong);
  color: var(--color-text);
}
```

### 5.4 Dimension Bar (Mental-Load-Check)

```css
.dimension-bar {
  height: 0.625rem;
  width: 100%;
  border-radius: var(--radius-full);
  background: var(--color-border);
  overflow: hidden;
}

.dimension-bar__fill {
  height: 100%;
  border-radius: var(--radius-full);
  background: var(--color-primary);
  transition: width 0.5s ease-out;
}
```

---

## 6. Layout & Scrolling

- Große, ruhige Hero-Sections
- Klare vertikale Abfolge von Phasen
- Intersection Observer aktiviert Edges und States
- Keine aggressiven Parallax-Effekte – nur dezente Reveal- und Line-Animationen

```ts
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-lit');
      }
    });
  },
  { threshold: 0.4 }
);

document.querySelectorAll('.workflow-edge').forEach((el) => observer.observe(el));
```

---

## 7. Inhalts- & Conversion-Prinzipien

- Sichtbarkeit vor Bewertung
- Keine Gamification, keine Rankings
- Werkzeuge sind der eigentliche Wert (Honeypot)
- Premium-Angebote sichtbar, aber nie aufdringlich
- Jedes Werkzeug ist so gebaut, dass es später 1:1 in den SaaS wandern kann

---

## 8. Technische Umsetzung

- SvelteKit + Tailwind v4 + static adapter (wie Hannah / Felix)
- Design-Tokens als CSS-Variablen
- Komponenten unter `src/lib/components/`
- Workflow-Animationen: SVG + CSS + Intersection Observer
- Keine schweren Libraries nötig

---

## 9. Referenz-Mapping (UiPath → Julia)

| UiPath-Element              | Julia-Übersetzung                          |
|-----------------------------|--------------------------------------------|
| Platform Stage Nodes        | Werkzeug- / Phasen-Karten                  |
| Animated Edges              | Prozess-Fortschritt Mental Load            |
| Status-Chips (Routed, …)    | Zustände: Sichtbar / Verteilt / Entlastet  |
| Orange Primary CTA          | Teal Primary + sparsame Terracotta-CTAs    |
| Dunkler, dichter Text       | Warmes Cream + viel Weißraum               |
| Corporate Energy            | Ruhige, systemische Klarheit               |

---

**Diese design.md ist die verbindliche Grundlage für julia-kramer.de.**
