import MentorCard from '@/components/MentorCard';
import { mockMentors } from '@/lib/mockData';

export default async function MentorListPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Available Mentors</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {mockMentors.map((mentor) => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  );
}