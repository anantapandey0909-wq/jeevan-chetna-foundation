import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { ACTIVITIES_DATA } from '../lib/data/activities';
import { EVENTS_DATA } from '../lib/data/events';
import { VOLUNTEER_ROLES } from '../lib/data/volunteers';
import { REPORTS_DATA } from '../lib/data/reports';
import { GALLERY_DATA } from '../lib/data/gallery';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed migration for Jeevan Chetna Foundation...');

  // 1. Seed Admin User
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@jeevanchetna.org';
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@JCF2025Secure';
  const adminName = process.env.ADMIN_NAME || 'Portal Administrator';

  const passwordHash = await bcrypt.hash(adminPassword, 10);

  const admin = await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: {
      passwordHash,
      name: adminName,
    },
    create: {
      email: adminEmail,
      name: adminName,
      passwordHash,
      role: 'ADMIN',
    },
  });
  console.log(`✅ Admin user seeded: ${admin.email}`);

  // 2. Seed Activities
  // Public initiative content (Green Haldwani, Education, Digital Confidence, Hunger Relief, Community)
  // uses genuine Foundation / owner imagery. isDemo=false so cards are not labeled "Demo".
  // sourceType remains PROTOTYPE_DEMO: these are not claimed as live NGO operational exports.
  for (const act of ACTIVITIES_DATA) {
    await prisma.activity.upsert({
      where: { id: act.id },
      update: {
        title: act.title,
        category: act.category,
        date: act.date,
        location: act.location,
        villageOrArea: act.villageOrArea,
        summary: act.summary,
        description: act.description,
        objectives: act.objectives,
        scope: act.scope,
        programAffiliation: act.programAffiliation || null,
        status: act.status,
        keyOutcomes: act.keyOutcomes || [],
        imageUrl: act.imageUrl,
        galleryImages: act.galleryImages || [],
        isFeatured: act.isFeatured || false,
        isDemo: false,
        sourceType: 'PROTOTYPE_DEMO',
      },
      create: {
        id: act.id,
        title: act.title,
        category: act.category,
        date: act.date,
        location: act.location,
        villageOrArea: act.villageOrArea,
        summary: act.summary,
        description: act.description,
        objectives: act.objectives,
        scope: act.scope,
        programAffiliation: act.programAffiliation || null,
        status: act.status,
        keyOutcomes: act.keyOutcomes || [],
        imageUrl: act.imageUrl,
        galleryImages: act.galleryImages || [],
        isFeatured: act.isFeatured || false,
        isDemo: false,
        sourceType: 'PROTOTYPE_DEMO',
      },
    });
  }
  console.log(`✅ ${ACTIVITIES_DATA.length} activities migrated.`);

  // 3. Seed Events — KEEP isDemo=true (fabricated dates, capacity, coordination; sample schedule)
  for (const evt of EVENTS_DATA) {
    await prisma.event.upsert({
      where: { id: evt.id },
      update: {
        title: evt.title,
        category: evt.category,
        date: evt.date,
        time: evt.time,
        location: evt.location,
        venue: evt.venue,
        description: evt.description,
        focusArea: evt.focusArea,
        status: evt.status,
        programTag: evt.programTag,
        capacity: evt.capacity || null,
        imageUrl: evt.imageUrl,
        coordinationNotes: evt.coordinationNotes,
        isDemo: true,
        sourceType: 'PROTOTYPE_DEMO',
      },
      create: {
        id: evt.id,
        title: evt.title,
        category: evt.category,
        date: evt.date,
        time: evt.time,
        location: evt.location,
        venue: evt.venue,
        description: evt.description,
        focusArea: evt.focusArea,
        status: evt.status,
        programTag: evt.programTag,
        capacity: evt.capacity || null,
        imageUrl: evt.imageUrl,
        coordinationNotes: evt.coordinationNotes,
        isDemo: true,
        sourceType: 'PROTOTYPE_DEMO',
      },
    });
  }
  console.log(`✅ ${EVENTS_DATA.length} events migrated.`);

  // 4. Seed Volunteer Roles
  for (const role of VOLUNTEER_ROLES) {
    await prisma.volunteerRole.upsert({
      where: { id: role.id },
      update: {
        roleTitle: role.roleTitle,
        domain: role.domain,
        focusArea: role.focusArea,
        typicalResponsibilities: role.typicalResponsibilities,
        recommendedSkills: role.recommendedSkills,
        locationCoverage: role.locationCoverage,
        activeInitiatives: role.activeInitiatives,
      },
      create: {
        id: role.id,
        roleTitle: role.roleTitle,
        domain: role.domain,
        focusArea: role.focusArea,
        typicalResponsibilities: role.typicalResponsibilities,
        recommendedSkills: role.recommendedSkills,
        locationCoverage: role.locationCoverage,
        activeInitiatives: role.activeInitiatives,
      },
    });
  }
  console.log(`✅ ${VOLUNTEER_ROLES.length} volunteer roles migrated.`);

  // 5. Seed Documentation Records
  // Aligned with real Foundation program themes. isDemo=false so public cards are not labeled Demo.
  for (const rep of REPORTS_DATA) {
    await prisma.documentationRecord.upsert({
      where: { reportCode: rep.reportCode },
      update: {
        title: rep.title,
        type: rep.type,
        associatedActivity: rep.associatedActivity,
        date: rep.date,
        authorOrIntern: rep.authorOrIntern,
        location: rep.location,
        summary: rep.summary,
        status: rep.status,
        keyObservations: rep.keyObservations,
        fileFormat: rep.fileFormat,
        sizeEstimate: rep.sizeEstimate,
        isDemo: false,
        sourceType: 'PROTOTYPE_DEMO',
      },
      create: {
        id: rep.id,
        reportCode: rep.reportCode,
        title: rep.title,
        type: rep.type,
        associatedActivity: rep.associatedActivity,
        date: rep.date,
        authorOrIntern: rep.authorOrIntern,
        location: rep.location,
        summary: rep.summary,
        status: rep.status,
        keyObservations: rep.keyObservations,
        fileFormat: rep.fileFormat,
        sizeEstimate: rep.sizeEstimate,
        isDemo: false,
        sourceType: 'PROTOTYPE_DEMO',
      },
    });
  }
  console.log(`✅ ${REPORTS_DATA.length} documentation records migrated.`);

  // 6. Seed Gallery Items
  // Owner-supplied + official Foundation photographs with factual captions.
  for (const gal of GALLERY_DATA) {
    await prisma.galleryItem.upsert({
      where: { id: gal.id },
      update: {
        title: gal.title,
        category: gal.category,
        location: gal.location,
        date: gal.date,
        imageUrl: gal.imageUrl,
        caption: gal.caption,
        programTag: gal.programTag,
        isDemo: false,
        sourceType: 'PROTOTYPE_DEMO',
      },
      create: {
        id: gal.id,
        title: gal.title,
        category: gal.category,
        location: gal.location,
        date: gal.date,
        imageUrl: gal.imageUrl,
        caption: gal.caption,
        programTag: gal.programTag,
        isDemo: false,
        sourceType: 'PROTOTYPE_DEMO',
      },
    });
  }
  console.log(`✅ ${GALLERY_DATA.length} gallery items migrated.`);

  // 7. Seed Sample Attendance Records for Field Demonstration
  const sampleAttendance = [
    { volunteerName: 'Field Volunteer #1', activityTitle: 'Green Haldwani: Community Tree Plantation Drive', date: '2025-07-14', status: 'Present', checkInTime: '08:30 AM', checkOutTime: '01:00 PM' },
    { volunteerName: 'Field Volunteer #2', activityTitle: 'Green Haldwani: Community Tree Plantation Drive', date: '2025-07-14', status: 'Present', checkInTime: '08:35 AM', checkOutTime: '01:00 PM' },
    { volunteerName: 'Field Volunteer #3', activityTitle: 'Seeds of Digital Confidence: Youth Computer Education Workshop', date: '2025-07-22', status: 'Present', checkInTime: '09:45 AM', checkOutTime: '02:00 PM' },
  ];

  for (const att of sampleAttendance) {
    await prisma.attendanceRecord.create({
      data: {
        volunteerName: att.volunteerName,
        activityTitle: att.activityTitle,
        date: att.date,
        status: att.status,
        checkInTime: att.checkInTime,
        checkOutTime: att.checkOutTime,
        isDemo: true,
      },
    });
  }
  console.log('✅ Sample attendance records migrated.');

  console.log('🎉 Database seed migration completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
