-- CreateTable
CREATE TABLE "admin_users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "admin_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "activities" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "villageOrArea" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "objectives" JSONB NOT NULL DEFAULT '[]',
    "scope" TEXT NOT NULL DEFAULT '',
    "programAffiliation" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Completed',
    "keyOutcomes" JSONB NOT NULL DEFAULT '[]',
    "imageUrl" TEXT NOT NULL,
    "galleryImages" JSONB NOT NULL DEFAULT '[]',
    "isFeatured" BOOLEAN NOT NULL DEFAULT false,
    "isDemo" BOOLEAN NOT NULL DEFAULT true,
    "sourceType" TEXT NOT NULL DEFAULT 'PROTOTYPE_DEMO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "activities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "events" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "venue" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "focusArea" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Upcoming',
    "programTag" TEXT NOT NULL,
    "capacity" TEXT,
    "imageUrl" TEXT NOT NULL,
    "coordinationNotes" TEXT NOT NULL,
    "isDemo" BOOLEAN NOT NULL DEFAULT true,
    "sourceType" TEXT NOT NULL DEFAULT 'PROTOTYPE_DEMO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "event_registrations" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'Volunteer Participant',
    "notes" TEXT,
    "status" TEXT NOT NULL DEFAULT 'Confirmed',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "event_registrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteers" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "areaOfInterest" TEXT NOT NULL,
    "skills" JSONB NOT NULL DEFAULT '[]',
    "availability" TEXT NOT NULL,
    "preferredLocation" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending Review',
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isDemo" BOOLEAN NOT NULL DEFAULT true,
    "sourceType" TEXT NOT NULL DEFAULT 'PROTOTYPE_DEMO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "volunteer_roles" (
    "id" TEXT NOT NULL,
    "roleTitle" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "focusArea" TEXT NOT NULL,
    "typicalResponsibilities" JSONB NOT NULL DEFAULT '[]',
    "recommendedSkills" JSONB NOT NULL DEFAULT '[]',
    "locationCoverage" TEXT NOT NULL,
    "activeInitiatives" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "volunteer_roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "documentation_records" (
    "id" TEXT NOT NULL,
    "reportCode" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "associatedActivity" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "authorOrIntern" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Verified',
    "keyObservations" JSONB NOT NULL DEFAULT '[]',
    "fileFormat" TEXT NOT NULL DEFAULT 'PDF Document',
    "sizeEstimate" TEXT NOT NULL DEFAULT '1.2 MB',
    "fileUrl" TEXT,
    "isDemo" BOOLEAN NOT NULL DEFAULT true,
    "sourceType" TEXT NOT NULL DEFAULT 'PROTOTYPE_DEMO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "documentation_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "attendance_records" (
    "id" TEXT NOT NULL,
    "volunteerName" TEXT NOT NULL,
    "activityTitle" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Present',
    "checkInTime" TEXT,
    "checkOutTime" TEXT,
    "isDemo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "attendance_records_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gallery_items" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "programTag" TEXT NOT NULL,
    "isDemo" BOOLEAN NOT NULL DEFAULT true,
    "sourceType" TEXT NOT NULL DEFAULT 'PROTOTYPE_DEMO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "gallery_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "contact_submissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "admin_users_email_key" ON "admin_users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "documentation_records_reportCode_key" ON "documentation_records"("reportCode");

-- AddForeignKey
ALTER TABLE "event_registrations" ADD CONSTRAINT "event_registrations_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;
