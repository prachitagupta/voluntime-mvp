import { use } from 'react';
import BookingForm from './BookingForm';
import { fetchMentorById } from '@/lib/data';


export default function MentorProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const mentor = use(fetchMentorById(id)); // Waits for the async call to finish

  const initials = mentor.full_name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();

  // const [zoomLink, setZoomLink] = useState('');

  // const handleCreateMeeting = async () => {
  //   const res = await fetch('/api/create-zoom-meeting');
  //   const data = await res.json();
  //   setZoomLink(data.join_url);
  // };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded shadow-md space-y-6">
      {/* Profile Header */}
      <div className="flex items-center gap-6">
        <div className="w-20 h-20 bg-blue-100 text-blue-700 flex items-center justify-center rounded-full text-xl font-bold">
          {initials}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-blue-700">{mentor.full_name}</h2>
          <p className="text-sm text-gray-600 font-medium">{mentor.title}</p>
          <p className="text-sm text-gray-500"> Experience:  
            {mentor.experience
              ? ` ${mentor.experience} year${mentor.experience === '1' ? '' : 's'}`
              : 'Experience not specified'}
          </p>
        </div>
      </div>

      {/* Intro */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
        <p className="text-sm text-gray-700">{mentor.bio}</p>
      </div>

      {/* Skills */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Skills</h3>
        <div className="flex flex-wrap gap-2">
          {mentor.expertise.map((skill: string) => (
            <span
              key={skill}
              className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* <div className="mt-4">
      <button
        onClick={handleCreateMeeting}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Create Zoom Call
      </button>
      {zoomLink && (
        <p className="mt-2">
          ✅ <a href={zoomLink} className="text-blue-500 underline" target="_blank">Join Zoom Meeting</a>
        </p>
      )}
    </div> */}

  
      {/* Booking Form */}
      <BookingForm mentor={mentor} />
    </div>
  );
}
