'use client';

import { motion } from 'framer-motion';
import { ActivityLog } from '@/types/database';
import { getActivityColor } from '@/lib/utils';

interface ActivityTileProps {
  activities: ActivityLog[];
}

interface DayData {
  date: string;
  count: number;
  dayOfWeek: number;
  week: number;
}

export default function ActivityTile({ activities }: ActivityTileProps) {
  // Build 12 weeks of data
  const today = new Date();
  const days: DayData[] = [];

  for (let i = 83; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    const dateStr = date.toISOString().split('T')[0];
    const activity = activities.find((a) => a.activity_date === dateStr);
    days.push({
      date: dateStr,
      count: activity?.count ?? 0,
      dayOfWeek: date.getDay(),
      week: Math.floor(i / 7),
    });
  }

  // Total and average
  const totalActivity = activities.reduce((sum, a) => sum + a.count, 0);
  const activeDays = activities.filter((a) => a.count > 0).length;

  // Group into weeks (columns) for the grid
  const weeks: DayData[][] = [];
  for (let w = 0; w < 12; w++) {
    const weekDays = days.filter((d) => d.week === w);
    weeks.push(weekDays);
  }

  // Month labels
  const monthLabels: { label: string; col: number }[] = [];
  let lastMonth = -1;
  weeks.forEach((week, wi) => {
    const firstDay = week[0];
    if (firstDay) {
      const month = new Date(firstDay.date).getMonth();
      if (month !== lastMonth) {
        lastMonth = month;
        monthLabels.push({
          label: new Date(firstDay.date).toLocaleString('en-US', {
            month: 'short',
          }),
          col: wi,
        });
      }
    }
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="rounded-2xl border relative overflow-hidden col-span-1 lg:col-span-3"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
      }}
    >
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3
            className="text-sm font-semibold uppercase tracking-wider"
            style={{ color: 'var(--text-muted)' }}
          >
            Learning Activity
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                Less
              </span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`w-3 h-3 rounded-sm ${getActivityColor(level)}`}
                />
              ))}
              <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                More
              </span>
            </div>
          </div>
        </div>

        {/* Contribution Grid */}
        <div className="overflow-x-auto">
          {/* Month labels */}
          <div
            className="flex gap-0,75 mb-1"
            style={{ paddingLeft: '28px' }}
          >
            {monthLabels.map((m, i) => (
              <div
                key={i}
                className="text-[10px]"
                style={{
                  color: 'var(--text-muted)',
                  minWidth: `${(m.col - (monthLabels[i - 1]?.col ?? -1)) * 11}px`,
                }}
              >
                {m.label}
              </div>
            ))}
          </div>

          <div className="flex gap-0.75">
            {/* Day labels */}
            <div className="flex flex-col gap-0,75 mr-1">
              {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, i) => (
                <div
                  key={i}
                  className="h-2.75 flex items-center text-[10px]"
                  style={{ color: 'var(--text-muted)', width: '24px' }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Weeks */}
            <div className="flex gap-0.75">
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} className="flex flex-col gap-0.75">
                  {[0, 1, 2, 3, 4, 5, 6].map((dayIndex) => {
                    const day = week.find(
                      (d) => d.dayOfWeek === dayIndex
                    );
                    const count = day?.count ?? 0;
                    return (
                      <motion.div
                        key={dayIndex}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.2,
                          delay: weekIndex * 0.02 + dayIndex * 0.01,
                        }}
                        title={
                          day
                            ? `${day.date}: ${count} lesson${count !== 1 ? 's' : ''} completed`
                            : ''
                        }
                        className={`w-2.75 h-2.75 rounded-sm ${getActivityColor(
                          count
                        )} transition-colors hover:ring-1 hover:ring-white/30`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-6 mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span className="font-bold text-white">{totalActivity}</span>{' '}
            lessons completed in the last 12 weeks
          </p>
          <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
            <span className="font-bold text-white">{activeDays}</span> active
            days
          </p>
        </div>
      </div>
    </motion.div>
  );
}