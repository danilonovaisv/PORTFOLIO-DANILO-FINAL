'use client';

import React from 'react';

// TASK-045: Substituídos hex hardcoded (#111111, #f8fafc) por tokens do design system
// text-textInverse / bg-backgroundLight (light section context)

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  id,
  className = '',
  'aria-invalid': _ariaInvalid,
  'aria-required': _ariaRequired,
  'aria-describedby': _ariaDescribedBy,
  ...props
}) => {
  const isInvalid = !!error;

  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-center text-[13px] font-bold text-textInverse/80 mb-2 uppercase tracking-wider"
      >
        {label}
        {props.required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        aria-invalid={isInvalid ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-required={props.required ? 'true' : 'false'}
        className={`w-full min-h-[48px] rounded-lg border border-textInverse/20 bg-backgroundLight px-4 py-4 text-textInverse placeholder:text-textInverse/50 transition-all outline-none focus:border-bluePrimary focus:ring-2 focus:ring-bluePrimary/20 ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
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
  'aria-invalid': _ariaInvalid,
  'aria-required': _ariaRequired,
  'aria-describedby': _ariaDescribedBy,
  ...props
}) => {
  const isInvalid = !!error;

  return (
    <div>
      <label
        htmlFor={id}
        className="flex items-center text-[13px] font-bold text-textInverse/80 mb-2 uppercase tracking-wider"
      >
        {label}
        {props.required && (
          <span className="text-red-500 ml-1" aria-hidden="true">
            *
          </span>
        )}
      </label>
      <textarea
        id={id}
        aria-invalid={isInvalid ? 'true' : 'false'}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-required={props.required ? 'true' : 'false'}
        className={`w-full resize-none rounded-lg border border-textInverse/20 bg-backgroundLight px-4 py-4 text-textInverse placeholder:text-textInverse/50 transition-all outline-none focus:border-bluePrimary focus:ring-2 focus:ring-bluePrimary/20 min-h-[120px] ${
          error ? 'border-red-500' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="mt-2 text-xs text-red-600 font-bold uppercase"
        >
          {error}
        </p>
      )}
    </div>
  );
};
