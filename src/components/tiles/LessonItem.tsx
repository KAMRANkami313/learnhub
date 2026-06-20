'use client';

import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Circle, Clock, Loader2 } from 'lucide-react';
import { toggleLessonCompletion } from '@/lib/actions';
import { Lesson } from '@/types/database';

interface LessonItemProps {
  lesson: Lesson;
  courseId: string;
}

export default function LessonItem({ lesson, courseId }: LessonItemProps) {
  const [isCompleted, setIsCompleted] = useState(lesson.is_completed);
  const [isPending, startTransition] = useTransition();

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleLessonCompletion(
        lesson.id,
        courseId,
        isCompleted
      );
      if (result.success) {
        setIsCompleted(!isCompleted);
      }
    });
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.2 }}
      className={`
        flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border
        transition-all duration-200 cursor-pointer group
        ${isPending ? 'opacity-70 pointer-events-none' : ''}
      `}
      style={{
        backgroundColor: isCompleted
          ? 'rgba(16, 185, 129, 0.05)'
          : 'var(--bg-card)',
        borderColor: isCompleted
          ? 'rgba(16, 185, 129, 0.15)'
          : 'var(--border-color)',
      }}
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleToggle();
      }}
    >
      {/* Checkbox */}
      <div className="shrink-0">
        {isPending ? (
          <Loader2 className="w-5 h-5 animate-spin" style={{ color: 'var(--text-muted)' }} />
        ) : isCompleted ? (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center"
          >
            <Check className="w-3.5 h-3.5 text-white" />
          </motion.div>
        ) : (
          <Circle
            className="w-6 h-6 transition-colors group-hover:text-indigo-400"
            style={{ color: 'var(--text-muted)' }}
          />
        )}
      </div>

      {/* Lesson info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span
            className="text-[11px] font-mono px-1.5 py-0.5 rounded"
            style={{
              color: 'var(--text-muted)',
              backgroundColor: 'rgba(255,255,255,0.04)',
            }}
          >
            {String(lesson.order_index).padStart(2, '0')}
          </span>
          <p
            className={`text-sm font-medium truncate ${
              isCompleted ? 'line-through' : ''
            }`}
            style={{
              color: isCompleted
                ? 'var(--text-muted)'
                : 'var(--text-primary)',
            }}
          >
            {lesson.title}
          </p>
        </div>
        {lesson.description && (
          <p
            className="text-xs mt-1 line-clamp-1"
            style={{ color: 'var(--text-muted)' }}
          >
            {lesson.description}
          </p>
        )}
      </div>

      {/* Duration */}
      <div
        className="flex items-center gap-1 shrink-0"
        style={{ color: 'var(--text-muted)' }}
      >
        <Clock className="w-3.5 h-3.5" />
        <span className="text-xs">{lesson.duration_minutes}m</span>
      </div>
    </motion.div>
  );
}