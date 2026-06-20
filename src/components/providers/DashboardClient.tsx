'use client';

import { Suspense } from 'react';
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
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Dashboard
        </h1>
        <p
          className="mt-1 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          Welcome back! Here&apos;s your learning overview.
        </p>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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