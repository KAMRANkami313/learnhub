import { Course, ActivityLog, UserStreak } from '@/types/database';

export const fallbackCourses: Course[] = [
  {
    id: '1',
    title: 'Advanced React Patterns',
    description: 'Master hooks, render props, compound components, and performance optimization techniques used in production.',
    progress: 75,
    icon_name: 'Code2',
    category: 'Development',
    total_lessons: 24,
    completed_lessons: 18,
    color: '#6366f1',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'System Design Fundamentals',
    description: 'Learn to design scalable distributed systems — from load balancers and caches to microservices architecture.',
    progress: 45,
    icon_name: 'Server',
    category: 'Architecture',
    total_lessons: 20,
    completed_lessons: 9,
    color: '#8b5cf6',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Machine Learning Basics',
    description: 'Explore supervised and unsupervised learning, neural networks, model evaluation, and real-world ML pipelines.',
    progress: 92,
    icon_name: 'Brain',
    category: 'Data Science',
    total_lessons: 30,
    completed_lessons: 28,
    color: '#ec4899',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'UI/UX Design Principles',
    description: 'Understand user research, wireframing, prototyping, and building design systems that scale.',
    progress: 30,
    icon_name: 'Palette',
    category: 'Design',
    total_lessons: 16,
    completed_lessons: 5,
    color: '#f59e0b',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export const fallbackStreak: UserStreak = {
  id: '1',
  current_streak: 12,
  longest_streak: 28,
  last_active_date: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export function generateFallbackActivity(): ActivityLog[] {
  const logs: ActivityLog[] = [];
  const today = new Date();

  for (let i = 83; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const seed = (date.getDate() * 7 + date.getMonth() * 31 + i * 13) % 10;
    if (seed > 2) {
      logs.push({
        id: `fallback-${i}`,
        activity_date: date.toISOString().split('T')[0],
        count: (seed % 5) + 1,
        activity_type: 'lesson_completed',
        created_at: date.toISOString(),
      });
    }
  }

  return logs;
}