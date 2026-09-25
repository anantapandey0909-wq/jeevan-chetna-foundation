export interface GalleryItem {
  id: string;
  title: string;
  category: 'Plantation Drives' | 'Digital Confidence' | 'Education & Awareness' | 'Community Outreach';
  location: string;
  date: string;
  imageUrl: string;
  caption: string;
  programTag: string;
  /** True when the record is prototype/demo data (not an official NGO operational record). */
  isDemo?: boolean;
}
