import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

type EnquiryPayload = {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as EnquiryPayload;
    const { name, email, phone = '', message, source = 'Website' } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }

    const enquiry = await prisma.enquiry.create({
      data: { name, email, phone, message, source },
    });

    return NextResponse.json(
      { message: 'Enquiry submitted successfully', enquiry },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    return NextResponse.json(
      { error: 'An error occurred while submitting the enquiry' },
      { status: 500 }
    );
  }
}
