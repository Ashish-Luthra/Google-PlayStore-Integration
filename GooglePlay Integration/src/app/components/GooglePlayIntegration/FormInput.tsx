import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  required?: boolean;
  helpText?: string;
  error?: string;
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, required, helpText, error, className = '', id, ...props }, ref) => {
    const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;

    return (
      <div className="flex-1">
        <label
          htmlFor={inputId}
          className="block font-inter font-medium text-sm text-black mb-2"
        >
          {label} {required && <span aria-hidden="true">*</span>}
          {required && <span className="sr-only">(required)</span>}
        </label>
        <input
          ref={ref}
          id={inputId}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={
            error
              ? `${inputId}-error`
              : helpText
              ? `${inputId}-help`
              : undefined
          }
          className={`w-full h-10 px-2 py-2 border rounded-md text-sm font-inter ${
            error ? 'border-red-500' : 'border-[#ccd6e0]'
          } ${className}`}
          {...props}
        />
        {helpText && (
          <p id={`${inputId}-help`} className="mt-2 text-[13px] text-[#738096] font-inter">
            {helpText}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="mt-1 text-[13px] text-red-500 font-inter" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = 'FormInput';
