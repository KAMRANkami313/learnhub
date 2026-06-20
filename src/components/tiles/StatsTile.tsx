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
      transition={{ duration: 0.5, delay: 0.2 }}
      className="rounded-2xl border relative overflow-hidden"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="p-5 sm:p-6 space-y-4 sm:space-y-5">
        <h3
          className="text-sm font-semibold uppercase tracking-wider"
          style={{ color: 'var(--text-muted)' }}
        >
          Quick Stats
        </h3>

        {items.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.4 + index * 0.1 }}
            className="flex items-center gap-3"
          >
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${item.color}15` }}
            >
              <item.icon
                className="w-4 h-4"
                style={{ color: item.color }}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {item.label}
              </p>
              <p
                className="text-lg font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {item.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}