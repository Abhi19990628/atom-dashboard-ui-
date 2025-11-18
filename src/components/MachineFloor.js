import React, { useEffect, useMemo, useRef, useState } from 'react';
import { PLANT2_LAYOUT, PLANT1_LAYOUT, TILE_W, TILE_H, COLOR_RUNNING, COLOR_IDLE, COLOR_DOWN } from '../constants/plantLayouts';

const API_BASE = 'http://127.0.0.1:8000';

const statusColor = (s) => s === 'Running' ? COLOR_RUNNING : s === 'Idle' ? COLOR_IDLE : COLOR_DOWN;

function computeIdle(prev, cur, idleWindowSec) {
  if (!prev) return false;
  if (cur.status !== 'Running') return false;
  if (typeof cur.count === 'number' && typeof prev.count === 'number') {
    if (cur.count <= prev.count) {
      const tPrev = new Date(prev.last_seen || 0).getTime();
      const tCur  = new Date(cur.last_seen || 0).getTime();
      if (tPrev && tCur) {
        const dt = (tCur - tPrev)/1000;
        return dt >= idleWindowSec;
      }
    }
  }
  return false;
}

export default function MachineFloor() {
  const [plant, setPlant] = useState(2);
  const [staleAfter, setStaleAfter] = useState(120);
  const [idleWindow, setIdleWindow] = useState(30);
  const [live, setLive] = useState({});
  const [prev, setPrev] = useState({});
  const [sel, setSel] = useState(null);
  const pollRef = useRef(null);

  const layout = useMemo(()=> plant === 2 ? PLANT2_LAYOUT : PLANT1_LAYOUT, [plant]);
  const url = useMemo(()=> `${API_BASE}/api/live-machines/?plant=${plant}&stale_after=${staleAfter}`, [plant, staleAfter]);

  const fetchLive = async () => {
    try {
      const resp = await fetch(url, { headers: { Accept: 'application/json' }, cache: 'no-store' });
      const data = await resp.json();
      if (data?.success && Array.isArray(data.machines)) {
        const map = {};
        data.machines.forEach(r => { map[r.machine_no] = r; });

        const enhanced = {};
        Object.entries(map).forEach(([m, rec]) => {
          const p = prev[m];
          const idle = computeIdle(p, rec, idleWindow);
          enhanced[m] = { ...rec, status: idle ? 'Idle' : rec.status };
        });

        setPrev(live);
        setLive(enhanced);
      }
    } catch(e) {
      console.error('live fetch error', e);
    }
  };

  useEffect(()=>{
    fetchLive();
    pollRef.current = setInterval(fetchLive, 1000);
    return ()=> pollRef.current && clearInterval(pollRef.current);
  }, [url, idleWindow]);

  const tiles = Object.keys(layout).map(n => Number(n)).sort((a,b)=>a-b).map(n => {
    const pos = layout[n];
    const rec = live[n];
    const status = rec?.status || 'No Data';
    const bg = statusColor(status);
    return (
      <div key={n}
           onClick={()=> rec && setSel(rec)}
           style={{
             position: 'absolute', left: pos.x, top: pos.y, width: TILE_W, height: TILE_H,
             borderRadius: 16, background: bg, color: 'white',
             display: 'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
             boxShadow:'0 6px 12px rgba(0,0,0,0.25)', cursor: rec ? 'pointer' : 'default'
           }}>
        <div style={{ fontWeight: 800, fontSize: 18 }}>M{String(n).padStart(3,'0')}</div>
        <div style={{ fontSize: 14 }}>Cnt: {rec?.count ?? '-'}</div>
      </div>
    );
  });

  return (
    <div style={{ padding: 16, background: '#0f172a', color: 'white', minHeight: '100vh' }}>
      <h2 style={{ marginTop: 0 }}>Plant {plant} Floor</h2>
      <div style={{ display:'flex', gap:10, marginBottom:12 }}>
        <select value={plant} onChange={(e)=> setPlant(Number(e.target.value))} style={{ padding:8, borderRadius:8 }}>
          <option value={1}>Plant 1</option>
          <option value={2}>Plant 2</option>
        </select>
        <label style={{ display:'flex', alignItems:'center', gap:8 }}>
          Stale (sec):
          <input type="number" min={30} value={staleAfter}
                 onChange={(e)=> setStaleAfter(Number(e.target.value || 120))}
                 style={{ width:90, padding:8, borderRadius:8 }}/>
        </label>
        <label style={{ display:'flex', alignItems:'center', gap:8 }}>
          Idle (sec):
          <input type="number" min={10} value={idleWindow}
                 onChange={(e)=> setIdleWindow(Number(e.target.value || 30))}
                 style={{ width:90, padding:8, borderRadius:8 }}/>
        </label>
      </div>

      <div style={{
        position:'relative', width:1500, height:800, borderRadius:16, background:'#111827',
        backgroundImage:'linear-gradient(transparent 24px,#1f2937 25px),linear-gradient(90deg, transparent 24px,#1f2937 25px)',
        backgroundSize:'25px 25px', overflow:'hidden'
      }}>
        {tiles}
      </div>

      {sel && (
        <div onClick={()=> setSel(null)} style={{
          position:'fixed', inset:0, background:'rgba(0,0,0,0.5)',
          display:'flex', alignItems:'center', justifyContent:'center'
        }}>
          <div onClick={(e)=> e.stopPropagation()}
               style={{ width:520, background:'#0b1222', color:'white', borderRadius:16, padding:18 }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <h3 style={{ margin:0 }}>
                CNC Machine M{String(sel.machine_no).padStart(3,'0')}
              </h3>
              <button onClick={()=> setSel(null)} style={{ background:'transparent', color:'white', border:'none', fontSize:20 }}>×</button>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, marginTop:12 }}>
              <Box title="Plant" value={sel.plant} />
              <Box title="Tool ID" value={sel.tool_id || 'Unknown'} />
              <Box title="Count" value={sel.count} />
              <Box title="Shut Height" value={sel.shut_height ?? '-'} />
              <Box title="Last Seen (UTC)" value={sel.last_seen || '-'} />
              <Box title="Status" value={sel.status} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Box({ title, value }) {
  return (
    <div style={{ background:'#0f1a33', padding:12, borderRadius:12 }}>
      <div style={{ color:'#9ca3af', fontSize:13 }}>{title}</div>
      <div style={{ fontWeight:700, fontSize:18, marginTop:4 }}>{value}</div>
    </div>
  );
}