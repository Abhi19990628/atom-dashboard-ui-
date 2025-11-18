// src/components/Count52Raw.js - Simple raw data display
import React, { useEffect, useState, useRef } from 'react';

const API_BASE = 'http://127.0.0.1:8000';

export default function Count52Raw() {
  const [messages, setMessages] = useState([]);
  const pollRef = useRef(null);

  const fetchRawData = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/count52-raw/`, {
        cache: 'no-store'
      });
      const data = await response.json();
      
      if (data.success) {
        setMessages(data.raw_messages || []);
      }
    } catch (error) {
      console.error('Error fetching COUNT52 raw data:', error);
    }
  };

  useEffect(() => {
    fetchRawData();
    pollRef.current = setInterval(fetchRawData, 1000);
    
    return () => {
      if (pollRef.current) clearInterval(pollRef.current);
    };
  }, []);

  return (
    <div style={{ 
      padding: 20, 
      background: '#1a1a1a', 
      color: 'white', 
      minHeight: '100vh',
      fontFamily: 'monospace'
    }}>
      <h1 style={{ color: '#4ade80' }}>COUNT52 Raw Data</h1>
      <p style={{ color: '#6b7280' }}>
        Total Messages: {messages.length} | Auto-refresh every 1 second
      </p>
      
      <div style={{ 
        maxHeight: '80vh', 
        overflow: 'auto', 
        border: '1px solid #374151',
        borderRadius: 8,
        padding: 10
      }}>
        {messages.length === 0 ? (
          <div style={{ color: '#6b7280', textAlign: 'center', padding: 20 }}>
            No COUNT52 messages received yet...
          </div>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{ 
              marginBottom: 10, 
              padding: 10, 
              border: '1px solid #374151',
              borderRadius: 4,
              background: '#111827'
            }}>
              <div style={{ color: '#10b981', fontSize: '12px' }}>
                {msg.timestamp}
              </div>
              <div style={{ color: '#f59e0b', marginTop: 5 }}>
                Topic: {msg.topic}
              </div>
              <div style={{ 
                color: 'white', 
                marginTop: 5, 
                background: '#000',
                padding: 8,
                borderRadius: 4,
                fontWeight: 'bold'
              }}>
                Raw: {msg.raw_payload}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
