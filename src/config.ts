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
  // TODO: paste Apollo's real Calendly booking link. Empty = the "Book a call"
  // button falls back to the contact anchor so nothing dead-links in the meantime.
  calendlyUrl: '',
  crsPath: '/career-readiness-sprint',
};

export const AURORA_PALETTE = ['#F2C14E', '#FF7A3C', '#E85CCB', '#5B7CF5', '#2FD6C2'];

// Token hex values for GSAP color tweens (GSAP cannot tween var() keywords)
export const TOKEN_TEXT = '#F7F7F6';
export const TOKEN_DIM = '#8B8B92';
export const TOKEN_FAINT = '#5E5E66';

// GYA Media featured clients. Single-color SVGs and transparent PNGs so the
// mono-white filter in .trusted-logo renders them as clean white silhouettes.
export const TRUSTED_LOGOS = [
  { src: '/assets/logos/microsoft.svg', alt: 'Microsoft', cls: '' },
  { src: '/assets/logos/aws.png', alt: 'AWS', cls: '' },
  { src: '/assets/logos/oracle.png', alt: 'Oracle', cls: '' },
  { src: '/assets/logos/dell.png', alt: 'Dell', cls: 'lg' },
  { src: '/assets/logos/hpe.png', alt: 'Hewlett Packard Enterprise', cls: '' },
  { src: '/assets/logos/veeam.png', alt: 'Veeam', cls: '' },
  { src: '/assets/logos/square.svg', alt: 'Square', cls: '' },
  { src: '/assets/logos/squarespace.svg', alt: 'Squarespace', cls: '' },
  { src: '/assets/logos/invision.svg', alt: 'InVision', cls: '' },
  { src: '/assets/logos/wistia.svg', alt: 'Wistia', cls: '' },
  { src: '/assets/logos/feathr.svg', alt: 'Feathr', cls: '' },
  { src: '/assets/logos/mileiq.svg', alt: 'MileIQ', cls: '' },
  { src: '/assets/logos/swagup.svg', alt: 'SwagUp', cls: '' },
  { src: '/assets/logos/mobilize.svg', alt: 'Mobilize', cls: '' },
];
