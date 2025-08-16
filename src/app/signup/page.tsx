'use client';

import { GraduationCap, Sailboat } from 'lucide-react';
import { loginWithGoogle } from '@/lib/loginWithGoogle';

export default function SignupPage() {

  const handleMentorSignup = async () => {
    localStorage.setItem('voluntime_role', 'mentor');
    await loginWithGoogle();
  };

  const handleMenteeSignup = async () => {
    localStorage.setItem('voluntime_role', 'mentee');
    await loginWithGoogle();
  };

  return (
    <div className="min-h-screen py-16 px-6">
      <div className="max-w-4xl mx-auto text-center space-y-4">
        <h1 className="text-4xl font-bold text-gray-900">Join Voluntime</h1>
        <p className="text-gray-600 text-lg">
          Choose how you want to be part of our mentorship community
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
        {/* Mentor Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-4">
            <Sailboat className="text-blue-600 w-6 h-6" />
            <h2 className="text-xl font-semibold text-gray-900">Sign up as a Mentor</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Share your expertise and guide others in their professional journey
          </p>
          <ul className="text-sm text-gray-700 space-y-1 mb-6 list-disc list-inside">
            <li>Create your mentor profile</li>
            <li>Set your availability</li>
            <li>Connect with motivated mentees</li>
            <li>Make a meaningful impact</li>
          </ul>
          <button
            onClick={handleMentorSignup}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Mentor Account
          </button>
        </div>

        {/* Mentee Card */}
        <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="text-blue-600 w-6 h-6" />
            <h2 className="text-xl font-semibold text-gray-900">Sign up as a Mentee</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Find experienced mentors to help you achieve your career goals
          </p>
          <ul className="text-sm text-gray-700 space-y-1 mb-6 list-disc list-inside">
            <li>Access experienced professionals</li>
            <li>Get personalized guidance</li>
            <li>Develop new skills</li>
            <li>Accelerate your growth</li>
          </ul>
          <button
            onClick={handleMenteeSignup}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Create Mentee Account
          </button>
        </div>
      </div>
    </div>
  );
}