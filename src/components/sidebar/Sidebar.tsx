'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  LayoutDashboard,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
  Sparkles,
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/', active: true },
  { icon: BookOpen, label: 'My Courses', href: '/courses' },
  { icon: Trophy, label: 'Achievements', href: '/achievements' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="hidden md:flex fixed left-0 top-0 h-screen z-40 flex-col border-r"
      style={{
        backgroundColor: 'var(--bg-sidebar)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* ===== Logo Section ===== */}
      <div
        className="flex items-center h-16 px-4 border-b"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <motion.div layout className="flex items-center gap-3 overflow-hidden">
          <div className="relative shrink-0 w-9 h-9 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
            <div className="absolute inset-0 rounded-lg bg-linear-to-br from-indigo-500 to-purple-600 animate-pulse-glow opacity-50" />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="font-bold text-lg whitespace-nowrap gradient-text"
              >
                LearnHub
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* ===== Navigation Items ===== */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            layout
            className={`
              group flex items-center gap-3 px-3 py-2.5 rounded-xl
              transition-all duration-200 cursor-pointer relative
              ${
                item.active
                  ? 'text-white'
                  : 'text-(--text-secondary) hover:text-white'
              }
            `}
            style={
              item.active
                ? {
                    background:
                      'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.1))',
                  }
                : {}
            }
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Active indicator bar */}
            {item.active && (
              <motion.div
                layoutId="activeNav"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-linear-to-b from-indigo-400 to-purple-500"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            <item.icon className="w-5 h-5 shrink-0" />

            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-medium whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.a>
        ))}
      </nav>

      {/* ===== Streak Card ===== */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mx-3 mb-3 p-3 rounded-xl border relative overflow-hidden"
            style={{
              borderColor: 'var(--border-color)',
              background:
                'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(236, 72, 153, 0.05))',
            }}
          >
            <div className="flex items-center gap-2 mb-1">
              <Flame className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-semibold text-amber-400">
                12 Day Streak
              </span>
            </div>
            <p
              className="text-[11px]"
              style={{ color: 'var(--text-muted)' }}
            >
              Keep going! You&apos;re on fire 🔥
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Collapse Toggle ===== */}
      <div
        className="h-12 flex items-center justify-center border-t"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors"
          style={{
            color: 'var(--text-secondary)',
            background: 'rgba(255,255,255,0.04)',
          }}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </motion.button>
      </div>
    </motion.aside>
  );
}