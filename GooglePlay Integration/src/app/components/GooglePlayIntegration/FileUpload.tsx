import { CheckCircle } from 'lucide-react';
import type { ChangeEvent } from 'react';

interface FileUploadProps {
  id: string;
  label: string;
  helpText?: string;
  selectedFile: File | null;
  accept?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function FileUpload({
  id,
  label,
  helpText,
  selectedFile,
  accept = '.json,application/json',
  onChange,
}: FileUploadProps) {
  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="block font-inter font-medium text-sm text-[#2e3847] mb-2"
      >
        {label}
      </label>
      <label
        htmlFor={id}
        className={`flex items-center gap-2 p-3 border border-dashed rounded cursor-pointer transition-colors ${
          selectedFile
            ? 'bg-green-50 border-green-500'
            : 'border-[#abb8ca] hover:bg-gray-50'
        }`}
      >
        <span className="text-xl" aria-hidden="true">
          {selectedFile ? '✅' : '🔐'}
        </span>
        <div className="flex-1">
          <p className="font-inter font-medium text-sm text-[#2e3847]">
            {selectedFile ? selectedFile.name : 'Choose JSON key file'}
          </p>
          <p className="font-inter text-xs text-[#738096]">
            Upload your service account key file (.json)
          </p>
        </div>
        {selectedFile && (
          <CheckCircle className="size-5 text-green-500" aria-hidden="true" />
        )}
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        onChange={onChange}
        className="sr-only"
        aria-describedby={helpText ? `${id}-help` : undefined}
      />
      {helpText && (
        <p id={`${id}-help`} className="mt-2 text-[13px] text-[#738096] font-inter">
          {helpText}
        </p>
      )}
    </div>
  );
}
