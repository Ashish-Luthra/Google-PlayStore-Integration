import { Loader2 } from 'lucide-react';
import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ActionButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[#2773ff] text-[#f4f8ff] hover:bg-[#1e5dd6] font-medium',
  secondary:
    'bg-[#edf2f7] border border-[#abb8ca] text-[#333] hover:bg-[#e2e8f0]',
  ghost:
    'border border-[#ccd6e0] text-[#808080] hover:bg-gray-50 font-medium',
};

export function ActionButton({
  variant = 'secondary',
  isLoading = false,
  disabled,
  children,
  className = '',
  ...props
}: ActionButtonProps) {
  return (
    <button
      type="button"
      disabled={disabled || isLoading}
      className={`h-10 px-3 py-2 rounded-[5px] font-inter text-sm leading-7 tracking-wide transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {isLoading && (
        <Loader2 className="size-4 animate-spin" aria-hidden="true" />
      )}
      <span>{children}</span>
    </button>
  );
}
