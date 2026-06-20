// ============================================
// UTILITY FUNCTIONS
// ============================================

import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

// Activity level color — smoother gradient feel
export function getActivityColor(count: number): string {
  if (count === 0) return 'bg-white/[0.04]';
  if (count <= 1) return 'bg-emerald-500/20';
  if (count <= 2) return 'bg-emerald-500/40';
  if (count <= 3) return 'bg-emerald-500/60';
  if (count <= 4) return 'bg-emerald-500/80';
  return 'bg-emerald-500';
}