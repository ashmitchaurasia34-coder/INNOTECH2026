import React from 'react';

export default function SummaryCards({
  drains,
  activeFilter,
  onSelectFilter
}) {
  const total = drains.length;
  const normal = drains.filter((d) => d.status === 'Normal').length;
  const warning = drains.filter((d) => d.status === 'Warning').length;
  const highRisk = drains.filter((d) => d.status === 'High-Risk').length;

  const normalPct = total > 0 ? Math.round((normal / total) * 100) : 0;
  const warningPct = total > 0 ? Math.round((warning / total) * 100) : 0;
  const highRiskPct = total > 0 ? Math.round((highRisk / total) * 100) : 0;

  const cards = [
    {
      id: 'All',
      label: 'Total Drains',
      count: total,
      subtext: 'Monitored Smart Sensors',
      badge: '100% Coverage',
      colorClass: 'card-total',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path>
          <path d="M2 12h20"></path>
        </svg>
      ),
      glowColor: 'rgba(0, 240, 255, 0.25)',
      detail: 'Simulated 14 Nodes in 4 Zones'
    },
    {
      id: 'Normal',
      label: 'Normal Drains',
      count: normal,
      subtext: `${normalPct}% Operating Smoothly`,
      badge: 'Optimal Flow',
      colorClass: 'card-normal',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
          <polyline points="22 4 12 14.01 9 11.01"></polyline>
        </svg>
      ),
      glowColor: 'rgba(16, 185, 129, 0.25)',
      detail: 'Water Level < 50% • Silt < 30%'
    },
    {
      id: 'Warning',
      label: 'Warning Drains',
      count: warning,
      subtext: `${warningPct}% Flow Discrepancy`,
      badge: 'Attention Needed',
      colorClass: 'card-warning',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      ),
      glowColor: 'rgba(245, 158, 11, 0.25)',
      detail: 'Level 50-75% • Silt Accruing'
    },
    {
      id: 'High-Risk',
      label: 'High-Risk Drains',
      count: highRisk,
      subtext: `${highRiskPct}% Overflow Threat`,
      badge: 'Critical Action',
      colorClass: 'card-high-risk',
      icon: (
        <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"></polygon>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
      ),
      glowColor: 'rgba(239, 68, 68, 0.3)',
      detail: 'Blockage Risk > 80% • Overspill'
    }
  ];

  return (
    <section className="summary-cards-grid" aria-label="Drainage Status Summary Cards">
      {cards.map((card) => {
        const isSelected = activeFilter === card.id;
        return (
          <div
            key={card.id}
            className={`summary-card ${card.colorClass} ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelectFilter(card.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                onSelectFilter(card.id);
              }
            }}
            title={`Filter table by ${card.label}`}
          >
            <div className="card-top">
              <span className="card-label">{card.label}</span>
              <span className="card-icon-bubble">{card.icon}</span>
            </div>

            <div className="card-middle">
              <div className="card-count-row">
                <span className="card-count">{card.count}</span>
                <span className="card-sub-badge">{card.badge}</span>
              </div>
              <div className="card-subtext">{card.subtext}</div>
            </div>

            <div className="card-bottom">
              <span className="card-detail-text">{card.detail}</span>
              <span className="card-filter-hint">
                {isSelected ? '✓ Filter Active' : 'Click to filter'}
              </span>
            </div>

            {/* Glowing bottom accent line */}
            <div className="card-accent-bar"></div>
          </div>
        );
      })}
    </section>
  );
}
