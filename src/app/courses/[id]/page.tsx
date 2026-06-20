import { createClient } from '@/lib/supabase/server';
import { fallbackCourses, fallbackStreak, generateFallbackActivity } from '@/data/fallback';
import DashboardShell from '@/components/providers/DashboardShell';
import DashboardClient from '@/components/providers/DashboardClient';
import type { Course, ActivityLog, UserStreak } from '@/types/database';

export const dynamic = 'force-dynamic';

async function getDashboardData() {
  const supabase = await createClient();

  let courses: Course[] = fallbackCourses;
  let activities: ActivityLog[] = generateFallbackActivity();
  let streak: UserStreak | null = fallbackStreak;
  let usingFallback = false;

  try {
    // Fetch courses
    const { data: coursesData, error: coursesError } = await supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: true });

    if (!coursesError && coursesData && coursesData.length > 0) {
      courses = coursesData;
    } else {
      usingFallback = true;
    }

    // Fetch activity logs
    const { data: activityData, error: activityError } = await supabase
      .from('activity_logs')
      .select('*')
      .order('activity_date', { ascending: true });

    if (!activityError && activityData && activityData.length > 0) {
      activities = activityData;
    } else {
      usingFallback = true;
    }

    // Fetch streak
    const { data: streakData, error: streakError } = await supabase
      .from('user_streaks')
      .select('*')
      .limit(1)
      .single();

    if (!streakError && streakData) {
      streak = streakData;
    } else {
      usingFallback = true;
    }
  } catch {
    usingFallback = true;
  }

  return { courses, activities, streak, usingFallback };
}

export default async function Home() {
  const { courses, activities, streak, usingFallback } = await getDashboardData();

  return (
    <DashboardShell>
      {/* Fallback banner */}
      {usingFallback && (
        <div
          className="mb-5 px-4 py-3 rounded-xl border text-xs flex items-center gap-2.5 animate-fade-in-up"
          style={{
            backgroundColor: 'rgba(245, 158, 11, 0.08)',
            borderColor: 'rgba(245, 158, 11, 0.2)',
            color: '#f59e0b',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-glow" />
          <span className="font-medium">
            Showing demo data — connect Supabase to see live data
          </span>
        </div>
      )}

      <DashboardClient
        courses={courses}
        activities={activities}
        streak={streak}
      />
    </DashboardShell>
  );
}