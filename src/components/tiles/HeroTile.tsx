'use client';

import { motion } from 'framer-motion';
import { Flame, Target, TrendingUp } from 'lucide-react';
import { UserStreak } from '@/types/database';
import { getGreeting } from '@/lib/utils';

interface HeroTileProps {
  streak: UserStreak | null;
  totalCourses: number;
}

export default function HeroTile({ streak, totalCourses }: HeroTileProps) {
  const currentStreak = streak?.current_streak ?? 0;
  const longestStreak = streak?.longest_streak ?? 0;

  const stats = [
    {
      icon: Flame,
      label: 'Current Streak',
      value: `${currentStreak} days`,
      color: '#f59e0b',
      bg: 'rgba(245, 158, 11, 0.1)',
    },
    {
      icon: Target,
      label: 'Active Courses',
      value: `${totalCourses}`,
      color: '#6366f1',
      bg: 'rgba(99, 102, 241, 0.1)',
    },
    {
      icon: TrendingUp,
      label: 'Best Streak',
      value: `${longestStreak} days`,
      color: '#10b981',
      bg: 'rgba(16, 185, 129, 0.1)',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="rounded-2xl border relative overflow-hidden grain-overlay col-span-1 lg:col-span-2"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-bg-1 pointer-events-none" />

      <div className="relative z-10 p-6">
        {/* Greeting */}
        <p
          className="text-sm font-medium mb-1"
          style={{ color: 'var(--text-secondary)' }}
        >
          {getGreeting()} 👋
        </p>
        <h2 className="text-2xl lg:text-3xl font-bold gradient-text mb-6">
          Keep Learning, Keep Growing
        </h2>

        {/* Stat Cards */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
              className="rounded-xl p-3 border"
              style={{
                background: stat.bg,
                borderColor: 'var(--border-color)',
              }}
            >
              <stat.icon
                className="w-5 h-5 mb-2"
                style={{ color: stat.color }}
              />
              <p
                className="text-lg font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {stat.value}
              </p>
              <p
                className="text-xs"
                style={{ color: 'var(--text-muted)' }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}