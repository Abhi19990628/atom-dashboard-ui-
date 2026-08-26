import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area
} from 'recharts';
import {
  Factory, Calendar, Settings, TrendingUp, Activity, AlertTriangle,
  ChevronDown, ChevronRight, Cpu, Gauge, Clock, Zap, Monitor,
  Filter, BarChart3, Play, Square, Power, Terminal,
  LineChart as LineChartIcon, BarChart as BarChartIcon, AreaChart as AreaChartIcon,
  Server, RefreshCw, Sun, Moon, Radio
} from 'lucide-react';

// API Base URL
const API_BASE_URL = `${process.env.REACT_APP_API_URL || 'http://localhost:8000'}/api`;

const monthNamesFull = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// ============================================
// DATE HELPER FUNCTIONS
// ============================================
const getWeeklyStartDate = (endDateStr) => {
  if (!endDateStr) return '';
  const [year, month, day] = endDateStr.split('-');
  const dateObj = new Date(year, month - 1, day);
  dateObj.setDate(dateObj.getDate() - 6); 
  const y = dateObj.getFullYear();
  const m = String(dateObj.getMonth() + 1).padStart(2, '0');
  const d = String(dateObj.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

const formatDateNice = (dateStr) => {
  if (!dateStr) return '';
  const [year, month, day] = dateStr.split('-');
  const d = new Date(year, month - 1, day);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};

const formatTimeHelper = (totalMins) => {
  if (!totalMins || isNaN(totalMins) || totalMins === 0) return '0s';
  const totalSeconds = Math.round(totalMins * 60);
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;

  if (h > 0) return `${h}h ${m}m ${s}s`;
  if (m > 0) return `${m}m ${s}s`;
  return `${s}s`;
};

const getFormatAxisLabel = (dayValue, filter, selDate, selMonth) => {
  if (dayValue === undefined || dayValue === null) return '';

  if (filter === 'today') return `${dayValue}:00`;
  if (filter === 'yearly') return monthNamesShort[dayValue - 1] || `Month ${dayValue}`;

  if (filter === 'monthly') {
    return `${dayValue} ${monthNamesShort[selMonth - 1]}`;
  }

  if (filter === 'weekly' && selDate) {
    const [y, m, d] = selDate.split('-');
    const endObj = new Date(y, m - 1, d);
    for (let i = 0; i < 7; i++) {
      const tempDate = new Date(endObj);
      tempDate.setDate(tempDate.getDate() - i);
      if (tempDate.getDate() === Number(dayValue)) {
        return `${dayValue} ${monthNamesShort[tempDate.getMonth()]}`;
      }
    }
    return `${dayValue} ${monthNamesShort[parseInt(m) - 1]}`;
  }

  return `Day ${dayValue}`;
};

const formatChartData = (breakdown, filter, selDate, selMonth) => {
  if (!breakdown) return [];
  return breakdown.map(day => ({
    name: getFormatAxisLabel(day.day, filter, selDate, selMonth),
    production: day.production || 0,
    idle: day.idle_minutes || 0,
    shutdown: day.shutdown_minutes || 0
  }));
};

// ============================================
// DUMMY DATA GENERATORS
// ============================================
const generateSampleData = (filter = 'monthly', selDate = '', selMonth = 1) => {
  let length = 30;
  if (filter === 'today') length = 24;
  if (filter === 'weekly') length = 7;
  if (filter === 'yearly') length = 12;

  let startWeeklyObj = null;
  if (filter === 'weekly' && selDate) {
    const [y, m, d] = selDate.split('-');
    startWeeklyObj = new Date(y, m - 1, d);
    startWeeklyObj.setDate(startWeeklyObj.getDate() - 6);
  }

  const data = [];
  for (let i = 1; i <= length; i++) {
    let dayVal = i;
    if (filter === 'today') dayVal = i - 1;
    else if (filter === 'weekly' && startWeeklyObj) {
      const tDate = new Date(startWeeklyObj);
      tDate.setDate(tDate.getDate() + (i - 1));
      dayVal = tDate.getDate();
    }

    data.push({
      day: dayVal,
      production: Math.floor(Math.random() * (8500 - 4500 + 1) + 4500),
      idle_minutes: Math.floor(Math.random() * (120 - 30 + 1) + 30),
      shutdown_minutes: Math.floor(Math.random() * (180 - 60 + 1) + 60),
      has_data: true
    });
  }
  return data;
};

const generateSampleMachineData = (machineNumber, filter = 'monthly', selDate = '', selMonth = 1) => {
  let length = 30;
  if (filter === 'today') length = 24;
  if (filter === 'weekly') length = 7;
  if (filter === 'yearly') length = 12;

  let startWeeklyObj = null;
  if (filter === 'weekly' && selDate) {
    const [y, m, d] = selDate.split('-');
    startWeeklyObj = new Date(y, m - 1, d);
    startWeeklyObj.setDate(startWeeklyObj.getDate() - 6);
  }

  const days = [];
  const baseProduction = Math.floor(Math.random() * (400 - 200 + 1) + 200);
  const baseIdleMins = Math.floor(Math.random() * (90 - 20 + 1) + 20);
  const baseShutdownMins = Math.floor(Math.random() * (120 - 30 + 1) + 30);

  let activeDays = 0;

  for (let i = 1; i <= length; i++) {
    const isOfflineDay = Math.random() > 0.85;

    let dayVal = i;
    if (filter === 'today') dayVal = i - 1;
    else if (filter === 'weekly' && startWeeklyObj) {
      const tDate = new Date(startWeeklyObj);
      tDate.setDate(tDate.getDate() + (i - 1));
      dayVal = tDate.getDate();
    }

    if (isOfflineDay) {
      days.push({ day: dayVal, production: 0, idle_minutes: 0, shutdown_minutes: 0, has_data: false, status: 'Offline' });
    } else {
      activeDays++;
      days.push({
        day: dayVal,
        production: baseProduction + Math.floor(Math.random() * 100) - 50,
        idle_minutes: baseIdleMins + Math.floor(Math.random() * 30) - 15,
        shutdown_minutes: baseShutdownMins + Math.floor(Math.random() * 40) - 20,
        has_data: true,
        status: 'Active'
      });
    }
  }

  const totalIdleMins = days.reduce((sum, d) => sum + d.idle_minutes, 0);
  const totalShutdownMins = days.reduce((sum, d) => sum + d.shutdown_minutes, 0);

  return {
    machine_info: {
      machine_no: machineNumber,
      machine_id: `M-${String(machineNumber).padStart(2, '0')}`,
      period_type: filter
    },
    production_summary: {
      total_production: days.reduce((sum, d) => sum + d.production, 0),
      average_daily: Math.round(days.reduce((sum, d) => sum + d.production, 0) / (activeDays || 1))
    },
    idle_summary: {
      total_idle_hours: Math.round((totalIdleMins / 60) * 10) / 10,
      total_shutdown_hours: Math.round((totalShutdownMins / 60) * 10) / 10
    },
    machine_status: {
      active_days: activeDays,
      inactive_days: length - activeDays,
      active_percentage: Math.round((activeDays / length) * 100 * 10) / 10,
      status: activeDays > 0 ? 'Operational' : 'Offline'
    },
    daily_breakdown: days
  };
};

const RadialGauge = ({ percentage = 0, size = 60, stroke = 5, color = '#18a8c6', trackColor = '#1E242E', label, isDark }) => {
  const pct = Math.max(0, Math.min(100, percentage || 0));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;
  return (
    <div className="relative flex items-center justify-center shrink-0" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} stroke={trackColor} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth={stroke} fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: 'stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`font-data font-bold leading-none ${isDark ? 'text-white' : 'text-slate-900'}`} style={{ fontSize: size * 0.24 }}>
          {Math.round(pct)}
        </span>
        {label && <span className={`text-[8px] font-bold uppercase tracking-wider mt-0.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>{label}</span>}
      </div>
    </div>
  );
};

const ProductionHistory = () => {
  const [theme, setTheme] = useState('dark');
  const [selectedPlant, setSelectedPlant] = useState('plant1');
  const [selectedMachine, setSelectedMachine] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear().toString());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [timeFilter, setTimeFilter] = useState('today');
  const [chartType, setChartType] = useState('bar');
  const [showMachineGrid, setShowMachineGrid] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentDay, setCurrentDay] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const [loading, setLoading] = useState(true);
  const [monthlyData, setMonthlyData] = useState([]);
  const [monthlySummary, setMonthlySummary] = useState(null);
  const [machineAnalysisCache, setMachineAnalysisCache] = useState({});
  const [selectedMachineDetail, setSelectedMachineDetail] = useState(null);
  const [dateRange, setDateRange] = useState(null);
  const [realtimeData, setRealtimeData] = useState(null);
  const [apiError, setApiError] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = [];
  for (let i = currentYear - 3; i <= currentYear + 3; i++) {
    years.push(i.toString());
  }

  const getMachineCount = () => selectedPlant === 'plant1' ? 57 : 49;

  // CUSTOM THEME COLORS APPLIED
  const isDark = theme === 'dark';
  const themeBgMain = isDark ? 'bg-[#0A0C10]' : 'bg-[#EEF1F5]';
  const themeCard = isDark ? 'bg-[#12151C] border-[#1E242E]' : 'bg-white border-[#DFE4EA]';
  const themeSubBg = isDark ? 'bg-[#171B23] border-[#1E242E]' : 'bg-[#F5F7FA] border-[#E2E8F0]';
  const themeTextMain = isDark ? 'text-[#E8EBEF]' : 'text-[#0F172A]';
  const themeTextMuted = isDark ? 'text-[#6C7787]' : 'text-[#64748B]';
  const themeBorder = isDark ? 'border-[#1E242E]' : 'border-[#EEF1F5]';
  const themeAccentText = 'text-[#18a8c6]';
  const themeAccentBg = 'bg-[#18a8c6]';
  const accentHex = '#18a8c6';
  const trackHex = isDark ? '#1E242E' : '#E2E8F0';

  const fetchMonthlySummary = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/monthly-summary/`, {
        params: {
          plant: selectedPlant,
          month: selectedMonth,
          year: selectedYear,
          period: timeFilter,
          date: selectedDate
        }
      });

      if (response.data && response.data.daily_breakdown && response.data.daily_breakdown.length > 0) {
        setMonthlyData(formatChartData(response.data.daily_breakdown, timeFilter, selectedDate, selectedMonth));
        setMonthlySummary(response.data);
      } else {
        throw new Error("No data returned");
      }
      setApiError(false);
    } catch (error) {
      console.error('Error fetching summary:', error);
      setApiError(true);
      const sampleData = generateSampleData(timeFilter, selectedDate, selectedMonth);
      setMonthlyData(formatChartData(sampleData, timeFilter, selectedDate, selectedMonth));
      setMonthlySummary({
        month_name: timeFilter === 'today' || timeFilter === 'weekly' ? selectedDate : monthNamesFull[selectedMonth - 1],
        summary: {
          total_production: sampleData.reduce((sum, d) => sum + d.production, 0),
          total_idle_hours: Math.round((sampleData.reduce((sum, d) => sum + d.idle_minutes + d.shutdown_minutes, 0) / 60) * 10) / 10,
          days_with_data: sampleData.length,
          days_in_month: sampleData.length,
          coverage: 100
        }
      });
    }
  };

  const fetchDateRange = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/date-range/`, {
        params: { plant: selectedPlant }
      });
      setDateRange(response.data);
    } catch (error) {
      console.error('Error fetching date range:', error);
    }
  };

  const fetchRealtimeDashboard = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/realtime-dashboard/`, {
        params: { plant: selectedPlant }
      });
      setRealtimeData(response.data);
    } catch (error) {
      console.error('Error fetching realtime dashboard:', error);
    }
  };

  const fetchMachineAnalysis = async (machineNo, forceRefresh = false) => {
    const cacheKey = `${machineNo}-${selectedMonth}-${selectedYear}-${timeFilter}-${selectedDate}`;

    if (!forceRefresh && machineAnalysisCache[cacheKey]) {
      return machineAnalysisCache[cacheKey];
    }

    try {
      const response = await axios.get(`${API_BASE_URL}/machine-analysis/`, {
        params: {
          plant: selectedPlant,
          machine_no: machineNo,
          month: selectedMonth,
          year: selectedYear,
          period: timeFilter,
          date: selectedDate
        }
      });

      if (response.data && response.data.daily_breakdown) {
        setMachineAnalysisCache(prev => ({ ...prev, [cacheKey]: response.data }));
        return response.data;
      } else {
        throw new Error("No data");
      }
    } catch (error) {
      console.error(`Error fetching machine ${machineNo} analysis:`, error);
      const sampleMachineData = generateSampleMachineData(machineNo, timeFilter, selectedDate, selectedMonth);
      setMachineAnalysisCache(prev => ({ ...prev, [cacheKey]: sampleMachineData }));
      return sampleMachineData;
    }
  };

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      fetchDateRange();
      fetchRealtimeDashboard();

      if (selectedMachine) {
        const analysis = await fetchMachineAnalysis(selectedMachine);
        if (analysis) {
          setSelectedMachineDetail(analysis);
        }
      } else {
        await fetchMonthlySummary();
      }
      setLoading(false);
    };
    loadAllData();
  }, [selectedPlant, selectedMonth, selectedYear, timeFilter, selectedDate, selectedMachine]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchRealtimeDashboard();
      if (selectedMachine) {
        fetchMachineAnalysis(selectedMachine, true).then(analysis => {
          if (analysis) {
            setSelectedMachineDetail(analysis);
          }
        });
      } else {
        fetchMonthlySummary();
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [selectedPlant, selectedMonth, selectedYear, timeFilter, selectedDate, selectedMachine]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const selectMachine = (machineNumber) => {
    if (selectedMachine === machineNumber) {
      setSelectedMachine(null);
      setSelectedMachineDetail(null);
    } else {
      setSelectedMachine(machineNumber);
      setSelectedMachineDetail(null); 
    }
  };

  const clearMachine = () => {
    setSelectedMachine(null);
    setSelectedMachineDetail(null);
  };

  const startAnimation = () => {
    setIsAnimating(true);
    let day = 0;
    const interval = setInterval(() => {
      if (day < monthlyData.length) {
        setCurrentDay(day);
        day++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 200);
    return () => clearInterval(interval);
  };

  const stopAnimation = () => {
    setIsAnimating(false);
    setCurrentDay(0);
  };

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
  });

  const renderChart = () => {
    let data = monthlyData;

    if (selectedMachine && selectedMachineDetail && selectedMachineDetail.daily_breakdown) {
      data = formatChartData(selectedMachineDetail.daily_breakdown, timeFilter, selectedDate, selectedMonth);
    }

    if (!data || data.length === 0) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className={`mb-2 font-semibold ${themeTextMuted}`}>No data available</div>
            <div className={`text-xs ${themeTextMuted}`}>Please check your API connection or select different filters</div>
            {apiError && (
              <div className="text-xs text-amber-500 mt-2">API connection error. Using sample data.</div>
            )}
          </div>
        </div>
      );
    }

    const commonProps = { data: data, margin: { top: 20, right: 24, left: 12, bottom: 5 } };
    const customTooltip = {
      backgroundColor: isDark ? '#12151C' : '#ffffff',
      border: `1px solid ${isDark ? '#232935' : '#e2e8f0'}`,
      borderRadius: '10px',
      color: isDark ? '#E8EBEF' : '#1e293b',
      fontFamily: "'JetBrains Mono', monospace",
      fontSize: '12px'
    };
    const chartStroke = isDark ? '#5B6472' : '#64748b';
    const gridStroke = isDark ? '#1B2029' : '#e2e8f0';

    if (loading && !selectedMachineDetail && selectedMachine) {
      return (
        <div className={`flex items-center justify-center h-full font-medium font-data text-sm ${themeTextMuted}`}>
          <span className="flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full animate-pulse ${themeAccentBg}`} /> LOADING MACHINE DATA...
          </span>
        </div>
      );
    }
    
    if (loading && !monthlySummary && !selectedMachine) {
        return (
          <div className={`flex items-center justify-center h-full font-medium font-data text-sm ${themeTextMuted}`}>
            <span className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full animate-pulse ${themeAccentBg}`} /> LOADING TELEMETRY...
            </span>
          </div>
        );
    }

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
            <XAxis dataKey="name" stroke={chartStroke} fontSize={10} fontFamily="'JetBrains Mono', monospace" tickLine={false} interval="preserveStartEnd" />
            <YAxis stroke={chartStroke} fontSize={10} fontFamily="'JetBrains Mono', monospace" tickLine={false} />
            <Tooltip
              contentStyle={customTooltip}
              formatter={(value, name) => {
                if (name === 'idle') return [formatTimeHelper(value), 'Idle (ONLINE)'];
                if (name === 'production') return [value.toLocaleString(), 'Production (units)'];
                if (name === 'shutdown') return [formatTimeHelper(value), 'Shutdown (OFFLINE)'];
                return [value, name];
              }}
            />
            <Line type="monotone" dataKey="production" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981', r: 4, strokeWidth: 0 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="idle" stroke="#f59e0b" strokeWidth={2.5} dot={{ fill: '#f59e0b', r: 4, strokeWidth: 0 }} />
            <Line type="monotone" dataKey="shutdown" stroke="#ef4444" strokeWidth={2.5} dot={{ fill: '#ef4444', r: 4, strokeWidth: 0 }} />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="idleGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="shutdownGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
            <XAxis dataKey="name" stroke={chartStroke} fontSize={10} fontFamily="'JetBrains Mono', monospace" tickLine={false} interval="preserveStartEnd" />
            <YAxis stroke={chartStroke} fontSize={10} fontFamily="'JetBrains Mono', monospace" tickLine={false} />
            <Tooltip
              contentStyle={customTooltip}
              formatter={(value, name) => {
                if (name === 'idle') return [formatTimeHelper(value), 'Idle (ONLINE)'];
                if (name === 'production') return [value.toLocaleString(), 'Production (units)'];
                if (name === 'shutdown') return [formatTimeHelper(value), 'Shutdown (OFFLINE)'];
                return [value, name];
              }}
            />
            <Area type="monotone" dataKey="production" stroke="#10b981" strokeWidth={2} fill="url(#productionGradient)" />
            <Area type="monotone" dataKey="idle" stroke="#f59e0b" strokeWidth={2} fill="url(#idleGradient)" />
            <Area type="monotone" dataKey="shutdown" stroke="#ef4444" strokeWidth={2} fill="url(#shutdownGradient)" />
          </AreaChart>
        );
      default:
        return (
          <BarChart {...commonProps} barGap={4}>
            {/* Minimalist Professional Grid */}
            <CartesianGrid strokeDasharray="4 4" stroke={gridStroke} vertical={false} opacity={0.3} />
            
            <XAxis 
              dataKey="name" 
              stroke={chartStroke} 
              fontSize={11} 
              fontFamily="'JetBrains Mono', monospace" 
              tickLine={false} 
              axisLine={false} 
              dy={12} 
              interval="preserveStartEnd" 
            />
            <YAxis 
              stroke={chartStroke} 
              fontSize={11} 
              fontFamily="'JetBrains Mono', monospace" 
              tickLine={false} 
              axisLine={false} 
              dx={-10} 
            />
            
            {/* Tooltip Matching Your Image */}
            <Tooltip
              contentStyle={customTooltip}
              formatter={(value, name) => {
                if (name === 'idle') return [formatTimeHelper(value), 'Idle (ONLINE)'];
                if (name === 'production') return [value.toLocaleString(), 'Production (units)'];
                if (name === 'shutdown') return [formatTimeHelper(value), 'Shutdown (OFFLINE)'];
                return [value, name];
              }}
              cursor={{ fill: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)' }}
            />
            
            {/* Original Solid Colors but with Professional Gap and Radius */}
            <Bar dataKey="idle" fill="#f59e0b" radius={[4, 4, 0, 0]} barSize={16} />
            <Bar dataKey="production" fill="#10b981" radius={[4, 4, 0, 0]} barSize={16} />
            <Bar dataKey="shutdown" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={16} />
          </BarChart>
        );
    }
  };

  return (
    <div className={`font-ui min-h-screen relative overflow-x-hidden transition-colors duration-300 ${themeBgMain} ${isDark ? 'theme-dark' : ''}`}
      style={{
        backgroundImage: isDark
          ? 'radial-gradient(circle, #161b24 1px, transparent 1px)'
          : 'radial-gradient(circle, #dbe1e8 1px, transparent 1px)',
        backgroundSize: '22px 22px'
      }}
    >
      <div className="w-full mx-auto p-4 md:p-6 lg:p-8 relative z-10">

        <div className={`relative border rounded-xl mb-6 p-6 shadow-sm overflow-hidden transition-colors duration-300 ${themeCard}`}>
          <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#18a8c6] via-[#128a9c] to-transparent" />
          <div>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3 py-1 rounded-md border ${themeSubBg}`}>
                  <Terminal size={14} className={themeAccentText} />
                  <span className={`font-data text-xs font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>production@dashboard:~/system$</span>
                </div>
                <span className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#18a8c6]/10 text-[#18a8c6]`}>
                  <Radio size={11} className="animate-pulse" /> Live
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  className={`flex items-center justify-center p-2 rounded-lg border transition-all ${isDark ? 'bg-[#171B23] border-[#1E242E] text-[#18a8c6] hover:bg-[#1E242E]' : 'bg-white border-slate-200 text-[#18a8c6] hover:bg-slate-100 shadow-sm'}`}
                  title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
                >
                  {isDark ? <Sun size={18} /> : <Moon size={18} />}
                </button>
                <button
                  onClick={() => fetchRealtimeDashboard()}
                  className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold border transition-all ${isDark ? 'bg-[#171B23] border-[#1E242E] text-slate-200 hover:border-[#18a8c6]/40' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 shadow-sm'}`}
                >
                  <RefreshCw size={14} /> Refresh Data
                </button>
              </div>
            </div>
            <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight ${themeTextMain}`}>
              Production History &amp; Analysis
            </h1>
            <p className={`text-sm mt-2 font-medium flex items-center flex-wrap gap-2 ${themeTextMuted}`}>
              <Activity size={16} className={themeAccentText} /> Real-Time Monitoring System
              {dateRange && dateRange.first_date && (
                <span className={`font-data text-[11px] px-2 py-0.5 rounded-md border ml-2 ${isDark ? 'bg-[#171B23] text-[#18a8c6] border-[#1E242E]' : 'bg-[#18a8c6]/10 text-[#128a9c] border-[#18a8c6]/20'}`}>
                  Database: {new Date(dateRange.first_date).toLocaleDateString()} - {new Date(dateRange.last_date).toLocaleDateString()}
                </span>
              )}
              {apiError && (
                <span className={`text-xs px-2 py-0.5 rounded-md border ml-2 ${isDark ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' : 'bg-amber-50 text-amber-700 border-amber-200'}`}>
                  ⚠️ Demo Data Mode
                </span>
              )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <div className="lg:col-span-3 space-y-6">

            <div className={`border rounded-xl overflow-hidden shadow-sm transition-colors duration-300 ${themeCard}`}>
              <div className={`px-5 py-3.5 border-b flex items-center gap-2 ${themeSubBg}`}>
                <Filter size={15} className={themeAccentText} />
                <h2 className={`text-[11px] font-bold tracking-widest uppercase ${themeTextMain}`}>Filters &amp; Parameters</h2>
              </div>

              <div className="p-5 space-y-6">

                <div>
                  <label className={`text-[10px] font-bold block mb-2.5 flex items-center gap-2 uppercase tracking-widest ${themeTextMuted}`}>
                    <Factory size={13} className={isDark ? 'text-slate-500' : 'text-slate-400'} /> Plant Selection
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => {
                        setSelectedPlant('plant1');
                        setSelectedMachine(null);
                        setSelectedMachineDetail(null);
                      }}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border transition-all duration-200 font-semibold text-sm ${
                        selectedPlant === 'plant1'
                          ? `${themeAccentBg} border-transparent text-[#04120F] shadow-md`
                          : `border-transparent ${themeSubBg} ${isDark ? 'text-slate-300 hover:border-[#18a8c6]/40' : 'text-slate-600 hover:border-[#18a8c6]/40 hover:bg-[#18a8c6]/10'}`
                      }`}
                    >
                      <Cpu size={16} /> Plant 1
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPlant('plant2');
                        setSelectedMachine(null);
                        setSelectedMachineDetail(null);
                      }}
                      className={`flex items-center justify-center gap-2 py-2.5 rounded-lg border transition-all duration-200 font-semibold text-sm ${
                        selectedPlant === 'plant2'
                          ? `${themeAccentBg} border-transparent text-[#04120F] shadow-md`
                          : `border-transparent ${themeSubBg} ${isDark ? 'text-slate-300 hover:border-[#18a8c6]/40' : 'text-slate-600 hover:border-[#18a8c6]/40 hover:bg-[#18a8c6]/10'}`
                      }`}
                    >
                      <Zap size={16} /> Plant 2
                    </button>
                  </div>
                </div>

                <div>
                  <div className={`flex justify-between items-center mb-3 border-t pt-5 w-full ${themeBorder}`}>
                    <label className={`text-[10px] font-bold flex items-center gap-2 uppercase tracking-widest ${themeTextMuted}`}>
                      <Settings size={13} className={isDark ? 'text-slate-500' : 'text-slate-400'} /> Machine No.
                    </label>
                    <button
                      onClick={() => setShowMachineGrid(!showMachineGrid)}
                      className={`p-1 rounded-md transition-colors mt-5 ${isDark ? 'bg-[#171B23] text-slate-400 hover:text-white' : 'bg-slate-100 text-slate-400 hover:text-[#18a8c6] hover:bg-[#18a8c6]/10'}`}
                    >
                      {showMachineGrid ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                    </button>
                  </div>

                  {showMachineGrid && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-5 gap-1.5 max-h-[220px] overflow-y-auto pr-1 custom-scrollbar">
                        {Array.from({ length: getMachineCount() }, (_, i) => i + 1).map((num) => (
                          <button
                            key={num}
                            onClick={() => selectMachine(num)}
                            className={`font-data aspect-square flex items-center justify-center text-xs font-semibold rounded-md border transition-all cursor-pointer ${
                              selectedMachine === num
                                ? `${themeAccentBg} border-transparent text-[#04120F] shadow-md`
                                : `${themeSubBg} ${isDark ? 'text-slate-300 hover:border-[#18a8c6]/50 hover:text-[#18a8c6]' : 'text-slate-600 hover:border-[#18a8c6]/60 hover:text-[#18a8c6] hover:bg-[#18a8c6]/10'}`
                            }`}
                            title={`View details for Machine ${num}`}
                          >
                            {String(num).padStart(2, '0')}
                          </button>
                        ))}
                      </div>
                      <div className={`flex items-center justify-between pt-3 border-t ${themeBorder}`}>
                        <button
                          onClick={clearMachine}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${isDark ? 'text-slate-400 hover:bg-red-500/10 hover:text-red-400' : 'text-slate-500 hover:bg-red-50 hover:text-red-600'}`}
                        >
                          Clear All
                        </button>
                        <div className={`font-data text-[11px] font-bold px-2 py-1 rounded border ${isDark ? 'bg-[#171B23] border-[#1E242E] text-slate-300' : 'bg-slate-100 border-transparent text-slate-600'}`}>
                          {selectedMachine ? `M-${String(selectedMachine).padStart(2, '0')}` : 'None'}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className={`border rounded-xl p-5 shadow-sm transition-colors duration-300 ${themeCard}`}>
              <div className={`flex items-center gap-2 mb-4 pb-3 border-b ${themeBorder}`}>
                <Monitor size={16} className={themeAccentText} />
                <span className={`text-[11px] font-bold uppercase tracking-widest ${themeTextMain}`}>System Status</span>
              </div>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center">
                  <span className={`font-medium ${themeTextMuted}`}>Data Stream</span>
                  <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${apiError ? (isDark ? 'bg-amber-500/10 text-amber-400' : 'bg-amber-100 text-amber-700') : (isDark ? 'bg-emerald-500/10 text-emerald-400' : 'bg-emerald-100 text-emerald-700')}`}>
                    <div className={`w-2 h-2 rounded-full ${apiError ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse`} />
                    {apiError ? 'DEMO' : 'ACTIVE'}
                  </span>
                </div>
                {realtimeData && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${themeTextMuted}`}>Today's Output</span>
                      <span className={`font-data font-bold ${themeTextMain}`}>{realtimeData.summary?.total_production?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`font-medium ${themeTextMuted}`}>Active Machines</span>
                      <span className={`font-data font-bold ${themeTextMain}`}>{realtimeData.summary?.active_machines || 0} / {realtimeData.summary?.total_machines || 0}</span>
                    </div>
                  </>
                )}
                <div className={`flex justify-between items-center pt-3 border-t ${themeBorder}`}>
                  <span className={`text-xs font-medium ${themeTextMuted}`}>Last Sync</span>
                  <span className={`font-data text-xs px-2 py-1 rounded border ${isDark ? 'bg-[#171B23] border-[#1E242E] text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700'}`}>{formattedTime}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-9 space-y-6">

            <div className={`border rounded-xl p-4 shadow-sm flex items-center justify-between flex-wrap gap-4 transition-colors duration-300 ${themeCard}`}>
              <div className="flex items-center gap-4">
                <span className={`text-[11px] font-bold uppercase tracking-widest ${themeTextMuted}`}>Chart Style Controls</span>
              </div>

              <div className="flex items-center gap-6">
                <div className={`flex p-1 rounded-lg border ${themeSubBg}`}>
                  <button onClick={() => setChartType('bar')} className={`p-1.5 rounded-md transition-all ${chartType === 'bar' ? (isDark ? 'bg-[#12151C] shadow-sm text-[#18a8c6]' : 'bg-white shadow-sm text-[#18a8c6]') : (isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700')}`}>
                    <BarChartIcon size={18} />
                  </button>
                  <button onClick={() => setChartType('line')} className={`p-1.5 rounded-md transition-all ${chartType === 'line' ? (isDark ? 'bg-[#12151C] shadow-sm text-[#18a8c6]' : 'bg-white shadow-sm text-[#18a8c6]') : (isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700')}`}>
                    <LineChartIcon size={18} />
                  </button>
                  <button onClick={() => setChartType('area')} className={`p-1.5 rounded-md transition-all ${chartType === 'area' ? (isDark ? 'bg-[#12151C] shadow-sm text-[#18a8c6]' : 'bg-white shadow-sm text-[#18a8c6]') : (isDark ? 'text-slate-400 hover:text-slate-200' : 'text-slate-500 hover:text-slate-700')}`}>
                    <AreaChartIcon size={18} />
                  </button>
                </div>

                <div className="flex gap-2">
                  <button onClick={startAnimation} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${isDark ? 'bg-[#18a8c6]/10 text-[#18a8c6] border-[#18a8c6]/20 hover:bg-[#18a8c6]/20' : 'bg-[#18a8c6]/10 text-[#128a9c] border-[#18a8c6]/30 hover:bg-[#18a8c6]/20'}`}>
                    <Play size={14} /> Anim
                  </button>
                  <button onClick={stopAnimation} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold border transition-all ${isDark ? 'bg-[#171B23] text-slate-300 border-[#1E242E] hover:bg-[#1E242E]' : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'}`}>
                    <Square size={14} /> Stop
                  </button>
                </div>
              </div>
            </div>

            <div className={`border rounded-xl overflow-hidden shadow-sm transition-colors duration-300 ${themeCard}`}>
              <div className={`px-6 pt-6 pb-4 border-b ${themeBorder}`}>
                <div className="flex flex-col xl:flex-row xl:items-start justify-between gap-4">

                  <div>
                    <h3 className={`text-xl font-bold flex items-center gap-2 ${themeTextMain}`}>
                      <BarChart3 size={20} className={themeAccentText} />
                      {selectedMachine ? `Machine M-${String(selectedMachine).padStart(2, '0')} Production` : 'Overall Plant Production'}
                    </h3>

                    <p className={`font-data text-xs mt-1.5 font-medium flex items-center gap-2 ${themeTextMuted}`}>
                      <Calendar size={13} className={isDark ? "text-slate-500" : "text-slate-400"} />
                      {timeFilter === 'today'
                        ? `Date: ${formatDateNice(selectedDate)}`
                        : timeFilter === 'weekly'
                        ? `${formatDateNice(getWeeklyStartDate(selectedDate))} to ${formatDateNice(selectedDate)}`
                        : `${timeFilter.charAt(0).toUpperCase() + timeFilter.slice(1)}`} Production • {monthlySummary?.summary?.days_with_data || monthlyData.length} Records
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">

                    <div className={`flex items-center rounded-lg p-0.5 shadow-sm transition-all border ${themeSubBg}`}>
                      {timeFilter === 'today' && (
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          className={`font-data appearance-none bg-transparent border-none px-3 py-1.5 text-sm font-bold focus:outline-none cursor-pointer ${isDark ? 'text-slate-200 color-scheme-dark' : 'text-slate-700'}`}
                        />
                      )}

                      {timeFilter === 'weekly' && (
                        <div className="flex items-center">
                          <input
                            type="date"
                            value={getWeeklyStartDate(selectedDate)}
                            onChange={(e) => {
                              if (!e.target.value) return;
                              const [y, m, d] = e.target.value.split('-');
                              const dateObj = new Date(y, m - 1, d);
                              dateObj.setDate(dateObj.getDate() + 6);
                              setSelectedDate(`${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`);
                            }}
                            className={`font-data appearance-none bg-transparent border-none pl-3 pr-1 py-1.5 text-sm font-bold focus:outline-none cursor-pointer ${isDark ? 'text-slate-200 color-scheme-dark' : 'text-slate-700'}`}
                            title="Start Date"
                          />
                          <span className={`font-black px-1 ${isDark ? 'text-slate-500' : 'text-slate-300'}`}>-</span>
                          <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            className={`font-data appearance-none bg-transparent border-none pr-3 pl-1 py-1.5 text-sm font-bold focus:outline-none cursor-pointer ${isDark ? 'text-slate-200 color-scheme-dark' : 'text-slate-700'}`}
                            title="End Date"
                          />
                        </div>
                      )}

                      {(timeFilter === 'monthly' || timeFilter === 'yearly') && (
                        <div className="flex items-center">
                          <select
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                            className={`appearance-none bg-transparent border-none pl-3 pr-6 py-1.5 text-sm font-bold focus:outline-none cursor-pointer ${isDark ? 'text-slate-200' : 'text-slate-700'}`}
                          >
                            {monthNamesFull.map((month, idx) => (
                              <option className={isDark ? 'bg-[#171B23]' : ''} key={month} value={idx + 1}>{month}</option>
                            ))}
                          </select>
                          <span className={`px-1 ${isDark ? 'text-slate-500' : 'text-slate-300'}`}>|</span>
                          <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className={`font-data appearance-none bg-transparent border-none pl-3 pr-6 py-1.5 text-sm font-bold focus:outline-none cursor-pointer ${isDark ? 'text-slate-200' : 'text-slate-700'}`}
                          >
                            {years.map(year => (
                              <option className={isDark ? 'bg-[#171B23]' : ''} key={year} value={year}>{year}</option>
                            ))}
                          </select>
                        </div>
                      )}
                    </div>

                    <div className={`relative group flex items-center rounded-lg p-0.5 shadow-sm transition-all border ${isDark ? 'bg-[#18a8c6]/10 border-[#18a8c6]/20 hover:border-[#18a8c6]/40' : 'bg-[#18a8c6]/10 border-[#18a8c6]/30 hover:border-[#18a8c6]/50'}`}>
                      <select
                        value={timeFilter}
                        onChange={(e) => setTimeFilter(e.target.value)}
                        className={`appearance-none bg-transparent border-none pl-3 pr-6 py-1.5 text-sm font-bold focus:outline-none focus:ring-0 cursor-pointer capitalize ${isDark ? 'text-white' : 'text-[#128a9c]'}`}
                      >
                        <option className={isDark ? 'bg-[#171B23]' : ''} value="today">Today</option>
                        <option className={isDark ? 'bg-[#171B23]' : ''} value="weekly">Weekly</option>
                        <option className={isDark ? 'bg-[#171B23]' : ''} value="monthly">Monthly</option>
                        <option className={isDark ? 'bg-[#171B23]' : ''} value="yearly">Yearly</option>
                      </select>
                      <ChevronDown size={14} className={`absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none transition-colors ${isDark ? 'text-[#18a8c6] group-hover:text-white' : 'text-[#18a8c6] group-hover:text-[#117686]'}`} />
                    </div>

                    <div className={`flex flex-wrap gap-3 text-[11px] font-semibold px-3 py-2 rounded-lg border ${themeSubBg}`}>
                      <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <span className="w-2.5 h-2.5 bg-[#10b981] rounded-sm"></span> Production Output
                      </span>
                      <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <span className="w-2.5 h-2.5 bg-[#f59e0b] rounded-sm"></span> Idle (ONLINE)
                      </span>
                      <span className={`flex items-center gap-1.5 ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                        <span className="w-2.5 h-2.5 bg-[#ef4444] rounded-sm"></span> Shutdown (OFFLINE)
                      </span>
                    </div>

                  </div>
                </div>
              </div>

              <div className="p-4 h-[400px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                  {renderChart()}
                </ResponsiveContainer>
                {isAnimating && (
                  <div className="font-data absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-[#18a8c6] text-[#04120F] px-5 py-2.5 rounded-full text-sm font-bold shadow-lg animate-bounce flex items-center gap-2">
                    <Play size={14} fill="#04120F" /> Animating Record {currentDay + 1}/{monthlyData.length}
                  </div>
                )}
              </div>
            </div>

            {selectedMachine && selectedMachineDetail && (
              <div className={`border rounded-xl p-6 shadow-sm animate-fadeIn transition-colors duration-300 ${themeCard}`}>
                <div className="flex justify-between items-center mb-5">
                  <h3 className={`text-xl font-bold flex items-center gap-2 ${themeTextMain}`}>
                    <Cpu size={22} className={themeAccentText} />
                    {selectedMachineDetail.machine_info.machine_id} Overview
                    <span className={`font-data text-[10px] px-2 py-0.5 ml-2 border rounded capitalize ${isDark ? 'bg-[#18a8c6]/10 text-[#18a8c6] border-[#18a8c6]/20' : 'bg-[#18a8c6]/10 text-[#128a9c] border-[#18a8c6]/20'}`}>
                      {selectedMachineDetail.machine_info.period_type || timeFilter}
                    </span>
                  </h3>
                </div>

                <div className="space-y-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={`rounded-lg p-4 border transition-colors ${themeSubBg}`}>
                      <p className={`text-[10px] font-bold mb-1 uppercase tracking-widest ${themeTextMuted}`}>Total Prod.</p>
                      <p className="font-data text-xl font-bold text-[#10b981]">
                        {selectedMachineDetail.production_summary.total_production.toLocaleString()} <span className={`text-xs font-normal ${themeTextMuted}`}>units</span>
                      </p>
                    </div>

                    <div className={`rounded-lg p-4 border transition-colors ${themeSubBg}`}>
                      <p className={`text-[10px] font-bold mb-1 uppercase tracking-widest ${themeTextMuted}`}>Idle (Online)</p>
                      <p className="font-data text-xl font-bold text-[#f59e0b]">
                        {selectedMachineDetail.idle_summary.total_idle_hours.toFixed(1)} <span className={`text-xs font-normal ${themeTextMuted}`}>hrs</span>
                      </p>
                    </div>

                    <div className={`rounded-lg p-4 border transition-colors ${themeSubBg}`}>
                      <p className={`text-[10px] font-bold mb-1 uppercase tracking-widest ${themeTextMuted}`}>Shutdown (Offline)</p>
                      <p className="font-data text-xl font-bold text-[#ef4444]">
                        {selectedMachineDetail.idle_summary.total_shutdown_hours?.toFixed(1) || '0.0'} <span className={`text-xs font-normal ${themeTextMuted}`}>hrs</span>
                      </p>
                    </div>

                    <div className={`rounded-lg p-4 border transition-colors flex items-center justify-between ${themeSubBg}`}>
                      <div>
                        <p className={`text-[10px] font-bold mb-1 uppercase tracking-widest ${themeTextMuted}`}>Active Rate</p>
                        <p className={`font-data text-xl font-bold ${themeAccentText}`}>{selectedMachineDetail.machine_status.active_percentage}%</p>
                      </div>
                      <RadialGauge percentage={selectedMachineDetail.machine_status.active_percentage} size={44} stroke={4} color={accentHex} trackColor={trackHex} isDark={isDark} />
                    </div>
                  </div>

                  <div className={`rounded-lg p-4 border transition-colors ${themeSubBg}`}>
                    <div className="flex justify-between items-end mb-2">
                      <p className={`text-sm font-semibold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                        Current Status: <span className={selectedMachineDetail.machine_status.status === 'Operational' ? 'text-[#10b981] ml-1' : 'text-[#ef4444] ml-1'}>
                          {selectedMachineDetail.machine_status.status}
                        </span>
                      </p>
                      <p className={`font-data text-xs font-semibold ${themeTextMuted}`}>
                        Active Data: {selectedMachineDetail.machine_status.active_days} Segments | Inactive: {selectedMachineDetail.machine_status.inactive_days} Segments
                      </p>
                    </div>
                    <div className={`h-2.5 rounded-full overflow-hidden flex ${isDark ? 'bg-[#0A0C10]' : 'bg-slate-200'}`}>
                      <div className="h-full bg-[#10b981] transition-all duration-1000" style={{ width: `${selectedMachineDetail.machine_status.active_percentage}%` }} />
                      <div className="h-full bg-[#ef4444] transition-all duration-1000" style={{ width: `${100 - selectedMachineDetail.machine_status.active_percentage}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {monthlySummary && !selectedMachine && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`border rounded-xl p-6 shadow-sm transition-all group relative overflow-hidden ${themeCard} ${isDark ? 'hover:border-[#10b981]/50' : 'hover:border-emerald-200 hover:shadow-md'}`}>
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#10b981]" />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className={`text-[10px] font-bold flex items-center gap-2 uppercase tracking-widest ${themeTextMuted}`}>
                        <Calendar size={13} className="text-[#10b981]" /> Total Production
                      </p>
                      <p className={`font-data text-3xl font-extrabold mt-2 ${themeTextMain}`}>
                        {monthlySummary.summary?.total_production?.toLocaleString() || 0}
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-[#10b981]/10' : 'bg-emerald-50'}`}>
                      <Gauge size={22} className="text-[#10b981]" />
                    </div>
                  </div>
                  <p className={`text-xs mt-2 font-medium ${themeTextMuted}`}>Units produced in selected view</p>
                </div>

                <div className={`border rounded-xl p-6 shadow-sm transition-all group relative overflow-hidden ${themeCard} ${isDark ? 'hover:border-[#f59e0b]/50' : 'hover:border-amber-200 hover:shadow-md'}`}>
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#f59e0b]" />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className={`text-[10px] font-bold flex items-center gap-2 uppercase tracking-widest ${themeTextMuted}`}>
                        <Clock size={13} className="text-[#f59e0b]" /> Total Idle/Offline
                      </p>
                      <p className={`font-data text-3xl font-extrabold mt-2 ${themeTextMain}`}>
                        {monthlySummary.summary?.total_idle_hours?.toLocaleString() || 0} <span className={`text-lg font-semibold ${themeTextMuted}`}>hrs</span>
                      </p>
                    </div>
                    <div className={`p-3 rounded-lg ${isDark ? 'bg-[#f59e0b]/10' : 'bg-amber-50'}`}>
                      <Activity size={22} className="text-[#f59e0b]" />
                    </div>
                  </div>
                  <p className={`text-xs mt-2 font-medium ${themeTextMuted}`}>Recorded idle &amp; shutdown hours</p>
                </div>

                <div className={`border rounded-xl p-6 shadow-sm transition-all group relative overflow-hidden ${themeCard} ${isDark ? 'hover:border-[#18a8c6]/50' : 'hover:border-[#18a8c6]/50 hover:shadow-md'}`}>
                  <div className="absolute top-0 left-0 w-1 h-full bg-[#18a8c6]" />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className={`text-[10px] font-bold flex items-center gap-2 uppercase tracking-widest ${themeTextMuted}`}>
                        <AlertTriangle size={13} className={themeAccentText} /> Data Coverage
                      </p>
                      <p className={`font-data text-3xl font-extrabold mt-2 ${themeTextMain}`}>
                        {Math.round(monthlySummary.summary?.coverage || 0)}%
                      </p>
                    </div>
                    <RadialGauge percentage={monthlySummary.summary?.coverage || 0} size={50} stroke={5} color={accentHex} trackColor={trackHex} isDark={isDark} />
                  </div>
                  <p className={`text-xs mt-2 font-medium ${themeTextMuted}`}>Active data coverage for this period</p>
                </div>
              </div>
            )}

            <div className={`border rounded-xl p-4 shadow-sm flex flex-wrap justify-between items-center text-xs font-semibold ${themeCard} ${themeTextMuted}`}>
              <div className="flex gap-6 items-center flex-wrap">
                <span className={`flex items-center gap-1.5 px-2 py-1 rounded uppercase tracking-wider text-[10px] font-bold ${isDark ? 'text-[#18a8c6] bg-[#18a8c6]/10' : 'text-[#128a9c] bg-[#18a8c6]/10'}`}>
                  <Power size={12} /> Live System
                </span>
                <span className="flex items-center gap-1.5 font-data">
                  <Server size={14} className={themeTextMuted} />
                  {selectedMachine ? `Machine ${String(selectedMachine).padStart(2, '0')}` : `Overall ${selectedPlant === 'plant1' ? 'Plant 1' : 'Plant 2'}`}
                </span>
                <span className="flex items-center gap-1.5">
                  <Factory size={14} className={themeTextMuted} />
                  {selectedPlant === 'plant1' ? 'Plant 1' : 'Plant 2'}
                </span>
              </div>
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap');

        .font-ui { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; }
        .font-data {
          font-family: 'JetBrains Mono', 'Courier New', monospace;
          font-variant-numeric: tabular-nums;
          letter-spacing: -0.01em;
        }

        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #18a8c666; border-radius: 8px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #18a8c6; }

        .theme-dark input[type="date"], .theme-dark select {
          color-scheme: dark;
        }
        input[type="date"]::-webkit-calendar-picker-indicator {
          cursor: pointer;
          opacity: 0.6;
          transition: 0.2s;
          filter: ${isDark ? 'invert(1)' : 'none'};
        }
        input[type="date"]::-webkit-calendar-picker-indicator:hover {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default ProductionHistory;