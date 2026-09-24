import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { createEventSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status');
    const category = searchParams.get('category');

    const where: any = {};
    if (status) {
      if (status === 'Upcoming') {
        where.status = { in: ['Upcoming', 'Registration Open'] };
      } else {
        where.status = status;
      }
    }
    if (category) {
      where.category = category;
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { date: 'asc' },
    });

    return NextResponse.json({ success: true, count: events.length, data: events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Unable to load events from database.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin authentication required.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parseResult = createEventSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const event = await prisma.event.create({
      data: {
        ...parseResult.data,
        isDemo: parseResult.data.isDemo ?? true,
        sourceType: parseResult.data.sourceType ?? 'PROTOTYPE_DEMO',
      },
    });

    return NextResponse.json({ success: true, data: event }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Unable to create event in database.' },
      { status: 500 }
    );
  }
}
