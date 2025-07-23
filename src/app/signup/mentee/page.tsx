'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { timezones } from '@/lib/timezone';

export default function MenteeSignupPage() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    linked_in: '',
    current_role: '',
    current_company: '',
    education_level: '',
    experience: '',
    guidance_type: '',
    mentorship_topic: '',
    communication_method: '',
    timezone: '',
    bio: '',
    goals: '',
    referral_source: '',
    terms_accepted: false,
    privacy_accepted: false,
  });

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const update = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return (
      formData.full_name &&
      formData.email &&
      formData.linked_in &&
      formData.education_level &&
      formData.guidance_type &&
      formData.mentorship_topic &&
      formData.timezone &&
      formData.bio &&
      formData.terms_accepted &&
      formData.privacy_accepted
    );
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSuccess(false);
    setError('');

    const { terms_accepted, privacy_accepted, ...dataToSubmit } = formData;

    const { error } = await supabase.from('mentees').insert([dataToSubmit]);

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setFormData({
        full_name: '',
        email: '',
        phone: '',
        linked_in: '',
        current_role: '',
        current_company: '',
        education_level: '',
        experience: '',
        guidance_type: '',
        mentorship_topic: '',
        communication_method: '',
        timezone: '',
        bio: '',
        goals: '',
        referral_source: '',
        terms_accepted: false,
        privacy_accepted: false,
      });
    }

    setSubmitting(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Register as a Mentee</h1>

      {/* Personal Info */}
      <div className="space-y-4 mb-6">
        {[
          ['Full Name', 'full_name', true],
          ['Email Address', 'email', true],
          ['Phone Number', 'phone', false],
          ['LinkedIn Profile URL', 'linked_in', true],
        ].map(([label, key, required]) => (
          <div className="space-y-1" key={String(key)}>
            <label className="text-sm font-medium text-gray-700">
              {label} {!required ? '(optional)' : ''}
            </label>
            <input
              type="text"
              value={String(formData[key as keyof typeof formData] ?? '')}
              onChange={(e) => update(String(key), e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>
        ))}
      </div>

      {/* Professional & Education */}
      <div className="space-y-4 mb-6">
        {[
          ['Current Role/Job Title', 'current_role'],
          ['current_company/Institution Name', 'current_company'],
        ].map(([label, key]) => (
          <div className="space-y-1" key={key}>
            <label className="text-sm font-medium text-gray-700">{label} (optional)</label>
            <input
              type="text"
              value={String(formData[key as keyof typeof formData] ?? '')}
              onChange={(e) => update(key, e.target.value)}
              className="w-full border border-gray-300 px-4 py-2 rounded"
            />
          </div>
        ))}

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Education Level</label>
          <select
            className={`w-full border border-gray-300 px-4 py-2 rounded ${formData.education_level === '' ? 'text-gray-400' : 'text-gray-700'
              }`}
            value={formData.education_level}
            onChange={(e) => update('education_level', e.target.value)}
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
          <label className="text-sm font-medium text-gray-700">Years of Experience (optional)</label>
          <input
            type="number"
            value={formData.experience}
            onChange={(e) => update('experience', e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
        </div>
      </div>

      {/* Mentorship Preferences */}
      <div className="space-y-4 mb-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">What kind of guidance are you seeking?</label>
          <select
            className={`w-full border border-gray-300 px-4 py-2 rounded ${formData.guidance_type === '' ? 'text-gray-400' : 'text-gray-700'
              }`}
            value={formData.guidance_type}
            onChange={(e) => update('guidance_type', e.target.value)}
          >
            <option value="" disabled hidden>Select an option</option>
            <option value="Career Advice">Career Advice</option>
            <option value="Skill Development">Skill Development</option>
            <option value="Resume Review">Resume Review</option>
            <option value="Interview Preparation">Interview Preparation</option>
            <option value="Leadership Coaching">Leadership Coaching</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">What topic do you need help with?</label>
          <select
            className={`w-full border border-gray-300 px-4 py-2 rounded ${formData.mentorship_topic === '' ? 'text-gray-400' : 'text-gray-700'
              }`}
            value={formData.mentorship_topic}
            onChange={(e) => update('mentorship_topic', e.target.value)}
          >
            <option value="" disabled hidden>Select a topic</option>
            <option value="Web Development">Web Development</option>
            <option value="Product Management">Product Management</option>
            <option value="UX/UI Design">UX/UI Design</option>
            <option value="Data Science">Data Science</option>
            <option value="Freelancing">Freelancing</option>
            <option value="Marketing">Marketing</option>
            <option value="Startup Guidance">Startup Guidance</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Preferred Communication Method (optional)</label>
          <select
            className={`w-full border border-gray-300 px-4 py-2 rounded ${formData.communication_method === '' ? 'text-gray-400' : 'text-gray-700'
              }`}
            value={formData.communication_method}
            onChange={(e) => update('communication_method', e.target.value)}
          >
            <option value="" disabled hidden>Select communication method</option>
            <option value="Zoom">Zoom</option>
            <option value="Google Meet">Google Meet</option>
            <option value="Email">Email</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Time Zone</label>
          <select
          className={`w-full border border-gray-300 px-4 py-2 rounded ${
            formData.timezone === '' ? 'text-gray-400' : 'text-gray-700'
          }`}
            value={formData.timezone}
            onChange={(e) => update('timezone', e.target.value)}
          >
            <option value="" disabled hidden>Select your timezone</option>
            {timezones.map((tz) => (
              <option key={tz} value={tz}>{tz}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-4 mb-6">
        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">Short Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => update('bio', e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded h-24"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">What are your short-term and long-term career goals? (optional)</label>
          <textarea
            value={formData.goals}
            onChange={(e) => update('goals', e.target.value)}
            className="w-full border border-gray-300 px-4 py-2 rounded h-24"
          />
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-gray-700">How did you hear about Voluntime?</label>
          <select
            className={`w-full border border-gray-300 px-4 py-2 rounded ${formData.referral_source === '' ? 'text-gray-400' : 'text-gray-700'
              }`}
            value={formData.referral_source}
            onChange={(e) => update('referral_source', e.target.value)}
          >
            <option value="" disabled hidden>Select source</option>
            <option value="Friend/Colleague">Friend/Colleague</option>
            <option value="LinkedIn">LinkedIn</option>
            <option value="Instagram">Instagram</option>
            <option value="Search Engine">Search Engine</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Terms */}
      <div className="space-y-2 mb-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.terms_accepted}
            onChange={(e) => update('terms_accepted', e.target.checked)}
          />
          I accept the terms and conditions
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.privacy_accepted}
            onChange={(e) => update('privacy_accepted', e.target.checked)}
          />
          I accept the privacy policy
        </label>
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isFormValid() || submitting}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Register as Mentee'}
      </button>

      {success && <p className="text-green-600 text-sm mt-4">✅ Registration successful!</p>}
      {error && <p className="text-red-600 text-sm mt-4">⚠️ {error}</p>}
    </div>
  );
}