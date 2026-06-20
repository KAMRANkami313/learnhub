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
        transition={{ duration: 0.4, delay: 0.1 * index }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className="rounded-2xl border relative overflow-hidden grain-overlay group cursor-pointer active:scale-[0.98] sm:active:scale-100 h-full"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
        }}
      >
        {/* Colored top accent bar */}
        <div
          className="h-1 w-full"
          style={{
            background: `linear-gradient(90deg, ${course.color}, ${course.color}88)`,
          }}
        />

        <div className="relative z-10 p-4 sm:p-5">
          {/* Header: Icon + Category */}
          <div className="flex items-start justify-between mb-3 sm:mb-4">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ backgroundColor: `${course.color}18` }}
              >
                <Icon
                  className="w-5 h-5"
                  style={{ color: course.color }}
                />
              </div>
              <div className="min-w-0">
                <h3
                  className="text-sm font-semibold truncate"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {course.title}
                </h3>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {course.category}
                </p>
              </div>
            </div>

            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2"
              whileHover={{ x: 3 }}
            >
              <ArrowRight
                className="w-4 h-4"
                style={{ color: 'var(--text-muted)' }}
              />
            </motion.div>
          </div>

          {/* Description */}
          <p
            className="text-xs mb-3 sm:mb-4 line-clamp-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            {course.description}
          </p>

          {/* Progress Bar */}
          <div className="mb-2">
            <div
              className="h-2 rounded-full overflow-hidden"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${course.progress}%` }}
                transition={{
                  duration: 1,
                  delay: 0.3 + index * 0.1,
                  ease: 'easeOut',
                }}
                className="h-full rounded-full"
                style={{
                  background: `linear-gradient(90deg, ${course.color}, ${course.color}cc)`,
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {course.completed_lessons} / {course.total_lessons} lessons
            </p>
            <p
              className="text-xs font-semibold"
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