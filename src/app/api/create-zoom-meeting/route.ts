import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(req: NextRequest) {
  const clientId = process.env.ZOOM_CLIENT_ID!;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET!;
  const accountId = process.env.ZOOM_ACCOUNT_ID!;

  // Step 1: Get Access Token
  try {
    const tokenRes = await axios.post(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}}`,
      null,
      {
        auth: {
          username: clientId,
          password: clientSecret,
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
  
    const accessToken = tokenRes.data.access_token;
    // Continue with creating the meeting using the accessToken...

    // Step 2: Create Meeting
  const meetingRes = await axios.post(
    `https://api.zoom.us/v2/users/me/meetings`,
    {
      topic: 'Voluntime Mentorship Call',
      type: 1, // Instant Meeting
    },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    }
  );

  return NextResponse.json(meetingRes.data);

  
  } catch (err: any) {
    console.error('Zoom token fetch error:', {
      message: err.message,
      status: err.response?.status,
      data: err.response?.data,
    });
  
    return new Response('Failed to fetch Zoom access token', { status: 500 });
  }
}