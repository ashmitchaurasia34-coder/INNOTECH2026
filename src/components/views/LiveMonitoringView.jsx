import React from 'react';
import DrainageTable from '../DrainageTable';

export default function LiveMonitoringView({
  drains,
  activeFilter,
  setActiveFilter,
  onInspectDrain
}) {
  const avgLevel = Math.round(
    drains.reduce((sum, d) => sum + d.waterLevel, 0) / (drains.length || 1)
  );
  const totalInlet = drains.reduce((sum, d) => sum + d.inletFlow, 0);
  const totalOutlet = drains.reduce((sum, d) => sum + d.outletFlow, 0);
  const totalDiscrepancy = totalInlet - totalOutlet;

  return (
    <div className="view-content-wrapper">
      <div className="view-banner">
        <div className="view-banner-content">
          <h2>Continuous Hydraulic Telemetry &amp; Sensor Telemetry</h2>
          <p>
            Real-time ultrasonic water-depth transducers and dual electromagnetic velocity flowmeters streaming over simulated MQTT/CoAP edge protocols.
          </p>
        </div>
        <div className="view-sim-badge">
          SIMULATED IOT STREAM • 10s FREQUENCY
        </div>
      </div>

      <div className="telemetry-gauges-grid">
        <div className="gauge-card">
          <div className="gauge-title">Mean Network Water Level</div>
          <div className="gauge-value-row">
            <span className="gauge-main-val text-cyan">{avgLevel}%</span>
            <span className="gauge-sub-badge">City Baseline</span>
          </div>
          <div className="gauge-track">
            <div className="gauge-fill" style={{ width: `${avgLevel}%`, backgroundColor: '#00f0ff' }}></div>
          </div>
          <div className="gauge-subtext">Safe threshold &lt; 50%</div>
        </div>

        <div className="gauge-card">
          <div className="gauge-title">Aggregated Inlet Inflow</div>
          <div className="gauge-value-row">
            <span className="gauge-main-val text-blue">{totalInlet.toLocaleString()} <small>L/s</small></span>
            <span className="gauge-sub-badge">Gross Intake</span>
          </div>
          <div className="gauge-track">
            <div className="gauge-fill" style={{ width: '72%', backgroundColor: '#3b82f6' }}></div>
          </div>
          <div className="gauge-subtext">Surface runoff &amp; stormwater collector</div>
        </div>

        <div className="gauge-card">
          <div className="gauge-title">Aggregated Outflow Discharge</div>
          <div className="gauge-value-row">
            <span className="gauge-main-val text-emerald">{totalOutlet.toLocaleString()} <small>L/s</small></span>
            <span className="gauge-sub-badge">Main Outfall</span>
          </div>
          <div className="gauge-track">
            <div className="gauge-fill" style={{ width: '58%', backgroundColor: '#10b981' }}></div>
          </div>
          <div className="gauge-subtext">Safe discharge capacity: 2,500 L/s</div>
        </div>

        <div className="gauge-card">
          <div className="gauge-title">Flow Differential (Blockage Indicator)</div>
          <div className="gauge-value-row">
            <span className={`gauge-main-val ${totalDiscrepancy > 200 ? 'text-danger' : 'text-amber'}`}>
              +{totalDiscrepancy.toLocaleString()} <small>L/s</small>
            </span>
            <span className="gauge-sub-badge">Accumulation</span>
          </div>
          <div className="gauge-track">
            <div className="gauge-fill" style={{ width: `${Math.min((totalDiscrepancy / 500) * 100, 100)}%`, backgroundColor: '#ef4444' }}></div>
          </div>
          <div className="gauge-subtext">Water accumulating in subterranean sumps</div>
        </div>
      </div>

      <DrainageTable
        drains={drains}
        activeFilter={activeFilter}
        onSelectFilter={setActiveFilter}
        onInspectDrain={onInspectDrain}
      />
    </div>
  );
}
