import { VolunteerRole, VolunteerApplication } from "@/types/volunteer";

export const VOLUNTEER_ROLES: VolunteerRole[] = [
  {
    id: "role-plantation-coordinator",
    roleTitle: "Plantation & Environmental Field Volunteer",
    domain: "Plantation & Ecology",
    focusArea: "Green Haldwani Plantation Drives",
    typicalResponsibilities: [
      "Assisting in sapling transport, pit preparation, and tree-guard setup.",
      "Coordinating with local residents for neighborhood sapling adoption.",
      "Maintaining on-site sapling count and attendance logs.",
    ],
    recommendedSkills: ["Field physical activity", "Team coordination", "Community interaction"],
    locationCoverage: "Haldwani, Nainital Rural & Urban clusters",
    activeInitiatives: ["Green Haldwani", "Cleanliness Campaigns"],
  },
  {
    id: "role-digital-instructor",
    roleTitle: "Computer Education & Digital Literacy Mentor",
    domain: "Digital & Computer Training",
    focusArea: "Seeds of Digital Confidence",
    typicalResponsibilities: [
      "Conducting basic computer operation sessions for rural students.",
      "Guiding learners through typing, MS Office, and online search safety.",
      "Tracking student progress and preparing session logs.",
    ],
    recommendedSkills: ["Basic computer proficiency", "Patience with young learners", "Instructional skills"],
    locationCoverage: "Ramari Choti Learning Center, Haldwani",
    activeInitiatives: ["Seeds of Digital Confidence", "Youth Skill Training"],
  },
  {
    id: "role-documentation-assistant",
    roleTitle: "Documentation & Report Preparation Assistant",
    domain: "Field Documentation & Reporting",
    focusArea: "Daily Reports & Photographic Records",
    typicalResponsibilities: [
      "Recording attendance for field activities and awareness sessions.",
      "Capturing geo-tagged photographs and organizing digital photo archives.",
      "Drafting daily activity summaries and event documentation.",
    ],
    recommendedSkills: ["Written communication", "Organized file handling", "Photography"],
    locationCoverage: "All Active Activity Sites, Haldwani",
    activeInitiatives: ["All Foundation Programs", "Internship Reporting"],
  },
  {
    id: "role-remedial-tutor",
    roleTitle: "Remedial Teaching & Education Support Volunteer",
    domain: "Teaching & Remedial Support",
    focusArea: "Foundational Literacy & Numeracy",
    typicalResponsibilities: [
      "Facilitating reading groups, storytelling, and math puzzle sessions.",
      "Distributing educational stationery and textbooks to students.",
      "Engaging parents on continuous school attendance.",
    ],
    recommendedSkills: ["Subject tutoring", "Child engagement", "Hindi/English communication"],
    locationCoverage: "Village Primary Schools, Nainital District",
    activeInitiatives: ["Education Outreach", "Child Welfare"],
  },
  {
    id: "role-community-mobilizer",
    roleTitle: "Community Outreach & Nutrition Distribution Mobilizer",
    domain: "Community Survey & Mobilization",
    focusArea: "Hunger Relief & Village Samvad",
    typicalResponsibilities: [
      "Liaising with village panchayats and local ward representatives.",
      "Managing queues during community ration and nutritional kit distributions.",
      "Documenting community feedback and grassroots requirements.",
    ],
    recommendedSkills: ["Public speaking", "Local dialect familiarity", "Queue management"],
    locationCoverage: "42+ Villages across Haldwani & Nainital",
    activeInitiatives: ["Hunger Relief", "Community Service"],
  },
];

// Prototype intake queue for demonstration (No fictional individual profiles fabricated)
export const INITIAL_APPLICATIONS: VolunteerApplication[] = [];
