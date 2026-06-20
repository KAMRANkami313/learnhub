import DashboardShell from '@/components/providers/DashboardShell';

export default function Home() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>
            Welcome back! Here&apos;s your learning overview.
          </p>
        </div>

        {/* Placeholder content — we'll build tiles next */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-2xl border p-6 h-48 flex items-center justify-center"
              style={{
                backgroundColor: 'var(--bg-card)',
                borderColor: 'var(--border-color)',
              }}
            >
              <p style={{ color: 'var(--text-muted)' }}>
                Tile {i} — Coming in Step 4
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}
