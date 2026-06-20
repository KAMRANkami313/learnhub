'use client';

import { useState, useTransition, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Circle, Clock, Loader2 } from 'lucide-react';
import { toggleLessonCompletion } from '@/lib/actions';
import { useToast } from '@/components/ui/Toast';
import { Lesson } from '@/types/database';

interface LessonItemProps {
  lesson: Lesson;
  courseId: string;
}

export default function LessonItem({ lesson, courseId }: LessonItemProps) {
  const [isCompleted, setIsCompleted] = useState(lesson.is_completed);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  useEffect(() => {
    setIsCompleted(lesson.is_completed);
  }, [lesson.is_completed]);

  function handleToggle() {
    startTransition(async () => {
      const result = await toggleLessonCompletion(
        lesson.id,
        courseId,
        isCompleted
      );
      if (result.success) {
        setIsCompleted(!isCompleted);
        showToast(
          'success',
          isCompleted
            ? `Marked "${lesson.title}" as incomplete`
            : `Completed "${lesson.title}" 🎉`
        );
      } else {
        showToast(
          'error',
          result.error || 'Failed to update lesson. Please try again.'
        );
      }
    });
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.2 }}
      className={`
        flex items-center gap-3 sm:gap-4 p-3.5 sm:p-4 rounded-xl border
        transition-all duration-200 cursor-pointer group relative overflow-hidden
        hover:border-white/10
        ${isPending ? 'opacity-60 pointer-events-none' : ''}
      `}
      style={{
        backgroundColor: isCompleted
          ? 'rgba(16, 185, 129, 0.04)'
          : 'rgba(255,255,255,0.02)',
        borderColor: isCompleted
          ? 'rgba(16, 185, 129, 0.12)'
          : 'var(--border-color)',
      }}
      onClick={handleToggle}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleToggle();
      }}
    >
      {/* Hover background glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{
          background: isCompleted
            ? 'radial-gradient(circle at 10% 50%, rgba(16, 185, 129, 0.08), transparent 60%)'
            : 'radial-gradient(circle at 10% 50%, rgba(99, 102, 241, 0.06), transparent 60%)',
        }}
      />

      {/* Checkbox */}
      <div className="shrink-0 relative z-10">
        {isPending ? (
          <Loader2
            className="w-5 h-5 animate-spin"
            style={{ color: '#818cf8' }}
          />
        ) : isCompleted ? (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="w-6 h-6 rounded-full bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-emerald-500/30"
          >
            <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
          </motion.div>
        ) : (
          <Circle
            className="w-6 h-6 transition-all duration-200 group-hover:text-indigo-400 group-hover:scale-105"
            style={{ color: 'var(--text-muted)' }}
          />
        )}
      </div>

      {/* Lesson info */}
      <div className="flex-1 min-w-0 relative z-10">
        <div className="flex items-center gap-2">
          <span
            className="text-[10px] font-mono px-1.5 py-0.5 rounded-md transition-colors"
            style={{
              color: isCompleted ? 'rgba(16, 185, 129, 0.8)' : 'var(--text-muted)',
              backgroundColor: isCompleted
                ? 'rgba(16, 185, 129, 0.1)'
                : 'rgba(255,255,255,0.03)',
            }}
          >
            {String(lesson.order_index).padStart(2, '0')}
          </span>
          <p
            className={`text-sm font-medium truncate transition-colors ${
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
        className="flex items-center gap-1 shrink-0 relative z-10"
        style={{ color: 'var(--text-muted)' }}
      >
        <Clock className="w-3 h-3" />
        <span className="text-[11px] font-medium">{lesson.duration_minutes}m</span>
      </div>
    </motion.div>
  );
}