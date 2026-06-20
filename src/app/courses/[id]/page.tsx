import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { fallbackCourses } from '@/data/fallback';
import DashboardShell from '@/components/providers/DashboardShell';
import CourseProgressHeader from '@/components/tiles/CourseProgressHeader';
import LessonsList from '@/components/tiles/LessonsList';
import type { Course, Lesson } from '@/types/database';

export const dynamic = 'force-dynamic';

interface CoursePageProps {
  params: Promise<{ id: string }>;
}

async function getCourseData(id: string) {
  const supabase = await createClient();

  const { data: course, error: courseError } = await supabase
    .from('courses')
    .select('*')
    .eq('id', id)
    .single();

  if (courseError || !course) {
    const fallback = fallbackCourses.find((c) => c.id === id);
    if (!fallback) return { course: null, lessons: [] };
    return { course: fallback, lessons: [] };
  }

  const { data: lessons } = await supabase
    .from('lessons')
    .select('*')
    .eq('course_id', id)
    .order('order_index', { ascending: true });

  return {
    course: course as Course,
    lessons: (lessons ?? []) as Lesson[],
  };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { id } = await params;
  const { course, lessons } = await getCourseData(id);

  if (!course) {
    notFound();
  }

  return (
    <DashboardShell>
      <div className="space-y-6">
        <CourseProgressHeader course={course} />

        {lessons.length > 0 ? (
          <LessonsList lessons={lessons} courseId={course.id} />
        ) : (
          <div
            className="rounded-2xl border p-8 text-center"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-color)',
            }}
          >
            <p style={{ color: 'var(--text-muted)' }}>
              No lessons available for this course yet.
            </p>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}