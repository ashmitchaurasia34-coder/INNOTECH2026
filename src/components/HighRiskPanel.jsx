import React, { useState } from 'react';

export default function HighRiskPanel({ drains, onSelectDrain }) {
  const [dispatchedDrains, setDispatchedDrains] = useState({});
  const highRiskDrains = drains.filter((d) => d.status === 'High-Risk');

  const handleDispatch = (id) => {
    setDispatchedDrains((prev) => ({
      ...prev,
      [id]: true
    }));
  };

  return (
    <div className="high-risk-panel-card">
      <div className="panel-header">
        <div className="panel-title-group">
          <div className="panel-badge-row">
            <span className="critical-pulse-indicator"></span>
            <h3 className="panel-title">High-Risk Drains Intervention Panel</h3>
            <span className="panel-count-badge">{highRiskDrains.length} CRITICAL</span>
          </div>
          <p className="panel-subtitle">
            Drains exceeding 75% capacity with severe hydraulic flow differentials.
          </p>
        </div>
        <div className="panel-sim-tag">
          SIMULATED AI RISK ASSESSMENT
        </div>
      </div>

      {highRiskDrains.length === 0 ? (
        <div className="no-risk-state">
          <svg viewBox="0 0 24 24" width="36" height="36" fill="none" stroke="#10b981" strokeWidth="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          <div className="no-risk-title">All Monitored Drains In Safe Capacity</div>
          <div className="no-risk-sub">No drains currently exceed critical flood risk thresholds.</div>
        </div>
      ) : (
        <div className="risk-cards-grid">
          {highRiskDrains.map((drain) => {
            const isDispatched = dispatchedDrains[drain.id];
            return (
              <div key={drain.id} className="risk-item-card">
                <div className="risk-item-top">
                  <div className="risk-id-location">
                    <span className="drain-tag-critical">{drain.id}</span>
                    <h4 className="risk-drain-name">{drain.name}</h4>
                    <span className="risk-zone">{drain.zone}</span>
                  </div>
                  <div className="risk-score-pill">
                    <span className="risk-score-num">{drain.blockageRisk}%</span>
                    <span className="risk-score-label">Blockage Risk</span>
                  </div>
                </div>

                <div className="risk-metrics-row">
                  <div className="risk-metric-box">
                    <span className="metric-lbl">Water Level</span>
                    <span className="metric-val text-danger">
                      {drain.waterLevel}% <small>({drain.waterLevelCm} cm)</small>
                    </span>
                    <div className="metric-mini-bar">
                      <div
                        className="metric-fill-danger"
                        style={{ width: `${drain.waterLevel}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="risk-metric-box">
                    <span className="metric-lbl">Inlet Flow</span>
                    <span className="metric-val text-cyan">{drain.inletFlow} L/s</span>
                  </div>

                  <div className="risk-metric-box">
                    <span className="metric-lbl">Outlet Flow</span>
                    <span className="metric-val text-warning">{drain.outletFlow} L/s</span>
                  </div>

                  <div className="risk-metric-box">
                    <span className="metric-lbl">Silt Level</span>
                    <span className="metric-val text-amber">{drain.siltLevel}%</span>
                  </div>
                </div>

                <div className="risk-ai-diagnosis">
                  <div className="ai-rec-header">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#38bdf8" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <span>AI PREVENTIVE RECOMMENDATION:</span>
                  </div>
                  <p className="ai-rec-text">{drain.recommendedAction}</p>
                </div>

                <div className="risk-card-actions">
                  <button
                    className={`btn-dispatch ${isDispatched ? 'dispatched' : ''}`}
                    onClick={() => handleDispatch(drain.id)}
                    disabled={isDispatched}
                  >
                    {isDispatched ? (
                      <>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                        <span>Crew Dispatched (Simulated)</span>
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                        </svg>
                        <span>Dispatch Jetting Unit</span>
                      </>
                    )}
                  </button>

                  <button
                    className="btn-inspect"
                    onClick={() => onSelectDrain(drain)}
                  >
                    Inspect Telemetry
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
