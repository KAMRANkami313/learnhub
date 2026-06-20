'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BookOpen,
  LayoutDashboard,
  Trophy,
  Settings,
} from 'lucide-react';

interface NavItem {
  icon: React.ElementType;
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: 'Home', href: '/' },
  { icon: BookOpen, label: 'Courses', href: '/courses' },
  { icon: Trophy, label: 'Awards', href: '/achievements' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden glass-strong"
      style={{ borderTop: '1px solid var(--border-color)' }}
    >
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <a
              key={item.label}
              href={item.href}
              className="relative flex flex-col items-center justify-center gap-1 flex-1 h-full"
            >
              {/* Active background pill */}
              {isActive && (
                <motion.div
                  layoutId="mobileActiveTab"
                  className="absolute top-1 left-1/2 -translate-x-1/2 w-12 h-8 rounded-full"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(99, 102, 241, 0.18), rgba(139, 92, 246, 0.12))',
                    boxShadow: '0 0 16px rgba(99, 102, 241, 0.15)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              {/* Active top indicator dot */}
              {isActive && (
                <motion.div
                  layoutId="mobileActiveDot"
                  className="absolute top-0 w-1 h-1 rounded-full bg-indigo-400"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}

              <item.icon
                className="w-5 h-5 relative z-10 transition-all duration-200"
                style={{
                  color: isActive ? '#818cf8' : 'var(--text-muted)',
                  transform: isActive ? 'translateY(-1px) scale(1.05)' : 'none',
                }}
                strokeWidth={isActive ? 2.4 : 2}
              />
              <span
                className="text-[10px] font-medium relative z-10 transition-colors duration-200"
                style={{
                  color: isActive ? '#818cf8' : 'var(--text-muted)',
                }}
              >
                {item.label}
              </span>
            </a>
          );
        })}
      </div>

      {/* Safe area spacer for iPhones */}
      <div className="h-[env(safe-area-inset-bottom)]" />
    </nav>
  );
}