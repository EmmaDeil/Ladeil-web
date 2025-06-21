import React, { useState } from "react";
import { Link } from "react-router-dom";

const SignupModal = ({ show, onClose }) => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      // Replace URL with your backend endpoint
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Signup failed");
      // Handle success (e.g., close modal, show message, redirect)
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`modal fade${show ? " show d-block" : ""}`}
      tabIndex="-1"
      style={{ background: show ? "rgba(0,0,0,0.5)" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sign Up</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="signupFullName" className="form-label">
                  Full Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="signupFullName"
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signupEmail" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="signupEmail"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signupPhone" className="form-label">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="form-control"
                  id="signupPhone"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signupPassword" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="signupPassword"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="signupConfirmPassword" className="form-label">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="signupConfirmPassword"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={loading}
              >
                {loading ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const SigninModal = ({ show, onClose, onAdminSuccess }) => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Admin login: email admin@admin.com, password admin123
      if (form.email === "admin@admin.com" && form.password === "admin123") {
        setSuccess(true);
        setTimeout(() => {
          if (onAdminSuccess) onAdminSuccess();
          setSuccess(false);
          onClose();
        }, 1200);
        return;
      }
      // Replace URL with your backend endpoint for user login
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Sign in failed");
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`modal fade${show ? " show d-block" : ""}`}
      tabIndex="-1"
      style={{ background: show ? "rgba(0,0,0,0.5)" : "none" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Sign In</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {success && (
              <div className="alert alert-success text-center">
                Sign in successful! Redirecting...
              </div>
            )}
            {error && <div className="alert alert-danger">{error}</div>}
            {!success && (
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="signinEmail" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="signinEmail"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="signinPassword" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="signinPassword"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary w-100"
                  disabled={loading}
                >
                  {loading ? "Signing In..." : "Sign In"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ SigninModalProps }) => {
  const [authMode, setAuthMode] = useState("default"); // 'default', 'signin', 'signup'
  const [showSignup, setShowSignup] = useState(false);
  const [showSignin, setShowSignin] = useState(false);

  const handleGetStarted = () => {
    setAuthMode("signin");
    setShowSignin(true);
  };

  const handleSignIn = () => {
    setAuthMode("signin");
    setShowSignin(true);
    setShowSignup(false);
  };

  const handleSignUp = () => {
    setAuthMode("signup");
    setShowSignup(true);
    setShowSignin(false);
  };

  const handleCloseModals = () => {
    setShowSignup(false);
    setShowSignin(false);
  };

  return (
    <div>
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <i className="bi bi-bootstrap-fill me-2"></i>
            FACLPRO
          </Link>
          <ul className="nav justify-content-end">
            <li className="nav-item">
              <Link className="nav-link active" to="/" aria-current="page">
                Services
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/customers">
                Customers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/pricing">
                Pricing
              </Link>
            </li>
            <li className="nav-item ms-2">
              {authMode === "default" && (
                <button className="btn btn-primary" onClick={handleGetStarted}>
                  Get Started
                </button>
              )}
              {authMode === "signin" && (
                <>
                  <button
                    className="btn btn-outline-primary me-2"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </button>
                  <button className="btn btn-primary" onClick={handleSignIn}>
                    Sign In
                  </button>
                </>
              )}
              {authMode === "signup" && (
                <>
                  <button
                    className="btn btn-primary me-2"
                    onClick={handleSignIn}
                  >
                    Sign In
                  </button>
                  <button
                    className="btn btn-outline-primary"
                    onClick={handleSignUp}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <SignupModal show={showSignup} onClose={handleCloseModals} />
      <SigninModal
        show={showSignin}
        onClose={handleCloseModals}
        onAdminSuccess={SigninModalProps?.onAdminSuccess}
      />
    </div>
  );
};

export default Navbar;
