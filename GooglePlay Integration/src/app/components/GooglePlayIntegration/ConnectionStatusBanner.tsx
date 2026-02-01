import { CheckCircle, XCircle } from 'lucide-react';
import type { ConnectionStatus } from '../../types/googlePlay';

interface ConnectionStatusBannerProps {
  status: ConnectionStatus;
}

export function ConnectionStatusBanner({ status }: ConnectionStatusBannerProps) {
  if (status === 'idle') return null;

  const isSuccess = status === 'success';

  return (
    <div
      className={`mb-6 p-4 rounded-md flex items-center gap-3 ${
        isSuccess ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'
      }`}
      role="alert"
      aria-live="polite"
    >
      {isSuccess ? (
        <CheckCircle className="size-5" aria-hidden="true" />
      ) : (
        <XCircle className="size-5" aria-hidden="true" />
      )}
      <span className="font-inter text-sm">
        {isSuccess
          ? 'Connection test successful! Your credentials are valid.'
          : 'Connection test failed. Please check your credentials.'}
      </span>
    </div>
  );
}
