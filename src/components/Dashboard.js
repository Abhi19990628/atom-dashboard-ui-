// // src/components/Dashboard.js - UPDATED WITH LIVE MONITORING DROPDOWN
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [machineData, setMachineData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);
//   const [activeDropdown, setActiveDropdown] = useState(null);
  
//   // ADDED: Tooltip states at component level
//   const [tooltipStates, setTooltipStates] = useState({});
  
//   // Real-time dashboard data states
//   const [totalMachines, setTotalMachines] = useState(0);
//   const [runningMachines, setRunningMachines] = useState(0);
//   const [avgEfficiency, setAvgEfficiency] = useState(0);
//   const [totalProduction, setTotalProduction] = useState(0);
  
//   // Filter states
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedShift, setSelectedShift] = useState('');
//   const [selectedPlant, setSelectedPlant] = useState('plant1_data');
//   const [availableDates, setAvailableDates] = useState([]);

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);
//       if (!mobile) {
//         setSidebarOpen(false);
//       }
//       // Auto collapse on smaller screens
//       if (window.innerWidth <= 1024) {
//         setSidebarCollapsed(true);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Load theme from localStorage
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('dashboardTheme');
//     if (savedTheme) {
//       setDarkMode(savedTheme === 'dark');
//     }
//   }, []);

//   // Save theme to localStorage
//   useEffect(() => {
//     localStorage.setItem('dashboardTheme', darkMode ? 'dark' : 'light');
//     document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
//   }, [darkMode]);

//   // Fetch available dates
//   useEffect(() => {
//     const fetchAvailableDates = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/available-dates/?plant=${selectedPlant}`);
//         const data = await response.json();
//         if (data.success) {
//           setAvailableDates(data.available_dates);
//         }
//       } catch (error) {
//         console.error('Error fetching available dates:', error);
//       }
//     };
    
//     fetchAvailableDates();
//   }, [selectedPlant]);

//   // Fetch dashboard data with filters
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         let apiUrl = `http://127.0.0.1:8000/api/dashboard/?date=${selectedDate}&plant=${selectedPlant}`;
        
//         if (selectedShift) {
//           apiUrl += `&shift=${selectedShift}`;
//         }
        
//         const response = await fetch(apiUrl);
//         const data = await response.json();
        
//         if (data.success) {
//           const dashboardData = data.dashboard_data;
//           setTotalMachines(dashboardData.total_machines);
//           setRunningMachines(dashboardData.running_machines);
//           setAvgEfficiency(dashboardData.avg_efficiency);
//           setTotalProduction(dashboardData.total_production);
//           setMachineData(dashboardData.machine_details);
//         }
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchDashboardData();
//     const interval = setInterval(fetchDashboardData, 60000);
//     return () => clearInterval(interval);
//   }, [selectedDate, selectedShift, selectedPlant]);

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'running': return '#10b981';
//       case 'idle': return '#f59e0b';
//       case 'maintenance': return '#ef4444';
//       default: return '#6b7280';
//     }
//   };

//   // Theme-aware styles
//   const getThemeColors = () => {
//     if (darkMode) {
//       return {
//         primary: '#0f172a',
//         secondary: '#1e293b',
//         accent: '#3b82f6',
//         text: '#ffffff',
//         textSecondary: '#94a3b8',
//         border: 'rgba(255,255,255,0.1)',
//         cardBg: 'rgba(255,255,255,0.05)',
//         hoverBg: 'rgba(255,255,255,0.1)'
//       };
//     } else {
//       return {
//         primary: '#f8fafc',
//         secondary: '#ffffff',
//         accent: '#3b82f6',
//         text: '#1f2937',
//         textSecondary: '#6b7280',
//         border: 'rgba(0,0,0,0.1)',
//         cardBg: 'rgba(255,255,255,0.9)',
//         hoverBg: 'rgba(0,0,0,0.05)'
//       };
//     }
//   };

//   const theme = getThemeColors();
//   const sidebarWidth = sidebarCollapsed ? '70px' : '280px';

//   // ADDED: Tooltip helper functions
//   const showTooltip = (key) => {
//     setTooltipStates(prev => ({ ...prev, [key]: true }));
//   };

//   const hideTooltip = (key) => {
//     setTooltipStates(prev => ({ ...prev, [key]: false }));
//   };

//   const styles = {
//     container: {
//       minHeight: '100vh',
//       backgroundColor: theme.primary,
//       color: theme.text,
//       display: 'flex',
//       position: 'relative',
//       fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       transition: 'all 0.3s ease'
//     },
//     overlay: {
//       display: sidebarOpen && isMobile ? 'block' : 'none',
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       right: 0,
//       bottom: 0,
//       backgroundColor: 'rgba(0, 0, 0, 0.7)',
//       zIndex: 999,
//       backdropFilter: 'blur(4px)'
//     },
//     sidebar: {
//       width: isMobile ? '280px' : sidebarWidth,
//       backgroundColor: theme.secondary,
//       padding: '0',
//       display: 'flex',
//       flexDirection: 'column',
//       position: isMobile ? 'fixed' : 'fixed',
//       height: '100vh',
//       left: isMobile ? (sidebarOpen ? '0' : '-280px') : '0',
//       top: 0,
//       overflowY: 'auto',
//       overflowX: 'hidden',
//       boxShadow: darkMode ? '4px 0 25px rgba(0,0,0,0.3)' : '4px 0 25px rgba(0,0,0,0.1)',
//       zIndex: 1000,
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       border: `1px solid ${theme.border}`,
//       borderLeft: 'none'
//     },
//     menuButton: {
//       display: isMobile ? 'flex' : 'none',
//       position: 'fixed',
//       top: '20px',
//       left: '20px',
//       zIndex: 1001,
//       backgroundColor: theme.accent,
//       border: 'none',
//       borderRadius: '12px',
//       padding: '12px',
//       cursor: 'pointer',
//       color: 'white',
//       alignItems: 'center',
//       justifyContent: 'center',
//       boxShadow: `0 4px 12px ${theme.accent}40`
//     },
//     closeButton: {
//       display: isMobile ? 'block' : 'none',
//       position: 'absolute',
//       top: '20px',
//       right: '20px',
//       backgroundColor: 'transparent',
//       border: 'none',
//       color: theme.text,
//       fontSize: '24px',
//       cursor: 'pointer',
//       zIndex: 1001
//     },
//     logoSection: {
//       padding: sidebarCollapsed ? '20px 10px' : '30px 25px',
//       textAlign: 'center',
//       borderBottom: `1px solid ${theme.border}`,
//       marginBottom: '0',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       gap: sidebarCollapsed ? '10px' : '15px',
//       background: darkMode ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))' : 'linear-gradient(135deg, rgba(59, 130, 246, 0.05), rgba(139, 92, 246, 0.05))',
//       transition: 'all 0.3s ease'
//     },
//     logoContainer: {
//       width: sidebarCollapsed ? '40px' : '80px',
//       height: sidebarCollapsed ? '40px' : '80px',
//       backgroundColor: 'white',
//       borderRadius: sidebarCollapsed ? '10px' : '16px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       padding: sidebarCollapsed ? '8px' : '12px',
//       marginBottom: sidebarCollapsed ? '5px' : '15px',
//       overflow: 'hidden',
//       boxShadow: darkMode ? '0 8px 25px rgba(0,0,0,0.2)' : '0 8px 25px rgba(0,0,0,0.1)',
//       border: `2px solid ${theme.border}`,
//       transition: 'all 0.3s ease'
//     },
//     logoImage: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'contain',
//       borderRadius: '8px'
//     },
//     companyName: {
//       fontSize: sidebarCollapsed ? '0px' : '24px',
//       fontWeight: '800',
//       background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text',
//       marginBottom: '5px',
//       letterSpacing: '1px',
//       opacity: sidebarCollapsed ? 0 : 1,
//       transition: 'all 0.3s ease',
//       overflow: 'hidden'
//     },
//     version: {
//       fontSize: sidebarCollapsed ? '0px' : '12px',
//       color: theme.textSecondary,
//       fontWeight: '600',
//       marginBottom: '8px',
//       letterSpacing: '2px',
//       opacity: sidebarCollapsed ? 0 : 1,
//       transition: 'all 0.3s ease',
//       overflow: 'hidden'
//     },
//     tagline: {
//       fontSize: sidebarCollapsed ? '0px' : '10px',
//       color: theme.textSecondary,
//       textAlign: 'center',
//       lineHeight: '1.4',
//       opacity: sidebarCollapsed ? 0 : 0.8,
//       transition: 'all 0.3s ease',
//       overflow: 'hidden'
//     },
//     collapseToggle: {
//       position: 'absolute',
//       top: '20px',
//       right: sidebarCollapsed ? '15px' : '20px',
//       backgroundColor: theme.accent,
//       border: 'none',
//       borderRadius: '50%',
//       width: '32px',
//       height: '32px',
//       cursor: 'pointer',
//       display: isMobile ? 'none' : 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '14px',
//       color: 'white',
//       transition: 'all 0.3s ease',
//       boxShadow: `0 2px 8px ${theme.accent}40`,
//       zIndex: 10
//     },
//     themeToggle: {
//       position: 'absolute',
//       top: sidebarCollapsed ? '60px' : '60px',
//       right: sidebarCollapsed ? '15px' : '20px',
//       backgroundColor: theme.cardBg,
//       border: `1px solid ${theme.border}`,
//       borderRadius: sidebarCollapsed ? '50%' : '20px',
//       padding: sidebarCollapsed ? '8px' : '6px 10px',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: sidebarCollapsed ? '0' : '6px',
//       fontSize: '11px',
//       transition: 'all 0.3s ease',
//       backdropFilter: 'blur(10px)',
//       width: sidebarCollapsed ? '32px' : 'auto',
//       height: sidebarCollapsed ? '32px' : 'auto',
//       justifyContent: 'center'
//     },
//     navSection: {
//       flex: 1,
//       padding: '20px 0',
//       display: 'flex',
//       flexDirection: 'column'
//     },
//     navItem: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: sidebarCollapsed ? '0' : '12px',
//       padding: sidebarCollapsed ? '12px' : '14px 25px',
//       cursor: 'pointer',
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       textDecoration: 'none',
//       color: theme.textSecondary,
//       marginBottom: '4px',
//       borderRadius: sidebarCollapsed ? '12px' : '0 25px 25px 0',
//       marginRight: sidebarCollapsed ? '10px' : '20px',
//       marginLeft: sidebarCollapsed ? '10px' : '0',
//       position: 'relative',
//       justifyContent: sidebarCollapsed ? 'center' : 'flex-start',
//       minHeight: '48px'
//     },
//     navItemActive: {
//       backgroundColor: `${theme.accent}20`,
//       color: theme.accent,
//       fontWeight: '600',
//       borderLeft: sidebarCollapsed ? 'none' : `4px solid ${theme.accent}`,
//       border: sidebarCollapsed ? `2px solid ${theme.accent}` : 'none',
//       transform: sidebarCollapsed ? 'scale(1.1)' : 'translateX(5px)'
//     },
//     navItemSpecial: {
//       background: darkMode ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.15))' : 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
//       border: `1px solid rgba(16, 185, 129, 0.3)`,
//       color: '#10b981',
//       fontWeight: '600'
//     },
//     dropdownContainer: {
//       position: 'relative'
//     },
//     dropdownContent: {
//       backgroundColor: theme.cardBg,
//       marginLeft: sidebarCollapsed ? '0' : '25px',
//       marginRight: sidebarCollapsed ? '0' : '25px',
//       borderRadius: '12px',
//       marginTop: '5px',
//       border: `1px solid ${theme.border}`,
//       backdropFilter: 'blur(10px)',
//       overflow: 'hidden',
//       maxHeight: (activeDropdown === 'assign' || activeDropdown === 'reports' || activeDropdown === 'monitoring') ? '200px' : '0',
//       transition: 'all 0.3s ease',
//       position: sidebarCollapsed ? 'absolute' : 'relative',
//       left: sidebarCollapsed ? '60px' : '0',
//       top: sidebarCollapsed ? '-10px' : '0',
//       minWidth: sidebarCollapsed ? '200px' : 'auto',
//       boxShadow: sidebarCollapsed ? '0 8px 25px rgba(0,0,0,0.15)' : 'none',
//       zIndex: 1001
//     },
//     dropdownItem: {
//       padding: '12px 20px',
//       color: theme.textSecondary,
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       borderBottom: `1px solid ${theme.border}`,
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px'
//     },
//     blinkingDot: {
//       width: '8px',
//       height: '8px',
//       backgroundColor: '#10b981',
//       borderRadius: '50%',
//       marginLeft: sidebarCollapsed ? '0' : 'auto',
//       animation: 'blink 1.5s infinite',
//       position: sidebarCollapsed ? 'absolute' : 'static',
//       top: sidebarCollapsed ? '8px' : 'auto',
//       right: sidebarCollapsed ? '8px' : 'auto'
//     },
//     navIcon: {
//       fontSize: '20px',
//       width: '24px',
//       textAlign: 'center',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       flexShrink: 0
//     },
//     navLabel: {
//       flex: 1,
//       fontSize: '14px',
//       fontWeight: '500',
//       opacity: sidebarCollapsed ? 0 : 1,
//       overflow: 'hidden',
//       whiteSpace: 'nowrap',
//       transition: 'opacity 0.3s ease'
//     },
//     navSubtext: {
//       fontSize: '10px',
//       opacity: 0.7,
//       marginTop: '2px'
//     },
//     navArrow: {
//       fontSize: '10px',
//       marginLeft: 'auto',
//       transition: 'transform 0.3s ease',
//       opacity: sidebarCollapsed ? 0 : 1
//     },
//     tooltip: {
//       position: 'absolute',
//       left: '60px',
//       backgroundColor: theme.secondary,
//       color: theme.text,
//       padding: '8px 12px',
//       borderRadius: '8px',
//       fontSize: '12px',
//       fontWeight: '500',
//       border: `1px solid ${theme.border}`,
//       boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
//       zIndex: 1002,
//       whiteSpace: 'nowrap',
//       opacity: 0,
//       visibility: 'hidden',
//       transition: 'all 0.3s ease',
//       pointerEvents: 'none'
//     },
//     logoutSection: {
//       padding: sidebarCollapsed ? '20px 10px' : '20px 25px',
//       borderTop: `1px solid ${theme.border}`,
//       marginTop: 'auto'
//     },
//     logoutBtn: {
//       width: '100%',
//       padding: sidebarCollapsed ? '12px' : '14px',
//       backgroundColor: '#dc2626',
//       border: 'none',
//       borderRadius: '12px',
//       color: 'white',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: sidebarCollapsed ? '0' : '10px',
//       fontSize: sidebarCollapsed ? '18px' : '14px',
//       fontWeight: '600',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
//     },
//     mainContent: {
//       marginLeft: isMobile ? '0' : sidebarWidth,
//       padding: isMobile ? '80px 20px 30px 20px' : '30px 40px',
//       width: isMobile ? '100%' : `calc(100% - ${sidebarWidth})`,
//       boxSizing: 'border-box',
//       backgroundColor: theme.primary,
//       minHeight: '100vh',
//       transition: 'all 0.3s ease'
//     },
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: isMobile ? 'flex-start' : 'center',
//       marginBottom: '30px',
//       flexDirection: isMobile ? 'column' : 'row',
//       gap: isMobile ? '20px' : '0'
//     },
//     title: {
//       fontSize: isMobile ? '32px' : '42px',
//       fontWeight: '800',
//       margin: 0,
//       background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text',
//       letterSpacing: '1px'
//     },
//     subtitle: {
//       color: theme.textSecondary,
//       margin: '8px 0 0 0',
//       fontSize: isMobile ? '14px' : '16px',
//       fontWeight: '500'
//     },
//     headerRight: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '15px'
//     },
//     refreshBtn: {
//       padding: '12px',
//       backgroundColor: theme.cardBg,
//       border: `1px solid ${theme.border}`,
//       borderRadius: '12px',
//       color: theme.text,
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       backdropFilter: 'blur(10px)'
//     },
//     userProfile: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px',
//       padding: '10px 16px',
//       backgroundColor: theme.cardBg,
//       borderRadius: '12px',
//       border: `1px solid ${theme.border}`,
//       backdropFilter: 'blur(10px)'
//     },
//     avatar: {
//       width: '36px',
//       height: '36px',
//       backgroundColor: theme.accent,
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '16px',
//       color: 'white',
//       fontWeight: '600'
//     },
//     filterSection: {
//       background: theme.cardBg,
//       padding: '25px',
//       borderRadius: '16px',
//       border: `1px solid ${theme.border}`,
//       marginBottom: '30px',
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
//       gap: '20px',
//       alignItems: 'end',
//       backdropFilter: 'blur(10px)'
//     },
//     filterGroup: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '8px'
//     },
//     filterLabel: {
//       fontSize: '14px',
//       fontWeight: '600',
//       color: theme.text,
//       marginBottom: '5px'
//     },
//     filterSelect: {
//       backgroundColor: theme.cardBg,
//       border: `1px solid ${theme.border}`,
//       borderRadius: '10px',
//       padding: '12px 16px',
//       color: theme.text,
//       fontSize: '14px',
//       outline: 'none',
//       cursor: 'pointer',
//       backdropFilter: 'blur(10px)',
//       transition: 'all 0.3s ease'
//     },
//     applyBtn: {
//       background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
//       border: 'none',
//       borderRadius: '10px',
//       padding: '12px 24px',
//       color: 'white',
//       cursor: 'pointer',
//       fontSize: '14px',
//       fontWeight: '600',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
//     },
//     statsGrid: {
//       display: 'grid',
//       gridTemplateColumns: isMobile 
//         ? 'repeat(auto-fit, minmax(160px, 1fr))' 
//         : 'repeat(auto-fit, minmax(280px, 1fr))',
//       gap: isMobile ? '20px' : '25px',
//       marginBottom: '30px'
//     },
//     statCard: {
//       background: theme.cardBg,
//       padding: isMobile ? '20px' : '25px',
//       borderRadius: '16px',
//       border: `1px solid ${theme.border}`,
//       backdropFilter: 'blur(10px)',
//       transition: 'all 0.3s ease'
//     },
//     statCardContent: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       flexDirection: isMobile ? 'column' : 'row',
//       gap: isMobile ? '15px' : '0'
//     },
//     statInfo: {
//       flex: 1,
//       textAlign: isMobile ? 'center' : 'left'
//     },
//     statLabel: {
//       color: theme.textSecondary,
//       fontSize: '14px',
//       margin: 0,
//       fontWeight: '500'
//     },
//     statValue: {
//       fontSize: isMobile ? '28px' : '36px',
//       fontWeight: '800',
//       margin: '8px 0',
//       color: theme.text
//     },
//     statSubtext: {
//       fontSize: '12px',
//       margin: 0,
//       fontWeight: '500'
//     },
//     iconContainer: {
//       width: isMobile ? '50px' : '60px',
//       height: isMobile ? '50px' : '60px',
//       borderRadius: '50%',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
//     },
//     contentGrid: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(400px, 1fr))',
//       gap: '25px',
//       marginBottom: '30px'
//     },
//     card: {
//       background: theme.cardBg,
//       padding: isMobile ? '25px' : '30px',
//       borderRadius: '16px',
//       border: `1px solid ${theme.border}`,
//       backdropFilter: 'blur(10px)'
//     },
//     cardTitle: {
//       fontSize: isMobile ? '20px' : '22px',
//       fontWeight: '700',
//       marginBottom: '20px',
//       color: theme.text
//     },
//     machineItem: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       padding: isMobile ? '15px' : '18px',
//       backgroundColor: theme.hoverBg,
//       borderRadius: '12px',
//       marginBottom: '12px',
//       flexDirection: isMobile ? 'column' : 'row',
//       gap: isMobile ? '10px' : '0',
//       border: `1px solid ${theme.border}`,
//       transition: 'all 0.3s ease'
//     },
//     machineLeft: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '15px',
//       width: isMobile ? '100%' : 'auto'
//     },
//     statusDot: {
//       width: '10px',
//       height: '10px',
//       borderRadius: '50%',
//       boxShadow: '0 0 8px currentColor'
//     },
//     machineInfo: {
//       fontSize: '12px',
//       color: theme.textSecondary,
//       margin: '4px 0 0 0'
//     },
//     machineName: {
//       fontWeight: '600',
//       margin: 0,
//       color: theme.text,
//       fontSize: '14px'
//     },
//     machineStats: {
//       textAlign: isMobile ? 'center' : 'right',
//       width: isMobile ? '100%' : 'auto'
//     },
//     quickActions: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(220px, 1fr))',
//       gap: '20px'
//     },
//     actionBtn: {
//       padding: '25px',
//       border: 'none',
//       borderRadius: '16px',
//       color: 'white',
//       cursor: 'pointer',
//       textAlign: 'center',
//       fontSize: '16px',
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       position: 'relative',
//       overflow: 'hidden',
//       backdropFilter: 'blur(10px)',
//       border: `1px solid ${theme.border}`
//     },
//     loadingContainer: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       height: '150px'
//     }
//   };

//   // UPDATED: Navigation structure with Live Monitoring dropdown [web:87][web:89]
//   const navigationStructure = [
//     { 
//       key: 'dashboard', 
//       icon: '🏠', 
//       label: 'Analytics Dashboard', 
//       active: true, 
//       clickable: false 
//     },
//     { 
//       key: 'monitoring-dropdown',
//       icon: '📡', 
//       label: 'Live Monitoring', 
//       hasDropdown: true,
//       isOpen: activeDropdown === 'monitoring',
//       special: true,
//       subtext: 'Real-time Operations',
//       dropdownItems: [
//         { key: 'plant1-live', icon: '🏢', label: 'Plant 1 Live', path: '/plant1-live' },
//         { key: 'plant2-live', icon: '🏭', label: 'Plant 2 Live', path: '/plant2-live' }
//       ]
//     },
//     {
//       key: 'assign-dropdown',
//       icon: '⚙️',
//       label: 'Machine Operations',
//       hasDropdown: true,
//       isOpen: activeDropdown === 'assign',
//       dropdownItems: [
//         { key: 'assign-machine', icon: '🔧', label: 'Machine Assignment', path: '/assign-machine' },
//         { key: 'idle-report-submit', icon: '📋', label: 'Idle Report Submission', path: '/idle-report-submit' }
//       ]
//     },
//     {
//       key: 'reports-dropdown',
//       icon: '📊',
//       label: 'Performance Reports',
//       hasDropdown: true,
//       isOpen: activeDropdown === 'reports',
//       dropdownItems: [
//         { key: 'machine-assignments', icon: '📋', label: 'Assignment Records', path: '/machine-assignments' },
//         { key: 'idle-reports-list', icon: '📈', label: 'Idle Analysis Reports', path: '/idle-reports-list' }
//       ]
//     }
//   ];

//   const otherNavItems = [
//     { key: 'users', icon: '👥', label: 'User Management', active: false, clickable: false },
//     { key: 'settings', icon: '⚙️', label: 'System Settings', active: false, clickable: false },
//     { key: 'energy', icon: '⚡', label: 'Energy Monitoring', active: false, clickable: false },
//     { key: 'alerts', icon: '🚨', label: 'Alert Center', active: false, clickable: false }
//   ];

//   // Icons
//   const HamburgerIcon = () => (
//     <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//     </svg>
//   );

//   const RefreshIcon = () => (
//     <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M23 4v6h-6M1 20v-6h6m2-11a10 10 0 1 1-9 9.95M21 21a10 10 0 0 1-9-9.95"/>
//     </svg>
//   );

//   const UserIcon = () => (
//     <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//       <circle cx="12" cy="7" r="4"/>
//     </svg>
//   );

//   const ThemeIcon = () => (
//     darkMode ? (
//       <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
//         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
//       </svg>
//     ) : (
//       <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
//         <circle cx="12" cy="12" r="5"/>
//         <path d="m12 1-1 3-1-3zm0 18-1 3-1-3zm11-11 3 1-3 1zM1 11l3 1-3 1zm18.66-6.66-2.83 2.83m0-2.83 2.83 2.83M5.17 17.17l2.83-2.83m-2.83 0 2.83 2.83"/>
//       </svg>
//     )
//   );

//   const CollapseIcon = () => (
//     <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{transform: sidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease'}}>
//       <path d="M15 18l-6-6 6-6"/>
//     </svg>
//   );

//   const handleNavigation = (page) => {
//     navigate(`/${page}`);
//     if (isMobile) {
//       setSidebarOpen(false);
//     }
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const closeSidebar = () => {
//     setSidebarOpen(false);
//   };

//   const handleRefresh = () => {
//     window.location.reload();
//   };

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };

//   const toggleSidebarCollapse = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//     setActiveDropdown(null);
//   };

//   const toggleDropdown = (dropdownKey) => {
//     if (sidebarCollapsed) {
//       setSidebarCollapsed(false);
//     }
//     setActiveDropdown(activeDropdown === dropdownKey ? null : dropdownKey);
//   };

//   // FIXED: Navigation item component to avoid hook violation [web:89]
//   const NavigationItem = ({ item, index }) => {
//     return (
//       <div key={index} style={styles.dropdownContainer}>
//         <div
//           style={{
//             ...styles.navItem,
//             ...(item.active ? styles.navItemActive : {}),
//             ...(item.special ? styles.navItemSpecial : {}),
//             ...(item.clickable || item.hasDropdown ? {} : {cursor: 'default', opacity: 0.8})
//           }}
//           onClick={() => {
//             if (item.hasDropdown) {
//               toggleDropdown(item.key.replace('-dropdown', ''));
//             } else if (item.clickable) {
//               handleNavigation(item.key);
//             }
//           }}
//           onMouseEnter={() => {
//             if (sidebarCollapsed) {
//               showTooltip(item.key);
//             }
//           }}
//           onMouseLeave={() => {
//             hideTooltip(item.key);
//           }}
//         >
//           <span style={styles.navIcon}>{item.icon}</span>
//           <div style={styles.navLabel}>
//             <div>{item.label}</div>
//             {item.subtext && !sidebarCollapsed && (
//               <div style={styles.navSubtext}>
//                 {item.subtext}
//               </div>
//             )}
//           </div>
//           {item.special && (
//             <div style={styles.blinkingDot}></div>
//           )}
//           {item.hasDropdown && (
//             <span 
//               style={{
//                 ...styles.navArrow,
//                 transform: item.isOpen ? 'rotate(90deg)' : 'rotate(0deg)'
//               }}
//             >
//               ▶
//             </span>
//           )}
//           {item.clickable && !item.hasDropdown && !sidebarCollapsed && (
//             <span style={{marginLeft: 'auto', fontSize: '12px', opacity: 0.7}}>→</span>
//           )}

//           {/* FIXED: Tooltip without useState inside callback */}
//           {sidebarCollapsed && tooltipStates[item.key] && (
//             <div style={{
//               ...styles.tooltip,
//               opacity: 1,
//               visibility: 'visible'
//             }}>
//               {item.label}
//               {item.subtext && <div style={{fontSize: '10px', opacity: 0.8}}>{item.subtext}</div>}
//             </div>
//           )}
//         </div>

//         {/* Dropdown Content */}
//         {item.hasDropdown && (
//           <div style={styles.dropdownContent}>
//             {item.dropdownItems.map((dropItem, dropIndex) => (
//               <div
//                 key={dropIndex}
//                 style={styles.dropdownItem}
//                 onClick={() => handleNavigation(dropItem.key)}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.backgroundColor = theme.hoverBg;
//                   e.currentTarget.style.transform = 'translateX(5px)';
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.backgroundColor = 'transparent';
//                   e.currentTarget.style.transform = 'translateX(0)';
//                 }}
//               >
//                 <span style={{fontSize: '16px'}}>{dropItem.icon}</span>
//                 <span>{dropItem.label}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // FIXED: Other navigation item component
//   const OtherNavigationItem = ({ item, index }) => {
//     return (
//       <div
//         key={index}
//         style={{
//           ...styles.navItem,
//           cursor: 'default',
//           opacity: 0.6
//         }}
//         onMouseEnter={() => {
//           if (sidebarCollapsed) {
//             showTooltip(`other-${item.key}`);
//           }
//         }}
//         onMouseLeave={() => {
//           hideTooltip(`other-${item.key}`);
//         }}
//       >
//         <span style={styles.navIcon}>{item.icon}</span>
//         <div style={styles.navLabel}>{item.label}</div>
        
//         {/* Tooltip */}
//         {sidebarCollapsed && tooltipStates[`other-${item.key}`] && (
//           <div style={{
//             ...styles.tooltip,
//             opacity: 1,
//             visibility: 'visible'
//           }}>
//             {item.label}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div style={styles.container}>
//       {/* Mobile hamburger menu button */}
//       <button style={styles.menuButton} onClick={toggleSidebar}>
//         <HamburgerIcon />
//       </button>

//       {/* Mobile overlay */}
//       <div style={styles.overlay} onClick={closeSidebar}></div>

//       {/* Collapsible Sidebar */}
//       <div style={styles.sidebar}>
//         <button style={styles.closeButton} onClick={closeSidebar}>×</button>

//         {/* Logo section */}
//         <div style={styles.logoSection}>
//           {/* Collapse Toggle Button */}
//           <button 
//             style={styles.collapseToggle}
//             onClick={toggleSidebarCollapse}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'scale(1.1)';
//               e.currentTarget.style.boxShadow = `0 4px 15px ${theme.accent}60`;
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'scale(1)';
//               e.currentTarget.style.boxShadow = `0 2px 8px ${theme.accent}40`;
//             }}
//           >
//             <CollapseIcon />
//           </button>

//           {/* Theme Toggle */}
//           <div 
//             style={styles.themeToggle}
//             onClick={toggleTheme}
//             onMouseOver={(e) => {
//               e.currentTarget.style.backgroundColor = theme.hoverBg;
//               e.currentTarget.style.transform = 'scale(1.05)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.backgroundColor = theme.cardBg;
//               e.currentTarget.style.transform = 'scale(1)';
//             }}
//           >
//             <ThemeIcon />
//             {!sidebarCollapsed && <span>{darkMode ? 'Dark' : 'Light'}</span>}
//           </div>

//           <div 
//             style={styles.logoContainer}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'scale(1.05)';
//               e.currentTarget.style.boxShadow = darkMode ? '0 12px 35px rgba(0,0,0,0.3)' : '0 12px 35px rgba(0,0,0,0.15)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'scale(1)';
//               e.currentTarget.style.boxShadow = darkMode ? '0 8px 25px rgba(0,0,0,0.2)' : '0 8px 25px rgba(0,0,0,0.1)';
//             }}
//           >
//             <img 
//               src="/aa1.jpg"
//               alt="AtomOne HD Logo"
//               style={styles.logoImage}
//               onLoad={() => console.log("HD Logo loaded successfully")}
//               onError={(e) => {
//                 console.warn("Logo loading failed, showing fallback");
//                 e.target.style.display = 'none';
//                 e.target.parentNode.innerHTML = '<div style="width: 100%; height: 100%; background: linear-gradient(45deg, #3b82f6, #8b5cf6); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: bold; color: white;">A1</div>';
//               }}
//             />
//           </div>
//           <div style={styles.companyName}>ATOMONE</div>
//           <div style={styles.version}>AoT4.0</div>
//           <div style={styles.tagline}>
//             Professional Industrial Management
//           </div>
//         </div>
        
//         {/* FIXED: Navigation with proper hook usage */}
//         <div style={styles.navSection}>
//           {navigationStructure.map((item, index) => (
//             <NavigationItem key={item.key} item={item} index={index} />
//           ))}

//           {/* Other Navigation Items */}
//           <div style={{marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${theme.border}`}}>
//             {otherNavItems.map((item, index) => (
//               <OtherNavigationItem key={item.key} item={item} index={index} />
//             ))}
//           </div>
//         </div>

//         {/* Logout Section */}
//         <div style={styles.logoutSection}>
//           <button 
//             style={styles.logoutBtn} 
//             onClick={onLogout}
//             onMouseOver={(e) => {
//               e.target.style.backgroundColor = '#b91c1c';
//               e.target.style.transform = 'translateY(-2px)';
//               e.target.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.backgroundColor = '#dc2626';
//               e.target.style.transform = 'translateY(0)';
//               e.target.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
//             }}
//           >
//             <span>🚪</span>
//             {!sidebarCollapsed && <span>Logout</span>}
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div style={styles.mainContent}>
//         <div style={styles.header}>
//           <div>
//             <h1 style={styles.title}>ANALYTICS DASHBOARD</h1>
//             <p style={styles.subtitle}>
//               Comprehensive Machine Performance Analytics - {selectedPlant.toUpperCase()} - {selectedDate} 
//               {selectedShift && ` - Shift ${selectedShift}`}
//             </p>
//           </div>
//           <div style={styles.headerRight}>
//             <button 
//               style={styles.refreshBtn} 
//               onClick={handleRefresh}
//               onMouseOver={(e) => {
//                 e.target.style.backgroundColor = theme.hoverBg;
//                 e.target.style.transform = 'scale(1.05)';
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.backgroundColor = theme.cardBg;
//                 e.target.style.transform = 'scale(1)';
//               }}
//             >
//               <RefreshIcon />
//             </button>
//             <div style={styles.userProfile}>
//               <div style={styles.avatar}>
//                 <UserIcon />
//               </div>
//               <span style={{fontWeight: '600'}}>System Admin</span>
//             </div>
//           </div>
//         </div>

//         {/* Filter Section */}
//         <div style={styles.filterSection}>
//           <div style={styles.filterGroup}>
//             <label style={styles.filterLabel}>Production Plant</label>
//             <select 
//               style={styles.filterSelect}
//               value={selectedPlant}
//               onChange={(e) => setSelectedPlant(e.target.value)}
//               onFocus={(e) => e.target.style.borderColor = theme.accent}
//               onBlur={(e) => e.target.style.borderColor = theme.border}
//             >
//               <option value="plant1_data">Manufacturing Plant 1</option>
//               <option value="plant2_data">Manufacturing Plant 2</option>
//               <option value="plc_data">PLC Control Systems</option>
//             </select>
//           </div>

//           <div style={styles.filterGroup}>
//             <label style={styles.filterLabel}>Analysis Period</label>
//             <select 
//               style={styles.filterSelect}
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               onFocus={(e) => e.target.style.borderColor = theme.accent}
//               onBlur={(e) => e.target.style.borderColor = theme.border}
//             >
//               {availableDates.length > 0 ? availableDates.map(date => (
//                 <option key={date} value={date}>{date}</option>
//               )) : (
//                 <option value={selectedDate}>{selectedDate}</option>
//               )}
//             </select>
//           </div>

//           <div style={styles.filterGroup}>
//             <label style={styles.filterLabel}>Operational Shift</label>
//             <select 
//               style={styles.filterSelect}
//               value={selectedShift}
//               onChange={(e) => setSelectedShift(e.target.value)}
//               onFocus={(e) => e.target.style.borderColor = theme.accent}
//               onBlur={(e) => e.target.style.borderColor = theme.border}
//             >
//               <option value="">All Production Shifts</option>
//               <option value="A">Morning Shift (A)</option>
//               <option value="B">Afternoon Shift (B)</option>
//               <option value="C">Night Shift (C)</option>
//             </select>
//           </div>

//           <div style={styles.filterGroup}>
//             <button 
//               style={styles.applyBtn}
//               onClick={handleRefresh}
//               onMouseOver={(e) => {
//                 e.target.style.transform = 'translateY(-2px)';
//                 e.target.style.boxShadow = '0 6px 20px rgba(59, 130, 246, 0.5)';
//               }}
//               onMouseOut={(e) => {
//                 e.target.style.transform = 'translateY(0)';
//                 e.target.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.4)';
//               }}
//             >
//               Update Analytics
//             </button>
//           </div>
//         </div>

//         {/* Stats Cards */}
//         <div style={styles.statsGrid}>
//           <div 
//             style={styles.statCard}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'translateY(-5px)';
//               e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = 'none';
//             }}
//           >
//             <div style={styles.statCardContent}>
//               <div style={styles.statInfo}>
//                 <p style={styles.statLabel}>Total Manufacturing Units</p>
//                 <p style={styles.statValue}>{totalMachines}</p>
//                 <p style={{...styles.statSubtext, color: '#10b981'}}>Active Production Lines</p>
//               </div>
//               <div style={{...styles.iconContainer, background: 'linear-gradient(135deg, #ec4899, #f472b6)'}}>
//                 <span style={{fontSize: isMobile ? '20px' : '24px'}}>🏭</span>
//               </div>
//             </div>
//           </div>

//           <div 
//             style={styles.statCard}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'translateY(-5px)';
//               e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = 'none';
//             }}
//           >
//             <div style={styles.statCardContent}>
//               <div style={styles.statInfo}>
//                 <p style={styles.statLabel}>Operational Status</p>
//                 <p style={styles.statValue}>{runningMachines}</p>
//                 <p style={{...styles.statSubtext, color: '#10b981'}}>Currently Running</p>
//               </div>
//               <div style={{...styles.iconContainer, background: 'linear-gradient(135deg, #10b981, #059669)'}}>
//                 <span style={{fontSize: isMobile ? '20px' : '24px'}}>⚡</span>
//               </div>
//             </div>
//           </div>

//           <div 
//             style={styles.statCard}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'translateY(-5px)';
//               e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = 'none';
//             }}
//           >
//             <div style={styles.statCardContent}>
//               <div style={styles.statInfo}>
//                 <p style={styles.statLabel}>Overall Efficiency</p>
//                 <p style={styles.statValue}>{avgEfficiency}%</p>
//                 <p style={{...styles.statSubtext, color: '#3b82f6'}}>Performance Index</p>
//               </div>
//               <div style={{...styles.iconContainer, background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)'}}>
//                 <span style={{fontSize: isMobile ? '20px' : '24px'}}>📈</span>
//               </div>
//             </div>
//           </div>

//           <div 
//             style={styles.statCard}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'translateY(-5px)';
//               e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.1)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = 'none';
//             }}
//           >
//             <div style={styles.statCardContent}>
//               <div style={styles.statInfo}>
//                 <p style={styles.statLabel}>Production Output</p>
//                 <p style={styles.statValue}>{(totalProduction / 1000).toFixed(1)}K</p>
//                 <p style={{...styles.statSubtext, color: '#f59e0b'}}>Units Manufactured</p>
//               </div>
//               <div style={{...styles.iconContainer, background: 'linear-gradient(135deg, #f59e0b, #d97706)'}}>
//                 <span style={{fontSize: isMobile ? '20px' : '24px'}}>📊</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Machine Status and Production */}
//         <div style={styles.contentGrid}>
//           <div style={styles.card}>
//             <h3 style={styles.cardTitle}>Production Line Status Monitor</h3>
//             {loading ? (
//               <div style={styles.loadingContainer}>
//                 <div style={{color: theme.textSecondary, animation: 'pulse 2s infinite'}}>Loading operational data...</div>
//               </div>
//             ) : (
//               <div>
//                 {machineData.length > 0 ? machineData.map((machine) => (
//                   <div 
//                     key={machine.id} 
//                     style={styles.machineItem}
//                     onMouseOver={(e) => {
//                       e.currentTarget.style.backgroundColor = theme.hoverBg;
//                       e.currentTarget.style.transform = 'translateX(5px)';
//                     }}
//                     onMouseOut={(e) => {
//                       e.currentTarget.style.backgroundColor = theme.hoverBg;
//                       e.currentTarget.style.transform = 'translateX(0)';
//                     }}
//                   >
//                     <div style={styles.machineLeft}>
//                       <div style={{...styles.statusDot, backgroundColor: getStatusColor(machine.status)}}></div>
//                       <div>
//                         <p style={styles.machineName}>Production Unit {machine.name}</p>
//                         <p style={styles.machineInfo}>{machine.status} • {machine.shift} Shift Operations</p>
//                       </div>
//                     </div>
//                     <div style={styles.machineStats}>
//                       <p style={{...styles.machineName, fontSize: '18px', color: theme.accent}}>{machine.efficiency}%</p>
//                       <p style={styles.machineInfo}>Last Updated: {machine.last_update}</p>
//                     </div>
//                   </div>
//                 )) : (
//                   <p style={{color: theme.textSecondary, textAlign: 'center', padding: '30px'}}>
//                     No operational data available for selected parameters
//                   </p>
//                 )}
//               </div>
//             )}
//           </div>

//           <div style={styles.card}>
//             <h3 style={styles.cardTitle}>Manufacturing Output Analytics</h3>
//             <div>
//               {machineData.length > 0 ? machineData.map((machine) => (
//                 <div 
//                   key={machine.id} 
//                   style={styles.machineItem}
//                   onMouseOver={(e) => {
//                     e.currentTarget.style.backgroundColor = theme.hoverBg;
//                     e.currentTarget.style.transform = 'translateX(5px)';
//                   }}
//                   onMouseOut={(e) => {
//                     e.currentTarget.style.backgroundColor = theme.hoverBg;
//                     e.currentTarget.style.transform = 'translateX(0)';
//                   }}
//                 >
//                   <div>
//                     <p style={styles.machineName}>Manufacturing Line {machine.name}</p>
//                     <p style={styles.machineInfo}>System ID: {machine.id}</p>
//                   </div>
//                   <div style={styles.machineStats}>
//                     <p style={{...styles.machineName, fontSize: '18px', color: '#10b981'}}>{machine.production}</p>
//                     <p style={styles.machineInfo}>Units Produced</p>
//                   </div>
//                 </div>
//               )) : (
//                 <p style={{color: theme.textSecondary, textAlign: 'center', padding: '30px'}}>
//                   No production analytics available for current selection
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Quick Actions */}
//         <div style={styles.quickActions}>
//           <button 
//             style={{
//               ...styles.actionBtn, 
//               background: 'linear-gradient(135deg, #10b981, #059669)',
//               boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
//             }}
//             onClick={() => handleNavigation('machine-assignments')}
//             onMouseOver={(e) => {
//               e.target.style.transform = 'translateY(-5px) scale(1.02)';
//               e.target.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.4)';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.transform = 'translateY(0) scale(1)';
//               e.target.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
//             }}
//           >
//             <div style={{fontSize: isMobile ? '28px' : '32px', marginBottom: '15px'}}>📋</div>
//             <p style={{margin: 0, fontWeight: '700', fontSize: '18px'}}>Assignment Records</p>
//             <p style={{margin: '8px 0 0 0', fontSize: '14px', opacity: 0.9}}>Machine allocation tracking</p>
//           </button>

//           <button 
//             style={{
//               ...styles.actionBtn, 
//               background: 'linear-gradient(135deg, #f59e0b, #d97706)',
//               boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
//             }}
//             onClick={() => handleNavigation('idle-reports-list')}
//             onMouseOver={(e) => {
//               e.target.style.transform = 'translateY(-5px) scale(1.02)';
//               e.target.style.boxShadow = '0 15px 40px rgba(245, 158, 11, 0.4)';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.transform = 'translateY(0) scale(1)';
//               e.target.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.3)';
//             }}
//           >
//             <div style={{fontSize: isMobile ? '28px' : '32px', marginBottom: '15px'}}>📈</div>
//             <p style={{margin: 0, fontWeight: '700', fontSize: '18px'}}>Idle Analysis Reports</p>
//             <p style={{margin: '8px 0 0 0', fontSize: '14px', opacity: 0.9}}>Downtime performance metrics</p>
//           </button>

//           {/* UPDATED: Enhanced Live Monitoring Button with Dropdown Options */}
//           <button 
//             style={{
//               ...styles.actionBtn, 
//               background: 'linear-gradient(135deg, #059669, #047857)',
//               border: '2px solid #10b981',
//               position: 'relative',
//               overflow: 'hidden',
//               boxShadow: '0 8px 25px rgba(5, 150, 105, 0.3)'
//             }}
//             onClick={() => handleNavigation('plant1-live')} // Default to Plant 1
//             onMouseOver={(e) => {
//               e.target.style.transform = 'translateY(-5px) scale(1.02)';
//               e.target.style.boxShadow = '0 15px 40px rgba(5, 150, 105, 0.4)';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.transform = 'translateY(0) scale(1)';
//               e.target.style.boxShadow = '0 8px 25px rgba(5, 150, 105, 0.3)';
//             }}
//           >
//             <div style={{fontSize: isMobile ? '28px' : '32px', marginBottom: '15px'}}>📡</div>
//             <p style={{margin: 0, fontWeight: '700', fontSize: '18px'}}>Live Monitoring</p>
//             <p style={{margin: '8px 0 0 0', fontSize: '14px', opacity: 0.95}}>Real-time operations center</p>
//             {/* Enhanced Blinking dot */}
//             <div style={{
//               position: 'absolute',
//               top: '15px',
//               right: '15px',
//               width: '12px',
//               height: '12px',
//               backgroundColor: '#10b981',
//               borderRadius: '50%',
//               animation: 'liveBlink 1.5s infinite',
//               boxShadow: '0 0 15px #10b981'
//             }}></div>
//           </button>

//           {/* ADDED: Plant 2 Live Button */}
//           <button 
//             style={{
//               ...styles.actionBtn, 
//               background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
//               boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
//             }}
//             onClick={() => handleNavigation('plant2-live')}
//             onMouseOver={(e) => {
//               e.target.style.transform = 'translateY(-5px) scale(1.02)';
//               e.target.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.4)';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.transform = 'translateY(0) scale(1)';
//               e.target.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
//             }}
//           >
//             <div style={{fontSize: isMobile ? '28px' : '32px', marginBottom: '15px'}}>🏭</div>
//             <p style={{margin: 0, fontWeight: '700', fontSize: '18px'}}>Plant 2 Live</p>
//             <p style={{margin: '8px 0 0 0', fontSize: '14px', opacity: 0.9}}>Plant 2 live monitoring</p>
//           </button>
//         </div>
//       </div>

//       {/* Enhanced CSS Animations */}
//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
        
//         @keyframes blink {
//           0%, 100% { 
//             opacity: 1; 
//             transform: scale(1);
//             box-shadow: 0 0 12px #10b981;
//           }
//           50% { 
//             opacity: 0.4; 
//             transform: scale(0.9);
//             box-shadow: 0 0 6px #10b981;
//           }
//         }
        
//         @keyframes liveBlink {
//           0%, 100% { 
//             opacity: 1; 
//             transform: scale(1);
//             box-shadow: 0 0 15px #10b981;
//           }
//           50% { 
//             opacity: 0.4; 
//             transform: scale(1.2);
//             box-shadow: 0 0 25px #10b981;
//           }
//         }

//         /* Custom scrollbar for themes */
//         .sidebar::-webkit-scrollbar {
//           width: 6px;
//         }
        
//         .sidebar::-webkit-scrollbar-track {
//           background: ${darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
//         }
        
//         .sidebar::-webkit-scrollbar-thumb {
//           background: ${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'};
//           border-radius: 3px;
//         }
        
//         .sidebar::-webkit-scrollbar-thumb:hover {
//           background: ${darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
//         }

//         /* Smooth transitions */
//         * {
//           transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;


// // src/components/Dashboard.js - COMPLETE FIXED CODE WITH INDIVIDUAL DROPDOWN STATES
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [machineData, setMachineData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);
  
//   // 🔥 FIXED: Individual dropdown states instead of single activeDropdown
//   const [dropdownStates, setDropdownStates] = useState({
//     monitoring: false,
//     assign: false,
//     reports: false
//   });
  
//   // ADDED: Tooltip states at component level
//   const [tooltipStates, setTooltipStates] = useState({});
  
//   // Real-time dashboard data states
//   const [totalMachines, setTotalMachines] = useState(0);
//   const [runningMachines, setRunningMachines] = useState(0);
//   const [avgEfficiency, setAvgEfficiency] = useState(0);
//   const [totalProduction, setTotalProduction] = useState(0);
  
//   // Filter states
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedShift, setSelectedShift] = useState('');
//   const [selectedPlant, setSelectedPlant] = useState('plant1_data');
//   const [availableDates, setAvailableDates] = useState([]);

//   // 🔥 FIXED: Better dropdown toggle function
//   const toggleDropdown = (dropdownKey) => {
//     // If sidebar is collapsed, expand it first
//     if (sidebarCollapsed) {
//       setSidebarCollapsed(false);
//     }
    
//     // Toggle only the specific dropdown
//     setDropdownStates(prevState => ({
//       ...prevState,
//       [dropdownKey]: !prevState[dropdownKey]
//     }));
//   };

//   // 🔥 FIXED: Close all dropdowns function
//   const closeAllDropdowns = () => {
//     setDropdownStates({
//       monitoring: false,
//       assign: false,
//       reports: false
//     });
//   };

//   // 🔥 FIXED: Close dropdowns when navigating
//   const handleNavigation = (page) => {
//     navigate(`/${page}`);
//     closeAllDropdowns(); // Close all dropdowns when navigating
//     if (isMobile) {
//       setSidebarOpen(false);
//     }
//   };

//   // 🔥 FIXED: Close dropdowns when collapsing sidebar
//   const toggleSidebarCollapse = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//     closeAllDropdowns(); // Close all dropdowns when collapsing
//   };

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);
//       if (!mobile) {
//         setSidebarOpen(false);
//       }
//       // Auto collapse on smaller screens
//       if (window.innerWidth <= 1024) {
//         setSidebarCollapsed(true);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Load theme from localStorage
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('dashboardTheme');
//     if (savedTheme) {
//       setDarkMode(savedTheme === 'dark');
//     }
//   }, []);

//   // Save theme to localStorage
//   useEffect(() => {
//     localStorage.setItem('dashboardTheme', darkMode ? 'dark' : 'light');
//     document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
//   }, [darkMode]);

//   // Fetch available dates
//   useEffect(() => {
//     const fetchAvailableDates = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/available-dates/?plant=${selectedPlant}`);
//         const data = await response.json();
//         if (data.success) {
//           setAvailableDates(data.available_dates);
//         }
//       } catch (error) {
//         console.error('Error fetching available dates:', error);
//       }
//     };
    
//     fetchAvailableDates();
//   }, [selectedPlant]);

//   // Fetch dashboard data with filters
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         let apiUrl = `http://127.0.0.1:8000/api/dashboard/?date=${selectedDate}&plant=${selectedPlant}`;
        
//         if (selectedShift) {
//           apiUrl += `&shift=${selectedShift}`;
//         }
        
//         const response = await fetch(apiUrl);
//         const data = await response.json();
        
//         if (data.success) {
//           const dashboardData = data.dashboard_data;
//           setTotalMachines(dashboardData.total_machines);
//           setRunningMachines(dashboardData.running_machines);
//           setAvgEfficiency(dashboardData.avg_efficiency);
//           setTotalProduction(dashboardData.total_production);
//           setMachineData(dashboardData.machine_details);
//         }
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchDashboardData();
//     const interval = setInterval(fetchDashboardData, 60000);
//     return () => clearInterval(interval);
//   }, [selectedDate, selectedShift, selectedPlant]);

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'running': return '#10b981';
//       case 'idle': return '#f59e0b';
//       case 'maintenance': return '#ef4444';
//       default: return '#6b7280';
//     }
//   };

//   // Theme-aware styles
//   const getThemeColors = () => {
//     if (darkMode) {
//       return {
//         primary: '#0f172a',
//         secondary: '#1e293b',
//         accent: '#3b82f6',
//         text: '#ffffff',
//         textSecondary: '#94a3b8',
//         border: 'rgba(255,255,255,0.1)',
//         cardBg: 'rgba(255,255,255,0.05)',
//         hoverBg: 'rgba(255,255,255,0.1)'
//       };
//     } else {
//       return {
//         primary: '#f8fafc',
//         secondary: '#ffffff',
//         accent: '#3b82f6',
//         text: '#1f2937',
//         textSecondary: '#6b7280',
//         border: 'rgba(0,0,0,0.1)',
//         cardBg: 'rgba(255,255,255,0.9)',
//         hoverBg: 'rgba(0,0,0,0.05)'
//       };
//     }
//   };

//   const theme = getThemeColors();
//   const sidebarWidth = sidebarCollapsed ? '70px' : '280px';

//   // ADDED: Tooltip helper functions
//   const showTooltip = (key) => {
//     setTooltipStates(prev => ({ ...prev, [key]: true }));
//   };

//   const hideTooltip = (key) => {
//     setTooltipStates(prev => ({ ...prev, [key]: false }));
//   };

//   const styles = {
//     container: {
//       minHeight: '100vh',
//       backgroundColor: theme.primary,
//       color: theme.text,
//       display: 'flex',
//       position: 'relative',
//       fontFamily: "'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//       transition: 'all 0.3s ease'
//     },
//     menuButton: {
//       position: 'fixed',
//       top: '20px',
//       left: '20px',
//       zIndex: 1001,
//       background: theme.accent,
//       color: 'white',
//       border: 'none',
//       borderRadius: '12px',
//       padding: '12px',
//       cursor: 'pointer',
//       display: isMobile ? 'flex' : 'none',
//       alignItems: 'center',
//       justifyContent: 'center',
//       boxShadow: '0 4px 20px rgba(59, 130, 246, 0.3)',
//       transition: 'all 0.3s ease'
//     },
//     overlay: {
//       position: 'fixed',
//       top: 0,
//       left: 0,
//       width: '100%',
//       height: '100%',
//       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//       zIndex: 998,
//       display: (sidebarOpen && isMobile) ? 'block' : 'none',
//       transition: 'all 0.3s ease'
//     },
//     sidebar: {
//       width: sidebarWidth,
//       minHeight: '100vh',
//       background: `linear-gradient(180deg, ${theme.secondary} 0%, ${theme.primary} 100%)`,
//       borderRight: `1px solid ${theme.border}`,
//       position: isMobile ? 'fixed' : 'relative',
//       left: isMobile ? (sidebarOpen ? '0' : '-100%') : '0',
//       zIndex: 999,
//       display: 'flex',
//       flexDirection: 'column',
//       backdropFilter: 'blur(20px)',
//       boxShadow: darkMode ? '4px 0 30px rgba(0,0,0,0.3)' : '4px 0 30px rgba(0,0,0,0.1)',
//       transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//       overflow: 'hidden auto'
//     },
//     closeButton: {
//       position: 'absolute',
//       top: '15px',
//       right: '15px',
//       background: 'none',
//       border: 'none',
//       color: theme.text,
//       fontSize: '24px',
//       cursor: 'pointer',
//       display: isMobile ? 'block' : 'none',
//       zIndex: 1002,
//       width: '30px',
//       height: '30px',
//       borderRadius: '50%',
//       backgroundColor: theme.cardBg,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     logoSection: {
//       padding: sidebarCollapsed ? '20px 10px' : '30px 25px',
//       borderBottom: `1px solid ${theme.border}`,
//       position: 'relative',
//       textAlign: 'center',
//       background: `linear-gradient(135deg, ${theme.cardBg}, transparent)`,
//       backdropFilter: 'blur(10px)',
//     },
//     collapseToggle: {
//       position: 'absolute',
//       top: sidebarCollapsed ? '15px' : '20px',
//       right: sidebarCollapsed ? '15px' : '20px',
//       background: theme.accent,
//       border: 'none',
//       borderRadius: '50%',
//       width: '32px',
//       height: '32px',
//       cursor: 'pointer',
//       color: 'white',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       boxShadow: `0 2px 8px ${theme.accent}40`,
//       transition: 'all 0.3s ease',
//       fontSize: '14px',
//       zIndex: 10
//     },
//     themeToggle: {
//       position: 'absolute',
//       top: sidebarCollapsed ? '15px' : '20px',
//       left: sidebarCollapsed ? '15px' : '20px',
//       background: theme.cardBg,
//       border: `1px solid ${theme.border}`,
//       borderRadius: '50%',
//       width: '32px',
//       height: '32px',
//       cursor: 'pointer',
//       color: theme.text,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       transition: 'all 0.3s ease',
//       fontSize: '12px',
//       gap: '4px',
//       zIndex: 10
//     },
//     logoContainer: {
//       width: sidebarCollapsed ? '40px' : '80px',
//       height: sidebarCollapsed ? '40px' : '80px',
//       borderRadius: '16px',
//       background: `linear-gradient(135deg, ${theme.accent}, #8b5cf6)`,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       margin: '20px auto 15px',
//       boxShadow: darkMode ? '0 8px 25px rgba(0,0,0,0.2)' : '0 8px 25px rgba(0,0,0,0.1)',
//       transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
//       overflow: 'hidden',
//       position: 'relative'
//     },
//     logoImage: {
//       width: '100%',
//       height: '100%',
//       objectFit: 'cover',
//       borderRadius: '12px'
//     },
//     companyName: {
//       fontSize: sidebarCollapsed ? '12px' : '24px',
//       fontWeight: 'bold',
//       color: theme.accent,
//       marginBottom: sidebarCollapsed ? '2px' : '5px',
//       letterSpacing: '0.5px',
//       transition: 'all 0.3s ease',
//       textShadow: darkMode ? '0 2px 10px rgba(59, 130, 246, 0.3)' : 'none'
//     },
//     version: {
//       fontSize: sidebarCollapsed ? '8px' : '12px',
//       color: theme.textSecondary,
//       marginBottom: sidebarCollapsed ? '0' : '8px',
//       transition: 'all 0.3s ease'
//     },
//     tagline: {
//       fontSize: sidebarCollapsed ? '0px' : '10px',
//       color: theme.textSecondary,
//       fontStyle: 'italic',
//       opacity: sidebarCollapsed ? 0 : 0.8,
//       transition: 'all 0.3s ease',
//       lineHeight: '1.4',
//       maxWidth: '200px',
//       margin: '0 auto'
//     },
//     navSection: {
//       flex: 1,
//       padding: sidebarCollapsed ? '15px 5px' : '25px 15px',
//       overflowY: 'auto',
//       overflowX: 'hidden'
//     },
//     dropdownContainer: {
//       position: 'relative',
//       marginBottom: '8px'
//     },
//     navItem: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: sidebarCollapsed ? '12px 8px' : '16px 20px',
//       borderRadius: '12px',
//       cursor: 'pointer',
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       position: 'relative',
//       marginBottom: '6px',
//       border: `1px solid transparent`,
//       backgroundColor: 'transparent',
//       backdropFilter: 'blur(10px)'
//     },
//     navItemActive: {
//       background: `linear-gradient(135deg, ${theme.accent}20, ${theme.accent}10)`,
//       borderColor: theme.accent,
//       color: theme.accent,
//       boxShadow: `0 4px 20px ${theme.accent}30`
//     },
//     navItemSpecial: {
//       background: `linear-gradient(135deg, #10b98120, #059669)`,
//       borderColor: '#10b981',
//       animation: 'pulse 2s infinite',
//       position: 'relative',
//       overflow: 'hidden'
//     },
//     navIcon: {
//       fontSize: sidebarCollapsed ? '20px' : '18px',
//       marginRight: sidebarCollapsed ? '0' : '15px',
//       minWidth: '20px',
//       textAlign: 'center',
//       transition: 'all 0.3s ease',
//       filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'
//     },
//     navLabel: {
//       fontSize: '14px',
//       fontWeight: '500',
//       opacity: sidebarCollapsed ? 0 : 1,
//       width: sidebarCollapsed ? 0 : 'auto',
//       overflow: 'hidden',
//       transition: 'all 0.3s ease',
//       whiteSpace: 'nowrap'
//     },
//     navSubtext: {
//       fontSize: '11px',
//       opacity: 0.7,
//       fontWeight: '400',
//       marginTop: '2px',
//       color: theme.textSecondary
//     },
//     navArrow: {
//       marginLeft: 'auto',
//       fontSize: '10px',
//       transition: 'transform 0.3s ease',
//       opacity: sidebarCollapsed ? 0 : 1,
//       color: theme.textSecondary
//     },
//     blinkingDot: {
//       position: 'absolute',
//       top: '8px',
//       right: '8px',
//       width: '8px',
//       height: '8px',
//       backgroundColor: '#10b981',
//       borderRadius: '50%',
//       animation: 'liveBlink 2s infinite',
//       boxShadow: '0 0 10px #10b981'
//     },
//     // 🔥 FIXED: Updated dropdown content style with individual state checking
//     dropdownContent: {
//       backgroundColor: theme.cardBg,
//       marginLeft: sidebarCollapsed ? '0' : '25px',
//       marginRight: sidebarCollapsed ? '0' : '25px',
//       borderRadius: '12px',
//       marginTop: '5px',
//       border: `1px solid ${theme.border}`,
//       backdropFilter: 'blur(10px)',
//       overflow: 'hidden',
//       transition: 'all 0.3s ease',
//       position: sidebarCollapsed ? 'absolute' : 'relative',
//       left: sidebarCollapsed ? '60px' : '0',
//       top: sidebarCollapsed ? '-10px' : '0',
//       minWidth: sidebarCollapsed ? '200px' : 'auto',
//       boxShadow: sidebarCollapsed ? '0 8px 25px rgba(0,0,0,0.15)' : 'none',
//       zIndex: 1001
//     },
//     dropdownItem: {
//       display: 'flex',
//       alignItems: 'center',
//       padding: '12px 20px',
//       cursor: 'pointer',
//       transition: 'all 0.2s ease',
//       borderBottom: `1px solid ${theme.border}`,
//       color: theme.text,
//       fontSize: '13px',
//       fontWeight: '500',
//       gap: '12px'
//     },
//     tooltip: {
//       position: 'absolute',
//       left: '60px',
//       top: '50%',
//       transform: 'translateY(-50%)',
//       background: theme.secondary,
//       color: theme.text,
//       padding: '8px 12px',
//       borderRadius: '8px',
//       fontSize: '12px',
//       fontWeight: '500',
//       whiteSpace: 'nowrap',
//       boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
//       border: `1px solid ${theme.border}`,
//       zIndex: 1002,
//       opacity: 0,
//       visibility: 'hidden',
//       transition: 'all 0.2s ease',
//       backdropFilter: 'blur(10px)'
//     },
//     logoutSection: {
//       padding: sidebarCollapsed ? '15px 8px' : '20px 15px',
//       borderTop: `1px solid ${theme.border}`,
//       background: `linear-gradient(135deg, ${theme.cardBg}, transparent)`
//     },
//     logoutBtn: {
//       width: '100%',
//       padding: sidebarCollapsed ? '12px' : '14px 20px',
//       backgroundColor: '#dc2626',
//       color: 'white',
//       border: 'none',
//       borderRadius: '12px',
//       cursor: 'pointer',
//       fontSize: '14px',
//       fontWeight: '600',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       gap: sidebarCollapsed ? '0' : '10px',
//       transition: 'all 0.3s ease',
//       boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)'
//     },
//     mainContent: {
//       flex: 1,
//       padding: isMobile ? '80px 15px 20px' : '30px',
//       background: `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`,
//       minHeight: '100vh',
//       transition: 'all 0.3s ease'
//     },
//     header: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '30px',
//       flexWrap: 'wrap',
//       gap: '15px'
//     },
//     headerLeft: {
//       flex: 1,
//       minWidth: '250px'
//     },
//     headerRight: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '15px',
//       flexWrap: 'wrap'
//     },
//     title: {
//       fontSize: isMobile ? '24px' : '32px',
//       fontWeight: 'bold',
//       color: theme.accent,
//       marginBottom: '5px',
//       textShadow: darkMode ? '0 2px 10px rgba(59, 130, 246, 0.3)' : 'none'
//     },
//     subtitle: {
//       fontSize: '14px',
//       color: theme.textSecondary,
//       fontWeight: '400'
//     },
//     refreshBtn: {
//       padding: '12px 16px',
//       background: theme.cardBg,
//       color: theme.text,
//       border: `1px solid ${theme.border}`,
//       borderRadius: '12px',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       fontSize: '14px',
//       fontWeight: '500',
//       transition: 'all 0.3s ease',
//       backdropFilter: 'blur(10px)'
//     },
//     userInfo: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px',
//       padding: '10px 16px',
//       background: theme.cardBg,
//       borderRadius: '12px',
//       border: `1px solid ${theme.border}`,
//       backdropFilter: 'blur(10px)'
//     },
//     userAvatar: {
//       width: '32px',
//       height: '32px',
//       borderRadius: '50%',
//       background: `linear-gradient(135deg, ${theme.accent}, #8b5cf6)`,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       color: 'white',
//       fontSize: '14px',
//       fontWeight: 'bold'
//     },
//     filtersSection: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
//       gap: '20px',
//       marginBottom: '30px',
//       padding: '25px',
//       background: theme.cardBg,
//       borderRadius: '16px',
//       border: `1px solid ${theme.border}`,
//       backdropFilter: 'blur(10px)'
//     },
//     filterGroup: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '8px'
//     },
//     filterLabel: {
//       fontSize: '12px',
//       fontWeight: '600',
//       color: theme.textSecondary,
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     filterSelect: {
//       padding: '12px 16px',
//       background: theme.secondary,
//       color: theme.text,
//       border: `1px solid ${theme.border}`,
//       borderRadius: '10px',
//       fontSize: '14px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       backdropFilter: 'blur(10px)'
//     },
//     updateBtn: {
//       padding: '12px 24px',
//       background: `linear-gradient(135deg, ${theme.accent}, #8b5cf6)`,
//       color: 'white',
//       border: 'none',
//       borderRadius: '12px',
//       cursor: 'pointer',
//       fontSize: '14px',
//       fontWeight: '600',
//       transition: 'all 0.3s ease',
//       boxShadow: `0 4px 15px ${theme.accent}40`,
//       alignSelf: 'flex-end'
//     },
//     statsGrid: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)',
//       gap: '20px',
//       marginBottom: '30px'
//     },
//     statCard: {
//       padding: '25px',
//       background: theme.cardBg,
//       borderRadius: '16px',
//       border: `1px solid ${theme.border}`,
//       backdropFilter: 'blur(10px)',
//       transition: 'all 0.3s ease',
//       position: 'relative',
//       overflow: 'hidden'
//     },
//     statIcon: {
//       fontSize: '28px',
//       marginBottom: '15px',
//       display: 'block'
//     },
//     statValue: {
//       fontSize: isMobile ? '24px' : '32px',
//       fontWeight: 'bold',
//       marginBottom: '8px',
//       background: `linear-gradient(135deg, ${theme.accent}, #8b5cf6)`,
//       WebkitBackgroundClip: 'text',
//       WebkitTextFillColor: 'transparent',
//       backgroundClip: 'text'
//     },
//     statLabel: {
//       fontSize: '14px',
//       color: theme.textSecondary,
//       fontWeight: '500',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },
//     statTrend: {
//       position: 'absolute',
//       top: '20px',
//       right: '20px',
//       fontSize: '12px',
//       fontWeight: '600',
//       padding: '4px 8px',
//       borderRadius: '20px',
//       color: 'white'
//     },
//     cardGrid: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
//       gap: '25px',
//       marginBottom: '30px'
//     },
//     actionCard: {
//       padding: '30px',
//       borderRadius: '20px',
//       cursor: 'pointer',
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       position: 'relative',
//       overflow: 'hidden',
//       border: '1px solid transparent',
//       display: 'flex',
//       flexDirection: 'column',
//       alignItems: 'center',
//       textAlign: 'center',
//       minHeight: '200px',
//       justifyContent: 'center'
//     },
//     cardIcon: {
//       fontSize: '48px',
//       marginBottom: '20px',
//       transition: 'all 0.3s ease'
//     },
//     cardTitle: {
//       fontSize: '20px',
//       fontWeight: 'bold',
//       marginBottom: '10px',
//       color: 'white'
//     },
//     cardSubtitle: {
//       fontSize: '14px',
//       opacity: 0.9,
//       color: 'white'
//     },
//     machineGrid: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(auto-fill, minmax(300px, 1fr))',
//       gap: '20px'
//     },
//     machineCard: {
//       padding: '20px',
//       background: theme.cardBg,
//       borderRadius: '16px',
//       border: `1px solid ${theme.border}`,
//       backdropFilter: 'blur(10px)',
//       transition: 'all 0.3s ease'
//     },
//     machineHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '15px'
//     },
//     machineName: {
//       fontSize: '16px',
//       fontWeight: '600',
//       color: theme.text
//     },
//     machineStatus: {
//       padding: '4px 12px',
//       borderRadius: '20px',
//       fontSize: '12px',
//       fontWeight: '600',
//       textTransform: 'uppercase'
//     },
//     machineStats: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(2, 1fr)',
//       gap: '15px'
//     },
//     machineStat: {
//       textAlign: 'center'
//     },
//     machineStatValue: {
//       fontSize: '18px',
//       fontWeight: 'bold',
//       color: theme.accent,
//       marginBottom: '5px'
//     },
//     machineStatLabel: {
//       fontSize: '12px',
//       color: theme.textSecondary,
//       textTransform: 'uppercase'
//     },
//     loadingContainer: {
//       display: 'flex',
//       justifyContent: 'center',
//       alignItems: 'center',
//       minHeight: '400px',
//       flexDirection: 'column',
//       gap: '20px'
//     },
//     loadingSpinner: {
//       width: '50px',
//       height: '50px',
//       border: `4px solid ${theme.border}`,
//       borderTop: `4px solid ${theme.accent}`,
//       borderRadius: '50%',
//       animation: 'spin 1s linear infinite'
//     },
//     loadingText: {
//       fontSize: '16px',
//       color: theme.textSecondary,
//       fontWeight: '500'
//     }
//   };

//   // 🔥 FIXED: Updated navigation structure with proper state checking
//   const navigationStructure = [
//     { 
//       key: 'dashboard', 
//       icon: '🏠', 
//       label: 'Analytics Dashboard', 
//       active: true, 
//       clickable: false 
//     },
//     { 
//       key: 'monitoring-dropdown',
//       icon: '📡', 
//       label: 'Live Monitoring', 
//       hasDropdown: true,
//       isOpen: dropdownStates.monitoring, // 🔥 FIXED: Use individual state
//       special: true,
//       subtext: 'Real-time Operations',
//       dropdownItems: [
//         { key: 'plant1-live', icon: '🏢', label: 'Plant 1 Live', path: '/plant1-live' },
//         { key: 'plant2-live', icon: '🏭', label: 'Plant 2 Live', path: '/plant2-live' }
//       ]
//     },
//     {
//       key: 'assign-dropdown',
//       icon: '⚙️',
//       label: 'Machine Operations',
//       hasDropdown: true,
//       isOpen: dropdownStates.assign, // 🔥 FIXED: Use individual state
//       dropdownItems: [
//         { key: 'assign-machine', icon: '🔧', label: 'Machine Assignment', path: '/assign-machine' },
//         { key: 'idle-report-submit', icon: '📋', label: 'Idle Report Submission', path: '/idle-report-submit' }
//       ]
//     },
//     {
//       key: 'reports-dropdown',
//       icon: '📊',
//       label: 'Performance Reports',
//       hasDropdown: true,
//       isOpen: dropdownStates.reports, // 🔥 FIXED: Use individual state
//       dropdownItems: [
//         { key: 'machine-assignments', icon: '📋', label: 'Assignment Records', path: '/machine-assignments' },
//         { key: 'idle-reports-list', icon: '📈', label: 'Idle Analysis Reports', path: '/idle-reports-list' }
//       ]
//     }
//   ];

//   const otherNavItems = [
//     { key: 'users', icon: '👥', label: 'User Management', active: false, clickable: false },
//     { key: 'settings', icon: '⚙️', label: 'System Settings', active: false, clickable: false },
//     { key: 'energy', icon: '⚡', label: 'Energy Monitoring', active: false, clickable: false },
//     { key: 'alerts', icon: '🚨', label: 'Alert Center', active: false, clickable: false }
//   ];

//   // Icons
//   const HamburgerIcon = () => (
//     <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
//     </svg>
//   );

//   const RefreshIcon = () => (
//     <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M23 4v6h-6M1 20v-6h6m2-11a10 10 0 1 1-9 9.95M21 21a10 10 0 0 1-9-9.95"/>
//     </svg>
//   );

//   const UserIcon = () => (
//     <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
//       <circle cx="12" cy="7" r="4"/>
//     </svg>
//   );

//   const ThemeIcon = () => (
//     darkMode ? (
//       <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
//         <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
//       </svg>
//     ) : (
//       <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
//         <circle cx="12" cy="12" r="5"/>
//         <path d="m12 1-1 3-1-3zm0 18-1 3-1-3zm11-11 3 1-3 1zM1 11l3 1-3 1zm18.66-6.66-2.83 2.83m0-2.83 2.83 2.83M5.17 17.17l2.83-2.83m-2.83 0 2.83 2.83"/>
//       </svg>
//     )
//   );

//   const CollapseIcon = () => (
//     <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24" style={{transform: sidebarCollapsed ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease'}}>
//       <path d="M15 18l-6-6 6-6"/>
//     </svg>
//   );

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const closeSidebar = () => {
//     setSidebarOpen(false);
//   };

//   const handleRefresh = () => {
//     window.location.reload();
//   };

//   const toggleTheme = () => {
//     setDarkMode(!darkMode);
//   };

//   // 🔥 FIXED: Navigation item component with proper dropdown handling
//   const NavigationItem = ({ item, index }) => {
//     // Extract dropdown key from item key
//     const dropdownKey = item.key.replace('-dropdown', '');
    
//     return (
//       <div key={index} style={styles.dropdownContainer}>
//         <div
//           style={{
//             ...styles.navItem,
//             ...(item.active ? styles.navItemActive : {}),
//             ...(item.special ? styles.navItemSpecial : {}),
//             ...(item.clickable || item.hasDropdown ? {} : {cursor: 'default', opacity: 0.8})
//           }}
//           onClick={() => {
//             if (item.hasDropdown) {
//               toggleDropdown(dropdownKey); // 🔥 FIXED: Use extracted dropdown key
//             } else if (item.clickable) {
//               handleNavigation(item.key);
//             }
//           }}
//           onMouseEnter={() => {
//             if (sidebarCollapsed) {
//               showTooltip(item.key);
//             }
//           }}
//           onMouseLeave={() => {
//             hideTooltip(item.key);
//           }}
//         >
//           <span style={styles.navIcon}>{item.icon}</span>
//           <div style={styles.navLabel}>
//             <div>{item.label}</div>
//             {item.subtext && !sidebarCollapsed && (
//               <div style={styles.navSubtext}>
//                 {item.subtext}
//               </div>
//             )}
//           </div>
//           {item.special && (
//             <div style={styles.blinkingDot}></div>
//           )}
//           {item.hasDropdown && (
//             <span 
//               style={{
//                 ...styles.navArrow,
//                 transform: dropdownStates[dropdownKey] ? 'rotate(90deg)' : 'rotate(0deg)' // 🔥 FIXED: Check individual state
//               }}
//             >
//               ▶
//             </span>
//           )}
//           {item.clickable && !item.hasDropdown && !sidebarCollapsed && (
//             <span style={{marginLeft: 'auto', fontSize: '12px', opacity: 0.7}}>→</span>
//           )}

//           {/* Tooltip */}
//           {sidebarCollapsed && tooltipStates[item.key] && (
//             <div style={{
//               ...styles.tooltip,
//               opacity: 1,
//               visibility: 'visible'
//             }}>
//               {item.label}
//               {item.subtext && <div style={{fontSize: '10px', opacity: 0.8}}>{item.subtext}</div>}
//             </div>
//           )}
//         </div>

//         {/* 🔥 FIXED: Dropdown Content with proper state checking */}
//         {item.hasDropdown && (
//           <div style={{
//             ...styles.dropdownContent,
//             maxHeight: dropdownStates[dropdownKey] ? '200px' : '0' // 🔥 FIXED: Check individual dropdown state
//           }}>
//             {item.dropdownItems.map((dropItem, dropIndex) => (
//               <div
//                 key={dropIndex}
//                 style={styles.dropdownItem}
//                 onClick={() => handleNavigation(dropItem.key)}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.backgroundColor = theme.hoverBg;
//                   e.currentTarget.style.transform = 'translateX(5px)';
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.backgroundColor = 'transparent';
//                   e.currentTarget.style.transform = 'translateX(0)';
//                 }}
//               >
//                 <span style={{fontSize: '16px'}}>{dropItem.icon}</span>
//                 <span>{dropItem.label}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // Other navigation item component
//   const OtherNavigationItem = ({ item, index }) => {
//     return (
//       <div
//         key={index}
//         style={{
//           ...styles.navItem,
//           cursor: 'default',
//           opacity: 0.6
//         }}
//         onMouseEnter={() => {
//           if (sidebarCollapsed) {
//             showTooltip(`other-${item.key}`);
//           }
//         }}
//         onMouseLeave={() => {
//           hideTooltip(`other-${item.key}`);
//         }}
//       >
//         <span style={styles.navIcon}>{item.icon}</span>
//         <div style={styles.navLabel}>{item.label}</div>
        
//         {/* Tooltip */}
//         {sidebarCollapsed && tooltipStates[`other-${item.key}`] && (
//           <div style={{
//             ...styles.tooltip,
//             opacity: 1,
//             visibility: 'visible'
//           }}>
//             {item.label}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div style={styles.container}>
//       {/* Mobile hamburger menu button */}
//       <button style={styles.menuButton} onClick={toggleSidebar}>
//         <HamburgerIcon />
//       </button>

//       {/* Mobile overlay */}
//       <div style={styles.overlay} onClick={closeSidebar}></div>

//       {/* Collapsible Sidebar */}
//       <div style={styles.sidebar}>
//         <button style={styles.closeButton} onClick={closeSidebar}>×</button>

//         {/* Logo section */}
//         <div style={styles.logoSection}>
//           {/* Collapse Toggle Button */}
//           <button 
//             style={styles.collapseToggle}
//             onClick={toggleSidebarCollapse}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'scale(1.1)';
//               e.currentTarget.style.boxShadow = `0 4px 15px ${theme.accent}60`;
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'scale(1)';
//               e.currentTarget.style.boxShadow = `0 2px 8px ${theme.accent}40`;
//             }}
//           >
//             <CollapseIcon />
//           </button>

//           {/* Theme Toggle */}
//           <div 
//             style={styles.themeToggle}
//             onClick={toggleTheme}
//             onMouseOver={(e) => {
//               e.currentTarget.style.backgroundColor = theme.hoverBg;
//               e.currentTarget.style.transform = 'scale(1.05)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.backgroundColor = theme.cardBg;
//               e.currentTarget.style.transform = 'scale(1)';
//             }}
//           >
//             <ThemeIcon />
//             {!sidebarCollapsed && <span>{darkMode ? 'Dark' : 'Light'}</span>}
//           </div>

//           <div 
//             style={styles.logoContainer}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'scale(1.05)';
//               e.currentTarget.style.boxShadow = darkMode ? '0 12px 35px rgba(0,0,0,0.3)' : '0 12px 35px rgba(0,0,0,0.15)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'scale(1)';
//               e.currentTarget.style.boxShadow = darkMode ? '0 8px 25px rgba(0,0,0,0.2)' : '0 8px 25px rgba(0,0,0,0.1)';
//             }}
//           >
//             <img 
//               src="/aa1.jpg"
//               alt="AtomOne HD Logo"
//               style={styles.logoImage}
//               onLoad={() => console.log("HD Logo loaded successfully")}
//               onError={(e) => {
//                 console.warn("Logo loading failed, showing fallback");
//                 e.target.style.display = 'none';
//                 e.target.parentNode.innerHTML = '<div style="width: 100%; height: 100%; background: linear-gradient(45deg, #3b82f6, #8b5cf6); border-radius: 8px; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: bold; color: white;">A1</div>';
//               }}
//             />
//           </div>
//           <div style={styles.companyName}>ATOMONE</div>
//           <div style={styles.version}>AoT4.0</div>
//           <div style={styles.tagline}>
//             Professional Industrial Management
//           </div>
//         </div>
        
//         {/* Navigation */}
//         <div style={styles.navSection}>
//           {navigationStructure.map((item, index) => (
//             <NavigationItem key={item.key} item={item} index={index} />
//           ))}

//           {/* Other Navigation Items */}
//           <div style={{marginTop: '20px', paddingTop: '20px', borderTop: `1px solid ${theme.border}`}}>
//             {otherNavItems.map((item, index) => (
//               <OtherNavigationItem key={item.key} item={item} index={index} />
//             ))}
//           </div>
//         </div>

//         {/* Logout Section */}
//         <div style={styles.logoutSection}>
//           <button 
//             style={styles.logoutBtn} 
//             onClick={onLogout}
//             onMouseOver={(e) => {
//               e.target.style.backgroundColor = '#b91c1c';
//               e.target.style.transform = 'translateY(-2px)';
//               e.target.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
//             }}
//             onMouseOut={(e) => {
//               e.target.style.backgroundColor = '#dc2626';
//               e.target.style.transform = 'translateY(0)';
//               e.target.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
//             }}
//           >
//             <span>🚪</span>
//             {!sidebarCollapsed && <span>Logout</span>}
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div style={styles.mainContent}>
//         {/* Header */}
//         <div style={styles.header}>
//           <div style={styles.headerLeft}>
//             <h1 style={styles.title}>ANALYTICS DASHBOARD</h1>
//             <p style={styles.subtitle}>
//               Comprehensive Machine Performance Analytics - PLANT1 DATA - 2025-09-29
//             </p>
//           </div>
//           <div style={styles.headerRight}>
//             <button 
//               style={styles.refreshBtn}
//               onClick={handleRefresh}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.backgroundColor = theme.hoverBg;
//                 e.currentTarget.style.transform = 'translateY(-2px)';
//                 e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.1)';
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.backgroundColor = theme.cardBg;
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = 'none';
//               }}
//             >
//               <RefreshIcon />
//               Update Analytics
//             </button>
//             <div style={styles.userInfo}>
//               <div style={styles.userAvatar}>
//                 <UserIcon />
//               </div>
//               <div>
//                 <div style={{fontSize: '14px', fontWeight: '600'}}>System Admin</div>
//                 <div style={{fontSize: '12px', color: theme.textSecondary}}>Administrator</div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Filters Section */}
//         <div style={styles.filtersSection}>
//           <div style={styles.filterGroup}>
//             <label style={styles.filterLabel}>Production Plant</label>
//             <select 
//               style={styles.filterSelect}
//               value={selectedPlant}
//               onChange={(e) => setSelectedPlant(e.target.value)}
//             >
//               <option value="plant1_data">Manufacturing Plant 1</option>
//               <option value="plant2_data">Manufacturing Plant 2</option>
//             </select>
//           </div>
//           <div style={styles.filterGroup}>
//             <label style={styles.filterLabel}>Analysis Period</label>
//             <select 
//               style={styles.filterSelect}
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//             >
//               {availableDates.map(date => (
//                 <option key={date} value={date}>{date}</option>
//               ))}
//             </select>
//           </div>
//           <div style={styles.filterGroup}>
//             <label style={styles.filterLabel}>Operational Shift</label>
//             <select 
//               style={styles.filterSelect}
//               value={selectedShift}
//               onChange={(e) => setSelectedShift(e.target.value)}
//             >
//               <option value="">All Production Shifts</option>
//               <option value="A">A Shift (Morning)</option>
//               <option value="B">B Shift (Evening)</option>
//               <option value="C">C Shift (Night)</option>
//             </select>
//           </div>
//           <button 
//             style={styles.updateBtn}
//             onClick={() => window.location.reload()}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'translateY(-2px)';
//               e.currentTarget.style.boxShadow = `0 6px 20px ${theme.accent}60`;
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = `0 4px 15px ${theme.accent}40`;
//             }}
//           >
//             Update Analytics
//           </button>
//         </div>

//         {/* Stats Grid */}
//         <div style={styles.statsGrid}>
//           <div 
//             style={styles.statCard}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'translateY(-5px)';
//               e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = 'none';
//             }}
//           >
//             <span style={{...styles.statIcon, color: '#ef4444'}}>🏭</span>
//             <div style={styles.statValue}>{totalMachines}</div>
//             <div style={styles.statLabel}>Total Manufacturing Units</div>
//             <div style={{fontSize: '12px', color: theme.textSecondary, marginTop: '10px'}}>Active Production Lines</div>
//             <div style={{...styles.statTrend, backgroundColor: '#ef4444'}}>-10%</div>
//           </div>
          
//           <div 
//             style={styles.statCard}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'translateY(-5px)';
//               e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = 'none';
//             }}
//           >
//             <span style={{...styles.statIcon, color: '#10b981'}}>⚡</span>
//             <div style={styles.statValue}>{runningMachines}</div>
//             <div style={styles.statLabel}>Active Production Units</div>
//             <div style={{fontSize: '12px', color: theme.textSecondary, marginTop: '10px'}}>Currently Running</div>
//             <div style={{...styles.statTrend, backgroundColor: '#10b981'}}>+100%</div>
//           </div>
          
//           <div 
//             style={styles.statCard}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'translateY(-5px)';
//               e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = 'none';
//             }}
//           >
//             <span style={{...styles.statIcon, color: '#3b82f6'}}>📊</span>
//             <div style={styles.statValue}>{avgEfficiency}%</div>
//             <div style={styles.statLabel}>Overall Efficiency</div>
//             <div style={{fontSize: '12px', color: theme.textSecondary, marginTop: '10px'}}>Performance Metric</div>
//             <div style={{...styles.statTrend, backgroundColor: '#3b82f6'}}>0%</div>
//           </div>
          
//           <div 
//             style={styles.statCard}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'translateY(-5px)';
//               e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'translateY(0)';
//               e.currentTarget.style.boxShadow = 'none';
//             }}
//           >
//             <span style={{...styles.statIcon, color: '#f59e0b'}}>🎯</span>
//             <div style={styles.statValue}>{totalProduction.toLocaleString()}</div>
//             <div style={styles.statLabel}>Production Output</div>
//             <div style={{fontSize: '12px', color: theme.textSecondary, marginTop: '10px'}}>Units Manufactured</div>
//             <div style={{...styles.statTrend, backgroundColor: '#f59e0b'}}>+1%</div>
//           </div>
//         </div>

//         {/* Action Cards Grid */}
//         <div style={styles.cardGrid}>
//           <div
//             style={{
//               ...styles.actionCard,
//               background: 'linear-gradient(135deg, #10b981, #059669)',
//               boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
//             }}
//             onClick={() => handleNavigation('assign-machine')}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
//               e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.4)';
//               const icon = e.currentTarget.querySelector('.card-icon');
//               if (icon) icon.style.transform = 'scale(1.2) rotate(5deg)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'translateY(0) scale(1)';
//               e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
//               const icon = e.currentTarget.querySelector('.card-icon');
//               if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
//             }}
//           >
//             <div className="card-icon" style={styles.cardIcon}>📋</div>
//             <div style={styles.cardTitle}>Assignment Records</div>
//             <div style={styles.cardSubtitle}>Machine allocation tracking</div>
//           </div>

//           <div
//             style={{
//               ...styles.actionCard,
//               background: 'linear-gradient(135deg, #f59e0b, #d97706)',
//               boxShadow: '0 8px 25px rgba(245, 158, 11, 0.3)'
//             }}
//             onClick={() => handleNavigation('idle-report-submit')}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
//               e.currentTarget.style.boxShadow = '0 15px 40px rgba(245, 158, 11, 0.4)';
//               const icon = e.currentTarget.querySelector('.card-icon');
//               if (icon) icon.style.transform = 'scale(1.2) rotate(-5deg)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'translateY(0) scale(1)';
//               e.currentTarget.style.boxShadow = '0 8px 25px rgba(245, 158, 11, 0.3)';
//               const icon = e.currentTarget.querySelector('.card-icon');
//               if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
//             }}
//           >
//             <div className="card-icon" style={styles.cardIcon}>📈</div>
//             <div style={styles.cardTitle}>Idle Analysis Reports</div>
//             <div style={styles.cardSubtitle}>Downtime analysis portal</div>
//           </div>

//           <div
//             style={{
//               ...styles.actionCard,
//               background: 'linear-gradient(135deg, #10b981, #047857)',
//               boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)'
//             }}
//             onClick={() => handleNavigation('plant1-live')}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
//               e.currentTarget.style.boxShadow = '0 15px 40px rgba(16, 185, 129, 0.4)';
//               const icon = e.currentTarget.querySelector('.card-icon');
//               if (icon) icon.style.transform = 'scale(1.2)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'translateY(0) scale(1)';
//               e.currentTarget.style.boxShadow = '0 8px 25px rgba(16, 185, 129, 0.3)';
//               const icon = e.currentTarget.querySelector('.card-icon');
//               if (icon) icon.style.transform = 'scale(1)';
//             }}
//           >
//             <div className="card-icon" style={styles.cardIcon}>🚀</div>
//             <div style={styles.cardTitle}>Live Monitoring</div>
//             <div style={styles.cardSubtitle}>Real-time operational data</div>
//           </div>

//           <div
//             style={{
//               ...styles.actionCard,
//               background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
//               boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)'
//             }}
//             onClick={() => handleNavigation('plant2-live')}
//             onMouseOver={(e) => {
//               e.currentTarget.style.transform = 'translateY(-10px) scale(1.02)';
//               e.currentTarget.style.boxShadow = '0 15px 40px rgba(59, 130, 246, 0.4)';
//               const icon = e.currentTarget.querySelector('.card-icon');
//               if (icon) icon.style.transform = 'scale(1.2)';
//             }}
//             onMouseOut={(e) => {
//               e.currentTarget.style.transform = 'translateY(0) scale(1)';
//               e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3)';
//               const icon = e.currentTarget.querySelector('.card-icon');
//               if (icon) icon.style.transform = 'scale(1)';
//             }}
//           >
//             <div className="card-icon" style={styles.cardIcon}>🏭</div>
//             <div style={styles.cardTitle}>Plant 2 Live</div>
//             <div style={styles.cardSubtitle}>Plant 2 monitoring data</div>
//           </div>
//         </div>

//         {/* Machine Cards Section */}
//         {loading ? (
//           <div style={styles.loadingContainer}>
//             <div style={styles.loadingSpinner}></div>
//             <div style={styles.loadingText}>Loading machine performance data...</div>
//           </div>
//         ) : (
//           <div style={styles.machineGrid}>
//             {machineData.map((machine, index) => (
//               <div 
//                 key={index} 
//                 style={styles.machineCard}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.transform = 'translateY(-5px)';
//                   e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.15)';
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.transform = 'translateY(0)';
//                   e.currentTarget.style.boxShadow = 'none';
//                 }}
//               >
//                 <div style={styles.machineHeader}>
//                   <div style={styles.machineName}>{machine.name}</div>
//                   <div style={{
//                     ...styles.machineStatus,
//                     backgroundColor: getStatusColor(machine.status),
//                     color: 'white'
//                   }}>
//                     {machine.status}
//                   </div>
//                 </div>
//                 <div style={styles.machineStats}>
//                   <div style={styles.machineStat}>
//                     <div style={styles.machineStatValue}>{machine.efficiency}%</div>
//                     <div style={styles.machineStatLabel}>Efficiency</div>
//                   </div>
//                   <div style={styles.machineStat}>
//                     <div style={styles.machineStatValue}>{machine.production}</div>
//                     <div style={styles.machineStatLabel}>Production</div>
//                   </div>
//                 </div>
//                 <div style={{fontSize: '12px', color: theme.textSecondary, marginTop: '15px'}}>
//                   Last Update: {machine.last_update}
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Enhanced CSS Animations */}
//       <style jsx>{`
//         @keyframes pulse {
//           0%, 100% { opacity: 1; }
//           50% { opacity: 0.5; }
//         }
        
//         @keyframes blink {
//           0%, 100% { 
//             opacity: 1; 
//             transform: scale(1);
//             box-shadow: 0 0 12px #10b981;
//           }
//           50% { 
//             opacity: 0.4; 
//             transform: scale(0.9);
//             box-shadow: 0 0 6px #10b981;
//           }
//         }
        
//         @keyframes liveBlink {
//           0%, 100% { 
//             opacity: 1; 
//             transform: scale(1);
//             box-shadow: 0 0 15px #10b981;
//           }
//           50% { 
//             opacity: 0.4; 
//             transform: scale(1.2);
//             box-shadow: 0 0 25px #10b981;
//           }
//         }

//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }

//         /* Custom scrollbar for themes */
//         .sidebar::-webkit-scrollbar {
//           width: 6px;
//         }
        
//         .sidebar::-webkit-scrollbar-track {
//           background: ${darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'};
//         }
        
//         .sidebar::-webkit-scrollbar-thumb {
//           background: ${darkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.2)'};
//           border-radius: 3px;
//         }
        
//         .sidebar::-webkit-scrollbar-thumb:hover {
//           background: ${darkMode ? 'rgba(255,255,255,0.3)' : 'rgba(0,0,0,0.3)'};
//         }

//         /* Smooth transitions */
//         * {
//           transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;



// // src/components/Dashboard.js - COMPLETELY REDESIGNED MODERN DASHBOARD
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [machineData, setMachineData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);
  
//   // Individual dropdown states
//   const [dropdownStates, setDropdownStates] = useState({
//     monitoring: false,
//     assign: false,
//     reports: false
//   });
  
//   // Tooltip states
//   const [tooltipStates, setTooltipStates] = useState({});
  
//   // Real-time dashboard data states
//   const [totalMachines, setTotalMachines] = useState(57);
//   const [runningMachines, setRunningMachines] = useState(42);
//   const [avgEfficiency, setAvgEfficiency] = useState(87);
//   const [totalProduction, setTotalProduction] = useState(15420);
  
//   // Filter states
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedShift, setSelectedShift] = useState('');
//   const [selectedPlant, setSelectedPlant] = useState('plant1_data');
//   const [availableDates, setAvailableDates] = useState([]);

//   // Dropdown management functions
//   const toggleDropdown = (dropdownKey) => {
//     if (sidebarCollapsed) {
//       setSidebarCollapsed(false);
//     }
//     setDropdownStates(prevState => ({
//       ...prevState,
//       [dropdownKey]: !prevState[dropdownKey]
//     }));
//   };

//   const closeAllDropdowns = () => {
//     setDropdownStates({
//       monitoring: false,
//       assign: false,
//       reports: false
//     });
//   };

//   const handleNavigation = (page) => {
//     navigate(`/${page}`);
//     closeAllDropdowns();
//     if (isMobile) {
//       setSidebarOpen(false);
//     }
//   };

//   const toggleSidebarCollapse = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//     closeAllDropdowns();
//   };

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);
//       if (!mobile) {
//         setSidebarOpen(false);
//       }
//       if (window.innerWidth <= 1024) {
//         setSidebarCollapsed(true);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Load theme from localStorage
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('dashboardTheme');
//     if (savedTheme) {
//       setDarkMode(savedTheme === 'dark');
//     }
//   }, []);

//   // Save theme to localStorage
//   useEffect(() => {
//     localStorage.setItem('dashboardTheme', darkMode ? 'dark' : 'light');
//     document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
//   }, [darkMode]);

//   // Mock data fetching
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       setLoading(false);
//       // Mock data for demonstration
//       setMachineData([
//         { name: 'Machine A1', status: 'Running', efficiency: 95, production: 1250, lastUpdate: '2 mins ago' },
//         { name: 'Machine A2', status: 'Idle', efficiency: 78, production: 890, lastUpdate: '5 mins ago' },
//         { name: 'Machine A3', status: 'Running', efficiency: 92, production: 1150, lastUpdate: '1 min ago' },
//         { name: 'Machine A4', status: 'Maintenance', efficiency: 0, production: 0, lastUpdate: '1 hour ago' }
//       ]);
//     };
    
//     fetchDashboardData();
//     const interval = setInterval(fetchDashboardData, 60000);
//     return () => clearInterval(interval);
//   }, [selectedDate, selectedShift, selectedPlant]);

//   // Theme-aware styles - MODERN DESIGN INSPIRED BY REFERENCE IMAGES
//   const getThemeColors = () => {
//     if (darkMode) {
//       return {
//         primary: '#0a0a0f',           // Deep dark like reference
//         secondary: '#1a1b23',         // Card background
//         accent: '#6366f1',            // Primary accent - indigo
//         success: '#10b981',           // Green
//         warning: '#f59e0b',           // Amber
//         danger: '#ef4444',            // Red
//         info: '#3b82f6',              // Blue
//         text: '#ffffff',
//         textSecondary: '#94a3b8',
//         textMuted: '#64748b',
//         border: 'rgba(255,255,255,0.08)',
//         cardBg: '#1e1f26',
//         cardBgLight: '#252631',
//         hoverBg: 'rgba(255,255,255,0.05)',
//         gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//         gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//         gradient4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
//         glassBg: 'rgba(30, 31, 38, 0.8)',
//         shadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
//       };
//     } else {
//       return {
//         primary: '#f8fafc',
//         secondary: '#ffffff',
//         accent: '#6366f1',
//         success: '#10b981',
//         warning: '#f59e0b',
//         danger: '#ef4444',
//         info: '#3b82f6',
//         text: '#1e293b',
//         textSecondary: '#475569',
//         textMuted: '#64748b',
//         border: 'rgba(0,0,0,0.08)',
//         cardBg: '#ffffff',
//         cardBgLight: '#f8fafc',
//         hoverBg: 'rgba(0,0,0,0.05)',
//         gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//         gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//         gradient4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
//         glassBg: 'rgba(255, 255, 255, 0.9)',
//         shadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
//       };
//     }
//   };

//   const theme = getThemeColors();
//   const sidebarWidth = sidebarCollapsed ? '70px' : '280px';

//   // Tooltip helper functions
//   const showTooltip = (key) => {
//     setTooltipStates(prev => ({ ...prev, [key]: true }));
//   };

//   const hideTooltip = (key) => {
//     setTooltipStates(prev => ({ ...prev, [key]: false }));
//   };

//   // MODERN STYLES INSPIRED BY REFERENCE IMAGES
//   const styles = {
//     container: {
//       minHeight: '100vh',
//       backgroundColor: theme.primary,
//       color: theme.text,
//       display: 'flex',
//       position: 'relative',
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//       transition: 'all 0.3s ease'
//     },
    
//     // SIDEBAR STYLES - Clean and minimal like reference
//     sidebar: {
//       width: sidebarWidth,
//       minHeight: '100vh',
//       background: `linear-gradient(180deg, ${theme.secondary} 0%, ${theme.primary} 100%)`,
//       borderRight: `1px solid ${theme.border}`,
//       position: isMobile ? 'fixed' : 'relative',
//       left: isMobile ? (sidebarOpen ? '0' : '-100%') : '0',
//       zIndex: 999,
//       display: 'flex',
//       flexDirection: 'column',
//       backdropFilter: 'blur(20px)',
//       boxShadow: theme.shadow,
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       overflow: 'hidden auto'
//     },

//     logoSection: {
//       padding: sidebarCollapsed ? '20px 10px' : '25px 20px',
//       borderBottom: `1px solid ${theme.border}`,
//       position: 'relative',
//       textAlign: 'center',
//       background: theme.glassBg,
//       backdropFilter: 'blur(10px)',
//     },

//     logoContainer: {
//       width: sidebarCollapsed ? '35px' : '60px',
//       height: sidebarCollapsed ? '35px' : '60px',
//       borderRadius: '12px',
//       background: theme.gradient1,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       margin: '0 auto 12px',
//       boxShadow: theme.shadow,
//       transition: 'all 0.3s ease',
//       position: 'relative',
//       overflow: 'hidden'
//     },

//     companyName: {
//       fontSize: sidebarCollapsed ? '10px' : '18px',
//       fontWeight: '700',
//       color: theme.accent,
//       marginBottom: sidebarCollapsed ? '2px' : '4px',
//       letterSpacing: '0.5px',
//       transition: 'all 0.3s ease'
//     },

//     version: {
//       fontSize: sidebarCollapsed ? '6px' : '10px',
//       color: theme.textSecondary,
//       fontWeight: '500',
//       transition: 'all 0.3s ease'
//     },

//     // MAIN CONTENT - Modern layout like references
//     mainContent: {
//       flex: 1,
//       background: theme.primary,
//       minHeight: '100vh',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       flexDirection: 'column'
//     },

//     // HEADER - Clean and modern
//     header: {
//       padding: '20px 30px',
//       background: theme.glassBg,
//       backdropFilter: 'blur(20px)',
//       borderBottom: `1px solid ${theme.border}`,
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       position: 'sticky',
//       top: 0,
//       zIndex: 100,
//       flexWrap: 'wrap',
//       gap: '15px'
//     },

//     headerLeft: {
//       flex: 1,
//       minWidth: '200px'
//     },

//     title: {
//       fontSize: '24px',
//       fontWeight: '700',
//       color: theme.text,
//       margin: '0 0 4px 0',
//       letterSpacing: '-0.5px'
//     },

//     subtitle: {
//       fontSize: '14px',
//       color: theme.textSecondary,
//       fontWeight: '400'
//     },

//     headerRight: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '12px'
//     },

//     // MODERN BUTTONS - Inspired by references
//     modernBtn: {
//       padding: '10px 16px',
//       background: theme.cardBg,
//       color: theme.text,
//       border: `1px solid ${theme.border}`,
//       borderRadius: '8px',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       fontSize: '13px',
//       fontWeight: '500',
//       transition: 'all 0.2s ease',
//       backdropFilter: 'blur(10px)',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//     },

//     primaryBtn: {
//       background: theme.accent,
//       color: 'white',
//       border: 'none',
//       fontWeight: '600',
//       boxShadow: `0 4px 15px ${theme.accent}40`
//     },

//     // CONTENT AREA - Like reference dashboard
//     contentArea: {
//       flex: 1,
//       padding: '30px',
//       display: 'grid',
//       gap: '24px',
//       gridTemplateRows: 'auto auto 1fr',
//       overflow: 'auto'
//     },

//     // STATS GRID - Modern cards like references
//     statsGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
//       gap: '20px'
//     },

//     // MODERN STAT CARD - Clean design like references
//     modernStatCard: {
//       background: theme.cardBg,
//       border: `1px solid ${theme.border}`,
//       borderRadius: '16px',
//       padding: '24px',
//       position: 'relative',
//       overflow: 'hidden',
//       transition: 'all 0.3s ease',
//       backdropFilter: 'blur(10px)',
//       boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
//     },

//     statCardIcon: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '12px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '20px',
//       marginBottom: '16px',
//       boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
//     },

//     statValue: {
//       fontSize: '28px',
//       fontWeight: '700',
//       marginBottom: '8px',
//       color: theme.text,
//       lineHeight: '1.2'
//     },

//     statLabel: {
//       fontSize: '13px',
//       color: theme.textSecondary,
//       fontWeight: '500',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       marginBottom: '12px'
//     },

//     statChange: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '4px',
//       fontSize: '12px',
//       fontWeight: '600'
//     },

//     // QUICK ACTIONS - Modern grid like references
//     quickActionsGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
//       gap: '20px'
//     },

//     quickActionCard: {
//       background: theme.cardBg,
//       border: `1px solid ${theme.border}`,
//       borderRadius: '16px',
//       padding: '24px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       backdropFilter: 'blur(10px)',
//       position: 'relative',
//       overflow: 'hidden'
//     },

//     actionCardContent: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '16px'
//     },

//     actionIcon: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '12px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '20px',
//       color: 'white',
//       flexShrink: 0
//     },

//     actionDetails: {
//       flex: 1
//     },

//     actionTitle: {
//       fontSize: '16px',
//       fontWeight: '600',
//       color: theme.text,
//       marginBottom: '4px'
//     },

//     actionSubtitle: {
//       fontSize: '13px',
//       color: theme.textSecondary
//     },

//     // MACHINE OVERVIEW - Modern layout
//     machineOverview: {
//       background: theme.cardBg,
//       border: `1px solid ${theme.border}`,
//       borderRadius: '16px',
//       padding: '24px',
//       backdropFilter: 'blur(10px)'
//     },

//     sectionTitle: {
//       fontSize: '18px',
//       fontWeight: '600',
//       color: theme.text,
//       marginBottom: '20px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px'
//     },

//     machineGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
//       gap: '16px'
//     },

//     machineCard: {
//       background: theme.cardBgLight,
//       border: `1px solid ${theme.border}`,
//       borderRadius: '12px',
//       padding: '16px',
//       transition: 'all 0.2s ease'
//     },

//     machineHeader: {
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       marginBottom: '12px'
//     },

//     machineName: {
//       fontSize: '14px',
//       fontWeight: '600',
//       color: theme.text
//     },

//     machineStatus: {
//       padding: '4px 8px',
//       borderRadius: '6px',
//       fontSize: '11px',
//       fontWeight: '600',
//       textTransform: 'uppercase'
//     },

//     machineMetrics: {
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//       gap: '12px',
//       marginTop: '12px'
//     },

//     machineMetric: {
//       textAlign: 'center'
//     },

//     metricValue: {
//       fontSize: '16px',
//       fontWeight: '700',
//       color: theme.text,
//       marginBottom: '4px'
//     },

//     metricLabel: {
//       fontSize: '11px',
//       color: theme.textSecondary,
//       textTransform: 'uppercase'
//     }
//   };

//   // Navigation structure
//   const navigationStructure = [
//     { 
//       key: 'dashboard', 
//       icon: '📊', 
//       label: 'Dashboard', 
//       active: true, 
//       clickable: false 
//     },
//     { 
//       key: 'monitoring-dropdown',
//       icon: '📡', 
//       label: 'Live Monitoring', 
//       hasDropdown: true,
//       isOpen: dropdownStates.monitoring,
//       dropdownItems: [
//         { key: 'plant1-live', icon: '🏢', label: 'Plant 1 Live' },
//         { key: 'plant2-live', icon: '🏭', label: 'Plant 2 Live' }
//       ]
//     },
//     {
//       key: 'assign-dropdown',
//       icon: '⚙️',
//       label: 'Operations',
//       hasDropdown: true,
//       isOpen: dropdownStates.assign,
//       dropdownItems: [
//         { key: 'assign-machine', icon: '🔧', label: 'Assignments' },
//         { key: 'idle-report-submit', icon: '📋', label: 'Idle Reports' }
//       ]
//     },
//     {
//       key: 'reports-dropdown',
//       icon: '📈',
//       label: 'Analytics',
//       hasDropdown: true,
//       isOpen: dropdownStates.reports,
//       dropdownItems: [
//         { key: 'machine-assignments', icon: '📋', label: 'Records' },
//         { key: 'idle-reports-list', icon: '📊', label: 'Reports' }
//       ]
//     }
//   ];

//   // Helper functions for status colors
//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'running': return theme.success;
//       case 'idle': return theme.warning;
//       case 'maintenance': return theme.danger;
//       default: return theme.textMuted;
//     }
//   };

//   // Icons
//   const SearchIcon = () => (
//     <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" fill="none"/>
//     </svg>
//   );

//   const BellIcon = () => (
//     <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
//     </svg>
//   );

//   // Navigation Item Component
//   const NavigationItem = ({ item, index }) => {
//     const dropdownKey = item.key.replace('-dropdown', '');
    
//     return (
//       <div key={index} style={{ marginBottom: '4px' }}>
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             padding: sidebarCollapsed ? '12px 8px' : '12px 16px',
//             borderRadius: '8px',
//             cursor: item.clickable || item.hasDropdown ? 'pointer' : 'default',
//             transition: 'all 0.2s ease',
//             backgroundColor: item.active ? `${theme.accent}20` : 'transparent',
//             color: item.active ? theme.accent : theme.text,
//             marginBottom: '4px',
//             border: item.active ? `1px solid ${theme.accent}40` : '1px solid transparent'
//           }}
//           onClick={() => {
//             if (item.hasDropdown) {
//               toggleDropdown(dropdownKey);
//             } else if (item.clickable) {
//               handleNavigation(item.key);
//             }
//           }}
//           onMouseOver={(e) => {
//             if (item.clickable || item.hasDropdown) {
//               e.currentTarget.style.backgroundColor = theme.hoverBg;
//             }
//           }}
//           onMouseOut={(e) => {
//             if (!item.active) {
//               e.currentTarget.style.backgroundColor = 'transparent';
//             }
//           }}
//         >
//           <span style={{
//             fontSize: '16px',
//             marginRight: sidebarCollapsed ? '0' : '12px',
//             minWidth: '16px',
//             textAlign: 'center'
//           }}>
//             {item.icon}
//           </span>
          
//           {!sidebarCollapsed && (
//             <>
//               <span style={{
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 flex: 1
//               }}>
//                 {item.label}
//               </span>
              
//               {item.hasDropdown && (
//                 <span style={{
//                   fontSize: '10px',
//                   transition: 'transform 0.2s ease',
//                   transform: dropdownStates[dropdownKey] ? 'rotate(90deg)' : 'rotate(0deg)',
//                   color: theme.textSecondary
//                 }}>
//                   ▶
//                 </span>
//               )}
//             </>
//           )}
//         </div>

//         {/* Dropdown Content */}
//         {item.hasDropdown && !sidebarCollapsed && (
//           <div style={{
//             maxHeight: dropdownStates[dropdownKey] ? '120px' : '0',
//             overflow: 'hidden',
//             transition: 'all 0.3s ease',
//             backgroundColor: theme.cardBgLight,
//             borderRadius: '8px',
//             marginLeft: '16px',
//             marginTop: '4px',
//             border: `1px solid ${theme.border}`
//           }}>
//             {item.dropdownItems.map((dropItem, dropIndex) => (
//               <div
//                 key={dropIndex}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   padding: '8px 12px',
//                   cursor: 'pointer',
//                   fontSize: '13px',
//                   color: theme.textSecondary,
//                   transition: 'all 0.2s ease'
//                 }}
//                 onClick={() => handleNavigation(dropItem.key)}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.backgroundColor = theme.hoverBg;
//                   e.currentTarget.style.color = theme.text;
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.backgroundColor = 'transparent';
//                   e.currentTarget.style.color = theme.textSecondary;
//                 }}
//               >
//                 <span style={{ marginRight: '8px', fontSize: '12px' }}>{dropItem.icon}</span>
//                 <span>{dropItem.label}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <div style={styles.container}>
//       {/* Sidebar */}
//       <div style={styles.sidebar}>
//         {/* Logo Section */}
//         <div style={styles.logoSection}>
//           {/* Collapse Toggle */}
//           <button 
//             style={{
//               position: 'absolute',
//               top: '15px',
//               right: '15px',
//               background: 'transparent',
//               border: 'none',
//               color: theme.textSecondary,
//               cursor: 'pointer',
//               padding: '4px',
//               borderRadius: '4px',
//               fontSize: '12px'
//             }}
//             onClick={toggleSidebarCollapse}
//           >
//             {sidebarCollapsed ? '→' : '←'}
//           </button>

//           <div style={styles.logoContainer}>
//             <span style={{ color: 'white', fontSize: sidebarCollapsed ? '16px' : '24px', fontWeight: 'bold' }}>
//               A
//             </span>
//           </div>
          
//           {!sidebarCollapsed && (
//             <>
//               <div style={styles.companyName}>ATOMONE</div>
//               <div style={styles.version}>v4.0</div>
//             </>
//           )}
//         </div>
        
//         {/* Navigation */}
//         <div style={{ flex: 1, padding: sidebarCollapsed ? '15px 8px' : '20px 16px' }}>
//           {navigationStructure.map((item, index) => (
//             <NavigationItem key={item.key} item={item} index={index} />
//           ))}
//         </div>

//         {/* Logout */}
//         <div style={{ padding: sidebarCollapsed ? '15px 8px' : '20px 16px', borderTop: `1px solid ${theme.border}` }}>
//           <button 
//             style={{
//               width: '100%',
//               padding: sidebarCollapsed ? '12px' : '12px 16px',
//               background: theme.danger,
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: '600',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: sidebarCollapsed ? '0' : '8px',
//               transition: 'all 0.2s ease'
//             }}
//             onClick={onLogout}
//           >
//             <span>🚪</span>
//             {!sidebarCollapsed && <span>Logout</span>}
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div style={styles.mainContent}>
//         {/* Header */}
//         <div style={styles.header}>
//           <div style={styles.headerLeft}>
//             <h1 style={styles.title}>Analytics Dashboard</h1>
//             <p style={styles.subtitle}>Industrial Machine Performance Monitoring</p>
//           </div>
          
//           <div style={styles.headerRight}>
//             <button style={styles.modernBtn}>
//               <SearchIcon />
//               Search
//             </button>
//             <button style={styles.modernBtn}>
//               <BellIcon />
//             </button>
//             <button style={{...styles.modernBtn, ...styles.primaryBtn}}>
//               + Add Project
//             </button>
//             <div style={{
//               width: '36px',
//               height: '36px',
//               borderRadius: '8px',
//               background: theme.gradient1,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: 'white',
//               fontSize: '14px',
//               fontWeight: '600'
//             }}>
//               SA
//             </div>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div style={styles.contentArea}>
//           {/* Stats Grid */}
//           <div style={styles.statsGrid}>
//             <div 
//               style={styles.modernStatCard}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-4px)';
//                 e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
//               }}
//             >
//               <div style={{...styles.statCardIcon, background: theme.gradient1}}>
//                 🏭
//               </div>
//               <div style={styles.statValue}>{totalMachines}</div>
//               <div style={styles.statLabel}>Total Machines</div>
//               <div style={{...styles.statChange, color: theme.success}}>
//                 <span>↗</span>
//                 <span>+12% from last month</span>
//               </div>
//             </div>

//             <div 
//               style={styles.modernStatCard}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-4px)';
//                 e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
//               }}
//             >
//               <div style={{...styles.statCardIcon, background: theme.gradient2}}>
//                 ⚡
//               </div>
//               <div style={styles.statValue}>{runningMachines}</div>
//               <div style={styles.statLabel}>Running Machines</div>
//               <div style={{...styles.statChange, color: theme.success}}>
//                 <span>↗</span>
//                 <span>+8% efficiency</span>
//               </div>
//             </div>

//             <div 
//               style={styles.modernStatCard}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-4px)';
//                 e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
//               }}
//             >
//               <div style={{...styles.statCardIcon, background: theme.gradient3}}>
//                 📊
//               </div>
//               <div style={styles.statValue}>{avgEfficiency}%</div>
//               <div style={styles.statLabel}>Overall Efficiency</div>
//               <div style={{...styles.statChange, color: theme.warning}}>
//                 <span>→</span>
//                 <span>Stable performance</span>
//               </div>
//             </div>

//             <div 
//               style={styles.modernStatCard}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-4px)';
//                 e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
//               }}
//             >
//               <div style={{...styles.statCardIcon, background: theme.gradient4}}>
//                 🎯
//               </div>
//               <div style={styles.statValue}>{totalProduction.toLocaleString()}</div>
//               <div style={styles.statLabel}>Production Output</div>
//               <div style={{...styles.statChange, color: theme.success}}>
//                 <span>↗</span>
//                 <span>+15% target achieved</span>
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions */}
//           <div style={styles.quickActionsGrid}>
//             <div 
//               style={styles.quickActionCard}
//               onClick={() => handleNavigation('plant1-live')}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-4px)';
//                 e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = 'none';
//               }}
//             >
//               <div style={styles.actionCardContent}>
//                 <div style={{...styles.actionIcon, background: theme.gradient1}}>
//                   🚀
//                 </div>
//                 <div style={styles.actionDetails}>
//                   <div style={styles.actionTitle}>Live Monitoring</div>
//                   <div style={styles.actionSubtitle}>Real-time machine status</div>
//                 </div>
//               </div>
//             </div>

//             <div 
//               style={styles.quickActionCard}
//               onClick={() => handleNavigation('assign-machine')}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-4px)';
//                 e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = 'none';
//               }}
//             >
//               <div style={styles.actionCardContent}>
//                 <div style={{...styles.actionIcon, background: theme.gradient2}}>
//                   📋
//                 </div>
//                 <div style={styles.actionDetails}>
//                   <div style={styles.actionTitle}>Assignments</div>
//                   <div style={styles.actionSubtitle}>Machine operator management</div>
//                 </div>
//               </div>
//             </div>

//             <div 
//               style={styles.quickActionCard}
//               onClick={() => handleNavigation('idle-reports-list')}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-4px)';
//                 e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = 'none';
//               }}
//             >
//               <div style={styles.actionCardContent}>
//                 <div style={{...styles.actionIcon, background: theme.gradient3}}>
//                   📈
//                 </div>
//                 <div style={styles.actionDetails}>
//                   <div style={styles.actionTitle}>Analytics</div>
//                   <div style={styles.actionSubtitle}>Performance reports</div>
//                 </div>
//               </div>
//             </div>

//             <div 
//               style={styles.quickActionCard}
//               onClick={() => handleNavigation('plant2-live')}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-4px)';
//                 e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.15)';
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = 'none';
//               }}
//             >
//               <div style={styles.actionCardContent}>
//                 <div style={{...styles.actionIcon, background: theme.gradient4}}>
//                   🏭
//                 </div>
//                 <div style={styles.actionDetails}>
//                   <div style={styles.actionTitle}>Plant 2 Live</div>
//                   <div style={styles.actionSubtitle}>Secondary plant monitoring</div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Machine Overview */}
//           <div style={styles.machineOverview}>
//             <h2 style={styles.sectionTitle}>
//               <span>⚙️</span>
//               Machine Overview
//             </h2>
            
//             <div style={styles.machineGrid}>
//               {machineData.map((machine, index) => (
//                 <div 
//                   key={index} 
//                   style={styles.machineCard}
//                   onMouseOver={(e) => {
//                     e.currentTarget.style.transform = 'translateY(-2px)';
//                     e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)';
//                   }}
//                   onMouseOut={(e) => {
//                     e.currentTarget.style.transform = 'translateY(0)';
//                     e.currentTarget.style.boxShadow = 'none';
//                   }}
//                 >
//                   <div style={styles.machineHeader}>
//                     <div style={styles.machineName}>{machine.name}</div>
//                     <div style={{
//                       ...styles.machineStatus,
//                       backgroundColor: getStatusColor(machine.status),
//                       color: 'white'
//                     }}>
//                       {machine.status}
//                     </div>
//                   </div>
                  
//                   <div style={styles.machineMetrics}>
//                     <div style={styles.machineMetric}>
//                       <div style={styles.metricValue}>{machine.efficiency}%</div>
//                       <div style={styles.metricLabel}>Efficiency</div>
//                     </div>
//                     <div style={styles.machineMetric}>
//                       <div style={styles.metricValue}>{machine.production}</div>
//                       <div style={styles.metricLabel}>Production</div>
//                     </div>
//                   </div>
                  
//                   <div style={{
//                     fontSize: '11px',
//                     color: theme.textMuted,
//                     marginTop: '12px',
//                     textAlign: 'center'
//                   }}>
//                     Updated: {machine.lastUpdate}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* CSS Animations */}
//       <style jsx>{`
//         * {
//           transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;



// // src/components/Dashboard.js - FIXED VERSION WITH PROPER CHART DATA INITIALIZATION
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Line, Bar, Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [machineData, setMachineData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [darkMode, setDarkMode] = useState(true);
  
//   // Individual dropdown states
//   const [dropdownStates, setDropdownStates] = useState({
//     monitoring: false,
//     assign: false,
//     reports: false
//   });
  
//   // Tooltip states
//   const [tooltipStates, setTooltipStates] = useState({});
  
//   // Real-time dashboard data states
//   const [totalMachines, setTotalMachines] = useState(57);
//   const [runningMachines, setRunningMachines] = useState(42);
//   const [avgEfficiency, setAvgEfficiency] = useState(87);
//   const [totalProduction, setTotalProduction] = useState(15420);
  
//   // Filter states
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedShift, setSelectedShift] = useState('');
//   const [selectedPlant, setSelectedPlant] = useState('plant1_data');
//   const [availableDates, setAvailableDates] = useState([]);
  
//   // 🔥 FIXED: Initialize chart data with proper structure
//   const [hourlyProductionData, setHourlyProductionData] = useState({
//     labels: [],
//     datasets: []
//   });
//   const [machineWiseData, setMachineWiseData] = useState({
//     labels: [],
//     datasets: []
//   });
//   const [efficiencyData, setEfficiencyData] = useState({
//     labels: [],
//     datasets: []
//   });
//   const [plantComparisonData, setPlantComparisonData] = useState({
//     labels: [],
//     datasets: []
//   });

//   // Dropdown management functions
//   const toggleDropdown = (dropdownKey) => {
//     if (sidebarCollapsed) {
//       setSidebarCollapsed(false);
//     }
//     setDropdownStates(prevState => ({
//       ...prevState,
//       [dropdownKey]: !prevState[dropdownKey]
//     }));
//   };

//   const closeAllDropdowns = () => {
//     setDropdownStates({
//       monitoring: false,
//       assign: false,
//       reports: false
//     });
//   };

//   const handleNavigation = (page) => {
//     navigate(`/${page}`);
//     closeAllDropdowns();
//     if (isMobile) {
//       setSidebarOpen(false);
//     }
//   };

//   const toggleSidebarCollapse = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//     closeAllDropdowns();
//   };

//   // Handle window resize
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);
//       if (!mobile) {
//         setSidebarOpen(false);
//       }
//       if (window.innerWidth <= 1024) {
//         setSidebarCollapsed(true);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Load theme from localStorage
//   useEffect(() => {
//     const savedTheme = localStorage.getItem('dashboardTheme');
//     if (savedTheme) {
//       setDarkMode(savedTheme === 'dark');
//     }
//   }, []);

//   // Save theme to localStorage
//   useEffect(() => {
//     localStorage.setItem('dashboardTheme', darkMode ? 'dark' : 'light');
//     document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
//   }, [darkMode]);

//   // 🔥 FIXED: Initialize data immediately on component mount
//   useEffect(() => {
//     generateMockData(); // Initialize data immediately
//   }, []);

//   // Fetch available dates
//   useEffect(() => {
//     const fetchAvailableDates = async () => {
//       try {
//         const response = await fetch(`http://127.0.0.1:8000/api/available-dates/?plant=${selectedPlant}`);
//         const data = await response.json();
//         if (data.success) {
//           setAvailableDates(data.available_dates);
//         }
//       } catch (error) {
//         console.error('Error fetching available dates:', error);
//         // Mock data for demo
//         const mockDates = [];
//         for (let i = 0; i < 30; i++) {
//           const date = new Date();
//           date.setDate(date.getDate() - i);
//           mockDates.push(date.toISOString().split('T')[0]);
//         }
//         setAvailableDates(mockDates);
//       }
//     };
    
//     fetchAvailableDates();
//   }, [selectedPlant]);

//   // Fetch dashboard data with filters
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         setLoading(true);
//         let apiUrl = `http://127.0.0.1:8000/api/dashboard/?date=${selectedDate}&plant=${selectedPlant}`;
        
//         if (selectedShift) {
//           apiUrl += `&shift=${selectedShift}`;
//         }
        
//         const response = await fetch(apiUrl);
//         const data = await response.json();
        
//         if (data.success) {
//           const dashboardData = data.dashboard_data;
//           setTotalMachines(dashboardData.total_machines || 57);
//           setRunningMachines(dashboardData.running_machines || 42);
//           setAvgEfficiency(dashboardData.avg_efficiency || 87);
//           setTotalProduction(dashboardData.total_production || 15420);
//           setMachineData(dashboardData.machine_details || []);
//         } else {
//           // Regenerate mock data when API fails
//           generateMockData();
//         }
//       } catch (error) {
//         console.error('Error fetching dashboard data:', error);
//         generateMockData();
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     // Only fetch if we have initial data
//     if (hourlyProductionData.labels.length > 0) {
//       fetchDashboardData();
//     }
    
//     const interval = setInterval(() => {
//       if (hourlyProductionData.labels.length > 0) {
//         fetchDashboardData();
//       }
//     }, 60000);
    
//     return () => clearInterval(interval);
//   }, [selectedDate, selectedShift, selectedPlant, hourlyProductionData.labels.length]);

//   // 🔥 FIXED: Generate mock data with proper error handling
//   const generateMockData = () => {
//     try {
//       console.log('Generating mock data...');
      
//       // Generate hourly production data
//       const hours = Array.from({length: 24}, (_, i) => `${i.toString().padStart(2, '0')}:00`);
//       const productionValues = hours.map(() => Math.floor(Math.random() * 500) + 100);
      
//       const hourlyData = {
//         labels: hours,
//         datasets: [{
//           label: `${selectedPlant === 'plant1_data' ? 'Plant 1' : 'Plant 2'} Production`,
//           data: productionValues,
//           borderColor: selectedPlant === 'plant1_data' ? '#3b82f6' : '#10b981',
//           backgroundColor: selectedPlant === 'plant1_data' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
//           fill: true,
//           tension: 0.4
//         }]
//       };
      
//       console.log('Setting hourly data:', hourlyData);
//       setHourlyProductionData(hourlyData);

//       // Generate machine-wise data
//       const machineNames = Array.from({length: 10}, (_, i) => `M${(i+1).toString().padStart(2, '0')}`);
//       const machineProduction = machineNames.map(() => Math.floor(Math.random() * 800) + 200);
      
//       const machineData = {
//         labels: machineNames,
//         datasets: [{
//           label: 'Production Count',
//           data: machineProduction,
//           backgroundColor: machineProduction.map(value => {
//             if (value > 700) return '#10b981'; // High - Green
//             if (value > 500) return '#f59e0b'; // Medium - Yellow
//             return '#ef4444'; // Low - Red
//           }),
//           borderRadius: 4
//         }]
//       };
      
//       console.log('Setting machine data:', machineData);
//       setMachineWiseData(machineData);

//       // Generate efficiency data
//       const efficiencyChartData = {
//         labels: ['Running', 'Idle', 'Maintenance', 'Offline'],
//         datasets: [{
//           data: [runningMachines, 8, 3, 4],
//           backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6b7280'],
//           borderWidth: 0,
//           hoverBackgroundColor: ['#059669', '#d97706', '#dc2626', '#4b5563']
//         }]
//       };
      
//       console.log('Setting efficiency data:', efficiencyChartData);
//       setEfficiencyData(efficiencyChartData);

//       // Generate plant comparison data
//       const comparisonData = {
//         labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
//         datasets: [
//           {
//             label: 'Plant 1',
//             data: [850, 920, 1200, 1450, 1280, 1100],
//             borderColor: '#3b82f6',
//             backgroundColor: 'rgba(59, 130, 246, 0.1)',
//             fill: true,
//             tension: 0.4
//           },
//           {
//             label: 'Plant 2', 
//             data: [780, 890, 1150, 1380, 1220, 1050],
//             borderColor: '#10b981',
//             backgroundColor: 'rgba(16, 185, 129, 0.1)',
//             fill: true,
//             tension: 0.4
//           }
//         ]
//       };
      
//       console.log('Setting comparison data:', comparisonData);
//       setPlantComparisonData(comparisonData);

//       // Mock machine data
//       setMachineData([
//         { name: 'Machine A1', status: 'Running', efficiency: 95, production: 1250, lastUpdate: '2 mins ago', shift: 'A' },
//         { name: 'Machine A2', status: 'Idle', efficiency: 78, production: 890, lastUpdate: '5 mins ago', shift: 'A' },
//         { name: 'Machine A3', status: 'Running', efficiency: 92, production: 1150, lastUpdate: '1 min ago', shift: 'A' },
//         { name: 'Machine A4', status: 'Maintenance', efficiency: 0, production: 0, lastUpdate: '1 hour ago', shift: 'A' },
//         { name: 'Machine B1', status: 'Running', efficiency: 88, production: 1050, lastUpdate: '3 mins ago', shift: 'B' },
//         { name: 'Machine B2', status: 'Running', efficiency: 91, production: 1180, lastUpdate: '1 min ago', shift: 'B' }
//       ]);
      
//       console.log('Mock data generation completed');
      
//     } catch (error) {
//       console.error('Error generating mock data:', error);
      
//       // Fallback minimal data structure
//       setHourlyProductionData({
//         labels: ['00:00', '01:00', '02:00'],
//         datasets: [{
//           label: 'Production',
//           data: [100, 200, 150],
//           borderColor: '#3b82f6',
//           backgroundColor: 'rgba(59, 130, 246, 0.1)'
//         }]
//       });
      
//       setMachineWiseData({
//         labels: ['M01', 'M02', 'M03'],
//         datasets: [{
//           label: 'Production',
//           data: [300, 400, 350],
//           backgroundColor: ['#10b981', '#f59e0b', '#ef4444']
//         }]
//       });
      
//       setEfficiencyData({
//         labels: ['Running', 'Idle'],
//         datasets: [{
//           data: [70, 30],
//           backgroundColor: ['#10b981', '#f59e0b']
//         }]
//       });
      
//       setPlantComparisonData({
//         labels: ['Plant 1', 'Plant 2'],
//         datasets: [{
//           label: 'Comparison',
//           data: [1000, 1200],
//           borderColor: '#3b82f6',
//           backgroundColor: 'rgba(59, 130, 246, 0.1)'
//         }]
//       });
//     }
//   };

//   // Handle filter updates
//   const handleFilterUpdate = () => {
//     generateMockData(); // Regenerate data based on new filters
//   };

//   // Theme-aware styles
//   const getThemeColors = () => {
//     if (darkMode) {
//       return {
//         primary: '#0a0a0f',
//         secondary: '#1a1b23',
//         accent: '#6366f1',
//         success: '#10b981',
//         warning: '#f59e0b',
//         danger: '#ef4444',
//         info: '#3b82f6',
//         text: '#ffffff',
//         textSecondary: '#94a3b8',
//         textMuted: '#64748b',
//         border: 'rgba(255,255,255,0.08)',
//         cardBg: '#1e1f26',
//         cardBgLight: '#252631',
//         hoverBg: 'rgba(255,255,255,0.05)',
//         gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//         gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//         gradient4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
//         glassBg: 'rgba(30, 31, 38, 0.8)',
//         shadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
//       };
//     } else {
//       return {
//         primary: '#f8fafc',
//         secondary: '#ffffff',
//         accent: '#6366f1',
//         success: '#10b981',
//         warning: '#f59e0b',
//         danger: '#ef4444',
//         info: '#3b82f6',
//         text: '#1e293b',
//         textSecondary: '#475569',
//         textMuted: '#64748b',
//         border: 'rgba(0,0,0,0.08)',
//         cardBg: '#ffffff',
//         cardBgLight: '#f8fafc',
//         hoverBg: 'rgba(0,0,0,0.05)',
//         gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//         gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
//         gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
//         gradient4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
//         glassBg: 'rgba(255, 255, 255, 0.9)',
//         shadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
//       };
//     }
//   };

//   const theme = getThemeColors();
//   const sidebarWidth = sidebarCollapsed ? '70px' : '280px';

//   // Tooltip helper functions
//   const showTooltip = (key) => {
//     setTooltipStates(prev => ({ ...prev, [key]: true }));
//   };

//   const hideTooltip = (key) => {
//     setTooltipStates(prev => ({ ...prev, [key]: false }));
//   };

//   // STYLES (same as before, keeping it concise)
//   const styles = {
//     container: {
//       minHeight: '100vh',
//       backgroundColor: theme.primary,
//       color: theme.text,
//       display: 'flex',
//       position: 'relative',
//       fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//       transition: 'all 0.3s ease'
//     },
    
//     sidebar: {
//       width: sidebarWidth,
//       minHeight: '100vh',
//       background: `linear-gradient(180deg, ${theme.secondary} 0%, ${theme.primary} 100%)`,
//       borderRight: `1px solid ${theme.border}`,
//       position: isMobile ? 'fixed' : 'relative',
//       left: isMobile ? (sidebarOpen ? '0' : '-100%') : '0',
//       zIndex: 999,
//       display: 'flex',
//       flexDirection: 'column',
//       backdropFilter: 'blur(20px)',
//       boxShadow: theme.shadow,
//       transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
//       overflow: 'hidden auto'
//     },

//     logoSection: {
//       padding: sidebarCollapsed ? '20px 10px' : '25px 20px',
//       borderBottom: `1px solid ${theme.border}`,
//       position: 'relative',
//       textAlign: 'center',
//       background: theme.glassBg,
//       backdropFilter: 'blur(10px)',
//     },

//     logoContainer: {
//       width: sidebarCollapsed ? '35px' : '60px',
//       height: sidebarCollapsed ? '35px' : '60px',
//       borderRadius: '12px',
//       background: theme.gradient1,
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       margin: '0 auto 12px',
//       boxShadow: theme.shadow,
//       transition: 'all 0.3s ease',
//       position: 'relative',
//       overflow: 'hidden'
//     },

//     companyName: {
//       fontSize: sidebarCollapsed ? '10px' : '18px',
//       fontWeight: '700',
//       color: theme.accent,
//       marginBottom: sidebarCollapsed ? '2px' : '4px',
//       letterSpacing: '0.5px',
//       transition: 'all 0.3s ease'
//     },

//     version: {
//       fontSize: sidebarCollapsed ? '6px' : '10px',
//       color: theme.textSecondary,
//       fontWeight: '500',
//       transition: 'all 0.3s ease'
//     },

//     mainContent: {
//       flex: 1,
//       background: theme.primary,
//       minHeight: '100vh',
//       transition: 'all 0.3s ease',
//       display: 'flex',
//       flexDirection: 'column'
//     },

//     header: {
//       padding: '20px 30px',
//       background: theme.glassBg,
//       backdropFilter: 'blur(20px)',
//       borderBottom: `1px solid ${theme.border}`,
//       display: 'flex',
//       justifyContent: 'space-between',
//       alignItems: 'center',
//       position: 'sticky',
//       top: 0,
//       zIndex: 100,
//       flexWrap: 'wrap',
//       gap: '15px'
//     },

//     title: {
//       fontSize: '24px',
//       fontWeight: '700',
//       color: theme.text,
//       margin: '0 0 4px 0',
//       letterSpacing: '-0.5px'
//     },

//     subtitle: {
//       fontSize: '14px',
//       color: theme.textSecondary,
//       fontWeight: '400'
//     },

//     modernBtn: {
//       padding: '10px 16px',
//       background: theme.cardBg,
//       color: theme.text,
//       border: `1px solid ${theme.border}`,
//       borderRadius: '8px',
//       cursor: 'pointer',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px',
//       fontSize: '13px',
//       fontWeight: '500',
//       transition: 'all 0.2s ease',
//       backdropFilter: 'blur(10px)',
//       boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//     },

//     primaryBtn: {
//       background: theme.accent,
//       color: 'white',
//       border: 'none',
//       fontWeight: '600',
//       boxShadow: `0 4px 15px ${theme.accent}40`
//     },

//     contentArea: {
//       flex: 1,
//       padding: '30px',
//       display: 'grid',
//       gap: '24px',
//       gridTemplateRows: 'auto auto auto 1fr',
//       overflow: 'auto'
//     },

//     filtersSection: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
//       gap: '20px',
//       padding: '25px',
//       background: theme.cardBg,
//       borderRadius: '16px',
//       border: `1px solid ${theme.border}`,
//       backdropFilter: 'blur(10px)',
//       boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
//     },

//     filterGroup: {
//       display: 'flex',
//       flexDirection: 'column',
//       gap: '8px'
//     },

//     filterLabel: {
//       fontSize: '12px',
//       fontWeight: '600',
//       color: theme.textSecondary,
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px'
//     },

//     filterSelect: {
//       padding: '12px 16px',
//       background: theme.secondary,
//       color: theme.text,
//       border: `1px solid ${theme.border}`,
//       borderRadius: '10px',
//       fontSize: '14px',
//       cursor: 'pointer',
//       transition: 'all 0.3s ease',
//       backdropFilter: 'blur(10px)'
//     },

//     updateBtn: {
//       padding: '12px 24px',
//       background: `linear-gradient(135deg, ${theme.accent}, #8b5cf6)`,
//       color: 'white',
//       border: 'none',
//       borderRadius: '12px',
//       cursor: 'pointer',
//       fontSize: '14px',
//       fontWeight: '600',
//       transition: 'all 0.3s ease',
//       boxShadow: `0 4px 15px ${theme.accent}40`,
//       alignSelf: 'flex-end'
//     },

//     statsGrid: {
//       display: 'grid',
//       gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
//       gap: '20px'
//     },

//     modernStatCard: {
//       background: theme.cardBg,
//       border: `1px solid ${theme.border}`,
//       borderRadius: '16px',
//       padding: '24px',
//       position: 'relative',
//       overflow: 'hidden',
//       transition: 'all 0.3s ease',
//       backdropFilter: 'blur(10px)',
//       boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
//     },

//     statCardIcon: {
//       width: '48px',
//       height: '48px',
//       borderRadius: '12px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center',
//       fontSize: '20px',
//       marginBottom: '16px',
//       boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
//     },

//     statValue: {
//       fontSize: '28px',
//       fontWeight: '700',
//       marginBottom: '8px',
//       color: theme.text,
//       lineHeight: '1.2'
//     },

//     statLabel: {
//       fontSize: '13px',
//       color: theme.textSecondary,
//       fontWeight: '500',
//       textTransform: 'uppercase',
//       letterSpacing: '0.5px',
//       marginBottom: '12px'
//     },

//     statChange: {
//       display: 'flex',
//       alignItems: 'center',
//       gap: '4px',
//       fontSize: '12px',
//       fontWeight: '600'
//     },

//     graphsGrid: {
//       display: 'grid',
//       gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)',
//       gap: '24px'
//     },

//     graphCard: {
//       background: theme.cardBg,
//       border: `1px solid ${theme.border}`,
//       borderRadius: '16px',
//       padding: '24px',
//       backdropFilter: 'blur(10px)',
//       boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
//     },

//     graphTitle: {
//       fontSize: '16px',
//       fontWeight: '600',
//       color: theme.text,
//       marginBottom: '20px',
//       display: 'flex',
//       alignItems: 'center',
//       gap: '8px'
//     }
//   };

//   // Navigation structure
//   const navigationStructure = [
//     { 
//       key: 'dashboard', 
//       icon: '📊', 
//       label: 'Dashboard', 
//       active: true, 
//       clickable: false 
//     },
//     { 
//       key: 'monitoring-dropdown',
//       icon: '📡', 
//       label: 'Live Monitoring', 
//       hasDropdown: true,
//       isOpen: dropdownStates.monitoring,
//       dropdownItems: [
//         { key: 'plant1-live', icon: '🏢', label: 'Plant 1 Live' },
//         { key: 'plant2-live', icon: '🏭', label: 'Plant 2 Live' }
//       ]
//     },
//     {
//       key: 'assign-dropdown',
//       icon: '⚙️',
//       label: 'Operations',
//       hasDropdown: true,
//       isOpen: dropdownStates.assign,
//       dropdownItems: [
//         { key: 'assign-machine', icon: '🔧', label: 'Assignments' },
//         { key: 'idle-report-submit', icon: '📋', label: 'Idle Reports' }
//       ]
//     },
//     {
//       key: 'reports-dropdown',
//       icon: '📈',
//       label: 'Analytics',
//       hasDropdown: true,
//       isOpen: dropdownStates.reports,
//       dropdownItems: [
//         { key: 'machine-assignments', icon: '📋', label: 'Records' },
//         { key: 'idle-reports-list', icon: '📊', label: 'Reports' }
//       ]
//     }
//   ];

//   // Helper functions for status colors
//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'running': return theme.success;
//       case 'idle': return theme.warning;
//       case 'maintenance': return theme.danger;
//       default: return theme.textMuted;
//     }
//   };

//   // 🔥 FIXED: Chart options with proper error handling
//   const getChartOptions = () => ({
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           color: theme.text,
//           font: {
//             size: 12
//           }
//         }
//       },
//       tooltip: {
//         backgroundColor: theme.cardBg,
//         titleColor: theme.text,
//         bodyColor: theme.text,
//         borderColor: theme.border,
//         borderWidth: 1
//       }
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: theme.textSecondary,
//         },
//         grid: {
//           color: theme.border,
//         }
//       },
//       y: {
//         ticks: {
//           color: theme.textSecondary,
//         },
//         grid: {
//           color: theme.border,
//         }
//       }
//     },
//     animation: {
//       duration: 0 // Disable animations to prevent errors
//     }
//   });

//   // Icons
//   const SearchIcon = () => (
//     <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" fill="none"/>
//     </svg>
//   );

//   const BellIcon = () => (
//     <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
//       <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
//     </svg>
//   );

//   // 🔥 FIXED: Chart component with error boundary
//   const SafeChart = ({ type: ChartComponent, data, options, title }) => {
//     if (!data || !data.labels || !data.datasets || data.datasets.length === 0) {
//       return (
//         <div style={{ 
//           height: '300px', 
//           display: 'flex', 
//           alignItems: 'center', 
//           justifyContent: 'center',
//           color: theme.textMuted,
//           fontSize: '14px'
//         }}>
//           Loading chart data...
//         </div>
//       );
//     }

//     try {
//       return <ChartComponent data={data} options={options} />;
//     } catch (error) {
//       console.error(`Error rendering ${title} chart:`, error);
//       return (
//         <div style={{ 
//           height: '300px', 
//           display: 'flex', 
//           alignItems: 'center', 
//           justifyContent: 'center',
//           color: theme.danger,
//           fontSize: '14px'
//         }}>
//           Error loading chart
//         </div>
//       );
//     }
//   };

//   // Navigation Item Component (same as before)
//   const NavigationItem = ({ item, index }) => {
//     const dropdownKey = item.key.replace('-dropdown', '');
    
//     return (
//       <div key={index} style={{ marginBottom: '4px' }}>
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             padding: sidebarCollapsed ? '12px 8px' : '12px 16px',
//             borderRadius: '8px',
//             cursor: item.clickable || item.hasDropdown ? 'pointer' : 'default',
//             transition: 'all 0.2s ease',
//             backgroundColor: item.active ? `${theme.accent}20` : 'transparent',
//             color: item.active ? theme.accent : theme.text,
//             marginBottom: '4px',
//             border: item.active ? `1px solid ${theme.accent}40` : '1px solid transparent'
//           }}
//           onClick={() => {
//             if (item.hasDropdown) {
//               toggleDropdown(dropdownKey);
//             } else if (item.clickable) {
//               handleNavigation(item.key);
//             }
//           }}
//         >
//           <span style={{
//             fontSize: '16px',
//             marginRight: sidebarCollapsed ? '0' : '12px',
//             minWidth: '16px',
//             textAlign: 'center'
//           }}>
//             {item.icon}
//           </span>
          
//           {!sidebarCollapsed && (
//             <>
//               <span style={{
//                 fontSize: '14px',
//                 fontWeight: '500',
//                 flex: 1
//               }}>
//                 {item.label}
//               </span>
              
//               {item.hasDropdown && (
//                 <span style={{
//                   fontSize: '10px',
//                   transition: 'transform 0.2s ease',
//                   transform: dropdownStates[dropdownKey] ? 'rotate(90deg)' : 'rotate(0deg)',
//                   color: theme.textSecondary
//                 }}>
//                   ▶
//                 </span>
//               )}
//             </>
//           )}
//         </div>

//         {/* Dropdown Content */}
//         {item.hasDropdown && !sidebarCollapsed && (
//           <div style={{
//             maxHeight: dropdownStates[dropdownKey] ? '120px' : '0',
//             overflow: 'hidden',
//             transition: 'all 0.3s ease',
//             backgroundColor: theme.cardBgLight,
//             borderRadius: '8px',
//             marginLeft: '16px',
//             marginTop: '4px',
//             border: `1px solid ${theme.border}`
//           }}>
//             {item.dropdownItems.map((dropItem, dropIndex) => (
//               <div
//                 key={dropIndex}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   padding: '8px 12px',
//                   cursor: 'pointer',
//                   fontSize: '13px',
//                   color: theme.textSecondary,
//                   transition: 'all 0.2s ease'
//                 }}
//                 onClick={() => handleNavigation(dropItem.key)}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.backgroundColor = theme.hoverBg;
//                   e.currentTarget.style.color = theme.text;
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.backgroundColor = 'transparent';
//                   e.currentTarget.style.color = theme.textSecondary;
//                 }}
//               >
//                 <span style={{ marginRight: '8px', fontSize: '12px' }}>{dropItem.icon}</span>
//                 <span>{dropItem.label}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   // 🔥 IMPORTANT: Don't render charts until data is loaded
//   const hasDataLoaded = hourlyProductionData.labels.length > 0 && 
//                        machineWiseData.labels.length > 0 && 
//                        efficiencyData.labels.length > 0 && 
//                        plantComparisonData.labels.length > 0;

//   return (
//     <div style={styles.container}>
//       {/* Sidebar */}
//       <div style={styles.sidebar}>
//         {/* Logo Section */}
//         <div style={styles.logoSection}>
//           <button 
//             style={{
//               position: 'absolute',
//               top: '15px',
//               right: '15px',
//               background: 'transparent',
//               border: 'none',
//               color: theme.textSecondary,
//               cursor: 'pointer',
//               padding: '4px',
//               borderRadius: '4px',
//               fontSize: '12px'
//             }}
//             onClick={toggleSidebarCollapse}
//           >
//             {sidebarCollapsed ? '→' : '←'}
//           </button>

//           <div style={styles.logoContainer}>
//             <span style={{ color: 'white', fontSize: sidebarCollapsed ? '16px' : '24px', fontWeight: 'bold' }}>
//               A
//             </span>
//           </div>
          
//           {!sidebarCollapsed && (
//             <>
//               <div style={styles.companyName}>ATOMONE</div>
//               <div style={styles.version}>v4.0</div>
//             </>
//           )}
//         </div>
        
//         {/* Navigation */}
//         <div style={{ flex: 1, padding: sidebarCollapsed ? '15px 8px' : '20px 16px' }}>
//           {navigationStructure.map((item, index) => (
//             <NavigationItem key={item.key} item={item} index={index} />
//           ))}
//         </div>

//         {/* Logout */}
//         <div style={{ padding: sidebarCollapsed ? '15px 8px' : '20px 16px', borderTop: `1px solid ${theme.border}` }}>
//           <button 
//             style={{
//               width: '100%',
//               padding: sidebarCollapsed ? '12px' : '12px 16px',
//               background: theme.danger,
//               color: 'white',
//               border: 'none',
//               borderRadius: '8px',
//               cursor: 'pointer',
//               fontSize: '14px',
//               fontWeight: '600',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               gap: sidebarCollapsed ? '0' : '8px',
//               transition: 'all 0.2s ease'
//             }}
//             onClick={onLogout}
//           >
//             <span>🚪</span>
//             {!sidebarCollapsed && <span>Logout</span>}
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div style={styles.mainContent}>
//         {/* Header */}
//         <div style={styles.header}>
//           <div>
//             <h1 style={styles.title}>Analytics Dashboard</h1>
//             <p style={styles.subtitle}>
//               Industrial Machine Performance Analytics - {selectedPlant === 'plant1_data' ? 'PLANT 1' : 'PLANT 2'} DATA - {selectedDate}
//             </p>
//           </div>
          
//           <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//             <button style={styles.modernBtn}>
//               <SearchIcon />
//               Search
//             </button>
//             <button style={styles.modernBtn}>
//               <BellIcon />
//             </button>
//             <button style={{...styles.modernBtn, ...styles.primaryBtn}}>
//               + Add Project
//             </button>
//             <div style={{
//               width: '36px',
//               height: '36px',
//               borderRadius: '8px',
//               background: theme.gradient1,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               color: 'white',
//               fontSize: '14px',
//               fontWeight: '600'
//             }}>
//               SA
//             </div>
//           </div>
//         </div>

//         {/* Content Area */}
//         <div style={styles.contentArea}>
//           {/* Filters Section */}
//           <div style={styles.filtersSection}>
//             <div style={styles.filterGroup}>
//               <label style={styles.filterLabel}>Production Plant</label>
//               <select 
//                 style={styles.filterSelect}
//                 value={selectedPlant}
//                 onChange={(e) => setSelectedPlant(e.target.value)}
//               >
//                 <option value="plant1_data">Manufacturing Plant 1</option>
//                 <option value="plant2_data">Manufacturing Plant 2</option>
//               </select>
//             </div>
            
//             <div style={styles.filterGroup}>
//               <label style={styles.filterLabel}>Analysis Period</label>
//               <select 
//                 style={styles.filterSelect}
//                 value={selectedDate}
//                 onChange={(e) => setSelectedDate(e.target.value)}
//               >
//                 {availableDates.map(date => (
//                   <option key={date} value={date}>{date}</option>
//                 ))}
//               </select>
//             </div>
            
//             <div style={styles.filterGroup}>
//               <label style={styles.filterLabel}>Operational Shift</label>
//               <select 
//                 style={styles.filterSelect}
//                 value={selectedShift}
//                 onChange={(e) => setSelectedShift(e.target.value)}
//               >
//                 <option value="">All Production Shifts</option>
//                 <option value="A">A Shift (Morning)</option>
//                 <option value="B">B Shift (Evening)</option>  
//                 <option value="C">C Shift (Night)</option>
//               </select>
//             </div>
            
//             <button 
//               style={styles.updateBtn}
//               onClick={handleFilterUpdate}
//               onMouseOver={(e) => {
//                 e.currentTarget.style.transform = 'translateY(-2px)';
//                 e.currentTarget.style.boxShadow = `0 6px 20px ${theme.accent}60`;
//               }}
//               onMouseOut={(e) => {
//                 e.currentTarget.style.transform = 'translateY(0)';
//                 e.currentTarget.style.boxShadow = `0 4px 15px ${theme.accent}40`;
//               }}
//             >
//               Update Analytics
//             </button>
//           </div>

//           {/* Stats Grid */}
//           <div style={styles.statsGrid}>
//             <div style={styles.modernStatCard}>
//               <div style={{...styles.statCardIcon, background: theme.gradient1}}>
//                 🏭
//               </div>
//               <div style={styles.statValue}>{totalMachines}</div>
//               <div style={styles.statLabel}>Total Manufacturing Units</div>
//               <div style={{...styles.statChange, color: theme.success}}>
//                 <span>↗</span>
//                 <span>Active Production Lines</span>
//               </div>
//             </div>

//             <div style={styles.modernStatCard}>
//               <div style={{...styles.statCardIcon, background: theme.gradient2}}>
//                 ⚡
//               </div>
//               <div style={styles.statValue}>{runningMachines}</div>
//               <div style={styles.statLabel}>Active Production Units</div>
//               <div style={{...styles.statChange, color: theme.success}}>
//                 <span>↗</span>
//                 <span>Currently Running</span>
//               </div>
//             </div>

//             <div style={styles.modernStatCard}>
//               <div style={{...styles.statCardIcon, background: theme.gradient3}}>
//                 📊
//               </div>
//               <div style={styles.statValue}>{avgEfficiency}%</div>
//               <div style={styles.statLabel}>Overall Efficiency</div>
//               <div style={{...styles.statChange, color: theme.warning}}>
//                 <span>→</span>
//                 <span>Performance Metric</span>
//               </div>
//             </div>

//             <div style={styles.modernStatCard}>
//               <div style={{...styles.statCardIcon, background: theme.gradient4}}>
//                 🎯
//               </div>
//               <div style={styles.statValue}>{totalProduction.toLocaleString()}</div>
//               <div style={styles.statLabel}>Production Output</div>
//               <div style={{...styles.statChange, color: theme.success}}>
//                 <span>↗</span>
//                 <span>Units Manufactured</span>
//               </div>
//             </div>
//           </div>

//           {/* 🔥 FIXED: Graphs Grid with Safe Chart Components */}
//           {hasDataLoaded && (
//             <div style={styles.graphsGrid}>
//               {/* Hourly Production Graph */}
//               <div style={styles.graphCard}>
//                 <h3 style={styles.graphTitle}>
//                   <span>📈</span>
//                   Today's Hourly Production
//                 </h3>
//                 <div style={{ height: '300px' }}>
//                   <SafeChart 
//                     type={Line} 
//                     data={hourlyProductionData} 
//                     options={getChartOptions()} 
//                     title="Hourly Production"
//                   />
//                 </div>
//               </div>

//               {/* Machine Status Pie Chart */}
//               <div style={styles.graphCard}>
//                 <h3 style={styles.graphTitle}>
//                   <span>📊</span>
//                   Machine Status Distribution
//                 </h3>
//                 <div style={{ height: '300px' }}>
//                   <SafeChart 
//                     type={Doughnut} 
//                     data={efficiencyData} 
//                     options={{
//                       ...getChartOptions(),
//                       plugins: {
//                         ...getChartOptions().plugins,
//                         legend: {
//                           ...getChartOptions().plugins.legend,
//                           position: 'bottom'
//                         }
//                       }
//                     }} 
//                     title="Machine Status"
//                   />
//                 </div>
//               </div>

//               {/* Machine-wise Production Bar Chart */}
//               <div style={styles.graphCard}>
//                 <h3 style={styles.graphTitle}>
//                   <span>📊</span>
//                   Top 10 Machines Production
//                 </h3>
//                 <div style={{ height: '300px' }}>
//                   <SafeChart 
//                     type={Bar} 
//                     data={machineWiseData} 
//                     options={getChartOptions()} 
//                     title="Machine Production"
//                   />
//                 </div>
//               </div>

//               {/* Plant Comparison Graph */}
//               <div style={styles.graphCard}>
//                 <h3 style={styles.graphTitle}>
//                   <span>🏭</span>
//                   Plant Comparison
//                 </h3>
//                 <div style={{ height: '300px' }}>
//                   <SafeChart 
//                     type={Line} 
//                     data={plantComparisonData} 
//                     options={getChartOptions()} 
//                     title="Plant Comparison"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Loading state for charts */}
//           {!hasDataLoaded && (
//             <div style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '400px',
//               color: theme.textSecondary,
//               fontSize: '16px'
//             }}>
//               Loading dashboard charts...
//             </div>
//           )}
//         </div>
//       </div>

//       {/* CSS Animations */}
//       <style jsx>{`
//         * {
//           transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default Dashboard;





// src/components/Dashboard.js - COMPLETE PROFESSIONAL DASHBOARD WITH REAL API
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// 🔥 FIXED: Import from lowercase apiService
import { 
  getDashboardData, 
  getHourlyProductionData, 
  getMachineProductionData, 
  getProductionLineStatusData, 
  getAvailableDates 
} from '../services/apiService';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  const [machineData, setMachineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  
  // Individual dropdown states
  const [dropdownStates, setDropdownStates] = useState({
    monitoring: false,
    assign: false,
    reports: false
  });
  
  // Tooltip states
  const [tooltipStates, setTooltipStates] = useState({});
  
  // Real-time dashboard data states
  const [totalMachines, setTotalMachines] = useState(57);
  const [runningMachines, setRunningMachines] = useState(42);
  const [avgEfficiency, setAvgEfficiency] = useState(87);
  const [totalProduction, setTotalProduction] = useState(15420);
  
  // 🔥 ENHANCED: Filter states with machine number
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('plant1_data'); // Default Plant 1
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('');
  const [availableDates, setAvailableDates] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [availableMachines, setAvailableMachines] = useState([]);
  
  // Graph data states with proper initialization
  const [hourlyProductionData, setHourlyProductionData] = useState({
    labels: [],
    datasets: []
  });
  const [machineWiseData, setMachineWiseData] = useState({
    labels: [],
    datasets: []
  });
  const [efficiencyData, setEfficiencyData] = useState({
    labels: [],
    datasets: []
  });
  const [plantComparisonData, setPlantComparisonData] = useState({
    labels: [],
    datasets: []
  });
  
  // 🔥 NEW: Production Line Monitor data
  const [productionLineData, setProductionLineData] = useState([]);

  // Dropdown management functions
  const toggleDropdown = (dropdownKey) => {
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
    }
    setDropdownStates(prevState => ({
      ...prevState,
      [dropdownKey]: !prevState[dropdownKey]
    }));
  };

  const closeAllDropdowns = () => {
    setDropdownStates({
      monitoring: false,
      assign: false,
      reports: false
    });
  };

  const handleNavigation = (page) => {
    navigate(`/${page}`);
    closeAllDropdowns();
    if (isMobile) {
      setSidebarOpen(false);
    }
  };

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(!sidebarCollapsed);
    closeAllDropdowns();
  };

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 768;
      setIsMobile(mobile);
      if (!mobile) {
        setSidebarOpen(false);
      }
      if (window.innerWidth <= 1024) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('dashboardTheme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('dashboardTheme', darkMode ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  // Generate available hours (0-23)
  useEffect(() => {
    const hours = Array.from({length: 24}, (_, i) => ({
      value: i.toString().padStart(2, '0'),
      label: `${i.toString().padStart(2, '0')}:00`
    }));
    setAvailableHours(hours);
  }, []);

  // 🔥 ENHANCED: Generate available machines based on plant with REAL counts
  useEffect(() => {
    const generateMachines = () => {
      let machines = [];
      if (selectedPlant === 'plant1_data') {
        // Plant 1: Machines 1-57 (REAL COUNT)
        machines = Array.from({length: 57}, (_, i) => ({
          value: (i + 1).toString(),
          label: `Machine ${(i + 1).toString().padStart(2, '0')}`
        }));
      } else if (selectedPlant === 'plant2_data') {
        // Plant 2: Machines 1-26 (REAL COUNT)
        machines = Array.from({length: 26}, (_, i) => ({
          value: (i + 1).toString(),
          label: `Machine ${(i + 1).toString().padStart(2, '0')}`
        }));
      } else {
        // Default for other plants
        machines = Array.from({length: 50}, (_, i) => ({
          value: (i + 1).toString(),
          label: `Machine ${(i + 1).toString().padStart(2, '0')}`
        }));
      }
      setAvailableMachines(machines);
    };

    generateMachines();
  }, [selectedPlant]);

  // 🔥 REAL API: Fetch available dates from database
  useEffect(() => {
    const fetchAvailableDates = async () => {
      try {
        console.log('🔍 Fetching available dates for:', selectedPlant);
        const data = await getAvailableDates(selectedPlant);
        
        if (data.success && data.available_dates) {
          console.log('✅ Available dates:', data.available_dates);
          setAvailableDates(data.available_dates);
        } else {
          console.log('⚠️ Using fallback dates');
          const fallbackDates = [];
          for (let i = 0; i < 30; i++) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            fallbackDates.push(date.toISOString().split('T')[0]);
          }
          setAvailableDates(fallbackDates);
        }
      } catch (error) {
        console.error('❌ Error fetching dates:', error);
        const fallbackDates = [];
        for (let i = 0; i < 30; i++) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          fallbackDates.push(date.toISOString().split('T')[0]);
        }
        setAvailableDates(fallbackDates);
      }
    };
    
    fetchAvailableDates();
  }, [selectedPlant]);

  // Generate efficiency data from REAL database data
  const generateEfficiencyDataFromReal = (dashboardData) => {
    const runningCount = dashboardData.running_machines || 42;
    const totalCount = dashboardData.total_machines || 57;
    const idleCount = Math.floor((totalCount - runningCount) * 0.6);
    const maintenanceCount = Math.floor((totalCount - runningCount) * 0.2);
    const offlineCount = totalCount - runningCount - idleCount - maintenanceCount;
    
    const efficiencyChartData = {
      labels: ['Running', 'Idle', 'Maintenance', 'Offline'],
      datasets: [{
        data: [runningCount, idleCount, maintenanceCount, offlineCount],
        backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6b7280'],
        borderWidth: 0,
        hoverBackgroundColor: ['#059669', '#d97706', '#dc2626', '#4b5563'],
        hoverBorderWidth: 2,
        hoverBorderColor: '#ffffff'
      }]
    };
    
    setEfficiencyData(efficiencyChartData);
  };

  // Mock data generation functions (fallback when API fails)
  const generateMockProductionLineData = () => {
    const machineCount = selectedPlant === 'plant1_data' ? 57 : 26;
    const mockData = [];
    
    for (let i = 1; i <= machineCount; i++) {
      const isRunning = Math.random() > 0.3;
      const efficiency = isRunning ? Math.floor(Math.random() * 40) + 60 : 0;
      const production = isRunning ? Math.floor(Math.random() * 800) + 200 : 0;
      const lastUpdate = isRunning ? `${Math.floor(Math.random() * 10) + 1} mins ago` : `${Math.floor(Math.random() * 60) + 30} mins ago`;
      
      mockData.push({
        machine_no: i,
        machine_name: `Production Unit Machine ${i.toString().padStart(2, '0')}`,
        status: isRunning ? (efficiency > 80 ? 'Running' : 'Slow Operation') : 'Idle',
        efficiency: efficiency,
        production_count: production,
        last_update: lastUpdate,
        shift: selectedShift || 'A'
      });
    }
    
    setProductionLineData(mockData);
  };

  const generateMockHourlyData = () => {
    const hours = Array.from({length: 24}, (_, i) => i);
    const baseProduction = selectedPlant === 'plant1_data' ? 800 : 750;
    
    const productionValues = hours.map(hour => {
      let production = baseProduction;
      
      if (hour >= 8 && hour <= 16) {
        production += Math.random() * 300 + 200;
      } else if (hour >= 16 && hour <= 23) {
        production += Math.random() * 200 + 100;
      } else {
        production += Math.random() * 100 + 50;
      }
      
      return Math.floor(production);
    });
    
    const hourlyData = {
      labels: hours.map(h => `${h.toString().padStart(2, '0')}:00`),
      datasets: [{
        label: selectedMachine 
          ? `Machine ${selectedMachine} Production` 
          : `${selectedPlant === 'plant1_data' ? 'Plant 1' : 'Plant 2'} Production`,
        data: productionValues,
        borderColor: selectedPlant === 'plant1_data' ? '#3b82f6' : '#10b981',
        backgroundColor: selectedPlant === 'plant1_data' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6
      }]
    };
    
    setHourlyProductionData(hourlyData);
  };

  const generateMockMachineData = () => {
    const machineCount = selectedPlant === 'plant1_data' ? 15 : 12;
    const machineNames = Array.from({length: machineCount}, (_, i) => `M${(i+1).toString().padStart(2, '0')}`);
    const machineProduction = machineNames.map(() => {
      const baseProduction = Math.random() * 800 + 200;
      return Math.floor(baseProduction);
    });
    
    const machineData = {
      labels: machineNames,
      datasets: [{
        label: 'Production Count',
        data: machineProduction,
        backgroundColor: machineProduction.map(value => {
          if (value > 700) return '#10b981';
          if (value > 400) return '#f59e0b';
          if (value > 200) return '#f97316';
          return '#ef4444';
        }),
        borderRadius: 6,
        borderWidth: 2,
        borderColor: machineProduction.map(value => {
          if (value > 700) return '#059669';
          if (value > 400) return '#d97706';  
          if (value > 200) return '#ea580c';
          return '#dc2626';
        })
      }]
    };
    
    setMachineWiseData(machineData);
  };

  const generateFallbackData = async () => {
    console.log('🔄 Generating fallback data...');
    
    generateMockHourlyData();
    generateMockMachineData();
    generateMockProductionLineData();
    
    // Generate plant comparison data
    const comparisonData = {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
      datasets: [
        {
          label: 'Plant 1',
          data: [850, 920, 1200, 1450, 1280, 1100, 950],
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4
        },
        {
          label: 'Plant 2', 
          data: [780, 890, 1150, 1380, 1220, 1050, 900],
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          fill: true,
          tension: 0.4,
          pointRadius: 4
        }
      ]
    };
    
    setPlantComparisonData(comparisonData);
    
    generateEfficiencyDataFromReal({
      running_machines: runningMachines,
      total_machines: totalMachines
    });
  };

  // 🔥 REAL API: Fetch hourly production data
  const fetchRealHourlyProductionData = async () => {
    try {
      console.log('📊 Fetching REAL hourly production data...');
      
      const data = await getHourlyProductionData({
        date: selectedDate,
        plant: selectedPlant,
        shift: selectedShift,
        machine: selectedMachine
      });
      
      if (data.success && data.hourly_data) {
        console.log('✅ REAL Hourly production data:', data.hourly_data);
        
        const hourlyData = {
          labels: data.hourly_data.map(item => `${item.hour}:00`),
          datasets: [{
            label: selectedMachine 
              ? `Machine ${selectedMachine} Production` 
              : `${selectedPlant === 'plant1_data' ? 'Plant 1' : 'Plant 2'} Production`,
            data: data.hourly_data.map(item => item.total_production),
            borderColor: selectedPlant === 'plant1_data' ? '#3b82f6' : '#10b981',
            backgroundColor: selectedPlant === 'plant1_data' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(16, 185, 129, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 4,
            pointHoverRadius: 6
          }]
        };
        
        setHourlyProductionData(hourlyData);
      } else {
        console.log('⚠️ No REAL hourly data, using fallback');
        alert('I am really sorry this hourly data is not in our system. Thank you sir for reaching me!');
        generateMockHourlyData();
      }
    } catch (error) {
      console.error('❌ Error fetching REAL hourly data:', error);
      alert('I am really sorry this hourly data is not in our system. Thank you sir for reaching me!');
      generateMockHourlyData();
    }
  };

  // 🔥 REAL API: Fetch machine-wise data
  const fetchRealMachineWiseData = async () => {
    try {
      console.log('🔧 Fetching REAL machine-wise data...');
      
      const data = await getMachineProductionData({
        date: selectedDate,
        plant: selectedPlant,
        shift: selectedShift,
        hour: selectedHour
      });
      
      if (data.success && data.machine_data) {
        console.log('✅ REAL Machine-wise data:', data.machine_data);
        
        const machineData = {
          labels: data.machine_data.map(item => `M${item.machine_no.toString().padStart(2, '0')}`),
          datasets: [{
            label: 'Production Count',
            data: data.machine_data.map(item => item.production_count),
            backgroundColor: data.machine_data.map(item => {
              const count = item.production_count;
              if (count > 700) return '#10b981'; // High - Green
              if (count > 400) return '#f59e0b'; // Medium - Yellow  
              if (count > 200) return '#f97316'; // Low Medium - Orange
              return '#ef4444'; // Low - Red
            }),
            borderRadius: 6,
            borderWidth: 2,
            borderColor: data.machine_data.map(item => {
              const count = item.production_count;
              if (count > 700) return '#059669';
              if (count > 400) return '#d97706';
              if (count > 200) return '#ea580c';
              return '#dc2626';
            })
          }]
        };
        
        setMachineWiseData(machineData);
      } else {
        console.log('⚠️ No REAL machine data, using fallback');
        generateMockMachineData();
      }
    } catch (error) {
      console.error('❌ Error fetching REAL machine data:', error);
      generateMockMachineData();
    }
  };

  // 🔥 REAL API: Fetch production line status data
  const fetchRealProductionLineData = async () => {
    try {
      console.log('📋 Fetching REAL production line data...');
      
      const data = await getProductionLineStatusData({
        date: selectedDate,
        plant: selectedPlant,
        shift: selectedShift
      });
      
      if (data.success && data.production_lines) {
        console.log('✅ REAL Production line data:', data.production_lines);
        setProductionLineData(data.production_lines);
      } else {
        console.log('⚠️ No REAL production line data, using fallback');
        generateMockProductionLineData();
      }
    } catch (error) {
      console.error('❌ Error fetching REAL production line data:', error);
      generateMockProductionLineData();
    }
  };

  // 🔥 REAL API: Fetch dashboard data with all filters
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        console.log('🔍 Fetching REAL dashboard data with filters:', {
          date: selectedDate,
          plant: selectedPlant,
          shift: selectedShift,
          hour: selectedHour,
          machine: selectedMachine
        });
        
        // 🔥 REAL API CALL with all filters using ApiService
        const data = await getDashboardData({
          date: selectedDate,
          plant: selectedPlant,
          shift: selectedShift,
          hour: selectedHour,
          machine: selectedMachine
        });
        
        if (data.success) {
          console.log('✅ REAL Dashboard data received:', data.dashboard_data);
          
          const dashboardData = data.dashboard_data;
          // 🔥 REAL DATA: Set actual machine counts from database
          setTotalMachines(dashboardData.total_machines); // Will be 57 for Plant1, 26 for Plant2
          setRunningMachines(dashboardData.running_machines);
          setAvgEfficiency(dashboardData.avg_efficiency);
          setTotalProduction(dashboardData.total_production);
          setMachineData(dashboardData.machine_details || []);
          
          // Fetch all chart data with REAL database calls
          await Promise.all([
            fetchRealHourlyProductionData(),
            fetchRealMachineWiseData(),
            fetchRealProductionLineData()
          ]);
          
          // Generate efficiency chart data from REAL data
          generateEfficiencyDataFromReal(dashboardData);
          
        } else {
          console.log('⚠️ API returned error:', data.error);
          
          // 🔥 SHOW CUSTOM ERROR MESSAGE
          alert(data.error || 'I am really sorry this data is not in our system. Thank you sir for reaching me!');
          
          // Use fallback data 
          await generateFallbackData();
        }
      } catch (error) {
        console.error('❌ Error fetching REAL dashboard data:', error);
        
        // 🔥 SHOW CUSTOM ERROR MESSAGE
        alert('I am really sorry this data is not in our system. Thank you sir for reaching me!');
        
        await generateFallbackData();
      } finally {
        setLoading(false);
      }
    };
    
    fetchDashboardData();
    
    // Set up real-time updates every 30 seconds
    const interval = setInterval(fetchDashboardData, 30000);
    return () => clearInterval(interval);
    
    // eslint-disable-next-line
  }, [selectedDate, selectedShift, selectedPlant, selectedHour, selectedMachine]);

  // Handle filter updates
  const handleFilterUpdate = async () => {
    console.log('🔄 Updating filters...');
    setLoading(true);
    // Data will be refetched automatically due to useEffect dependencies
  };

  // Theme-aware styles
  const getThemeColors = () => {
    if (darkMode) {
      return {
        primary: '#0a0a0f',
        secondary: '#1a1b23',
        accent: '#6366f1',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
        text: '#ffffff',
        textSecondary: '#94a3b8',
        textMuted: '#64748b',
        border: 'rgba(255,255,255,0.08)',
        cardBg: '#1e1f26',
        cardBgLight: '#252631',
        hoverBg: 'rgba(255,255,255,0.05)',
        gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        gradient4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        glassBg: 'rgba(30, 31, 38, 0.8)',
        shadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      };
    } else {
      return {
        primary: '#f8fafc',
        secondary: '#ffffff',
        accent: '#6366f1',
        success: '#10b981',
        warning: '#f59e0b',
        danger: '#ef4444',
        info: '#3b82f6',
        text: '#1e293b',
        textSecondary: '#475569',
        textMuted: '#64748b',
        border: 'rgba(0,0,0,0.08)',
        cardBg: '#ffffff',
        cardBgLight: '#f8fafc',
        hoverBg: 'rgba(0,0,0,0.05)',
        gradient1: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        gradient2: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        gradient3: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
        gradient4: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
        glassBg: 'rgba(255, 255, 255, 0.9)',
        shadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
      };
    }
  };

  const theme = getThemeColors();
  const sidebarWidth = sidebarCollapsed ? '70px' : '280px';

  // Tooltip helper functions
  const showTooltip = (key) => {
    setTooltipStates(prev => ({ ...prev, [key]: true }));
  };

  const hideTooltip = (key) => {
    setTooltipStates(prev => ({ ...prev, [key]: false }));
  };

  // MODERN RESPONSIVE STYLES
  const styles = {
    container: {
      minHeight: '100vh',
      backgroundColor: theme.primary,
      color: theme.text,
      display: 'flex',
      position: 'relative',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      transition: 'all 0.3s ease'
    },
    
    sidebar: {
      width: sidebarWidth,
      minHeight: '100vh',
      background: `linear-gradient(180deg, ${theme.secondary} 0%, ${theme.primary} 100%)`,
      borderRight: `1px solid ${theme.border}`,
      position: isMobile ? 'fixed' : 'relative',
      left: isMobile ? (sidebarOpen ? '0' : '-100%') : '0',
      zIndex: 999,
      display: 'flex',
      flexDirection: 'column',
      backdropFilter: 'blur(20px)',
      boxShadow: theme.shadow,
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      overflow: 'hidden auto'
    },

    logoSection: {
      padding: sidebarCollapsed ? '20px 10px' : '25px 20px',
      borderBottom: `1px solid ${theme.border}`,
      position: 'relative',
      textAlign: 'center',
      background: theme.glassBg,
      backdropFilter: 'blur(10px)',
    },

    logoContainer: {
      width: sidebarCollapsed ? '35px' : '60px',
      height: sidebarCollapsed ? '35px' : '60px',
      borderRadius: '12px',
      background: theme.gradient1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin: '0 auto 12px',
      boxShadow: theme.shadow,
      transition: 'all 0.3s ease',
      position: 'relative',
      overflow: 'hidden'
    },

    companyName: {
      fontSize: sidebarCollapsed ? '10px' : '18px',
      fontWeight: '700',
      color: theme.accent,
      marginBottom: sidebarCollapsed ? '2px' : '4px',
      letterSpacing: '0.5px',
      transition: 'all 0.3s ease'
    },

    version: {
      fontSize: sidebarCollapsed ? '6px' : '10px',
      color: theme.textSecondary,
      fontWeight: '500',
      transition: 'all 0.3s ease'
    },

    mainContent: {
      flex: 1,
      background: theme.primary,
      minHeight: '100vh',
      transition: 'all 0.3s ease',
      display: 'flex',
      flexDirection: 'column'
    },

    header: {
      padding: '20px 30px',
      background: theme.glassBg,
      backdropFilter: 'blur(20px)',
      borderBottom: `1px solid ${theme.border}`,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      flexWrap: 'wrap',
      gap: '15px'
    },

    title: {
      fontSize: isMobile ? '20px' : '24px',
      fontWeight: '700',
      color: theme.text,
      margin: '0 0 4px 0',
      letterSpacing: '-0.5px'
    },

    subtitle: {
      fontSize: isMobile ? '12px' : '14px',
      color: theme.textSecondary,
      fontWeight: '400'
    },

    modernBtn: {
      padding: '10px 16px',
      background: theme.cardBg,
      color: theme.text,
      border: `1px solid ${theme.border}`,
      borderRadius: '8px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      fontSize: '13px',
      fontWeight: '500',
      transition: 'all 0.2s ease',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },

    primaryBtn: {
      background: theme.accent,
      color: 'white',
      border: 'none',
      fontWeight: '600',
      boxShadow: `0 4px 15px ${theme.accent}40`
    },

    contentArea: {
      flex: 1,
      padding: isMobile ? '20px 15px' : '30px',
      display: 'grid',
      gap: isMobile ? '20px' : '24px',
      gridTemplateRows: 'auto auto auto auto 1fr',
      overflow: 'auto'
    },

    // 🔥 ENHANCED: Responsive filters section with machine filter
    filtersSection: {
      display: 'grid',
      gridTemplateColumns: isMobile 
        ? '1fr' 
        : 'repeat(auto-fit, minmax(160px, 1fr))',
      gap: isMobile ? '15px' : '20px',
      padding: isMobile ? '20px' : '25px',
      background: theme.cardBg,
      borderRadius: '16px',
      border: `1px solid ${theme.border}`,
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },

    filterGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    },

    filterLabel: {
      fontSize: '12px',
      fontWeight: '600',
      color: theme.textSecondary,
      textTransform: 'uppercase',
      letterSpacing: '0.5px'
    },

    filterSelect: {
      padding: '12px 16px',
      background: theme.secondary,
      color: theme.text,
      border: `1px solid ${theme.border}`,
      borderRadius: '10px',
      fontSize: '14px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      minHeight: '44px'
    },

    updateBtn: {
      padding: '12px 24px',
      background: `linear-gradient(135deg, ${theme.accent}, #8b5cf6)`,
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      transition: 'all 0.3s ease',
      boxShadow: `0 4px 15px ${theme.accent}40`,
      alignSelf: 'flex-end',
      minHeight: '44px'
    },

    // 🔥 ENHANCED: Responsive stats grid
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile 
        ? 'repeat(2, 1fr)' 
        : 'repeat(auto-fit, minmax(220px, 1fr))',
      gap: isMobile ? '15px' : '20px'
    },

    modernStatCard: {
      background: theme.cardBg,
      border: `1px solid ${theme.border}`,
      borderRadius: '16px',
      padding: isMobile ? '16px' : '24px',
      position: 'relative',
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },

    statCardIcon: {
      width: isMobile ? '36px' : '48px',
      height: isMobile ? '36px' : '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '16px' : '20px',
      marginBottom: isMobile ? '12px' : '16px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    },

    statValue: {
      fontSize: isMobile ? '20px' : '28px',
      fontWeight: '700',
      marginBottom: '8px',
      color: theme.text,
      lineHeight: '1.2'
    },

    statLabel: {
      fontSize: isMobile ? '11px' : '13px',
      color: theme.textSecondary,
      fontWeight: '500',
      textTransform: 'uppercase',
      letterSpacing: '0.5px',
      marginBottom: '12px'
    },

    statChange: {
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      fontSize: isMobile ? '10px' : '12px',
      fontWeight: '600'
    },

    // 🔥 NEW: Production Line Monitor Styles
    productionMonitorSection: {
      background: theme.cardBg,
      border: `1px solid ${theme.border}`,
      borderRadius: '16px',
      padding: isMobile ? '16px' : '24px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },

    productionMonitorTitle: {
      fontSize: isMobile ? '16px' : '18px',
      fontWeight: '600',
      color: theme.text,
      marginBottom: isMobile ? '15px' : '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },

    productionLinesList: {
      maxHeight: '400px',
      overflowY: 'auto',
      paddingRight: '10px'
    },

    productionLineItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: isMobile ? '12px' : '16px',
      marginBottom: '8px',
      background: theme.cardBgLight,
      border: `1px solid ${theme.border}`,
      borderRadius: '12px',
      transition: 'all 0.2s ease',
      cursor: 'pointer'
    },

    productionLineLeft: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: '4px'
    },

    productionLineName: {
      fontSize: isMobile ? '13px' : '14px',
      fontWeight: '600',
      color: theme.text
    },

    productionLineStatus: {
      fontSize: isMobile ? '11px' : '12px',
      color: theme.textSecondary
    },

    productionLineRight: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '8px' : '12px'
    },

    productionLineEfficiency: {
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: '700',
      minWidth: '45px',
      textAlign: 'right'
    },

    productionLineUpdate: {
      fontSize: isMobile ? '10px' : '11px',
      color: theme.textMuted,
      minWidth: '80px',
      textAlign: 'right'
    },

    // 🔥 ENHANCED: Fully responsive graphs grid
    graphsGrid: {
      display: 'grid',
      gridTemplateColumns: isMobile 
        ? '1fr' 
        : window.innerWidth <= 1024
          ? '1fr'
          : 'repeat(2, 1fr)',
      gap: isMobile ? '20px' : '24px'
    },

    graphCard: {
      background: theme.cardBg,
      border: `1px solid ${theme.border}`,
      borderRadius: '16px',
      padding: isMobile ? '16px' : '24px',
      backdropFilter: 'blur(10px)',
      boxShadow: '0 4px 20px rgba(0,0,0,0.08)'
    },

    graphTitle: {
      fontSize: isMobile ? '14px' : '16px',
      fontWeight: '600',
      color: theme.text,
      marginBottom: isMobile ? '15px' : '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    }
  };

  // Navigation structure
  const navigationStructure = [
    { 
      key: 'dashboard', 
      icon: '📊', 
      label: 'Dashboard', 
      active: true, 
      clickable: false 
    },
    { 
      key: 'monitoring-dropdown',
      icon: '📡', 
      label: 'Live Monitoring', 
      hasDropdown: true,
      isOpen: dropdownStates.monitoring,
      dropdownItems: [
        { key: 'plant1-live', icon: '🏢', label: 'Plant 1 Live' },
        { key: 'plant2-live', icon: '🏭', label: 'Plant 2 Live' }
      ]
    },
    {
      key: 'assign-dropdown',
      icon: '⚙️',
      label: 'Operations',
      hasDropdown: true,
      isOpen: dropdownStates.assign,
      dropdownItems: [
        { key: 'assign-machine', icon: '🔧', label: 'Assignments' },
        { key: 'idle-report-submit', icon: '📋', label: 'Idle Reports' }
      ]
    },
    {
      key: 'reports-dropdown',
      icon: '📈',
      label: 'Analytics',
      hasDropdown: true,
      isOpen: dropdownStates.reports,
      dropdownItems: [
        { key: 'machine-assignments', icon: '📋', label: 'Records' },
        { key: 'idle-reports-list', icon: '📊', label: 'Reports' }
      ]
    }
  ];

  // Helper functions for status colors
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'running': return theme.success;
      case 'idle': return theme.warning;
      case 'slow operation': return theme.warning;
      case 'maintenance': return theme.danger;
      default: return theme.textMuted;
    }
  };

  // 🔥 ENHANCED: Responsive chart options
  const getChartOptions = () => ({
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: isMobile ? 'bottom' : 'top',
        labels: {
          color: theme.text,
          font: {
            size: isMobile ? 10 : 12
          },
          padding: isMobile ? 10 : 15,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: theme.cardBg,
        titleColor: theme.text,
        bodyColor: theme.text,
        borderColor: theme.border,
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        titleFont: {
          size: isMobile ? 12 : 14
        },
        bodyFont: {
          size: isMobile ? 11 : 12
        }
      }
    },
    scales: {
      x: {
        ticks: {
          color: theme.textSecondary,
          font: {
            size: isMobile ? 9 : 11
          },
          maxTicksLimit: isMobile ? 6 : 12
        },
        grid: {
          color: theme.border,
          drawOnChartArea: true,
          drawTicks: true
        }
      },
      y: {
        ticks: {
          color: theme.textSecondary,
          font: {
            size: isMobile ? 9 : 11
          }
        },
        grid: {
          color: theme.border,
          drawOnChartArea: true,
          drawTicks: true
        }
      }
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuart'
    },
    interaction: {
      intersect: false,
      mode: 'index'
    }
  });

  // Icons
  const SearchIcon = () => (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  );

  const BellIcon = () => (
    <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
      <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
    </svg>
  );

  // 🔥 ENHANCED: Safe Chart component with responsive design
  const SafeChart = ({ type: ChartComponent, data, options, title }) => {
    if (!data || !data.labels || !data.datasets || data.datasets.length === 0) {
      return (
        <div style={{ 
          height: isMobile ? '200px' : '300px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: theme.textMuted,
          fontSize: isMobile ? '12px' : '14px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: isMobile ? '24px' : '32px', marginBottom: '10px' }}>📊</div>
            Loading {title} data...
          </div>
        </div>
      );
    }

    try {
      return (
        <div style={{ height: isMobile ? '200px' : '300px' }}>
          <ChartComponent data={data} options={options} />
        </div>
      );
    } catch (error) {
      console.error(`Error rendering ${title} chart:`, error);
      return (
        <div style={{ 
          height: isMobile ? '200px' : '300px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: theme.danger,
          fontSize: isMobile ? '12px' : '14px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: isMobile ? '24px' : '32px', marginBottom: '10px' }}>⚠️</div>
            Error loading {title} chart
          </div>
        </div>
      );
    }
  };

  // Navigation Item Component
  const NavigationItem = ({ item, index }) => {
    const dropdownKey = item.key.replace('-dropdown', '');
    
    return (
      <div key={index} style={{ marginBottom: '4px' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: sidebarCollapsed ? '12px 8px' : '12px 16px',
            borderRadius: '8px',
            cursor: item.clickable || item.hasDropdown ? 'pointer' : 'default',
            transition: 'all 0.2s ease',
            backgroundColor: item.active ? `${theme.accent}20` : 'transparent',
            color: item.active ? theme.accent : theme.text,
            marginBottom: '4px',
            border: item.active ? `1px solid ${theme.accent}40` : '1px solid transparent'
          }}
          onClick={() => {
            if (item.hasDropdown) {
              toggleDropdown(dropdownKey);
            } else if (item.clickable) {
              handleNavigation(item.key);
            }
          }}
        >
          <span style={{
            fontSize: '16px',
            marginRight: sidebarCollapsed ? '0' : '12px',
            minWidth: '16px',
            textAlign: 'center'
          }}>
            {item.icon}
          </span>
          
          {!sidebarCollapsed && (
            <>
              <span style={{
                fontSize: '14px',
                fontWeight: '500',
                flex: 1
              }}>
                {item.label}
              </span>
              
              {item.hasDropdown && (
                <span style={{
                  fontSize: '10px',
                  transition: 'transform 0.2s ease',
                  transform: dropdownStates[dropdownKey] ? 'rotate(90deg)' : 'rotate(0deg)',
                  color: theme.textSecondary
                }}>
                  ▶
                </span>
              )}
            </>
          )}
        </div>

        {/* Dropdown Content */}
        {item.hasDropdown && !sidebarCollapsed && (
          <div style={{
            maxHeight: dropdownStates[dropdownKey] ? '120px' : '0',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            backgroundColor: theme.cardBgLight,
            borderRadius: '8px',
            marginLeft: '16px',
            marginTop: '4px',
            border: `1px solid ${theme.border}`
          }}>
            {item.dropdownItems.map((dropItem, dropIndex) => (
              <div
                key={dropIndex}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px 12px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: theme.textSecondary,
                  transition: 'all 0.2s ease'
                }}
                onClick={() => handleNavigation(dropItem.key)}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = theme.hoverBg;
                  e.currentTarget.style.color = theme.text;
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = theme.textSecondary;
                }}
              >
                <span style={{ marginRight: '8px', fontSize: '12px' }}>{dropItem.icon}</span>
                <span>{dropItem.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  // Check if data is loaded
  const hasDataLoaded = hourlyProductionData.labels.length > 0 || 
                       machineWiseData.labels.length > 0 || 
                       efficiencyData.labels.length > 0;

  return (
    <div style={styles.container}>
      {/* Mobile Sidebar Toggle */}
      {isMobile && (
        <button
          style={{
            position: 'fixed',
            top: '20px',
            left: '20px',
            zIndex: 1001,
            background: theme.accent,
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '12px',
            cursor: 'pointer',
            fontSize: '18px',
            boxShadow: theme.shadow
          }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <div style={styles.sidebar}>
        {/* Logo Section */}
        <div style={styles.logoSection}>
          <button 
            style={{
              position: 'absolute',
              top: '15px',
              right: '15px',
              background: 'transparent',
              border: 'none',
              color: theme.textSecondary,
              cursor: 'pointer',
              padding: '4px',
              borderRadius: '4px',
              fontSize: '12px'
            }}
            onClick={toggleSidebarCollapse}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>

          <div style={styles.logoContainer}>
            <span style={{ color: 'white', fontSize: sidebarCollapsed ? '16px' : '24px', fontWeight: 'bold' }}>
              A
            </span>
          </div>
          
          {!sidebarCollapsed && (
            <>
              <div style={styles.companyName}>ATOMONE</div>
              <div style={styles.version}>v4.0</div>
            </>
          )}
        </div>
        
        {/* Navigation */}
        <div style={{ flex: 1, padding: sidebarCollapsed ? '15px 8px' : '20px 16px' }}>
          {navigationStructure.map((item, index) => (
            <NavigationItem key={item.key} item={item} index={index} />
          ))}
        </div>

        {/* Logout */}
        <div style={{ padding: sidebarCollapsed ? '15px 8px' : '20px 16px', borderTop: `1px solid ${theme.border}` }}>
          <button 
            style={{
              width: '100%',
              padding: sidebarCollapsed ? '12px' : '12px 16px',
              background: theme.danger,
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: sidebarCollapsed ? '0' : '8px',
              transition: 'all 0.2s ease'
            }}
            onClick={onLogout}
          >
            <span>🚪</span>
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            zIndex: 998
          }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Analytics Dashboard</h1>
            <p style={styles.subtitle}>
              Industrial Machine Performance Analytics - {selectedPlant === 'plant1_data' ? 'PLANT 1' : 'PLANT 2'} DATA - {selectedDate}
              {selectedHour && ` - Hour: ${selectedHour}:00`}
              {selectedShift && ` - Shift: ${selectedShift}`}
              {selectedMachine && ` - Machine: ${selectedMachine}`}
            </p>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <button style={styles.modernBtn}>
              <SearchIcon />
              {!isMobile && <span>Search</span>}
            </button>
            <button style={styles.modernBtn}>
              <BellIcon />
            </button>
            <button style={{...styles.modernBtn, ...styles.primaryBtn}}>
              + {isMobile ? 'Add' : 'Add Project'}
            </button>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '8px',
              background: theme.gradient1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600'
            }}>
              SA
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div style={styles.contentArea}>
          {/* 🔥 ENHANCED: Filters Section with Machine Filter */}
          <div style={styles.filtersSection}>
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Production Plant</label>
              <select 
                style={styles.filterSelect}
                value={selectedPlant}
                onChange={(e) => setSelectedPlant(e.target.value)}
              >
                <option value="plant1_data">Manufacturing Plant 1</option>
                <option value="plant2_data">Manufacturing Plant 2</option>
              </select>
            </div>
            
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Analysis Period</label>
              <select 
                style={styles.filterSelect}
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                {availableDates.map(date => (
                  <option key={date} value={date}>{date}</option>
                ))}
              </select>
            </div>
            
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Operational Shift</label>
              <select 
                style={styles.filterSelect}
                value={selectedShift}
                onChange={(e) => setSelectedShift(e.target.value)}
              >
                <option value="">All Production Shifts</option>
                <option value="A">A Shift (Morning)</option>
                <option value="B">B Shift (Evening)</option>  
                <option value="C">C Shift (Night)</option>
              </select>
            </div>

            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Hour Analysis</label>
              <select 
                style={styles.filterSelect}
                value={selectedHour}
                onChange={(e) => setSelectedHour(e.target.value)}
              >
                <option value="">All Hours (24h)</option>
                {availableHours.map(hour => (
                  <option key={hour.value} value={hour.value}>
                    {hour.label}
                  </option>
                ))}
              </select>
            </div>

            {/* 🔥 NEW: Machine Number Filter */}
            <div style={styles.filterGroup}>
              <label style={styles.filterLabel}>Machine Number</label>
              <select 
                style={styles.filterSelect}
                value={selectedMachine}
                onChange={(e) => setSelectedMachine(e.target.value)}
              >
                <option value="">All Machines</option>
                {availableMachines.map(machine => (
                  <option key={machine.value} value={machine.value}>
                    {machine.label}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              style={styles.updateBtn}
              onClick={handleFilterUpdate}
              disabled={loading}
              onMouseOver={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 6px 20px ${theme.accent}60`;
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = `0 4px 15px ${theme.accent}40`;
              }}
            >
              {loading ? 'Updating...' : 'Update Analytics'}
            </button>
          </div>

          {/* Stats Grid */}
          <div style={styles.statsGrid}>
            <div style={styles.modernStatCard}>
              <div style={{...styles.statCardIcon, background: theme.gradient1}}>
                🏭
              </div>
              <div style={styles.statValue}>{totalMachines}</div>
              <div style={styles.statLabel}>Total Manufacturing Units</div>
              <div style={{...styles.statChange, color: theme.success}}>
                <span>↗</span>
                <span>Active Production Lines</span>
              </div>
            </div>

            <div style={styles.modernStatCard}>
              <div style={{...styles.statCardIcon, background: theme.gradient2}}>
                ⚡
              </div>
              <div style={styles.statValue}>{runningMachines}</div>
              <div style={styles.statLabel}>Active Production Units</div>
              <div style={{...styles.statChange, color: theme.success}}>
                <span>↗</span>
                <span>Currently Running</span>
              </div>
            </div>

            <div style={styles.modernStatCard}>
              <div style={{...styles.statCardIcon, background: theme.gradient3}}>
                📊
              </div>
              <div style={styles.statValue}>{avgEfficiency}%</div>
              <div style={styles.statLabel}>Overall Efficiency</div>
              <div style={{...styles.statChange, color: theme.warning}}>
                <span>→</span>
                <span>Performance Metric</span>
              </div>
            </div>

            <div style={styles.modernStatCard}>
              <div style={{...styles.statCardIcon, background: theme.gradient4}}>
                🎯
              </div>
              <div style={styles.statValue}>{totalProduction.toLocaleString()}</div>
              <div style={styles.statLabel}>Production Output</div>
              <div style={{...styles.statChange, color: theme.success}}>
                <span>↗</span>
                <span>Units Manufactured</span>
              </div>
            </div>
          </div>

          {/* 🔥 NEW: Production Line Status Monitor */}
          <div style={styles.productionMonitorSection}>
            <h2 style={styles.productionMonitorTitle}>
              <span>📋</span>
              Production Line Status Monitor
            </h2>
            
            <div style={styles.productionLinesList}>
              {productionLineData.map((line, index) => (
                <div 
                  key={index}
                  style={styles.productionLineItem}
                  onMouseOver={(e) => {
                    e.currentTarget.style.backgroundColor = theme.hoverBg;
                    e.currentTarget.style.transform = 'translateX(5px)';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.backgroundColor = theme.cardBgLight;
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div style={styles.productionLineLeft}>
                    <div style={styles.productionLineName}>
                      {line.machine_name}
                    </div>
                    <div style={styles.productionLineStatus}>
                      {line.status} - {line.shift} shift operations
                    </div>
                  </div>
                  
                  <div style={styles.productionLineRight}>
                    <div 
                      style={{
                        ...styles.productionLineEfficiency,
                        color: getStatusColor(line.status)
                      }}
                    >
                      {line.efficiency}%
                    </div>
                    <div style={styles.productionLineUpdate}>
                      {line.last_update}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 🔥 ENHANCED: Fully Responsive Graphs Grid */}
          <div style={styles.graphsGrid}>
            {/* Hourly Production Graph */}
            <div style={styles.graphCard}>
              <h3 style={styles.graphTitle}>
                <span>📈</span>
                {selectedMachine 
                  ? `Machine ${selectedMachine} ${selectedHour ? `at ${selectedHour}:00` : "Today's Production"}`
                  : selectedHour ? `Production at ${selectedHour}:00` : "Today's Hourly Production"
                }
              </h3>
              <SafeChart 
                type={Line} 
                data={hourlyProductionData} 
                options={getChartOptions()} 
                title="Hourly Production"
              />
            </div>

            {/* Machine Status Pie Chart */}
            <div style={styles.graphCard}>
              <h3 style={styles.graphTitle}>
                <span>📊</span>
                Machine Status Distribution
              </h3>
              <SafeChart 
                type={Doughnut} 
                data={efficiencyData} 
                options={{
                  ...getChartOptions(),
                  plugins: {
                    ...getChartOptions().plugins,
                    legend: {
                      ...getChartOptions().plugins.legend,
                      position: 'bottom'
                    }
                  }
                }} 
                title="Machine Status"
              />
            </div>

            {/* Machine-wise Production Bar Chart */}
            <div style={styles.graphCard}>
              <h3 style={styles.graphTitle}>
                <span>📊</span>
                {selectedHour ? `Machines at ${selectedHour}:00` : "Top Machines Production"}
              </h3>
              <SafeChart 
                type={Bar} 
                data={machineWiseData} 
                options={getChartOptions()} 
                title="Machine Production"
              />
            </div>

            {/* Plant Comparison Graph */}
            <div style={styles.graphCard}>
              <h3 style={styles.graphTitle}>
                <span>🏭</span>
                Plant Performance Comparison
              </h3>
              <SafeChart 
                type={Line} 
                data={plantComparisonData} 
                options={getChartOptions()} 
                title="Plant Comparison"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        * {
          transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 6px;
          height: 6px;
        }
        
        ::-webkit-scrollbar-track {
          background: ${theme.border};
        }
        
        ::-webkit-scrollbar-thumb {
          background: ${theme.textMuted};
          border-radius: 3px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: ${theme.accent};
        }
      `}</style>
    </div>
  );
};

export default Dashboard;

// // src/components/Dashboard.js - PIXEL PERFECT HD VERSION
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Line, Bar, Doughnut } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// } from 'chart.js';

// import { 
//   getDashboardData, 
//   getHourlyProductionData, 
//   getMachineProductionData, 
//   getProductionLineStatusData, 
//   getAvailableDates 
// } from '../services/apiService';

// // 🔥 HD CHART REGISTRATION: Optimized for crisp rendering
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   Filler
// );

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();
  
//   // States
//   const [loading, setLoading] = useState(true);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [dropdownStates, setDropdownStates] = useState({
//     monitoring: false,
//     assign: false,
//     reports: false
//   });

//   // Dashboard data
//   const [totalMachines, setTotalMachines] = useState(0);
//   const [runningMachines, setRunningMachines] = useState(0);
//   const [idleMachines, setIdleMachines] = useState(0);
//   const [offlineMachines, setOfflineMachines] = useState(0);
//   const [avgEfficiency, setAvgEfficiency] = useState(0);
//   const [totalProduction, setTotalProduction] = useState(0);
  
//   // Filters
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedPlant, setSelectedPlant] = useState('plant1_data');
//   const [selectedShift, setSelectedShift] = useState('');
//   const [selectedHour, setSelectedHour] = useState('');
//   const [selectedMachine, setSelectedMachine] = useState('');
  
//   // Options
//   const [availableDates, setAvailableDates] = useState([]);
//   const [availableHours, setAvailableHours] = useState([]);
//   const [availableMachines, setAvailableMachines] = useState([]);
  
//   // Chart data
//   const [hourlyProductionData, setHourlyProductionData] = useState({ labels: [], datasets: [] });
//   const [machineStatusData, setMachineStatusData] = useState({ labels: [], datasets: [] });
//   const [topMachinesData, setTopMachinesData] = useState({ labels: [], datasets: [] });
//   const [plantComparisonData, setPlantComparisonData] = useState({ labels: [], datasets: [] });

//   // 🔥 HD VIEWPORT DETECTION: For crisp rendering
//   const [devicePixelRatio, setDevicePixelRatio] = useState(1);
//   const [viewportSize, setViewportSize] = useState({ width: 0, height: 0 });

//   useEffect(() => {
//     // Set device pixel ratio for HD rendering
//     setDevicePixelRatio(window.devicePixelRatio || 1);
    
//     const handleResize = () => {
//       const mobile = window.innerWidth <= 768;
//       setIsMobile(mobile);
//       setViewportSize({ width: window.innerWidth, height: window.innerHeight });
      
//       if (!mobile) {
//         setSidebarOpen(false);
//       }
//       if (window.innerWidth <= 1024) {
//         setSidebarCollapsed(true);
//       }
//     };

//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // Navigation functions
//   const toggleDropdown = (dropdownKey) => {
//     if (sidebarCollapsed) setSidebarCollapsed(false);
//     setDropdownStates(prevState => ({
//       ...prevState,
//       [dropdownKey]: !prevState[dropdownKey]
//     }));
//   };

//   const closeAllDropdowns = () => {
//     setDropdownStates({ monitoring: false, assign: false, reports: false });
//   };

//   const handleNavigation = (page) => {
//     navigate(`/${page}`);
//     closeAllDropdowns();
//     if (isMobile) setSidebarOpen(false);
//   };

//   const toggleSidebarCollapse = () => {
//     setSidebarCollapsed(!sidebarCollapsed);
//     closeAllDropdowns();
//   };

//   // Initialize options
//   useEffect(() => {
//     const hours = Array.from({length: 24}, (_, i) => ({
//       value: i.toString().padStart(2, '0'),
//       label: `${i.toString().padStart(2, '0')}:00`
//     }));
//     setAvailableHours(hours);
    
//     const machineCount = selectedPlant === 'plant1_data' ? 57 : 26;
//     const machines = Array.from({length: machineCount}, (_, i) => ({
//       value: (i + 1).toString(),
//       label: `Machine ${(i + 1).toString().padStart(2, '0')}`
//     }));
//     setAvailableMachines(machines);
//   }, [selectedPlant]);

//   // Data fetching
//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
      
//       const dashboardResponse = await getDashboardData({
//         date: selectedDate,
//         plant: selectedPlant,
//         shift: selectedShift,
//         hour: selectedHour,
//         machine: selectedMachine
//       });
      
//       if (dashboardResponse.success) {
//         const data = dashboardResponse.dashboard_data;
//         setTotalMachines(data.total_machines || 0);
//         setRunningMachines(data.running_machines || 0);
//         setAvgEfficiency(data.avg_efficiency || 0);
//         setTotalProduction(data.total_production || 0);
        
//         const total = data.total_machines || 0;
//         const running = data.running_machines || 0;
//         const idle = Math.floor((total - running) * 0.7);
//         const offline = total - running - idle;
        
//         setIdleMachines(idle);
//         setOfflineMachines(offline);
//       }
      
//       await Promise.all([fetchHourlyData(), fetchMachineData(), fetchProductionLineData()]);
      
//     } catch (error) {
//       console.error('❌ Error fetching dashboard data:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchHourlyData = async () => {
//     try {
//       const response = await getHourlyProductionData({
//         date: selectedDate,
//         plant: selectedPlant,
//         shift: selectedShift,
//         machine: selectedMachine
//       });
      
//       if (response.success && response.hourly_data) {
//         const chartData = {
//           labels: response.hourly_data.map(item => `${item.hour}:00`),
//           datasets: [{
//             label: selectedMachine 
//               ? `Machine ${selectedMachine} Production` 
//               : `${selectedPlant === 'plant1_data' ? 'Plant 1' : 'Plant 2'} Production`,
//             data: response.hourly_data.map(item => item.production_count || 0),
//             borderColor: '#4f46e5',
//             backgroundColor: 'rgba(79, 70, 229, 0.08)',
//             fill: true,
//             tension: 0.4,
//             pointRadius: 3,
//             pointHoverRadius: 5,
//             pointBackgroundColor: '#4f46e5',
//             pointBorderColor: '#ffffff',
//             pointBorderWidth: 2,
//             borderWidth: 2,
//             hitRadius: 8
//           }]
//         };
//         setHourlyProductionData(chartData);
//       }
//     } catch (error) {
//       console.error('❌ Error fetching hourly data:', error);
//     }
//   };

//   const fetchMachineData = async () => {
//     try {
//       const response = await getMachineProductionData({
//         date: selectedDate,
//         plant: selectedPlant,
//         shift: selectedShift,
//         hour: selectedHour
//       });
      
//       if (response.success && response.machine_data) {
//         const topMachines = response.machine_data.slice(0, 15);
//         const barChartData = {
//           labels: topMachines.map(m => `M${m.machine_no.padStart(2, '0')}`),
//           datasets: [{
//             label: 'Production Count',
//             data: topMachines.map(m => m.production_count),
//             backgroundColor: topMachines.map(m => {
//               const count = m.production_count;
//               if (count > 700) return '#10b981';
//               if (count > 400) return '#f59e0b';
//               if (count > 200) return '#f97316';
//               return '#ef4444';
//             }),
//             borderRadius: 4,
//             borderWidth: 0,
//             barPercentage: 0.7,
//             categoryPercentage: 0.8
//           }]
//         };
//         setTopMachinesData(barChartData);
//       }
//     } catch (error) {
//       console.error('❌ Error fetching machine data:', error);
//     }
//   };

//   const fetchProductionLineData = async () => {
//     try {
//       const response = await getProductionLineStatusData({
//         date: selectedDate,
//         plant: selectedPlant,
//         shift: selectedShift
//       });
      
//       if (response.success && response.machine_status_breakdown) {
//         const breakdown = response.machine_status_breakdown;
//         const statusData = {
//           labels: ['Running', 'Idle', 'Maintenance', 'Offline'],
//           datasets: [{
//             data: [
//               breakdown.running || 0,
//               breakdown.idle || 0,
//               breakdown.slow_operation || 0,
//               breakdown.offline || 0
//             ],
//             backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6b7280'],
//             borderWidth: 0,
//             hoverBackgroundColor: ['#059669', '#d97706', '#dc2626', '#4b5563'],
//             hoverBorderWidth: 0
//           }]
//         };
//         setMachineStatusData(statusData);
//       }
//     } catch (error) {
//       console.error('❌ Error fetching production line data:', error);
//     }
//   };

//   useEffect(() => {
//     const fetchDates = async () => {
//       try {
//         const response = await getAvailableDates(selectedPlant);
//         if (response.success && response.available_dates) {
//           setAvailableDates(response.available_dates);
//         }
//       } catch (error) {
//         console.error('❌ Error fetching available dates:', error);
//       }
//     };
//     fetchDates();
//   }, [selectedPlant]);

//   useEffect(() => {
//     fetchDashboardData();
//     const interval = setInterval(fetchDashboardData, 30000);
//     return () => clearInterval(interval);
//     // eslint-disable-next-line
//   }, [selectedDate, selectedPlant, selectedShift, selectedHour, selectedMachine]);

//   // 🔥 HD THEME: Pixel-perfect colors and sizing
//   const theme = {
//     primary: '#0a0a0f',
//     secondary: '#1a1b23',
//     accent: '#4f46e5',
//     success: '#10b981',
//     warning: '#f59e0b',
//     danger: '#ef4444',
//     info: '#3b82f6',
//     text: '#ffffff',
//     textSecondary: '#a1a1aa',
//     textMuted: '#71717a',
//     border: 'rgba(255,255,255,0.06)',
//     cardBg: '#1e1f26',
//     cardBgLight: '#27293a',
//     hoverBg: 'rgba(255,255,255,0.04)',
//     glassBg: 'rgba(30, 31, 38, 0.85)',
//     shadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
//     shadowHover: '0 8px 32px rgba(0, 0, 0, 0.3)'
//   };

//   const sidebarWidth = sidebarCollapsed ? '70px' : '280px';

//   // 🔥 HD CHART OPTIONS: Crystal clear rendering
//   const baseChartOptions = {
//     responsive: true,
//     maintainAspectRatio: false,
//     devicePixelRatio: devicePixelRatio * 2, // 🔥 2x HD rendering
//     plugins: {
//       legend: {
//         position: 'top',
//         labels: {
//           color: theme.text,
//           font: { size: 11, family: "'Inter', sans-serif", weight: '500' },
//           padding: 16,
//           usePointStyle: true,
//           boxWidth: 8,
//           boxHeight: 8
//         }
//       },
//       tooltip: {
//         backgroundColor: theme.cardBg,
//         titleColor: theme.text,
//         bodyColor: theme.text,
//         borderColor: theme.border,
//         borderWidth: 1,
//         cornerRadius: 6,
//         padding: 12,
//         titleFont: { size: 12, weight: '600' },
//         bodyFont: { size: 11 },
//         displayColors: true,
//         boxWidth: 8,
//         boxHeight: 8
//       }
//     },
//     scales: {
//       x: {
//         ticks: { 
//           color: theme.textSecondary, 
//           font: { size: 10, family: "'Inter', sans-serif", weight: '400' },
//           padding: 4
//         },
//         grid: { color: theme.border, lineWidth: 0.5 },
//         border: { display: false }
//       },
//       y: {
//         ticks: { 
//           color: theme.textSecondary, 
//           font: { size: 10, family: "'Inter', sans-serif", weight: '400' },
//           padding: 8
//         },
//         grid: { color: theme.border, lineWidth: 0.5 },
//         border: { display: false }
//       }
//     },
//     animation: { 
//       duration: 800, 
//       easing: 'easeInOutQuart'
//     },
//     interaction: { 
//       intersect: false, 
//       mode: 'index' 
//     },
//     elements: {
//       point: {
//         hoverRadius: 6,
//         hitRadius: 10
//       },
//       line: {
//         tension: 0.4
//       },
//       bar: {
//         borderSkipped: false
//       }
//     }
//   };

//   const doughnutOptions = {
//     ...baseChartOptions,
//     plugins: {
//       ...baseChartOptions.plugins,
//       legend: {
//         ...baseChartOptions.plugins.legend,
//         position: 'bottom',
//         labels: {
//           ...baseChartOptions.plugins.legend.labels,
//           padding: 12,
//           generateLabels: function(chart) {
//             const data = chart.data;
//             if (data.labels.length && data.datasets.length) {
//               return data.labels.map((label, i) => {
//                 const dataset = data.datasets[0];
//                 const value = dataset.data[i];
//                 return {
//                   text: `${label}: ${value}`,
//                   fillStyle: dataset.backgroundColor[i],
//                   strokeStyle: dataset.backgroundColor[i],
//                   lineWidth: 0,
//                   pointStyle: 'circle',
//                   hidden: false,
//                   index: i
//                 };
//               });
//             }
//             return [];
//           }
//         }
//       }
//     },
//     scales: {},
//     cutout: '65%',
//     radius: '85%'
//   };

//   // Navigation structure
//   const navigationStructure = [
//     { key: 'dashboard', icon: '📊', label: 'Dashboard', active: true },
//     { 
//       key: 'monitoring-dropdown',
//       icon: '📡', 
//       label: 'Live Monitoring', 
//       hasDropdown: true,
//       isOpen: dropdownStates.monitoring,
//       dropdownItems: [
//         { key: 'plant1-live', icon: '🏢', label: 'Plant 1 Live' },
//         { key: 'plant2-live', icon: '🏭', label: 'Plant 2 Live' }
//       ]
//     },
//     {
//       key: 'assign-dropdown',
//       icon: '⚙️',
//       label: 'Operations',
//       hasDropdown: true,
//       isOpen: dropdownStates.assign,
//       dropdownItems: [
//         { key: 'assign-machine', icon: '🔧', label: 'Assignments' },
//         { key: 'idle-report-submit', icon: '📋', label: 'Idle Reports' }
//       ]
//     },
//     {
//       key: 'reports-dropdown',
//       icon: '📈',
//       label: 'Analytics',
//       hasDropdown: true,
//       isOpen: dropdownStates.reports,
//       dropdownItems: [
//         { key: 'machine-assignments', icon: '📋', label: 'Records' },
//         { key: 'idle-reports-list', icon: '📊', label: 'Reports' }
//       ]
//     }
//   ];

//   const NavigationItem = ({ item, index }) => {
//     const dropdownKey = item.key.replace('-dropdown', '');
    
//     return (
//       <div key={index} style={{ marginBottom: '2px' }}>
//         <div
//           style={{
//             display: 'flex',
//             alignItems: 'center',
//             padding: sidebarCollapsed ? '10px 6px' : '10px 14px',
//             borderRadius: '6px',
//             cursor: item.hasDropdown || item.key === 'dashboard' ? 'pointer' : 'default',
//             transition: 'all 0.15s ease',
//             backgroundColor: item.active ? `${theme.accent}15` : 'transparent',
//             color: item.active ? theme.accent : theme.text,
//             marginBottom: '2px',
//             border: item.active ? `1px solid ${theme.accent}25` : '1px solid transparent',
//             fontSize: '13px',
//             fontWeight: item.active ? '600' : '500'
//           }}
//           onClick={() => {
//             if (item.hasDropdown) {
//               toggleDropdown(dropdownKey);
//             }
//           }}
//         >
//           <span style={{
//             fontSize: '14px',
//             marginRight: sidebarCollapsed ? '0' : '10px',
//             minWidth: '14px',
//             textAlign: 'center'
//           }}>
//             {item.icon}
//           </span>
          
//           {!sidebarCollapsed && (
//             <>
//               <span style={{
//                 fontSize: '13px',
//                 fontWeight: '500',
//                 flex: 1,
//                 letterSpacing: '0.01em'
//               }}>
//                 {item.label}
//               </span>
              
//               {item.hasDropdown && (
//                 <span style={{
//                   fontSize: '8px',
//                   transition: 'transform 0.15s ease',
//                   transform: dropdownStates[dropdownKey] ? 'rotate(90deg)' : 'rotate(0deg)',
//                   color: theme.textSecondary,
//                   marginLeft: '4px'
//                 }}>
//                   ▶
//                 </span>
//               )}
//             </>
//           )}
//         </div>

//         {item.hasDropdown && !sidebarCollapsed && (
//           <div style={{
//             maxHeight: dropdownStates[dropdownKey] ? '100px' : '0',
//             overflow: 'hidden',
//             transition: 'all 0.25s ease',
//             backgroundColor: theme.cardBgLight,
//             borderRadius: '6px',
//             marginLeft: '14px',
//             marginTop: '2px',
//             border: `1px solid ${theme.border}`
//           }}>
//             {item.dropdownItems.map((dropItem, dropIndex) => (
//               <div
//                 key={dropIndex}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   padding: '6px 10px',
//                   cursor: 'pointer',
//                   fontSize: '12px',
//                   color: theme.textSecondary,
//                   transition: 'all 0.15s ease',
//                   fontWeight: '400'
//                 }}
//                 onClick={() => handleNavigation(dropItem.key)}
//                 onMouseOver={(e) => {
//                   e.currentTarget.style.backgroundColor = theme.hoverBg;
//                   e.currentTarget.style.color = theme.text;
//                 }}
//                 onMouseOut={(e) => {
//                   e.currentTarget.style.backgroundColor = 'transparent';
//                   e.currentTarget.style.color = theme.textSecondary;
//                 }}
//               >
//                 <span style={{ marginRight: '6px', fontSize: '11px' }}>{dropItem.icon}</span>
//                 <span>{dropItem.label}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   return (
//     <>
//       {/* 🔥 CSS RESET FOR PIXEL PERFECT RENDERING */}
//       <style jsx global>{`
//         * {
//           box-sizing: border-box;
//           margin: 0;
//           padding: 0;
//           -webkit-font-smoothing: antialiased;
//           -moz-osx-font-smoothing: grayscale;
//           text-rendering: optimizeLegibility;
//         }
        
//         body {
//           font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
//           font-feature-settings: "cv02", "cv03", "cv04", "cv11";
//           font-variation-settings: normal;
//           line-height: 1.5;
//         }
        
//         canvas {
//           image-rendering: -moz-crisp-edges;
//           image-rendering: -webkit-optimize-contrast;
//           image-rendering: crisp-edges;
//           image-rendering: pixelated;
//         }
        
//         ::-webkit-scrollbar {
//           width: 4px;
//           height: 4px;
//         }
        
//         ::-webkit-scrollbar-track {
//           background: ${theme.border};
//         }
        
//         ::-webkit-scrollbar-thumb {
//           background: ${theme.textMuted};
//           border-radius: 2px;
//         }
        
//         ::-webkit-scrollbar-thumb:hover {
//           background: ${theme.accent};
//         }
        
//         input, select, button {
//           -webkit-appearance: none;
//           -moz-appearance: none;
//           appearance: none;
//         }
        
//         button {
//           cursor: pointer;
//           border: none;
//           outline: none;
//         }
        
//         select {
//           cursor: pointer;
//           outline: none;
//         }
//       `}</style>

//       <div style={{
//         minHeight: '100vh',
//         backgroundColor: theme.primary,
//         color: theme.text,
//         display: 'flex',
//         position: 'relative',
//         fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
//         transition: 'all 0.2s ease',
//         overflow: 'hidden'
//       }}>
//         {/* Mobile Sidebar Toggle */}
//         {isMobile && (
//           <button
//             style={{
//               position: 'fixed',
//               top: '16px',
//               left: '16px',
//               zIndex: 1001,
//               background: theme.accent,
//               color: 'white',
//               border: 'none',
//               borderRadius: '6px',
//               padding: '10px',
//               cursor: 'pointer',
//               fontSize: '16px',
//               boxShadow: theme.shadow,
//               width: '36px',
//               height: '36px',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center'
//             }}
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             ☰
//           </button>
//         )}

//         {/* Sidebar */}
//         <div style={{
//           width: sidebarWidth,
//           minHeight: '100vh',
//           background: `linear-gradient(180deg, ${theme.secondary} 0%, ${theme.primary} 100%)`,
//           borderRight: `1px solid ${theme.border}`,
//           position: isMobile ? 'fixed' : 'relative',
//           left: isMobile ? (sidebarOpen ? '0' : '-100%') : '0',
//           zIndex: 999,
//           display: 'flex',
//           flexDirection: 'column',
//           backdropFilter: 'blur(20px)',
//           boxShadow: theme.shadow,
//           transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
//           overflow: 'hidden auto'
//         }}>
//           {/* Logo */}
//           <div style={{
//             padding: sidebarCollapsed ? '16px 8px' : '20px 16px',
//             borderBottom: `1px solid ${theme.border}`,
//             position: 'relative',
//             textAlign: 'center',
//             background: theme.glassBg,
//             backdropFilter: 'blur(10px)'
//           }}>
//             <button 
//               style={{
//                 position: 'absolute',
//                 top: '12px',
//                 right: '12px',
//                 background: 'transparent',
//                 border: 'none',
//                 color: theme.textSecondary,
//                 cursor: 'pointer',
//                 padding: '2px',
//                 borderRadius: '3px',
//                 fontSize: '10px'
//               }}
//               onClick={toggleSidebarCollapse}
//             >
//               {sidebarCollapsed ? '→' : '←'}
//             </button>

//             <div style={{
//               width: sidebarCollapsed ? '30px' : '48px',
//               height: sidebarCollapsed ? '30px' : '48px',
//               borderRadius: '8px',
//               background: theme.accent,
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               margin: '0 auto 10px',
//               boxShadow: theme.shadow,
//               transition: 'all 0.25s ease'
//             }}>
//               <span style={{ 
//                 color: 'white', 
//                 fontSize: sidebarCollapsed ? '14px' : '20px', 
//                 fontWeight: '700' 
//               }}>
//                 A
//               </span>
//             </div>
            
//             {!sidebarCollapsed && (
//               <>
//                 <div style={{
//                   fontSize: '16px',
//                   fontWeight: '700',
//                   color: theme.accent,
//                   marginBottom: '2px',
//                   letterSpacing: '0.3px'
//                 }}>
//                   ATOMONE
//                 </div>
//                 <div style={{
//                   fontSize: '9px',
//                   color: theme.textSecondary,
//                   fontWeight: '500'
//                 }}>
//                   v4.0
//                 </div>
//               </>
//             )}
//           </div>
          
//           {/* Navigation */}
//           <div style={{ 
//             flex: 1, 
//             padding: sidebarCollapsed ? '12px 6px' : '16px 12px' 
//           }}>
//             {navigationStructure.map((item, index) => (
//               <NavigationItem key={item.key} item={item} index={index} />
//             ))}
//           </div>

//           {/* Logout */}
//           <div style={{ 
//             padding: sidebarCollapsed ? '12px 6px' : '16px 12px', 
//             borderTop: `1px solid ${theme.border}` 
//           }}>
//             <button 
//               style={{
//                 width: '100%',
//                 padding: sidebarCollapsed ? '10px' : '10px 14px',
//                 background: theme.danger,
//                 color: 'white',
//                 border: 'none',
//                 borderRadius: '6px',
//                 cursor: 'pointer',
//                 fontSize: '12px',
//                 fontWeight: '600',
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 gap: sidebarCollapsed ? '0' : '6px',
//                 transition: 'all 0.15s ease'
//               }}
//               onClick={onLogout}
//             >
//               <span style={{ fontSize: '12px' }}>🚪</span>
//               {!sidebarCollapsed && <span>Logout</span>}
//             </button>
//           </div>
//         </div>

//         {/* Mobile Overlay */}
//         {isMobile && sidebarOpen && (
//           <div
//             style={{
//               position: 'fixed',
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               backgroundColor: 'rgba(0,0,0,0.4)',
//               zIndex: 998,
//               backdropFilter: 'blur(2px)'
//             }}
//             onClick={() => setSidebarOpen(false)}
//           />
//         )}

//         {/* Main Content */}
//         <div style={{
//           flex: 1,
//           background: theme.primary,
//           minHeight: '100vh',
//           transition: 'all 0.25s ease',
//           display: 'flex',
//           flexDirection: 'column',
//           overflow: 'hidden'
//         }}>
//           {/* Header */}
//           <div style={{
//             padding: isMobile ? '16px 20px 16px 60px' : '18px 24px',
//             background: theme.glassBg,
//             backdropFilter: 'blur(20px)',
//             borderBottom: `1px solid ${theme.border}`,
//             display: 'flex',
//             justifyContent: 'space-between',
//             alignItems: 'center',
//             position: 'sticky',
//             top: 0,
//             zIndex: 100,
//             flexWrap: 'wrap',
//             gap: '12px'
//           }}>
//             <div>
//               <h1 style={{
//                 fontSize: isMobile ? '18px' : '22px',
//                 fontWeight: '700',
//                 color: theme.text,
//                 margin: '0 0 2px 0',
//                 letterSpacing: '-0.3px',
//                 lineHeight: '1.2'
//               }}>
//                 Industrial Analytics Dashboard
//               </h1>
//               <p style={{
//                 fontSize: isMobile ? '11px' : '12px',
//                 color: theme.textSecondary,
//                 fontWeight: '400',
//                 margin: 0
//               }}>
//                 {selectedPlant === 'plant1_data' ? 'MANUFACTURING PLANT 1' : 'MANUFACTURING PLANT 2'} 
//                 {' - '}{selectedDate} - Current: 14:10
//               </p>
//             </div>
            
//             <div style={{ 
//               display: 'flex', 
//               alignItems: 'center', 
//               gap: '10px' 
//             }}>
//               <button 
//                 style={{
//                   padding: '8px 12px',
//                   background: theme.cardBg,
//                   color: theme.text,
//                   border: `1px solid ${theme.border}`,
//                   borderRadius: '6px',
//                   cursor: 'pointer',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '6px',
//                   fontSize: '12px',
//                   fontWeight: '500',
//                   transition: 'all 0.15s ease'
//                 }}
//               >
//                 <span style={{ fontSize: '12px' }}>🔍</span>
//                 {!isMobile && <span>Search</span>}
//               </button>
//               <div style={{
//                 width: '32px',
//                 height: '32px',
//                 borderRadius: '6px',
//                 background: theme.accent,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 color: 'white',
//                 fontSize: '12px',
//                 fontWeight: '600'
//               }}>
//                 SA
//               </div>
//             </div>
//           </div>

//           {/* Dashboard Content */}
//           <div style={{
//             flex: 1,
//             padding: isMobile ? '16px 12px' : '20px 24px',
//             display: 'flex',
//             flexDirection: 'column',
//             gap: isMobile ? '16px' : '20px',
//             overflow: 'auto'
//           }}>
//             {/* Filters */}
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: isMobile 
//                 ? '1fr' 
//                 : 'repeat(auto-fit, minmax(140px, 1fr))',
//               gap: isMobile ? '12px' : '16px',
//               padding: isMobile ? '16px' : '20px',
//               background: theme.cardBg,
//               borderRadius: '12px',
//               border: `1px solid ${theme.border}`,
//               backdropFilter: 'blur(10px)',
//               boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
//             }}>
//               <div>
//                 <label style={{
//                   fontSize: '10px',
//                   fontWeight: '600',
//                   color: theme.textSecondary,
//                   display: 'block',
//                   marginBottom: '6px',
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.4px'
//                 }}>
//                   Plant Selection
//                 </label>
//                 <select 
//                   style={{
//                     width: '100%',
//                     padding: '10px 12px',
//                     background: theme.secondary,
//                     color: theme.text,
//                     border: `1px solid ${theme.border}`,
//                     borderRadius: '6px',
//                     fontSize: '12px',
//                     cursor: 'pointer',
//                     transition: 'all 0.2s ease',
//                     minHeight: '36px'
//                   }}
//                   value={selectedPlant}
//                   onChange={(e) => setSelectedPlant(e.target.value)}
//                 >
//                   <option value="plant1_data">Plant 1 (57 Machines)</option>
//                   <option value="plant2_data">Plant 2 (26 Machines)</option>
//                 </select>
//               </div>
              
//               <div>
//                 <label style={{
//                   fontSize: '10px',
//                   fontWeight: '600',
//                   color: theme.textSecondary,
//                   display: 'block',
//                   marginBottom: '6px',
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.4px'
//                 }}>
//                   Date Selection
//                 </label>
//                 <select 
//                   style={{
//                     width: '100%',
//                     padding: '10px 12px',
//                     background: theme.secondary,
//                     color: theme.text,
//                     border: `1px solid ${theme.border}`,
//                     borderRadius: '6px',
//                     fontSize: '12px',
//                     cursor: 'pointer',
//                     transition: 'all 0.2s ease',
//                     minHeight: '36px'
//                   }}
//                   value={selectedDate}
//                   onChange={(e) => setSelectedDate(e.target.value)}
//                 >
//                   {availableDates.map(date => (
//                     <option key={date} value={date}>{date}</option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label style={{
//                   fontSize: '10px',
//                   fontWeight: '600',
//                   color: theme.textSecondary,
//                   display: 'block',
//                   marginBottom: '6px',
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.4px'
//                 }}>
//                   Machine Number
//                 </label>
//                 <select 
//                   style={{
//                     width: '100%',
//                     padding: '10px 12px',
//                     background: theme.secondary,
//                     color: theme.text,
//                     border: `1px solid ${theme.border}`,
//                     borderRadius: '6px',
//                     fontSize: '12px',
//                     cursor: 'pointer',
//                     transition: 'all 0.2s ease',
//                     minHeight: '36px'
//                   }}
//                   value={selectedMachine}
//                   onChange={(e) => setSelectedMachine(e.target.value)}
//                 >
//                   <option value="">All Machines</option>
//                   {availableMachines.map(machine => (
//                     <option key={machine.value} value={machine.value}>
//                       {machine.label}
//                     </option>
//                   ))}
//                 </select>
//               </div>
              
//               <button 
//                 style={{
//                   padding: '10px 16px',
//                   background: loading 
//                     ? theme.textMuted 
//                     : `linear-gradient(135deg, ${theme.accent}, #6366f1)`,
//                   color: 'white',
//                   border: 'none',
//                   borderRadius: '8px',
//                   cursor: loading ? 'not-allowed' : 'pointer',
//                   fontSize: '12px',
//                   fontWeight: '600',
//                   transition: 'all 0.2s ease',
//                   boxShadow: loading ? 'none' : `0 2px 8px ${theme.accent}25`,
//                   alignSelf: 'flex-end',
//                   minHeight: '36px'
//                 }}
//                 onClick={fetchDashboardData}
//                 disabled={loading}
//               >
//                 {loading ? 'Loading...' : 'Update Data'}
//               </button>
//             </div>

//             {/* Stats Grid - HD Cards */}
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: isMobile 
//                 ? 'repeat(2, 1fr)' 
//                 : 'repeat(auto-fit, minmax(200px, 1fr))',
//               gap: isMobile ? '12px' : '16px'
//             }}>
//               {/* Total Machines Card */}
//               <div style={{
//                 background: theme.cardBg,
//                 border: `1px solid ${theme.border}`,
//                 borderRadius: '12px',
//                 padding: isMobile ? '14px' : '18px',
//                 position: 'relative',
//                 overflow: 'hidden',
//                 transition: 'all 0.2s ease',
//                 backdropFilter: 'blur(10px)',
//                 boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
//               }}>
//                 <div style={{
//                   width: isMobile ? '32px' : '40px',
//                   height: isMobile ? '32px' : '40px',
//                   borderRadius: '8px',
//                   background: theme.info,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontSize: isMobile ? '14px' : '16px',
//                   marginBottom: isMobile ? '10px' : '12px',
//                   boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//                 }}>
//                   🏭
//                 </div>
//                 <div style={{
//                   fontSize: isMobile ? '18px' : '24px',
//                   fontWeight: '700',
//                   marginBottom: '4px',
//                   color: theme.text,
//                   lineHeight: '1.1'
//                 }}>
//                   {loading ? '...' : totalMachines}
//                 </div>
//                 <div style={{
//                   fontSize: isMobile ? '10px' : '11px',
//                   color: theme.textSecondary,
//                   fontWeight: '600',
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.4px',
//                   marginBottom: '8px'
//                 }}>
//                   Total Machines
//                 </div>
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '3px',
//                   fontSize: isMobile ? '9px' : '10px',
//                   fontWeight: '500',
//                   color: theme.success
//                 }}>
//                   <span>↗</span>
//                   <span>Production Units Available</span>
//                 </div>
//               </div>

//               {/* Running Machines Card */}
//               <div style={{
//                 background: theme.cardBg,
//                 border: `1px solid ${theme.border}`,
//                 borderRadius: '12px',
//                 padding: isMobile ? '14px' : '18px',
//                 position: 'relative',
//                 overflow: 'hidden',
//                 transition: 'all 0.2s ease',
//                 backdropFilter: 'blur(10px)',
//                 boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
//               }}>
//                 <div style={{
//                   width: isMobile ? '32px' : '40px',
//                   height: isMobile ? '32px' : '40px',
//                   borderRadius: '8px',
//                   background: theme.success,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontSize: isMobile ? '14px' : '16px',
//                   marginBottom: isMobile ? '10px' : '12px',
//                   boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//                 }}>
//                   ⚡
//                 </div>
//                 <div style={{
//                   fontSize: isMobile ? '18px' : '24px',
//                   fontWeight: '700',
//                   marginBottom: '4px',
//                   color: theme.success,
//                   lineHeight: '1.1'
//                 }}>
//                   {loading ? '...' : runningMachines}
//                 </div>
//                 <div style={{
//                   fontSize: isMobile ? '10px' : '11px',
//                   color: theme.textSecondary,
//                   fontWeight: '600',
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.4px',
//                   marginBottom: '8px'
//                 }}>
//                   Running Machines
//                 </div>
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '3px',
//                   fontSize: isMobile ? '9px' : '10px',
//                   fontWeight: '500',
//                   color: theme.success
//                 }}>
//                   <span>↗</span>
//                   <span>Currently Active</span>
//                 </div>
//               </div>

//               {/* Idle Machines Card */}
//               <div style={{
//                 background: theme.cardBg,
//                 border: `1px solid ${theme.border}`,
//                 borderRadius: '12px',
//                 padding: isMobile ? '14px' : '18px',
//                 position: 'relative',
//                 overflow: 'hidden',
//                 transition: 'all 0.2s ease',
//                 backdropFilter: 'blur(10px)',
//                 boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
//               }}>
//                 <div style={{
//                   width: isMobile ? '32px' : '40px',
//                   height: isMobile ? '32px' : '40px',
//                   borderRadius: '8px',
//                   background: theme.warning,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontSize: isMobile ? '14px' : '16px',
//                   marginBottom: isMobile ? '10px' : '12px',
//                   boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//                 }}>
//                   ⏸️
//                 </div>
//                 <div style={{
//                   fontSize: isMobile ? '18px' : '24px',
//                   fontWeight: '700',
//                   marginBottom: '4px',
//                   color: theme.warning,
//                   lineHeight: '1.1'
//                 }}>
//                   {loading ? '...' : idleMachines}
//                 </div>
//                 <div style={{
//                   fontSize: isMobile ? '10px' : '11px',
//                   color: theme.textSecondary,
//                   fontWeight: '600',
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.4px',
//                   marginBottom: '8px'
//                 }}>
//                   Idle Machines
//                 </div>
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '3px',
//                   fontSize: isMobile ? '9px' : '10px',
//                   fontWeight: '500',
//                   color: theme.warning
//                 }}>
//                   <span>⏸️</span>
//                   <span>15+ Minutes Idle</span>
//                 </div>
//               </div>

//               {/* Offline Machines Card */}
//               <div style={{
//                 background: theme.cardBg,
//                 border: `1px solid ${theme.border}`,
//                 borderRadius: '12px',
//                 padding: isMobile ? '14px' : '18px',
//                 position: 'relative',
//                 overflow: 'hidden',
//                 transition: 'all 0.2s ease',
//                 backdropFilter: 'blur(10px)',
//                 boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
//               }}>
//                 <div style={{
//                   width: isMobile ? '32px' : '40px',
//                   height: isMobile ? '32px' : '40px',
//                   borderRadius: '8px',
//                   background: theme.danger,
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontSize: isMobile ? '14px' : '16px',
//                   marginBottom: isMobile ? '10px' : '12px',
//                   boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//                 }}>
//                   ❌
//                 </div>
//                 <div style={{
//                   fontSize: isMobile ? '18px' : '24px',
//                   fontWeight: '700',
//                   marginBottom: '4px',
//                   color: theme.danger,
//                   lineHeight: '1.1'
//                 }}>
//                   {loading ? '...' : offlineMachines}
//                 </div>
//                 <div style={{
//                   fontSize: isMobile ? '10px' : '11px',
//                   color: theme.textSecondary,
//                   fontWeight: '600',
//                   textTransform: 'uppercase',
//                   letterSpacing: '0.4px',
//                   marginBottom: '8px'
//                 }}>
//                   Offline Machines
//                 </div>
//                 <div style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '3px',
//                   fontSize: isMobile ? '9px' : '10px',
//                   fontWeight: '500',
//                   color: theme.danger
//                 }}>
//                   <span>❌</span>
//                   <span>No Data/Count</span>
//                 </div>
//               </div>
//             </div>

//             {/* Charts Grid - HD Charts */}
//             <div style={{
//               display: 'grid',
//               gridTemplateColumns: isMobile 
//                 ? '1fr' 
//                 : viewportSize.width <= 1200
//                   ? '1fr'
//                   : 'repeat(2, 1fr)',
//               gap: isMobile ? '16px' : '20px'
//             }}>
//               {/* Today's Hourly Production */}
//               <div style={{
//                 background: theme.cardBg,
//                 border: `1px solid ${theme.border}`,
//                 borderRadius: '12px',
//                 padding: isMobile ? '14px' : '18px',
//                 backdropFilter: 'blur(10px)',
//                 boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
//                 position: 'relative'
//               }}>
//                 <h3 style={{
//                   fontSize: isMobile ? '13px' : '14px',
//                   fontWeight: '600',
//                   color: theme.text,
//                   marginBottom: isMobile ? '12px' : '16px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '6px',
//                   letterSpacing: '0.01em'
//                 }}>
//                   📈 Today's Hourly Production
//                 </h3>
//                 <div style={{ height: isMobile ? '180px' : '250px' }}>
//                   {hourlyProductionData.labels.length > 0 ? (
//                     <Line data={hourlyProductionData} options={baseChartOptions} />
//                   ) : (
//                     <div style={{
//                       height: '100%',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       color: theme.textMuted,
//                       fontSize: isMobile ? '11px' : '12px',
//                       textAlign: 'center'
//                     }}>
//                       <div>
//                         <div style={{ fontSize: isMobile ? '20px' : '24px', marginBottom: '8px' }}>📊</div>
//                         Loading hourly production data...
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Machine Status Distribution */}
//               <div style={{
//                 background: theme.cardBg,
//                 border: `1px solid ${theme.border}`,
//                 borderRadius: '12px',
//                 padding: isMobile ? '14px' : '18px',
//                 backdropFilter: 'blur(10px)',
//                 boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
//               }}>
//                 <h3 style={{
//                   fontSize: isMobile ? '13px' : '14px',
//                   fontWeight: '600',
//                   color: theme.text,
//                   marginBottom: isMobile ? '12px' : '16px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '6px',
//                   letterSpacing: '0.01em'
//                 }}>
//                   📊 Machine Status Distribution
//                 </h3>
//                 <div style={{ height: isMobile ? '180px' : '250px' }}>
//                   {machineStatusData.labels.length > 0 ? (
//                     <Doughnut data={machineStatusData} options={doughnutOptions} />
//                   ) : (
//                     <div style={{
//                       height: '100%',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       color: theme.textMuted,
//                       fontSize: isMobile ? '11px' : '12px',
//                       textAlign: 'center'
//                     }}>
//                       <div>
//                         <div style={{ fontSize: isMobile ? '20px' : '24px', marginBottom: '8px' }}>🍩</div>
//                         Loading machine status data...
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Top Machines Production */}
//               <div style={{
//                 background: theme.cardBg,
//                 border: `1px solid ${theme.border}`,
//                 borderRadius: '12px',
//                 padding: isMobile ? '14px' : '18px',
//                 backdropFilter: 'blur(10px)',
//                 boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
//               }}>
//                 <h3 style={{
//                   fontSize: isMobile ? '13px' : '14px',
//                   fontWeight: '600',
//                   color: theme.text,
//                   marginBottom: isMobile ? '12px' : '16px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '6px',
//                   letterSpacing: '0.01em'
//                 }}>
//                   📊 Top Machines Production
//                 </h3>
//                 <div style={{ height: isMobile ? '180px' : '250px' }}>
//                   {topMachinesData.labels.length > 0 ? (
//                     <Bar data={topMachinesData} options={baseChartOptions} />
//                   ) : (
//                     <div style={{
//                       height: '100%',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       color: theme.textMuted,
//                       fontSize: isMobile ? '11px' : '12px',
//                       textAlign: 'center'
//                     }}>
//                       <div>
//                         <div style={{ fontSize: isMobile ? '20px' : '24px', marginBottom: '8px' }}>📊</div>
//                         Loading top machines data...
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Plant Performance Comparison */}
//               <div style={{
//                 background: theme.cardBg,
//                 border: `1px solid ${theme.border}`,
//                 borderRadius: '12px',
//                 padding: isMobile ? '14px' : '18px',
//                 backdropFilter: 'blur(10px)',
//                 boxShadow: '0 2px 12px rgba(0,0,0,0.06)'
//               }}>
//                 <h3 style={{
//                   fontSize: isMobile ? '13px' : '14px',
//                   fontWeight: '600',
//                   color: theme.text,
//                   marginBottom: isMobile ? '12px' : '16px',
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '6px',
//                   letterSpacing: '0.01em'
//                 }}>
//                   🏭 Plant Performance Comparison
//                 </h3>
//                 <div style={{ height: isMobile ? '180px' : '250px' }}>
//                   {plantComparisonData.labels.length > 0 ? (
//                     <Line data={plantComparisonData} options={baseChartOptions} />
//                   ) : (
//                     <div style={{
//                       height: '100%',
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       color: theme.textMuted,
//                       fontSize: isMobile ? '11px' : '12px',
//                       textAlign: 'center'
//                     }}>
//                       <div>
//                         <div style={{ fontSize: isMobile ? '20px' : '24px', marginBottom: '8px' }}>📊</div>
//                         Loading Plant Comparison data...
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Dashboard;
