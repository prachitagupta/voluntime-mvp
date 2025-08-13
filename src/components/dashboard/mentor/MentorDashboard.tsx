'use client';

import { useEffect, useMemo, useState } from 'react';
import { getMentorById, getMentorDashboardKpis, getMentorPending, getMentorToday, getMentorUpcoming, updateBookingStatus } from '@/lib/data';

type BookingRow = {
  id: string;
  topic: string;
  date_time: string; // ISO
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled' | 'completed';
  mentees?: { full_name?: string } | null;
  meeting_url?: string | null;
};

const HARDCODED_MENTOR_ID = '04213984-8b0a-4f10-8882-f2e460648554';

export default function MentorDashboard() {
  const [mentorName, setMentorName] = useState('');
  const [mentorTZ, setMentorTZ] = useState('UTC');
  const [kpis, setKpis] = useState<{ pending: number; upcomingWeek: number; profilePercent: number }>({
    pending: 0, upcomingWeek: 0, profilePercent: 60,
  });
  const [pending, setPending] = useState<BookingRow[]>([]);
  const [today, setToday] = useState<BookingRow[]>([]);
  const [upcoming, setUpcoming] = useState<BookingRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const run = async () => {
      setLoading(true);
      const mentor = await getMentorById(HARDCODED_MENTOR_ID);
      if (mentor) {
        setMentorName(mentor.full_name || 'Mentor');
        setMentorTZ(mentor.timezone || 'UTC');
      }

      const [kpiData, pendingData, todayData, upcomingData] = await Promise.all([
        getMentorDashboardKpis(HARDCODED_MENTOR_ID),
        getMentorPending(HARDCODED_MENTOR_ID),
        getMentorToday(HARDCODED_MENTOR_ID),
        getMentorUpcoming(HARDCODED_MENTOR_ID),
      ]);

      if (kpiData) setKpis(kpiData);
      setPending(pendingData || []);
      setToday(todayData || []);
      setUpcoming(upcomingData || []);

      setLoading(false);
    };
    run();
  }, []);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleString('en-US', {
      timeZone: mentorTZ,
      year: 'numeric', month: 'long', day: 'numeric',
      hour: '2-digit', minute: '2-digit',
    });

  const handleDecision = async (id: string, next: 'accepted' | 'rejected') => {
    // optimistic UI
    setPending((prev) => prev.filter((b) => b.id !== id));
    const { ok } = await updateBookingStatus(id, next);
    if (!ok) {
      // rollback: (simple approach: refetch pending)
      const refetched = await getMentorPending(HARDCODED_MENTOR_ID);
      setPending(refetched || []);
      alert('Failed to update booking. Please try again.');
    }
  };

  const profileCtaNeeded = useMemo(() => (kpis.profilePercent ?? 0) < 100, [kpis.profilePercent]);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Welcome back{mentorName ? `, ${mentorName}` : ''}!</h1>

      {/* KPI Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Pending Requests</p>
          <p className="text-2xl font-semibold">{kpis.pending}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Upcoming (7d)</p>
          <p className="text-2xl font-semibold">{kpis.upcomingWeek}</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <p className="text-sm text-gray-500">Avg Response Time</p>
          <p className="text-2xl font-semibold">—</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-500">Profile</p>
            {profileCtaNeeded && (
              <a href="/dashboard/profile" className="text-xs text-blue-600 underline">Complete</a>
            )}
          </div>
          <div className="mt-2 h-2 bg-gray-200 rounded">
            <div
              className="h-2 bg-blue-600 rounded"
              style={{ width: `${kpis.profilePercent || 0}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-1">{kpis.profilePercent || 0}%</p>
        </div>
      </div>

      {/* Pending Requests */}
      <section className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Pending requests</h2>
          <a href="/dashboard/bookings" className="text-sm text-blue-600 underline">View all</a>
        </div>
        {loading ? (
          <p className="text-gray-500">Loading…</p>
        ) : pending.length === 0 ? (
          <p className="text-gray-500">You’re all caught up ✨</p>
        ) : (
          <div className="space-y-3">
            {pending.map((b) => (
              <div key={b.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{b.topic}</p>
                  <p className="text-sm text-gray-600">
                    {b.mentees?.full_name ? `with ${b.mentees.full_name} · ` : ''}
                    {fmt(b.date_time)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDecision(b.id, 'accepted')}
                    className="px-3 py-1.5 rounded bg-green-600 text-white text-sm hover:bg-green-700"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => handleDecision(b.id, 'rejected')}
                    className="px-3 py-1.5 rounded bg-red-600 text-white text-sm hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Today */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Today’s schedule</h2>
        {today.length === 0 ? (
          <p className="text-gray-500">No sessions today.</p>
        ) : (
          <ul className="space-y-3">
            {today.map((b) => (
              <li key={b.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{b.topic}</p>
                  <p className="text-sm text-gray-600">
                    {b.mentees?.full_name ? `with ${b.mentees.full_name} · ` : ''}
                    {fmt(b.date_time)}
                  </p>
                </div>
                {b.meeting_url ? (
                  <a
                    href={b.meeting_url}
                    target="_blank"
                    className="px-3 py-1.5 rounded bg-blue-600 text-white text-sm hover:bg-blue-700"
                  >
                    Join
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Upcoming */}
      <section className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Upcoming</h2>
        {upcoming.length === 0 ? (
          <p className="text-gray-500">No upcoming sessions.</p>
        ) : (
          <ul className="space-y-3">
            {upcoming.map((b) => (
              <li key={b.id} className="border border-gray-200 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium">{b.topic}</p>
                  <p className="text-sm text-gray-600">
                    {b.mentees?.full_name ? `with ${b.mentees.full_name} · ` : ''}
                    {fmt(b.date_time)}
                  </p>
                </div>
                <a href={`/dashboard/bookings`} className="text-sm text-blue-600 underline">Manage</a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}