'use client';

import { useState, useEffect } from 'react';
import { getBookingsByMenteeId } from '@/lib/data';
import { Booking, BookingStatus } from '@/types/Booking';

const tabs = ['All', 'Upcoming', 'Past', 'Cancelled'];

export default function MenteeBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState('All');

  const menteeId = '428f7689-225d-4287-8991-a6486e7e9989'; // TODO: remove hardcoded id after auth

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getBookingsByMenteeId(menteeId);

      if (data && Array.isArray(data)) {
        const formatted = data.map((b) => ({
          id: b.id,
          topic: b.topic,
          date_time: b.date_time,
          mentorName: b.mentor?.full_name || 'Unknown Mentor',
          status: b.status as BookingStatus,
        }));
        setBookings(formatted);
      }
    };

    fetchBookings();
  }, []);

  const filtered =
    activeTab === 'All'
      ? bookings
      : bookings.filter((b) => b.status === activeTab.toLowerCase());

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Your Bookings</h1>

      <div className="flex gap-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No bookings in this category.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((booking) => (
            <div
              key={booking.id}
              className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">{booking.topic}</p>
                  <p className="text-sm text-gray-600">
                    with {booking.mentorName} on{' '}
                    {new Date(booking.date_time).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    booking.status === 'upcoming'
                      ? 'bg-green-100 text-green-700'
                      : booking.status === 'past'
                      ? 'bg-gray-200 text-gray-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {booking.status.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}