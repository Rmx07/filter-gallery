export interface TonePreset {
  id: string;
  label: string;
  css: string;
  swatch: string;
}

export const TONES: TonePreset[] = [
  { id: 'original', label: 'Original', css: 'none', swatch: 'linear-gradient(135deg,#8b8b93,#e6e6ea)' },
  { id: 'mono', label: 'Mono', css: 'grayscale(1) contrast(1.08)', swatch: 'linear-gradient(135deg,#1b1b1f,#d8d8dc)' },
  { id: 'sepia', label: 'Sepia', css: 'sepia(0.75) saturate(1.15) contrast(1.02)', swatch: 'linear-gradient(135deg,#6b4a25,#e3c396)' },
  { id: 'vivid', label: 'Vivid', css: 'saturate(1.65) contrast(1.12)', swatch: 'linear-gradient(135deg,#ff3d81,#ffd23f)' },
  { id: 'cool', label: 'Arctic', css: 'hue-rotate(-18deg) saturate(1.15) brightness(1.04)', swatch: 'linear-gradient(135deg,#1f6feb,#7de3ff)' },
  { id: 'warm', label: 'Amber', css: 'sepia(0.35) saturate(1.5) hue-rotate(-12deg) brightness(1.03)', swatch: 'linear-gradient(135deg,#ff7a18,#ffcf6b)' },
  { id: 'fade', label: 'Faded', css: 'contrast(0.86) saturate(0.7) brightness(1.1)', swatch: 'linear-gradient(135deg,#9aa0a6,#f1e7de)' },
  { id: 'noir', label: 'Noir', css: 'grayscale(1) contrast(1.6) brightness(0.9)', swatch: 'linear-gradient(135deg,#000,#9a9a9a)' },
];

export const toneById = (id: string) => TONES.find((t) => t.id === id) ?? TONES[0];
