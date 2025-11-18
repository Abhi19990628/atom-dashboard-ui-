import React, { useState } from "react";

function Auth() {
  const [isSignup, setIsSignup] = useState(true);

  return (
    <div className="d-flex vh-100">
      {/* Left Side */}
      <div
        className="d-flex flex-column justify-content-center align-items-center text-white p-5"
        style={{ flex: 1, background: "#25bcd7" }}
      >
        <img src="/atomone_logo.jpg" alt="Logo" width="120" className="mb-4" />
        <h2 className="fw-bold">Welcome to AtomOne</h2>
        <p className="text-center">
          Manage shifts, assign machines and track idle cases seamlessly.
        </p>
      </div>

      {/* Right Side */}
      <div className="d-flex flex-column justify-content-center p-5" style={{ flex: 1, background: "#fff" }}>
        <h3 className="fw-bold mb-3">
          {isSignup ? "Create an Account" : "Login to your Account"}
        </h3>
        <p>
          {isSignup ? (
            <>
              Already have an account?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => setIsSignup(false)}
              >
                Sign in here
              </button>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <button
                className="btn btn-link p-0"
                onClick={() => setIsSignup(true)}
              >
                Create one
              </button>
            </>
          )}
        </p>

        {/* Google Sign in */}
        <button className="btn btn-light border mb-3 w-100">
          <img
          src="https://developers.google.com/identity/images/g-logo.png" alt="Google" width="20" className="me-2"
          />
          Sign in with Google
        </button>

        <div className="text-center my-2">OR</div>

        {/* Signup / Login Form */}
        <form>
          {isSignup && (
            <div className="row">
              <div className="col">
                <input
                  type="text"
                  placeholder="First Name"
                  className="form-control mb-3"
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  placeholder="Last Name"
                  className="form-control mb-3"
                />
              </div>
            </div>
          )}

          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
          />

          <input
            type="password"
            placeholder="Password"
            className="form-control mb-3"
          />

          {isSignup && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="form-control mb-3"
            />
          )}

          {isSignup && (
            <div className="form-check mb-3">
              <input type="checkbox" className="form-check-input" id="agree" />
              <label className="form-check-label" htmlFor="agree">
                I Agree <a href="#">Terms and Conditions</a>
              </label>
            </div>
          )}

          <button type="submit" className="btn btn-primary w-100">
            {isSignup ? "Sign Up" : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Auth;
