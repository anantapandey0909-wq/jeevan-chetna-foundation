/**
 * Adapters between the existing Prisma-backed API responses and the
 * existing frontend types in `types/*.ts`.
 *
 * Why this file exists: several Prisma columns are stored as JSON
 * (e.g. `objectives`, `keyOutcomes`, `skills`) and Prisma's generated
 * client types those as `JsonValue`, not `string[]`. A few columns are
 * also nullable in Postgres (`string | null`) where the frontend types
 * use optional fields (`string | undefined`). These adapters normalize
 * both cases in one place instead of repeating `as` casts on every page.
 */

import { Activity, ActivityCategory, ActivityStatus } from '@/types/activity';
import { CommunityEvent, EventStatus } from '@/types/event';
import { VolunteerRole, VolunteerDomain } from '@/types/volunteer';
import { DocumentationRecord, ReportType, DocumentationStatus } from '@/types/report';
import { GalleryItem } from '@/types/gallery';

function toStringArray(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
}

// ---- Activities -----------------------------------------------------

export interface RawActivity {
  id: string;
  title: string;
  category: string;
  date: string;
  location: string;
  villageOrArea: string;
  summary: string;
  description: string;
  objectives: unknown;
  scope: string;
  programAffiliation: string | null;
  status: string;
  keyOutcomes: unknown;
  imageUrl: string;
  galleryImages: unknown;
  isFeatured: boolean;
}

export function mapActivity(raw: RawActivity): Activity {
  return {
    id: raw.id,
    title: raw.title,
    category: raw.category as ActivityCategory,
    date: raw.date,
    location: raw.location,
    villageOrArea: raw.villageOrArea,
    summary: raw.summary,
    description: raw.description,
    objectives: toStringArray(raw.objectives),
    scope: raw.scope,
    programAffiliation: (raw.programAffiliation ?? undefined) as Activity['programAffiliation'],
    status: raw.status as ActivityStatus,
    keyOutcomes: toStringArray(raw.keyOutcomes),
    imageUrl: raw.imageUrl,
    galleryImages: toStringArray(raw.galleryImages),
    isFeatured: raw.isFeatured,
  };
}

// ---- Events -----------------------------------------------------------

export interface RawEvent {
  id: string;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  venue: string;
  description: string;
  focusArea: string;
  status: string;
  programTag: string;
  capacity: string | null;
  imageUrl: string;
  coordinationNotes: string;
}

export function mapEvent(raw: RawEvent): CommunityEvent {
  return {
    id: raw.id,
    title: raw.title,
    category: raw.category as CommunityEvent['category'],
    date: raw.date,
    time: raw.time,
    location: raw.location,
    venue: raw.venue,
    description: raw.description,
    focusArea: raw.focusArea,
    status: raw.status as EventStatus,
    programTag: raw.programTag,
    capacity: raw.capacity ?? undefined,
    imageUrl: raw.imageUrl,
    coordinationNotes: raw.coordinationNotes,
  };
}

// ---- Volunteer roles ----------------------------------------------------

export interface RawVolunteerRole {
  id: string;
  roleTitle: string;
  domain: string;
  focusArea: string;
  typicalResponsibilities: unknown;
  recommendedSkills: unknown;
  locationCoverage: string;
  activeInitiatives: unknown;
}

export function mapVolunteerRole(raw: RawVolunteerRole): VolunteerRole {
  return {
    id: raw.id,
    roleTitle: raw.roleTitle,
    domain: raw.domain as VolunteerDomain,
    focusArea: raw.focusArea,
    typicalResponsibilities: toStringArray(raw.typicalResponsibilities),
    recommendedSkills: toStringArray(raw.recommendedSkills),
    locationCoverage: raw.locationCoverage,
    activeInitiatives: toStringArray(raw.activeInitiatives),
  };
}

// ---- Documentation records (Reports) -----------------------------------

export interface RawDocumentationRecord {
  id: string;
  reportCode: string;
  title: string;
  type: string;
  associatedActivity: string;
  date: string;
  authorOrIntern: string;
  location: string;
  summary: string;
  status: string;
  keyObservations: unknown;
  fileFormat: string;
  sizeEstimate: string;
}

export function mapReport(raw: RawDocumentationRecord): DocumentationRecord {
  return {
    id: raw.id,
    reportCode: raw.reportCode,
    title: raw.title,
    type: raw.type as ReportType,
    associatedActivity: raw.associatedActivity,
    date: raw.date,
    authorOrIntern: raw.authorOrIntern,
    location: raw.location,
    summary: raw.summary,
    status: raw.status as DocumentationStatus,
    keyObservations: toStringArray(raw.keyObservations),
    fileFormat: raw.fileFormat,
    sizeEstimate: raw.sizeEstimate,
  };
}

// ---- Gallery ------------------------------------------------------------

export interface RawGalleryItem {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  imageUrl: string;
  caption: string;
  programTag: string;
}

export function mapGalleryItem(raw: RawGalleryItem): GalleryItem {
  return {
    id: raw.id,
    title: raw.title,
    category: raw.category as GalleryItem['category'],
    location: raw.location,
    date: raw.date,
    imageUrl: raw.imageUrl,
    caption: raw.caption,
    programTag: raw.programTag,
  };
}
