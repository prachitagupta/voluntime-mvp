'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useParams } from 'next/navigation';
import { Mentor } from '@/types/Mentor';

export default function MentorProfilePage() {
  const { id } = useParams();
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    time: '',
  });

  useEffect(() => {
    const fetchMentor = async () => {
      const { data, error } = await supabase.from('mentors').select('*').eq('id', id).single();
      if (!error) setMentor(data);
    };
    fetchMentor();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking confirmed with ${mentor?.full_name} at ${form.time}`);
    setForm({ name: '', email: '', time: '' });
  };

  if (!mentor) {
    return <div className="text-center text-gray-500">Mentor not found.</div>;
  }

  const initials = mentor.full_name.split(' ').map((n: string) => n[0]).join('').toUpperCase();

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-md space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-blue-100 text-blue-700 flex items-center justify-center rounded-full text-xl font-bold">
          {initials}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-blue-700">{mentor.full_name}</h2>
          <p className="text-sm text-gray-600 font-medium">{mentor.title}</p>
          <p className="text-sm text-gray-500"> Experience:  
            {mentor.experience
              ? ` ${mentor.experience} year${mentor.experience === '1' ? '' : 's'}`
              : 'Experience not specified'}
          </p>
        </div>
      </div>

      {/* Intro */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
        <p className="text-sm text-gray-700">{mentor.bio}</p>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {mentor.expertise.map((skill: string) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <div className="pt-8 mt-6 border-t border-gray-200">
        <h3 className="text-xl font-bold mb-4 text-gray-800">Book a Session</h3>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 bg-gray-50 p-6 rounded-md border border-gray-200"
        >
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Aisha Patel"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>

          {/* Time Slot Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Choose Time Slot</label>
            <div className="grid grid-cols-2 gap-3">
              {['Saturday 10 AM', 'Saturday 2 PM', 'Sunday 11 AM', 'Sunday 4 PM'].map((slot) => (
                <button
                  type="button"
                  key={slot}
                  className={`px-4 py-2 text-sm border rounded ${form.time === slot
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-800 hover:bg-blue-50'
                    }`}
                  onClick={() => setForm({ ...form, time: slot })}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
          >
            Confirm Booking
          </button>
        </form>
      </div>
    </div>
  );
}
