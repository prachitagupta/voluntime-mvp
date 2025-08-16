'use client';

import { useEffect, useState } from 'react';
import { timezones } from '@/lib/timezone';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';


interface MentorFormData {
    full_name: string;
    email: string;
    linked_in: string;
    expertise: string[];
    experience: string;
    timezone: string;
    title: string;
    bio: string;
    terms_accepted: boolean;
    privacy_accepted: boolean;
}

export default function MentorSignupPage() {
  const router = useRouter();

    const [formData, setFormData] = useState<MentorFormData>({
        full_name: '',
        email: '',
        linked_in: '',
        expertise: [],
        experience: '',
        timezone: '',
        title: '',
        bio: '',
        terms_accepted: false,
        privacy_accepted: false,
    });

    const [expertiseInput, setExpertiseInput] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
      const fetchUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user?.email) {
          setFormData((prev) => ({ ...prev, email: user.email! }));
        }
      };
      fetchUser();
    }, []);
  

    const update = <K extends keyof MentorFormData>(field: K, value: MentorFormData[K]) => {
        setFormData({ ...formData, [field]: value });
    };

    const addExpertise = () => {
        if (expertiseInput.trim()) {
            update('expertise', [...formData.expertise, expertiseInput.trim()]);
            setExpertiseInput('');
        }
    };

    const handleSubmit = async () => {
      setSubmitting(true);
      setSuccess(false);
      setError('');
  
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        setError('No user session found.');
        setSubmitting(false);
        return;
      }
  
      const { terms_accepted, privacy_accepted, ...dataToSubmit } = formData;
  
      const { error } = await supabase.from('mentors').insert([{ id: user.id, ...dataToSubmit }]);
  
      if (error) {
        setError(error.message);
      } else {
        router.push('/dashboard');
      }
  
      setSubmitting(false);
    };


    return (
        <div className="max-w-2xl mx-auto px-6 py-10 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Register as a Mentor</h1>

            {/* Personal Information */}
            <div className="space-y-4 mb-6">
                {[
                    ['Full Name', 'full_name'],
                    ['Email Address', 'email'],
                    ['LinkedIn Profile URL', 'linked_in'],
                ].map(([label, key]) => (
                    <div className="space-y-1" key={key}>
                        <label className="text-sm font-medium text-gray-700">{label}</label>
                        <input
                            type="text"
                            value={String(formData[key as keyof typeof formData] ?? '')}
                            onChange={(e) => update(key as keyof typeof formData, e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded"
                        />
                    </div>
                ))}
            </div>

            {/* Professional Details */}
            <div className="space-y-4 mb-6">
                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => update('title', e.target.value)}
                        placeholder="e.g. Product Designer at Adobe"
                        className="w-full border border-gray-300 px-4 py-2 rounded"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Areas of Expertise</label>
                    <input
                        value={expertiseInput}
                        onChange={(e) => setExpertiseInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && addExpertise()}
                        placeholder="Enter expertise and press Enter"
                        className="w-full border border-gray-300 px-4 py-2 rounded"
                    />
                    <div className="flex flex-wrap gap-2 pt-2">
                        {formData.expertise.map((tag, idx) => (
                            <span key={idx} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Years of Experience (optional)</label>
                    <input
                        type="text"
                        value={formData.experience}
                        onChange={(e) => update('experience', e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded"
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Time Zone</label>
                    <select
                        value={formData.timezone}
                        onChange={(e) => update('timezone', e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded"
                    >
                        <option value="">Select your timezone</option>
                        {timezones.map((tz) => (
                            <option key={tz.value} value={tz.value}>{tz.label}</option>
                        ))}
                    </select>
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Short Bio</label>
                    <textarea
                        value={formData.bio}
                        onChange={(e) => update('bio', e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded h-24"
                    />
                </div>
            </div>

            {/* Terms */}
            <div className="space-y-2 mb-6">
                {[
                    ['I accept the terms and conditions', 'terms_accepted'],
                    ['I accept the privacy policy', 'privacy_accepted'],
                ].map(([label, key]) => (
                    <label className="flex items-center gap-2" key={key}>
                        <input
                            type="checkbox"
                            checked={Boolean(formData[key as keyof MentorFormData])}
                            onChange={(e) => update(key as keyof MentorFormData, e.target.checked)}
                        />
                        {label}
                    </label>
                ))}
            </div>

            <button
                onClick={handleSubmit}
                disabled={!formData.full_name || !formData.email || !formData.linked_in || !formData.title || !formData.expertise.length || !formData.timezone || !formData.bio || !formData.terms_accepted || !formData.privacy_accepted || submitting}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                {submitting ? 'Submitting...' : 'Register as Mentor'}
            </button>

            {success && <p className="text-green-600 text-sm mt-4">✅ Registration successful!</p>}
            {error && <p className="text-red-600 text-sm mt-4">⚠️ {error}</p>}
        </div>
    );
}