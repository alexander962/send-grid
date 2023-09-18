import { NextResponse } from 'next/server';
const sgMail = require('@sendgrid/mail');
export async function POST(req) {
  if (req.method === 'POST') {
    const { formData, sendGridApiKey } = await req.json();
    const { name, company, email, phone, comments } = formData;
    sgMail.setApiKey(sendGridApiKey);

    const msg = {
      to: 'info@martinhorn.com',
      from: 'info@martinhorn.com',
      subject: 'New Contact Form Submission',
      text: `Name: ${name}\nCompany: ${company}\nEmail: ${email}\nPhone: ${phone}\nComments: ${comments}`,
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  } else {
    console.log('Method not allowed');
  }

  return NextResponse.json('response');
}
