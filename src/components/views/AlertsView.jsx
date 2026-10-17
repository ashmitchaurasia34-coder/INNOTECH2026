import React, { useState } from 'react';
import RecentAlerts from '../RecentAlerts';

export default function AlertsView({ alerts, onAcknowledgeAlert, onAcknowledgeAll }) {
  const [searchTerm, setSearchTerm] = useState('');

  const criticalCount = alerts.filter((a) => a.severity === 'CRITICAL').length;
  const warningCount = alerts.filter((a) => a.severity === 'WARNING').length;
  const infoCount = alerts.filter((a) => a.severity === 'INFO').length;

  const filteredAlerts = alerts.filter((a) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      a.drainId.toLowerCase().includes(q) ||
      a.location.toLowerCase().includes(q) ||
      a.type.toLowerCase().includes(q) ||
      a.message.toLowerCase().includes(q)
    );
  });

  return (
    <div className="view-content-wrapper">
      <div className="view-banner">
        <div className="view-banner-content">
          <h2>Municipal Alert &amp; Incident Dispatch Center</h2>
          <p>
            Centralized notification terminal for municipal flood response teams, automated weir gate operators, and vacuum tanker logistics.
          </p>
        </div>
        <div className="view-sim-badge">
          SIMULATED DISPATCH DESK
        </div>
      </div>

      <div className="alerts-summary-row">
        <div className="alert-stat-tile tile-critical">
          <div className="tile-title">Critical Blockages</div>
          <div className="tile-number">{criticalCount}</div>
          <div className="tile-sub">Immediate intervention required</div>
        </div>

        <div className="alert-stat-tile tile-warning">
          <div className="tile-title">Flow Warnings</div>
          <div className="tile-number">{warningCount}</div>
          <div className="tile-sub">Trending toward threshold</div>
        </div>

        <div className="alert-stat-tile tile-info">
          <div className="tile-title">System Status Log</div>
          <div className="tile-number">{infoCount}</div>
          <div className="tile-sub">Calibrations &amp; heartbeats</div>
        </div>

        <div className="alert-stat-tile tile-action">
          <button className="btn-bulk-ack" onClick={onAcknowledgeAll}>
            Acknowledge All Alerts
          </button>
          <span className="bulk-sub">Simulates operator sign-off</span>
        </div>
      </div>

      <div className="table-toolbar" style={{ margin: '8px 0' }}>
        <div className="search-box" style={{ width: '100%', maxWidth: '380px' }}>
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search alerts by drain ID, keyword, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
              ✕
            </button>
          )}
        </div>
      </div>

      <RecentAlerts
        alerts={filteredAlerts}
        onAcknowledgeAlert={onAcknowledgeAlert}
      />
    </div>
  );
}
