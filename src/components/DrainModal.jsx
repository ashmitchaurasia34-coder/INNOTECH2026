import React from 'react';

export default function DrainModal({ drain, onClose, onDispatchCrew }) {
  if (!drain) return null;

  const diff = drain.inletFlow - drain.outletFlow;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrap">
            <span className={`modal-status-badge status-${drain.status.toLowerCase()}`}>
              {drain.status}
            </span>
            <h3 className="modal-title">{drain.name}</h3>
            <span className="modal-id">{drain.id} • {drain.zone}</span>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close dialog">
            ✕
          </button>
        </div>

        <div className="modal-sim-banner">
          <span>SIMULATED TELEMETRY &amp; AI DIAGNOSTIC REPORT</span>
        </div>

        <div className="modal-body">
          {/* Key telemetry stats grid */}
          <div className="modal-stats-grid">
            <div className="modal-stat-box">
              <span className="stat-label">Water Level</span>
              <span className={`stat-value ${drain.waterLevel >= 75 ? 'text-danger' : drain.waterLevel >= 50 ? 'text-warning' : 'text-cyan'}`}>
                {drain.waterLevel}%
              </span>
              <span className="stat-sub">{drain.waterLevelCm} cm / {drain.maxCapacityCm} cm capacity</span>
              <div className="stat-progress-bar">
                <div
                  className="stat-progress-fill"
                  style={{
                    width: `${drain.waterLevel}%`,
                    backgroundColor: drain.waterLevel >= 75 ? '#ef4444' : drain.waterLevel >= 50 ? '#f59e0b' : '#00f0ff'
                  }}
                ></div>
              </div>
            </div>

            <div className="modal-stat-box">
              <span className="stat-label">Inlet Flow Rate</span>
              <span className="stat-value text-cyan">{drain.inletFlow} <small>L/s</small></span>
              <span className="stat-sub">Electromagnetic Flowmeter A</span>
            </div>

            <div className="modal-stat-box">
              <span className="stat-label">Outlet Flow Rate</span>
              <span className="stat-value text-blue">{drain.outletFlow} <small>L/s</small></span>
              <span className="stat-sub">Electromagnetic Flowmeter B</span>
            </div>

            <div className="modal-stat-box">
              <span className="stat-label">Flow Differential</span>
              <span className={`stat-value ${diff > 50 ? 'text-danger' : 'text-amber'}`}>
                {diff > 0 ? `+${diff}` : diff} <small>L/s</small>
              </span>
              <span className="stat-sub">{diff > 50 ? 'Massive retention / obstruction' : 'Normal equilibrium'}</span>
            </div>
          </div>

          {/* AI Diagnostic Breakdown */}
          <div className="modal-ai-box">
            <div className="ai-box-title">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="#00f0ff" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M12 16v-4"></path>
                <path d="M12 8h.01"></path>
              </svg>
              <span>AI Anomaly &amp; Silt Diagnosis</span>
            </div>

            <div className="ai-diagnostic-rows">
              <div className="ai-diag-item">
                <span className="ai-diag-label">Blockage Probability:</span>
                <div className="ai-diag-meter">
                  <div className="meter-track">
                    <div
                      className="meter-bar"
                      style={{
                        width: `${drain.blockageRisk}%`,
                        backgroundColor: drain.blockageRisk > 75 ? '#ef4444' : '#f59e0b'
                      }}
                    ></div>
                  </div>
                  <span className="meter-num">{drain.blockageRisk}%</span>
                </div>
              </div>

              <div className="ai-diag-item">
                <span className="ai-diag-label">Estimated Silt Accumulation:</span>
                <div className="ai-diag-meter">
                  <div className="meter-track">
                    <div
                      className="meter-bar"
                      style={{ width: `${drain.siltLevel}%`, backgroundColor: '#38bdf8' }}
                    ></div>
                  </div>
                  <span className="meter-num">{drain.siltLevel}%</span>
                </div>
              </div>

              <div className="ai-diag-item">
                <span className="ai-diag-label">Sensor Transducer Health:</span>
                <span className="text-emerald">{drain.sensorHealth} (Calibrated)</span>
              </div>
            </div>

            <div className="ai-recommendation-alert">
              <strong>Recommended Municipal Response:</strong>
              <p>{drain.recommendedAction}</p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="modal-btn-secondary" onClick={onClose}>
            Close Inspector
          </button>
          <button
            className="modal-btn-primary"
            onClick={() => {
              if (onDispatchCrew) onDispatchCrew(drain.id);
              onClose();
            }}
          >
            Dispatch Cleaning / Jetting Crew
          </button>
        </div>
      </div>
    </div>
  );
}
