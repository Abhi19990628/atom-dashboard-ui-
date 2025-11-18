import React, { useEffect, useMemo, useRef, useState } from 'react';

// Adjust baseURL if you use a proxy; otherwise keep absolute URL
const API_BASE = 'http://127.0.0.1:8000';

export default function MachinesStatus() {
  const [plant, setPlant] = useState('Plant 1'); // 'Plant 1' | 'Plant 2'
  const [staleAfter, setStaleAfter] = useState(120); // seconds
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);
  const pollRef = useRef(null);

  const url = useMemo(() => {
    const p = encodeURIComponent(plant);
    return `${API_BASE}/api/machines-status/?plant=${p}&stale_after=${staleAfter}`;
  }, [plant, staleAfter]);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      setErr(null);
      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        credentials: 'include', // safe if same-origin; remove if not needed
      });
      if (!resp.ok) {
        throw new Error(`HTTP ${resp.status}`);
      }
      const data = await resp.json();
      if (data && data.success && Array.isArray(data.machines)) {
        setRows(data.machines);
      } else {
        setRows([]);
      }
    } catch (e) {
      console.error('Fetch status error:', e);
      setErr(String(e.message || e));
      setRows([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial fetch
    fetchStatus();
    // polling every 5s; cleanup on unmount or deps change
    pollRef.current = setInterval(fetchStatus, 5000);
    return () => {
      if (pollRef.current) {
        clearInterval(pollRef.current);
        pollRef.current = null;
      }
    };
  }, [url]); // re-create polling when url changes

  const statusColor = (s) => {
    if (s === 'Running') return '#10b981';
    if (s === 'No Data') return '#ef4444';
    return '#6b7280';
  };

  return (
    <div style={{ padding: 20, color: 'white', background: '#0f172a', minHeight: '100vh' }}>
      <h2 style={{ marginTop: 0 }}>Machines Status</h2>

      <div style={{ display: 'flex', gap: 10, marginBottom: 15 }}>
        <select
          value={plant}
          onChange={(e) => setPlant(e.target.value)}
          style={{ padding: 8, borderRadius: 8 }}
        >
          <option>Plant 1</option>
          <option>Plant 2</option>
        </select>

        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          Stale (sec):
          <input
            type="number"
            min={30}
            value={staleAfter}
            onChange={(e) => setStaleAfter(Number(e.target.value || 60))}
            style={{ width: 90, padding: 8, borderRadius: 8 }}
          />
        </label>

        <button
          onClick={fetchStatus}
          style={{
            padding: '8px 12px',
            borderRadius: 8,
            background: '#7c3aed',
            color: 'white',
            border: 'none',
          }}
        >
          Refresh
        </button>
      </div>

      {err ? (
        <div style={{ color: '#fda4af', marginBottom: 10 }}>
          Error: {err}. Check server and CORS settings.
        </div>
      ) : null}

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#374151' }}>
                <th style={{ textAlign: 'left', padding: '12px' }}>Plant</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Topic</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Tool ID</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Last Value</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Last Seen (UTC)</th>
                <th style={{ textAlign: 'left', padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows && rows.length > 0 ? (
                rows.map((r, idx) => (
                  <tr key={`${r.plant}-${r.topic}-${idx}`} style={{ borderBottom: '1px solid #1f2937' }}>
                    <td style={{ padding: '10px' }}>{r.plant}</td>
                    <td style={{ padding: '10px' }}>{r.topic}</td>
                    <td style={{ padding: '10px' }}>{r.tool_id || '-'}</td>
                    <td style={{ padding: '10px' }}>{r.last_value ?? '-'}</td>
                    <td style={{ padding: '10px' }}>{r.last_seen}</td>
                    <td style={{ padding: '10px' }}>
                      <span
                        style={{
                          background: statusColor(r.status),
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: 6,
                          fontWeight: 600,
                        }}
                      >
                        {r.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '16px', color: '#9ca3af' }}>
                    No machines found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
