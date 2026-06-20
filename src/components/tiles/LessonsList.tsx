'use client';

import { useState, useTransition } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter } from 'lucide-react';
import { Lesson } from '@/types/database';
import LessonItem from '@/components/tiles/LessonItem';
import { toggleAllLessons } from '@/lib/actions';

interface LessonsListProps {
  lessons: Lesson[];
  courseId: string;
}

type FilterType = 'all' | 'completed' | 'incomplete';

export default function LessonsList({
  lessons,
  courseId,
}: LessonsListProps) {
  const [filter, setFilter] = useState<FilterType>('all');
  const [isPending, startTransition] = useTransition();

  const filteredLessons = lessons.filter((lesson) => {
    if (filter === 'completed') return lesson.is_completed;
    if (filter === 'incomplete') return !lesson.is_completed;
    return true;
  });

  const completedCount = lessons.filter((l) => l.is_completed).length;
  const incompleteCount = lessons.length - completedCount;

  function handleMarkAll() {
    startTransition(async () => {
      const hasIncomplete = lessons.some((l) => !l.is_completed);
      await toggleAllLessons(courseId, hasIncomplete);
    });
  }

  const filterButtons: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: lessons.length },
    { key: 'completed', label: 'Completed', count: completedCount },
    { key: 'incomplete', label: 'Remaining', count: incompleteCount },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="space-y-4"
    >
      {/* Header + Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4" style={{ color: 'var(--text-muted)' }} />
          <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
            {filteredLessons.length} lesson{filteredLessons.length !== 1 ? 's' : ''}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Filter tabs */}
          <div
            className="flex rounded-lg border p-0.5"
            style={{
              borderColor: 'var(--border-color)',
              backgroundColor: 'rgba(255,255,255,0.02)',
            }}
          >
            {filterButtons.map((btn) => (
              <button
                key={btn.key}
                onClick={() => setFilter(btn.key)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                  filter === btn.key
                    ? 'text-white'
                    : ''
                }`}
                style={{
                  backgroundColor:
                    filter === btn.key
                      ? 'rgba(99, 102, 241, 0.15)'
                      : 'transparent',
                  color:
                    filter === btn.key
                      ? '#6366f1'
                      : 'var(--text-muted)',
                }}
              >
                {btn.label} ({btn.count})
              </button>
            ))}
          </div>

          {/* Mark all button */}
          <button
            onClick={handleMarkAll}
            disabled={isPending}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all border"
            style={{
              borderColor: 'var(--border-color)',
              color: 'var(--text-secondary)',
              backgroundColor: 'rgba(255,255,255,0.03)',
            }}
          >
            {isPending
              ? 'Updating...'
              : incompleteCount > 0
              ? 'Complete All'
              : 'Reset All'}
          </button>
        </div>
      </div>

      {/* Lessons list */}
      <div className="space-y-2">
        <AnimatePresence mode="popLayout">
          {filteredLessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              courseId={courseId}
            />
          ))}
        </AnimatePresence>

        {filteredLessons.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-12 text-center"
          >
            <p style={{ color: 'var(--text-muted)' }}>
              No lessons found for this filter.
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}