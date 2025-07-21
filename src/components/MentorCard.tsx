'use client';
import { useRouter } from 'next/navigation';
import { Mentor } from '@/types/Mentor';
import Image from 'next/image';

export default function MentorCard({ mentor }: { mentor: Mentor }) {
  const router = useRouter();

  return (
    <div className="bg-white shadow p-4 rounded-md flex items-start gap-4 hover:shadow transition duration-200">
      {/* Avatar */}
      {/* <img
        src={mentor.avatar}
        alt={mentor.name}
        className="w-12 h-12 rounded-full object-cover shadow-md"
      /> */}

    <Image
      src={mentor.avatar || '/default-avatar.png'}
      alt={mentor.name}
      width={80}
      height={80}
      className="rounded-full"
    />

      {/* Content */}
      <div className="flex-1 space-y-2">
        <div>
          <h3 className="text-lg font-semibold text-blue-700">{mentor.name}</h3>
          <p className="text-xs text-gray-500">Available: {mentor.available}</p>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2">{mentor.intro}</p>

        <div className="flex flex-wrap gap-2">
          {mentor.skills.slice(0, 2).map((skill: string) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
          {mentor.skills.length > 2 && (
            <span className="text-xs text-gray-400">
              +{mentor.skills.length - 2} more
            </span>
          )}
        </div>

        <div className="flex gap-3 pt-2">
          <button
            onClick={() => router.push(`/mentors/${mentor.id}`)}
            className="bg-blue-500 text-white text-xs px-4 py-1.5 rounded hover:bg-blue-600"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
}