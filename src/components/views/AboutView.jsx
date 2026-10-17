import React from 'react';

export default function AboutView() {
  return (
    <div className="view-content-wrapper">
      <div className="about-hero-card">
        <div className="about-badge-row">
          <span className="innotech-badge">INNOTECH &apos;26 INNOVATION PROJECT</span>
          <span className="sim-tag-inline">PROTOTYPE &amp; DEMO PLATFORM</span>
        </div>
        <h2 className="about-title">
          DRAIN GUARD <span className="text-cyan">AI</span>
        </h2>
        <p className="about-subtitle">
          Intelligent Subsurface Drainage Telemetry, AI Blockage Prognosis &amp; Urban Flood Mitigation Platform
        </p>
      </div>

      <div className="about-grid">
        <div className="about-card">
          <div className="about-card-icon text-cyan">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
            </svg>
          </div>
          <h3>The Urban Challenge</h3>
          <p>
            Traditional stormwater networks rely on reactive complaints after roads are already submerged. Subsurface blockages caused by plastic debris, silt buildup, and hydraulic backflow remain invisible until catastrophic urban paralysis occurs.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon text-emerald">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3>The Drain Guard Solution</h3>
          <p>
            Drain Guard AI introduces continuous IoT telemetry (ultrasonic level transducers and dual inlet/outlet flowmeters) combined with edge neural models to calculate hydraulic flow differentials and flag clogging risks hours before overspill.
          </p>
        </div>

        <div className="about-card">
          <div className="about-card-icon text-blue">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 10V3L4 14h7v7l9-11h-7z"></path>
            </svg>
          </div>
          <h3>Proactive Action &amp; Dispatch</h3>
          <p>
            Instead of sending crews to random locations, the municipal command dashboard provides targeted priority routing for hydro-jetting units and vacuum tankers, reducing clearing times by over 70%.
          </p>
        </div>
      </div>

      {/* System Architecture Diagram */}
      <div className="architecture-card">
        <h3 className="arch-title">Drain Guard AI 4-Tier Architecture</h3>
        <div className="arch-steps-container">
          <div className="arch-step">
            <div className="arch-num">01</div>
            <h4>Edge IoT Telemetry</h4>
            <p>Submersible ultrasonic depth sensors &amp; electromagnetic velocity meters in storm sumps.</p>
          </div>
          <div className="arch-arrow">→</div>
          <div className="arch-step">
            <div className="arch-num">02</div>
            <h4>Edge Micro-AI</h4>
            <p>Microcontroller anomaly filter computing inflow vs. outflow differential in real time.</p>
          </div>
          <div className="arch-arrow">→</div>
          <div className="arch-step">
            <div className="arch-num">03</div>
            <h4>Neural Diagnosis Engine</h4>
            <p>DrainVision-v2.6 CNN classifying siltation vs. trash dams with 97.4% precision.</p>
          </div>
          <div className="arch-arrow">→</div>
          <div className="arch-step">
            <div className="arch-num">04</div>
            <h4>Smart-City Command UI</h4>
            <p>Responsive, real-time dashboard delivering automated emergency alerts to municipal crews.</p>
          </div>
        </div>
      </div>

      {/* INNOTECH Details */}
      <div className="innotech-meta-card">
        <div className="meta-col">
          <span className="meta-label">Event &amp; Track</span>
          <span className="meta-val">INNOTECH &apos;26 • Smart Cities &amp; Sustainable Infrastructure</span>
        </div>
        <div className="meta-col">
          <span className="meta-label">UN SDG Alignment</span>
          <span className="meta-val">SDG 11 (Sustainable Cities) &amp; SDG 9 (Resilient Infrastructure)</span>
        </div>
        <div className="meta-col">
          <span className="meta-label">Demonstration Mode</span>
          <span className="meta-val text-cyan">Interactive Simulated Telemetry Engine</span>
        </div>
      </div>
    </div>
  );
}
