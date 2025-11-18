import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function MachineAssignments() {
  const navigate = useNavigate();
  const [assignmentData, setAssignmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/dashboard-tables/');
        const data = await response.json();
        if (data.success) {
          setAssignmentData(data.assignments);
        }
      } catch (error) {
        console.error('Error fetching assignments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  return (
    <div style={{backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', padding: '40px'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
          <div>
            <h1 style={{fontSize: '32px', fontWeight: 'bold', margin: '0', color: 'white'}}>
              🔗 Machine Assignments
            </h1>
            <p style={{color: '#94a3b8', margin: '5px 0 0 0'}}>
              Complete list of all machine operator assignments
            </p>
          </div>
          <button 
            onClick={() => navigate('/dashboard')}
            style={{
              backgroundColor: '#374151', border: 'none', borderRadius: '8px', padding: '10px 20px',
              color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#4b5563'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#374151'}
          >
            ← Back to Dashboard
          </button>
        </div>

        <div style={{backgroundColor: '#1e293b', borderRadius: '12px', border: '1px solid #334155', padding: '30px'}}>
          {loading ? (
            <div style={{textAlign: 'center', padding: '40px'}}>
              <p style={{color: '#94a3b8'}}>Loading assignments...</p>
            </div>
          ) : (
            <div style={{overflowX: 'auto'}}>
              {assignmentData.length > 0 ? (
                <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '14px'}}>
                  <thead style={{backgroundColor: '#374151', color: '#cbd5e1'}}>
                    <tr>
                      <th style={{padding: '15px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #4b5563'}}>ID</th>
                      <th style={{padding: '15px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #4b5563'}}>Machine No</th>
                      <th style={{padding: '15px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #4b5563'}}>Operator Name</th>
                      <th style={{padding: '15px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #4b5563'}}>Shift</th>
                      <th style={{padding: '15px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #4b5563'}}>Start Time</th>
                      <th style={{padding: '15px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #4b5563'}}>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {assignmentData.map((item) => (
                      <tr 
                        key={item.id}
                        style={{transition: 'background-color 0.2s ease'}}
                        onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#374151'}
                        onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                      >
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #374151', color: '#e2e8f0'}}>#{item.id}</td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #374151', color: '#e2e8f0'}}>
                          <strong style={{color: 'white'}}>Machine {item.machine_no}</strong>
                        </td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #374151', color: '#e2e8f0'}}>{item.operator_name}</td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #374151', color: '#e2e8f0'}}>
                          <span style={{
                            padding: '4px 8px', borderRadius: '4px',
                            backgroundColor: item.shift === 'A' ? '#10b981' : '#f59e0b',
                            color: 'white', fontSize: '12px'
                          }}>
                            Shift {item.shift}
                          </span>
                        </td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #374151', color: '#e2e8f0'}}>{item.start_time}</td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #374151', color: '#e2e8f0'}}>{item.created_at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{textAlign: 'center', color: '#94a3b8', padding: '40px 20px', fontStyle: 'italic'}}>
                  No machine assignments found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
