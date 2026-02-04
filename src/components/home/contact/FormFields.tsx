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
      className="block text-[13px] font-bold text-[#111111]/60 mb-2 uppercase tracking-wider"
    >
      {label}
    </label>
    <input
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full min-h-[48px] rounded-lg border border-[#111111]/10 bg-[#f8fafc] px-4 py-4 text-[#111111] placeholder:text-[#111111]/30 transition-all outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/20 ${
        error ? 'border-red-500' : ''
      } ${className}`}
      {...props}
    />
    {error && (
      <p
        id={`${id}-error`}
        className="mt-2 text-xs text-red-500 font-bold uppercase"
      >
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
      className="block text-[13px] font-bold text-[#111111]/60 mb-2 uppercase tracking-wider"
    >
      {label}
    </label>
    <textarea
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full resize-none rounded-lg border border-[#111111]/10 bg-[#f8fafc] px-4 py-4 text-[#111111] placeholder:text-[#111111]/30 transition-all outline-none focus:border-[#0057FF] focus:ring-2 focus:ring-[#0057FF]/20 min-h-[120px] ${
        error ? 'border-red-500' : ''
      } ${className}`}
      {...props}
    />
    {error && (
      <p
        id={`${id}-error`}
        className="mt-2 text-xs text-red-500 font-bold uppercase"
      >
        {error}
      </p>
    )}
  </div>
);
