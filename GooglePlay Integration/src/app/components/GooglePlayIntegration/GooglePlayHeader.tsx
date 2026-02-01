import { ChevronLeft, ExternalLink } from 'lucide-react';
import { GooglePlayIcon } from './GooglePlayIcon';
import { DOCUMENTATION_URL } from '../../config/links';

interface GooglePlayHeaderProps {
  onBack?: () => void;
}

export function GooglePlayHeader({ onBack }: GooglePlayHeaderProps) {
  return (
    <header className="page-gutter py-8">
      <div className="page-content mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-md transition-colors"
              aria-label="Go back"
            >
              <ChevronLeft className="size-6 text-[#0F2744]" />
            </button>

            <div className="flex items-center gap-4">
              <GooglePlayIcon />
              <div>
                <h1 className="font-inter font-medium text-[28px] text-black leading-[48px] tracking-tight">
                  Google Play
                </h1>
                <p className="font-manrope text-base text-[#636b75] leading-7 tracking-tight">
                  Connect using Google Play API
                </p>
              </div>
            </div>
          </div>

          <a
            href={DOCUMENTATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-black hover:text-[#2773ff] transition-colors"
          >
            <span>Documentation</span>
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="page-content mx-auto mt-6">
        <div className="h-px bg-[#8798AD]" role="separator" />
      </div>
    </header>
  );
}
