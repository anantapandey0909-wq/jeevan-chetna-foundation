export type VolunteerDomain = 
  | 'Plantation & Ecology'
  | 'Digital & Computer Training'
  | 'Teaching & Remedial Support'
  | 'Field Documentation & Reporting'
  | 'Event Coordination'
  | 'Community Survey & Mobilization';

export interface VolunteerRole {
  id: string;
  roleTitle: string;
  domain: VolunteerDomain;
  focusArea: string;
  typicalResponsibilities: string[];
  recommendedSkills: string[];
  locationCoverage: string;
  activeInitiatives: string[];
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  areaOfInterest: string;
  skills: string[];
  availability: string;
  preferredLocation: string;
  submittedAt: string;
  status: 'Pending Review' | 'Verified' | 'Assigned';
}
