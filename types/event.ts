export type EventStatus = 'Upcoming' | 'Completed' | 'Registration Open';

export interface CommunityEvent {
  id: string;
  title: string;
  category: 'Plantation Drive' | 'Digital Literacy' | 'Health & Nutrition' | 'Awareness Workshop' | 'Community Meeting';
  date: string;
  time: string;
  location: string;
  venue: string;
  description: string;
  focusArea: string;
  status: EventStatus;
  programTag: string;
  capacity?: string;
  imageUrl: string;
  coordinationNotes: string;
}
