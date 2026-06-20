'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { Course, ActivityLog, UserStreak } from '@/types/database';
import HeroTile from '@/components/tiles/HeroTile';
import StatsTile from '@/components/tiles/StatsTile';
import CourseTile from '@/components/tiles/CourseTile';
import ActivityTile from '@/components/tiles/ActivityTile';
import HeroSkeleton from '@/components/skeletons/HeroSkeleton';
import CourseSkeleton from '@/components/skeletons/CourseSkeleton';
import ActivitySkeleton from '@/components/skeletons/ActivitySkeleton';

interface DashboardClientProps {
  courses: Course[];
  activities: ActivityLog[];
  streak: UserStreak | null;
}

export default function DashboardClient({
  courses,
  activities,
  streak,
}: DashboardClientProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"
      >
        <div>
          <div
            className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full mb-3"
            style={{
              background: 'rgba(99, 102, 241, 0.08)',
              border: '1px solid rgba(99, 102, 241, 0.15)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
            <span
              className="text-[10px] font-semibold uppercase tracking-widest"
              style={{ color: '#a5b4fc' }}
            >
              Dashboard
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Your Learning Overview
          </h1>
          <p
            className="mt-1.5 text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            Welcome back! Here&apos;s your progress at a glance.
          </p>
        </div>
      </motion.div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
        {/* Row 1: Hero (2 cols) + Stats (1 col) */}
        <Suspense fallback={<HeroSkeleton />}>
          <HeroTile streak={streak} totalCourses={courses.length} />
        </Suspense>

        <Suspense fallback={<CourseSkeleton />}>
          <StatsTile courses={courses} />
        </Suspense>

        {/* Course Tiles */}
        {courses.map((course, index) => (
          <Suspense key={course.id} fallback={<CourseSkeleton />}>
            <CourseTile course={course} index={index} />
          </Suspense>
        ))}

        {/* Activity Tile — full width */}
        <Suspense fallback={<ActivitySkeleton />}>
          <ActivityTile activities={activities} />
        </Suspense>
      </div>
    </div>
  );
}