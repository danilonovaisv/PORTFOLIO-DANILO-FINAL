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
      className="block text-sm font-medium text-text-dark mb-1.5"
    >
      {label}
    </label>
    <input
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full rounded-lg border border-gray-200 bg-section-bg px-4 py-3 text-text-dark placeholder:text-text-muted/60 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
        error ? 'border-red-500 ring-2 ring-red-500/20' : ''
      } ${className}`}
      {...props}
    />
    {error && (
      <p id={`${id}-error`} className="mt-1.5 text-sm text-red-500 font-medium">
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
      className="block text-sm font-medium text-text-dark mb-1.5"
    >
      {label}
    </label>
    <textarea
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full resize-none rounded-lg border border-gray-200 bg-section-bg px-4 py-3 text-text-dark placeholder:text-text-muted/60 transition-all outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 ${
        error ? 'border-red-500 ring-2 ring-red-500/20' : ''
      } ${className}`}
      {...props}
    />
    {error && (
      <p id={`${id}-error`} className="mt-1.5 text-sm text-red-500 font-medium">
        {error}
      </p>
    )}
  </div>
);
