import React from 'react';

interface ErrorMessageProps {
  message?: string;
}

export function ErrorMessage({ message = "Unable to load records. Please try again." }: ErrorMessageProps) {
  return (
    <div className="p-4 bg-amber-50 border border-amber-200 rounded-md text-amber-800 text-sm text-center">
      {message}
    </div>
  );
}
