// ============================================
// DATABASE TYPES
// ============================================

export interface Course {
  id: string;
  title: string;
  description: string | null;
  progress: number;
  icon_name: string;
  category: string;
  total_lessons: number;
  completed_lessons: number;
  color: string;
  created_at: string;
  updated_at: string;
}

export interface ActivityLog {
  id: string;
  activity_date: string;
  count: number;
  activity_type: string;
  created_at: string;
}

export interface UserStreak {
  id: string;
  current_streak: number;
  longest_streak: number;
  last_active_date: string;
  updated_at: string;
}

// Supabase table row types
export type CourseRow = Course;
export type ActivityLogRow = ActivityLog;
export type UserStreakRow = UserStreak;

// For creating new records (id and timestamps auto-generated)
export type CourseInsert = Omit<Course, 'id' | 'created_at' | 'updated_at'>;
export type ActivityLogInsert = Omit<ActivityLog, 'id' | 'created_at'>;
export type UserStreakInsert = Omit<UserStreak, 'id' | 'updated_at'>;

export interface Lesson {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  duration_minutes: number;
  order_index: number;
  is_completed: boolean;
  created_at: string;
  updated_at: string;
}

export type LessonRow = Lesson;
export type LessonInsert = Omit<Lesson, 'id' | 'created_at' | 'updated_at'>;

// Dashboard data bundle returned by the server
export interface DashboardData {
  courses: Course[];
  activities: ActivityLog[];
  streak: UserStreak | null;
  usingFallback: boolean;
}