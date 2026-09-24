import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin } from '@/lib/auth';
import { createReportSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type');
    const query = searchParams.get('q');

    const where: any = {};

    if (type && type !== 'All') {
      where.type = type;
    }

    if (query) {
      where.OR = [
        { title: { contains: query, mode: 'insensitive' } },
        { reportCode: { contains: query, mode: 'insensitive' } },
        { associatedActivity: { contains: query, mode: 'insensitive' } },
        { summary: { contains: query, mode: 'insensitive' } },
        { location: { contains: query, mode: 'insensitive' } },
      ];
    }

    const reports = await prisma.documentationRecord.findMany({
      where,
      orderBy: { date: 'desc' },
    });

    return NextResponse.json({ success: true, count: reports.length, data: reports });
  } catch (error) {
    console.error('Error fetching documentation records:', error);
    return NextResponse.json(
      { error: 'Unable to load documentation records from database.' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized. Admin authentication required to log reports.' },
        { status: 401 }
      );
    }

    const body = await req.json();
    const parseResult = createReportSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: parseResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const reportCode =
      parseResult.data.reportCode ||
      `JCF-REP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const report = await prisma.documentationRecord.create({
      data: {
        ...parseResult.data,
        reportCode,
        isDemo: parseResult.data.isDemo ?? true,
        sourceType: parseResult.data.sourceType ?? 'PROTOTYPE_DEMO',
      },
    });

    return NextResponse.json({ success: true, data: report }, { status: 201 });
  } catch (error) {
    console.error('Error saving documentation record:', error);
    return NextResponse.json(
      { error: 'Unable to record documentation in database.' },
      { status: 500 }
    );
  }
}
