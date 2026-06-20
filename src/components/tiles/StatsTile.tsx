'use client';

import { motion } from 'framer-motion';
import { BookOpen, Clock, Award } from 'lucide-react';
import { Course } from '@/types/database';

interface StatsTileProps {
  courses: Course[];
}

export default function StatsTile({ courses }: StatsTileProps) {
  const totalLessons = courses.reduce((sum, c) => sum + c.total_lessons, 0);
  const completedLessons = courses.reduce(
    (sum, c) => sum + c.completed_lessons,
    0
  );
  const avgProgress =
    courses.length > 0
      ? Math.round(
          courses.reduce((sum, c) => sum + c.progress, 0) / courses.length
        )
      : 0;

  const items = [
    {
      icon: BookOpen,
      label: 'Total Lessons',
      value: totalLessons,
      color: '#6366f1',
    },
    {
      icon: Clock,
      label: 'Completed',
      value: completedLessons,
      color: '#10b981',
    },
    {
      icon: Award,
      label: 'Avg Progress',
      value: `${avgProgress}%`,
      color: '#f59e0b',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl glass relative overflow-hidden hover-glow"
    >
      <div className="p-5 sm:p-6 space-y-5">
        <div className="flex items-center justify-between">
          <h3
            className="text-[11px] font-semibold uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            Quick Stats
          </h3>
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: '#6366f1',
              boxShadow: '0 0 8px #6366f1',
            }}
          />
        </div>

        <div className="space-y-3.5">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.08 }}
              className="flex items-center gap-3 group"
            >
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all group-hover:scale-110"
                style={{
                  backgroundColor: `${item.color}12`,
                  boxShadow: `0 0 0 0 ${item.color}40`,
                }}
              >
                <item.icon
                  className="w-4 h-4"
                  style={{ color: item.color }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  {item.label}
                </p>
                <p
                  className="text-lg font-bold tracking-tight"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress ring — visual accent */}
        <div
          className="pt-3 border-t"
          style={{ borderColor: 'var(--border-color)' }}
        >
          <div className="flex items-center gap-3">
            <div className="relative w-11 h-11 shrink-0">
              <svg className="w-11 h-11 -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: '0 94' }}
                  animate={{ strokeDasharray: `${avgProgress * 0.94} 94` }}
                  transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="100%" stopColor="#a855f7" />
                  </linearGradient>
                </defs>
              </svg>
              <span
                className="absolute inset-0 flex items-center justify-center text-[10px] font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {avgProgress}%
              </span>
            </div>
            <div>
              <p
                className="text-xs font-medium"
                style={{ color: 'var(--text-secondary)' }}
              >
                Overall Progress
              </p>
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                {completedLessons} of {totalLessons} lessons done
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}