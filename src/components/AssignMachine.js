// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// export default function AssignMachine() {
//   const navigate = useNavigate();
//   const [machine, setMachine] = useState("");
//   const [operator, setOperator] = useState("");
//   const [date, setDate] = useState("");
//   const [shift, setShift] = useState("A");
//   const [loading, setLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   // FIXED: Define successStyles at the top before using it
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
//       filter: 'drop-shadow(0 0 20px rgba(16, 185, 129, 0.3))'
//     },
//     messageContainer: {
//       marginBottom: '40px'
//     },
//     title: {
//       fontSize: '48px',
//       fontWeight: '800',
//       background: 'linear-gradient(135deg, #10b981, #3b82f6)',
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
//       fontSize: '18px', // UPDATED: Bigger font
//       color: '#94a3b8',
//       lineHeight: '1.6',
//       maxWidth: '600px', // UPDATED: Wider
//       margin: '0 auto',
//       animation: 'fadeIn 0.8s ease-out 0.9s both'
//     },
//     progressContainer: {
//       animation: 'fadeIn 0.8s ease-out 1.1s both'
//     },
//     progressBar: {
//       width: '300px',
//       height: '4px',
//       backgroundColor: 'rgba(255,255,255,0.2)',
//       borderRadius: '2px',
//       margin: '0 auto 15px',
//       overflow: 'hidden'
//     },
//     progressFill: {
//       height: '100%',
//       background: 'linear-gradient(90deg, #10b981, #3b82f6)',
//       borderRadius: '2px',
//       animation: 'fillProgress 3s linear'
//     },
//     progressText: {
//       fontSize: '16px', // UPDATED: Bigger font
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
//       animation: 'confettiFall 3s linear infinite'
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
    
//     const data = {
//       machine_no: machine,
//       operator_name: operator,
//       shift: shift,
//       start_time: date,
//     };

//     try {
//       const response = await axios.post("http://127.0.0.1:8000/api/assignments/", data);
      
//       if (response.data.success) {
//         setLoading(false);
//         setShowSuccess(true);
        
//         // FIXED: Redirect to dashboard after exactly 3 seconds
//         setTimeout(() => {
//           navigate("/dashboard");
//         }, 3000);
//       } else {
//         setLoading(false);
//         alert("❌ Error: " + response.data.message);
//       }
//     } catch (error) {
//       console.error('Assignment Error:', error);
//       setLoading(false);
//       alert("❌ Error saving assignment! Check console for details.");
//     }
//   };

//   const handleBack = () => {
//     navigate("/dashboard");
//   };

//   // FIXED: Success Page Component - moved after successStyles definition
//   if (showSuccess) {
//     return (
//       <div style={successStyles.container}>
//         <div style={successStyles.content}>
//           {/* Animated Check Mark */}
//           <div style={successStyles.checkContainer}>
//             <div style={successStyles.checkMark}>
//               <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
//                 <circle
//                   cx="40"
//                   cy="40"
//                   r="38"
//                   stroke="#10b981"
//                   strokeWidth="4"
//                   fill="rgba(16, 185, 129, 0.1)"
//                   style={{
//                     animation: 'scaleIn 0.6s ease-out'
//                   }}
//                 />
//                 <path
//                   d="M25 40L35 50L55 30"
//                   stroke="#10b981"
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
//             <h2 style={successStyles.subtitle}>Assignment Completed Successfully</h2>
//             {/* UPDATED: Enhanced success message */}
//             <p style={successStyles.description}>
//               <strong>Thank you so much!</strong> You have submitted your operator information correctly.
//               <br />
//               <br />
//               <strong style={{color: '#10b981'}}>{operator}</strong> has been successfully assigned to <strong style={{color: '#3b82f6'}}>Machine {machine}</strong> for <strong style={{color: '#8b5cf6'}}>Shift {shift}</strong>.
//               <br />
//               <br />
//               Your assignment details have been saved and processed successfully!
//             </p>
//           </div>

//           {/* Progress Bar */}
//           <div style={successStyles.progressContainer}>
//             <div style={successStyles.progressBar}>
//               <div style={successStyles.progressFill}></div>
//             </div>
//             <p style={successStyles.progressText}>Redirecting to dashboard in 3 seconds...</p>
//           </div>

//           {/* Enhanced Confetti Animation */}
//           <div style={successStyles.confetti}>
//             {[...Array(60)].map((_, i) => (
//               <div
//                 key={i}
//                 style={{
//                   ...successStyles.confettiPiece,
//                   left: `${Math.random() * 100}%`,
//                   animationDelay: `${Math.random() * 3}s`,
//                   backgroundColor: ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'][Math.floor(Math.random() * 6)]
//                 }}
//               />
//             ))}
//           </div>
//         </div>

//         {/* ADDED: CSS Animations */}
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
//     inactiveStep: {
//       backgroundColor: '#374151',
//       color: '#9ca3af'
//     },
//     progressLine: {
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
//     input: {
//       backgroundColor: '#374151',
//       border: '1px solid #4b5563',
//       borderRadius: '8px',
//       padding: '16px',
//       color: 'white',
//       fontSize: '16px',
//       outline: 'none',
//       transition: 'all 0.3s ease'
//     },
//     shiftContainer: {
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       gap: '16px'
//     },
//     shiftOption: {
//       backgroundColor: '#374151',
//       border: '2px solid #4b5563',
//       borderRadius: '12px',
//       padding: '20px',
//       cursor: 'pointer',
//       textAlign: 'center',
//       transition: 'all 0.3s ease'
//     },
//     shiftOptionActive: {
//       backgroundColor: '#7c3aed',
//       borderColor: '#7c3aed'
//     },
//     shiftTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: 'white',
//       marginBottom: '4px'
//     },
//     shiftTime: {
//       fontSize: '14px',
//       color: '#cbd5e1'
//     },
//     submitBtn: {
//       backgroundColor: '#7c3aed',
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
//     }
//   };

//   return (
//     <div style={styles.container}>
//       {/* Header */}
//       <div style={styles.header}>
//         <div>
//           <h1 style={styles.title}>Machine Assignment</h1>
//           <p style={styles.subtitle}>Assign Operator to Machine</p>
//         </div>
//         <button 
//           style={styles.backBtn}
//           onClick={handleBack}
//           onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
//           onMouseOut={(e) => e.target.style.backgroundColor = '#374151'}
//         >
//           ← Back to Dashboard
//         </button>
//       </div>

//       {/* Main Content */}
//       <div style={styles.mainContent}>
//         <div style={styles.formContainer}>
//           {/* Form Header */}
//           <div style={styles.formHeader}>
//             <h2 style={styles.formTitle}>Allot Machine</h2>
//             <p style={styles.formSubtitle}>Assign operator to machine for the selected shift</p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit}>
//             <div style={styles.formGrid}>
//               {/* Machine Number */}
//               <div style={styles.fieldGroup}>
//                 <label style={styles.label}>Machine Number</label>
//                 <input
//                   style={styles.input}
//                   placeholder="Enter machine number (e.g., M001)"
//                   value={machine}
//                   onChange={(e) => setMachine(e.target.value)}
//                   onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
//                   onBlur={(e) => e.target.style.borderColor = '#4b5563'}
//                   required
//                 />
//               </div>

//               {/* Operator Name */}
//               <div style={styles.fieldGroup}>
//                 <label style={styles.label}>Operator Name</label>
//                 <input
//                   style={styles.input}
//                   placeholder="Enter operator full name"
//                   value={operator}
//                   onChange={(e) => setOperator(e.target.value)}
//                   onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
//                   onBlur={(e) => e.target.style.borderColor = '#4b5563'}
//                   required
//                 />
//               </div>

//               {/* Shift Selection */}
//               <div style={styles.fieldGroup}>
//                 <label style={styles.label}>Shift</label>
//                 <div style={styles.shiftContainer}>
//                   <div
//                     style={{
//                       ...styles.shiftOption,
//                       ...(shift === "A" ? styles.shiftOptionActive : {})
//                     }}
//                     onClick={() => setShift("A")}
//                   >
//                     <div style={styles.shiftTitle}>Shift A</div>
//                     <div style={styles.shiftTime}>8:30 AM - 8:00 PM</div>
//                   </div>
//                   <div
//                     style={{
//                       ...styles.shiftOption,
//                       ...(shift === "B" ? styles.shiftOptionActive : {})
//                     }}
//                     onClick={() => setShift("B")}
//                   >
//                     <div style={styles.shiftTitle}>Shift B</div>
//                     <div style={styles.shiftTime}>8:00 PM - 8:30 AM</div>
//                   </div>
//                 </div>
//               </div>

//               {/* Start Date & Time */}
//               <div style={styles.fieldGroup}>
//                 <label style={styles.label}>Start Date & Time</label>
//                 <input
//                   type="datetime-local"
//                   style={styles.input}
//                   value={date}
//                   onChange={(e) => setDate(e.target.value)}
//                   onFocus={(e) => e.target.style.borderColor = '#7c3aed'}
//                   onBlur={(e) => e.target.style.borderColor = '#4b5563'}
//                   required
//                 />
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
//                 if (!loading) e.target.style.backgroundColor = '#6d28d9';
//               }}
//               onMouseOut={(e) => {
//                 if (!loading) e.target.style.backgroundColor = '#7c3aed';
//               }}
//             >
//               {loading ? "Processing Assignment..." : "Save & Complete Assignment"}
//             </button>

//             {/* Info Box */}
//             <div style={styles.infoBox}>
//               Make sure all details are correct before submitting the assignment.
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }



import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './AssignMachine.css';

const API_BASE = "http://127.0.0.1:8000/api";

export default function AssignMachine() {
  const navigate = useNavigate();
  const [plant, setPlant] = useState("");
  const [operators, setOperators] = useState([]);
  const [selectedOperator, setSelectedOperator] = useState("");
  const [newOperatorName, setNewOperatorName] = useState("");
  const [showAddOperator, setShowAddOperator] = useState(false);
  const [machines, setMachines] = useState([]);
  const [machine, setMachine] = useState("");
  const [shift, setShift] = useState("A");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (plant) {
      loadOperators();
      loadMachines();
    } else {
      setOperators([]);
      setMachines([]);
      setSelectedOperator("");
      setMachine("");
    }
  }, [plant]);

  const loadOperators = async () => {
    try {
      const response = await axios.get(`${API_BASE}/operators/?plant=${plant}`);
      if (response.data.success) {
        setOperators(response.data.operators);
      }
    } catch (error) {
      console.error('Error loading operators:', error);
    }
  };

  const loadMachines = async () => {
    try {
      const response = await axios.get(`${API_BASE}/machines/list/?plant=${plant}`);
      if (response.data.success) {
        setMachines(response.data.machines);
      }
    } catch (error) {
      console.error('Error loading machines:', error);
    }
  };

  const handleAddOperator = async () => {
    if (!newOperatorName.trim()) {
      alert('Please enter operator name');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/operators/add/`, {
        name: newOperatorName,
        plant: plant
      });

      if (response.data.success) {
        alert(response.data.message);
        setNewOperatorName('');
        setShowAddOperator(false);
        loadOperators();
        setSelectedOperator(response.data.operator.name);
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error adding operator');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!plant || !selectedOperator || !machine || !shift) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    
    try {
      const response = await axios.post(`${API_BASE}/assignment/save/`, {
        plant: plant,
        operator_name: selectedOperator,
        machine_no: parseInt(machine),
        shift: shift
      });
      
      if (response.data.success) {
        setLoading(false);
        setShowSuccess(true);
        
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      }
    } catch (error) {
      setLoading(false);
      alert("❌ " + (error.response?.data?.message || "Error saving assignment!"));
    }
  };

  if (showSuccess) {
    return (
      <div className="success-container">
        <div className="success-card">
          <div className="success-icon">
            <svg className="checkmark" viewBox="0 0 52 52">
              <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
              <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
            </svg>
          </div>
          <h1 className="success-title">Assignment Successful!</h1>
          <div className="success-details">
            <p><strong>{selectedOperator}</strong> has been assigned to</p>
            <p className="machine-highlight">Machine {machine}</p>
            <p>in <strong>{plant === 'plant_1' ? 'Plant 1' : 'Plant 2'}</strong></p>
            <p>for <strong>Shift {shift}</strong></p>
          </div>
          <div className="redirect-info">
            <div className="spinner"></div>
            <p>Redirecting to dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="split-container">
      {/* Left Side - Animated Background */}
      <div className="left-side">
        {/* Floating Particles/Tools Animation */}
        <div className="particles-container">
          <div className="particle nut"></div>
          <div className="particle bolt"></div>
          <div className="particle gear"></div>
          <div className="particle wrench"></div>
          <div className="particle screw"></div>
          <div className="particle nut nut2"></div>
          <div className="particle bolt bolt2"></div>
          <div className="particle gear gear2"></div>
        </div>

        {/* Gradient Overlay */}
        <div className="gradient-overlay"></div>
        
        <div className="branding-content">
          {/* Logo with Glow Effect */}
          <div className="logo-wrapper">
            <div className="logo-glow"></div>
            <img src="/logo1.jpg" alt="AtomOne Logo" className="brand-logo" />
          </div>
          
          <h2 className="brand-title">
            <span className="title-line">Welcome to</span>
            <span className="title-brand">AtomOne</span>
          </h2>
          
          <p className="brand-subtitle">
            Manage shifts, assign machines and track idle cases seamlessly.
          </p>
          
          {/* Feature Cards - WITH BOOTSTRAP ICONS */}
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-lightning-charge-fill" viewBox="0 0 16 16">
                  <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z"/>
                </svg>
              </div>
              <span>Real-time Tracking</span>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-bullseye" viewBox="0 0 16 16">
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                  <path d="M8 13A5 5 0 1 1 8 3a5 5 0 0 1 0 10m0 1A6 6 0 1 0 8 2a6 6 0 0 0 0 12"/>
                  <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8"/>
                  <path d="M9.5 8a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0"/>
                </svg>
              </div>
              <span>Smart Assignment</span>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-bar-chart-fill" viewBox="0 0 16 16">
                  <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
                </svg>
              </div>
              <span>Idle Management</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form (Same as before) */}
      <div className="right-side">
        <button className="back-btn" onClick={() => navigate("/dashboard")}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/>
          </svg>
          Back to Dashboard
        </button>

        <div className="form-content">
          <div className="form-header">
            <h2 className="form-title">Machine Assignment</h2>
            <p className="form-subtitle">Assign operators to machines for the selected shift</p>
          </div>

          <form onSubmit={handleSubmit} className="assignment-form">
            {/* Plant Selection */}
            <div className="form-group">
              <label className="form-label">
                <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd"/>
                </svg>
                Select Plant
              </label>
              <div className="select-wrapper">
                <select 
                  className="form-select"
                  value={plant}
                  onChange={(e) => setPlant(e.target.value)}
                  required
                >
                  <option value="">Choose Plant</option>
                  <option value="plant_1">🏭 Plant 1</option>
                  <option value="plant_2">🏭 Plant 2</option>
                </select>
              </div>
            </div>

            {/* Machine Number */}
            {plant && (
              <div className="form-group fade-in">
                <label className="form-label">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
                  </svg>
                  Machine Number
                </label>
                <div className="select-wrapper">
                  <select 
                    className="form-select"
                    value={machine}
                    onChange={(e) => setMachine(e.target.value)}
                    required
                  >
                    <option value="">Select Machine</option>
                    {machines.map(num => (
                      <option key={num} value={num}>Machine {num}</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Operator Name */}
            {plant && (
              <div className="form-group fade-in">
                <label className="form-label">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/>
                  </svg>
                  Operator Name
                </label>
                {!showAddOperator ? (
                  <>
                    <div className="select-wrapper">
                      <select 
                        className="form-select"
                        value={selectedOperator}
                        onChange={(e) => setSelectedOperator(e.target.value)}
                        required
                      >
                        <option value="">Select Operator</option>
                        {operators.map(op => (
                          <option key={op.id} value={op.name}>{op.name}</option>
                        ))}
                      </select>
                    </div>
                    <button 
                      type="button"
                      className="add-operator-btn"
                      onClick={() => setShowAddOperator(true)}
                    >
                      + Add New Operator
                    </button>
                  </>
                ) : (
                  <div className="add-operator-form">
                    <input
                      type="text"
                      className="form-input"
                      value={newOperatorName}
                      onChange={(e) => setNewOperatorName(e.target.value)}
                      placeholder="Enter new operator name"
                    />
                    <div className="btn-group">
                      <button type="button" onClick={handleAddOperator} className="btn-save">
                        Save Operator
                      </button>
                      <button 
                        type="button"
                        onClick={() => {
                          setShowAddOperator(false);
                          setNewOperatorName('');
                        }} 
                        className="btn-cancel"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Shift Selection */}
            {plant && (
              <div className="form-group fade-in">
                <label className="form-label">
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                  </svg>
                  Select Shift
                </label>
                <div className="shift-selector">
                  <div 
                    className={`shift-card ${shift === "A" ? "active" : ""}`}
                    onClick={() => setShift("A")}
                  >
                    <div className="shift-icon">A</div>
                    <div className="shift-details">
                      <h4>Shift A</h4>
                      <p>8:00 AM - 8:00 PM</p>
                    </div>
                    {shift === "A" && (
                      <svg className="shift-check" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                  <div 
                    className={`shift-card ${shift === "B" ? "active" : ""}`}
                    onClick={() => setShift("B")}
                  >
                    <div className="shift-icon">B</div>
                    <div className="shift-details">
                      <h4>Shift B</h4>
                      <p>8:00 PM - 8:00 AM</p>
                    </div>
                    {shift === "B" && (
                      <svg className="shift-check" width="24" height="24" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Info Box */}
            {plant && (
              <div className="info-box fade-in">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
                <p>Start date and time will be automatically recorded when you submit</p>
              </div>
            )}

            {/* Submit Button */}
            {plant && (
              <button 
                type="submit"
                className="submit-btn"
                disabled={loading || !selectedOperator || !machine}
              >
                {loading ? (
                  <>
                    <div className="btn-spinner"></div>
                    Processing Assignment...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    Save & Complete Assignment
                  </>
                )}
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
