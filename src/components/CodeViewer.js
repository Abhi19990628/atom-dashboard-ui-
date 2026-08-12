import React, { useState } from "react";

const PASSWORD = "vishehsir123";

export default function CodeViewer() {
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const handleLogin = async () => {
    if (password !== PASSWORD) {
      alert("Wrong Password");
      return;
    }

    const response = await fetch("/BinTrollingprint.js");
    const text = await response.text();

    setCode(text);
    setAuthorized(true);
  };

  if (!authorized) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f4f6f9",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial",
        }}
      >
        <div
          style={{
            width: "400px",
            background: "#fff",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.2)",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              marginBottom: "25px",
              color: "#333",
            }}
          >
            🔒 Protected Source Code
          </h2>

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              marginBottom: "20px",
              outline: "none",
              boxSizing: "border-box",
            }}
          />

          <button
            onClick={handleLogin}
            style={{
              width: "100%",
              padding: "12px",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              fontSize: "16px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            View Source Code
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#1e1e1e",
        minHeight: "100vh",
        padding: "20px",
      }}
    >
      <pre
        style={{
          color: "#d4d4d4",
          fontSize: "14px",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
          overflowX: "auto",
        }}
      >
        {code}
      </pre>
    </div>
  );
}