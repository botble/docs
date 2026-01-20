# Animations & Effects

Qore features stunning scroll-triggered animations and visual effects that create a modern, tech-forward aesthetic. This guide covers the animation system and how to customize it.

## Animation System

Qore uses multiple animation libraries and custom effects:

- **WOW.js**: Scroll-triggered reveal animations
- **Odometer**: Animated number counters
- **Custom Effects**: Hacker text, gradient animations, glowing borders

## WOW.js Animations

WOW.js triggers CSS animations when elements scroll into view.

### Available Animation Classes

| Class | Effect |
|-------|--------|
| `wow fadeInUp` | Fade in from bottom |
| `wow fadeInDown` | Fade in from top |
| `wow fadeInLeft` | Fade in from left |
| `wow fadeInRight` | Fade in from right |
| `wow fadeIn` | Simple fade in |
| `wow bounceInScale` | Bounce in with scale effect |
| `wow zoomIn` | Zoom in from small |

### Animation Timing

Animations can be customized with data attributes:

```html
<div class="wow fadeInUp" data-wow-delay="0.2s" data-wow-duration="1s">
  Content here
</div>
```

| Attribute | Description |
|-----------|-------------|
| `data-wow-delay` | Delay before animation starts |
| `data-wow-duration` | Animation duration |
| `data-wow-offset` | Distance from viewport to trigger |

## Lazy Loading Sections

Sections use lazy loading for performance optimization.

### How It Works

1. Sections start with `.shortcode-lazy-loading` class
2. When section enters viewport, content loads
3. Class changes to `.shortcode-lazy-loading-loaded`
4. Animations trigger after loading

### Benefits

- Faster initial page load
- Reduced bandwidth usage
- Smoother scrolling experience
- Better Core Web Vitals scores

## Hacker Text Effect

The "hacker text" effect creates a scrambling/typing animation on text elements.

### Usage

Add the `hacker-text_transform` class to text elements:

```html
<span class="hacker-text_transform">YOUR TEXT</span>
```

The effect randomly scrambles characters before revealing the final text, creating a cyberpunk/tech aesthetic.

### Variations

| Class | Effect |
|-------|--------|
| `hacker-text_transform` | Standard scramble effect |
| `hacker-text_transform no-delay` | Immediate start |
| `hackerText` | Continuous scramble animation |

## Odometer Counters

Animated number counters for statistics sections.

### Usage

```html
<span class="odometer" data-number="1000">0</span>
```

The counter animates from 0 to the target number when scrolled into view.

### Features

- Smooth rolling animation
- Supports decimals
- Configurable duration
- Triggers on scroll into view

## Gradient Animations

Qore uses animated gradients for visual interest:

### Gradient Ring

The gradient ring background used in hero and feature sections creates a glowing orbital effect.

### Border Gradients

Sections feature animated gradient borders using the `.br-line` class, creating subtle glowing dividers.

## Visual Elements

### Half-Plus Decorations

Corner decorations using the `.hafl-plus` class add tech-style corner brackets to sections:

| Class | Position |
|-------|----------|
| `pst-left_top` | Top left corner |
| `pst-right_top` | Top right corner |
| `pst-left_bot` | Bottom left corner |
| `pst-right_bot` | Bottom right corner |

### Rotation Classes

| Class | Effect |
|-------|--------|
| `rotate-top_left` | Rotate for top-left position |
| `rotate-top_right` | Rotate for top-right position |
| `rotate-bot_left` | Rotate for bottom-left position |
| `rotate-bot_right` | Rotate for bottom-right position |

## Performance Considerations

### Optimizing Animations

1. **Lazy Loading**: All sections use lazy loading by default
2. **Will-Change**: Critical animations use `will-change` for GPU acceleration
3. **Reduced Motion**: Respect user preferences with `prefers-reduced-motion`

### Disabling Animations

Users who prefer reduced motion will see simpler transitions. The theme automatically detects this preference:

```css
@media (prefers-reduced-motion: reduce) {
  .wow {
    animation: none !important;
  }
}
```

## Troubleshooting

### Animations Not Triggering

- Check if JavaScript is enabled
- Verify WOW.js is loaded
- Ensure element has `wow` class
- Check scroll position and offset

### Animations Too Fast/Slow

- Adjust `data-wow-duration` attribute
- Modify animation delay with `data-wow-delay`

### Counter Not Animating

- Verify `data-number` attribute is set
- Check Odometer library is loaded
- Ensure element is scrolled into view
