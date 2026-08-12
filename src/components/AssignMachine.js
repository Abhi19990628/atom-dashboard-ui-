import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AssignMachine.css';

const API_BASE = "http://192.168.0.34:8000/api"; 

// 🔥 NAYA CONFIG: Plant wise Machine Sections & Counts
const MACHINE_CONFIG = {
  plant_1: {
    "Press Machine": { count: 57, prefix: "PP" },
    "Tip Blending": { count: 9, prefix: "TB" },
    "Spot Blending": { count: 2, prefix: "SB" },
    "MIG Blending": { count: 3, prefix: "MB" },
    "Projection Blending": { count: 3, prefix: "PB" },
  },
  plant_2: {
    "Press Machine": { count: 46, prefix: "PP" },
    "MIG Blending": { count: 3, prefix: "MB" },
    "Spot Blending": { count: 2, prefix: "SB" },
    "Projection Blending": { count: 1, prefix: "PB" },
  }
};

export default function AssignMachine() {
  const navigate = useNavigate();
  
  const userRole = localStorage.getItem("user_role") || "Plant_1_User";
  const loggedInEngineerPlant = userRole.includes("Plant_1") ? "plant_1" : "plant_2";

  // ========== STATES ==========
  const [plant, setPlant] = useState(loggedInEngineerPlant);
  const [activeTab, setActiveTab] = useState("assign"); 
  
  // Assignment States
  const [operators, setOperators] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [newOperatorName, setNewOperatorName] = useState("");
  const [newEmpCode, setNewEmpCode] = useState(""); 
  const [showAddOperator, setShowAddOperator] = useState(false);
  
  // NAYE STATES MACHINE SECTION KE LIYE
  const [machineSection, setMachineSection] = useState("Press Machine");
  const [machines, setMachines] = useState([]);
  const [machine, setMachine] = useState("");
  
  const [shift, setShift] = useState("A"); 
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentAssignments, setCurrentAssignments] = useState([]);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoData, setInfoData] = useState(null);

  // History States
  const [historyData, setHistoryData] = useState([]);
  const [historyDate, setHistoryDate] = useState(new Date().toISOString().split('T')[0]);

  // ========== EFFECTS ==========
  useEffect(() => {
    if (plant) {
      calculateShift();
      loadOperators();
      loadCurrentAssignments(); 
      setMachineSection("Press Machine");
    }
  }, [plant]);

  useEffect(() => {
    if (plant && machineSection) {
      const config = MACHINE_CONFIG[plant][machineSection];
      if (config) {
        const generatedMachines = Array.from(
          { length: config.count }, 
          (_, i) => `${config.prefix}${i + 1}`
        );
        setMachines(generatedMachines);
        setMachine(""); 
      } else {
        setMachines([]);
      }
    }
  }, [plant, machineSection]);

  useEffect(() => {
    if (activeTab === "history" && plant) {
      loadHistory();
    }
  }, [activeTab, historyDate, plant]);

  // ========== FUNCTIONS ==========
  const calculateShift = () => {
    const now = new Date();
    const timeInHours = now.getHours() + (now.getMinutes() / 60);
    setShift((timeInHours >= 8.5 && timeInHours < 20.0) ? "A" : "B");
  };

  const loadOperators = async () => {
    try {
      const response = await axios.get(`${API_BASE}/operators/?plant=${plant}`);
      if (response.data?.operators) setOperators(response.data.operators); 
    } catch (error) { console.error(error); }
  };

  const loadCurrentAssignments = async () => {
    try {
      const response = await axios.get(`${API_BASE}/assignments/list/?plant=${plant}`);
      if (response.data?.assignments) setCurrentAssignments(response.data.assignments);
    } catch (error) { console.error(error); }
  };

  const loadHistory = async () => {
    try {
      const response = await axios.get(`${API_BASE}/assignments/history/?plant=${plant}&date=${historyDate}`);
      if (response.data?.history) setHistoryData(response.data.history);
    } catch (error) { console.error("Error fetching history:", error); }
  };

  const handleAddOperator = async () => {
    if (!newOperatorName.trim()) return alert('Please enter operator name');
    try {
      setLoading(true);
      await axios.post(`${API_BASE}/operators/add/`, { 
        name: newOperatorName, plant: plant, employee_code: newEmpCode 
      });
      setNewOperatorName(""); setNewEmpCode(""); setShowAddOperator(false);
      loadOperators();
    } catch (error) { alert("Failed to add operator."); } 
    finally { setLoading(false); }
  };

  // 🔥 NAYA FUNCTION: SHIFT END / CLEAR ALL MACHINES 🔥
  const handleEndShift = async () => {
    const confirmReset = window.confirm("🚨 WARNING: Kya aap pakka sabhi machines ko khali karna chahte hain? Nayi shift start karne ke liye ye saare operators ko unassign kar dega.");
    if (!confirmReset) return;

    try {
      setLoading(true);
      await axios.post(`${API_BASE}/assignment/end-shift/`, { plant: plant });
      alert("✅ Shift Ended Successfully! Saari machines khali ho chuki hain.");
      loadCurrentAssignments(); // Reload assignments to show empty UI
    } catch (error) {
      alert("Failed to reset machines.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const selectedMachineDbNo = machine ? machine.replace(/[^0-9]/g, '') : '';
  const currentAssignedMachine = currentAssignments.find(a => a.machine_no === selectedMachineDbNo && a.is_current !== false);
  const currentAssignedOperator = selectedOperator && selectedOperator !== "No Operator Available" 
      ? currentAssignments.find(a => a.operator_name === selectedOperator && a.is_current !== false) : null;
  const requiresOverride = !!currentAssignedMachine || !!currentAssignedOperator;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!machine) return alert("Please select a machine.");
    if (!selectedOperator) return alert("Please select an operator.");

    try {
      setLoading(true);
      const dbMachineNo = machine.replace(/[^0-9]/g, ''); 
      await axios.post(`${API_BASE}/assignment/save/`, { 
        operator_name: selectedOperator, 
        machine_no: dbMachineNo, 
        plant: plant, 
        shift: shift,
        section: machineSection,
        override: requiresOverride 
      });
      setShowSuccess(true);
      setTimeout(() => navigate('/dashboard'), 3000);
    } catch (error) {
      if (error.response?.data?.message) alert("🚨 ERROR: " + error.response.data.message);
      else alert("Assignment failed.");
    } finally { setLoading(false); }
  };

  if (showSuccess) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon">
            <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          <h1 className="success-title">Assignment Successful!</h1>
          <p className="success-details">
            <strong>{selectedOperator}</strong> assigned to <br/>
            <div className="machine-highlight">{machine} ({machineSection})</div>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="split-container">
      {/* LEFT SIDE BRANDING */}
      <div className="left-side">
        <div className="gradient-overlay"></div>
        <div className="particles-container">
          <div className="particle nut"></div><div className="particle nut2"></div>
          <div className="particle gear"></div><div className="particle wrench"></div>
        </div>
        <div className="branding-content">
          <div className="logo-wrapper">
            <div className="logo-glow"></div>
            <img src="/logo.png" alt="Brand Logo" className="brand-logo" /> 
          </div>
          <div className="brand-title">
            <span className="title-line">Smart Production</span>
            <span className="title-brand">HUB</span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE AREA */}
      <div className="right-side">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <button className="back-btn" style={{ marginBottom: 0 }} onClick={() => navigate('/dashboard')}>← Back</button>
          
          {/* 🔥 END SHIFT BUTTON 🔥 */}
          <button 
            type="button" 
            onClick={handleEndShift}
            style={{ 
              background: '#ef4444', color: 'white', border: 'none', 
              padding: '12px 20px', borderRadius: '8px', fontWeight: 'bold',
              cursor: 'pointer', boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)'
            }}
          >
            🛑 End Shift (Clear All)
          </button>
        </div>
        
        <div className="form-content fade-in">
          
          {/* TABS */}
          <div className="custom-nav-tabs">
            <button className={activeTab === 'assign' ? 'tab-btn active' : 'tab-btn'} onClick={() => setActiveTab('assign')}>
              ⚙️ Assignment Form
            </button>
            <button className={activeTab === 'history' ? 'tab-btn active' : 'tab-btn'} onClick={() => setActiveTab('history')}>
              📜 Assignment History
            </button>
          </div>

          {/* TAB 1: ASSIGNMENT FORM */}
          {activeTab === 'assign' && (
            <div className="fade-in">
              <div className="form-header">
                <h2 className="form-title">Assign Machine</h2>
              </div>
              <form className="assignment-form" onSubmit={handleSubmit}>
                
                {/* MACHINE SECTION SELECTION */}
                <div className="form-group">
                  <label className="form-label">Select Section / Category</label>
                  <div className="select-wrapper">
                    <select className="form-select" value={machineSection} onChange={(e) => setMachineSection(e.target.value)}>
                      {Object.keys(MACHINE_CONFIG[plant]).map((section, idx) => (
                        <option key={idx} value={section}>{section}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* MACHINE SELECTION (Filtered by Section) */}
                <div className="form-group">
                  <label className="form-label">Select Machine ({machineSection})</label>
                  <div className="select-wrapper">
                    <select className="form-select" value={machine} onChange={(e) => setMachine(e.target.value)}>
                      <option value="">-- Choose Machine --</option>
                      {machines.map((machineName, idx) => {
                        const dbNo = String(machineName).replace(/[^0-9]/g, '');
                        const isAssigned = currentAssignments.find(a => a.machine_no === dbNo && a.is_current !== false);
                        
                        const bgColor = isAssigned ? "#dcfce7" : "#ffffff";
                        const textColor = isAssigned ? "#166534" : "#000000";
                        const displayText = isAssigned ? `${machineName} - ✅ Assigned (${isAssigned.operator_name})` : `${machineName} - Empty`;

                        return <option key={idx} value={machineName} style={{ backgroundColor: bgColor, color: textColor, fontWeight: isAssigned ? 'bold' : 'normal' }}>{displayText}</option>;
                      })}
                    </select>
                  </div>
                  {currentAssignedMachine && (
                    <div className="assigned-alert-box">
                      <div className="alert-text">
                        <span style={{ fontSize: '20px' }}>⚠️</span>
                        <div><strong>Assigned To: {currentAssignedMachine.operator_name}</strong></div>
                      </div>
                      <button type="button" className="view-info-btn" onClick={() => { setInfoData(currentAssignedMachine); setShowInfoModal(true); }}>
                        View Details
                      </button>
                    </div>
                  )}
                </div>

                {/* SHIFT SELECTION */}
                <div className="form-group">
                  <label className="form-label">Select Shift</label>
                  <div className="select-wrapper">
                    <select className="form-select" value={shift} onChange={(e) => setShift(e.target.value)}>
                      <option value="A">Shift A (8:30 AM - 8:00 PM)</option>
                      <option value="B">Shift B (8:00 PM - 8:30 AM)</option>
                    </select>
                  </div>
                </div>

                {/* OPERATOR SELECTION */}
                <div className="form-group">
                  <label className="form-label">Select Operator</label>
                  <div className="select-wrapper">
                    <select className="form-select" value={selectedOperator} onChange={(e) => setSelectedOperator(e.target.value)}>
                      <option value="">-- Choose Operator --</option>
                      <option value="No Operator Available" style={{backgroundColor: '#fee2e2', color: '#b91c1c', fontWeight: 'bold'}}>🛑 Mark Idle / No Operator</option>
                      {operators.map((op, idx) => {
                        const opName = op.name || op;
                        const opAssignment = currentAssignments.find(a => a.operator_name === opName && a.is_current !== false);
                        const bgColor = opAssignment ? "#ffedd5" : "#dcfce7";
                        const textColor = opAssignment ? "#9a3412" : "#166534";
                        const displayText = opAssignment ? `🔴 ${opName} - Working (M: ${opAssignment.machine_no})` : `🟢 ${opName} - Free`;
                        return <option key={idx} value={opName} style={{ backgroundColor: bgColor, color: textColor, fontWeight: 'bold' }}>{displayText}</option>;
                      })}
                    </select>
                  </div>
                  {currentAssignedOperator && (
                    <div style={{ marginTop: '10px', padding: '10px 14px', background: '#ffedd5', border: '1px dashed #f97316', borderRadius: '10px', color: '#9a3412', fontSize: '14px', fontWeight: '600' }}>
                      ⚠️ {selectedOperator} is working on Machine {currentAssignedOperator.machine_no}. Submitting will transfer him.
                    </div>
                  )}
                  <button type="button" className="add-operator-btn" onClick={() => setShowAddOperator(!showAddOperator)}>+ Add New Operator</button>
                </div>

                {/* ADD NEW OPERATOR */}
                {showAddOperator && (
                  <div className="add-operator-form fade-in">
                    <input type="text" className="form-input" placeholder="Operator Name..." value={newOperatorName} onChange={(e) => setNewOperatorName(e.target.value)} />
                    <input type="text" className="form-input" placeholder="Employee Code (Optional)..." value={newEmpCode} onChange={(e) => setNewEmpCode(e.target.value)} />
                    <div className="btn-group">
                      <button type="button" className="btn-save" onClick={handleAddOperator} disabled={loading}>{loading ? "Saving..." : "Save Operator"}</button>
                      <button type="button" className="btn-cancel" onClick={() => setShowAddOperator(false)}>Cancel</button>
                    </div>
                  </div>
                )}

                <button type="submit" className="submit-btn" disabled={loading} style={{ background: requiresOverride ? 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)' : '' }}>
                  {loading ? <div className="btn-spinner"></div> : (requiresOverride ? "Re-Assign / Transfer" : "Submit Assignment")}
                </button>
              </form>
            </div>
          )}

          {/* TAB 2: HISTORY VIEW */}
          {activeTab === 'history' && (
            <div className="history-section fade-in">
              <div className="history-header">
                <h2 className="form-title">Assignment History</h2>
                <div className="date-filter-box">
                  <label>Filter by Date:</label>
                  <input type="date" className="date-picker" value={historyDate} onChange={(e) => setHistoryDate(e.target.value)} />
                </div>
              </div>

              <div className="history-feed">
                {historyData.length === 0 ? (
                  <div className="no-history">No assignments found for this date.</div>
                ) : (
                  historyData.map((item, index) => (
                    <div className="history-card" key={index}>
                      <div className="history-card-header">
                        <h4>{item.operator_name === 'No Operator Available' ? '🛑 Idle Status' : `👷‍♂️ ${item.operator_name}`}</h4>
                        <span className={`status-badge ${item.is_current ? 'active-badge' : 'ended-badge'}`}>
                          {item.is_current ? '🟢 Working' : '🔴 Ended'}
                        </span>
                      </div>
                      
                      <div className="history-card-body">
                        <div className="history-detail"><strong>Machine:</strong> PP{item.machine_no}</div>
                        <div className="history-detail"><strong>Shift:</strong> {item.shift}</div>
                        <div className="history-detail"><strong>Start Time:</strong> {item.start_time}</div>
                        <div className="history-detail"><strong>End Time:</strong> {item.end_time || 'Currently Active 🔄'}</div>
                        <div className="history-detail"><strong>Reason:</strong> {item.reason || item.status}</div>
                        <div className="history-detail" style={{ color: '#0ea5e9', fontWeight: 'bold' }}>
                          <strong>Duration:</strong> ⏱️ {item.duration || '0h 0m'}
                        </div>
                      </div>

                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* INFO POPUP */}
      {showInfoModal && infoData && (
        <div className="modal-overlay" onClick={() => setShowInfoModal(false)}>
          <div className="info-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="info-modal-header">
              <h3>Machine {infoData.machine_no} Details</h3>
              <button className="close-modal-btn" onClick={() => setShowInfoModal(false)}>✖</button>
            </div>
            <div className="info-data-row">
              <span className="info-label">Operator:</span><strong className="info-value text-blue">{infoData.operator_name}</strong>
            </div>
            <div className="info-data-row">
              <span className="info-label">Assigned Time:</span><strong className="info-value">{infoData.start_time}</strong>
            </div>
            <div className="info-data-row">
              <span className="info-label">Shift:</span><strong className="info-value">Shift {infoData.shift}</strong>
            </div>
            <button className="btn-cancel" style={{marginTop: '20px', width: '100%'}} onClick={() => setShowInfoModal(false)}>Close</button>
          </div>
        </div>
      )}

    </div>
  );
}