// src/components/Count52Live.js - Enhanced display
import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';

const API_BASE = 'http://127.0.0.1:8000';

export default function Count52Live() {
  const [rows, setRows] = useState([]);
  const pollRef = useRef(null);
  const url = useMemo(() => `${API_BASE}/api/count52-live/`, []);

  const fetchLive = useCallback(async () => {
    try {
      const resp = await fetch(url, { 
        headers: { Accept: 'application/json' }, 
        cache: 'no-store' 
      });
      const data = await resp.json();
      
      if (data?.success && Array.isArray(data.machines)) {
        setRows(data.machines);
      } else {
        setRows([]);
      }
    } catch (e) {
      console.error('COUNT52 fetch error:', e);
      setRows([]);
    }
  }, [url]);

  useEffect(() => {
    fetchLive();
    pollRef.current = setInterval(fetchLive, 1000);
    return () => pollRef.current && clearInterval(pollRef.current);
  }, [fetchLive]);

  const formatValue = (value, fallback = 'Unknown') => {
    if (value === null || value === undefined || value === '') return fallback;
    return value;
  };

  return (
    <div style={{ padding: 16, background: '#0f172a', color: 'white', minHeight: '100vh' }}>
      <h2 style={{ marginTop: 0 }}>COUNT52 Node Live Data</h2>
      <p style={{ color: '#9ca3af', marginBottom: 16 }}>
        Plant 2 • Machines 11-15 • Node-RED Compatible Parsing
      </p>
      
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
          <thead>
            <tr style={{ background: '#374151' }}>
              <th style={{ textAlign: 'left', padding: 12 }}>Plant</th>
              <th style={{ textAlign: 'left', padding: 12 }}>Machine</th>
              <th style={{ textAlign: 'left', padding: 12 }}>Tool ID</th>
              <th style={{ textAlign: 'right', padding: 12 }}>Count</th>
              <th style={{ textAlign: 'right', padding: 12 }}>Shut Height</th>
              <th style={{ textAlign: 'left', padding: 12 }}>Last Seen</th>
              <th style={{ textAlign: 'center', padding: 12 }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ padding: 20, textAlign: 'center', color: '#6b7280' }}>
                  No machine data received yet...
                </td>
              </tr>
            ) : (
              rows.map((machine, i) => (
                <tr key={machine.machine_no} style={{ borderBottom: '1px solid #1f2937' }}>
                  <td style={{ padding: 12 }}>{machine.plant}</td>
                  <td style={{ padding: 12, fontWeight: 'bold' }}>
                    M{String(machine.machine_no).padStart(3, '0')}
                  </td>
                  <td style={{ padding: 12, fontFamily: 'monospace', fontSize: '11px' }}>
                    {formatValue(machine.tool_id, 'Unknown')}
                  </td>
                  <td style={{ padding: 12, textAlign: 'right', fontWeight: 'bold' }}>
                    {machine.count}
                  </td>
                  <td style={{ padding: 12, textAlign: 'right' }}>
                    {machine.shut_height !== null ? 
                      machine.shut_height.toFixed(2) : 'Unknown'}
                  </td>
                  <td style={{ padding: 12, fontSize: '11px', color: '#9ca3af' }}>
                    {formatValue(machine.last_seen, 'Unknown')}
                  </td>
                  <td style={{ padding: 12, textAlign: 'center' }}>
                    <span style={{
                      background: machine.status === 'Running' ? '#10b981' : 
                                 machine.status === 'Idle' ? '#f59e0b' : '#ef4444',
                      color: 'white', 
                      padding: '3px 8px', 
                      borderRadius: 4, 
                      fontSize: '11px',
                      fontWeight: 600
                    }}>
                      {machine.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {rows.length > 0 && (
        <div style={{ marginTop: 16, padding: 12, background: '#111827', borderRadius: 8, fontSize: '12px', color: '#6b7280' }}>
          <p><strong>Data Processing:</strong> Node-RED compatible parsing • Unknown values for missing/invalid data</p>
          <p><strong>Shut Height:</strong> Last 5 digits with 2 decimals • Count increments per machine message</p>
        </div>
      )}
    </div>
  );
}
