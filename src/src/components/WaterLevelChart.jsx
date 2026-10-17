import React, { useState } from 'react';

export default function WaterLevelChart({ trendData, selectedDrainName }) {
  const [metricKey, setMetricKey] = useState('criticalPeak'); // 'criticalPeak', 'overallAvg', 'warningAvg'
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // SVG dimensions
  const svgWidth = 700;
  const svgHeight = 260;
  const padding = { top: 25, right: 30, bottom: 40, left: 45 };

  const plotWidth = svgWidth - padding.left - padding.right;
  const plotHeight = svgHeight - padding.top - padding.bottom;

  // Max scale is 100%
  const maxVal = 100;
  const minVal = 0;

  const points = trendData.map((d, index) => {
    const x = padding.left + (index / (trendData.length - 1)) * plotWidth;
    const val = d[metricKey] || 0;
    const y = padding.top + plotHeight - (val / (maxVal - minVal)) * plotHeight;
    return { ...d, x, y, val, index };
  });

  // Build SVG path
  let pathD = '';
  if (points.length > 0) {
    pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      // Smooth cubic bezier or straight lines
      const prev = points[i - 1];
      const curr = points[i];
      const cp1x = prev.x + (curr.x - prev.x) / 2;
      const cp1y = prev.y;
      const cp2x = prev.x + (curr.x - prev.x) / 2;
      const cp2y = curr.y;
      pathD += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
    }
  }

  // Area path
  const areaD = points.length > 0
    ? `${pathD} L ${points[points.length - 1].x} ${padding.top + plotHeight} L ${points[0].x} ${padding.top + plotHeight} Z`
    : '';

  // Threshold lines y coords
  const criticalY = padding.top + plotHeight - (75 / 100) * plotHeight;
  const warningY = padding.top + plotHeight - (50 / 100) * plotHeight;

  const getMetricLabel = () => {
    switch (metricKey) {
      case 'criticalPeak':
        return 'Critical Sump Peak (%)';
      case 'overallAvg':
        return 'City-Wide Average (%)';
      case 'warningAvg':
        return 'Warning Zone Median (%)';
      default:
        return 'Water Level (%)';
    }
  };

  return (
    <div className="water-level-chart-card">
      <div className="chart-header">
        <div className="chart-title-group">
          <div className="chart-title-row">
            <h3 className="chart-title">Water-Level Telemetry Trend</h3>
            <span className="sim-tag-inline">SIMULATED STREAM</span>
          </div>
          <p className="chart-subtitle">
            Temporal water level progression • Monitoring sensor array {selectedDrainName ? `(${selectedDrainName})` : '(Multi-Sector)'}
          </p>
        </div>

        <div className="chart-controls">
          <div className="metric-switch">
            <button
              className={`metric-btn ${metricKey === 'criticalPeak' ? 'active peak' : ''}`}
              onClick={() => setMetricKey('criticalPeak')}
            >
              Peak Risk Drain
            </button>
            <button
              className={`metric-btn ${metricKey === 'warningAvg' ? 'active warn' : ''}`}
              onClick={() => setMetricKey('warningAvg')}
            >
              Warning Baseline
            </button>
            <button
              className={`metric-btn ${metricKey === 'overallAvg' ? 'active avg' : ''}`}
              onClick={() => setMetricKey('overallAvg')}
            >
              City-Wide Avg
            </button>
          </div>
        </div>
      </div>

      <div className="chart-canvas-wrapper">
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="water-level-svg"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="waterLevelGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00f0ff" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#0284c7" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#0b1329" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="70%" stopColor="#00f0ff" />
              <stop offset="100%" stopColor="#f43f5e" />
            </linearGradient>

            <filter id="cyanGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#00f0ff" floodOpacity="0.6" />
            </filter>
          </defs>

          {/* Grid lines */}
          {[0, 25, 50, 75, 100].map((level) => {
            const y = padding.top + plotHeight - (level / 100) * plotHeight;
            return (
              <g key={level} className="grid-line-group">
                <line
                  x1={padding.left}
                  y1={y}
                  x2={svgWidth - padding.right}
                  y2={y}
                  stroke="rgba(255, 255, 255, 0.08)"
                  strokeDasharray={level === 0 || level === 100 ? 'none' : '3 3'}
                />
                <text
                  x={padding.left - 10}
                  y={y + 4}
                  fill="#64748b"
                  fontSize="11"
                  textAnchor="end"
                  fontFamily="inherit"
                >
                  {level}%
                </text>
              </g>
            );
          })}

          {/* Warning threshold line (50%) */}
          <line
            x1={padding.left}
            y1={warningY}
            x2={svgWidth - padding.right}
            y2={warningY}
            stroke="#f59e0b"
            strokeDasharray="4 4"
            strokeOpacity="0.5"
          />
          <text
            x={svgWidth - padding.right}
            y={warningY - 4}
            fill="#f59e0b"
            fontSize="10"
            textAnchor="end"
            opacity="0.8"
          >
            Warning Threshold (50%)
          </text>

          {/* Critical threshold line (75%) */}
          <line
            x1={padding.left}
            y1={criticalY}
            x2={svgWidth - padding.right}
            y2={criticalY}
            stroke="#ef4444"
            strokeDasharray="4 4"
            strokeOpacity="0.6"
          />
          <text
            x={svgWidth - padding.right}
            y={criticalY - 4}
            fill="#ef4444"
            fontSize="10"
            textAnchor="end"
            opacity="0.9"
          >
            Critical Alert Level (75%)
          </text>

          {/* Area under curve */}
          {areaD && (
            <path
              d={areaD}
              fill="url(#waterLevelGradient)"
            />
          )}

          {/* Main trend line */}
          {pathD && (
            <path
              d={pathD}
              fill="none"
              stroke="url(#strokeGradient)"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#cyanGlow)"
            />
          )}

          {/* Points */}
          {points.map((p, idx) => {
            const isLast = idx === points.length - 1;
            const isHovered = hoveredPoint && hoveredPoint.index === idx;
            return (
              <g key={idx} className="chart-point-group">
                {isLast && (
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r="8"
                    fill="none"
                    stroke="#00f0ff"
                    strokeWidth="1.5"
                    className="pulse-ring"
                  />
                )}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 6 : isLast ? 5 : 4}
                  fill={p.val >= 75 ? '#ef4444' : p.val >= 50 ? '#f59e0b' : '#00f0ff'}
                  stroke="#070d18"
                  strokeWidth="2"
                  style={{ cursor: 'pointer', transition: 'all 0.2s ease' }}
                  onMouseEnter={() => setHoveredPoint(p)}
                  onMouseLeave={() => setHoveredPoint(null)}
                />
              </g>
            );
          })}

          {/* X axis labels */}
          {points.map((p, idx) => (
            <text
              key={idx}
              x={p.x}
              y={svgHeight - padding.bottom + 20}
              fill="#94a3b8"
              fontSize="11"
              textAnchor="middle"
              fontFamily="inherit"
            >
              {p.time}
            </text>
          ))}
        </svg>

        {/* Hover Tooltip */}
        {hoveredPoint && (
          <div
            className="chart-tooltip"
            style={{
              left: `${(hoveredPoint.x / svgWidth) * 100}%`,
              top: `${(hoveredPoint.y / svgHeight) * 100}%`
            }}
          >
            <div className="tooltip-time">{hoveredPoint.time} (Simulated)</div>
            <div className="tooltip-metric">
              {getMetricLabel()}: <strong className="text-cyan">{hoveredPoint.val}%</strong>
            </div>
            <div className="tooltip-status">
              Status: {hoveredPoint.val >= 75 ? (
                <span className="text-danger">CRITICAL SPILLOVER</span>
              ) : hoveredPoint.val >= 50 ? (
                <span className="text-warning">ELEVATED FLOW</span>
              ) : (
                <span className="text-emerald">NORMAL EQUILIBRIUM</span>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="chart-footer">
        <div className="chart-legend">
          <div className="legend-item">
            <span className="legend-dot normal"></span>
            <span>Normal (&lt;50%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot warning"></span>
            <span>Warning (50-75%)</span>
          </div>
          <div className="legend-item">
            <span className="legend-dot critical"></span>
            <span>High-Risk (&gt;75%)</span>
          </div>
        </div>
        <div className="chart-sim-note">
          Simulated sensor telemetry sampling rate: 10 seconds
        </div>
      </div>
    </div>
  );
}
