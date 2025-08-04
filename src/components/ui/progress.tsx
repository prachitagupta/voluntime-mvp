// components/ui/progress.tsx
export function Progress({ value }: { value: number }) {
    return (
      <div className="w-full h-4 bg-gray-200 rounded">
        <div
          className="h-full bg-blue-500 rounded"
          style={{ width: `${value}%` }}
        />
      </div>
    );
  }