import React from 'react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  mobileOpen,
  setMobileOpen,
  alertCount,
  highRiskCount
}) {
  const navItems = [
    {
      id: 'overview',
      label: 'Overview',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1.5"></rect>
          <rect x="14" y="3" width="7" height="7" rx="1.5"></rect>
          <rect x="14" y="14" width="7" height="7" rx="1.5"></rect>
          <rect x="3" y="14" width="7" height="7" rx="1.5"></rect>
        </svg>
      )
    },
    {
      id: 'monitoring',
      label: 'Live Monitoring',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
        </svg>
      ),
      badge: 'LIVE'
    },
    {
      id: 'diagnosis',
      label: 'AI Diagnosis',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4 4 4 0 0 1-4-4V6a4 4 0 0 1 4-4z"></path>
          <path d="M12 14c-4.418 0-8 2.239-8 5v1a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-1c0-2.761-3.582-5-8-5z"></path>
          <circle cx="12" cy="7" r="1"></circle>
          <path d="M19 8l2 2-2 2"></path>
          <path d="M5 8L3 10l2 2"></path>
        </svg>
      ),
      badge: 'AI v2.6'
    },
    {
      id: 'predictions',
      label: 'Predictions & Risk',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 12h5l3 7 4-14 3 7h5"></path>
          <circle cx="18" cy="6" r="3"></circle>
        </svg>
      ),
      badge: highRiskCount > 0 ? `${highRiskCount} Risk` : null,
      badgeColor: 'badge-danger'
    },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      badge: alertCount > 0 ? alertCount : null,
      badgeColor: 'badge-warning'
    },
    {
      id: 'about',
      label: 'About',
      icon: (
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      )
    }
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="sidebar-backdrop"
          onClick={() => setMobileOpen(false)}
        />
      )}
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="brand-logo-wrap">
            <div className="brand-icon">
              <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" fill="url(#cyanBlueGrad)" stroke="none"></path>
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" stroke="#00f0ff" strokeWidth="1.5"></path>
                <path d="M9 13l2 2 4-4" stroke="#070d18" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                <defs>
                  <linearGradient id="cyanBlueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00f0ff" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="brand-text">
              <div className="brand-title">
                DRAIN GUARD <span className="brand-ai">AI</span>
              </div>
              <div className="brand-sub">INNOTECH &apos;26 INNOVATION</div>
            </div>
          </div>
          <button
            className="sidebar-close-btn"
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <div className="simulation-mode-pill">
          <span className="sim-pulse-dot"></span>
          <span className="sim-text">SIMULATED TELEMETRY</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">MONITORING CONSOLE</div>
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
                {item.badge && (
                  <span className={`nav-badge ${item.badgeColor || 'badge-cyan'}`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="system-status-box">
            <div className="status-header">
              <span className="status-label">Simulated IoT Nodes</span>
              <span className="status-val text-cyan">24 / 24</span>
            </div>
            <div className="status-progress-track">
              <div className="status-progress-bar" style={{ width: '100%' }}></div>
            </div>
            <div className="status-meta">
              <span>Telemetry: 10s Cycle</span>
              <span className="text-emerald">● Online</span>
            </div>
          </div>
          <div className="tech-badge">
            Powered by Smart City AI Engine
          </div>
        </div>
      </aside>
    </>
  );
}
