import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getAuthenticatedAdmin } from '@/lib/auth';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const report = await prisma.documentationRecord.findUnique({
      where: { id },
    });

    if (!report) {
      return NextResponse.json({ error: 'Report record not found.' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: report });
  } catch (error) {
    console.error('Error fetching report record:', error);
    return NextResponse.json({ error: 'Unable to load report record.' }, { status: 500 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const admin = await getAuthenticatedAdmin(req);
    if (!admin) {
      return NextResponse.json({ error: 'Unauthorized.' }, { status: 401 });
    }

    const { id } = await params;
    await prisma.documentationRecord.delete({
      where: { id },
    });

    return NextResponse.json({ success: true, message: 'Report record deleted successfully' });
  } catch (error) {
    console.error('Error deleting report record:', error);
    return NextResponse.json({ error: 'Unable to delete report record.' }, { status: 500 });
  }
}
