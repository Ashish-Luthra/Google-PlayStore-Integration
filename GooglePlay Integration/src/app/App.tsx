import { useState } from 'react';
import { Toaster } from 'sonner';
import GooglePlayIntegration from '@/app/components/GooglePlayIntegration';
import { UI_SPECS } from '@/app/constants/config';

export default function App() {
  const [isNavExpanded, setIsNavExpanded] = useState(true);

  const navWidth = isNavExpanded
    ? UI_SPECS.LEFT_NAV_EXPANDED
    : UI_SPECS.LEFT_NAV_COLLAPSED;

  return (
    <div className="size-full flex bg-white">
      <Toaster position="top-right" richColors />

      {/* Sidebar Navigation */}
      <aside
        className="h-full bg-[#f8fafc] border-r border-[#e2e8f0] transition-all duration-300"
        style={{ width: `${navWidth}px` }}
      >
        <div className="p-4">
          <button
            type="button"
            onClick={() => setIsNavExpanded(!isNavExpanded)}
            className="p-2 hover:bg-[#e2e8f0] rounded-md transition-colors"
            aria-label={isNavExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
            aria-expanded={isNavExpanded}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M3 12h18M3 6h18M3 18h18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto">
        <GooglePlayIntegration />
      </main>
    </div>
  );
}