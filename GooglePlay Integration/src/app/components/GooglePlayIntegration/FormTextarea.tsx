import { forwardRef } from 'react';
import type { TextareaHTMLAttributes } from 'react';

interface FormTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  helpText?: string;
  error?: string;
}

export const FormTextarea = forwardRef<HTMLTextAreaElement, FormTextareaProps>(
  ({ label, helpText, error, className = '', id, ...props }, ref) => {
    const textareaId = id || `textarea-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="mb-6">
        <label
          htmlFor={textareaId}
          className="block font-inter font-medium text-sm text-[#2e3847] mb-2"
        >
          {label}
        </label>
        <textarea
          ref={ref}
          id={textareaId}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${textareaId}-error`
              : helpText
              ? `${textareaId}-help`
              : undefined
          }
          className={`w-full h-20 px-2 py-2 border rounded-md text-[13px] font-inter font-mono resize-none ${
            error ? 'border-red-500' : 'border-[#ccd6e0]'
          } ${className}`}
          {...props}
        />
        {helpText && (
          <p id={`${textareaId}-help`} className="mt-2 text-[13px] text-[#738096] font-inter">
            {helpText}
          </p>
        )}
        {error && (
          <p id={`${textareaId}-error`} className="mt-1 text-[13px] text-red-500 font-inter" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormTextarea.displayName = 'FormTextarea';
