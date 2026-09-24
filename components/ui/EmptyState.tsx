import React from 'react';

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = "No records are currently available." }: EmptyStateProps) {
  return (
    <div className="p-4 text-center text-gray-600">
      {message}
    </div>
  );
}
