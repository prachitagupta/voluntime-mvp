'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { timezones } from '@/lib/timezone';
import { Mentor } from '@/types/Mentor';
import { getMentorById } from '@/lib/data';
import { getCurrentUser } from '@/lib/auth';

export default function MentorProfile() {
  const [mentorId, setMentorId] = useState<string | null>(null);
  const [mentor, setMentor] = useState<Mentor | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMentor = async () => {
      const user = await getCurrentUser();
      if (!user) return;

      setMentorId(user.id);
      const data = await getMentorById(user.id);
      if (data) setMentor(data);
    };

    fetchMentor();
  }, []);

  const updateField = <K extends keyof Mentor>(field: K, value: Mentor[K]) => {
    if (!mentor) return;
    setMentor({ ...mentor, [field]: value });
  };

  const handleSubmit = async () => {
    if (!mentorId) return;

    setIsSaving(true);
    setSuccess(false);
    setError('');

    const { error } = await supabase
      .from('mentors')
      .update(mentor)
      .eq('id', mentorId);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }

    setIsSaving(false);
  };

  if (!mentorId || !mentor) {
    return <div className="text-center py-10 text-gray-600">Loading profile...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Your Profile</h1>

      <div className="space-y-4 mb-6">
        {[['Full Name', 'full_name'], ['Email', 'email'], ['Phone Number', 'phone'], ['LinkedIn', 'linked_in']].map(
          ([label, key]) => (
            <div key={key} className="space-y-1">
              <label className="text-sm font-medium text-gray-700">{label}</label>
              <input
                type="text"
                value={mentor[key as keyof Mentor] ?? ''}
                onChange={(e) => updateField(key as keyof Mentor, e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded"
              />
            </div>
          )
        )}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Experience (Years)</label>
          <input
            type="number"
            value={mentor.experience ?? ''}
            onChange={(e) => updateField('experience', e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Expertise</label>
          <input
            type="text"
            value={mentor.expertise ?? ''}
            onChange={(e) => updateField('expertise', [e.target.value])}  
            className="w-full border border-gray-300 px-4 py-2 rounded"
            placeholder="e.g. Frontend, UX Design, AI/ML, etc."
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Preferred Communication Method</label>
          <select
            className="w-full border border-gray-300 px-4 py-2 rounded"
            value={mentor.communication_method ?? ''}
            onChange={(e) => updateField('communication_method', e.target.value)}
          >
            <option value="" disabled hidden>Select a method</option>
            <option value="Zoom">Zoom</option>
            <option value="Google Meet">Google Meet</option>
            <option value="Email">Email</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Timezone</label>
          <select
            className="w-full border border-gray-300 px-4 py-2 rounded"
            value={mentor.timezone ?? ''}
            onChange={(e) => updateField('timezone', e.target.value)}
          >
            <option value="" disabled hidden>Select your timezone</option>
            {timezones.map((tz) => (
              <option key={tz.value} value={tz.value}>{tz.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Short Bio</label>
          <textarea
            className="w-full border border-gray-300 px-4 py-2 rounded h-24"
            value={mentor.bio ?? ''}
            onChange={(e) => updateField('bio', e.target.value)}
          />
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={isSaving}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {isSaving ? 'Saving...' : 'Save Changes'}
      </button>

      {success && <p className="text-green-600 text-sm mt-4">✅ Profile updated successfully!</p>}
      {error && <p className="text-red-600 text-sm mt-4">⚠️ {error}</p>}
    </div>
  );
}
