'use client';

import { motion } from 'framer-motion';
import { Flame, Target, TrendingUp, Zap, ArrowUpRight } from 'lucide-react';
import { UserStreak } from '@/types/database';
import { getGreeting } from '@/lib/utils';

interface HeroTileProps {
  streak: UserStreak | null;
  totalCourses: number;
}

export default function HeroTile({ streak, totalCourses }: HeroTileProps) {
  const currentStreak = streak?.current_streak ?? 0;
  const longestStreak = streak?.longest_streak ?? 0;

  const stats = [
    {
      icon: Flame,
      label: 'Current Streak',
      value: `${currentStreak}`,
      unit: 'days',
      color: '#f59e0b',
      gradient: 'from-amber-500/20 to-orange-500/10',
    },
    {
      icon: Target,
      label: 'Active Courses',
      value: `${totalCourses}`,
      unit: 'courses',
      color: '#6366f1',
      gradient: 'from-indigo-500/20 to-violet-500/10',
    },
    {
      icon: TrendingUp,
      label: 'Best Streak',
      value: `${longestStreak}`,
      unit: 'days',
      color: '#10b981',
      gradient: 'from-emerald-500/20 to-teal-500/10',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-2xl glass relative overflow-hidden grain-overlay col-span-1 md:col-span-2 gradient-border-animated hover-glow"
    >
      {/* Mesh gradient background */}
      <div className="absolute inset-0 mesh-bg-hero pointer-events-none" />

      {/* Floating orbs */}
      <div
        className="absolute top-4 right-8 orb orb-indigo w-32 h-32 animate-float opacity-30"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="absolute bottom-2 right-20 orb orb-purple w-20 h-20 animate-float opacity-20"
        style={{ animationDelay: '2s' }}
      />

      <div className="relative z-10 p-5 sm:p-6">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full mb-4"
          style={{
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
          }}
        >
          <Zap className="w-3 h-3" style={{ color: '#818cf8' }} />
          <span className="text-[11px] font-semibold" style={{ color: '#a5b4fc' }}>
            {getGreeting()}
          </span>
        </motion.div>

        {/* Main heading */}
        <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-1.5 leading-tight tracking-tight">
          Keep Learning,
          <br />
          Keep Growing
        </h2>
        <p
          className="text-sm mb-5 text-pretty"
          style={{ color: 'var(--text-secondary)' }}
        >
          Your daily progress at a glance. Stay consistent, stay sharp.
        </p>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.08 }}
              className="rounded-xl p-3 border relative overflow-hidden group cursor-default transition-all hover:border-white/10"
              style={{
                borderColor: 'var(--border-color)',
                background: 'rgba(255,255,255,0.02)',
              }}
            >
              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${stat.color}12, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center"
                    style={{ backgroundColor: `${stat.color}15` }}
                  >
                    <stat.icon
                      className="w-3.5 h-3.5"
                      style={{ color: stat.color }}
                    />
                  </div>
                  <ArrowUpRight
                    className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: stat.color }}
                  />
                </div>
                <div className="flex items-baseline gap-1">
                  <p
                    className="text-2xl font-bold tracking-tight"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {stat.value}
                  </p>
                  <span
                    className="text-[11px]"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {stat.unit}
                  </span>
                </div>
                <p
                  className="text-[11px] mt-0.5"
                  style={{ color: 'var(--text-muted)' }}
                >
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}