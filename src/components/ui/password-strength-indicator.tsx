import { useMemo } from 'react';
import { cn } from '@/lib/utils';

interface PasswordStrengthIndicatorProps {
  password: string;
  className?: string;
}

type StrengthLevel = 'weak' | 'medium' | 'strong';

interface StrengthConfig {
  level: StrengthLevel;
  label: string;
  color: string;
  bgColor: string;
  textColor: string;
}

function calculatePasswordStrength(password: string): StrengthConfig {
  if (!password) {
    return {
      level: 'weak',
      label: '',
      color: 'bg-neutral-600',
      bgColor: 'bg-neutral-900/20',
      textColor: 'text-neutral-400',
    };
  }

  let score = 0;

  // Length check
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;

  // Character variety checks
  if (/[a-z]/.test(password)) score += 1;
  if (/[A-Z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1; // Special characters

  // Common patterns (reduce score)
  if (/(.)\1{2,}/.test(password)) score -= 1; // Repeated characters
  if (/123|abc|qwerty/i.test(password)) score -= 1; // Common sequences

  if (score <= 2) {
    return {
      level: 'weak',
      label: 'Weak',
      color: 'bg-red-500',
      bgColor: 'bg-red-900/20',
      textColor: 'text-red-400',
    };
  } else if (score <= 4) {
    return {
      level: 'medium',
      label: 'Medium',
      color: 'bg-yellow-500',
      bgColor: 'bg-yellow-900/20',
      textColor: 'text-yellow-400',
    };
  } else {
    return {
      level: 'strong',
      label: 'Strong',
      color: 'bg-green-500',
      bgColor: 'bg-green-900/20',
      textColor: 'text-green-400',
    };
  }
}

export default function PasswordStrengthIndicator({
  password,
  className,
}: PasswordStrengthIndicatorProps) {
  const strength = useMemo(
    () => calculatePasswordStrength(password),
    [password]
  );

  if (!password) return null;

  const progressPercentage =
    strength.level === 'weak' ? 33 : strength.level === 'medium' ? 66 : 100;

  return (
    <div className={cn('space-y-2', className)}>
      {/* Progress Bar */}
      <div className="h-1.5 bg-neutral-800 rounded-full overflow-hidden">
        <div
          className={cn(
            'h-full transition-all duration-300 ease-out',
            strength.color
          )}
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Strength Label */}
      <div
        className={cn(
          'text-xs font-medium transition-colors duration-200',
          strength.textColor
        )}
      >
        Password strength: {strength.label}
      </div>
    </div>
  );
}
