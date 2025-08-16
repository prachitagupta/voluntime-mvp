'use client';

import { useEffect, useState } from 'react';
import { Progress } from '@/components/ui/progress';
import MentorCard from '@/components/MentorCard';
import Link from 'next/link';
import { Mentor } from '@/types/Mentor';
import { Booking, BookingStatus } from '@/types/Booking';
import { getMenteeById, getBookingsByMenteeId, getAllMentors } from '@/lib/data';
import { getCurrentUser } from '@/lib/auth';

export default function MenteeDashboard() {
  const [menteeId, setMenteeId] = useState<string | null>(null);
  const [menteeName, setMenteeName] = useState('');
  const [profileComplete, setProfileComplete] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [suggestedMentors, setSuggestedMentors] = useState<Mentor[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // Get current user ID
      const user = await getCurrentUser();
      if (!user) {
        return;
      }
      
      setMenteeId(user.id);
      
      // Get mentee info
      const mentee = await getMenteeById(user.id);
      if (mentee) {
        setMenteeName(mentee.full_name || ''); 
        // Check if essential fields are filled
        // TODO: add more fields to check for profile completion
        const isComplete =
          mentee.bio &&
          mentee.education_level &&
          mentee.guidance_type &&
          mentee.mentorship_topic &&
          mentee.timezone;
        setProfileComplete(!!isComplete);
      }

      // Get bookings
      const bookingsData = await getBookingsByMenteeId(user.id);
      const formattedBookings = bookingsData.map((b) => ({
        id: b.id,
        topic: b.topic,
        date_time: b.date_time,
        mentorName: b.mentor?.full_name || 'Unknown Mentor',
        status: b.status as BookingStatus,
      }));
      setBookings(formattedBookings);

      // Get all mentors (you can later filter or personalize)
      const mentorsData = await getAllMentors();
      setSuggestedMentors(mentorsData || []);
    };

    fetchData();
  }, []);

  if (!menteeId) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="space-y-10">
      <h1 className="text-2xl font-bold">
        Welcome back{menteeName && `, ${menteeName}`}!
      </h1>

      {/* Profile Completion Card */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Profile Completion</h2>
          {!profileComplete && (
            <Link href="/dashboard/profile">
              <button className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition">
                Complete Profile
              </button>
            </Link>
          )}
        </div>
        <Progress value={profileComplete ? 100 : 50} />
      </div>

      {/* Bookings Card */}
      <div className="bg-white p-6 rounded-lg shadow space-y-4">
        <h2 className="text-lg font-semibold">Your Bookings</h2>
        {bookings.length === 0 ? (
          <p className="text-gray-500">No bookings yet.</p>
        ) : (
          <ul className="space-y-2 text-sm text-gray-800">
            {bookings.map((booking) => {
              const dateObj = new Date(booking.date_time);
              return (
                <li key={booking.id} className="border p-3 rounded-md bg-gray-50">
                  {booking.topic} with {booking.mentorName} on {dateObj.toLocaleDateString()} at {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Suggested Mentors */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Suggested Mentors</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {suggestedMentors.map((mentor) => (
            <div key={mentor.id}>
              <MentorCard mentor={mentor} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}