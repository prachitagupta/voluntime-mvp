import { NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function GET() {
  const clientId = process.env.ZOOM_CLIENT_ID!;
  const clientSecret = process.env.ZOOM_CLIENT_SECRET!;
  const accountId = process.env.ZOOM_ACCOUNT_ID!;

  try {
    // Step 1: Get Access Token
    const tokenRes = await axios.post<{ access_token: string }>(
      `https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${accountId}`,
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

    // Step 2: Create Meeting
    const meetingRes = await axios.post<{ join_url: string }>(
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
  } catch (err) {
    const error = err as AxiosError;
    console.error('Zoom API error:', {
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
    });

    return new Response('Failed to create Zoom meeting', { status: 500 });
  }
}