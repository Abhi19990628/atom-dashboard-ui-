// import React, { useState } from "react";
// import axios from "axios";

// export default function IdleCase() {
//   const [machine, setMachine] = useState("");
//   const [operator, setOperator] = useState("👷 Auto Operator"); // added emoji
//   const [tool, setTool] = useState("");
//   const [reason, setReason] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const data = {
//       machine_no: machine,
//       operator_name: operator,
//       tool_name: tool,
//       reason: reason,
//     };

//     try {
//       await axios.post("http://127.0.0.1:8000/api/idle-repo rts/", data);
//       alert("✅ Idle Report Saved Successfully!");
//       // Reset form fields
//       setMachine("");
//       setTool("");
//       setReason("");
//     } catch (error) {
//       alert("❌ Error Saving Idle Report!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="container mt-5" style={{ maxWidth: "600px" }}>
//       <h2 className="mb-4 text-center">🚦 Step 2: Idle Case Reporting</h2>
//       <form onSubmit={handleSubmit} className="shadow p-4 rounded" style={{ background: "#fff" }}>
//         <div className="mb-4">
//           <label className="form-label fw-semibold">
//             🖥️ Machine No
//           </label>
//           <select
//             className="form-select"
//             value={machine}
//             onChange={(e) => setMachine(e.target.value)}
//             required
//             style={{ fontSize: "16px" }}
//           >
//             <option value="">Select Machine</option>
//             <option value="19">Machine 19</option>
//             <option value="11">Machine 11</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="form-label fw-semibold">
//             👤 Operator
//           </label>
//           <input 
//             className="form-control bg-light fw-bold" 
//             value={operator} 
//             readOnly 
//             style={{ fontSize: "16px" }}
//           />
//         </div>

//         <div className="mb-4">
//           <label className="form-label fw-semibold">
//             🔧 Tool Name
//           </label>
//           <select
//             className="form-select"
//             value={tool}
//             onChange={(e) => setTool(e.target.value)}
//             required
//             style={{ fontSize: "16px" }}
//           >
//             <option value="">Select Tool</option>
//             <option value="Tool1">Tool 1</option>
//             <option value="Tool2">Tool 2</option>
//           </select>
//         </div>

//         <div className="mb-4">
//           <label className="form-label fw-semibold">
//             ⚠️ Idle Reason
//           </label>
//           <select
//             className="form-select"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             required
//             style={{ fontSize: "16px" }}
//           >
//             <option value="">Select Reason</option>
//             <option value="TOOL_BD">Tool Breakdown</option>
//             <option value="MC_BD">Machine Breakdown</option>
//             <option value="MAINT">Maintenance</option>
//             <option value="CHANGEOVER">Changeover</option>
//           </select>
//         </div>

//         <button 
//           type="submit" 
//           className="btn btn-danger w-100 py-3 fw-bold"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "🚀 Submit Idle Report"}
//         </button>
//       </form>
//     </div>
//   );
// }


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function IdleCase() {
//   const navigate = useNavigate();
//   const [machine, setMachine] = useState("");
//   const [operator, setOperator] = useState("Auto Operator");
//   const [tool, setTool] = useState("");
//   const [reason, setReason] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const data = {
//       machine_no: machine,
//       operator_name: operator,
//       tool_name: tool,
//       reason: reason,
//     };

//     try {
//       await axios.post("http://127.0.0.1:8000/api/idle-reports/", data);
//       document.getElementById('success-toast').style.display = 'block';
//       // Reset form fields
//       setTimeout(() => {
//         setMachine("");
//         setTool("");
//         setReason("");
//         document.getElementById('success-toast').style.display = 'none';
//       }, 2000);
//     } catch (error) {
//       document.getElementById('error-toast').style.display = 'block';
//       setTimeout(() => {
//         document.getElementById('error-toast').style.display = 'none';
//       }, 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     navigate("/assign-machine");
//   };

//   const handleDashboard = () => {
//     navigate("/dashboard");
//   };

//   const styles = {
//     container: {
//       minHeight: '100vh',
//       backgroundColor: '#0f172a',
//       color: 'white',
//       padding: '0'
//     },
//     header: {
//       backgroundColor: '#1e293b',
//       borderBottom: '1px solid #334155',
//       padding: '20px 40px',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center'
//     },
//     headerButtons: {
//       display: 'flex',
//       gap: '12px'
//     },
//     backBtn: {
//       backgroundColor: '#374151',
//       border: 'none',
//       color: 'white',
//       padding: '10px 20px',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       fontSize: '14px'
//     },
//     dashboardBtn: {
//       backgroundColor: '#7c3aed',
//       border: 'none',
//       color: 'white',
//       padding: '10px 20px',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       fontSize: '14px'
//     },
//     title: {
//       fontSize: '32px',
//       fontWeight: 'bold',
//       margin: 0,
//       color: 'white'
//     },
//     subtitle: {
//       color: '#94a3b8',
//       margin: '5px 0 0 0',
//       fontSize: '16px'
//     },
//     mainContent: {
//       padding: '40px',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'flex-start',
//       minHeight: 'calc(100vh - 100px)'
//     },
//     formContainer: {
//       backgroundColor: '#1e293b',
//       borderRadius: '16px',
//       border: '1px solid #334155',
//       padding: '40px',
//       width: '100%',
//       maxWidth: '800px',
//       boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
//     },
//     formHeader: {
//       textAlign: 'center',
//       marginBottom: '40px',
//       paddingBottom: '20px',
//       borderBottom: '1px solid #334155'
//     },
//     formTitle: {
//       fontSize: '28px',
//       fontWeight: '600',
//       color: 'white',
//       marginBottom: '8px'
//     },
//     formSubtitle: {
//       color: '#94a3b8',
//       fontSize: '16px'
//     },
//     progressBar: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginBottom: '40px',
//       gap: '20px'
//     },
//     progressStep: {
//       width: '40px',
//       height: '40px',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontWeight: 'bold',
//       fontSize: '16px'
//     },
//     activeStep: {
//       backgroundColor: '#7c3aed',
//       color: 'white'
//     },
//     completedStep: {
//       backgroundColor: '#10b981',
//       color: 'white'
//     },
//     inactiveStep: {
//       backgroundColor: '#374151',
//       color: '#9ca3af'
//     },
//     progressLine: {
//       width: '60px',
//       height: '2px',
//       backgroundColor: '#10b981'
//     },
//     inactiveLine: {
//       width: '60px',
//       height: '2px',
//       backgroundColor: '#374151'
//     },
//     formGrid: {
//       display: 'grid',
//       gap: '30px'
//     },
//     fieldGroup: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '8px'
//     },
//     label: {
//       fontSize: '16px',
//       fontWeight: '600',
//       color: 'white',
//       marginBottom: '8px'
//     },
//     select: {
//       backgroundColor: '#374151',
//       border: '1px solid #4b5563',
//       borderRadius: '8px',
//       padding: '16px',
//       color: 'white',
//       fontSize: '16px',
//       outline: 'none',
//       transition: 'all 0.3s ease',
//       appearance: 'none',
//       cursor: 'pointer'
//     },
//     input: {
//       backgroundColor: '#374151',
//       border: '1px solid #4b5563',
//       borderRadius: '8px',
//       padding: '16px',
//       color: 'white',
//       fontSize: '16px',
//       outline: 'none'
//     },
//     inputReadonly: {
//       backgroundColor: '#4b5563',
//       color: '#d1d5db',
//       cursor: 'not-allowed'
//     },
//     submitBtn: {
//       backgroundColor: '#dc2626',
//       border: 'none',
//       borderRadius: '12px',
//       padding: '18px 40px',
//       color: 'white',
//       fontSize: '18px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       width: '100%',
//       marginTop: '20px',
//       transition: 'all 0.3s ease'
//     },
//     submitBtnDisabled: {
//       backgroundColor: '#4b5563',
//       cursor: 'not-allowed'
//     },
//     infoBox: {
//       backgroundColor: '#374151',
//       border: '1px solid #4b5563',
//       borderRadius: '8px',
//       padding: '16px',
//       marginTop: '20px',
//       color: '#cbd5e1',
//       fontSize: '14px'
//     },
//     toast: {
//       position: 'fixed',
//       top: '20px',
//       right: '20px',
//       padding: '16px 24px',
//       borderRadius: '8px',
//       boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
//       zIndex: 1000,
//       display: 'none',
//       color: 'white',
//       fontWeight: '600'
//     },
//     successToast: {
//       backgroundColor: '#10b981'
//     },
//     errorToast: {
//       backgroundColor: '#ef4444'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div>
//           <h1 style={styles.title}>Idle Case Reporting</h1>
//           <p style={styles.subtitle}>Step 2 of 3 - Report Machine Idle Status</p>
//         </div>
//         <div style={styles.headerButtons}>
//           <button 
//             style={styles.backBtn}
//             onClick={handleBack}
//             onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
//             onMouseOut={(e) => e.target.style.backgroundColor = '#374151'}
//           >
//             ← Back to Step 1
//           </button>
//           <button 
//             style={styles.dashboardBtn}
//             onClick={handleDashboard}
//             onMouseOver={(e) => e.target.style.backgroundColor = '#6d28d9'}
//             onMouseOut={(e) => e.target.style.backgroundColor = '#7c3aed'}
//           >
//             Dashboard
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div style={styles.mainContent}>
//         <div style={styles.formContainer}>
//           {/* Form Header */}
//           <div style={styles.formHeader}>
//             <h2 style={styles.formTitle}>Idle Case Report</h2>
//             <p style={styles.formSubtitle}>Report machine idle status and reason for downtime</p>
//           </div>

//           {/* Progress Indicator */}
//           <div style={styles.progressBar}>
//             <div style={{...styles.progressStep, ...styles.completedStep}}>✓</div>
//             <div style={styles.progressLine}></div>
//             <div style={{...styles.progressStep, ...styles.activeStep}}>2</div>
//             <div style={styles.inactiveLine}></div>
//             <div style={{...styles.progressStep, ...styles.inactiveStep}}>3</div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit}>
//             <div style={styles.formGrid}>
//               {/* Machine Number */}
//               <div style={styles.fieldGroup}>
//                 <label style={styles.label}>Machine Number</label>
//                 <select
//                   style={styles.select}
//                   value={machine}
//                   onChange={(e) => setMachine(e.target.value)}
//                   onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
//                   onBlur={(e) => e.target.style.borderColor = '#4b5563'}
//                   required
//                 >
//                   <option value="">Select Machine</option>
//                   <option value="19">Machine 19</option>
//                   <option value="11">Machine 11</option>
//                   <option value="05">Machine 05</option>
//                   <option value="23">Machine 23</option>
//                 </select>
//               </div>

//               {/* Operator */}
//               <div style={styles.fieldGroup}>
//                 <label style={styles.label}>Operator</label>
//                 <input 
//                   style={{...styles.input, ...styles.inputReadonly}}
//                   value={operator} 
//                   readOnly 
//                 />
//               </div>

//               {/* Tool Name */}
//               <div style={styles.fieldGroup}>
//                 <label style={styles.label}>Tool Name</label>
//                 <select
//                   style={styles.select}
//                   value={tool}
//                   onChange={(e) => setTool(e.target.value)}
//                   onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
//                   onBlur={(e) => e.target.style.borderColor = '#4b5563'}
//                   required
//                 >
//                   <option value="">Select Tool</option>
//                   <option value="Drill Machine">Drill Machine</option>
//                   <option value="Cutting Tool">Cutting Tool</option>
//                   <option value="Grinding Tool">Grinding Tool</option>
//                   <option value="Milling Cutter">Milling Cutter</option>
//                 </select>
//               </div>

//               {/* Idle Reason */}
//               <div style={styles.fieldGroup}>
//                 <label style={styles.label}>Idle Reason</label>
//                 <select
//                   style={styles.select}
//                   value={reason}
//                   onChange={(e) => setReason(e.target.value)}
//                   onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
//                   onBlur={(e) => e.target.style.borderColor = '#4b5563'}
//                   required
//                 >
//                   <option value="">Select Reason</option>
//                   <option value="TOOL_BD">Tool Breakdown</option>
//                   <option value="MC_BD">Machine Breakdown</option>
//                   <option value="MAINT">Scheduled Maintenance</option>
//                   <option value="CHANGEOVER">Changeover</option>
//                   <option value="NO_MATERIAL">Material Shortage</option>
//                   <option value="QUALITY_ISSUE">Quality Issue</option>
//                 </select>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button 
//               type="submit"
//               style={{
//                 ...styles.submitBtn,
//                 ...(loading ? styles.submitBtnDisabled : {})
//               }}
//               disabled={loading}
//               onMouseOver={(e) => {
//                 if (!loading) e.target.style.backgroundColor = '#b91c1c';
//               }}
//               onMouseOut={(e) => {
//                 if (!loading) e.target.style.backgroundColor = '#dc2626';
//               }}
//             >
//               {loading ? "Submitting Report..." : "Submit Idle Report"}
//             </button>

//             {/* Info Box */}
//             <div style={styles.infoBox}>
//               Please provide accurate information about the idle machine for proper tracking and analysis.
//             </div>
//           </form>
//         </div>
//       </div>
      
//       {/* Success Toast */}
//       <div 
//         id="success-toast" 
//         style={{...styles.toast, ...styles.successToast}}
//       >
//         Idle Report Saved Successfully!
//       </div>

//       {/* Error Toast */}
//       <div 
//         id="error-toast" 
//         style={{...styles.toast, ...styles.errorToast}}
//       >
//         Error Saving Idle Report!
//       </div>
//     </div>
//   );
// }



// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function IdleCase() {
//   const navigate = useNavigate();
//   const [machine, setMachine] = useState("");
//   const [operator, setOperator] = useState("Auto Operator");
//   const [tool, setTool] = useState("");
//   const [reason, setReason] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Auto-fill function when machine is selected
//   const handleMachineChange = async (selectedMachine) => {
//     setMachine(selectedMachine);
    
//     if (selectedMachine) {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/machines/${selectedMachine}/auto-fill/`);
        
//         if (response.data.success) {
//           setOperator(response.data.operator_name);  // Auto-fill operator
//           setTool(response.data.tool_id);           // Auto-fill tool
//         } else {
//           setOperator("Auto Operator");
//           setTool("Unknown Tool");
//         }
//       } catch (error) {
//         console.error('Error fetching auto-fill data:', error);
//         setOperator("Auto Operator");
//         setTool("Unknown Tool");
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     const data = {
//       machine_no: machine,
//       operator_name: operator,  // Auto-filled value
//       tool_name: tool,         // Auto-filled value  
//       reason: reason,          // User selected
//     };

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/idle-reports/", data);
      
//       if (response.data.success) {
//         document.getElementById('success-toast').style.display = 'block';
//         // Reset form fields
//         setTimeout(() => {
//           setMachine("");
//           setOperator("Auto Operator");
//           setTool("");
//           setReason("");
//           document.getElementById('success-toast').style.display = 'none';
//         }, 2000);
//       } else {
//         document.getElementById('error-toast').style.display = 'block';
//         setTimeout(() => {
//           document.getElementById('error-toast').style.display = 'none';
//         }, 3000);
//       }
//     } catch (error) {
//       console.error('Idle Report Error:', error);
//       document.getElementById('error-toast').style.display = 'block';
//       setTimeout(() => {
//         document.getElementById('error-toast').style.display = 'none';
//       }, 3000);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleBack = () => {
//     navigate("/assign-machine");
//   };

//   const handleDashboard = () => {
//     navigate("/dashboard");
//   };

//   const styles = {
//     container: {
//       minHeight: '100vh',
//       backgroundColor: '#0f172a',
//       color: 'white',
//       padding: '0'
//     },
//     header: {
//       backgroundColor: '#1e293b',
//       borderBottom: '1px solid #334155',
//       padding: '20px 40px',
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center'
//     },
//     headerButtons: {
//       display: 'flex',
//       gap: '12px'
//     },
//     backBtn: {
//       backgroundColor: '#374151',
//       border: 'none',
//       color: 'white',
//       padding: '10px 20px',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       fontSize: '14px'
//     },
//     dashboardBtn: {
//       backgroundColor: '#7c3aed',
//       border: 'none',
//       color: 'white',
//       padding: '10px 20px',
//       borderRadius: '8px',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       fontSize: '14px'
//     },
//     title: {
//       fontSize: '32px',
//       fontWeight: 'bold',
//       margin: 0,
//       color: 'white'
//     },
//     subtitle: {
//       color: '#94a3b8',
//       margin: '5px 0 0 0',
//       fontSize: '16px'
//     },
//     mainContent: {
//       padding: '40px',
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'flex-start',
//       minHeight: 'calc(100vh - 100px)'
//     },
//     formContainer: {
//       backgroundColor: '#1e293b',
//       borderRadius: '16px',
//       border: '1px solid #334155',
//       padding: '40px',
//       width: '100%',
//       maxWidth: '800px',
//       boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
//     },
//     formHeader: {
//       textAlign: 'center',
//       marginBottom: '40px',
//       paddingBottom: '20px',
//       borderBottom: '1px solid #334155'
//     },
//     formTitle: {
//       fontSize: '28px',
//       fontWeight: '600',
//       color: 'white',
//       marginBottom: '8px'
//     },
//     formSubtitle: {
//       color: '#94a3b8',
//       fontSize: '16px'
//     },
//     progressBar: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       marginBottom: '40px',
//       gap: '20px'
//     },
//     progressStep: {
//       width: '40px',
//       height: '40px',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontWeight: 'bold',
//       fontSize: '16px'
//     },
//     activeStep: {
//       backgroundColor: '#7c3aed',
//       color: 'white'
//     },
//     completedStep: {
//       backgroundColor: '#10b981',
//       color: 'white'
//     },
//     inactiveStep: {
//       backgroundColor: '#374151',
//       color: '#9ca3af'
//     },
//     progressLine: {
//       width: '60px',
//       height: '2px',
//       backgroundColor: '#10b981'
//     },
//     inactiveLine: {
//       width: '60px',
//       height: '2px',
//       backgroundColor: '#374151'
//     },
//     formGrid: {
//       display: 'grid',
//       gap: '30px'
//     },
//     fieldGroup: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '8px'
//     },
//     label: {
//       fontSize: '16px',
//       fontWeight: '600',
//       color: 'white',
//       marginBottom: '8px'
//     },
//     select: {
//       backgroundColor: '#374151',
//       border: '1px solid #4b5563',
//       borderRadius: '8px',
//       padding: '16px',
//       color: 'white',
//       fontSize: '16px',
//       outline: 'none',
//       transition: 'all 0.3s ease',
//       appearance: 'none',
//       cursor: 'pointer'
//     },
//     input: {
//       backgroundColor: '#374151',
//       border: '1px solid #4b5563',
//       borderRadius: '8px',
//       padding: '16px',
//       color: 'white',
//       fontSize: '16px',
//       outline: 'none'
//     },
//     inputReadonly: {
//       backgroundColor: '#4b5563',
//       color: '#d1d5db',
//       cursor: 'not-allowed'
//     },
//     submitBtn: {
//       backgroundColor: '#dc2626',
//       border: 'none',
//       borderRadius: '12px',
//       padding: '18px 40px',
//       color: 'white',
//       fontSize: '18px',
//       fontWeight: '600',
//       cursor: 'pointer',
//       width: '100%',
//       marginTop: '20px',
//       transition: 'all 0.3s ease'
//     },
//     submitBtnDisabled: {
//       backgroundColor: '#4b5563',
//       cursor: 'not-allowed'
//     },
//     infoBox: {
//       backgroundColor: '#374151',
//       border: '1px solid #4b5563',
//       borderRadius: '8px',
//       padding: '16px',
//       marginTop: '20px',
//       color: '#cbd5e1',
//       fontSize: '14px'
//     },
//     toast: {
//       position: 'fixed',
//       top: '20px',
//       right: '20px',
//       padding: '16px 24px',
//       borderRadius: '8px',
//       boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
//       zIndex: 1000,
//       display: 'none',
//       color: 'white',
//       fontWeight: '600'
//     },
//     successToast: {
//       backgroundColor: '#10b981'
//     },
//     errorToast: {
//       backgroundColor: '#ef4444'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div>
//           <h1 style={styles.title}>Idle Case Reporting</h1>
//           <p style={styles.subtitle}>Step 2 of 3 - Report Machine Idle Status</p>
//         </div>
//         <div style={styles.headerButtons}>
//           <button 
//             style={styles.backBtn}
//             onClick={handleBack}
//             onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
//             onMouseOut={(e) => e.target.style.backgroundColor = '#374151'}
//           >
//             ← Back to Step 1
//           </button>
//           <button 
//             style={styles.dashboardBtn}
//             onClick={handleDashboard}
//             onMouseOver={(e) => e.target.style.backgroundColor = '#6d28d9'}
//             onMouseOut={(e) => e.target.style.backgroundColor = '#7c3aed'}
//           >
//             Dashboard
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div style={styles.mainContent}>
//         <div style={styles.formContainer}>
//           {/* Form Header */}
//           <div style={styles.formHeader}>
//             <h2 style={styles.formTitle}>Idle Case Report</h2>
//             <p style={styles.formSubtitle}>Report machine idle status and reason for downtime</p>
//           </div>

//           {/* Progress Indicator */}
//           <div style={styles.progressBar}>
//             <div style={{...styles.progressStep, ...styles.completedStep}}>✓</div>
//             <div style={styles.progressLine}></div>
//             <div style={{...styles.progressStep, ...styles.activeStep}}>2</div>
//             <div style={styles.inactiveLine}></div>
//             <div style={{...styles.progressStep, ...styles.inactiveStep}}>3</div>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit}>
//             <div style={styles.formGrid}>
//               {/* Machine Number */}
//               <div style={styles.fieldGroup}>
//                 <label style={styles.label}>Machine Number</label>
//                 <select
//                   style={styles.select}
//                   value={machine}
//                   onChange={(e) => handleMachineChange(e.target.value)}
//                   onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
//                   onBlur={(e) => e.target.style.borderColor = '#4b5563'}
//                   required
//                 >
//                   <option value="">Select Machine</option>
//                   <option value="19">Machine 19</option>
//                   <option value="11">Machine 11</option>
//                   <option value="18">Machine 18</option>
//                   <option value="2">Machine 2</option>
//                   <option value="25">Machine 25</option>
//                   <option value="25">Machine 13</option>
//                 </select>
//               </div>

//               {/* Operator */}
//               <div style={styles.fieldGroup}>
//                 <label style={styles.label}>Operator</label>
//                 <input 
//                   style={{...styles.input, ...styles.inputReadonly}}
//                   value={operator} 
//                   readOnly 
//                 />
//               </div>

//               {/* Tool Name */}
//               <div style={styles.fieldGroup}>
//                 <label style={styles.label}>Tool Name</label>
//                 <input 
//                   style={{...styles.input, ...styles.inputReadonly}}
//                   value={tool} 
//                   readOnly 
//                   placeholder="Auto-filled from database"
//                 />
//               </div>

//               {/* Idle Reason */}
//               <div style={styles.fieldGroup}>
//                 <label style={styles.label}>Idle Reason</label>
//                 <select
//                   style={styles.select}
//                   value={reason}
//                   onChange={(e) => setReason(e.target.value)}
//                   onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
//                   onBlur={(e) => e.target.style.borderColor = '#4b5563'}
//                   required
//                 >
//                   <option value="">Select Reason</option>
//                   <option value="TOOL_BD">Tool Breakdown</option>
//                   <option value="MC_BD">Machine Breakdown</option>
//                   <option value="MAINT">Scheduled Maintenance</option>
//                   <option value="CHANGEOVER">Changeover</option>
//                   <option value="NO_MATERIAL">Material Shortage</option>
//                   <option value="QUALITY_ISSUE">Quality Issue</option>
//                 </select>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <button 
//               type="submit"
//               style={{
//                 ...styles.submitBtn,
//                 ...(loading ? styles.submitBtnDisabled : {})
//               }}
//               disabled={loading}
//               onMouseOver={(e) => {
//                 if (!loading) e.target.style.backgroundColor = '#b91c1c';
//               }}
//               onMouseOut={(e) => {
//                 if (!loading) e.target.style.backgroundColor = '#dc2626';
//               }}
//             >
//               {loading ? "Submitting Report..." : "Submit Idle Report"}
//             </button>

//             {/* Info Box */}
//             <div style={styles.infoBox}>
//               Please provide accurate information about the idle machine for proper tracking and analysis.
//             </div>
//           </form>
//         </div>
//       </div>
      
//       {/* Success Toast */}
//       <div 
//         id="success-toast" 
//         style={{...styles.toast, ...styles.successToast}}
//       >
//         Idle Report Saved Successfully!
//       </div>

//       {/* Error Toast */}
//       <div 
//         id="error-toast" 
//         style={{...styles.toast, ...styles.errorToast}}
//       >
//         Error Saving Idle Report!
//       </div>
//     </div>
//   );
// }



import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function IdleCase() {
  const navigate = useNavigate();
  const [machine, setMachine] = useState("");
  const [operator, setOperator] = useState("Auto Operator");
  const [tool, setTool] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false); // ADDED: Success page state

  // ADDED: Success page styles at the top
  const successStyles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    content: {
      textAlign: 'center',
      color: 'white',
      zIndex: 2,
      animation: 'fadeInUp 0.8s ease-out'
    },
    checkContainer: {
      marginBottom: '30px',
      display: 'flex',
      justifyContent: 'center'
    },
    checkMark: {
      filter: 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.3))' // UPDATED: Red glow for idle report
    },
    messageContainer: {
      marginBottom: '40px'
    },
    title: {
      fontSize: '48px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #dc2626, #ef4444)', // UPDATED: Red gradient
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '15px',
      animation: 'titleGlow 0.8s ease-out 0.5s both'
    },
    subtitle: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#e2e8f0',
      marginBottom: '20px',
      animation: 'fadeIn 0.8s ease-out 0.7s both'
    },
    description: {
      fontSize: '18px',
      color: '#94a3b8',
      lineHeight: '1.6',
      maxWidth: '600px',
      margin: '0 auto',
      animation: 'fadeIn 0.8s ease-out 0.9s both'
    },
    progressContainer: {
      animation: 'fadeIn 0.8s ease-out 1.1s both'
    },
    progressBar: {
      width: '350px', // UPDATED: Wider for 5 seconds
      height: '4px',
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: '2px',
      margin: '0 auto 15px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #dc2626, #ef4444)', // UPDATED: Red gradient
      borderRadius: '2px',
      animation: 'fillProgress 5s linear' // UPDATED: 5 seconds
    },
    progressText: {
      fontSize: '16px',
      color: '#94a3b8',
      fontWeight: '500'
    },
    confetti: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1
    },
    confettiPiece: {
      position: 'absolute',
      top: '-10px',
      width: '8px',
      height: '8px',
      borderRadius: '50%',
      animation: 'confettiFall 5s linear infinite' // UPDATED: 5 seconds
    }
  };

  // Auto-fill function when machine is selected
  const handleMachineChange = async (selectedMachine) => {
    setMachine(selectedMachine);
    
    if (selectedMachine) {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/machines/${selectedMachine}/auto-fill/`);
        
        if (response.data.success) {
          setOperator(response.data.operator_name);
          setTool(response.data.tool_id);
        } else {
          setOperator("Auto Operator");
          setTool("Unknown Tool");
        }
      } catch (error) {
        console.error('Error fetching auto-fill data:', error);
        setOperator("Auto Operator");
        setTool("Unknown Tool");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = {
      machine_no: machine,
      operator_name: operator,
      tool_name: tool,
      reason: reason,
    };

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/idle-reports/", data);
      
      if (response.data.success) {
        setLoading(false);
        setShowSuccess(true); // UPDATED: Show success page
        
        // UPDATED: Redirect to dashboard after 5 seconds
        setTimeout(() => {
          navigate("/dashboard");
        }, 5000);
      } else {
        setLoading(false);
        document.getElementById('error-toast').style.display = 'block';
        setTimeout(() => {
          document.getElementById('error-toast').style.display = 'none';
        }, 3000);
      }
    } catch (error) {
      console.error('Idle Report Error:', error);
      setLoading(false);
      document.getElementById('error-toast').style.display = 'block';
      setTimeout(() => {
        document.getElementById('error-toast').style.display = 'none';
      }, 3000);
    }
  };

  const handleDashboard = () => {
    navigate("/dashboard");
  };

  // UPDATED: Success Page Component
  if (showSuccess) {
    return (
      <div style={successStyles.container}>
        <div style={successStyles.content}>
          {/* Animated Check Mark with Red Theme */}
          <div style={successStyles.checkContainer}>
            <div style={successStyles.checkMark}>
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle
                  cx="40"
                  cy="40"
                  r="38"
                  stroke="#dc2626"
                  strokeWidth="4"
                  fill="rgba(220, 38, 38, 0.1)"
                  style={{
                    animation: 'scaleIn 0.6s ease-out'
                  }}
                />
                <path
                  d="M25 40L35 50L55 30"
                  stroke="#dc2626"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: '50',
                    strokeDashoffset: '50',
                    animation: 'drawCheck 0.8s ease-out 0.3s forwards'
                  }}
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <div style={successStyles.messageContainer}>
            <h1 style={successStyles.title}>Thank You So Much!</h1>
            <h2 style={successStyles.subtitle}>Idle Report Submitted Successfully</h2>
            {/* UPDATED: Enhanced success message for idle report */}
            <p style={successStyles.description}>
              <strong>Thank you so much!</strong> You have submitted the idle report information correctly.
              <br />
              <br />
              <strong style={{color: '#dc2626'}}>Machine {machine}</strong> idle report has been successfully submitted with reason: <strong style={{color: '#ef4444'}}>{reason}</strong>.
              <br />
              <br />
              Your idle report details have been saved and will be processed for analysis!
            </p>
          </div>

          {/* Progress Bar for 5 seconds */}
          <div style={successStyles.progressContainer}>
            <div style={successStyles.progressBar}>
              <div style={successStyles.progressFill}></div>
            </div>
            <p style={successStyles.progressText}>Redirecting to dashboard in 5 seconds...</p>
          </div>

          {/* Enhanced Confetti Animation with Red Theme */}
          <div style={successStyles.confetti}>
            {[...Array(70)].map((_, i) => ( // UPDATED: More confetti for 5 seconds
              <div
                key={i}
                style={{
                  ...successStyles.confettiPiece,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  backgroundColor: ['#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fed7d7', '#fecaca'][Math.floor(Math.random() * 6)] // UPDATED: Red themed colors
                }}
              />
            ))}
          </div>
        </div>

        {/* ADDED: CSS Animations for 5 seconds */}
        <style jsx>{`
          @keyframes scaleIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          
          @keyframes drawCheck {
            to { stroke-dashoffset: 0; }
          }
          
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          
          @keyframes fadeIn {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          
          @keyframes titleGlow {
            0% { opacity: 0; transform: scale(0.8); }
            100% { opacity: 1; transform: scale(1); }
          }
          
          @keyframes fillProgress {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          
          @keyframes confettiFall {
            0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
            100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
          }
        `}</style>
      </div>
    );
  }

  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: '#0f172a',
      color: 'white',
      padding: '0'
    },
    header: {
      backgroundColor: '#1e293b',
      borderBottom: '1px solid #334155',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    headerButtons: {
      display: 'flex',
      gap: '12px'
    },
    dashboardBtn: {
      backgroundColor: '#7c3aed',
      border: 'none',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '14px'
    },
    title: {
      fontSize: '32px',
      fontWeight: 'bold',
      margin: 0,
      color: 'white'
    },
    subtitle: {
      color: '#94a3b8',
      margin: '5px 0 0 0',
      fontSize: '16px'
    },
    mainContent: {
      padding: '40px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-start',
      minHeight: 'calc(100vh - 100px)'
    },
    formContainer: {
      backgroundColor: '#1e293b',
      borderRadius: '16px',
      border: '1px solid #334155',
      padding: '40px',
      width: '100%',
      maxWidth: '800px',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    },
    formHeader: {
      textAlign: 'center',
      marginBottom: '40px',
      paddingBottom: '20px',
      borderBottom: '1px solid #334155'
    },
    formTitle: {
      fontSize: '28px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '8px'
    },
    formSubtitle: {
      color: '#94a3b8',
      fontSize: '16px'
    },
    progressBar: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '40px',
      gap: '20px'
    },
    progressStep: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 'bold',
      fontSize: '16px'
    },
    activeStep: {
      backgroundColor: '#7c3aed',
      color: 'white'
    },
    completedStep: {
      backgroundColor: '#10b981',
      color: 'white'
    },
    inactiveStep: {
      backgroundColor: '#374151',
      color: '#9ca3af'
    },
    progressLine: {
      width: '60px',
      height: '2px',
      backgroundColor: '#10b981'
    },
    inactiveLine: {
      width: '60px',
      height: '2px',
      backgroundColor: '#374151'
    },
    formGrid: {
      display: 'grid',
      gap: '30px'
    },
    fieldGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },
    label: {
      fontSize: '16px',
      fontWeight: '600',
      color: 'white',
      marginBottom: '8px'
    },
    select: {
      backgroundColor: '#374151',
      border: '1px solid #4b5563',
      borderRadius: '8px',
      padding: '16px',
      color: 'white',
      fontSize: '16px',
      outline: 'none',
      transition: 'all 0.3s ease',
      appearance: 'none',
      cursor: 'pointer'
    },
    input: {
      backgroundColor: '#374151',
      border: '1px solid #4b5563',
      borderRadius: '8px',
      padding: '16px',
      color: 'white',
      fontSize: '16px',
      outline: 'none'
    },
    inputReadonly: {
      backgroundColor: '#4b5563',
      color: '#d1d5db',
      cursor: 'not-allowed'
    },
    submitBtn: {
      backgroundColor: '#dc2626',
      border: 'none',
      borderRadius: '12px',
      padding: '18px 40px',
      color: 'white',
      fontSize: '18px',
      fontWeight: '600',
      cursor: 'pointer',
      width: '100%',
      marginTop: '20px',
      transition: 'all 0.3s ease'
    },
    submitBtnDisabled: {
      backgroundColor: '#4b5563',
      cursor: 'not-allowed'
    },
    infoBox: {
      backgroundColor: '#374151',
      border: '1px solid #4b5563',
      borderRadius: '8px',
      padding: '16px',
      marginTop: '20px',
      color: '#cbd5e1',
      fontSize: '14px'
    },
    toast: {
      position: 'fixed',
      top: '20px',
      right: '20px',
      padding: '16px 24px',
      borderRadius: '8px',
      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.25)',
      zIndex: 1000,
      display: 'none',
      color: 'white',
      fontWeight: '600'
    },
    errorToast: {
      backgroundColor: '#ef4444'
    }
  };

  return (
    <div style={styles.container}>
      {/* Header - REMOVED: Back to Step 1 button */}
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>Idle Case Reporting</h1>
          <p style={styles.subtitle}>Submit Machine Idle Status Report</p>
        </div>
        <div style={styles.headerButtons}>
          <button 
            style={styles.dashboardBtn}
            onClick={handleDashboard}
            onMouseOver={(e) => e.target.style.backgroundColor = '#6d28d9'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#7c3aed'}
          >
            Dashboard
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        <div style={styles.formContainer}>
          {/* Form Header */}
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Idle Case Report</h2>
            <p style={styles.formSubtitle}>Report machine idle status and reason for downtime</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div style={styles.formGrid}>
              {/* Machine Number */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Machine Number</label>
                <select
                  style={styles.select}
                  value={machine}
                  onChange={(e) => handleMachineChange(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                  onBlur={(e) => e.target.style.borderColor = '#4b5563'}
                  required
                >
                  <option value="">Select Machine</option>
                  <option value="19">Machine 19</option>
                  <option value="11">Machine 11</option>
                  <option value="18">Machine 18</option>
                  <option value="2">Machine 2</option>
                  <option value="25">Machine 25</option>
                  <option value="13">Machine 13</option>
                </select>
              </div>

              {/* Operator */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Operator</label>
                <input 
                  style={{...styles.input, ...styles.inputReadonly}}
                  value={operator} 
                  readOnly 
                />
              </div>

              {/* Tool Name */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Tool Name</label>
                <input 
                  style={{...styles.input, ...styles.inputReadonly}}
                  value={tool} 
                  readOnly 
                  placeholder="Auto-filled from database"
                />
              </div>

              {/* Idle Reason */}
              <div style={styles.fieldGroup}>
                <label style={styles.label}>Idle Reason</label>
                <select
                  style={styles.select}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
                  onBlur={(e) => e.target.style.borderColor = '#4b5563'}
                  required
                >
                  <option value="">Select Reason</option>
                  <option value="TOOL_BD">Tool Breakdown</option>
                  <option value="MC_BD">Machine Breakdown</option>
                  <option value="MAINT">Scheduled Maintenance</option>
                  <option value="CHANGEOVER">Changeover</option>
                  <option value="NO_MATERIAL">Material Shortage</option>
                  <option value="QUALITY_ISSUE">Quality Issue</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit"
              style={{
                ...styles.submitBtn,
                ...(loading ? styles.submitBtnDisabled : {})
              }}
              disabled={loading}
              onMouseOver={(e) => {
                if (!loading) e.target.style.backgroundColor = '#dc2626ff';
              }}
              onMouseOut={(e) => {
                if (!loading) e.target.style.backgroundColor = '#dc2626ff';
              }}
            >
              {loading ? "Submitting Report..." : "Submit Idle Report"}
            </button>

            {/* Info Box */}
            <div style={styles.infoBox}>
              Please provide accurate information about the idle machine for proper tracking and analysis.
            </div>
          </form>
        </div>
      </div>
      
      {/* Error Toast */}
      <div 
        id="error-toast" 
        style={{...styles.toast, ...styles.errorToast}}
      >
        Error Saving Idle Report!
      </div>
    </div>
  );
}
