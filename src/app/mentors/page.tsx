'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Mentor } from '@/types/Mentor';
import MentorCard from '@/components/MentorCard'

export default function MentorsPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMentors = async () => {
      const { data, error } = await supabase.from('mentors').select('*');
      if (error) {
        console.error('Error fetching mentors:', error.message);
      } else {
        setMentors(data);
      }
      setLoading(false);
    };

    fetchMentors();
  }, []);

  if (loading) return <p className="text-center py-10">Loading mentors...</p>;

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
