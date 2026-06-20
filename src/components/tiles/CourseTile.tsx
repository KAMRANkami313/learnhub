'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { Course } from '@/types/database';
import { getIcon } from '@/lib/icons';

interface CourseTileProps {
  course: Course;
  index: number;
}

export default function CourseTile({ course, index }: CourseTileProps) {
  const Icon = getIcon(course.icon_name);
  const isComplete = course.progress === 100;
  const remaining = course.total_lessons - course.completed_lessons;

  return (
    <Link href={`/courses/${course.id}`} className="block h-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          delay: 0.08 * index,
          ease: [0.16, 1, 0.3, 1],
        }}
        whileHover={{
          y: -6,
          transition: { type: 'spring', stiffness: 300, damping: 20 },
        }}
        className="rounded-2xl glass relative overflow-hidden grain-overlay group cursor-pointer active:scale-[0.98] sm:active:scale-100 h-full gradient-border-animated hover-glow"
      >
        {/* Top accent gradient line */}
        <div
          className="h-0.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${course.color}, ${course.color}66, transparent)`,
          }}
        />

        {/* Subtle colored mesh background */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 20% 0%, ${course.color}14, transparent 60%)`,
          }}
        />

        <div className="relative z-10 p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Icon with glow */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0 relative transition-transform group-hover:scale-105"
                style={{ backgroundColor: `${course.color}15` }}
              >
                <Icon
                  className="w-5 h-5"
                  style={{ color: course.color }}
                />
                {/* Subtle glow behind icon */}
                <div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    boxShadow: `0 0 24px ${course.color}30`,
                  }}
                />
              </div>
              <div className="min-w-0">
                <h3
                  className="text-sm font-semibold truncate"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {course.title}
                </h3>
                <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                  {course.category}
                </p>
              </div>
            </div>

            <motion.div className="shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center"
                style={{
                  backgroundColor: `${course.color}12`,
                }}
              >
                <ArrowRight
                  className="w-3.5 h-3.5"
                  style={{ color: course.color }}
                />
              </div>
            </motion.div>
          </div>

          {/* Description */}
          <p
            className="text-xs mb-4 line-clamp-2 leading-relaxed"
            style={{ color: 'var(--text-secondary)' }}
          >
            {course.description}
          </p>

          {/* Progress Bar */}
          <div className="mb-2.5">
            <div
              className="h-1.5 rounded-full overflow-hidden relative"
              style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{
                  duration: 1.2,
                  delay: 0.3 + index * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="h-full rounded-full relative"
                style={{
                  background: `linear-gradient(90deg, ${course.color}, ${course.color}bb)`,
                  boxShadow: `0 0 8px ${course.color}40`,
                }}
              >
                {/* Shimmer on progress bar */}
                <div className="absolute inset-0 animate-shimmer rounded-full" />
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
                {course.completed_lessons} / {course.total_lessons} lessons
              </p>
              {isComplete ? (
                <span
                  className="text-[10px] font-semibold px-1.5 py-0.5 rounded-md"
                  style={{
                    backgroundColor: 'rgba(16, 185, 129, 0.12)',
                    color: '#34d399',
                  }}
                >
                  Done
                </span>
              ) : (
                <span className="flex items-center gap-0.5 text-[10px]" style={{ color: 'var(--text-muted)' }}>
                  <Clock className="w-2.5 h-2.5" />
                  {remaining} left
                </span>
              )}
            </div>
            <p
              className="text-[11px] font-bold"
              style={{ color: course.color }}
            >
              {course.progress}%
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}