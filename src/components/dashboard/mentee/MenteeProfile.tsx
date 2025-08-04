'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { timezones } from '@/lib/timezone';
import { Mentee } from '@/types/Mentee';
import { getMenteeById } from '@/lib/data';

export default function MenteeProfile() {
  const [mentee, setMentee] = useState<Mentee | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const menteeId = '428f7689-225d-4287-8991-a6486e7e9989'; // TODO: remove hardcoded id after auth

  useEffect(() => {
    const fetchMentee = async () => {
      const data = await getMenteeById(menteeId);
      if (data) setMentee(data);
    };

    fetchMentee();
  }, []);

  const updateField = <K extends keyof Mentee>(field: K, value: Mentee[K]) => {
    if (!mentee) return;
    setMentee({ ...mentee, [field]: value });
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    setSuccess(false);
    setError('');

    const { error } = await supabase
      .from('mentees')
      .update(mentee)
      .eq('id', menteeId);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
    }

    setIsSaving(false);
  };

  if (!mentee) return <p className="text-center py-10 text-gray-600">Loading profile...</p>;

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
                value={mentee[key as keyof Mentee] ?? ''}
                onChange={(e) => updateField(key as keyof Mentee, e.target.value)}
                className="w-full border border-gray-300 px-4 py-2 rounded"
              />
            </div>
          )
        )}
      </div>

      <div className="space-y-4 mb-6">
        {[['Current Role', 'current_role'], ['Current Company', 'current_company']].map(([label, key]) => (
          <div key={key} className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <input
              type="text"
              value={mentee[key as keyof Mentee] ?? ''}
              onChange={(e) => updateField(key as keyof Mentee, e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>
        ))}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Education Level</label>
          <select
            className="w-full border border-gray-300 px-4 py-2 rounded"
            value={mentee.education_level}
            onChange={(e) => updateField('education_level', e.target.value)}
          >
            <option value="" disabled hidden>Select your education level</option>
            <option value="High School">High School</option>
            <option value="Undergraduate">Undergraduate</option>
            <option value="Graduate">Graduate</option>
            <option value="Postgraduate">Postgraduate</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Experience (Years)</label>
          <input
            type="number"
            value={mentee.experience ?? ''}
            onChange={(e) => updateField('experience', e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>
      </div>

      <div className="space-y-4 mb-6">
        {[
          ['guidance_type', 'What kind of guidance are you seeking?', ['Career Advice', 'Skill Development', 'Resume Review', 'Interview Preparation', 'Leadership Coaching']],
          ['mentorship_topic', 'What topic do you need help with?', ['Web Development', 'Product Management', 'UX/UI Design', 'Data Science', 'Freelancing', 'Marketing', 'Startup Guidance']],
          ['communication_method', 'Preferred Communication Method', ['Zoom', 'Google Meet', 'Email']],
          ['referral_source', 'How did you hear about us?', ['Friend/Colleague', 'LinkedIn', 'Instagram', 'Search Engine', 'Other']]
        ].map(([field, label, options]) => (
          <div key={field as string} className="space-y-1">
            <label className="text-sm font-medium text-gray-700">{label}</label>
            <select
              className="w-full border border-gray-300 px-4 py-2 rounded"
              value={mentee[field as keyof Mentee] ?? ''}
              onChange={(e) => updateField(field as keyof Mentee, e.target.value)}
            >
              <option value="" disabled hidden>Select an option</option>
              {(options as string[]).map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          </div>
        ))}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Timezone</label>
          <select
            className="w-full border border-gray-300 px-4 py-2 rounded"
            value={mentee.timezone}
            onChange={(e) => updateField('timezone', e.target.value)}
          >
            <option value="" disabled hidden>Select your timezone</option>
            {timezones.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Short Bio</label>
          <textarea
            className="w-full border border-gray-300 px-4 py-2 rounded h-24"
            value={mentee.bio}
            onChange={(e) => updateField('bio', e.target.value)}
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Career Goals</label>
          <textarea
            className="w-full border border-gray-300 px-4 py-2 rounded h-24"
            value={mentee.goals ?? ''}
            onChange={(e) => updateField('goals', e.target.value)}
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
