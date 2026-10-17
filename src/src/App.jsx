import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import SummaryCards from './components/SummaryCards';
import WaterLevelChart from './components/WaterLevelChart';
import HighRiskPanel from './components/HighRiskPanel';
import RecentAlerts from './components/RecentAlerts';
import DrainageTable from './components/DrainageTable';
import DrainModal from './components/DrainModal';

// Dedicated Tab Views
import LiveMonitoringView from './components/views/LiveMonitoringView';
import AiDiagnosisView from './components/views/AiDiagnosisView';
import PredictionsRiskView from './components/views/PredictionsRiskView';
import AlertsView from './components/views/AlertsView';
import AboutView from './components/views/AboutView';

// Initial Simulated Data
import {
  INITIAL_DRAINS,
  INITIAL_ALERTS,
  INITIAL_TREND_DATA
} from './data/simulatedData';

import './App.css';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Core telemetry state
  const [drains, setDrains] = useState(INITIAL_DRAINS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [trendData, setTrendData] = useState(INITIAL_TREND_DATA);
  const [activeFilter, setActiveFilter] = useState('All');
  const [inspectedDrain, setInspectedDrain] = useState(null);

  // Simulation controls
  const [isSimulating, setIsSimulating] = useState(true);
  const [isRainActive, setIsRainActive] = useState(false);

  // Periodic Telemetry Simulation (Every 3.5 seconds)
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setDrains((prevDrains) => {
        return prevDrains.map((drain) => {
          // Subtle natural telemetry jitter (-1 to +1 L/s, -1 to +1 cm)
          const jitterFlow = Math.floor(Math.random() * 3) - 1;
          const newInlet = Math.max(30, drain.inletFlow + jitterFlow);
          
          let newWaterLevel = drain.waterLevel;
          if (isRainActive) {
            // Rising pressure during rain
            const rainCreep = Math.random() > 0.4 ? 1 : 0;
            newWaterLevel = Math.min(98, drain.waterLevel + rainCreep);
          } else {
            // Slight natural variance around current level
            const levelJitter = Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0;
            newWaterLevel = Math.max(15, Math.min(95, drain.waterLevel + levelJitter));
          }

          const newCm = Math.round((newWaterLevel / 100) * drain.maxCapacityCm);
          
          // Recalculate status based on level
          let newStatus = 'Normal';
          if (newWaterLevel >= 75) {
            newStatus = 'High-Risk';
          } else if (newWaterLevel >= 50) {
            newStatus = 'Warning';
          }

          return {
            ...drain,
            inletFlow: newInlet,
            waterLevel: newWaterLevel,
            waterLevelCm: newCm,
            status: newStatus
          };
        });
      });
    }, 3500);

    return () => clearInterval(interval);
  }, [isSimulating, isRainActive]);

  // Rain Surge Simulation Handler
  const handleSimulateRainSurge = () => {
    if (isRainActive) {
      // Toggle off rain
      setIsRainActive(false);
      return;
    }

    setIsRainActive(true);

    // Boost drain water levels and flow rates
    setDrains((prev) => {
      return prev.map((d) => {
        const surge = Math.floor(Math.random() * 15) + 15; // +15% to +30%
        const updatedLevel = Math.min(96, d.waterLevel + surge);
        const updatedCm = Math.round((updatedLevel / 100) * d.maxCapacityCm);
        const updatedInlet = Math.round(d.inletFlow * 1.45);
        let updatedStatus = 'Normal';
        if (updatedLevel >= 75) updatedStatus = 'High-Risk';
        else if (updatedLevel >= 50) updatedStatus = 'Warning';

        return {
          ...d,
          waterLevel: updatedLevel,
          waterLevelCm: updatedCm,
          inletFlow: updatedInlet,
          status: updatedStatus,
          blockageRisk: Math.min(98, d.blockageRisk + 12)
        };
      });
    });

    // Add new surge point to trend chart
    const now = new Date();
    const timeLabel = now.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
    setTrendData((prev) => [
      ...prev.slice(-5),
      {
        time: timeLabel,
        overallAvg: 74,
        criticalPeak: 95,
        warningAvg: 79
      }
    ]);

    // Add fresh emergency alert
    const newAlert = {
      id: `ALT-${Math.floor(1000 + Math.random() * 9000)}`,
      drainId: 'DG-Z1-01',
      location: 'Sector 4 Underpass Sump',
      severity: 'CRITICAL',
      timestamp: 'Just now',
      type: 'Rain Surge Flash Alert',
      message: 'Sudden precipitation influx recorded (+45 L/s). Sump water level rapidly surging toward spill crest.',
      action: 'Automated flood gate diversion initiated'
    };

    setAlerts((prev) => [newAlert, ...prev]);
  };

  // Reset to nominal baseline
  const handleResetFlow = () => {
    setIsRainActive(false);
    setDrains(INITIAL_DRAINS);
    setTrendData(INITIAL_TREND_DATA);
  };

  // Toggle live simulation pause/play
  const handleToggleSimulation = () => {
    setIsSimulating((prev) => !prev);
  };

  // Acknowledge single alert
  const handleAcknowledgeAlert = (alertId) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
  };

  // Acknowledge all alerts
  const handleAcknowledgeAll = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, acknowledged: true })));
  };

  // Dispatch crew action
  const handleDispatchCrew = (drainId) => {
    const updatedAlert = {
      id: `ALT-DISP-${Math.floor(100 + Math.random() * 900)}`,
      drainId: drainId,
      location: drains.find((d) => d.id === drainId)?.name || 'Drain Sump',
      severity: 'INFO',
      timestamp: 'Just now',
      type: 'Crew Dispatch Confirmed',
      message: `Emergency vacuum jetter unit en route to ${drainId}. Estimated arrival: 12 minutes.`,
      action: 'Field technicians deployed'
    };
    setAlerts((prev) => [updatedAlert, ...prev]);
  };

  const highRiskCount = drains.filter((d) => d.status === 'High-Risk').length;
  const unacknowledgedAlerts = alerts.filter((a) => !a.acknowledged).length;

  return (
    <div className="app-container">
      {/* 1. Sidebar with Overview, Live Monitoring, AI Diagnosis, Predictions & Risk, Alerts, About */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        alertCount={unacknowledgedAlerts}
        highRiskCount={highRiskCount}
      />

      <div className="main-wrapper">
        {/* Navigation & Controls Header */}
        <Header
          activeTab={activeTab}
          onOpenMobileSidebar={() => setMobileOpen(true)}
          isSimulating={isSimulating}
          onToggleSimulation={handleToggleSimulation}
          onSimulateRainSurge={handleSimulateRainSurge}
          onResetFlow={handleResetFlow}
          isRainActive={isRainActive}
        />

        <main className="dashboard-content">
          {/* OVERVIEW TAB - Complete Municipal Dashboard */}
          {activeTab === 'overview' && (
            <>
              {/* 2. Four Summary Cards for Total Drains, Normal Drains, Warning Drains, and High-Risk Drains */}
              <SummaryCards
                drains={drains}
                activeFilter={activeFilter}
                onSelectFilter={setActiveFilter}
              />

              {/* 4. Water-Level Trend Chart & 5. High-Risk Drains Panel */}
              <div className="dashboard-mid-grid">
                <WaterLevelChart
                  trendData={trendData}
                  selectedDrainName={inspectedDrain ? inspectedDrain.name : null}
                />
                <HighRiskPanel
                  drains={drains}
                  onSelectDrain={(d) => setInspectedDrain(d)}
                />
              </div>

              {/* 6. Recent Alerts Section */}
              <RecentAlerts
                alerts={alerts}
                onAcknowledgeAlert={handleAcknowledgeAlert}
              />

              {/* 3. Drainage Table showing Drain ID, Water Level, Inlet Flow, Outlet Flow, and Status */}
              <DrainageTable
                drains={drains}
                activeFilter={activeFilter}
                onSelectFilter={setActiveFilter}
                onInspectDrain={(d) => setInspectedDrain(d)}
              />
            </>
          )}

          {/* LIVE MONITORING VIEW */}
          {activeTab === 'monitoring' && (
            <LiveMonitoringView
              drains={drains}
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              onInspectDrain={(d) => setInspectedDrain(d)}
            />
          )}

          {/* AI DIAGNOSIS VIEW */}
          {activeTab === 'diagnosis' && (
            <AiDiagnosisView
              drains={drains}
              onInspectDrain={(d) => setInspectedDrain(d)}
            />
          )}

          {/* PREDICTIONS & RISK VIEW */}
          {activeTab === 'predictions' && (
            <PredictionsRiskView
              drains={drains}
              onInspectDrain={(d) => setInspectedDrain(d)}
            />
          )}

          {/* ALERTS VIEW */}
          {activeTab === 'alerts' && (
            <AlertsView
              alerts={alerts}
              onAcknowledgeAlert={handleAcknowledgeAlert}
              onAcknowledgeAll={handleAcknowledgeAll}
            />
          )}

          {/* ABOUT VIEW */}
          {activeTab === 'about' && <AboutView />}
        </main>
      </div>

      {/* Deep Telemetry Inspector Modal */}
      {inspectedDrain && (
        <DrainModal
          drain={inspectedDrain}
          onClose={() => setInspectedDrain(null)}
          onDispatchCrew={handleDispatchCrew}
        />
      )}
    </div>
  );
}
