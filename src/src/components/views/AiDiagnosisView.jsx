import React, { useState } from 'react';
import { AI_DIAGNOSTICS_DATA } from '../../data/simulatedData';

export default function AiDiagnosisView({ drains, onInspectDrain }) {
  const [selectedDrainId, setSelectedDrainId] = useState(drains[0]?.id || 'DG-Z1-01');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  const selectedDrain = drains.find((d) => d.id === selectedDrainId) || drains[0];

  const handleRunAiAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setAnalysisResult({
        timestamp: new Date().toLocaleTimeString(),
        confidence: selectedDrain.blockageRisk > 60 ? '96.8%' : '98.4%',
        primaryCause:
          selectedDrain.blockageRisk > 75
            ? 'Severe Solid Plastic & Silt Compaction Damming'
            : selectedDrain.blockageRisk > 50
            ? 'Moderate Organic Silt Accumulation'
            : 'Nominal Clear Bore Flow',
        hydraulicEfficiency: `${100 - Math.round(selectedDrain.waterLevel * 0.4)}%`,
        recommendedCrew:
          selectedDrain.blockageRisk > 75
            ? 'Rapid Deployment: High-Pressure Jetting Vehicle #02'
            : 'Scheduled Maintenance: Routine Suction Tanker'
      });
    }, 800);
  };

  return (
    <div className="view-content-wrapper">
      <div className="view-banner">
        <div className="view-banner-content">
          <h2>DrainGuard AI Diagnostic Engine (v2.6)</h2>
          <p>
            Convolutional Neural Network combined with hydrodynamic hydraulic differential modeling detects subsurface pipe blockages before surface flooding occurs.
          </p>
        </div>
        <div className="view-sim-badge">
          SIMULATED AI INFERENCE CLUSTER
        </div>
      </div>

      {/* Model Spec Overview */}
      <div className="ai-specs-grid">
        <div className="spec-card">
          <div className="spec-label">Neural Architecture</div>
          <div className="spec-val text-cyan">{AI_DIAGNOSTICS_DATA.modelName}</div>
          <div className="spec-sub">Edge-optimized lightweight CNN</div>
        </div>

        <div className="spec-card">
          <div className="spec-label">Diagnostic Accuracy</div>
          <div className="spec-val text-emerald">{AI_DIAGNOSTICS_DATA.accuracyRate}</div>
          <div className="spec-sub">Evaluated on 1.2M municipal frames</div>
        </div>

        <div className="spec-card">
          <div className="spec-label">Mean Inference Time</div>
          <div className="spec-val text-blue">1.4s</div>
          <div className="spec-sub">Real-time edge computation</div>
        </div>

        <div className="spec-card">
          <div className="spec-label">Hydraulic Efficiency</div>
          <div className="spec-val text-amber">{AI_DIAGNOSTICS_DATA.systemHealthSummary.hydraulicEfficiency}</div>
          <div className="spec-sub">Citywide network throughput</div>
        </div>
      </div>

      {/* Interactive AI Drain Scanner */}
      <div className="ai-interactive-scanner-card">
        <div className="scanner-header">
          <div className="scanner-title-group">
            <h3>Interactive Deep Diagnostic Scanner</h3>
            <span className="sim-tag-inline">SIMULATED INFERENCE</span>
          </div>
          <p>Select any municipal drainage node to run real-time hydrodynamic and acoustic classification.</p>
        </div>

        <div className="scanner-controls-row">
          <div className="scanner-select-wrap">
            <label htmlFor="drain-selector">Select Drainage Node:</label>
            <select
              id="drain-selector"
              value={selectedDrainId}
              onChange={(e) => {
                setSelectedDrainId(e.target.value);
                setAnalysisResult(null);
              }}
              className="scanner-select"
            >
              {drains.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.id} - {d.name} ({d.status})
                </option>
              ))}
            </select>
          </div>

          <button
            className="btn-run-ai"
            onClick={handleRunAiAnalysis}
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <span className="spinner-dot"></span>
                <span>Running Edge AI Neural Inference...</span>
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <span>Trigger AI Diagnosis</span>
              </>
            )}
          </button>

          {selectedDrain && (
            <button
              className="btn-inspect"
              style={{ padding: '9px 16px' }}
              onClick={() => onInspectDrain(selectedDrain)}
            >
              Open Full Inspector
            </button>
          )}
        </div>

        {selectedDrain && (
          <div className="drain-preview-box">
            <div className="preview-row">
              <div>
                <strong>Current Status:</strong>{' '}
                <span className={`text-${selectedDrain.status === 'High-Risk' ? 'danger' : selectedDrain.status === 'Warning' ? 'warning' : 'emerald'}`}>
                  {selectedDrain.status}
                </span>
              </div>
              <div>
                <strong>Water Level:</strong> {selectedDrain.waterLevel}% ({selectedDrain.waterLevelCm} cm)
              </div>
              <div>
                <strong>Inlet / Outlet:</strong> {selectedDrain.inletFlow} L/s / {selectedDrain.outletFlow} L/s
              </div>
              <div>
                <strong>Blockage Probability:</strong> {selectedDrain.blockageRisk}%
              </div>
            </div>

            {analysisResult && (
              <div className="analysis-result-panel">
                <div className="result-header">
                  <span className="result-badge">AI DIAGNOSIS RESULT</span>
                  <span className="result-time">{analysisResult.timestamp}</span>
                </div>
                <div className="result-grid">
                  <div className="result-item">
                    <span className="res-lbl">Identified Root Cause</span>
                    <span className="res-val text-cyan">{analysisResult.primaryCause}</span>
                  </div>
                  <div className="result-item">
                    <span className="res-lbl">Neural Model Confidence</span>
                    <span className="res-val text-emerald">{analysisResult.confidence}</span>
                  </div>
                  <div className="result-item">
                    <span className="res-lbl">Hydraulic Efficiency</span>
                    <span className="res-val text-amber">{analysisResult.hydraulicEfficiency}</span>
                  </div>
                  <div className="result-item">
                    <span className="res-lbl">Recommended Intervention</span>
                    <span className="res-val text-danger">{analysisResult.recommendedCrew}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Anomaly Taxonomy Cards */}
      <div className="anomaly-types-section">
        <h3 className="section-title">Drainage Obstruction Taxonomy &amp; Detection Accuracy</h3>
        <div className="anomaly-grid">
          {AI_DIAGNOSTICS_DATA.anomalyTypes.map((anomaly, idx) => (
            <div key={idx} className="anomaly-card">
              <div className="anomaly-top">
                <h4 className="anomaly-name">{anomaly.type}</h4>
                <span className={`anomaly-sev sev-${anomaly.severity.toLowerCase()}`}>
                  {anomaly.severity} Priority
                </span>
              </div>
              <div className="anomaly-stats">
                <div className="anom-stat">
                  <span className="lbl">Classification Accuracy:</span>
                  <span className="val text-cyan">{anomaly.accuracy}</span>
                </div>
                <div className="anom-stat">
                  <span className="lbl">Simulated Incidents Logged:</span>
                  <span className="val">{anomaly.occurrences} events</span>
                </div>
              </div>
              <div className="anom-desc">
                Identified via pressure differential drop and acoustic reflectance signature.
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
