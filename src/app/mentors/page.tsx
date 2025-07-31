import { use } from 'react';
import { getAllMentors } from '@/lib/data';
import MentorCard from '@/components/MentorCard';

export default function MentorsPage() {
  const mentors = use(getAllMentors());

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Meet Our Mentors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  );
}
