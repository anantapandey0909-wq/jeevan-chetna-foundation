import { z } from 'zod';

// Auth Login Schema
export const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

// Activity Schemas
export const createActivitySchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
  location: z.string().min(2, 'Location is required'),
  villageOrArea: z.string().min(2, 'Village or area is required'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  objectives: z.array(z.string()).optional().default([]),
  scope: z.string().optional().default(''),
  programAffiliation: z.string().optional().nullable(),
  status: z.enum(['Completed', 'Ongoing', 'Scheduled']).default('Scheduled'),
  keyOutcomes: z.array(z.string()).optional().default([]),
  imageUrl: z.string().url('Must be a valid image URL').or(z.string().min(1)),
  galleryImages: z.array(z.string()).optional().default([]),
  isFeatured: z.boolean().optional().default(false),
  isDemo: z.boolean().optional().default(true),
  sourceType: z.string().optional().default('PROTOTYPE_DEMO'),
});

export const updateActivitySchema = createActivitySchema.partial();

// Event Schemas
export const createEventSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters'),
  category: z.string().min(1, 'Category is required'),
  date: z.string().min(1, 'Date is required'),
  time: z.string().min(1, 'Time is required'),
  location: z.string().min(2, 'Location is required'),
  venue: z.string().min(2, 'Venue is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  focusArea: z.string().min(2, 'Focus area is required'),
  status: z.enum(['Upcoming', 'Completed', 'Registration Open']).default('Upcoming'),
  programTag: z.string().min(1, 'Program tag is required'),
  capacity: z.string().optional().nullable(),
  imageUrl: z.string().min(1, 'Image URL is required'),
  coordinationNotes: z.string().min(5, 'Coordination notes are required'),
  isDemo: z.boolean().optional().default(true),
  sourceType: z.string().optional().default('PROTOTYPE_DEMO'),
});

export const updateEventSchema = createEventSchema.partial();

// Event RSVP Schema
export const eventRSVPSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  role: z.string().default('Volunteer Participant'),
  notes: z.string().optional().nullable(),
});

// Volunteer Enrollment Schema
export const volunteerEnrollmentSchema = z.object({
  fullName: z.string().min(3, 'Full name must be at least 3 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid 10-digit phone number'),
  areaOfInterest: z.string().min(1, 'Please select an area of interest'),
  skills: z.union([z.string(), z.array(z.string())]),
  availability: z.string().min(1, 'Please specify availability'),
  preferredLocation: z.string().min(2, 'Please specify preferred location'),
  isDemo: z.boolean().optional().default(true),
  sourceType: z.string().optional().default('PROTOTYPE_DEMO'),
});

// Documentation / Report Schema
export const createReportSchema = z.object({
  reportCode: z.string().optional(),
  title: z.string().min(5, 'Title must be at least 5 characters'),
  type: z.string().min(1, 'Report type is required'),
  associatedActivity: z.string().min(3, 'Associated activity is required'),
  date: z.string().min(1, 'Date is required'),
  authorOrIntern: z.string().min(2, 'Author or intern name is required'),
  location: z.string().min(2, 'Location is required'),
  summary: z.string().min(10, 'Summary must be at least 10 characters'),
  status: z.enum(['Verified', 'Archived', 'Under Review']).default('Under Review'),
  keyObservations: z.array(z.string()).default([]),
  fileFormat: z.string().default('PDF Document'),
  sizeEstimate: z.string().default('1.2 MB'),
  fileUrl: z.string().optional().nullable(),
  isDemo: z.boolean().optional().default(true),
  sourceType: z.string().optional().default('PROTOTYPE_DEMO'),
});

// Attendance Record Schema
export const createAttendanceSchema = z.object({
  volunteerName: z.string().min(2, 'Volunteer name is required'),
  activityTitle: z.string().min(2, 'Activity title is required'),
  date: z.string().min(1, 'Date is required'),
  status: z.string().default('Present'),
  checkInTime: z.string().optional().nullable(),
  checkOutTime: z.string().optional().nullable(),
  isDemo: z.boolean().optional().default(true),
});

// Gallery Item Schema
export const createGalleryItemSchema = z.object({
  title: z.string().min(3, 'Title is required'),
  category: z.string().min(1, 'Category is required'),
  location: z.string().min(2, 'Location is required'),
  date: z.string().min(1, 'Date is required'),
  imageUrl: z.string().min(1, 'Image URL is required'),
  caption: z.string().min(5, 'Caption is required'),
  programTag: z.string().min(1, 'Program tag is required'),
  isDemo: z.boolean().optional().default(true),
  sourceType: z.string().optional().default('PROTOTYPE_DEMO'),
});

// Contact Submission Schema
export const contactSubmissionSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(10, 'Please enter a valid phone number'),
  subject: z.string().min(2, 'Subject is required'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});
