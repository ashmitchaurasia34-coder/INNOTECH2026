// Simulated Telemetry Data for Drain Guard AI (INNOTECH'26 Innovation Project)
// NOTE: All metrics, flow rates, and risk probabilities are simulated for demonstration.

export const INITIAL_DRAINS = [
  {
    id: "DG-Z1-01",
    name: "Sector 4 Underpass Sump",
    zone: "Zone 1 (Downtown)",
    waterLevel: 89, // percentage
    waterLevelCm: 178, // cm
    maxCapacityCm: 200,
    inletFlow: 182, // L/s
    outletFlow: 44, // L/s
    status: "High-Risk",
    blockageRisk: 94,
    siltLevel: 78,
    flowDiscrepancy: "+138 L/s accumulating",
    sensorHealth: "Normal",
    lastReported: "Just now",
    recommendedAction: "Dispatch hydro-jetting unit immediately. High risk of surface backflow."
  },
  {
    id: "DG-Z1-04",
    name: "Metro Station South Shaft",
    zone: "Zone 1 (Downtown)",
    waterLevel: 84,
    waterLevelCm: 168,
    maxCapacityCm: 200,
    inletFlow: 164,
    outletFlow: 58,
    status: "High-Risk",
    blockageRisk: 88,
    siltLevel: 71,
    flowDiscrepancy: "+106 L/s accumulating",
    sensorHealth: "Normal",
    lastReported: "1m ago",
    recommendedAction: "Clear trash grate blockage at intake chamber B."
  },
  {
    id: "DG-Z3-09",
    name: "Industrial Corridor Drain C",
    zone: "Zone 3 (Industrial)",
    waterLevel: 81,
    waterLevelCm: 162,
    maxCapacityCm: 200,
    inletFlow: 210,
    outletFlow: 82,
    status: "High-Risk",
    blockageRisk: 85,
    siltLevel: 69,
    flowDiscrepancy: "+128 L/s accumulating",
    sensorHealth: "Warning (Turbidity high)",
    lastReported: "Just now",
    recommendedAction: "Deploy automated debris rake; diversion valve open 40%."
  },
  {
    id: "DG-Z2-03",
    name: "Riverside Ring Road Culvert",
    zone: "Zone 2 (Riverside)",
    waterLevel: 67,
    waterLevelCm: 134,
    maxCapacityCm: 200,
    inletFlow: 140,
    outletFlow: 92,
    status: "Warning",
    blockageRisk: 62,
    siltLevel: 54,
    flowDiscrepancy: "+48 L/s accumulating",
    sensorHealth: "Normal",
    lastReported: "2m ago",
    recommendedAction: "Monitor flow velocity. Silt accumulation nearing warning threshold."
  },
  {
    id: "DG-Z1-08",
    name: "Central Market Storm Duct",
    zone: "Zone 1 (Downtown)",
    waterLevel: 63,
    waterLevelCm: 126,
    maxCapacityCm: 200,
    inletFlow: 125,
    outletFlow: 88,
    status: "Warning",
    blockageRisk: 58,
    siltLevel: 49,
    flowDiscrepancy: "+37 L/s accumulating",
    sensorHealth: "Normal",
    lastReported: "3m ago",
    recommendedAction: "Schedule routine inspection within 4 hours."
  },
  {
    id: "DG-Z2-11",
    name: "Green Valley Storm Trunk",
    zone: "Zone 2 (Riverside)",
    waterLevel: 59,
    waterLevelCm: 118,
    maxCapacityCm: 200,
    inletFlow: 110,
    outletFlow: 85,
    status: "Warning",
    blockageRisk: 52,
    siltLevel: 44,
    flowDiscrepancy: "+25 L/s accumulating",
    sensorHealth: "Normal",
    lastReported: "1m ago",
    recommendedAction: "Check upstream weir sensor calibration."
  },
  {
    id: "DG-Z4-02",
    name: "Tech Park Perimeter Trench",
    zone: "Zone 4 (East Hills)",
    waterLevel: 56,
    waterLevelCm: 112,
    maxCapacityCm: 200,
    inletFlow: 95,
    outletFlow: 76,
    status: "Warning",
    blockageRisk: 48,
    siltLevel: 39,
    flowDiscrepancy: "+19 L/s accumulating",
    sensorHealth: "Normal",
    lastReported: "2m ago",
    recommendedAction: "Inspect outflow baffle for organic matter."
  },
  {
    id: "DG-Z1-02",
    name: "City Hall Main Conduit",
    zone: "Zone 1 (Downtown)",
    waterLevel: 34,
    waterLevelCm: 68,
    maxCapacityCm: 200,
    inletFlow: 78,
    outletFlow: 76,
    status: "Normal",
    blockageRisk: 12,
    siltLevel: 18,
    flowDiscrepancy: "+2 L/s (equilibrium)",
    sensorHealth: "Normal",
    lastReported: "Just now",
    recommendedAction: "No action required. Flow steady."
  },
  {
    id: "DG-Z1-06",
    name: "Financial District Culvert #1",
    zone: "Zone 1 (Downtown)",
    waterLevel: 28,
    waterLevelCm: 56,
    maxCapacityCm: 200,
    inletFlow: 82,
    outletFlow: 81,
    status: "Normal",
    blockageRisk: 9,
    siltLevel: 14,
    flowDiscrepancy: "+1 L/s (equilibrium)",
    sensorHealth: "Normal",
    lastReported: "Just now",
    recommendedAction: "Optimal laminar flow maintained."
  },
  {
    id: "DG-Z2-01",
    name: "Riverside Outfall Station Alpha",
    zone: "Zone 2 (Riverside)",
    waterLevel: 41,
    waterLevelCm: 82,
    maxCapacityCm: 200,
    inletFlow: 145,
    outletFlow: 142,
    status: "Normal",
    blockageRisk: 16,
    siltLevel: 22,
    flowDiscrepancy: "+3 L/s (equilibrium)",
    sensorHealth: "Normal",
    lastReported: "1m ago",
    recommendedAction: "Discharge flume operating within nominal specs."
  },
  {
    id: "DG-Z2-05",
    name: "Harbor Promenade Retention Basin",
    zone: "Zone 2 (Riverside)",
    waterLevel: 38,
    waterLevelCm: 76,
    maxCapacityCm: 200,
    inletFlow: 120,
    outletFlow: 119,
    status: "Normal",
    blockageRisk: 14,
    siltLevel: 20,
    flowDiscrepancy: "+1 L/s (equilibrium)",
    sensorHealth: "Normal",
    lastReported: "Just now",
    recommendedAction: "Reservoir capacity at 81% free buffer."
  },
  {
    id: "DG-Z3-04",
    name: "Freight Terminal Sump Box",
    zone: "Zone 3 (Industrial)",
    waterLevel: 31,
    waterLevelCm: 62,
    maxCapacityCm: 200,
    inletFlow: 95,
    outletFlow: 94,
    status: "Normal",
    blockageRisk: 15,
    siltLevel: 25,
    flowDiscrepancy: "+1 L/s (equilibrium)",
    sensorHealth: "Normal",
    lastReported: "3m ago",
    recommendedAction: "Standard cycle."
  },
  {
    id: "DG-Z4-07",
    name: "Eastern Bypass Gravity Channel",
    zone: "Zone 4 (East Hills)",
    waterLevel: 24,
    waterLevelCm: 48,
    maxCapacityCm: 200,
    inletFlow: 65,
    outletFlow: 64,
    status: "Normal",
    blockageRisk: 8,
    siltLevel: 12,
    flowDiscrepancy: "+1 L/s (equilibrium)",
    sensorHealth: "Normal",
    lastReported: "Just now",
    recommendedAction: "Clear channel flow."
  },
  {
    id: "DG-Z4-10",
    name: "Hillside Detention Pond Interceptor",
    zone: "Zone 4 (East Hills)",
    waterLevel: 35,
    waterLevelCm: 70,
    maxCapacityCm: 200,
    inletFlow: 88,
    outletFlow: 87,
    status: "Normal",
    blockageRisk: 11,
    siltLevel: 16,
    flowDiscrepancy: "+1 L/s (equilibrium)",
    sensorHealth: "Normal",
    lastReported: "2m ago",
    recommendedAction: "Run-off diversion nominal."
  }
];

export const INITIAL_ALERTS = [
  {
    id: "ALT-8091",
    drainId: "DG-Z1-01",
    location: "Sector 4 Underpass Sump",
    severity: "CRITICAL",
    timestamp: "2 mins ago",
    type: "Blockage & Overflow Imminent",
    message: "Inlet rate (182 L/s) exceeds outlet capacity (44 L/s) by 313%. AI models classify 94% blockage probability at intake chamber.",
    action: "Jetting crew dispatched (Unit #03)"
  },
  {
    id: "ALT-8088",
    drainId: "DG-Z1-04",
    location: "Metro Station South Shaft",
    severity: "CRITICAL",
    timestamp: "7 mins ago",
    type: "Grate Obstruction Detected",
    message: "Water level rose 22% in last 15 minutes. Acoustic sensor indicates solid plastic/debris damming at intake grate.",
    action: "Emergency warning triggered for Metro concourse"
  },
  {
    id: "ALT-8082",
    drainId: "DG-Z3-09",
    location: "Industrial Corridor Drain C",
    severity: "CRITICAL",
    timestamp: "14 mins ago",
    type: "Severe Flow Differential",
    message: "Flow delta reached +128 L/s. Chemical runoff silt index high. Risk of roadway flash pooling.",
    action: "Automated diversion sluice opened 40%"
  },
  {
    id: "ALT-8075",
    drainId: "DG-Z2-03",
    location: "Riverside Ring Road Culvert",
    severity: "WARNING",
    timestamp: "26 mins ago",
    type: "Elevated Silt Accumulation",
    message: "Silt level crossed 50% capacity mark. Slower sediment clearance rate detected during high tide cycle.",
    action: "Scheduled for suction clearance cycle #2"
  },
  {
    id: "ALT-8069",
    drainId: "DG-Z1-08",
    location: "Central Market Storm Duct",
    severity: "WARNING",
    timestamp: "42 mins ago",
    type: "Rising Sump Level",
    message: "Water level at 63% and climbing at +0.8 cm/min. Upstream trash traps require maintenance.",
    action: "Alert sent to Zone 1 field technician"
  },
  {
    id: "ALT-8054",
    drainId: "DG-Z2-01",
    location: "Riverside Outfall Station Alpha",
    severity: "INFO",
    timestamp: "1 hour ago",
    type: "Routine Telemetry Sync",
    message: "Automated ultrasonic calibration completed. Zero drift detected across all pressure transducers.",
    action: "System health validated: Optimal"
  }
];

export const INITIAL_TREND_DATA = [
  { time: "03:45", overallAvg: 41, criticalPeak: 68, warningAvg: 50 },
  { time: "04:00", overallAvg: 43, criticalPeak: 72, warningAvg: 52 },
  { time: "04:15", overallAvg: 46, criticalPeak: 75, warningAvg: 55 },
  { time: "04:30", overallAvg: 50, criticalPeak: 81, warningAvg: 59 },
  { time: "04:45", overallAvg: 55, criticalPeak: 86, warningAvg: 62 },
  { time: "05:00", overallAvg: 52, criticalPeak: 89, warningAvg: 61 }
];

export const AI_DIAGNOSTICS_DATA = {
  modelName: "DrainVision Edge-CNN v2.6",
  trainingDataset: "INNOTECH 1.2M Urban Drainage Hydrology Telemetry Frames",
  accuracyRate: "97.4%",
  activeInferenceNodes: 24,
  anomalyTypes: [
    { type: "Solid Trash & Debris Damming", occurrences: 14, severity: "High", accuracy: "98.2%" },
    { type: "Sediment / Silt Heavy Compaction", occurrences: 8, severity: "Medium", accuracy: "96.5%" },
    { type: "Hydraulic Tidal Backpressure", occurrences: 3, severity: "Medium", accuracy: "97.9%" },
    { type: "Sensor Drift / Acoustic Echoing", occurrences: 1, severity: "Low", accuracy: "99.1%" }
  ],
  systemHealthSummary: {
    hydraulicEfficiency: "82.4%",
    totalDischargeRate: "1,248 L/s",
    simulatedRainIntensity: "Moderate (18 mm/hr)",
    meanTimeBlockedDetection: "1.4 seconds"
  }
};
