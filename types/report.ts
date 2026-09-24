export type ReportType = 
  | 'Daily Internship Report'
  | 'Event Summary'
  | 'Attendance Record'
  | 'Activity Summary'
  | 'Photograph Log'
  | 'Field Documentation';

export type DocumentationStatus = 'Archived' | 'Verified' | 'Under Review';

export interface DocumentationRecord {
  id: string;
  reportCode: string;
  title: string;
  type: ReportType;
  associatedActivity: string;
  date: string;
  authorOrIntern: string;
  location: string;
  summary: string;
  status: DocumentationStatus;
  keyObservations: string[];
  fileFormat: string;
  sizeEstimate: string;
}
