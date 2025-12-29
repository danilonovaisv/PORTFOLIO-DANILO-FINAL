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
      className="sr-only" // Visualmente oculto para bater com referência, mas acessível
    >
      {label}
    </label>
    <input
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full rounded-xl border-none bg-[#F5F5F7] px-6 py-4 text-text-dark placeholder:text-text-muted/60 transition-all outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
        error ? 'ring-2 ring-red-500' : ''
      } ${className}`}
      {...props}
    />
    {error && (
      <p
        id={`${id}-error`}
        className="mt-2 text-sm text-red-500 font-medium pl-2"
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
    <label htmlFor={id} className="sr-only">
      {label}
    </label>
    <textarea
      id={id}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full resize-none rounded-xl border-none bg-[#F5F5F7] px-6 py-4 text-text-dark placeholder:text-text-muted/60 transition-all outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-white ${
        error ? 'ring-2 ring-red-500' : ''
      } ${className}`}
      {...props}
    />
    {error && (
      <p
        id={`${id}-error`}
        className="mt-2 text-sm text-red-500 font-medium pl-2"
      >
        {error}
      </p>
    )}
  </div>
);
