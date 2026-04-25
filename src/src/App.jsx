import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@400;500;600;700&family=Share+Tech+Mono&family=Exo+2:wght@300;400;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #0a0e1a;
    font-family: 'Exo 2', sans-serif;
    color: #c8d8e8;
    min-height: 100vh;
  }

  .app {
    min-height: 100vh;
    background: linear-gradient(135deg, #0a0e1a 0%, #0d1525 50%, #0a1020 100%);
    padding: 24px;
    position: relative;
    overflow: hidden;
  }

  .app::before {
    content: '';
    position: fixed;
    inset: 0;
    background: 
      repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,200,255,0.015) 40px, rgba(0,200,255,0.015) 41px),
      repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,200,255,0.015) 40px, rgba(0,200,255,0.015) 41px);
    pointer-events: none;
    z-index: 0;
  }

  .content { position: relative; z-index: 1; max-width: 1100px; margin: 0 auto; }

  .header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 32px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0,200,255,0.2);
  }

  .header-icon {
    width: 52px; height: 52px;
    background: linear-gradient(135deg, #00c8ff22, #00c8ff44);
    border: 1px solid #00c8ff66;
    border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 24px;
    box-shadow: 0 0 20px #00c8ff22;
  }

  .header-text h1 {
    font-family: 'Rajdhani', sans-serif;
    font-size: 28px;
    font-weight: 700;
    color: #fff;
    letter-spacing: 2px;
    text-transform: uppercase;
  }

  .header-text p {
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #00c8ff88;
    letter-spacing: 3px;
    text-transform: uppercase;
    margin-top: 2px;
  }

  .badge {
    margin-left: auto;
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #00ff9088;
    border: 1px solid #00ff9033;
    padding: 4px 10px;
    border-radius: 4px;
    letter-spacing: 2px;
    background: #00ff9008;
  }

  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }

  .card {
    background: linear-gradient(135deg, #111827, #0d1a2d);
    border: 1px solid rgba(0,200,255,0.15);
    border-radius: 16px;
    padding: 24px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.3s;
  }

  .card:hover { border-color: rgba(0,200,255,0.3); }

  .card::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,200,255,0.4), transparent);
  }

  .card-header {
    display: flex; align-items: center; gap: 10px;
    margin-bottom: 20px;
  }

  .card-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    background: #00c8ff;
    box-shadow: 0 0 8px #00c8ff;
    animation: pulse 2s infinite;
  }

  .card-dot.orange { background: #ff8c00; box-shadow: 0 0 8px #ff8c00; }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.4; }
  }

  .card-title {
    font-family: 'Rajdhani', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #7ab8d4;
  }

  .unit-id-row {
    display: flex; gap: 12px; align-items: flex-end;
  }

  .field { flex: 1; }

  label {
    display: block;
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #5a8a9f;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 6px;
  }

  input, select {
    width: 100%;
    background: rgba(0,0,0,0.4);
    border: 1px solid rgba(0,200,255,0.2);
    border-radius: 8px;
    color: #e0f0ff;
    font-family: 'Share Tech Mono', monospace;
    font-size: 14px;
    padding: 10px 14px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    -webkit-appearance: none;
  }

  input:focus, select:focus {
    border-color: #00c8ff66;
    box-shadow: 0 0 0 2px #00c8ff11;
  }

  input::placeholder { color: #2a4a5a; }

  select option { background: #0d1525; }

  .readings-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 12px;
  }

  .reading-field { }

  .reading-input-wrap {
    position: relative;
  }

  .unit-label {
    position: absolute;
    right: 10px; top: 50%;
    transform: translateY(-50%);
    font-family: 'Share Tech Mono', monospace;
    font-size: 10px;
    color: #3a6a7f;
    letter-spacing: 1px;
    pointer-events: none;
  }

  .reading-input-wrap input { padding-right: 36px; }

  .analyze-btn {
    width: 100%;
    padding: 16px;
    background: linear-gradient(135deg, #003a5c, #00527a);
    border: 1px solid #00c8ff44;
    border-radius: 12px;
    color: #00c8ff;
    font-family: 'Rajdhani', sans-serif;
    font-size: 16px;
    font-weight: 700;
    letter-spacing: 4px;
    text-transform: uppercase;
    cursor: pointer;
    transition: all 0.2s;
    position: relative;
    overflow: hidden;
    margin-top: 4px;
  }

  .analyze-btn:hover:not(:disabled) {
    background: linear-gradient(135deg, #004a72, #0066a0);
    border-color: #00c8ff88;
    box-shadow: 0 0 24px #00c8ff22;
    transform: translateY(-1px);
  }

  .analyze-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .analyze-btn.loading {
    color: #00c8ff88;
  }

  .spinner {
    display: inline-block;
    width: 14px; height: 14px;
    border: 2px solid #00c8ff33;
    border-top-color: #00c8ff;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin-right: 8px;
    vertical-align: middle;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  .result-card {
    background: linear-gradient(135deg, #0c1820, #0a1530);
    border: 1px solid rgba(0,200,255,0.2);
    border-radius: 16px;
    padding: 28px;
    margin-top: 0;
    position: relative;
    overflow: hidden;
    animation: fadeUp 0.4s ease;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  .result-card::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, #00c8ff88, transparent);
  }

  .result-header {
    display: flex; align-items: center; gap: 12px;
    margin-bottom: 20px;
  }

  .status-badge {
    padding: 4px 12px;
    border-radius: 20px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-weight: 600;
  }

  .status-good { background: #00ff9015; border: 1px solid #00ff9044; color: #00ff90; }
  .status-warn { background: #ff8c0015; border: 1px solid #ff8c0044; color: #ff8c00; }
  .status-bad { background: #ff303015; border: 1px solid #ff303044; color: #ff5050; }
  .status-info { background: #00c8ff15; border: 1px solid #00c8ff44; color: #00c8ff; }

  .result-title {
    font-family: 'Rajdhani', sans-serif;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #7ab8d4;
  }

  .result-body {
    font-family: 'Exo 2', sans-serif;
    font-size: 14px;
    line-height: 1.8;
    color: #b0cce0;
    white-space: pre-wrap;
  }

  .result-body strong { color: #e0f0ff; }

  .divider {
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(0,200,255,0.15), transparent);
    margin: 16px 0;
  }

  .unit-summary {
    display: flex; gap: 16px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 11px;
    color: #4a7a8a;
    letter-spacing: 1px;
    margin-bottom: 16px;
    flex-wrap: wrap;
  }

  .unit-summary span { color: #00c8ff88; }

  .full-grid { grid-column: 1 / -1; }

  @media (max-width: 700px) {
    .grid { grid-template-columns: 1fr; }
    .readings-grid { grid-template-columns: repeat(2, 1fr); }
    .full-grid { grid-column: 1; }
  }
`;

const FIELDS = {
  evaporator: [
    { key: "evapInletTemp", label: "Inlet Air Temp", unit: "°F" },
    { key: "evapOutletTemp", label: "Outlet Air Temp", unit: "°F" },
    { key: "suctionPressure", label: "Suction Pressure", unit: "PSI" },
    { key: "suctionTemp", label: "Suction Line Temp", unit: "°F" },
    { key: "superheat", label: "Superheat", unit: "°F" },
    { key: "evapCoilTemp", label: "Coil Temp", unit: "°F" },
  ],
  compressor: [
    { key: "dischargePressure", label: "Discharge Pressure", unit: "PSI" },
    { key: "dischargeTemp", label: "Discharge Temp", unit: "°F" },
    { key: "compressorAmps", label: "Compressor Amps", unit: "A" },
    { key: "subcooling", label: "Subcooling", unit: "°F" },
    { key: "liquidLinePressure", label: "Liquid Line Press", unit: "PSI" },
    { key: "liquidLineTemp", label: "Liquid Line Temp", unit: "°F" },
  ],
};

export default function HVACDiagnostic() {
  const [unitInfo, setUnitInfo] = useState({ evapUnit: "", compUnit: "", refrigerant: "R-410A", mode: "Cooling" });
  const [readings, setReadings] = useState({});
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleUnitChange = (e) => setUnitInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleReading = (key, val) => setReadings(prev => ({ ...prev, [key]: val }));

  const buildPrompt = () => {
    const r = readings;
    const lines = [];
    lines.push(`HVAC SYSTEM DIAGNOSTIC REQUEST`);
    lines.push(`================================`);
    lines.push(`Evaporator Unit #: ${unitInfo.evapUnit || "N/A"}`);
    lines.push(`Compressor Unit #: ${unitInfo.compUnit || "N/A"}`);
    lines.push(`Refrigerant: ${unitInfo.refrigerant}`);
    lines.push(`Operating Mode: ${unitInfo.mode}`);
    lines.push(``);
    lines.push(`EVAPORATOR READINGS:`);
    FIELDS.evaporator.forEach(f => {
      if (r[f.key]) lines.push(`  ${f.label}: ${r[f.key]} ${f.unit}`);
    });
    lines.push(``);
    lines.push(`COMPRESSOR READINGS:`);
    FIELDS.compressor.forEach(f => {
      if (r[f.key]) lines.push(`  ${f.label}: ${r[f.key]} ${f.unit}`);
    });
    lines.push(``);
    lines.push(`Based on these readings, provide a professional HVAC diagnostic analysis. Include:`);
    lines.push(`1. Overall system status (Optimal / Marginal / Fault / Critical)`);
    lines.push(`2. Analysis of the evaporator operation`);
    lines.push(`3. Analysis of the compressor operation`);
    lines.push(`4. Superheat and subcooling evaluation (if provided)`);
    lines.push(`5. Any detected faults or concerns`);
    lines.push(`6. Recommended corrective actions`);
    lines.push(`7. A brief overall summary`);
    lines.push(``);
    lines.push(`Be specific and technical. Reference the unit numbers in your response.`);
    return lines.join("\n");
  };

  const analyze = async () => {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: "You are an expert HVAC diagnostic technician with 20+ years of experience. Analyze the provided readings and give a clear, professional diagnostic report. Use bold text (**text**) for key findings and status items. Keep the response well-structured but concise.",
          messages: [{ role: "user", content: buildPrompt() }],
        }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      const text = data.content?.map(b => b.text || "").join("") || "";
      let status = "info";
      const lower = text.toLowerCase();
      if (lower.includes("critical") || lower.includes("fault")) status = "bad";
      else if (lower.includes("marginal") || lower.includes("concern") || lower.includes("warning")) status = "warn";
      else if (lower.includes("optimal") || lower.includes("normal") || lower.includes("within")) status = "good";
      const formatted = text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
      setResult({ text: formatted, status });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const statusLabels = { good: "OPTIMAL", warn: "ATTENTION REQUIRED", bad: "FAULT DETECTED", info: "ANALYSIS COMPLETE" };
  const hasAnyReading = Object.values(readings).some(v => v !== "" && v !== undefined);

  return (
    <>
      <style>{styles}</style>
      <div className="app">
        <div className="content">
          <div className="header">
            <div className="header-icon">❄️</div>
            <div className="header-text">
              <h1>HVAC Diagnostics</h1>
              <p>System Performance Analyzer</p>
            </div>
            <div className="badge">AI-POWERED</div>
          </div>
          <div className="grid" style={{ marginBottom: 20 }}>
            <div className="card">
              <div className="card-header">
                <div className="card-dot"></div>
                <div className="card-title">Evaporator Unit</div>
              </div>
              <div className="field">
                <label>Unit Number / Model</label>
                <input name="evapUnit" value={unitInfo.evapUnit} onChange={handleUnitChange} placeholder="e.g. EVP-2401-A" />
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-dot orange"></div>
                <div className="card-title">Compressor Unit</div>
              </div>
              <div className="field">
                <label>Unit Number / Model</label>
                <input name="compUnit" value={unitInfo.compUnit} onChange={handleUnitChange} placeholder="e.g. CMP-2401-A" />
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-dot"></div>
                <div className="card-title">System Configuration</div>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div className="field">
                  <label>Refrigerant Type</label>
                  <select name="refrigerant" value={unitInfo.refrigerant} onChange={handleUnitChange}>
                    <option>R-410A</option>
                    <option>R-22</option>
                    <option>R-32</option>
                    <option>R-407C</option>
                    <option>R-134a</option>
                    <option>R-404A</option>
                    <option>R-448A</option>
                    <option>R-454B</option>
                  </select>
                </div>
                <div className="field">
                  <label>Mode</label>
                  <select name="mode" value={unitInfo.mode} onChange={handleUnitChange}>
                    <option>Cooling</option>
                    <option>Heating</option>
                    <option>Heat Pump Cooling</option>
                    <option>Heat Pump Heating</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="card" style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
              <button className={`analyze-btn${loading ? " loading" : ""}`} onClick={analyze} disabled={loading || !hasAnyReading} style={{ marginTop: "auto" }}>
                {loading ? <><span className="spinner"></span>Analyzing System...</> : "▶  Run Diagnostic Analysis"}
              </button>
              {!hasAnyReading && <p style={{ textAlign: "center", fontSize: 11, color: "#3a5a6a", fontFamily: "'Share Tech Mono', monospace", letterSpacing: 1, marginTop: 8 }}>Enter at least one reading to analyze</p>}
            </div>
          </div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header">
              <div className="card-dot"></div>
              <div className="card-title">Evaporator Readings</div>
            </div>
            <div className="readings-grid">
              {FIELDS.evaporator.map(f => (
                <div className="reading-field" key={f.key}>
                  <label>{f.label}</label>
                  <div className="reading-input-wrap">
                    <input type="number" placeholder="—" value={readings[f.key] || ""} onChange={e => handleReading(f.key, e.target.value)} />
                    <span className="unit-label">{f.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div className="card-header">
              <div className="card-dot orange"></div>
              <div className="card-title">Compressor Readings</div>
            </div>
            <div className="readings-grid">
              {FIELDS.compressor.map(f => (
                <div className="reading-field" key={f.key}>
                  <label>{f.label}</label>
                  <div className="reading-input-wrap">
                    <input type="number" placeholder="—" value={readings[f.key] || ""} onChange={e => handleReading(f.key, e.target.value)} />
                    <span className="unit-label">{f.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {error && (
            <div className="result-card" style={{ borderColor: "#ff505044" }}>
              <p style={{ color: "#ff7070", fontFamily: "'Share Tech Mono', monospace", fontSize: 13 }}>⚠ API Error: {error}</p>
            </div>
          )}
          {result && (
            <div className="result-card">
              <div className="result-header">
                <div className="result-title">Diagnostic Report</div>
                <div className={`status-badge status-${result.status}`}>{statusLabels[result.status]}</div>
              </div>
              {(unitInfo.evapUnit || unitInfo.compUnit) && (
                <div className="unit-summary">
                  {unitInfo.evapUnit && <div>EVAP: <span>{unitInfo.evapUnit}</span></div>}
                  {unitInfo.compUnit && <div>COMP: <span>{unitInfo.compUnit}</span></div>}
                  <div>REFRIG: <span>{unitInfo.refrigerant}</span></div>
                  <div>MODE: <span>{unitInfo.mode}</span></div>
                </div>
              )}
              <div className="divider"></div>
              <div className="result-body" dangerouslySetInnerHTML={{ __html: result.text }} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
