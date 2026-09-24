import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { volunteerEnrollmentSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const domain = searchParams.get('domain');

    // Fetch operational roles
    const roles = await prisma.volunteerRole.findMany({
      where: domain && domain !== 'All' ? { domain } : {},
      orderBy: { createdAt: 'asc' },
    });

    // Check if request is authenticated admin to view submitted intake applications
    const admin = await getAuthenticatedAdmin(req);
    let applications: any[] = [];

    if (admin) {
      applications = await prisma.volunteer.findMany({
        orderBy: { createdAt: 'desc' },
      });
    }

    const totalVolunteerCount = await prisma.volunteer.count();

    return NextResponse.json({
      success: true,
      roles,
      applications: admin ? applications : [],
      totalRegistered: totalVolunteerCount,
    });
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    return NextResponse.json(
      { error: 'Unable to load volunteer data from database.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseResult = volunteerEnrollmentSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { fullName, email, phone, areaOfInterest, skills, availability, preferredLocation } = parseResult.data;

    const skillsArray = Array.isArray(skills)
      ? skills
      : typeof skills === 'string'
      ? skills.split(',').map((s) => s.trim()).filter(Boolean)
      : [];

    const volunteer = await prisma.volunteer.create({
      data: {
        fullName,
        email,
        phone,
        areaOfInterest,
        skills: skillsArray,
        availability,
        preferredLocation,
        status: 'Pending Review',
        isDemo: true,
        sourceType: 'PROTOTYPE_DEMO',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Volunteer enrollment application recorded in database.',
        data: volunteer,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving volunteer application:', error);
    return NextResponse.json(
      { error: 'Unable to record volunteer application in database.' },
      { status: 500 }
    );
  }
}
