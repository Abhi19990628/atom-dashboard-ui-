import './index.css';              
import 'bootstrap/dist/css/bootstrap.min.css';
import Count52Live from './components/Count52Live';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import AssignMachine from './components/AssignMachine';
import IdleCase from './components/IdleCase';
import MachineAssignments from './components/MachineAssignments'; // NEW
import IdleReportsList from './components/IdleReportsList'; // NEW
import MachinesStatus from './components/MachinesStatus';
import MachineFloor from './components/MachineFloor';
import Count52Raw from './components/Count52Raw';
import Plant2Live from './components/Plant2Live';
import Plant1Live from './components/Plant1Live';
import './App.css';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Testing ke liye


  const handleLogin = () => {
    setIsAuthenticated(true);
  };


  const handleLogout = () => {
    setIsAuthenticated(false);
  };


  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Default Route */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          {/* Dashboard Route */}
          <Route path="/dashboard" element={<Dashboard onLogout={handleLogout} />} />


          {/* Assign Machine Route */}
          <Route path="/assign-machine" element={<AssignMachine onLogout={handleLogout} />} />


          {/* Idle Case Route */}
          <Route path="/idle-case" element={<IdleCase onLogout={handleLogout} />} />


          {/* ADDED: Missing Idle Report Submit Route */}
          <Route path="/idle-report-submit" element={<IdleCase onLogout={handleLogout} />} />
          
          {/* NEW: Machine Assignments Route */}
          <Route path="/machine-assignments" element={<MachineAssignments />} />


          {/* NEW: Idle Reports List Route */}
          <Route path="/idle-reports-list" element={<IdleReportsList />} />


          <Route path="/machines-status" element={<MachinesStatus />} />


          {/* New route */}
          <Route path="/count52" element={<Count52Live />} />



          {/* <Route path="/count52-raw" element={<Count52Raw />} /> */}


          {/* <Route path="/plant2-raw" element={<Plant2Raw />} /> */}


          <Route path="/plant2-live" element={<Plant2Live />} />
          <Route path="/plant1-live" element={<Plant1Live />} />
          


          
          {/* 404 Route */}
          <Route 
            path="*" 
            element={
              <div style={{
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                backgroundColor: '#0f172a',
                color: 'white',
                fontSize: '24px'
              }}>
                Page Not Found - 404
              </div>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}


export default App;
