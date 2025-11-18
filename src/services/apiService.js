// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

// class ApiService {
//   static async get(endpoint, params = {}) {
//     try {
//       const url = new URL(`${API_BASE_URL}${endpoint}`);
//       Object.keys(params).forEach(key => {
//         url.searchParams.append(key, params[key]);
//       });
      
//       console.log('🔍 API Call:', url.toString());
      
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const data = await response.json();
//       console.log('✅ API Success:', data);
//       return data;
      
//     } catch (error) {
//       console.error(`❌ API Error ${endpoint}:`, error);
//       throw error;
//     }
//   }
  
//   static async post(endpoint, body = {}) {
//     try {
//       const url = `${API_BASE_URL}${endpoint}`;
//       console.log('🔍 POST API Call:', url, body);
      
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body)
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const data = await response.json();
//       console.log('✅ POST Success:', data);
//       return data;
      
//     } catch (error) {
//       console.error(`❌ POST Error ${endpoint}:`, error);
//       throw error;
//     }
//   }
// }

// // Export specific API functions
// export const getDashboardData = (date, plant = 'plant2_data') => 
//   ApiService.get('/api/dashboard/', { date, plant });

// export const getPlant2Live = () => 
//   ApiService.get('/api/plant2-live/');

// export const getPlant1Live = () => 
//   ApiService.get('/api/plant1-live/');


// export const getMachines = () => 
//   ApiService.get('/api/machines/');

// export const getAvailableDates = (plant = 'plant2_data') => 
//   ApiService.get('/api/available-dates/', { plant });


// export const getMessages = () => 
//   ApiService.get('/api/messages/');

// export const saveOperatorAssignment = (assignmentData) => 
//   ApiService.post('/api/assign-operator/', assignmentData);

// export default ApiService;



// // src/services/ApiService.js - ENHANCED WITH ALL NEW DASHBOARD APIs
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

// class ApiService {
//   static async get(endpoint, params = {}) {
//     try {
//       const url = new URL(`${API_BASE_URL}${endpoint}`);
      
//       // Only append params that have values
//       Object.keys(params).forEach(key => {
//         if (params[key] !== '' && params[key] !== null && params[key] !== undefined) {
//           url.searchParams.append(key, params[key]);
//         }
//       });
      
//       console.log('🔍 API Call:', url.toString());
      
//       const response = await fetch(url, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const data = await response.json();
//       console.log('✅ API Success:', data);
//       return data;
      
//     } catch (error) {
//       console.error(`❌ API Error ${endpoint}:`, error);
//       throw error;
//     }
//   }
  
//   static async post(endpoint, body = {}) {
//     try {
//       const url = `${API_BASE_URL}${endpoint}`;
//       console.log('🔍 POST API Call:', url, body);
      
//       const response = await fetch(url, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(body)
//       });
      
//       if (!response.ok) {
//         throw new Error(`HTTP ${response.status}: ${response.statusText}`);
//       }
      
//       const data = await response.json();
//       console.log('✅ POST Success:', data);
//       return data;
      
//     } catch (error) {
//       console.error(`❌ POST Error ${endpoint}:`, error);
//       throw error;
//     }
//   }
// }

// // 🔥 ENHANCED: Dashboard API functions with all filters
// export const getDashboardData = (params = {}) => {
//   const { date, plant = 'plant1_data', shift, hour, machine } = params;
  
//   console.log('🔍 Dashboard API params:', { date, plant, shift, hour, machine });
  
//   return ApiService.get('/api/dashboard/', {
//     date,
//     plant,
//     ...(shift && { shift }),
//     ...(hour && { hour }),
//     ...(machine && { machine })
//   });
// };

// // 🔥 NEW: Hourly production data for charts
// export const getHourlyProductionData = (params = {}) => {
//   const { date, plant = 'plant1_data', shift, machine } = params;
  
//   console.log('📊 Hourly Production API params:', { date, plant, shift, machine });
  
//   return ApiService.get('/api/api/hourly-production/', {
//     date,
//     plant,
//     ...(shift && { shift }),
//     ...(machine && { machine })
//   });
// };

// // 🔥 NEW: Machine-wise production data for charts
// export const getMachineProductionData = (params = {}) => {
//   const { date, plant = 'plant1_data', shift, hour } = params;
  
//   console.log('🔧 Machine Production API params:', { date, plant, shift, hour });
  
//   return ApiService.get('/api/api/machine-production/', {
//     date,
//     plant,
//     ...(shift && { shift }),
//     ...(hour && { hour })
//   });
// };

// // 🔥 NEW: Production line status data for monitoring section
// export const getProductionLineStatusData = (params = {}) => {
//   const { date, plant = 'plant1_data', shift } = params;
  
//   console.log('📋 Production Line Status API params:', { date, plant, shift });
  
//   return ApiService.get('/api/api/production-line-status/', {
//     date,
//     plant,
//     ...(shift && { shift })
//   });
// };

// // 🔥 UPDATED: Available dates with plant parameter
// export const getAvailableDates = (plant = 'plant1_data') => {
//   console.log('📅 Available Dates API for plant:', plant);
//   return ApiService.get('/api/available-dates/', { plant });
// };

// // Your existing API functions - keeping them all
// export const getPlant2Live = () => 
//   ApiService.get('/api/plant2-live/');

// export const getPlant1Live = () => 
//   ApiService.get('/api/plant1-live/');

// export const getMachines = () => 
//   ApiService.get('/api/machines/');

// export const getMessages = () => 
//   ApiService.get('/api/messages/');

// export const saveOperatorAssignment = (assignmentData) => 
//   ApiService.post('/api/assign-operator/', assignmentData);

// // 🔥 NEW: Assignment and idle data for tables
// export const getAssignmentIdleData = (params = {}) => {
//   const { date, shift, plant = 'plant1_data' } = params;
//   return ApiService.get('/api/dashboard-tables/', {
//     date,
//     plant,
//     ...(shift && { shift })
//   });
// };

// // 🔥 NEW: Auto-fill data for idle case
// export const getAutoFillData = (machineNo) => 
//   ApiService.get(`/api/machines/${machineNo}/auto-fill/`);

// // 🔥 NEW: Create idle report
// export const createIdleReport = (reportData) => 
//   ApiService.post('/api/idle-reports/', reportData);

// // 🔥 NEW: Create operator assignment
// export const createAssignment = (assignmentData) => 
//   ApiService.post('/api/assignments/', assignmentData);

// export default ApiService;



// src/services/ApiService.js - COMPLETELY FIXED WITH CORRECT ENDPOINTS
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:8000';

class ApiService {
  static async get(endpoint, params = {}) {
    try {
      const url = new URL(`${API_BASE_URL}${endpoint}`);
      
      // Only append params that have values
      Object.keys(params).forEach(key => {
        if (params[key] !== '' && params[key] !== null && params[key] !== undefined) {
          url.searchParams.append(key, params[key]);
        }
      });
      
      console.log('🔍 API Call:', url.toString());
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ API Success:', data);
      return data;
      
    } catch (error) {
      console.error(`❌ API Error ${endpoint}:`, error);
      throw error;
    }
  }
  
  static async post(endpoint, body = {}) {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      console.log('🔍 POST API Call:', url, body);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('✅ POST Success:', data);
      return data;
      
    } catch (error) {
      console.error(`❌ POST Error ${endpoint}:`, error);
      throw error;
    }
  }
}

// 🔥 FIXED: Main Dashboard API - Matches your backend exactly
export const getDashboardData = (params = {}) => {
  const { date, plant = 'plant1_data', shift, hour, machine } = params;
  
  console.log('🔍 Dashboard API params:', { date, plant, shift, hour, machine });
  
  return ApiService.get('/api/dashboard/', {
    date,
    plant,
    ...(shift && { shift }),
    ...(hour && { hour }),
    ...(machine && { machine })
  });
};

// 🔥 FIXED: Hourly production - Correct endpoint
export const getHourlyProductionData = (params = {}) => {
  const { date, plant = 'plant1_data', shift, machine } = params;
  
  console.log('📊 Hourly Production API params:', { date, plant, shift, machine });
  
  return ApiService.get('/api/hourly-production/', {  // ✅ Fixed: No double '/api'
    date,
    plant,
    ...(shift && { shift }),
    ...(machine && { machine })
  });
};

// 🔥 FIXED: Machine production - Correct endpoint with all filters
export const getMachineProductionData = (params = {}) => {
  const { date, plant = 'plant1_data', shift, hour, machine, start_hour, end_hour } = params;
  
  console.log('🔧 Machine Production API params:', { date, plant, shift, hour, machine, start_hour, end_hour });
  
  return ApiService.get('/api/machine-production/', {  // ✅ Fixed: No double '/api'
    date,
    plant,
    ...(shift && { shift }),
    ...(hour && { hour }),
    ...(machine && { machine }),
    ...(start_hour && { start_hour }),
    ...(end_hour && { end_hour })
  });
};

// 🔥 FIXED: Production line status - Correct endpoint
export const getProductionLineStatusData = (params = {}) => {
  const { date, plant = 'plant1_data', shift } = params;
  
  console.log('📋 Production Line Status API params:', { date, plant, shift });
  
  return ApiService.get('/api/production-line-status/', {  // ✅ Fixed: No double '/api'
    date,
    plant,
    ...(shift && { shift })
  });
};

// 🔥 FIXED: Available dates - Correct endpoint
export const getAvailableDates = (plant = 'plant1_data') => {
  console.log('📅 Available Dates API for plant:', plant);
  return ApiService.get('/api/available-dates/', { plant });
};

// 🔥 NEW: Assignment and idle data for dashboard tables
export const getAssignmentIdleData = (params = {}) => {
  const { date, shift, plant = 'plant1_data' } = params;
  
  console.log('📊 Dashboard Tables API params:', { date, shift, plant });
  
  return ApiService.get('/api/dashboard-tables/', {
    date,
    plant,
    ...(shift && { shift })
  });
};

// 🔥 NEW: Auto-fill data for idle case forms
export const getAutoFillData = (machineNo) => {
  console.log('🔧 Auto-fill API for machine:', machineNo);
  return ApiService.get(`/api/machines/${machineNo}/auto-fill/`);
};

// 🔥 NEW: Create idle report
export const createIdleReport = (reportData) => {
  console.log('📝 Creating idle report:', reportData);
  return ApiService.post('/api/idle-reports/', reportData);
};

// 🔥 NEW: Create operator assignment
export const createAssignment = (assignmentData) => {
  console.log('👷 Creating assignment:', assignmentData);
  return ApiService.post('/api/assignments/', assignmentData);
};

// 🔥 ENHANCED: Live data endpoints (your existing ones)
export const getPlant1Live = () => {
  console.log('🏭 Getting Plant 1 live data');
  return ApiService.get('/api/plant1-live/');
};

export const getPlant2Live = () => {
  console.log('🏭 Getting Plant 2 live data');
  return ApiService.get('/api/plant2-live/');
};

export const getMachines = () => {
  console.log('🔧 Getting all machines');
  return ApiService.get('/api/machines/');
};

export const getMessages = () => {
  console.log('💬 Getting messages');
  return ApiService.get('/api/messages/');
};

// 🔥 LEGACY: Keep for backward compatibility
export const saveOperatorAssignment = (assignmentData) => {
  console.log('👷 Saving operator assignment (legacy):', assignmentData);
  return ApiService.post('/api/assign-operator/', assignmentData);
};

// 🔥 UTILITY: Test API connection
export const testConnection = async () => {
  try {
    console.log('🔍 Testing API connection...');
    const response = await ApiService.get('/api/dashboard/', { 
      date: new Date().toISOString().split('T')[0], 
      plant: 'plant1_data' 
    });
    console.log('✅ API Connection successful');
    return { success: true, data: response };
  } catch (error) {
    console.error('❌ API Connection failed:', error);
    return { success: false, error: error.message };
  }
};

// 🔥 UTILITY: Get all plants data for comparison
export const getAllPlantsData = async (params = {}) => {
  try {
    console.log('🏭 Getting all plants data...');
    
    const [plant1Data, plant2Data] = await Promise.all([
      getDashboardData({ ...params, plant: 'plant1_data' }),
      getDashboardData({ ...params, plant: 'plant2_data' })
    ]);
    
    return {
      success: true,
      plant1: plant1Data,
      plant2: plant2Data,
      comparison: {
        plant1_production: plant1Data.dashboard_data?.total_production || 0,
        plant2_production: plant2Data.dashboard_data?.total_production || 0,
        plant1_machines: plant1Data.dashboard_data?.total_machines || 0,
        plant2_machines: plant2Data.dashboard_data?.total_machines || 0,
        plant1_running: plant1Data.dashboard_data?.running_machines || 0,
        plant2_running: plant2Data.dashboard_data?.running_machines || 0
      }
    };
  } catch (error) {
    console.error('❌ Error getting all plants data:', error);
    return { success: false, error: error.message };
  }
};

export default ApiService;
