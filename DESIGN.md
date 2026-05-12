# Design Brief

## Direction

StudyBuddy — AI learning companion for 8th graders with playful, pastel-driven design that encourages exploration and builds confidence.

## Tone

Playful, warm, and welcoming. Designed for young learners with rounded typography, soft shadows, and colorful subject indicators that feel supportive rather than corporate.

## Differentiation

Five subject-branded color system (Math/Orange, Science/Green, Social Science/Purple, English/Blue, Hindi/Pink) creates visual navigation shortcuts while maintaining a cohesive, friendly aesthetic.

## Color Palette

| Token             | OKLCH           | Role                              |
|-------------------|-----------------|-----------------------------------|
| background        | 0.98 0.008 75   | Soft warm cream base              |
| foreground        | 0.18 0.02 280   | Deep calm text                    |
| card              | 1.0 0.005 75    | Pure white interactive surfaces   |
| primary           | 0.65 0.22 35    | Warm orange (Math flagship)       |
| accent            | 0.7 0.18 190    | Teal (highlights, active states)  |
| success           | 0.62 0.18 145   | Pastel green (correct answers)    |
| subject-math      | 0.65 0.22 35    | Math badge & header               |
| subject-science   | 0.62 0.18 125   | Science badge & header            |
| subject-social    | 0.68 0.2 270    | Social Science badge & header     |
| subject-english   | 0.65 0.2 230    | English badge & header            |
| subject-hindi     | 0.62 0.18 10    | Hindi badge & header              |
| destructive       | 0.6 0.2 25      | Gentle red (errors)               |

## Typography

- Display: Nunito — rounded, friendly, 700 weight for headings. Natural fit for child-facing content. Section headers use `text-4xl md:text-5xl font-bold`.
- Body: Nunito — warm and readable at `text-base` for paragraphs, `text-sm` for UI labels. Mono: Geist Mono for code snippets and technical content.
- Scale: Hero `text-5xl md:text-7xl`, h2 `text-3xl md:text-4xl`, label `text-xs font-semibold uppercase`, body `text-base`.

## Elevation & Depth

Subtle shadow hierarchy — soft drop shadows on cards (sm: 2px, md: 12px, lg: 20px) create gentle depth without harsh outlines. Subject cards elevate on hover with scale and shadow transitions.

## Structural Zones

| Zone      | Background              | Border                         | Notes                                        |
|-----------|-------------------------|--------------------------------|----------------------------------------------|
| Header    | Gradient (orange-purple)| None (gradient as border)     | Warm welcome with subject colors blended     |
| Content   | Soft cream (0.98)       | None                          | Light neutral for readability                |
| Cards     | Pure white (1.0)        | None (shadow only)            | Elevated with sm/md shadow, rounded 12-16px |
| Footer    | Muted bg (0.94)         | Top border (0.9 0.012 75)     | Spacious, aligned to content grid           |

## Spacing & Rhythm

Spacer gaps: 16px (section padding), 8px (component micro-spacing), 24px (between major sections). Cards use 12-16px rounded corners. Generous negative space reinforces calm, encouraging tone.

## Component Patterns

- Buttons: Rounded full (pill-shaped), playful hover scale (105%), active shrink (95%). Primary orange, secondary light. `btn-playful` utility class.
- Cards: 12-16px radius, pure white bg, soft shadows, `card-hover` class with scale+shadow on hover. Subject-branded badges in corner.
- Badges: Subject color pill shapes, white text, 8px padding, uppercase label. Math/Science/Social/English/Hindi each get their own color.
- Chat messages: Alternating left (user) / right (AI) alignment, rounded cards with gentle backgrounds.
- Quiz options: Button-like cards with checkmark on select, color shift to accent (teal) when active.

## Motion

- Entrance: Fade-in + slide-up (0.5s ease-out) for card reveals, Q&A sections. Staggered animation for quiz options.
- Hover: Smooth scale (105%) + shadow elevation on cards. Button text fade on interactive elements.
- Decorative: Gentle bounce on section headers (2s infinite). Smooth transitions (0.3s) on all state changes.

## Constraints

- No garish neon gradients — all accents derived from subject palette hues.
- Minimum 4.5:1 contrast on all body text (cream bg + deep text = 0.8 lightness delta).
- Mobile-first: single column on sm, 2-col grid on md+, 3-col on lg+.
- All animations use `transition-smooth` (cubic-bezier(0.4, 0, 0.2, 1)) for consistency.

## Signature Detail

Five subject color system creates instant visual recognition — each subject gets a unique pastel hue badge that appears on chapter cards, quiz headers, and progress indicators. This transforms abstract NCERT topics into branded, memorable learning zones while maintaining cohesive playful aesthetic.

