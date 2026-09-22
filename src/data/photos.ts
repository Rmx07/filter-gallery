export type Category = 'nature' | 'architecture' | 'portraits' | 'wildlife' | 'abstract';

export interface Photo {
  id: number;
  title: string;
  author: string;
  category: Category;
  orientation: 'landscape' | 'portrait';
  tags: string[];
}

export const CATEGORIES: { id: Category | 'all'; label: string; icon: string }[] = [
  { id: 'all', label: 'All Works', icon: '✦' },
  { id: 'nature', label: 'Landscapes', icon: '🏔' },
  { id: 'architecture', label: 'Architecture', icon: '🏛' },
  { id: 'portraits', label: 'Portraits', icon: '👤' },
  { id: 'wildlife', label: 'Wildlife', icon: '🦓' },
  { id: 'abstract', label: 'Abstract', icon: '🎨' },
];

export const photos: Photo[] = [
  // Nature
  { id: 5560838, title: 'Above the Green Ridge', author: 'Piotr Twardowski', category: 'nature', orientation: 'landscape', tags: ['hiking', 'clouds'] },
  { id: 38230491, title: 'Rugged Silence', author: 'Ahmet Mert', category: 'nature', orientation: 'portrait', tags: ['rock', 'sky'] },
  { id: 36190181, title: 'First Light', author: 'Ahmet Mert', category: 'nature', orientation: 'portrait', tags: ['sunrise', 'shadow'] },
  { id: 7861519, title: 'Himalayan Winter', author: 'Anuj Yadav', category: 'nature', orientation: 'portrait', tags: ['snow', 'india'] },
  { id: 11917565, title: 'Matterhorn Clarity', author: 'Ryan Klaus', category: 'nature', orientation: 'landscape', tags: ['alps', 'switzerland'] },
  { id: 34448034, title: 'Alpine Blue', author: 'Alpin Visuals', category: 'nature', orientation: 'landscape', tags: ['peaks', 'travel'] },

  // Architecture
  { id: 1816030, title: 'Glass & Steel', author: 'Paul Lichtblau', category: 'architecture', orientation: 'landscape', tags: ['urban', 'modern'] },
  { id: 3137050, title: 'Geometric Facade', author: 'Adrien Olichon', category: 'architecture', orientation: 'portrait', tags: ['lines', 'sky'] },
  { id: 9458996, title: 'White Panels', author: 'Stephen Andrews', category: 'architecture', orientation: 'landscape', tags: ['minimal', 'mono'] },
  { id: 39205816, title: 'Metal Angles', author: 'Olivia', category: 'architecture', orientation: 'portrait', tags: ['metal', 'city'] },
  { id: 29214334, title: 'Cologne Harbour', author: 'Bas Linders', category: 'architecture', orientation: 'landscape', tags: ['germany', 'glass'] },
  { id: 2058172, title: 'Cylinder Study', author: 'Francesco Ungaro', category: 'architecture', orientation: 'landscape', tags: ['minimal', 'blue'] },

  // Portraits
  { id: 3851165, title: 'Black Turtleneck', author: 'Anna Shvets', category: 'portraits', orientation: 'portrait', tags: ['studio', 'dark'] },
  { id: 12086593, title: 'Stripes in Motion', author: 'Reyna Montgomery', category: 'portraits', orientation: 'portrait', tags: ['fashion', 'pose'] },
  { id: 9363424, title: 'Projected Colour', author: 'Lara Jameson', category: 'portraits', orientation: 'portrait', tags: ['light', 'studio'] },
  { id: 19432544, title: 'Monochrome Blazer', author: 'Daniil Kondrashin', category: 'portraits', orientation: 'portrait', tags: ['mono', 'editorial'] },
  { id: 7301578, title: 'Blue Beanie', author: 'Norma Mortenson', category: 'portraits', orientation: 'portrait', tags: ['green', 'fashion'] },
  { id: 1671915, title: 'Coffee & Glasses', author: 'Tamara Sharoglazova', category: 'portraits', orientation: 'portrait', tags: ['mono', 'lifestyle'] },

  // Wildlife
  { id: 7710399, title: 'Antelope & Zebra', author: 'Mikhail Nilov', category: 'wildlife', orientation: 'landscape', tags: ['safari', 'africa'] },
  { id: 33650774, title: 'Banded Mongoose', author: 'Alex Ning', category: 'wildlife', orientation: 'portrait', tags: ['kenya', 'small'] },
  { id: 7894343, title: 'Forest Deer', author: 'Nicky Pe', category: 'wildlife', orientation: 'landscape', tags: ['forest', 'texture'] },
  { id: 33750561, title: 'Reticulated Eye', author: 'Chris F', category: 'wildlife', orientation: 'portrait', tags: ['giraffe', 'macro'] },
  { id: 17668509, title: 'Elephant Gaze', author: 'Tanmoy Pal', category: 'wildlife', orientation: 'landscape', tags: ['macro', 'india'] },
  { id: 26727614, title: 'Striped Stare', author: 'Francesco Ungaro', category: 'wildlife', orientation: 'portrait', tags: ['zebra', 'savanna'] },

  // Abstract
  { id: 28494633, title: 'Pink Gradient Grid', author: 'Steve A Johnson', category: 'abstract', orientation: 'landscape', tags: ['gradient', 'geometry'] },
  { id: 29101878, title: 'Soft Spectrum', author: 'Steve A Johnson', category: 'abstract', orientation: 'landscape', tags: ['gradient', 'calm'] },
  { id: 25478870, title: 'Blue Stains', author: 'Steve A Johnson', category: 'abstract', orientation: 'portrait', tags: ['paint', 'violet'] },
  { id: 13169778, title: 'Wall in Two Tones', author: 'Lisett Kruusimäe', category: 'abstract', orientation: 'landscape', tags: ['wall', 'minimal'] },
  { id: 4046715, title: 'Impasto Study', author: 'Kaboompics', category: 'abstract', orientation: 'landscape', tags: ['paint', 'texture'] },
  { id: 6659075, title: 'Prism on Wool', author: 'Francesco Ungaro', category: 'abstract', orientation: 'landscape', tags: ['light', 'fiber'] },
];

export const thumbUrl = (id: number, w = 700) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=${w}`;

export const fullUrl = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=900&w=1400`;

export const sourceUrl = (id: number) => `https://www.pexels.com/photo/${id}/`;
