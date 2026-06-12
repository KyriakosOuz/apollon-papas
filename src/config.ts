// Site-wide design decisions locked during the prototype phase.
// Colors/typography/radii live in src/styles/site.css as CSS custom properties.

export const SITE = {
  auroraOpacity: 0.5,
  grainOpacity: 0.07,
  marqueeDurationS: 28,
  goldDot: true,
  // Headline tail settles to bright white after the fill-wave reveal
  tailEnd: 'white' as 'white' | 'dim',
  portraitEffect: 'Tilt' as 'Tilt' | 'Spotlight' | 'None',
  linkedinUrl: 'https://www.linkedin.com/in/apollonpapas/',
  email: 'hello@apollonpapas.com',
  crsPath: '/career-readiness-sprint',
};

export const AURORA_PALETTE = ['#F2C14E', '#FF7A3C', '#E85CCB', '#5B7CF5', '#2FD6C2'];

// Token hex values for GSAP color tweens (GSAP cannot tween var() keywords)
export const TOKEN_TEXT = '#F7F7F6';
export const TOKEN_DIM = '#8B8B92';
export const TOKEN_FAINT = '#5E5E66';

export const TRUSTED_LOGOS = [
  { src: '/assets/logos/amazon.svg', alt: 'Amazon', cls: 'lg' },
  { src: '/assets/logos/samsung.svg', alt: 'Samsung', cls: 'sm' },
  { src: '/assets/logos/shein.svg', alt: 'SHEIN', cls: '' },
  { src: '/assets/logos/cosrx.svg', alt: 'COSRX', cls: '' },
  { src: '/assets/logos/michelin.svg', alt: 'Michelin', cls: 'sm' },
  { src: '/assets/logos/zoom.svg', alt: 'Zoom', cls: '' },
];
