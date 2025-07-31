'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="text-center py-10 text-red-500">
      <p>Oops! Something went wrong while loading the mentor.</p>
      <button
        onClick={reset}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Try again
      </button>
    </div>
  );
}