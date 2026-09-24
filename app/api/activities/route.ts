import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { createActivitySchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const status = searchParams.get('status');
    const query = searchParams.get('q');
    const isFeatured = searchParams.get('featured');

    const where: any = {};

    if (category && category !== 'All') {
      where.category = category;
    }

    if (status) {
      where.status = status;
    }

    if (isFeatured === 'true') {
      where.isFeatured = true;
    }

    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { summary: { contains: query, mode: 'insensitive' } },
        { location: { contains: query, mode: 'insensitive' } },
        { villageOrArea: { contains: query, mode: 'insensitive' } },
      ];
    }

    const activities = await prisma.activity.findMany({
      where,
      orderBy: { date: 'desc' },
    });

    return NextResponse.json({ success: true, count: activities.length, data: activities });
  } catch (error) {
    console.error('Error fetching activities:', error);
    return NextResponse.json(
      { error: 'Unable to load activities from database.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin authentication required to register activities.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parseResult = createActivitySchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const activity = await prisma.activity.create({
      data: {
        ...parseResult.data,
        isDemo: parseResult.data.isDemo ?? true,
        sourceType: parseResult.data.sourceType ?? 'PROTOTYPE_DEMO',
      },
    });

    return NextResponse.json({ success: true, data: activity }, { status: 201 });
  } catch (error) {
    console.error('Error creating activity:', error);
    return NextResponse.json(
      { error: 'Unable to create activity in database.' },
      { status: 500 }
    );
  }
}
