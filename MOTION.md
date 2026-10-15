# Motion system

The current portfolio uses bespoke typesetting and print-production references. This replaces the earlier generic image rail. See DESIGN.md for research and composition.

## Shared behavior

MotionProvider registers GSAP plugins and reads live motion/pointer preferences through useSyncExternalStore. Desktop smooth scrolling uses Lenis; touch, reduced-motion and admin routes keep native scrolling. Scroll triggers are scoped with gsap.context and cleaned up on unmount. Text content is server-rendered and remains visible without JavaScript.

## Active animation inventory

| Element | Behavior | Reduced-motion / touch |
| --- | --- | --- |
| Signature intro | A short character reveal followed by an upward paper wipe; once per browser session | Skipped under reduced motion; no fake percentage |
| Display headings | Masked line reveal; SplitText autoSplit responds to font loading and width changes | Static text |
| Text cylinder | Continuous 28s CSS rotation, restrained pointer tilt, scroll offset and entrance | Static word list for reduced motion; no pointer tilt on touch |
| Cylinder controls | Pause/resume button; IntersectionObserver pauses rotation outside the viewport | Rotation never starts under reduced motion |
| Statement | Scroll-controlled progression from gray ink to white | Fully readable solid text |
| Content and rules | Small translate/opacity reveal; rules draw from the left | No hiding or reveal animation |
| Design approach | Desktop sticky heading; active reading counter changes as each paragraph enters | Stacked mobile layout; no animated counter under reduced motion |
| Header | Rollover labels; reading progress line | Direct label state on reduced motion |
| Pointer | Small tracking ring with contextual verbs | Native pointer for touch, reduced motion, admin and dialog surfaces |
| Buttons | Restrained magnetic displacement, 8px maximum | Disabled on touch and reduced motion |
| Skills | Native details with interruptible height tween and rotating plus | Instant native disclosure; first item initially open |
| Mobile menu | Native dialog, masked-looking staggered link entrance and short exit | Instant dialog; native keyboard focus and Escape |
| Practice type | Slow CSS conveyor, pause on hover and explicit pause/resume button | One static wrapped copy |
| Page navigation | React ViewTransition enter/exit classes where supported | Direct navigation when unsupported or reduced motion |
| Contact invitation | Arrow rotates and translates on hover | Direct state change |

## Performance boundaries

Animations primarily use transforms and opacity. Continuous motion is limited to the visible cylinder, a small scroll cue and the practice conveyor. Disclosure height is animated only during explicit interaction. No WebGL, images, remote animation service or extra package was introduced.

## Verification

Run type checks, ESLint and a production build after changing the shared motion system. Browser acceptance should include desktop and mobile widths, reduced-motion changes, cylinder pause/resume, keyboard menu operation, interrupted accordion toggles, route navigation and returning to the homepage. Do not interpret server-rendered markup checks as visual verification.
