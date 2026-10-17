import React, { useState, useEffect } from 'react';

export default function Header({
  activeTab,
  onOpenMobileSidebar,
  isSimulating,
  onToggleSimulation,
  onSimulateRainSurge,
  onResetFlow,
  isRainActive
}) {
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toLocaleTimeString('en-US', {
          hour12: false,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'overview':
        return 'City-Wide Drainage Overview';
      case 'monitoring':
        return 'Real-Time Hydraulic Telemetry';
      case 'diagnosis':
        return 'AI Blockage & Silt Diagnostics';
      case 'predictions':
        return 'Predictive Risk & Flood Forecasting';
      case 'alerts':
        return 'Municipal Alert Management';
      case 'about':
        return 'About Drain Guard AI';
      default:
        return 'Drainage Monitoring Dashboard';
    }
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <button
          className="mobile-menu-toggle"
          onClick={onOpenMobileSidebar}
          aria-label="Open navigation menu"
        >
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>

        <div className="title-breadcrumb-group">
          <div className="breadcrumb">
            <span className="crumb-root">INNOTECH &apos;26</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">{getSectionTitle()}</span>
          </div>
          <h1 className="header-title">{getSectionTitle()}</h1>
        </div>
      </div>

      <div className="header-right">
        {/* Prominent Simulated Environment Indicator */}
        <div className="simulated-pill-badge" title="All telemetry data and sensor values are simulated for demo and evaluation purposes">
          <span className="pulse-beacon"></span>
          <span className="sim-badge-label">SIMULATED READINGS</span>
          <span className="sim-badge-clock">{timeStr} UTC+5:30</span>
        </div>

        {/* Simulation Interactive Controls */}
        <div className="header-actions">
          <button
            className={`action-btn btn-rain ${isRainActive ? 'active-rain' : ''}`}
            onClick={onSimulateRainSurge}
            title="Simulate sudden heavy rainfall surge (+25-40% water level across catchments)"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25"></path>
              <line x1="8" y1="19" x2="8" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="23"></line>
              <line x1="16" y1="19" x2="16" y2="21"></line>
            </svg>
            <span>{isRainActive ? 'Rain Surge Active' : 'Simulate Rain Surge'}</span>
          </button>

          <button
            className="action-btn btn-reset"
            onClick={onResetFlow}
            title="Reset telemetry to nominal dry-weather baseline"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
              <path d="M21 3v5h-5"></path>
              <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
              <path d="M8 16H3v5"></path>
            </svg>
            <span>Reset Flow</span>
          </button>

          <button
            className={`action-btn btn-toggle ${isSimulating ? 'sim-on' : 'sim-paused'}`}
            onClick={onToggleSimulation}
            title={isSimulating ? 'Pause live simulated sensor ticks' : 'Resume live simulated sensor ticks'}
          >
            <span className={`sim-state-dot ${isSimulating ? 'active' : ''}`}></span>
            <span>{isSimulating ? 'Live Stream ON' : 'Paused'}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
