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
  required,
  ...props
}) => {
  const isInvalid = !!error;

  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-center text-[13px] font-bold text-[#111111]/80 mb-2 uppercase tracking-wider"
      >
        {label}
        {required ? (
          <span
            className="text-red-500 ml-1 text-base leading-none translate-y-[-2px]"
            aria-hidden="true"
            title="Obrigatório"
          >
            *
          </span>
        ) : (
          <span className="text-[10px] text-[#111111]/50 normal-case tracking-normal ml-2 font-medium">
            (opcional)
          </span>
        )}
      </label>
      <input
        id={id}
        required={required}
        aria-invalid={isInvalid}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full min-h-[48px] rounded-lg border border-[#111111]/20 bg-[#f8fafc] px-4 py-4 text-[#111111] placeholder:text-[#111111]/50 transition-all outline-none focus:border-bluePrimary focus:ring-2 focus:ring-bluePrimary/20 ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-xs text-red-600 font-bold uppercase"
        >
          {error}
        </p>
      )}
    </div>
  );
};

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
}

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  error,
  id,
  className = '',
  required,
  ...props
}) => {
  const isInvalid = !!error;

  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-center text-[13px] font-bold text-[#111111]/80 mb-2 uppercase tracking-wider"
      >
        {label}
        {required ? (
          <span
            className="text-red-500 ml-1 text-base leading-none translate-y-[-2px]"
            aria-hidden="true"
            title="Obrigatório"
          >
            *
          </span>
        ) : (
          <span className="text-[10px] text-[#111111]/50 normal-case tracking-normal ml-2 font-medium">
            (opcional)
          </span>
        )}
      </label>
      <textarea
        id={id}
        required={required}
        aria-invalid={isInvalid}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`w-full resize-none rounded-lg border border-[#111111]/20 bg-[#f8fafc] px-4 py-4 text-[#111111] placeholder:text-[#111111]/50 transition-all outline-none focus:border-bluePrimary focus:ring-2 focus:ring-bluePrimary/20 min-h-[120px] ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p
          id={`${id}-error`}
          className="mt-2 text-xs text-red-600 font-bold uppercase"
        >
          {error}
        </p>
      )}
    </div>
  );
};
