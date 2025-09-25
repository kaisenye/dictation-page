import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ValidationIconProps {
  isValid: boolean;
  hasError: boolean;
  isEmpty: boolean;
  className?: string;
}

export default function ValidationIcon({
  isValid,
  hasError,
  isEmpty,
  className,
}: ValidationIconProps) {
  // Don't show anything if field is empty
  if (isEmpty) return null;

  return (
    <div
      className={cn(
        'absolute right-3 top-1/2 -translate-y-1/2 transition-all duration-200',
        className
      )}
    >
      {isValid && !hasError ? (
        <Check className="h-4 w-4 text-green-400 animate-in fade-in duration-200" />
      ) : hasError ? (
        <X className="h-4 w-4 text-red-400 animate-in fade-in duration-200" />
      ) : null}
    </div>
  );
}
