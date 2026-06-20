'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, CheckCircle2, Sparkles } from 'lucide-react';
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
    <div className="space-y-5">
      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm transition-colors hover:text-white group"
        style={{ color: 'var(--text-secondary)' }}
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        Back to Dashboard
      </Link>

      {/* Course header card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl glass relative overflow-hidden grain-overlay gradient-border-animated hover-glow"
      >
        {/* Accent bar */}
        <div
          className="h-0.75 w-full"
          style={{
            background: `linear-gradient(90deg, ${course.color}, ${course.color}66, transparent)`,
          }}
        />

        {/* Colored mesh background */}
        <div
          className="absolute inset-0 pointer-events-none opacity-50"
          style={{
            background: `radial-gradient(ellipse at 10% 20%, ${course.color}10, transparent 60%)`,
          }}
        />

        <div className="relative z-10 p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start gap-5">
            {/* Icon */}
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 relative"
              style={{ backgroundColor: `${course.color}15` }}
            >
              <Icon className="w-7 h-7" style={{ color: course.color }} />
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  boxShadow: `0 0 25px ${course.color}20`,
                }}
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              {/* Tags */}
              <div className="flex items-center gap-2 mb-2">
                <span
                  className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                  style={{
                    backgroundColor: `${course.color}12`,
                    color: course.color,
                  }}
                >
                  {course.category}
                </span>
                {isComplete && (
                  <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/12 text-emerald-400 inline-flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Completed
                  </span>
                )}
              </div>

              {/* Title */}
              <h1
                className="text-xl sm:text-2xl font-bold mb-2 tracking-tight"
                style={{ color: 'var(--text-primary)' }}
              >
                {course.title}
              </h1>

              {/* Description */}
              {course.description && (
                <p
                  className="text-sm mb-5 leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {course.description}
                </p>
              )}

              {/* Progress bar */}
              <div className="mb-3">
                <div
                  className="h-2.5 rounded-full overflow-hidden"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                >
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${course.progress}%` }}
                    transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="h-full rounded-full relative"
                    style={{
                      background: `linear-gradient(90deg, ${course.color}, ${course.color}bb)`,
                    }}
                  >
                    <div className="absolute inset-0 animate-shimmer rounded-full" />
                  </motion.div>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-5">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" style={{ color: course.color }} />
                  <span
                    className="text-sm font-bold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {course.progress}%
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    complete
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    {course.completed_lessons} / {course.total_lessons} lessons
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                  <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                    ~{course.total_lessons * 25} min total
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