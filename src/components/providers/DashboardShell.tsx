'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/sidebar/Sidebar';

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const checkSidebar = () => {
      const sidebar = document.querySelector('aside');
      if (sidebar) {
        setSidebarCollapsed(sidebar.offsetWidth < 100);
      }
    };

    const observer = new ResizeObserver(checkSidebar);
    const sidebar = document.querySelector('aside');
    if (sidebar) {
      observer.observe(sidebar);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <Sidebar />

      {/* Main content area — pushes right based on sidebar width */}
      <main
        className="transition-all duration-300 ease-in-out min-h-screen"
        style={{
          marginLeft: sidebarCollapsed ? 72 : 260,
        }}
      >
        <div className="p-6 lg:p-8 max-w-350 mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}