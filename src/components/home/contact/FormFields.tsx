'use client';

import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  id,
  className = '',
  ...props
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-[#888888] mb-2"
    >
      {label}
    </label>
    <input
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full rounded-xl border ${
        error ? 'border-red-500' : 'border-white/10'
      } bg-white/5 px-4 py-3 text-[#F0F0F0] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] ${className}`}
      {...props}
    />
    {error && (
      <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
        {error}
      </p>
    )}
  </div>
);

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  error,
  id,
  className = '',
  ...props
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-[#888888] mb-2"
    >
      {label}
    </label>
    <textarea
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full resize-none rounded-xl border ${
        error ? 'border-red-500' : 'border-white/10'
      } bg-white/5 px-4 py-3 text-[#F0F0F0] transition-all outline-none focus-visible:ring-2 focus-visible:ring-[#0057FF] ${className}`}
      {...props}
    />
    {error && (
      <p id={`${id}-error`} className="mt-1 text-sm text-red-500">
        {error}
      </p>
    )}
  </div>
);
