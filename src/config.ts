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
  // Apollo has paused the Greek locale. The toggle is hidden and i18n is pinned
  // to EN (see src/i18n/index.ts); el.json stays in the build so flipping this
  // back to true is the only change needed to bring Greek back.
  showLangToggle: false,
  // Year the business started, for the footer copyright range. The end year is
  // taken from the clock at render time.
  foundedYear: 2017,
  // Programs render as a sticky stack: each card pins under the nav and the
  // next one slides over it. Set to false for a plain scrolling grid.
  programStack: true,
};

// Programs: copy lives in the locale files under `programs.founders` /
// `programs.students`, keyed by id. Layout and media are structural, so they
// live here. `span` drives the grid: 'wide' takes the full row.
export type ProgramMedia = {
  image?: string;
  href?: string;
  span?: 'wide';
  // Overrides the default 16/9 mockup frame. Set it for artwork that carries
  // its own composition and would lose content to a crop.
  ratio?: string;
};

// Same-origin paths rather than full URLs, so these open in place instead of a
// new tab (ProgramCard only adds target=_blank for absolute http(s) links).
export const PROGRAM_MEDIA: Record<string, ProgramMedia> = {
  sprint: { image: '/images/6ws-banner.jpg', href: '/fromchaostorevenue', span: 'wide' },
  // The webinar banner is a finished 2:1 layout with type running to its edges,
  // so it keeps its own ratio rather than being cropped to 16/9.
  powerup: { image: '/images/powerup-banner.jpg', href: '/webinar-powerup', span: 'wide', ratio: '1400 / 684' },
  // The two unreleased programs have nowhere to point yet, so they stay
  // unlinked and render without the arrow.
  mentorship: {},
  vault: {},
  crs: { image: '/images/crs-banner-16x9-dark.png', href: SITE.crsPath, span: 'wide' },
};

// Journey snapshot wall. `rot` tilts each print, `lift` nudges it off the
// baseline and `z` sets the overlap order. Fixed values, not random, so the
// composition is identical on every load.
// `w` varies the print sizes, `focus` shifts the crop for photos whose subject
// is not centred once they are cropped to the shared landscape frame.
export const GALLERY = [
  { src: '/images/gallery/g4.jpg', rot: '-5.5deg', lift: '16px', z: 1, w: '17vw', focus: 'center' },
  { src: '/images/gallery/g3.jpg', rot: '2.5deg', lift: '-12px', z: 3, w: '20vw', focus: 'center' },
  { src: '/images/gallery/g1.jpg', rot: '-1.5deg', lift: '4px', z: 5, w: '23vw', focus: 'center' },
  { src: '/images/gallery/g2.jpg', rot: '4deg', lift: '-6px', z: 2, w: '20vw', focus: 'center' },
  // Shot portrait, so the group sits low once cropped to landscape.
  { src: '/images/gallery/g5.jpg', rot: '-3deg', lift: '20px', z: 4, w: '17vw', focus: 'center 62%' },
];

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
