'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';
import MobileNav from '@/components/sidebar/MobileNav';
import ToastProvider from '@/components/ui/Toast';

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

    const observer = new ResizeObserver(() => {
      checkScreen();
    });

    const sidebar = document.querySelector('aside');
    if (sidebar) {
      observer.observe(sidebar);
    }

    window.addEventListener('resize', checkScreen);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkScreen);
    };
  }, []);

  return (
    <ToastProvider>
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
            paddingBottom: isMobile ? 80 : 0,
          }}
        >
          <div className="p-4 sm:p-6 lg:p-8 max-w-350 mx-auto">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Nav */}
        <MobileNav />
      </div>
    </ToastProvider>
  );
}