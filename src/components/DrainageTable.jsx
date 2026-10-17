import React, { useState } from 'react';

export default function DrainageTable({
  drains,
  activeFilter,
  onSelectFilter,
  onInspectDrain
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('waterLevel'); // 'waterLevel', 'inletFlow', 'id'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const filteredDrains = drains
    .filter((drain) => {
      if (activeFilter !== 'All' && drain.status !== activeFilter) {
        return false;
      }
      if (searchTerm.trim() !== '') {
        const query = searchTerm.toLowerCase();
        return (
          drain.id.toLowerCase().includes(query) ||
          drain.name.toLowerCase().includes(query) ||
          drain.zone.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];
      if (typeof valA === 'string') {
        return sortOrder === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Normal':
        return (
          <span className="table-status-badge status-normal">
            <span className="status-dot-emerald"></span> Normal
          </span>
        );
      case 'Warning':
        return (
          <span className="table-status-badge status-warning">
            <span className="status-dot-amber"></span> Warning
          </span>
        );
      case 'High-Risk':
        return (
          <span className="table-status-badge status-high-risk">
            <span className="status-dot-danger"></span> High-Risk
          </span>
        );
      default:
        return <span className="table-status-badge">{status}</span>;
    }
  };

  const getWaterLevelColor = (level) => {
    if (level >= 75) return 'var(--danger)';
    if (level >= 50) return 'var(--warning)';
    return 'var(--cyan)';
  };

  return (
    <div className="drainage-table-card">
      <div className="table-header-row">
        <div className="table-title-group">
          <div className="table-title-line">
            <h3 className="table-title">Real-Time Drainage Telemetry Matrix</h3>
            <span className="sim-tag-inline">SIMULATED SENSORS</span>
          </div>
          <p className="table-subtitle">
            Continuous ultrasonic level transducers and dual electromagnetic flow sensors.
          </p>
        </div>

        <div className="table-toolbar">
          <div className="search-box">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
            <input
              type="text"
              placeholder="Search drain ID, street, zone..."
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

          <div className="filter-pill-group">
            {['All', 'Normal', 'Warning', 'High-Risk'].map((f) => (
              <button
                key={f}
                className={`filter-pill ${activeFilter === f ? 'active' : ''}`}
                onClick={() => onSelectFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="table-responsive-wrapper">
        <table className="telemetry-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('id')} className="sortable-th">
                <div className="th-content">
                  <span>Drain ID & Location</span>
                  {sortBy === 'id' && (
                    <span className="sort-arrow">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('waterLevel')} className="sortable-th">
                <div className="th-content">
                  <span>Water Level (% / cm)</span>
                  {sortBy === 'waterLevel' && (
                    <span className="sort-arrow">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th onClick={() => handleSort('inletFlow')} className="sortable-th">
                <div className="th-content">
                  <span>Inlet Flow (L/s)</span>
                  {sortBy === 'inletFlow' && (
                    <span className="sort-arrow">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th>
                <div className="th-content">
                  <span>Outlet Flow (L/s)</span>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <span>Flow Differential</span>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <span>Status</span>
                </div>
              </th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrains.length === 0 ? (
              <tr>
                <td colSpan="7" className="table-no-data">
                  No drainage nodes found matching the criteria.
                </td>
              </tr>
            ) : (
              filteredDrains.map((drain) => {
                const diff = drain.inletFlow - drain.outletFlow;
                return (
                  <tr key={drain.id} className="table-row-hover">
                    <td>
                      <div className="drain-id-cell">
                        <span className="drain-id-badge">{drain.id}</span>
                        <div>
                          <div className="drain-name">{drain.name}</div>
                          <div className="drain-zone-sub">{drain.zone}</div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <div className="water-level-cell">
                        <div className="water-level-vals">
                          <span className="pct-num" style={{ color: getWaterLevelColor(drain.waterLevel) }}>
                            {drain.waterLevel}%
                          </span>
                          <span className="cm-num">{drain.waterLevelCm} cm</span>
                        </div>
                        <div className="table-progress-bar">
                          <div
                            className="table-progress-fill"
                            style={{
                              width: `${Math.min(drain.waterLevel, 100)}%`,
                              backgroundColor: getWaterLevelColor(drain.waterLevel)
                            }}
                          ></div>
                        </div>
                      </div>
                    </td>

                    <td>
                      <span className="flow-val text-cyan">{drain.inletFlow} <small>L/s</small></span>
                    </td>

                    <td>
                      <span className="flow-val text-blue">{drain.outletFlow} <small>L/s</small></span>
                    </td>

                    <td>
                      <span
                        className={`diff-val ${
                          diff > 50
                            ? 'text-danger'
                            : diff > 20
                            ? 'text-warning'
                            : 'text-slate'
                        }`}
                      >
                        {diff > 0 ? `+${diff}` : diff} L/s
                        {diff > 50 && <span className="diff-alert-flag" title="Inlet significantly exceeds outlet - siltation or blockage suspected"> ⚠</span>}
                      </span>
                    </td>

                    <td>{getStatusBadge(drain.status)}</td>

                    <td className="text-right">
                      <button
                        className="btn-inspect-small"
                        onClick={() => onInspectDrain(drain)}
                        title="View detailed AI diagnosis and telemetry for this drain"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <div className="table-footer-bar">
        <div className="table-footer-left">
          Showing <span className="highlight-text">{filteredDrains.length}</span> of{' '}
          <span className="highlight-text">{drains.length}</span> monitored nodes
        </div>
        <div className="table-footer-right">
          <span className="sim-notice-tag">Simulated Telemetry Matrix • Automatic 10s Poll</span>
        </div>
      </div>
    </div>
  );
}
