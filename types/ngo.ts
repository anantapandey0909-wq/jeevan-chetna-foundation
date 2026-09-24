export interface NGOMetadata {
  name: string;
  shortName: string;
  tagline: string;
  portalSubtitle: string;
  officialWebsite: string;
  legalStatus: string;
  certification: string;
  registrationState: string;
  serviceDuration: string;
  officeAddress: {
    street: string;
    locality: string;
    city: string;
    district: string;
    state: string;
    country: string;
  };
  metrics: {
    livesImpacted: string;
    villagesServed: string;
    activeVolunteers: string;
    yearsOfService: string;
  };
  coreSectors: Array<{
    id: string;
    title: string;
    description: string;
    icon: string;
    focus: string;
  }>;
  flagshipPrograms: Array<{
    title: string;
    tag: string;
    focus: string;
    description: string;
    outreach: string;
  }>;
}
