import Link from 'next/link';

export default function Home() {
  return (
    <section className="text-center space-y-6 mt-10">
      <h1 className="text-5xl font-extrabold text-black-900">Welcome to Voluntime</h1>
      <p className="text-lg text-gray-600 max-w-xl mx-auto">
        A community-powered platform where mentors give their time to help you grow.
        Browse available mentors and book a free session.
      </p>
      <Link
        href="/mentors"
        className="inline-block bg-blue-600 text-white text-sm font-medium px-6 py-3 rounded hover:bg-blue-700 transition"
      >
        Find a Mentor
      </Link>
    </section>
  );
}