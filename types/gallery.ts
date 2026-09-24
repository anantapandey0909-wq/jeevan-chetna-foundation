export interface GalleryItem {
  id: string;
  title: string;
  category: 'Plantation Drives' | 'Digital Confidence' | 'Education & Awareness' | 'Community Outreach';
  location: string;
  date: string;
  imageUrl: string;
  caption: string;
  programTag: string;
}
