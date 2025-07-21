'use client';

import { useState } from 'react';

interface MentorFormData {
    fullName: string;
    email: string;
    phone: string;
    linkedIn: string;
    expertise: string[];
    experience: string;
    title: string;
    company: string;
    availability: string;
    communication: string;
    timezone: string;
    bio: string;
    reason: string;
    menteeLevel: string;
    charges: boolean;
    termsAccepted: boolean;
    privacyAccepted: boolean;
  }

export default function MentorSignupPage() {
    const [formData, setFormData] = useState<MentorFormData>({
        fullName: '',
        email: '',
        phone: '',
        linkedIn: '',
        expertise: [],
        experience: '',
        title: '',
        company: '',
        availability: '',
        communication: '',
        timezone: '',
        bio: '',
        reason: '',
        menteeLevel: '',
        charges: false,
        termsAccepted: false,
        privacyAccepted: false,
    });

    const [expertiseInput, setExpertiseInput] = useState('');
    const update = <K extends keyof MentorFormData>(field: K, value: MentorFormData[K]) => {
        setFormData({ ...formData, [field]: value });
      };
      
    const addExpertise = () => {
        if (expertiseInput.trim()) {
            update('expertise', [...formData.expertise, expertiseInput.trim()]);
            setExpertiseInput('');
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-10 bg-white rounded-lg shadow">
            <h1 className="text-2xl font-bold mb-6">Register as a Mentor</h1>

            {/* Personal Information */}
            <div className="space-y-4 mb-6">
                {[
                    ['Full Name *', 'fullName'],
                    ['Email Address *', 'email'],
                    ['Phone Number', 'phone'],
                    ['LinkedIn Profile URL *', 'linkedIn'],
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
                    <label className="text-sm font-medium text-gray-700">Areas of Expertise *</label>
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
                {[
                    ['Years of Experience *', 'experience'],
                    ['Current Job Title', 'title'],
                    ['Current Company', 'company'],
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

            {/* Availability */}
            <div className="space-y-4 mb-6">
                {[
                    ['Availability', 'availability', ['Weekdays', 'Weekends', 'Evenings', 'Flexible']],
                    ['Preferred Communication Method', 'communication', ['Video Call', 'Chat', 'Email']],
                    ['Time Zone *', 'timezone', null],
                ].map((item) => {
                    const [label, key, options] = item as [string, string, string[] | null];
                    return (
                        <div className="space-y-1" key={key}>
                            <label className="text-sm font-medium text-gray-700">{label}</label>
                            {options ? (
                                <select
                                    value={String(formData[key as keyof typeof formData] ?? '')}
                                    onChange={(e) => update(key as keyof typeof formData, e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-2 rounded"
                                >
                                    <option value="">Select</option>
                                    {Array.isArray(options) && options.map((o) => (
                                        <option key={o} value={o}>{o}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    value={String(formData[key as keyof typeof formData] ?? '')}
                                    onChange={(e) => update(key as keyof typeof formData, e.target.value)}
                                    className="w-full border border-gray-300 px-4 py-2 rounded"
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Additional Information */}
            <div className="space-y-4 mb-6">
                {[
                    ['Short Bio *', 'bio'],
                    ['Why do you want to be a mentor?', 'reason'],
                ].map(([label, key]) => (
                    <div className="space-y-1" key={key}>
                        <label className="text-sm font-medium text-gray-700">{label}</label>
                        <textarea
                            value={String(formData[key as keyof typeof formData] ?? '')}
                            onChange={(e) => update(key as keyof typeof formData, e.target.value)}
                            className="w-full border border-gray-300 px-4 py-2 rounded h-24"
                        />
                    </div>
                ))}

                <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">Preferred Mentee Level</label>
                    <select
                        value={String(formData.menteeLevel ?? '')}
                        onChange={(e) => update('menteeLevel', e.target.value)}
                        className="w-full border border-gray-300 px-4 py-2 rounded"
                    >
                        <option value="">Select</option>
                        <option value="Student">Student</option>
                        <option value="Early Career">Early Career</option>
                        <option value="Mid Career">Mid Career</option>
                    </select>
                </div>
            </div>
            <div className="border border-gray-300 rounded-xl px-6 py-4 mb-6 flex items-center justify-between">
  <label htmlFor="charges" className="text-sm font-medium text-gray-700">
    Do you charge for mentorship?
  </label>
  <button
    type="button"
    onClick={() => update('charges', !formData.charges)}
    className={`w-11 h-6 flex items-center rounded-full p-1 transition duration-300 ease-in-out ${
      formData.charges ? 'bg-blue-600' : 'bg-gray-300'
    }`}
  >
    <div
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ease-in-out ${
        formData.charges ? 'translate-x-5' : 'translate-x-0'
      }`}
    />
  </button>
</div>

            {/* Terms */}
            <div className="space-y-2 mb-6">
                {[
                    ['I accept the terms and conditions *', 'termsAccepted'],
                    ['I accept the privacy policy *', 'privacyAccepted'],
                ].map(([label, key]) => (
                    <label className="flex items-center gap-2" key={key}>
                        <input
                            type="checkbox"
                            checked={Boolean(formData[key as keyof typeof formData])}
                            onChange={(e) => update(key as keyof typeof formData, e.target.checked)}
                        />
                        {label}
                    </label>
                ))}
            </div>

            <button
                disabled={!formData.termsAccepted || !formData.privacyAccepted}
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
                Register as Mentor
            </button>
        </div>
    );
}