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
//   const [showSuccess, setShowSuccess] = useState(false); // ADDED: Success page state

//   // ADDED: Success page styles at the top
//   const successStyles = {
//     container: {
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       position: 'relative',
//       overflow: 'hidden'
//     },
//     content: {
//       textAlign: 'center',
//       color: 'white',
//       zIndex: 2,
//       animation: 'fadeInUp 0.8s ease-out'
//     },
//     checkContainer: {
//       marginBottom: '30px',
//       display: 'flex',
//       justifyContent: 'center'
//     },
//     checkMark: {
//       filter: 'drop-shadow(0 0 20px rgba(220, 38, 38, 0.3))' // UPDATED: Red glow for idle report
//     },
//     messageContainer: {
//       marginBottom: '40px'
//     },
//     title: {
//       fontSize: '48px',
//       fontWeight: '800',
//       background: 'linear-gradient(135deg, #dc2626, #ef4444)', // UPDATED: Red gradient
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text',
//       marginBottom: '15px',
//       animation: 'titleGlow 0.8s ease-out 0.5s both'
//     },
//     subtitle: {
//       fontSize: '24px',
//       fontWeight: '600',
//       color: '#e2e8f0',
//       marginBottom: '20px',
//       animation: 'fadeIn 0.8s ease-out 0.7s both'
//     },
//     description: {
//       fontSize: '18px',
//       color: '#94a3b8',
//       lineHeight: '1.6',
//       maxWidth: '600px',
//       margin: '0 auto',
//       animation: 'fadeIn 0.8s ease-out 0.9s both'
//     },
//     progressContainer: {
//       animation: 'fadeIn 0.8s ease-out 1.1s both'
//     },
//     progressBar: {
//       width: '350px', // UPDATED: Wider for 5 seconds
//       height: '4px',
//       backgroundColor: 'rgba(255,255,255,0.2)',
//       borderRadius: '2px',
//       margin: '0 auto 15px',
//       overflow: 'hidden'
//     },
//     progressFill: {
//       height: '100%',
//       background: 'linear-gradient(90deg, #dc2626, #ef4444)', // UPDATED: Red gradient
//       borderRadius: '2px',
//       animation: 'fillProgress 5s linear' // UPDATED: 5 seconds
//     },
//     progressText: {
//       fontSize: '16px',
//       color: '#94a3b8',
//       fontWeight: '500'
//     },
//     confetti: {
//       position: 'absolute',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       pointerEvents: 'none',
//       zIndex: 1
//     },
//     confettiPiece: {
//       position: 'absolute',
//       top: '-10px',
//       width: '8px',
//       height: '8px',
//       borderRadius: '50%',
//       animation: 'confettiFall 5s linear infinite' // UPDATED: 5 seconds
//     }
//   };

//   // Auto-fill function when machine is selected
//   const handleMachineChange = async (selectedMachine) => {
//     setMachine(selectedMachine);
    
//     if (selectedMachine) {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/machines/${selectedMachine}/auto-fill/`);
        
//         if (response.data.success) {
//           setOperator(response.data.operator_name);
//           setTool(response.data.tool_id);
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
//       operator_name: operator,
//       tool_name: tool,
//       reason: reason,
//     };

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/idle-reports/", data);
      
//       if (response.data.success) {
//         setLoading(false);
//         setShowSuccess(true); // UPDATED: Show success page
        
//         // UPDATED: Redirect to dashboard after 5 seconds
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 5000);
//       } else {
//         setLoading(false);
//         document.getElementById('error-toast').style.display = 'block';
//         setTimeout(() => {
//           document.getElementById('error-toast').style.display = 'none';
//         }, 3000);
//       }
//     } catch (error) {
//       console.error('Idle Report Error:', error);
//       setLoading(false);
//       document.getElementById('error-toast').style.display = 'block';
//       setTimeout(() => {
//         document.getElementById('error-toast').style.display = 'none';
//       }, 3000);
//     }
//   };

//   const handleDashboard = () => {
//     navigate("/dashboard");
//   };

//   // UPDATED: Success Page Component
//   if (showSuccess) {
//     return (
//       <div style={successStyles.container}>
//         <div style={successStyles.content}>
//           {/* Animated Check Mark with Red Theme */}
//           <div style={successStyles.checkContainer}>
//             <div style={successStyles.checkMark}>
//               <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
//                 <circle
//                   cx="40"
//                   cy="40"
//                   r="38"
//                   stroke="#dc2626"
//                   strokeWidth="4"
//                   fill="rgba(220, 38, 38, 0.1)"
//                   style={{
//                     animation: 'scaleIn 0.6s ease-out'
//                   }}
//                 />
//                 <path
//                   d="M25 40L35 50L55 30"
//                   stroke="#dc2626"
//                   strokeWidth="4"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   style={{
//                     strokeDasharray: '50',
//                     strokeDashoffset: '50',
//                     animation: 'drawCheck 0.8s ease-out 0.3s forwards'
//                   }}
//                 />
//               </svg>
//             </div>
//           </div>

//           {/* Success Message */}
//           <div style={successStyles.messageContainer}>
//             <h1 style={successStyles.title}>Thank You So Much!</h1>
//             <h2 style={successStyles.subtitle}>Idle Report Submitted Successfully</h2>
//             {/* UPDATED: Enhanced success message for idle report */}
//             <p style={successStyles.description}>
//               <strong>Thank you so much!</strong> You have submitted the idle report information correctly.
//               <br />
//               <br />
//               <strong style={{color: '#dc2626'}}>Machine {machine}</strong> idle report has been successfully submitted with reason: <strong style={{color: '#ef4444'}}>{reason}</strong>.
//               <br />
//               <br />
//               Your idle report details have been saved and will be processed for analysis!
//             </p>
//           </div>

//           {/* Progress Bar for 5 seconds */}
//           <div style={successStyles.progressContainer}>
//             <div style={successStyles.progressBar}>
//               <div style={successStyles.progressFill}></div>
//             </div>
//             <p style={successStyles.progressText}>Redirecting to dashboard in 5 seconds...</p>
//           </div>

//           {/* Enhanced Confetti Animation with Red Theme */}
//           <div style={successStyles.confetti}>
//             {[...Array(70)].map((_, i) => ( // UPDATED: More confetti for 5 seconds
//               <div
//                 key={i}
//                 style={{
//                   ...successStyles.confettiPiece,
//                   left: `${Math.random() * 100}%`,
//                   animationDelay: `${Math.random() * 5}s`,
//                   backgroundColor: ['#dc2626', '#ef4444', '#f87171', '#fca5a5', '#fed7d7', '#fecaca'][Math.floor(Math.random() * 6)] // UPDATED: Red themed colors
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* ADDED: CSS Animations for 5 seconds */}
//         <style jsx>{`
//           @keyframes scaleIn {
//             0% { transform: scale(0); opacity: 0; }
//             100% { transform: scale(1); opacity: 1; }
//           }
          
//           @keyframes drawCheck {
//             to { stroke-dashoffset: 0; }
//           }
          
//           @keyframes fadeInUp {
//             0% { opacity: 0; transform: translateY(30px); }
//             100% { opacity: 1; transform: translateY(0); }
//           }
          
//           @keyframes fadeIn {
//             0% { opacity: 0; }
//             100% { opacity: 1; }
//           }
          
//           @keyframes titleGlow {
//             0% { opacity: 0; transform: scale(0.8); }
//             100% { opacity: 1; transform: scale(1); }
//           }
          
//           @keyframes fillProgress {
//             0% { width: 0%; }
//             100% { width: 100%; }
//           }
          
//           @keyframes confettiFall {
//             0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
//             100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
//           }
//         `}</style>
//       </div>
//     );
//   }

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
//     errorToast: {
//       backgroundColor: '#ef4444'
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header - REMOVED: Back to Step 1 button */}
//       <div style={styles.header}>
//         <div>
//           <h1 style={styles.title}>Idle Case Reporting</h1>
//           <p style={styles.subtitle}>Submit Machine Idle Status Report</p>
//         </div>
//         <div style={styles.headerButtons}>
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
//                   <option value="13">Machine 13</option>
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
//                 if (!loading) e.target.style.backgroundColor = '#dc2626ff';
//               }}
//               onMouseOut={(e) => {
//                 if (!loading) e.target.style.backgroundColor = '#dc2626ff';
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
import Sidebar from './Sidebar';

// ✅ Simple icons
import { 
  FaWrench,
  FaCog,
  FaCalendarCheck,
  FaSyncAlt,
  FaBoxOpen,
  FaExclamationTriangle,
  FaIndustry,
  FaUser,
  FaTools
} from 'react-icons/fa';


export default function IdleCase({ onLogout }) {
  const navigate = useNavigate();
  const [machine, setMachine] = useState("");
  const [plant, setPlant] = useState("");
  const [operator, setOperator] = useState("Auto Operator");
  const [tool, setTool] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);


  // Plant-wise machine mapping
  const plantMachines = {
    "1": Array.from({length: 57}, (_, i) => i + 1),
    "2": Array.from({length: 26}, (_, i) => i + 1)
  };


  // Reason options with Icons
  const reasonOptions = [
    { value: "TOOL_BD", label: "Tool Breakdown", icon: FaWrench, color: "#ef4444" },
    { value: "MC_BD", label: "Machine Breakdown", icon: FaCog, color: "#dc2626" },
    { value: "MAINT", label: "Scheduled Maintenance", icon: FaCalendarCheck, color: "#f59e0b" },
    { value: "CHANGEOVER", label: "Changeover", icon: FaSyncAlt, color: "#10b981" },
    { value: "NO_MATERIAL", label: "Material Shortage", icon: FaBoxOpen, color: "#8b5cf6" },
    { value: "QUALITY_ISSUE", label: "Quality Issue", icon: FaExclamationTriangle, color: "#f97316" }
  ];


  // Success page styles
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
      filter: 'drop-shadow(0 0 20px rgba(6, 182, 212, 0.5))'
    },
    messageContainer: {
      marginBottom: '40px'
    },
    title: {
      fontSize: '48px',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
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
      width: '350px',
      height: '4px',
      backgroundColor: 'rgba(255,255,255,0.2)',
      borderRadius: '2px',
      margin: '0 auto 15px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      background: 'linear-gradient(90deg, #06b6d4, #0891b2)',
      borderRadius: '2px',
      animation: 'fillProgress 5s linear'
    },
    progressText: {
      fontSize: '16px',
      color: '#94a3b8',
      fontWeight: '500'
    }
  };


  // Auto-fill function
  const handleMachineChange = async (selectedMachine) => {
    setMachine(selectedMachine);
    
    if (selectedMachine && plant) {
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
      plant_no: plant,
      machine_no: machine,
      operator_name: operator,
      tool_name: tool,
      reason: reason,
    };


    try {
      const response = await axios.post("http://127.0.0.1:8000/api/idle-reports/", data);
      
      if (response.data.success) {
        setLoading(false);
        setShowSuccess(true);
        
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


  // Success Page
  if (showSuccess) {
    return (
      <div style={successStyles.container}>
        <div style={successStyles.content}>
          <div style={successStyles.checkContainer}>
            <div style={successStyles.checkMark}>
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none">
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  stroke="#06b6d4"
                  strokeWidth="4"
                  fill="rgba(6, 182, 212, 0.1)"
                  style={{ animation: 'scaleIn 0.6s ease-out' }}
                />
                <path
                  d="M30 50L45 65L70 35"
                  stroke="#06b6d4"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    strokeDasharray: '60',
                    strokeDashoffset: '60',
                    animation: 'drawCheck 0.8s ease-out 0.3s forwards'
                  }}
                />
              </svg>
            </div>
          </div>

          <div style={successStyles.messageContainer}>
            <h1 style={successStyles.title}>Report Submitted Successfully!</h1>
            <h2 style={successStyles.subtitle}>Idle Case Recorded</h2>
            <p style={successStyles.description}>
              <strong style={{color: '#06b6d4'}}>Plant {plant}, Machine {machine}</strong> idle report submitted.
              <br /><br />
              Reason: <strong style={{color: '#fbbf24'}}>{reasonOptions.find(r => r.value === reason)?.label}</strong>
              <br /><br />
              Your report has been saved for analysis.
            </p>
          </div>

          <div style={successStyles.progressContainer}>
            <div style={successStyles.progressBar}>
              <div style={successStyles.progressFill}></div>
            </div>
            <p style={successStyles.progressText}>Redirecting to dashboard in 5 seconds...</p>
          </div>
        </div>

        <style>{`
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
        `}</style>
      </div>
    );
  }


  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#1a202c' }}>
      <Sidebar onLogout={onLogout} />
      
      {/* ✅ BIGGER WIDTH - 700px */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-start',
        padding: '50px 40px',
        minHeight: '100vh',
        overflowY: 'auto'
      }}>
        <div style={{ width: '100%', maxWidth: '700px' }}>
          
          {/* Header */}
          <div style={{
            marginBottom: '35px',
            textAlign: 'center'
          }}>
            <h1 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#ffffff',
              marginBottom: '8px',
              letterSpacing: '-0.5px'
            }}>
              Idle Case Reporting
            </h1>
            <p style={{ 
              color: '#9ca3af', 
              fontSize: '14px',
              fontWeight: '400'
            }}>
              Report machine idle status and downtime reason
            </p>
          </div>

          {/* Form Container */}
          <div style={{
            backgroundColor: '#374151',
            borderRadius: '14px',
            padding: '36px',
            boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)'
          }}>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '24px' }}>
                
                {/* Plant Selection */}
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#d1d5db',
                    marginBottom: '10px'
                  }}>
                    <FaIndustry size={15} color="#9ca3af" />
                    Select Plant
                  </label>
                  <select
                    value={plant}
                    onChange={(e) => {
                      setPlant(e.target.value);
                      setMachine("");
                      setOperator("Auto Operator");
                      setTool("");
                    }}
                    required
                    style={{
                      width: '100%',
                      backgroundColor: '#1f2937',
                      border: '1px solid #4b5563',
                      borderRadius: '10px',
                      padding: '13px 16px',
                      color: '#e5e7eb',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      appearance: 'none',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#06b6d4'}
                    onBlur={(e) => e.target.style.borderColor = '#4b5563'}
                  >
                    <option value="">Choose Plant</option>
                    <option value="1">Plant 1 (57 Machines)</option>
                    <option value="2">Plant 2 (26 Machines)</option>
                  </select>
                </div>

                {/* Machine Selection */}
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#d1d5db',
                    marginBottom: '10px'
                  }}>
                    <FaCog size={15} color="#9ca3af" />
                    Machine Number
                  </label>
                  <select
                    value={machine}
                    onChange={(e) => handleMachineChange(e.target.value)}
                    required
                    disabled={!plant}
                    style={{
                      width: '100%',
                      backgroundColor: plant ? '#1f2937' : '#4b5563',
                      border: '1px solid #4b5563',
                      borderRadius: '10px',
                      padding: '13px 16px',
                      color: plant ? '#e5e7eb' : '#9ca3af',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: plant ? 'pointer' : 'not-allowed',
                      transition: 'all 0.2s ease',
                      appearance: 'none',
                      backgroundImage: plant ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%239ca3af' d='M6 9L1 4h10z'/%3E%3C/svg%3E")` : 'none',
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 16px center'
                    }}
                    onFocus={(e) => plant && (e.target.style.borderColor = '#06b6d4')}
                    onBlur={(e) => e.target.style.borderColor = '#4b5563'}
                  >
                    <option value="">Select Machine</option>
                    {plant && plantMachines[plant].map(num => (
                      <option key={num} value={num}>Machine {num}</option>
                    ))}
                  </select>
                </div>

                {/* Operator - Auto-filled */}
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#d1d5db',
                    marginBottom: '10px'
                  }}>
                    <FaUser size={15} color="#9ca3af" />
                    Operator Name
                  </label>
                  <input
                    value={operator}
                    readOnly
                    style={{
                      width: '100%',
                      backgroundColor: '#4b5563',
                      border: '1px solid #4b5563',
                      borderRadius: '10px',
                      padding: '13px 16px',
                      color: '#d1d5db',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'not-allowed'
                    }}
                  />
                </div>

                {/* Tool - Auto-filled */}
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#d1d5db',
                    marginBottom: '10px'
                  }}>
                    <FaTools size={15} color="#9ca3af" />
                    Tool Name
                  </label>
                  <input
                    value={tool}
                    readOnly
                    placeholder="Auto-filled from database"
                    style={{
                      width: '100%',
                      backgroundColor: '#4b5563',
                      border: '1px solid #4b5563',
                      borderRadius: '10px',
                      padding: '13px 16px',
                      color: '#d1d5db',
                      fontSize: '14px',
                      outline: 'none',
                      cursor: 'not-allowed'
                    }}
                  />
                </div>

                {/* Idle Reason - 2 Column Grid */}
                <div>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#d1d5db',
                    marginBottom: '12px'
                  }}>
                    <FaExclamationTriangle size={15} color="#9ca3af" />
                    Idle Reason
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                    {reasonOptions.map((option) => {
                      const Icon = option.icon;
                      const isSelected = reason === option.value;
                      
                      return (
                        <div
                          key={option.value}
                          onClick={() => setReason(option.value)}
                          style={{
                            backgroundColor: isSelected ? `${option.color}15` : '#1f2937',
                            border: `2px solid ${isSelected ? option.color : '#4b5563'}`,
                            borderRadius: '10px',
                            padding: '14px',
                            cursor: 'pointer',
                            transition: 'all 0.25s ease',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = option.color;
                            e.currentTarget.style.backgroundColor = `${option.color}20`;
                            e.currentTarget.style.transform = 'translateY(-2px)';
                            e.currentTarget.style.boxShadow = `0 4px 12px ${option.color}40`;
                          }}
                          onMouseLeave={(e) => {
                            if (!isSelected) {
                              e.currentTarget.style.borderColor = '#4b5563';
                              e.currentTarget.style.backgroundColor = '#1f2937';
                            } else {
                              e.currentTarget.style.borderColor = option.color;
                              e.currentTarget.style.backgroundColor = `${option.color}15`;
                            }
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                          }}
                        >
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '8px',
                            backgroundColor: option.color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <Icon size={16} color="#ffffff" />
                          </div>
                          <span style={{
                            color: isSelected ? '#e5e7eb' : '#9ca3af',
                            fontSize: '14px',
                            fontWeight: isSelected ? '600' : '500',
                            lineHeight: '1.4'
                          }}>
                            {option.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !machine || !reason}
                style={{
                  width: '100%',
                  background: loading || !machine || !reason 
                    ? '#4b5563' 
                    : '#06b6d4',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '15px',
                  color: 'white',
                  fontSize: '15px',
                  fontWeight: '600',
                  cursor: loading || !machine || !reason ? 'not-allowed' : 'pointer',
                  marginTop: '28px',
                  transition: 'all 0.2s ease',
                  boxShadow: loading || !machine || !reason ? 'none' : '0 4px 14px rgba(6, 182, 212, 0.35)',
                  letterSpacing: '0.3px'
                }}
                onMouseEnter={(e) => {
                  if (!loading && machine && reason) {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 6px 20px rgba(6, 182, 212, 0.45)';
                    e.target.style.backgroundColor = '#0891b2';
                  }
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 14px rgba(6, 182, 212, 0.35)';
                  e.target.style.backgroundColor = '#06b6d4';
                }}
              >
                {loading ? "⏳ Submitting Report..." : "✓ Submit Idle Report"}
              </button>

              {/* Info Box */}
              <div style={{
                backgroundColor: '#78350f',
                border: '1px solid #92400e',
                borderRadius: '10px',
                padding: '14px',
                marginTop: '18px',
                color: '#fbbf24',
                fontSize: '13px',
                display: 'flex',
                gap: '12px',
                alignItems: 'start',
                lineHeight: '1.5'
              }}>
                <FaExclamationTriangle size={15} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>
                  Please provide accurate information about the idle machine for proper tracking and analysis.
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Error Toast */}
      <div
        id="error-toast"
        style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          backgroundColor: '#dc2626',
          color: 'white',
          padding: '14px 22px',
          borderRadius: '10px',
          boxShadow: '0 8px 24px rgba(220, 38, 38, 0.4)',
          zIndex: 1000,
          display: 'none',
          fontWeight: '600',
          fontSize: '14px',
          border: '1px solid #991b1b'
        }}
      >
        ❌ Error Saving Idle Report!
      </div>
    </div>
  );
}
