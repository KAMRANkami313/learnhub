'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

// ============================================
// TOGGLE LESSON COMPLETION
// ============================================
export async function toggleLessonCompletion(
  lessonId: string,
  courseId: string,
  currentState: boolean
) {
  const supabase = await createClient();

  // 1. Toggle the lesson
  const { error: lessonError } = await supabase
    .from('lessons')
    .update({ is_completed: !currentState })
    .eq('id', lessonId);

  if (lessonError) {
    return { success: false, error: lessonError.message };
  }

  // 2. Recalculate course progress
  const { data: lessons, error: countError } = await supabase
    .from('lessons')
    .select('is_completed')
    .eq('course_id', courseId);

  if (countError) {
    return { success: false, error: countError.message };
  }

  const totalLessons = lessons.length;
  const completedLessons = lessons.filter((l) => l.is_completed).length;
  const progress =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  // 3. Update the course
  const { error: courseError } = await supabase
    .from('courses')
    .update({
      progress,
      completed_lessons: completedLessons,
      total_lessons: totalLessons,
    })
    .eq('id', courseId);

  if (courseError) {
    return { success: false, error: courseError.message };
  }

  // 4. Log activity if completing a lesson
  if (!currentState) {
    const today = new Date().toISOString().split('T')[0];

    // Try to update existing activity for today
    const { data: existingActivity } = await supabase
      .from('activity_logs')
      .select('id, count')
      .eq('activity_date', today)
      .eq('activity_type', 'lesson_completed')
      .single();

    if (existingActivity) {
      await supabase
        .from('activity_logs')
        .update({ count: existingActivity.count + 1 })
        .eq('id', existingActivity.id);
    } else {
      await supabase.from('activity_logs').insert({
        activity_date: today,
        count: 1,
        activity_type: 'lesson_completed',
      });
    }

    // 5. Update streak
    const { data: streakData } = await supabase
      .from('user_streaks')
      .select('*')
      .limit(1)
      .single();

    if (streakData) {
      const lastActive = new Date(streakData.last_active_date);
      const todayDate = new Date(today);
      const diffDays = Math.floor(
        (todayDate.getTime() - lastActive.getTime()) / (1000 * 60 * 60 * 24)
      );

      let newCurrentStreak = streakData.current_streak;
      let newLongestStreak = streakData.longest_streak;

      if (diffDays === 1) {
        // Consecutive day — increment streak
        newCurrentStreak += 1;
        newLongestStreak = Math.max(newLongestStreak, newCurrentStreak);
      } else if (diffDays > 1) {
        // Gap — reset streak
        newCurrentStreak = 1;
      }
      // diffDays === 0 means same day — no streak change

      await supabase
        .from('user_streaks')
        .update({
          current_streak: newCurrentStreak,
          longest_streak: newLongestStreak,
          last_active_date: today,
        })
        .eq('id', streakData.id);
    }
  }

  // 6. Revalidate the pages
  revalidatePath('/');
  revalidatePath(`/courses/${courseId}`);

  return { success: true };
}

// ============================================
// MARK ALL LESSONS COMPLETE / INCOMPLETE
// ============================================
export async function toggleAllLessons(
  courseId: string,
  markComplete: boolean
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('lessons')
    .update({ is_completed: markComplete })
    .eq('course_id', courseId);

  if (error) {
    return { success: false, error: error.message };
  }

  // Recalculate progress
  const { data: lessons } = await supabase
    .from('lessons')
    .select('is_completed')
    .eq('course_id', courseId);

  const totalLessons = lessons?.length ?? 0;
  const completedLessons = lessons?.filter((l) => l.is_completed).length ?? 0;
  const progress =
    totalLessons > 0
      ? Math.round((completedLessons / totalLessons) * 100)
      : 0;

  await supabase
    .from('courses')
    .update({
      progress,
      completed_lessons: completedLessons,
      total_lessons: totalLessons,
    })
    .eq('id', courseId);

  revalidatePath('/');
  revalidatePath(`/courses/${courseId}`);

  return { success: true };
}