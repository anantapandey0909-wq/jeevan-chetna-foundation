import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { eventRSVPSchema } from '@/lib/validations';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: eventId } = await params;

    // Check if event exists
    const event = await prisma.event.findUnique({
      where: { id: eventId },
    });

    if (!event) {
      return NextResponse.json(
        { error: 'Event does not exist.' },
        { status: 404 }
      );
    }

    const body = await req.json();
    const parseResult = eventRSVPSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const registration = await prisma.eventRegistration.create({
      data: {
        eventId,
        name: parseResult.data.name,
        email: parseResult.data.email,
        phone: parseResult.data.phone,
        role: parseResult.data.role,
        notes: parseResult.data.notes || null,
        status: 'Confirmed',
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Event RSVP successfully recorded.',
        data: registration,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving event RSVP:', error);
    return NextResponse.json(
      { error: 'Unable to record RSVP in database.' },
      { status: 500 }
    );
  }
}
