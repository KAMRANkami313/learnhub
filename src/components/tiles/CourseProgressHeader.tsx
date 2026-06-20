'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { Course } from '@/types/database';
import { getIcon } from '@/lib/icons';

interface CourseProgressHeaderProps {
  course: Course;
}

export default function CourseProgressHeader({
  course,
}: CourseProgressHeaderProps) {
  const Icon = getIcon(course.icon_name);
  const isComplete = course.progress === 100;

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white"
        style={{ color: 'var(--text-secondary)' }}
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </Link>

      {/* Course header card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl border relative overflow-hidden grain-overlay"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
        }}
      >
        {/* Accent bar */}
        <div
          className="h-1.5 w-full"
          style={{
            background: `linear-gradient(90deg, ${course.color}, ${course.color}88)`,
          }}
        />

        <div className="relative z-10 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${course.color}18` }}
            >
              <Icon className="w-7 h-7" style={{ color: course.color }} />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span
                  className="text-xs font-medium px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${course.color}15`,
                    color: course.color,
                  }}
                >
                  {course.category}
                </span>
                {isComplete && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400">
                    Completed
                  </span>
                )}
              </div>
              <h1
                className="text-xl sm:text-2xl font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {course.title}
              </h1>
              {course.description && (
                <p
                  className="text-sm mb-4"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {course.description}
                </p>
              )}

              {/* Progress bar */}
              <div className="mb-3">
                <div
                  className="h-3 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${course.color}, ${course.color}cc)`,
                    }}
                  />
                </div>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" style={{ color: course.color }} />
                  <span
                    className="text-sm font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {course.progress}%
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen
                    className="w-4 h-4"
                    style={{ color: 'var(--text-muted)' }}
                  />
                  <span
                    className="text-sm"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {course.completed_lessons} / {course.total_lessons} lessons
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}