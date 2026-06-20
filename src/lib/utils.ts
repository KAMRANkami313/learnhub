// ============================================
// UTILITY FUNCTIONS
// ============================================

import { type ClassValue, clsx } from 'clsx';

// Simple clsx implementation (no need for extra dependency)
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

// Format date to readable string
export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

// Get greeting based on time of day
export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  return 'Good Evening';
}

// Get activity level color based on count
export function getActivityColor(count: number): string {
  if (count === 0) return 'bg-white/5';
  if (count <= 1) return 'bg-emerald-500/30';
  if (count <= 2) return 'bg-emerald-500/50';
  if (count <= 3) return 'bg-emerald-500/70';
  return 'bg-emerald-500';
}