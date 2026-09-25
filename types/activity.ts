export type ActivityCategory = 
  | 'Environment'
  | 'Education'
  | 'Computer Education'
  | 'Hunger Relief'
  | 'Awareness'
  | 'Community Service';

export type ActivityStatus = 'Completed' | 'Ongoing' | 'Scheduled';

export interface Activity {
  id: string;
  title: string;
  category: ActivityCategory;
  date: string;
  location: string;
  villageOrArea: string;
  summary: string;
  description: string;
  objectives: string[];
  scope: string;
  programAffiliation?: 'Green Haldwani' | 'Seeds of Digital Confidence' | 'Community Nutrition' | 'General Outreach';
  status: ActivityStatus;
  keyOutcomes?: string[];
  imageUrl: string;
  galleryImages?: string[];
  isFeatured?: boolean;
  /** True when the record is prototype/demo data (not an official NGO operational record). */
  isDemo?: boolean;
}
