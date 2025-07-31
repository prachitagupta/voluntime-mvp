'use client';

import { useState } from 'react';

export default function BookingForm({ mentor }: { mentor: any }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    time: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Booking confirmed with ${mentor.full_name} at ${form.time}`);
    setForm({ name: '', email: '', time: '' });
  };

  return (
    <div className="pt-8 mt-6 border-t border-gray-200">
      <h3 className="text-xl font-bold mb-4 text-gray-800">Book a Session</h3>

      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-gray-50 p-6 rounded-md border border-gray-200"
      >
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-4 py-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Choose Time Slot</label>
          <div className="grid grid-cols-2 gap-3">
            {['Saturday 10 AM', 'Saturday 2 PM', 'Sunday 11 AM', 'Sunday 4 PM'].map((slot) => (
              <button
                type="button"
                key={slot}
                className={`px-4 py-2 text-sm border rounded ${
                  form.time === slot
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-800 hover:bg-blue-50'
                }`}
                onClick={() => setForm({ ...form, time: slot })}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}