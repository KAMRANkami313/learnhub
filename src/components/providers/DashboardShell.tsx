'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import MobileNav from '@/components/sidebar/MobileNav';

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);

      if (!mobile) {
        const sidebar = document.querySelector('aside');
        if (sidebar) {
          setSidebarWidth(sidebar.offsetWidth);
        }
      }
    };

    checkScreen();

    // Observe sidebar resize
    const observer = new ResizeObserver(() => {
      checkScreen();
    });

    const sidebar = document.querySelector('aside');
    if (sidebar) {
      observer.observe(sidebar);
    }

    // Also listen to window resize for mobile detection
    window.addEventListener('resize', checkScreen);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkScreen);
    };
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main content area */}
      <main
        className="transition-all duration-300 ease-in-out min-h-screen"
        style={{
          marginLeft: isMobile ? 0 : sidebarWidth,
          paddingBottom: isMobile ? 80 : 0, // space for mobile nav
        }}
      >
        <div className="p-4 sm:p-6 lg:p-8 max-w-350 mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <MobileNav />
    </div>
  );
}