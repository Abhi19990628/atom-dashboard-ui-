// import React, { useState, useEffect, useRef, useCallback } from 'react';
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
// import { motion, AnimatePresence } from 'motion/react';
// import { 
//   Factory, 
//   TrendingUp,
//   Activity,
//   Gauge, 
//   Clock,
//   Calendar,
//   Sparkles,
//   RefreshCw,
//   Download,
//   Settings,
//   Radio,
//   Filter
// } from 'lucide-react';
// import Sidebar from './Sidebar';
// import { Button } from './ui/button';
// import { Card } from './ui/card';

// import { 
//   getDashboardData, 
//   getHourlyProductionData, 
//   getMachineProductionData, 
//   getProductionLineStatusData, 
//   getAvailableDates 
// } from '../services/apiService';

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

// const API_BASE = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

// // ✅ CUSTOM SEPARATOR
// const Separator = ({ orientation = "vertical", className = "" }) => {
//   return orientation === "vertical" ? (
//     <div className={`w-px bg-slate-700 ${className}`} />
//   ) : (
//     <div className={`h-px bg-slate-700 ${className}`} />
//   );
// };

// const Dashboard = ({ onLogout }) => {
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [isPageVisible, setIsPageVisible] = useState(false);
//   const [screenSize, setScreenSize] = useState({
//     isMobile: false,
//     isTablet: false,
//     isDesktop: true,
//     width: 0
//   });
  
//   // Dashboard data states
//   const [totalMachines, setTotalMachines] = useState(57);
//   const [runningMachines, setRunningMachines] = useState(41);
//   const [totalProduction, setTotalProduction] = useState(15420);
  
//   // Header states
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [isRefreshing, setIsRefreshing] = useState(false);
//   const [nextRefresh, setNextRefresh] = useState('');
  
//   // Filter states
//   const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
//   const [selectedShift, setSelectedShift] = useState('');
//   const [selectedPlant, setSelectedPlant] = useState('plant1_data');
//   const [selectedHour, setSelectedHour] = useState('');
//   const [selectedMachine, setSelectedMachine] = useState('');
//   const [availableDates, setAvailableDates] = useState([]);
//   const [availableHours, setAvailableHours] = useState([]);
//   const [availableMachines, setAvailableMachines] = useState([]);
//   const [availableShifts, setAvailableShifts] = useState([
//     { value: '', label: 'All Shifts' },
//     { value: 'morning', label: 'Morning (8:30AM - 8PM)' },
//     { value: 'night', label: 'Night (8:30PM - 8AM)' }
//   ]);
  
//   // Graph data states
//   const [hourlyProductionData, setHourlyProductionData] = useState({ labels: [], datasets: [] });
//   const [machineWiseData, setMachineWiseData] = useState({ labels: [], datasets: [] });
//   const [efficiencyData, setEfficiencyData] = useState({ labels: [], datasets: [] });

//   // Polling refs
//   const pollRef = useRef(null);
//   const hourlyPollRef = useRef(null);
//   const refreshTimerRef = useRef(null);

//   // 🔥 CHECK ROLE (WORKER OR ADMIN)
//   const userRole = localStorage.getItem('user_role');
//   const isWorker = userRole === 'QA_Hub' || userRole === 'Production_Hub' || userRole === 'Maintenance_Hub';

//   // Trigger entrance animation when component mounts
//   useEffect(() => {
//     setIsPageVisible(true);
//     return () => setIsPageVisible(false);
//   }, []);

//   // Detect screen size for responsive design
//   useEffect(() => {
//     const handleResize = () => {
//       const width = window.innerWidth;
//       setScreenSize({
//         isMobile: width < 768,
//         isTablet: width >= 768 && width < 1024,
//         isDesktop: width >= 1024,
//         width: width
//       });
//     };
    
//     handleResize();
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   // ✅ EVERY HOUR AUTO-REFRESH COUNTDOWN
//   const updateRefreshCountdown = useCallback(() => {
//     const now = new Date();
//     const nextHour = new Date(now.getTime());
//     nextHour.setMinutes(59, 59, 999);
    
//     const timeDiff = nextHour.getTime() - now.getTime();
//     const hours = Math.floor(timeDiff / (1000 * 60 * 60));
//     const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
//     const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
    
//     setNextRefresh(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
//   }, []);

//   useEffect(() => {
//     updateRefreshCountdown();
//     const interval = setInterval(updateRefreshCountdown, 1000);
    
//     return () => clearInterval(interval);
//   }, [updateRefreshCountdown]);

//   // ✅ REAL-TIME RUNNING MACHINES
//   const fetchRunningMachines = useCallback(async () => {
//     if (selectedPlant === 'plant1_data') {
//       setRunningMachines(41);
//       setTotalMachines(57);
//       console.log('✅ Live Data - Plant 1: 41/57');
//     } else {
//       setRunningMachines(17);
//       setTotalMachines(26);
//       console.log('✅ Live Data - Plant 2: 17/26');
//     }
//   }, [selectedPlant]);

//   // ✅ HOURLY DATA REFRESH
//   const fetchHourlyDashboardData = useCallback(async () => {
//     try {
//       console.log('🔄 Hourly Auto-Refresh - Fetching Dashboard Data');
      
//       const data = await getDashboardData({
//         date: selectedDate,
//         plant: selectedPlant,
//         shift: selectedShift,
//         hour: selectedHour,
//         machine: selectedMachine
//       });
      
//       if (data?.success && data.dashboard_data) {
//         const dashboardData = data.dashboard_data;
        
//         setTotalProduction(dashboardData.total_production || 0);
        
//         const currentRunning = selectedPlant === 'plant1_data' ? 41 : 17;
//         const currentTotal = selectedPlant === 'plant1_data' ? 57 : 26;
        
//         const idleCount = Math.floor((currentTotal - currentRunning) * 0.6);
//         const maintenanceCount = Math.floor((currentTotal - currentRunning) * 0.2);
//         const offlineCount = Math.max(0, currentTotal - currentRunning - idleCount - maintenanceCount);
        
//         setEfficiencyData({
//           labels: ['Running', 'Idle', 'Maintenance', 'Offline'],
//           datasets: [{
//             data: [currentRunning, idleCount, maintenanceCount, offlineCount],
//             backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6b7280'],
//             borderWidth: 0
//           }]
//         });
        
//         console.log('✅ Hourly Refresh Complete!');
//         return true;
//       }
//     } catch (error) {
//       console.error('❌ Hourly refresh error:', error);
//     }
//     return false;
//   }, [selectedDate, selectedPlant, selectedShift, selectedHour, selectedMachine]);

//   // ✅ START ALL POLLING INTERVALS
//   useEffect(() => {
//     fetchRunningMachines();
//     pollRef.current = setInterval(fetchRunningMachines, 2000);

//     const now = new Date();
//     const msUntilNextHour = ((60 - now.getMinutes()) * 60 * 1000) - (now.getSeconds() * 1000) - now.getMilliseconds();
    
//     const hourlyTimer = setTimeout(async () => {
//       await fetchHourlyDashboardData();
//       hourlyPollRef.current = setInterval(async () => {
//         await fetchHourlyDashboardData();
//       }, 60 * 60 * 1000);
//     }, msUntilNextHour);

//     const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);

//     return () => {
//       if (pollRef.current) clearInterval(pollRef.current);
//       if (hourlyPollRef.current) clearInterval(hourlyPollRef.current);
//       if (hourlyTimer) clearTimeout(hourlyTimer);
//       if (timeInterval) clearInterval(timeInterval);
//       if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);
//     };
//   }, [fetchRunningMachines, fetchHourlyDashboardData]);

//   // Update current time
//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(new Date()), 1000);
//     return () => clearInterval(timer);
//   }, []);

//   // Manual refresh handler with animation
//   const handleRefresh = async () => {
//     setIsRefreshing(true);
    
//     await Promise.all([
//       fetchRunningMachines(),
//       fetchHourlyDashboardData()
//     ]);
    
//     setTimeout(() => setIsRefreshing(false), 1500);
//   };

//   // Generate available hours
//   useEffect(() => {
//     const hours = Array.from({length: 24}, (_, i) => ({
//       value: i.toString().padStart(2, '0'),
//       label: `${i.toString().padStart(2, '0')}:00`
//     }));
//     setAvailableHours(hours);
//   }, []);

//   // Generate machines based on plant
//   useEffect(() => {
//     const machines = selectedPlant === 'plant1_data' 
//       ? Array.from({length: 57}, (_, i) => ({
//           value: (i + 1).toString(),
//           label: `Machine ${(i + 1).toString().padStart(2, '0')}`
//         }))
//       : Array.from({length: 26}, (_, i) => ({
//           value: (i + 1).toString(),
//           label: `Machine ${(i + 1).toString().padStart(2, '0')}`
//         }));
//     setAvailableMachines(machines);
//   }, [selectedPlant]);

//   // Generate fallback dates
//   useEffect(() => {
//     const fallbackDates = [];
//     for (let i = 0; i < 30; i++) {
//       const date = new Date();
//       date.setDate(date.getDate() - i);
//       fallbackDates.push(date.toISOString().split('T')[0]);
//     }
//     setAvailableDates(fallbackDates);
//   }, []);

//   // ✅ MOCK DATA GENERATORS
//   const generateMockHourlyData = useCallback(() => {
//     const hours = Array.from({length: 24}, (_, i) => i);
//     const baseProduction = selectedPlant === 'plant1_data' ? 800 : 750;
    
//     const productionValues = hours.map(hour => {
//       let production = baseProduction;
//       if (hour >= 8 && hour <= 16) production += Math.random() * 300 + 200;
//       else if (hour >= 16 && hour <= 23) production += Math.random() * 200 + 100;
//       else production += Math.random() * 100 + 50;
//       return Math.floor(production);
//     });
    
//     setHourlyProductionData({
//       labels: hours.map(h => `${h.toString().padStart(2, '0')}:00`),
//       datasets: [{
//         label: selectedMachine ? `Machine ${selectedMachine}` : `${selectedPlant === 'plant1_data' ? 'Plant 1' : 'Plant 2'}`,
//         data: productionValues,
//         borderColor: '#06b6d4',
//         backgroundColor: 'rgba(6, 182, 212, 0.1)',
//         fill: true,
//         tension: 0.4,
//         pointRadius: screenSize.isMobile ? 2 : 4,
//         pointHoverRadius: screenSize.isMobile ? 4 : 6
//       }]
//     });
//   }, [selectedPlant, selectedMachine, screenSize.isMobile]);

//   const generateMockMachineData = useCallback(() => {
//     const machineCount = selectedPlant === 'plant1_data' ? (screenSize.isMobile ? 8 : 15) : (screenSize.isMobile ? 6 : 12);
//     const machineNames = Array.from({length: machineCount}, (_, i) => `M${(i+1).toString().padStart(2, '0')}`);
//     const machineProduction = machineNames.map(() => Math.floor(Math.random() * 800 + 200));
    
//     setMachineWiseData({
//       labels: machineNames,
//       datasets: [{
//         label: 'Production Count',
//         data: machineProduction,
//         backgroundColor: machineProduction.map(value => {
//           if (value > 700) return '#10b981';
//           if (value > 400) return '#f59e0b';
//           if (value > 200) return '#f97316';
//           return '#ef4444';
//         }),
//         borderRadius: 6,
//         borderWidth: 2,
//         barPercentage: screenSize.isMobile ? 0.7 : 0.8,
//         categoryPercentage: screenSize.isMobile ? 0.8 : 0.9
//       }]
//     });
//   }, [selectedPlant, screenSize.isMobile]);

//   const generateEfficiencyDataFromReal = useCallback(() => {
//     const currentRunning = selectedPlant === 'plant1_data' ? 41 : 17;
//     const currentTotal = selectedPlant === 'plant1_data' ? 57 : 26;
    
//     const idleCount = Math.floor((currentTotal - currentRunning) * 0.6);
//     const maintenanceCount = Math.floor((currentTotal - currentRunning) * 0.2);
//     const offlineCount = Math.max(0, currentTotal - currentRunning - idleCount - maintenanceCount);
    
//     setEfficiencyData({
//       labels: ['Running', 'Idle', 'Maintenance', 'Offline'],
//       datasets: [{
//         data: [currentRunning, idleCount, maintenanceCount, offlineCount],
//         backgroundColor: ['#10b981', '#f59e0b', '#ef4444', '#6b7280'],
//         borderWidth: 0
//       }]
//     });
//   }, [selectedPlant]);

//   // ✅ MAIN DATA FETCH ON FILTER CHANGE
//   useEffect(() => {
//     const fetchDashboardData = async () => {
//       try {
//         console.log('🔄 Filter Change - Fetching data:', {selectedDate, selectedPlant, selectedShift});
//         setLoading(true);
        
//         if (selectedPlant === 'plant1_data') {
//           setRunningMachines(41);
//           setTotalMachines(57);
//         } else {
//           setRunningMachines(17);
//           setTotalMachines(26);
//         }

//         const data = await getDashboardData({
//           date: selectedDate,
//           plant: selectedPlant,
//           shift: selectedShift,
//           hour: selectedHour,
//           machine: selectedMachine
//         });
        
//         if (data?.success && data.dashboard_data) {
//           const dashboardData = data.dashboard_data;
          
//           setTotalProduction(dashboardData.total_production || 0);
          
//           if (dashboardData.hourly_production?.data) {
//             setHourlyProductionData({
//               labels: dashboardData.hourly_production.labels || Array(24).fill(''),
//               datasets: [{
//                 label: 'Real Production',
//                 data: dashboardData.hourly_production.data,
//                 borderColor: '#06b6d4',
//                 backgroundColor: 'rgba(6, 182, 212, 0.1)',
//                 fill: true,
//                 tension: 0.4,
//                 pointRadius: screenSize.isMobile ? 2 : 4
//               }]
//             });
//           } else {
//             generateMockHourlyData();
//           }
          
//           if (dashboardData.machine_production?.data) {
//             setMachineWiseData(dashboardData.machine_production);
//           } else {
//             generateMockMachineData();
//           }
          
//           generateEfficiencyDataFromReal();
//           console.log('✅ Filter data loaded!');
//         } else {
//           setTotalProduction(15420);
//           generateMockHourlyData();
//           generateMockMachineData();
//           generateEfficiencyDataFromReal();
//         }
//       } catch (error) {
//         console.error('❌ API Error - Using Mock:', error);
//         setTotalProduction(15420);
//         generateMockHourlyData();
//         generateMockMachineData();
//         generateEfficiencyDataFromReal();
//       } finally {
//         setLoading(false);
//       }
//     };
    
//     fetchDashboardData();
//   }, [selectedDate, selectedShift, selectedPlant, selectedHour, selectedMachine, generateMockHourlyData, generateMockMachineData, generateEfficiencyDataFromReal, screenSize.isMobile]);

//   // Responsive chart options
//   const getChartOptions = () => {
//     const baseOptions = {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         legend: {
//           position: screenSize.isMobile ? 'bottom' : 'top',
//           labels: {
//             color: '#94a3b8',
//             font: { size: screenSize.isMobile ? 10 : 12 },
//             padding: screenSize.isMobile ? 8 : 15,
//             usePointStyle: true,
//             boxWidth: screenSize.isMobile ? 8 : 10
//           }
//         },
//         tooltip: {
//           bodyFont: { size: screenSize.isMobile ? 11 : 12 },
//           titleFont: { size: screenSize.isMobile ? 11 : 12 }
//         }
//       },
//       scales: {
//         x: { 
//           ticks: { 
//             color: '#94a3b8', 
//             font: { size: screenSize.isMobile ? 8 : 11 },
//             maxRotation: screenSize.isMobile ? 45 : 0,
//             minRotation: screenSize.isMobile ? 45 : 0
//           }, 
//           grid: { color: 'rgba(255,255,255,0.08)' } 
//         },
//         y: { 
//           ticks: { 
//             color: '#94a3b8', 
//             font: { size: screenSize.isMobile ? 8 : 11 } 
//           }, 
//           grid: { color: 'rgba(255,255,255,0.08)' } 
//         }
//       }
//     };
    
//     return baseOptions;
//   };

//   const chartOptions = getChartOptions();

//   // Get responsive spacing
//   const getContainerPadding = () => {
//     if (screenSize.isMobile) return 'px-4 py-4';
//     if (screenSize.isTablet) return 'px-6 py-6';
//     return 'px-8 py-8';
//   };

//   const getHeaderMargin = () => {
//     if (screenSize.isMobile) return 'mb-4';
//     if (screenSize.isTablet) return 'mb-6';
//     return 'mb-8';
//   };

//   const getFilterGridCols = () => {
//     if (screenSize.isMobile) return 'grid-cols-1';
//     if (screenSize.isTablet) return 'grid-cols-2 lg:grid-cols-5';
//     return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-5';
//   };

//   const getMetricGridCols = () => {
//     if (screenSize.isMobile) return 'grid-cols-1';
//     if (screenSize.isTablet) return 'grid-cols-2 lg:grid-cols-3';
//     return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
//   };

//   const getChartGridCols = () => {
//     if (screenSize.isMobile) return 'grid-cols-1';
//     return 'grid lg:grid-cols-2';
//   };

//   const getChartHeight = () => {
//     if (screenSize.isMobile) return '250px';
//     if (screenSize.isTablet) return '280px';
//     return '300px';
//   };

//   const getTitleSize = () => {
//     if (screenSize.isMobile) return 'text-2xl';
//     if (screenSize.isTablet) return 'text-3xl';
//     return 'text-3xl md:text-4xl';
//   };

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 12,
//         duration: 0.5
//       }
//     }
//   };

//   const headerVariants = {
//     hidden: { opacity: 0, x: -50 },
//     visible: {
//       opacity: 1,
//       x: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 15,
//         duration: 0.6
//       }
//     }
//   };

//   const buttonVariants = {
//     hidden: { opacity: 0, scale: 0.8, x: 50 },
//     visible: {
//       opacity: 1,
//       scale: 1,
//       x: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 12,
//         duration: 0.5
//       }
//     },
//     hover: {
//       scale: 1.05,
//       transition: { duration: 0.2 }
//     },
//     tap: {
//       scale: 0.95,
//       transition: { duration: 0.1 }
//     }
//   };

//   const cardVariants = {
//     hidden: { opacity: 0, y: 30, scale: 0.95 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 80,
//         damping: 12,
//         duration: 0.5
//       }
//     },
//     hover: {
//       y: -5,
//       scale: 1.02,
//       transition: { duration: 0.2 }
//     }
//   };

//   const filterVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 12,
//         delay: 0.3
//       }
//     }
//   };

//   const metricCardVariants = {
//     hidden: { opacity: 0, y: 30, scale: 0.9 },
//     visible: (custom) => ({
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 100,
//         damping: 12,
//         delay: custom * 0.1
//       }
//     }),
//     hover: {
//       y: -8,
//       scale: 1.03,
//       transition: { duration: 0.2 }
//     }
//   };

//   const chartVariants = {
//     hidden: { opacity: 0, y: 40, scale: 0.98 },
//     visible: (custom) => ({
//       opacity: 1,
//       y: 0,
//       scale: 1,
//       transition: {
//         type: "spring",
//         stiffness: 80,
//         damping: 12,
//         delay: custom * 0.15
//       }
//     })
//   };

//   return (
//     <AnimatePresence mode="wait">
//       {isPageVisible && (
//         <motion.div
//           initial="hidden"
//           animate="visible"
//           exit="hidden"
//           variants={containerVariants}
//           className="min-h-screen bg-[#0f172a] flex relative overflow-hidden"
//         >
//           {/* Animated Background */}
//           <div className="absolute inset-0 pointer-events-none overflow-hidden">
//             {[...Array(screenSize.isMobile ? 5 : 15)].map((_, i) => (
//               <motion.div
//                 key={i}
//                 className="absolute rounded-full"
//                 style={{
//                   width: Math.random() * (screenSize.isMobile ? 100 : 200) + (screenSize.isMobile ? 25 : 50),
//                   height: Math.random() * (screenSize.isMobile ? 100 : 200) + (screenSize.isMobile ? 25 : 50),
//                   left: `${Math.random() * 100}%`,
//                   top: `${Math.random() * 100}%`,
//                   background: i % 2 === 0 
//                     ? 'radial-gradient(circle, rgba(6, 182, 212, 0.08) 0%, transparent 70%)'
//                     : 'radial-gradient(circle, rgba(251, 191, 36, 0.08) 0%, transparent 70%)',
//                 }}
//                 animate={{ y: [0, -30, 0], x: [0, 20, 0], scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
//                 transition={{ duration: Math.random() * 15 + 10, repeat: Infinity, ease: "easeInOut" }}
//               />
//             ))}
//           </div>

//           <Sidebar onLogout={onLogout} />

//           <div className="flex-1 overflow-auto relative z-10 mt-5">
            
//             {/* 🔥 BLUR OVERLAY FOR WORKERS (Only covers main content) 🔥 */}
//             {isWorker && (
//       <div
//   style={{
//     position: "fixed",
//     top: "24Px",
//     left: "50%",
//     transform: "translate(-50%)",
//     width: "min(520px, 90vw)",
//     zIndex: 99999,
//     background: "rgba(15, 23, 42, 0.92)",
//     backdropFilter: "blur(24px)",
//     border: "1px solid rgba(255,255,255,0.08)",
//     borderRadius: "24px",
//     padding: "32px",
//     boxShadow: "0 25px 80px rgba(0,0,0,0.35)",
//     textAlign: "center",
//   }}
// >
//   <div
//     style={{
//       width: 72,
//       height: 72,
//       margin: "0 auto 20px",
//       borderRadius: "18px",
//      background: "linear-gradient(135deg,#fffdf7,#f5f1e8)",
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       fontSize: 32,
//     }}
//   >
//     🔒
//   </div>

//   <h2
//     style={{
//       color: "#fff",
//       fontSize: 24,
//       fontWeight: 800,
//       marginBottom: 10,
//     }}
//   >
//     Access Restricted
//   </h2>

//   <p
//     style={{
//       color: "#94a3b8",
//       fontSize: 15,
//       lineHeight: 1.7,
//       marginBottom: 28,
//     }}
//   >
//     Analytics Hub is currently unavailable for your role.
//     Contact your administrator if you believe access is required.
//   </p>

//   <button
//     onClick={() => navigate(-1)}
//     style={{
//       border: "none",
//       borderRadius: "12px",
//       padding: "12px 20px",
//       background:
//         "linear-gradient(135deg,#3b82f6,#2563eb)",
//       color: "#fff",
//       fontWeight: 700,
//       cursor: "pointer",
//     }}
//   >
//     ← Return to Department Dashboard
//   </button>
// </div>    )}

//             {/* 🔥 MAIN CONTENT (Blurred if Worker) 🔥 */}
//             <div className={`max-w-[1600px] mx-auto ${getContainerPadding()} ${isWorker ? "blur-md pointer-events-none opacity-40 select-none" : ""}`}>
//               {/* HEADER */}
//               <motion.div variants={itemVariants} className={`flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 ${getHeaderMargin()}`}>
//                 <motion.div variants={headerVariants}>
//                   <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-3 md:gap-4 mb-2">
//                     <motion.div 
//                       whileHover={{ scale: 1.1, rotate: 5 }}
//                       transition={{ type: "spring", stiffness: 300 }}
//                       className={`${screenSize.isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-2xl bg-gradient-to-br from-cyan-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-cyan-500/30`}
//                     >
//                       <Sparkles className={`${screenSize.isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-white justify-center align-items-center`} />
//                     </motion.div>
//                     <div>
//                       <h1 className={`${getTitleSize()} font-bold bg-gradient-to-r from-cyan-400 via-white to-yellow-400 bg-clip-text text-transparent relative inline-block`}>
//                         AtomOne Analytics Hub
//                         <motion.div 
//                           className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-cyan-500 to-yellow-500 rounded-full" 
//                           initial={{ width: 0 }} 
//                           animate={{ width: '100%' }} 
//                           transition={{ delay: 0.5, duration: 0.8 }} 
//                         />
//                       </h1>
//                       <motion.p 
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         transition={{ delay: 0.6 }}
//                         className={`${screenSize.isMobile ? 'text-xs' : 'text-sm'} text-slate-400 mt-1`}
//                       >
//                         Next-Generation Industrial Intelligence Platform
//                       </motion.p>
//                     </div>
//                   </motion.div>
                  
//                   <motion.div 
//                     initial={{ opacity: 0 }} 
//                     animate={{ opacity: 1 }} 
//                     transition={{ delay: 0.7 }} 
//                     className="flex flex-wrap items-center gap-2 md:gap-3 text-slate-400 text-xs md:text-sm"
//                   >
//                     <motion.div 
//                       whileHover={{ scale: 1.05 }}
//                       className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 rounded-full bg-green-500/10 border border-green-500/30"
//                     >
//                       <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse" />
//                       <span className="text-green-400 font-semibold">Live</span>
//                     </motion.div>
//                     <Separator orientation="vertical" className="h-4 md:h-6" />
//                     <motion.div 
//                       whileHover={{ scale: 1.05 }}
//                       className="flex items-center gap-1 md:gap-2"
//                     >
//                       <Clock className="w-3 h-3 md:w-4 md:h-4" />
//                       <span className="font-mono text-cyan-400 text-xs md:text-sm">{currentTime.toLocaleTimeString()}</span>
//                     </motion.div>
//                     <Separator orientation="vertical" className="h-4 md:h-6" />
//                     <motion.div 
//                       whileHover={{ scale: 1.05 }}
//                       className="flex items-center gap-1 md:gap-2"
//                     >
//                       <Calendar className="w-3 h-3 md:w-4 md:h-4" />
//                       <span className="text-xs md:text-sm">{currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</span>
//                     </motion.div>
//                     <Separator orientation="vertical" className="h-4 md:h-6" />
//                     <motion.div 
//                       whileHover={{ scale: 1.05 }}
//                       className="flex items-center gap-1 md:gap-2"
//                     >
//                       <Radio className="w-3 h-3 md:w-4 md:h-4 text-cyan-400" />
//                       <span className="text-cyan-400 font-semibold text-xs md:text-sm">{selectedPlant === 'plant1_data' ? 'Plant 1' : 'Plant 2'}</span>
//                     </motion.div>
//                     <Separator orientation="vertical" className="h-4 md:h-6" />
//                     <motion.div 
//                       whileHover={{ scale: 1.05 }}
//                       className="flex items-center gap-1 md:gap-2 px-2 md:px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full"
//                     >
//                       <RefreshCw className="w-3 h-3 md:w-4 md:h-4 text-yellow-400 animate-spin-slow" />
//                       <span className="text-yellow-400 text-[10px] md:text-xs font-mono">Next: {nextRefresh}</span>
//                     </motion.div>
//                   </motion.div>
//                 </motion.div>

//                 <motion.div 
//                   variants={buttonVariants}
//                   className="flex flex-wrap items-center gap-2"
//                 >
//                   <motion.div
//                     whileHover="hover"
//                     whileTap="tap"
//                     variants={buttonVariants}
//                   >
//                     <Button onClick={handleRefresh} size={screenSize.isMobile ? "sm" : "sm"} className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white border-0 shadow-lg shadow-cyan-500/30">
//                       <RefreshCw className={`${screenSize.isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-1 md:mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
//                       <span className="text-xs md:text-sm">{isRefreshing ? '...' : 'Refresh'}</span>
//                     </Button>
//                   </motion.div>
//                   <motion.div
//                     whileHover="hover"
//                     whileTap="tap"
//                     variants={buttonVariants}
//                   >
//                     <Button size={screenSize.isMobile ? "sm" : "sm"} className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-slate-900 border-0 shadow-lg shadow-yellow-500/30">
//                       <Download className={`${screenSize.isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-1 md:mr-2`} />
//                       <span className="text-xs md:text-sm">{screenSize.isMobile ? '' : 'Export'}</span>
//                     </Button>
//                   </motion.div>
//                   <motion.div
//                     whileHover="hover"
//                     whileTap="tap"
//                     variants={buttonVariants}
//                   >
//                     <Button size={screenSize.isMobile ? "sm" : "sm"} className="bg-slate-800/80 hover:bg-slate-700/80 text-slate-300 border border-slate-700">
//                       <Settings className={`${screenSize.isMobile ? 'w-3 h-3' : 'w-4 h-4'} mr-1 md:mr-2`} />
//                       <span className="text-xs md:text-sm">{screenSize.isMobile ? '' : 'Settings'}</span>
//                     </Button>
//                   </motion.div>
//                 </motion.div>
//               </motion.div>

//               {/* FILTERS */}
//               <motion.div
//                 variants={filterVariants}
//                 className="mb-6 md:mb-8"
//               >
//                 <Card className="backdrop-blur-xl bg-gradient-to-br from-[#1e293b]/80 to-[#1e293b]/60 border-cyan-500/30 p-4 md:p-6">
//                   <div className="flex items-center gap-2 mb-3 md:mb-4">
//                     <motion.h3 
//                       initial={{ opacity: 0, x: -20 }}
//                       animate={{ opacity: 1, x: 0 }}
//                       transition={{ delay: 0.4 }}
//                       className="text-cyan-400 font-semibold text-sm md:text-base"
//                     >
//                       Data Filters
//                     </motion.h3>
//                     <motion.div 
//                       initial={{ opacity: 0, scale: 0 }}
//                       animate={{ opacity: 1, scale: 1 }}
//                       transition={{ delay: 0.5, type: "spring" }}
//                       className="ml-auto px-2 md:px-3 py-0.5 md:py-1 bg-cyan-500/20 text-cyan-300 text-[10px] md:text-xs rounded-full border border-cyan-500/30"
//                     >
//                       {loading ? 'Loading...' : 'Live + Auto'}
//                     </motion.div>
//                   </div>
//                   <div className={`grid ${getFilterGridCols()} gap-3 md:gap-4`}>
//                     {['Plant', 'Date', 'Shift', 'Hour', 'Machine'].map((label, idx) => (
//                       <motion.div
//                         key={label}
//                         initial={{ opacity: 0, y: 20 }}
//                         animate={{ opacity: 1, y: 0 }}
//                         transition={{ delay: 0.6 + idx * 0.05 }}
//                       >
//                         <label className="text-slate-300 text-xs md:text-sm block mb-1 md:mb-2">{label}</label>
//                         <select 
//                           value={label === 'Plant' ? selectedPlant : 
//                                  label === 'Date' ? selectedDate :
//                                  label === 'Shift' ? selectedShift :
//                                  label === 'Hour' ? selectedHour : selectedMachine}
//                           onChange={(e) => {
//                             if (label === 'Plant') setSelectedPlant(e.target.value);
//                             else if (label === 'Date') setSelectedDate(e.target.value);
//                             else if (label === 'Shift') setSelectedShift(e.target.value);
//                             else if (label === 'Hour') setSelectedHour(e.target.value);
//                             else setSelectedMachine(e.target.value);
//                           }}
//                           className="w-full bg-[#0f172a]/50 border border-slate-700 rounded-lg px-3 md:px-4 py-2 md:py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"
//                         >
//                           {label === 'Plant' && (
//                             <>
//                               <option value="plant1_data">Plant 1 (57 Machines)</option>
//                               <option value="plant2_data">Plant 2 (26 Machines)</option>
//                             </>
//                           )}
//                           {label === 'Date' && availableDates.slice(0, 30).map(date => (
//                             <option key={date} value={date}>
//                               {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
//                             </option>
//                           ))}
//                           {label === 'Shift' && availableShifts.map(shift => (
//                             <option key={shift.value} value={shift.value}>{shift.label}</option>
//                           ))}
//                           {label === 'Hour' && (
//                             <>
//                               <option value="">All Hours</option>
//                               {availableHours.slice(0, 24).map(hour => (
//                                 <option key={hour.value} value={hour.value}>{hour.label}</option>
//                               ))}
//                             </>
//                           )}
//                           {label === 'Machine' && (
//                             <>
//                               <option value="">All Machines</option>
//                               {availableMachines.slice(0, screenSize.isMobile ? 10 : 20).map(machine => (
//                                 <option key={machine.value} value={machine.value}>{machine.label}</option>
//                               ))}
//                             </>
//                           )}
//                         </select>
//                       </motion.div>
//                     ))}
//                   </div>
//                 </Card>
//               </motion.div>

//               {/* KEY METRICS */}
//               <div className={`grid ${getMetricGridCols()} gap-4 md:gap-6 mb-6 md:mb-8`}>
//                 <motion.div
//                   custom={0}
//                   variants={metricCardVariants}
//                   whileHover="hover"
//                 >
//                   <Card className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-[#1e293b]/60 border-cyan-500/30 p-4 md:p-6 hover:border-cyan-500/50 transition-all">
//                     <div className="flex items-start justify-between mb-3 md:mb-4">
//                       <div>
//                         <p className="text-slate-400 text-xs md:text-sm mb-1">Total Machines</p>
//                         <motion.span 
//                           className="text-2xl md:text-3xl font-bold text-cyan-400"
//                           initial={{ opacity: 0, scale: 0.5 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ delay: 0.8, type: "spring" }}
//                         >
//                           {totalMachines}
//                         </motion.span>
//                       </div>
//                       <motion.div 
//                         whileHover={{ scale: 1.1, rotate: 5 }}
//                         className={`${screenSize.isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-xl bg-cyan-500/20 flex items-center justify-center relative`}
//                       >
//                         <div className="absolute inset-0 bg-cyan-500 rounded-xl blur-md opacity-30" />
//                         <Factory className={`${screenSize.isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-cyan-400 relative z-10`} />
//                       </motion.div>
//                     </div>
//                     <p className="text-slate-500 text-xs md:text-sm">Manufacturing Units</p>
//                   </Card>
//                 </motion.div>

//                 <motion.div
//                   custom={1}
//                   variants={metricCardVariants}
//                   whileHover="hover"
//                 >
//                   <Card className="backdrop-blur-xl bg-gradient-to-br from-green-500/10 to-[#1e293b]/60 border-green-500/30 p-4 md:p-6 hover:border-green-500/50 transition-all">
//                     <div className="flex items-start justify-between mb-3 md:mb-4">
//                       <div>
//                         <p className="text-slate-400 text-xs md:text-sm mb-1 flex items-center gap-1 md:gap-2">
//                           Running Machines
//                           <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-green-500 rounded-full animate-pulse"></span>
//                         </p>
//                         <motion.span 
//                           className="text-2xl md:text-3xl font-bold text-green-400"
//                           key={runningMachines}
//                           initial={{ opacity: 0, scale: 0.5 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ delay: 0.9, type: "spring" }}
//                         >
//                           {runningMachines}
//                         </motion.span>
//                       </div>
//                       <motion.div 
//                         whileHover={{ scale: 1.1, rotate: -5 }}
//                         className={`${screenSize.isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-xl bg-green-500/20 flex items-center justify-center relative`}
//                       >
//                         <div className="absolute inset-0 bg-green-500 rounded-xl blur-md opacity-30" />
//                         <Activity className={`${screenSize.isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-green-400 relative z-10`} />
//                       </motion.div>
//                     </div>
//                     <div className="h-1.5 md:h-2 bg-[#0f172a]/50 rounded-full overflow-hidden">
//                       <motion.div 
//                         className="h-full bg-gradient-to-r from-green-500 to-green-400" 
//                         initial={{ width: 0 }} 
//                         animate={{ width: `${Math.max(0, (runningMachines / Math.max(1, totalMachines)) * 100)}%` }} 
//                         transition={{ duration: 0.8, delay: 1 }}
//                       />
//                     </div>
//                   </Card>
//                 </motion.div>

//                 <motion.div
//                   custom={2}
//                   variants={metricCardVariants}
//                   whileHover="hover"
//                 >
//                   <Card className="backdrop-blur-xl bg-gradient-to-br from-cyan-500/10 to-[#1e293b]/60 border-cyan-500/30 p-4 md:p-6 hover:border-cyan-500/50 transition-all">
//                     <div className="flex items-start justify-between mb-3 md:mb-4">
//                       <div>
//                         <p className="text-slate-400 text-xs md:text-sm mb-1">Production</p>
//                         <motion.span 
//                           className="text-2xl md:text-3xl font-bold text-cyan-400"
//                           initial={{ opacity: 0, scale: 0.5 }}
//                           animate={{ opacity: 1, scale: 1 }}
//                           transition={{ delay: 1, type: "spring" }}
//                         >
//                           {totalProduction.toLocaleString()}
//                         </motion.span>
//                       </div>
//                       <motion.div 
//                         whileHover={{ scale: 1.1 }}
//                         className={`${screenSize.isMobile ? 'w-10 h-10' : 'w-12 h-12'} rounded-xl bg-cyan-500/20 flex items-center justify-center relative`}
//                       >
//                         <div className="absolute inset-0 bg-cyan-500 rounded-xl blur-md opacity-30" />
//                         <TrendingUp className={`${screenSize.isMobile ? 'w-5 h-5' : 'w-6 h-6'} text-cyan-400 relative z-10`} />
//                       </motion.div>
//                     </div>
//                     <p className="text-slate-500 text-xs md:text-sm">Units Produced</p>
//                   </Card>
//                 </motion.div>
//               </div>

//               {/* CHARTS */}
//               <div className={`grid ${getChartGridCols()} gap-4 md:gap-6`}>
//                 <motion.div
//                   custom={0}
//                   variants={chartVariants}
//                   whileHover={{ y: -5, transition: { duration: 0.2 } }}
//                 >
//                   <Card className="backdrop-blur-xl bg-gradient-to-br from-[#1e293b]/80 to-[#1e293b]/60 border-cyan-500/30 p-4 md:p-6">
//                     <h3 className="text-cyan-400 mb-3 md:mb-6 font-semibold flex items-center gap-2 text-sm md:text-base">
//                       <span>📈</span>
//                       Hourly Production
//                     </h3>
//                     <div style={{ height: getChartHeight() }}>
//                       {hourlyProductionData.labels.length > 0 ? (
//                         <Line data={hourlyProductionData} options={chartOptions} />
//                       ) : (
//                         <div className="flex items-center justify-center h-full text-slate-500 text-sm">Loading chart data...</div>
//                       )}
//                     </div>
//                   </Card>
//                 </motion.div>

//                 <motion.div
//                   custom={1}
//                   variants={chartVariants}
//                   whileHover={{ y: -5, transition: { duration: 0.2 } }}
//                 >
//                   <Card className="backdrop-blur-xl bg-gradient-to-br from-[#1e293b]/80 to-[#1e293b]/60 border-yellow-500/30 p-4 md:p-6">
//                     <h3 className="text-yellow-400 mb-3 md:mb-6 font-semibold flex items-center gap-2 text-sm md:text-base">
//                       <span>📊</span>
//                       Machine Status
//                     </h3>
//                     <div style={{ height: getChartHeight() }}>
//                       {efficiencyData.labels?.length > 0 ? (
//                         <Doughnut 
//                           data={efficiencyData} 
//                           options={{ 
//                             ...chartOptions, 
//                             plugins: { 
//                               ...chartOptions.plugins, 
//                               legend: { ...chartOptions.plugins.legend, position: 'bottom' } 
//                             } 
//                           }} 
//                         />
//                       ) : (
//                         <div className="flex items-center justify-center h-full text-slate-500 text-sm">Loading chart data...</div>
//                       )}
//                     </div>
//                   </Card>
//                 </motion.div>

//                 <motion.div
//                   custom={2}
//                   variants={chartVariants}
//                   whileHover={{ y: -5, transition: { duration: 0.2 } }}
//                   className="lg:col-span-2"
//                 >
//                   <Card className="backdrop-blur-xl bg-gradient-to-br from-[#1e293b]/80 to-[#1e293b]/60 border-cyan-500/30 p-4 md:p-6">
//                     <h3 className="text-cyan-400 mb-3 md:mb-6 font-semibold flex items-center gap-2 text-sm md:text-base">
//                       <span>📊</span>
//                       Machine-wise Production
//                     </h3>
//                     <div style={{ height: getChartHeight() }}>
//                       {machineWiseData.labels.length > 0 ? (
//                         <Bar data={machineWiseData} options={chartOptions} />
//                       ) : (
//                         <div className="flex items-center justify-center h-full text-slate-500 text-sm">Loading chart data...</div>
//                       )}
//                     </div>
//                   </Card>
//                 </motion.div>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Dashboard;
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
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
import { motion, AnimatePresence } from 'motion/react';
import { 
  Factory, 
  TrendingUp,
  Activity,
  Clock,
  Calendar,
  Sparkles,
  RefreshCw,
  Download,
  Settings,
  Radio,
  Filter
} from 'lucide-react';
import Sidebar from './Sidebar';
import { Button } from './ui/button';
import { Card } from './ui/card';

import { 
  getDashboardData,
   getPlant1Live,
  getPlant2Live,
} from '../services/apiService';
import { useUser } from "../../src/context/UserContext";

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

const THEME_VARS = `
  /* LIGHT — premium white + blue only */
  [data-theme="light"] {
    --bg: #f8fafc;
    --bg-soft: #f1f5f9;
    --surface: #ffffff;
    --text: #0f172a;
    --text-soft: #475569;
    --text-muted: #94a3b8;
    --accent: #2563eb;
    --accent-strong: #1d4ed8;
    --accent-tint: rgba(37, 99, 235, 0.08);
    --border: rgba(15, 23, 42, 0.08);
    --border-strong: rgba(15, 23, 42, 0.15);
    --shadow-color: rgba(30, 64, 175, 0.05);
    --btn-text: #ffffff;
  }

  /* DARK — original AtomOne palette, untouched */
  [data-theme="dark"] {
    --bg: #0f172a;
    --bg-soft: #1e293b;
    --surface: #1e293b;
    --text: #f1f5f9;
    --text-soft: #94a3b8;
    --text-muted: #64748b;
    --accent: #06b6d4;
    --accent-strong: #fbbf24;
    --accent-tint: rgba(6, 182, 212, 0.1);
    --border: rgba(255, 255, 255, 0.1);
    --border-strong: rgba(255, 255, 255, 0.2);
    --shadow-color: rgba(0, 0, 0, 0.4);
    --btn-text: #0f172a;
  }
`;

const Separator = ({ orientation = "vertical", className = "" }) => {
  return orientation === "vertical" ? (
    <div className={`w-px bg-[var(--border-strong)] ${className}`} />
  ) : (
    <div className={`h-px bg-[var(--border-strong)] ${className}`} />
  );
};

const Dashboard = ({ onLogout }) => {
  const navigate = useNavigate();
  
  const [theme] = useState(() => {
    if (typeof window === "undefined") return "light";
    return window.localStorage.getItem("atomone-theme") || "light";
  });

  // 🔥 FIX: Memoized colors to stop the 1-second clock re-render loop
  // Custom palettes for charts so Light mode stays Blue/White and Dark stays original
  const chartColors = useMemo(() => {
    return theme === 'light' ? {
      accent: '#2563eb', // Pure Blue
      accentTint: 'rgba(37, 99, 235, 0.15)',
      text: '#64748b',
      grid: 'rgba(15, 23, 42, 0.06)',
      running: '#2563eb',     // Blue
      idle: '#60a5fa',        // Light Blue
      maintenance: '#94a3b8', // Slate/Grey
      offline: '#e2e8f0',     // Light Grey
      barShades: ['#1e3a8a', '#1d4ed8', '#2563eb', '#3b82f6', '#60a5fa', '#93c5fd'] // Pure blue variations
    } : {
      accent: '#06b6d4',
      accentTint: 'rgba(6, 182, 212, 0.15)',
      text: '#94a3b8',
      grid: 'rgba(255, 255, 255, 0.08)',
      running: '#10b981',     // Original Green
      idle: '#fbbf24',        // Original Gold
      maintenance: '#ef4444', // Original Red
      offline: '#475569',     // Original Grey
      barShades: ['#10b981', '#fbbf24', '#06b6d4', '#ef4444', '#a78bfa', '#f97316'] // Original mix
    };
  }, [theme]);

  const [loading, setLoading] = useState(true);
  const [isPageVisible, setIsPageVisible] = useState(false);
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    width: 0
  });
  
  const [totalMachines, setTotalMachines] = useState(57);
  const [runningMachines, setRunningMachines] = useState(41);
  const [totalProduction, setTotalProduction] = useState(15420);
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedShift, setSelectedShift] = useState('');
  const [selectedPlant, setSelectedPlant] = useState('plant1_data');
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMachine, setSelectedMachine] = useState('');
  
  const [availableDates, setAvailableDates] = useState([]);
  const [availableHours, setAvailableHours] = useState([]);
  const [availableMachines, setAvailableMachines] = useState([]);
  const [availableShifts] = useState([
    { value: '', label: 'All Shifts' },
    { value: 'morning', label: 'Morning (8:30AM - 8PM)' },
    { value: 'night', label: 'Night (8:30PM - 8AM)' }
  ]);
  
  const [hourlyProductionData, setHourlyProductionData] = useState({ labels: [], datasets: [] });
  const [machineWiseData, setMachineWiseData] = useState({ labels: [], datasets: [] });
  const [efficiencyData, setEfficiencyData] = useState({ labels: [], datasets: [] });

  const pollRef = useRef(null);

  const userRole = localStorage.getItem('user_role');
  const isWorker = userRole === 'QA_Hub' || userRole === 'Production_Hub' || userRole === 'Maintenance_Hub';

  const generateMachineStatusData = (liveData) => {
    console.log("Machine Status Input:", liveData);
  const running = liveData.producing_count;
  const idle = liveData.on_count - liveData.producing_count;
  const off = liveData.total_machines - liveData.on_count;
  const problem = liveData.problem_count;

  setEfficiencyData({
    labels: ["Running", "Idle", "Off", "Problem"],
    datasets: [
      {
        label: "Machine Status",
        data: [running, idle, off, problem],
        backgroundColor: [
          chartColors.running,
          chartColors.idle,
          chartColors.offline,
          chartColors.maintenance,
        ],
        borderWidth: 1,
      },
    ],
  });
};

  useEffect(() => {
    setIsPageVisible(true);
    return () => setIsPageVisible(false);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width: width
      });
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Clock tick (Now safely decoupled from graph rendering thanks to useMemo)
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchRunningMachines = useCallback(async () => {
    if (selectedPlant === 'plant1_data') {
      setRunningMachines(41);
      setTotalMachines(57);
    } else {
      setRunningMachines(17);
      setTotalMachines(46);
    }
  }, [selectedPlant]);

  useEffect(() => {
    const hours = Array.from({length: 24}, (_, i) => ({
      value: i.toString().padStart(2, '0'),
      label: `${i.toString().padStart(2, '0')}:00`
    }));
    setAvailableHours(hours);
  }, []);

  useEffect(() => {
    const machines = selectedPlant === 'plant1_data' 
      ? Array.from({length: 57}, (_, i) => ({ value: (i + 1).toString(), label: `Machine ${(i + 1).toString().padStart(2, '0')}` }))
      : Array.from({length: 46}, (_, i) => ({ value: (i + 1).toString(), label: `Machine ${(i + 1).toString().padStart(2, '0')}` }));
    setAvailableMachines(machines);
  }, [selectedPlant]);

  useEffect(() => {
    const fallbackDates = [];
    for (let i = 0; i < 30; i++) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      fallbackDates.push(date.toISOString().split('T')[0]);
    }
    setAvailableDates(fallbackDates);
  }, []);

  const generateMockHourlyData = useCallback(() => {
    const hours = Array.from({length: 24}, (_, i) => i);
    const baseProduction = selectedPlant === 'plant1_data' ? 800 : 750;
    
    const productionValues = hours.map(hour => {
      let production = baseProduction;
      if (hour >= 8 && hour <= 16) production += Math.random() * 300 + 200;
      else if (hour >= 16 && hour <= 23) production += Math.random() * 200 + 100;
      else production += Math.random() * 100 + 50;
      return Math.floor(production);
    });
    
    setHourlyProductionData({
      labels: hours.map(h => `${h.toString().padStart(2, '0')}:00`),
      datasets: [{
        label: selectedMachine ? `Machine ${selectedMachine}` : `${selectedPlant === 'plant1_data' ? 'Plant 1' : 'Plant 2'}`,
        data: productionValues,
        borderColor: chartColors.accent,
        backgroundColor: chartColors.accentTint,
        fill: true,
        tension: 0.4,
        pointRadius: screenSize.isMobile ? 2 : 4,
        pointHoverRadius: screenSize.isMobile ? 4 : 6
      }]
    });
  }, [selectedPlant, selectedMachine, screenSize.isMobile, chartColors]);

  const generateMockMachineData = useCallback(() => {
    const machineCount = selectedPlant === 'plant1_data' ? (screenSize.isMobile ? 8 : 15) : (screenSize.isMobile ? 6 : 12);
    const machineNames = Array.from({length: machineCount}, (_, i) => `M${(i+1).toString().padStart(2, '0')}`);
    const machineProduction = machineNames.map(() => Math.floor(Math.random() * 800 + 200));
    
    setMachineWiseData({
      labels: machineNames,
      datasets: [{
        label: 'Production Count',
        data: machineProduction,
        backgroundColor: machineProduction.map((_, index) => {
          return chartColors.barShades[index % chartColors.barShades.length];
        }),
        borderRadius: 4,
        borderWidth: 0,
        barPercentage: screenSize.isMobile ? 0.7 : 0.8,
        categoryPercentage: screenSize.isMobile ? 0.8 : 0.9
      }]
    });
  }, [selectedPlant, screenSize.isMobile, chartColors]);

  const generateEfficiencyDataFromReal = useCallback(() => {
    const currentRunning = selectedPlant === 'plant1_data' ? 41 : 17;
    const currentTotal = selectedPlant === 'plant1_data' ? 57 : 26;
    
    const idleCount = Math.floor((currentTotal - currentRunning) * 0.6);
    const maintenanceCount = Math.floor((currentTotal - currentRunning) * 0.2);
    const offlineCount = Math.max(0, currentTotal - currentRunning - idleCount - maintenanceCount);
    
    setEfficiencyData({
      labels: ['Running', 'Idle', 'Maintenance', 'Offline'],
      datasets: [{
        data: [currentRunning, idleCount, maintenanceCount, offlineCount],
        backgroundColor: [chartColors.running, chartColors.idle, chartColors.maintenance, chartColors.offline],
        borderWidth: 0
      }]
    });
  }, [selectedPlant, chartColors]);

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true);
      // if (selectedPlant === 'plant1_data') {
      //   setRunningMachines(41);
      //   setTotalMachines(57);
      // } else {
      //   setRunningMachines(17);
      //   setTotalMachines(26);
      // }
      const liveData =
  selectedPlant === "plant1_data"
    ? await getPlant1Live()
    : await getPlant2Live();
    console.log("Live Data:", liveData);

if (liveData?.success) {
  setRunningMachines(liveData.on_count);
  setTotalMachines(liveData.total_machines);

  generateMachineStatusData(liveData);
}

      const data = await getDashboardData({
        date: selectedDate,
        plant: selectedPlant,
        shift: selectedShift,
        hour: selectedHour,
        machine: selectedMachine
      });
      
      if (data?.success && data.dashboard_data) {
        const dashboardData = data.dashboard_data;
        console.log(dashboardData);
         console.log(dashboardData.hourly_production);
        setTotalProduction(dashboardData.total_production || 0);
        
        if (dashboardData.hourly_production?.data) {
          setHourlyProductionData({
            labels: dashboardData.hourly_production.labels || Array(24).fill(''),
            datasets: [{
              label: 'Real Production',
              data: dashboardData.hourly_production.data,
              borderColor: chartColors.accent,
              backgroundColor: chartColors.accentTint,
              fill: true,
              tension: 0.4,
              pointRadius: screenSize.isMobile ? 2 : 4
            }]
          });
        } else {
          generateMockHourlyData();
        }
        
        if (dashboardData.machine_production?.data) {
          setMachineWiseData(dashboardData.machine_production);
        } else {
          generateMockMachineData();
        }
        
        // generateEfficiencyDataFromReal();
      } else {
        setTotalProduction(15420);
        generateMockHourlyData();
        generateMockMachineData();
        // generateEfficiencyDataFromReal();
      }
    } catch (error) {
      setTotalProduction(15420);
      generateMockHourlyData();
      generateMockMachineData();
     setEfficiencyData({
  labels: [],
  datasets: [],
});
    } finally {
      setLoading(false);
    }
  }, [selectedDate, selectedShift, selectedPlant, selectedHour, selectedMachine, generateMockHourlyData, generateMockMachineData, generateEfficiencyDataFromReal, chartColors]);

  // Initial fetch on filter change
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchRunningMachines(), fetchDashboardData()]);
    setTimeout(() => setIsRefreshing(false), 800);
  };

  const getChartOptions = () => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: screenSize.isMobile ? 'bottom' : 'top',
          labels: {
            color: chartColors.text,
            font: { size: screenSize.isMobile ? 10 : 12, family: 'Inter, sans-serif' },
            padding: screenSize.isMobile ? 8 : 15,
            usePointStyle: true,
            boxWidth: screenSize.isMobile ? 8 : 10
          }
        },
        tooltip: {
          backgroundColor: 'rgba(15, 23, 42, 0.9)',
          titleColor: '#ffffff',
          bodyColor: '#e2e8f0',
          borderColor: 'rgba(255,255,255,0.1)',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8,
          bodyFont: { size: screenSize.isMobile ? 11 : 12 },
          titleFont: { size: screenSize.isMobile ? 11 : 12, weight: 'bold' }
        }
      },
      scales: {
        x: { 
          ticks: { 
            color: chartColors.text, 
            font: { size: screenSize.isMobile ? 9 : 11 },
            maxRotation: screenSize.isMobile ? 45 : 0,
            minRotation: screenSize.isMobile ? 45 : 0
          }, 
          grid: { color: chartColors.grid, drawBorder: false } 
        },
        y: { 
          ticks: { 
            color: chartColors.text, 
            font: { size: screenSize.isMobile ? 9 : 11 } 
          }, 
          grid: { color: chartColors.grid, drawBorder: false } 
        }
      }
    };
  };

  const chartOptions = getChartOptions();

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } } };
  const itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } } };
  const metricCardVariants = { hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: (custom) => ({ opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 100, damping: 12, delay: custom * 0.1 } }), hover: { y: -5, transition: { duration: 0.2 } } };

  return (
    <AnimatePresence mode="wait">
      {isPageVisible && (
        <motion.div
          data-theme={theme}
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={containerVariants}
          className="min-h-screen bg-[var(--bg)] flex relative overflow-hidden transition-colors duration-300 font-sans text-[var(--text)]"
        >
          <style>{THEME_VARS}</style>

          <Sidebar onLogout={onLogout} />

          {/* 🔥 FIX: overflow-x-hidden ensures the content NEVER pushes into or breaks the sidebar */}
          <div className="flex-1 overflow-x-hidden overflow-y-auto scroll-smooth relative z-10 custom-scrollbar">
            
            {/* WORKER BLUR OVERLAY */}
            {isWorker && (
              <div style={{ position: "fixed", top: "24px", left: "50%", transform: "translate(-50%)", width: "min(520px, 90vw)", zIndex: 99999, background: "var(--surface)", backdropFilter: "blur(24px)", border: "1px solid var(--border)", borderRadius: "24px", padding: "32px", boxShadow: "0 25px 80px var(--shadow-color)", textAlign: "center" }}>
                <div style={{ width: 72, height: 72, margin: "0 auto 20px", borderRadius: "18px", background: "var(--bg-soft)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32 }}>🔒</div>
                <h2 style={{ color: "var(--text)", fontSize: 24, fontWeight: 800, marginBottom: 10 }}>Access Restricted</h2>
                <p style={{ color: "var(--text-soft)", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>Analytics Hub is currently unavailable for your role. Contact your administrator if you believe access is required.</p>
                <button onClick={() => navigate(-1)} style={{ border: "none", borderRadius: "12px", padding: "12px 20px", background: "var(--accent)", color: "#fff", fontWeight: 700, cursor: "pointer" }}>← Return to Department Dashboard</button>
              </div>    
            )}

            {/* MAIN CONTENT AREA - Capped at max-w-[1600px] for perfect layout containment */}
            <div className={`w-full max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8 ${isWorker ? "blur-md pointer-events-none opacity-40 select-none" : ""}`}>
              
              {/* 🔥 FIX: Restructured Header matching screenshot style exactly */}
              <motion.div variants={itemVariants} className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 mb-8 lg:mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[var(--accent)] flex items-center justify-center shadow-md">
                    <Sparkles className="w-6 h-6 md:w-7 md:h-7 text-white" />
                  </div>
                  <div>
                    <h1 className={`$ font-bold bg-gradient-to-r from-[var(--accent)] via-[var(--text)] to-[var(--accent-strong)] bg-clip-text text-transparent relative inline-block`}>
                          AtomOne Analytics Hub
                    </h1>
                    <p className="text-sm md:text-base text-[var(--text-soft)] font-medium mt-1">
                      Next-Generation Industrial Intelligence Platform
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-3 bg-[var(--surface)] border border-[var(--border-strong)] px-4 py-2.5 rounded-xl shadow-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-[var(--success)] rounded-full animate-pulse" />
                      <span className="text-[var(--text)] text-sm font-semibold">Live</span>
                    </div>
                    <Separator className="h-5" />
                    <div className="flex items-center gap-2 text-[var(--text-soft)] text-sm font-medium">
                      <Clock className="w-4 h-4 text-[var(--accent)]" />
                      {currentTime.toLocaleTimeString()}
                    </div>
                    <Separator className="h-5" />
                    <div className="flex items-center gap-2 text-[var(--text-soft)] text-sm font-medium">
                      <Calendar className="w-4 h-4 text-[var(--accent)]" />
                      {currentTime.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                    </div>
                  </div>
                  
                  <Button onClick={handleRefresh} className="bg-[var(--accent)] hover:bg-[var(--accent-strong)] text-white shadow-md rounded-xl h-11 px-6 transition-all font-semibold">
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                    Refresh
                  </Button>
                  <Button className="bg-[var(--surface)] hover:bg-[var(--bg-soft)] text-[var(--text)] border border-[var(--border-strong)] shadow-sm rounded-xl h-11 px-6 mb-2 transition-all font-semibold">
                    <Download className="w-4 h-4 mr-2 " /> Export
                  </Button>
                </div>
              </motion.div>

              {/* FILTERS */}
              <motion.div variants={itemVariants} className="mb-8">
                <Card className="bg-[var(--surface)] border border-[var(--border-strong)] p-5 md:p-6 shadow-sm rounded-2xl">
                  <div className="flex items-center justify-between mb-5">
                    <h3 className="text-[var(--text)] font-bold text-base md:text-lg flex items-center gap-2">
                      <Filter className="w-5 h-5 text-[var(--accent)]" /> Global Filters
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                    {['Plant', 'Date', 'Shift', 'Hour', 'Machine'].map((label) => (
                      <div key={label}>
                        <label className="text-[var(--text-soft)] text-sm font-semibold block mb-2">{label}</label>
                        <select 
                          value={label === 'Plant' ? selectedPlant : label === 'Date' ? selectedDate : label === 'Shift' ? selectedShift : label === 'Hour' ? selectedHour : selectedMachine}
                          onChange={(e) => {
                            if (label === 'Plant') setSelectedPlant(e.target.value);
                            else if (label === 'Date') setSelectedDate(e.target.value);
                            else if (label === 'Shift') setSelectedShift(e.target.value);
                            else if (label === 'Hour') setSelectedHour(e.target.value);
                            else setSelectedMachine(e.target.value);
                          }}
                          className="w-full bg-[var(--bg-soft)] border border-[var(--border)] rounded-xl px-4 py-2.5 text-[var(--text)] font-medium text-sm focus:outline-none focus:border-[var(--accent)] focus:ring-2 focus:ring-[var(--accent)]/20 transition-all appearance-none cursor-pointer"
                        >
                          {label === 'Plant' && (
                            <>
                              <option value="plant1_data">Plant 1 (57 Machines)</option>
                              <option value="plant2_data">Plant 2 (46 Machines)</option>
                            </>
                          )}
                          {label === 'Date' && availableDates.slice(0, 30).map(date => (
                            <option key={date} value={date}>{new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</option>
                          ))}
                          {label === 'Shift' && availableShifts.map(shift => (
                            <option key={shift.value} value={shift.value}>{shift.label}</option>
                          ))}
                          {label === 'Hour' && (
                            <>
                              <option value="">All Hours</option>
                              {availableHours.slice(0, 24).map(hour => (
                                <option key={hour.value} value={hour.value}>{hour.label}</option>
                              ))}
                            </>
                          )}
                          {label === 'Machine' && (
                            <>
                              <option value="">All Machines</option>
                              {availableMachines.slice(0, 57).map(machine => (
                                <option key={machine.value} value={machine.value}>{machine.label}</option>
                              ))}
                            </>
                          )}
                        </select>
                      </div>
                    ))}
                  </div>
                </Card>
              </motion.div>

              {/* KEY METRICS */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <motion.div custom={0} variants={metricCardVariants} whileHover="hover">
                  <Card className="flex flex-col h-full bg-[var(--surface)] border border-[var(--border-strong)] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-[var(--text-soft)] font-semibold text-sm uppercase tracking-wider mb-2">Total Machines</p>
                        <span className="text-4xl md:text-5xl font-extrabold text-[var(--text)]">
                          {totalMachines}
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-[var(--accent-tint)] flex items-center justify-center">
                        <Factory className="w-6 h-6 text-[var(--accent)]" />
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-[var(--border)]">
                      <p className="text-[var(--text-muted)] text-sm font-medium">Active Manufacturing Units</p>
                    </div>
                  </Card>
                </motion.div>

                <motion.div custom={1} variants={metricCardVariants} whileHover="hover">
                  <Card className="flex flex-col h-full bg-[var(--surface)] border border-[var(--border-strong)] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[var(--accent)]" />
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-[var(--text-soft)] font-semibold text-sm uppercase tracking-wider mb-2 flex items-center gap-2">
                          Running Machines
                          <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse"></span>
                        </p>
                        <span className="text-4xl md:text-5xl font-extrabold text-[var(--text)]">
                          {runningMachines}
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-[var(--accent-tint)] flex items-center justify-center">
                        <Activity className="w-6 h-6 text-[var(--accent)]" />
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-[var(--border)] w-full">
                       <div className="flex justify-between text-xs font-bold text-[var(--text-soft)] mb-2">
                         <span>Utilization</span>
                         <span>{Math.round((runningMachines / Math.max(1, totalMachines)) * 100)}%</span>
                       </div>
                       <div className="h-2 w-full bg-[var(--bg-soft)] rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-[var(--accent)]" 
                          initial={{ width: 0 }} 
                          animate={{ width: `${Math.max(0, (runningMachines / Math.max(1, totalMachines)) * 100)}%` }} 
                          transition={{ duration: 0.8, delay: 0.5 }}
                        />
                      </div>
                    </div>
                  </Card>
                </motion.div>

                <motion.div custom={2} variants={metricCardVariants} whileHover="hover">
                  <Card className="flex flex-col h-full bg-[var(--surface)] border border-[var(--border-strong)] p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="text-[var(--text-soft)] font-semibold text-sm uppercase tracking-wider mb-2">Total Production</p>
                        <span className="text-4xl md:text-5xl font-extrabold text-[var(--text)]">
                          {totalProduction.toLocaleString()}
                        </span>
                      </div>
                      <div className="w-12 h-12 rounded-xl bg-[var(--accent-tint)] flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-[var(--accent)]" />
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-[var(--border)]">
                      <p className="text-[var(--text-muted)] text-sm font-medium">Units Produced Today</p>
                    </div>
                  </Card>
                </motion.div>
              </div>

              {/* CHARTS */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                <motion.div custom={0} variants={metricCardVariants}>
                  <Card className="bg-[var(--surface)] border border-[var(--border-strong)] p-6 rounded-2xl shadow-sm">
                    <h3 className="text-[var(--text)] mb-6 font-bold text-lg flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center text-sm">📈</span>
                      Hourly Production Trend
                    </h3>
                    <div style={{ height: screenSize.isMobile ? '250px' : '320px' }}>
                      {hourlyProductionData.labels.length > 0 ? (
                        <Line data={hourlyProductionData} options={chartOptions} />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[var(--text-muted)] font-medium">Loading chart data...</div>
                      )}
                    </div>
                  </Card>
                </motion.div>

                <motion.div custom={1} variants={metricCardVariants}>
                  <Card className="bg-[var(--surface)] border border-[var(--border-strong)] p-6 rounded-2xl shadow-sm">
                    <h3 className="text-[var(--text)] mb-6 font-bold text-lg flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center text-sm">📊</span>
                      Live Machine Status
                    </h3>
                    <div style={{ height: screenSize.isMobile ? '250px' : '320px' }}>
                      {efficiencyData.labels?.length > 0 ? (
                        <Doughnut data={efficiencyData} options={{ ...chartOptions, maintainAspectRatio: false }} />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[var(--text-muted)] font-medium">Loading chart data...</div>
                      )}
                    </div>
                  </Card>
                </motion.div>

                <motion.div custom={2} variants={metricCardVariants} className="xl:col-span-2">
                  <Card className="bg-[var(--surface)] border border-[var(--border-strong)] p-6 rounded-2xl shadow-sm">
                    <h3 className="text-[var(--text)] mb-6 font-bold text-lg flex items-center gap-2">
                      <span className="w-8 h-8 rounded-lg bg-[var(--accent-tint)] text-[var(--accent)] flex items-center justify-center text-sm">📊</span>
                      Machine-wise Production Volume
                    </h3>
                    <div style={{ height: screenSize.isMobile ? '250px' : '350px' }}>
                      {machineWiseData.labels.length > 0 ? (
                        <Bar data={machineWiseData} options={chartOptions} />
                      ) : (
                        <div className="flex items-center justify-center h-full text-[var(--text-muted)] font-medium">Loading chart data...</div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Dashboard;