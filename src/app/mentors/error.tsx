'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="text-center text-red-600 py-10">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm">{error.message}</p>
    </div>
  );
}