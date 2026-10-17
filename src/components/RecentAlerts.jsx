import React, { useState } from 'react';

export default function RecentAlerts({ alerts, onAcknowledgeAlert }) {
  const [filterSeverity, setFilterSeverity] = useState('ALL');

  const filteredAlerts = alerts.filter((alert) => {
    if (filterSeverity === 'ALL') return true;
    return alert.severity === filterSeverity;
  });

  const getSeverityBadgeClass = (severity) => {
    switch (severity) {
      case 'CRITICAL':
        return 'severity-critical';
      case 'WARNING':
        return 'severity-warning';
      case 'INFO':
        return 'severity-info';
      default:
        return 'severity-info';
    }
  };

  return (
    <div className="recent-alerts-card">
      <div className="alerts-header">
        <div className="alerts-title-group">
          <div className="alerts-title-row">
            <h3 className="alerts-title">Recent Municipal & Sensor Alerts</h3>
            <span className="alerts-count-badge">{alerts.length} Total</span>
            <span className="sim-tag-inline">SIMULATED FEED</span>
          </div>
          <p className="alerts-subtitle">
            Automated alerts triggered by hydraulic telemetry thresholds & AI anomaly detection.
          </p>
        </div>

        <div className="alerts-filter-tabs">
          {['ALL', 'CRITICAL', 'WARNING', 'INFO'].map((sev) => (
            <button
              key={sev}
              className={`alert-tab-btn ${filterSeverity === sev ? 'active' : ''}`}
              onClick={() => setFilterSeverity(sev)}
            >
              {sev}
            </button>
          ))}
        </div>
      </div>

      <div className="alerts-list">
        {filteredAlerts.length === 0 ? (
          <div className="empty-alerts">
            <span>No alerts matching &quot;{filterSeverity}&quot; filter.</span>
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`alert-list-item ${getSeverityBadgeClass(alert.severity)} ${alert.acknowledged ? 'acknowledged' : ''}`}
            >
              <div className="alert-item-left">
                <div className="alert-meta-top">
                  <span className={`alert-badge ${getSeverityBadgeClass(alert.severity)}`}>
                    {alert.severity}
                  </span>
                  <span className="alert-drain-id">{alert.drainId}</span>
                  <span className="alert-location">{alert.location}</span>
                  <span className="alert-time">{alert.timestamp}</span>
                </div>

                <div className="alert-message">
                  <strong>{alert.type}:</strong> {alert.message}
                </div>

                <div className="alert-action-line">
                  <span className="action-tag">Recommended Action:</span>
                  <span className="action-desc">{alert.action}</span>
                </div>
              </div>

              <div className="alert-item-right">
                {alert.acknowledged ? (
                  <span className="ack-status-tag">✓ Acknowledged</span>
                ) : (
                  <button
                    className="btn-ack"
                    onClick={() => onAcknowledgeAlert(alert.id)}
                    title="Acknowledge alert and log to dispatch registry"
                  >
                    Acknowledge
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="alerts-footer-note">
        <span>Emergency protocol: Priority 1 alerts automatically notify rapid-response catchment units.</span>
        <span className="sim-watermark">Simulated INNOTECH&apos;26 Notification Engine</span>
      </div>
    </div>
  );
}
