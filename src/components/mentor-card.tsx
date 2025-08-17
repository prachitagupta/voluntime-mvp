'use client';

import { useRouter } from 'next/navigation';
import { Mentor } from '@/types/Mentor';
import { FaLinkedin } from 'react-icons/fa';

export default function MentorCard({ mentor }: { mentor: Mentor }) {
  const router = useRouter();

  const initials = mentor.full_name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-white shadow-md hover:shadow-lg transition rounded-xl p-5 flex gap-4 items-start border border-gray-100">
      {/* Avatar */}
      <div className="w-14 h-14 bg-gray-100 text-blue-700 flex items-center justify-center rounded-full font-semibold text-lg shadow-inner">
        {initials}
      </div>

      {/* Info */}
      <div className="flex-1 space-y-1.5">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-800">{mentor.full_name}</h3>
          {mentor.linked_in && (
            <a
              href={mentor.linked_in}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 text-sm hover:underline flex items-center gap-1"
            >
              <FaLinkedin className="text-blue-500" />
            </a>
          )}
        </div>
        <p className="text-sm text-gray-700 font-medium">{mentor.title}</p>
        <p className="text-sm text-gray-500">
          {mentor.bio.split(' ').length > 120
            ? mentor.bio.split(' ').slice(0, 120).join(' ') + '...'
            : mentor.bio}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-2">
          {mentor.expertise.slice(0, 2).map((skill) => (
            <span
              key={skill}
              className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
          {mentor.expertise.length > 2 && (
            <span className="text-xs text-gray-400">
              +{mentor.expertise.length - 2} more
            </span>
          )}
        </div>

        {/* Button */}
        <button
          onClick={() => router.push(`/mentors/${mentor.id}`)}
          className="mt-3 inline-block bg-blue-600 text-white text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          View Profile
        </button>
      </div>
    </div>
  );
}