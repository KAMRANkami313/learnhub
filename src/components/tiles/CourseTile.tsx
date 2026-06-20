'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Course } from '@/types/database';
import { getIcon } from '@/lib/icons';

interface CourseTileProps {
  course: Course;
  index: number;
}

export default function CourseTile({ course, index }: CourseTileProps) {
  const Icon = getIcon(course.icon_name);

  return (
    <Link href={`/courses/${course.id}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08 * index }}
        whileHover={{ y: -6, transition: { type: 'spring', stiffness: 300, damping: 20 } }}
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
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(ellipse at 20% 0%, ${course.color}12, transparent 60%)`,
          }}
        />

        <div className="relative z-10 p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Icon with glow */}
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 relative"
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
                    boxShadow: `0 0 20px ${course.color}25`,
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

            <motion.div
              className="shrink-0 ml-2 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:translate-x-0.5"
            >
              <ArrowRight
                className="w-4 h-4"
                style={{ color: 'var(--text-muted)' }}
              />
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
              className="h-1.5 rounded-full overflow-hidden"
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
                }}
              >
                {/* Shimmer on progress bar */}
                <div className="absolute inset-0 animate-shimmer rounded-full" />
              </motion.div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <p className="text-[11px]" style={{ color: 'var(--text-muted)' }}>
              {course.completed_lessons} / {course.total_lessons} lessons
            </p>
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