import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function IdleReportsList() {
  const navigate = useNavigate();
  const [idleReportData, setIdleReportData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIdleReports = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/dashboard-tables/');
        const data = await response.json();
        if (data.success) {
          setIdleReportData(data.idle_reports);
        }
      } catch (error) {
        console.error('Error fetching idle reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIdleReports();
  }, []);

  return (
    <div style={{backgroundColor: '#0f172a', minHeight: '100vh', color: 'white', padding: '40px'}}>
      <div style={{maxWidth: '1200px', margin: '0 auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px'}}>
          <div>
            <h1 style={{fontSize: '32px', fontWeight: 'bold', margin: '0', color: 'white'}}>
              📝 Idle Reports List
            </h1>
            <p style={{color: '#94a3b8', margin: '5px 0 0 0'}}>
              Complete list of all idle case reports
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
              <p style={{color: '#94a3b8'}}>Loading idle reports...</p>
            </div>
          ) : (
            <div style={{overflowX: 'auto'}}>
              {idleReportData.length > 0 ? (
                <table style={{width: '100%', borderCollapse: 'collapse', fontSize: '14px'}}>
                  <thead style={{backgroundColor: '#374151', color: '#cbd5e1'}}>
                    <tr>
                      <th style={{padding: '15px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #4b5563'}}>ID</th>
                      <th style={{padding: '15px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #4b5563'}}>Machine No</th>
                      <th style={{padding: '15px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #4b5563'}}>Operator</th>
                      <th style={{padding: '15px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #4b5563'}}>Tool ID</th>
                      <th style={{padding: '15px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #4b5563'}}>Reason</th>
                      <th style={{padding: '15px', textAlign: 'left', fontWeight: '600', borderBottom: '1px solid #4b5563'}}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {idleReportData.map((item) => (
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
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #374151', color: '#e2e8f0'}}>{item.tool_id}</td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #374151', color: '#e2e8f0'}}>
                          <span style={{
                            padding: '4px 8px', borderRadius: '4px', backgroundColor: '#dc2626',
                            color: 'white', fontSize: '12px'
                          }}>
                            {item.reason}
                          </span>
                        </td>
                        <td style={{padding: '12px 15px', borderBottom: '1px solid #374151', color: '#e2e8f0'}}>{item.created_at}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{textAlign: 'center', color: '#94a3b8', padding: '40px 20px', fontStyle: 'italic'}}>
                  No idle reports found
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
