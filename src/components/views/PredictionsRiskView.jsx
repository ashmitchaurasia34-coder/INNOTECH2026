import React, { useState } from 'react';

export default function PredictionsRiskView({ drains, onInspectDrain }) {
  const [rainfallScenario, setRainfallScenario] = useState('moderate'); // 'light', 'moderate', 'heavy', 'cloudburst'

  const scenarioMultiplier = {
    light: 0.8,
    moderate: 1.0,
    heavy: 1.4,
    cloudburst: 1.9
  }[rainfallScenario];

  const totalDrainsCount = drains.length;

  const zones = [
    {
      name: 'Zone 1 (Downtown)',
      elevation: '4.2m MSL (Low Basin)',
      riskLevel: scenarioMultiplier >= 1.4 ? 'CRITICAL' : 'HIGH',
      estFloodTime: scenarioMultiplier >= 1.4 ? '45 minutes' : '2.5 hours',
      criticalNodes: ['DG-Z1-01', 'DG-Z1-04'],
      vulnerabilityFactors: 'High impervious surface ratio (89%), aging Victorian brick culverts.'
    },
    {
      name: 'Zone 2 (Riverside)',
      elevation: '2.1m MSL (Tidal Boundary)',
      riskLevel: scenarioMultiplier >= 1.4 ? 'HIGH' : 'MODERATE',
      estFloodTime: scenarioMultiplier >= 1.4 ? '1.5 hours' : '4 hours',
      criticalNodes: ['DG-Z2-03', 'DG-Z2-11'],
      vulnerabilityFactors: 'Subject to high-tide backflow during storm surges; outfall flumes throttled.'
    },
    {
      name: 'Zone 3 (Industrial Corridor)',
      elevation: '8.4m MSL (Moderate)',
      riskLevel: scenarioMultiplier >= 1.9 ? 'CRITICAL' : 'HIGH',
      estFloodTime: scenarioMultiplier >= 1.4 ? '1 hour' : '3 hours',
      criticalNodes: ['DG-Z3-09'],
      vulnerabilityFactors: 'Heavy commercial runoff, high particulate silt loading.'
    },
    {
      name: 'Zone 4 (East Hills Catchment)',
      elevation: '24.0m MSL (High Ground)',
      riskLevel: 'LOW',
      estFloodTime: 'Safe Buffer > 8 hrs',
      criticalNodes: ['DG-Z4-02'],
      vulnerabilityFactors: 'Steep gradient; rapid runoff velocity toward downstream Zone 1 sumps.'
    }
  ];

  return (
    <div className="view-content-wrapper">
      <div className="view-banner">
        <div className="view-banner-content">
          <h2>Predictive Risk &amp; Flood Horizon Forecasting</h2>
          <p>
            Hydrodynamic elevation modeling combined with meteorological radar simulation to forecast urban flash pooling up to 6 hours in advance across {totalDrainsCount} monitored nodes.
          </p>
        </div>
        <div className="view-sim-badge">
          SIMULATED PREDICTIVE MODEL
        </div>
      </div>

      {/* Scenario Controller */}
      <div className="scenario-controller-card">
        <div className="scenario-header">
          <div>
            <h3>Simulated Precipitation &amp; Inflow Scenario</h3>
            <p className="scenario-sub">Adjust rainfall intensity to test hydraulic resiliency across urban catchment zones.</p>
          </div>
          <span className="scenario-current-tag">
            Active: <strong>{rainfallScenario.toUpperCase()} RAIN (x{scenarioMultiplier})</strong>
          </span>
        </div>

        <div className="scenario-buttons">
          {[
            { id: 'light', label: 'Light Drizzle (5 mm/h)', factor: '0.8x' },
            { id: 'moderate', label: 'Moderate Rain (18 mm/h)', factor: '1.0x (Baseline)' },
            { id: 'heavy', label: 'Heavy Storm (45 mm/h)', factor: '1.4x (Surge)' },
            { id: 'cloudburst', label: 'Extreme Cloudburst (85 mm/h)', factor: '1.9x (Severe)' }
          ].map((sc) => (
            <button
              key={sc.id}
              className={`scenario-btn ${rainfallScenario === sc.id ? 'active' : ''}`}
              onClick={() => setRainfallScenario(sc.id)}
            >
              <span className="sc-name">{sc.label}</span>
              <span className="sc-factor">{sc.factor}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 6-Hour Forecast Matrix */}
      <div className="forecast-timeline-card">
        <div className="card-top-row">
          <h3>6-Hour Subterranean Sump Saturation Timeline</h3>
          <span className="sim-tag-inline">SIMULATED PROJECTION</span>
        </div>

        <div className="forecast-steps-row">
          {[
            { hour: '+1 Hour', surge: Math.round(52 * scenarioMultiplier), status: 'Contained' },
            { hour: '+2 Hours', surge: Math.round(64 * scenarioMultiplier), status: 'Warning Level' },
            { hour: '+3 Hours', surge: Math.round(76 * scenarioMultiplier), status: 'Peak Threat' },
            { hour: '+4 Hours', surge: Math.round(85 * scenarioMultiplier), status: 'Crest Level' },
            { hour: '+5 Hours', surge: Math.round(72 * scenarioMultiplier), status: 'Receding' },
            { hour: '+6 Hours', surge: Math.round(58 * scenarioMultiplier), status: 'Controlled Drain' }
          ].map((step, idx) => (
            <div key={idx} className="forecast-step">
              <div className="step-time">{step.hour}</div>
              <div className="step-ring-wrap">
                <div
                  className="step-val"
                  style={{ color: step.surge > 75 ? '#ef4444' : step.surge > 50 ? '#f59e0b' : '#38bdf8' }}
                >
                  {Math.min(step.surge, 100)}%
                </div>
                <div className="step-bar">
                  <div
                    className="step-bar-fill"
                    style={{
                      height: `${Math.min(step.surge, 100)}%`,
                      backgroundColor: step.surge > 75 ? '#ef4444' : step.surge > 50 ? '#f59e0b' : '#38bdf8'
                    }}
                  ></div>
                </div>
              </div>
              <div className="step-status">{step.status}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Zone Vulnerability Grid */}
      <div className="zone-grid-section">
        <h3 className="section-title">Urban Catchment Zone Vulnerability Matrix</h3>
        <div className="zones-grid">
          {zones.map((zone, idx) => (
            <div key={idx} className={`zone-card risk-${zone.riskLevel.toLowerCase()}`}>
              <div className="zone-card-top">
                <h4 className="zone-name">{zone.name}</h4>
                <span className={`zone-badge badge-${zone.riskLevel.toLowerCase()}`}>
                  {zone.riskLevel} RISK
                </span>
              </div>

              <div className="zone-props">
                <div className="prop-item">
                  <span className="p-lbl">Basin Elevation:</span>
                  <span className="p-val">{zone.elevation}</span>
                </div>
                <div className="prop-item">
                  <span className="p-lbl">Est. Sump Overflow:</span>
                  <span className="p-val text-cyan">{zone.estFloodTime}</span>
                </div>
                <div className="prop-item">
                  <span className="p-lbl">High-Risk Sensor Nodes:</span>
                  <div className="p-val" style={{ display: 'flex', gap: '6px' }}>
                    {zone.criticalNodes.map((nodeId) => {
                      const matched = drains.find((d) => d.id === nodeId);
                      return (
                        <button
                          key={nodeId}
                          className="drain-id-badge"
                          style={{ cursor: 'pointer', background: 'rgba(0, 240, 255, 0.15)' }}
                          onClick={() => matched && onInspectDrain(matched)}
                          title="Click to inspect this drain"
                        >
                          {nodeId} ↗
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <p className="zone-factors">{zone.vulnerabilityFactors}</p>

              <div className="zone-footer-action">
                <span className="zone-sim-tag">Simulated Catchment Model</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
