import React, { useState } from 'react';

const AdminNavbar = ({ onSignOut }) => (
  <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
    <div className="container-fluid">
      <span className="navbar-brand fw-bold">Admin Dashboard</span>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <button className="btn btn-link nav-link" style={{color: '#fff'}}>
            <i className="bi bi-person-circle me-1"></i> Profile
          </button>
        </li>
        <li className="nav-item">
          <button className="btn btn-link nav-link" style={{color: '#fff'}}>
            <i className="bi bi-gear me-1"></i> Settings
          </button>
        </li>
        <li className="nav-item">
          <button className="btn btn-link nav-link" style={{color: '#fff'}} onClick={onSignOut}>
            <i className="bi bi-box-arrow-right me-1"></i> Sign Out
          </button>
        </li>
      </ul>
    </div>
  </nav>
);

const AdminDashboard = ({ tasks, onSignOut }) => {
  return (
    <div>
      <AdminNavbar onSignOut={onSignOut} />
      <div className="container py-5">
        <h2 className="mb-4 fw-bold">Admin Dashboard</h2>
        <h4 className="mb-3">Contact Form Tasks</h4>
        <div className="card shadow border-0">
          <div className="card-body">
            {tasks.length === 0 ? (
              <p className="text-muted">No tasks yet.</p>
            ) : (
              <ul className="list-group">
                {tasks.map((task, idx) => (
                  <li key={idx} className="list-group-item">
                    <strong>{task.name}</strong> &lt;{task.email}&gt;<br />
                    <span className="text-muted">{task.subject}</span>
                    <div>{task.message}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
