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
  LogOut,
  Search,
  Zap,
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
  active?: boolean;
  badge?: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/', active: true },
  { icon: BookOpen, label: 'My Courses', href: '/courses', badge: '4' },
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
      className="hidden md:flex fixed left-0 top-0 h-screen z-40 flex-col glass-strong"
      style={{
        borderRight: '1px solid var(--border-color)',
      }}
    >
      {/* Mesh gradient overlay */}
      <div className="absolute inset-0 mesh-bg-sidebar pointer-events-none" />

      {/* ===== Logo Section ===== */}
      <div
        className="relative flex items-center h-16 px-4 border-b"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <motion.div layout className="flex items-center gap-3 overflow-hidden">
          {/* Logo icon with orbiting dot */}
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-xl bg-linear-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 relative">
              <Sparkles className="w-5 h-5 text-white" />
              {/* Subtle inner highlight */}
              <div className="absolute inset-0 rounded-xl bg-linear-to-br from-white/20 to-transparent pointer-events-none" />
            </div>
            <div
              className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2"
              style={{ borderColor: 'var(--bg-sidebar)' }}
            />
            {/* Pulsing ring */}
            <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-ping opacity-60" />
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

      {/* ===== Search Bar ===== */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="relative px-3 pt-3"
          >
            <div
              className="flex items-center gap-2 px-3 py-2 rounded-xl border transition-colors"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
            >
              <Search
                className="w-3.5 h-3.5 shrink-0"
                style={{ color: 'var(--text-muted)' }}
              />
              <input
                type="text"
                placeholder="Search..."
                className="flex-1 bg-transparent text-xs outline-none placeholder:opacity-60"
                style={{ color: 'var(--text-primary)' }}
              />
              <kbd
                className="text-[10px] px-1.5 py-0.5 rounded-md font-mono"
                style={{
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-color)',
                }}
              >
                ⌘K
              </kbd>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Navigation Items ===== */}
      <nav className="relative flex-1 py-3 px-2.5 space-y-0.5 overflow-y-auto">
        {!collapsed && (
          <p
            className="px-3 pt-2 pb-1.5 text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: 'var(--text-muted)' }}
          >
            Menu
          </p>
        )}
        {navItems.map((item) => (
          <motion.a
            key={item.label}
            href={item.href}
            layout
            className={`
              group flex items-center gap-3 px-3 py-2.5 rounded-xl
              transition-colors duration-200 cursor-pointer relative
              ${item.active
                ? 'text-white'
                : 'text-(--text-secondary) hover:text-white hover:bg-white/4'
              }
            `}
            style={
              item.active
                ? {
                    background:
                      'linear-gradient(135deg, rgba(99, 102, 241, 0.14), rgba(139, 92, 246, 0.08))',
                  }
                : {}
            }
            whileHover={{ x: 2 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Active indicator bar */}
            {item.active && (
              <motion.div
                layoutId="activeNav"
                className="absolute left-0 top-1/2 -translate-y-1/2 w-0.75 h-5 rounded-r-full bg-linear-to-b from-indigo-400 to-purple-500"
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            )}

            <item.icon
              className={`w-4.5 h-4.5 shrink-0 transition-colors ${item.active ? 'text-indigo-400' : ''}`}
            />

            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-[13px] font-medium whitespace-nowrap flex-1"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Badge */}
            {item.badge && !collapsed && (
              <span
                className="text-[10px] font-bold px-1.5 py-0.5 rounded-md"
                style={{
                  backgroundColor: 'rgba(99, 102, 241, 0.15)',
                  color: '#a5b4fc',
                }}
              >
                {item.badge}
              </span>
            )}
          </motion.a>
        ))}
      </nav>

      {/* ===== User Profile Card ===== */}
      <AnimatePresence>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="mx-3 mb-2"
          >
            {/* Streak Card */}
            <div
              className="p-3 rounded-xl border relative overflow-hidden mb-2 group"
              style={{
                borderColor: 'var(--border-color)',
                background:
                  'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(236, 72, 153, 0.05))',
              }}
            >
              {/* Glow accent */}
              <div
                className="absolute -top-4 -right-4 w-16 h-16 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity"
                style={{ background: 'radial-gradient(circle, #f59e0b, transparent 70%)' }}
              />
              <div className="relative flex items-center gap-2 mb-1.5">
                <div className="w-6 h-6 rounded-md bg-amber-500/15 flex items-center justify-center">
                  <Flame className="w-3.5 h-3.5 text-amber-400" />
                </div>
                <span className="text-xs font-bold text-amber-400">
                  12 Day Streak
                </span>
              </div>
              <p className="text-[11px] mb-2" style={{ color: 'var(--text-muted)' }}>
                Keep going! You&apos;re on fire
              </p>
              {/* Mini progress to next milestone */}
              <div
                className="h-1 rounded-full overflow-hidden"
                style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)' }}
              >
                <div
                  className="h-full rounded-full bg-linear-to-r from-amber-400 to-orange-500"
                  style={{ width: '60%' }}
                />
              </div>
            </div>

            {/* User Card */}
            <div
              className="flex items-center gap-3 p-2.5 rounded-xl border transition-colors hover:border-white/10"
              style={{
                borderColor: 'var(--border-color)',
                backgroundColor: 'rgba(255,255,255,0.02)',
              }}
            >
              <div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white shrink-0 relative">
                K
                <div className="absolute inset-0 rounded-full bg-linear-to-br from-white/20 to-transparent" />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-xs font-semibold truncate"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Kami
                </p>
                <p className="text-[10px] truncate" style={{ color: 'var(--text-muted)' }}>
                  Learner
                </p>
              </div>
              <LogOut
                className="w-3.5 h-3.5 shrink-0 cursor-pointer transition-colors hover:text-white"
                style={{ color: 'var(--text-muted)' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* When collapsed, show just user avatar */}
      <AnimatePresence>
        {collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-auto mb-3"
          >
            <div className="w-9 h-9 rounded-full bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
              K
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== Collapse Toggle ===== */}
      <div
        className="h-12 flex items-center justify-center border-t relative"
        style={{ borderColor: 'var(--border-color)' }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors hover:bg-white/6"
          style={{
            color: 'var(--text-secondary)',
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