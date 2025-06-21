import React, { useState, useEffect, useRef } from 'react';
// import jsPDF from 'jspdf';

const STATUS_OPTIONS = [
  'Not Started',
  'In Progress',
  'Lessons',
  'Done',
];

const PRIORITY_OPTIONS = ['Low', 'Medium', 'High', 'Urgent'];

const AdminNavbar = ({ onSignOut, onShowProfile, onShowSettings }) => (
  <nav className="navbar navbar-expand-lg navbar-dark  mb-4">
    <div className="container-fluid">
      <span className="navbar-brand fw-bold bg-dark">Admin Dashboard</span>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <button className="btn btn-link nav-link" style={{color: '#fff'}} onClick={onShowProfile}>
            <i className="bi bi-person-circle me-1"></i> Profile
          </button>
        </li>
        <li className="nav-item">
          <button className="btn btn-link nav-link" style={{color: '#fff'}} onClick={onShowSettings}>
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

const ProfileModal = ({ show, onClose }) => show ? (
  <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Admin Profile</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          <p><strong>Name:</strong> Admin User</p>
          <p><strong>Email:</strong> admin@admin.com</p>
        </div>
      </div>
    </div>
  </div>
) : null;

const SettingsModal = ({ show, onClose }) => show ? (
  <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Settings</h5>
          <button type="button" className="btn-close" onClick={onClose}></button>
        </div>
        <div className="modal-body">
          <p>Settings options can go here.</p>
        </div>
      </div>
    </div>
  </div>
) : null;

function formatDuration(ms) {
  if (!ms || ms < 0) return '0s';
  const sec = Math.floor((ms / 1000) % 60);
  const min = Math.floor((ms / (1000 * 60)) % 60);
  const hr = Math.floor((ms / (1000 * 60 * 60)));
  return `${hr > 0 ? hr + 'h ' : ''}${min > 0 ? min + 'm ' : ''}${sec}s`;
}

const TaskDetailsModal = ({ show, onClose, task, timeStats, totalTime, onAddComment, onUploadFile, onAssign, onPriorityChange }) => {
  const [comment, setComment] = useState('');
  const [assignee, setAssignee] = useState(task?.assignee || '');
  const [priority, setPriority] = useState(task?.priority || 'Medium');

  useEffect(() => {
    setAssignee(task?.assignee || '');
    setPriority(task?.priority || 'Medium');
  }, [task]);

  if (!show || !task) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{ background: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Task Details</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <p><strong>Name:</strong> {task.name}</p>
            <p><strong>Email:</strong> {task.email}</p>
            <p><strong>Subject:</strong> {task.subject}</p>
            <p><strong>Message:</strong> {task.message}</p>
            <p><strong>Status:</strong> {task.status}</p>
            <p><strong>Received:</strong> {task.receivedAt ? new Date(task.receivedAt).toLocaleString() : 'N/A'}</p>
            <div className="mb-2">
              <label><strong>Assignee:</strong></label>
              <input className="form-control" value={assignee} onChange={e => setAssignee(e.target.value)} onBlur={() => onAssign(assignee)} />
            </div>
            <div className="mb-2">
              <label><strong>Priority:</strong></label>
              <select className="form-select" value={priority} onChange={e => { setPriority(e.target.value); onPriorityChange(e.target.value); }}>
                {PRIORITY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <hr />
            <h6>Time spent in each category:</h6>
            <ul>
              {Object.entries(timeStats || {}).map(([status, ms]) => (
                <li key={status}><strong>{status}:</strong> {formatDuration(ms)}</li>
              ))}
            </ul>
            {task.status === 'Done' && (
              <div className="alert alert-success mt-3">
                <strong>Total time to complete:</strong> {formatDuration(totalTime)}
              </div>
            )}
            <hr />
            <h6>Comments</h6>
            <ul>
              {(task.comments || []).map((c, i) => <li key={i}>{c}</li>)}
            </ul>
            <div className="input-group mb-2">
              <input className="form-control" value={comment} onChange={e => setComment(e.target.value)} placeholder="Add comment..." />
              <button className="btn btn-primary" onClick={() => { onAddComment(comment); setComment(''); }}>Add</button>
            </div>
            <hr />
            <h6>Attachments</h6>
            <ul>
              {(task.attachments || []).map((file, i) => <li key={i}><a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a></li>)}
            </ul>
            <input type="file" className="form-control" onChange={e => onUploadFile(e.target.files[0])} />
            <hr />
            <h6>Activity Log</h6>
            <ul style={{ maxHeight: 120, overflowY: 'auto', fontSize: '0.95em' }}>
              {(task.activity || []).map((a, i) => <li key={i}>{new Date(a.timestamp).toLocaleString()} - {a.message}</li>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const TaskCard = ({ task, onDelete, onEdit, onShowDetails, timeStats, onSelect }) => {
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState(task);

  useEffect(() => { setEditForm(task); }, [task]);

  const handleEditChange = e => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleStatusChange = e => {
    onEdit({ ...task, status: e.target.value });
  };

  const handleEditSubmit = e => {
    e.preventDefault();
    onEdit(editForm);
    setEditing(false);
  };

  return (
    <div className="card shadow-sm mb-4" style={{ minWidth: 280, maxWidth: 350 }}>
      <div className="card-body">
        {editing ? (
          <form onSubmit={handleEditSubmit}>
            <input className="form-control mb-2" name="name" value={editForm.name} onChange={handleEditChange} required />
            <input className="form-control mb-2" name="email" value={editForm.email} onChange={handleEditChange} required />
            <input className="form-control mb-2" name="subject" value={editForm.subject} onChange={handleEditChange} />
            <textarea className="form-control mb-2" name="message" value={editForm.message} onChange={handleEditChange} required />
            <select className="form-select mb-2" name="status" value={editForm.status} onChange={handleEditChange} required>
              {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div className="d-flex justify-content-between">
              <button type="submit" className="btn btn-success btn-sm">Save</button>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        ) : (
          <>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" onChange={onSelect} />
              <label className="form-check-label">Select</label>
            </div>
            <h5 className="card-title mb-1">{task.subject}</h5>
            <div className="mb-2">{task.message}</div>
            <div className="mb-2">
              <span className="badge bg-info text-dark">{task.status}</span>
            </div>
            <div className="mb-2 text-muted" style={{ fontSize: '0.9em' }}>
              <i className="bi bi-clock me-1"></i>
              {task.receivedAt ? new Date(task.receivedAt).toLocaleString() : 'N/A'}
            </div>
            <div className="mb-2">
              <select className="form-select form-select-sm" value={task.status} onChange={handleStatusChange}>
                {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            </div>
            <div className="mb-2 text-muted" style={{ fontSize: '0.85em' }}>
              {Object.entries(timeStats || {}).map(([status, ms]) => ms > 0 && (
                <div key={status}><strong>{status}:</strong> {formatDuration(ms)}</div>
              ))}
            </div>
            <div className="mb-2"><span className="badge bg-secondary">{task.priority}</span> {task.assignee && <span className="ms-2"><i className="bi bi-person"></i> {task.assignee}</span>}</div>
            <div className="d-flex justify-content-between">
              <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
              <button className="btn btn-primary btn-sm" onClick={() => setEditing(true)}>Edit</button>
              <button className="btn btn-outline-secondary btn-sm" onClick={onShowDetails}>Details</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const getDefaultStatus = () => 'Not Started';

const ensureTaskShape = t => {
  const now = Date.now();
  return {
    ...t,
    status: t.status || getDefaultStatus(),
    receivedAt: t.receivedAt || now,
    statusTimestamps: t.statusTimestamps || { 'Not Started': t.receivedAt || now },
    statusDurations: t.statusDurations || {},
    comments: t.comments || [],
    attachments: t.attachments || [],
    assignee: t.assignee || '',
    priority: t.priority || 'Medium',
    activity: t.activity || [{
      type: 'created',
      message: 'Task created',
      timestamp: t.receivedAt || now
    }],
  };
};

const AdminDashboard = ({ tasks, onSignOut }) => {
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [taskList, setTaskList] = useState(tasks.map(ensureTaskShape));
  const [showDetails, setShowDetails] = useState(false);
  const [detailsTask, setDetailsTask] = useState(null);
  const [detailsTimeStats, setDetailsTimeStats] = useState({});
  const [detailsTotalTime, setDetailsTotalTime] = useState(0);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPriority, setFilterPriority] = useState('');
  const [selectedTasks, setSelectedTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const intervalRef = useRef();

  // Real-time update for durations
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setTaskList(list => [...list]); // force re-render
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    setTaskList(tasks.map(ensureTaskShape));
  }, [tasks]);

  // Edit task
  const handleEdit = (idx, updatedTask) => {
    const now = Date.now();
    let task = { ...taskList[idx] };
    let activityEntry = null;
    if (updatedTask.status !== task.status) {
      const prevStatus = task.status;
      const prevTime = task.statusTimestamps[prevStatus] || task.receivedAt;
      const duration = now - prevTime;
      const newDurations = { ...task.statusDurations, [prevStatus]: (task.statusDurations[prevStatus] || 0) + duration };
      const newTimestamps = { ...task.statusTimestamps, [updatedTask.status]: now };
      task = {
        ...task,
        ...updatedTask,
        statusTimestamps: newTimestamps,
        statusDurations: newDurations,
      };
      activityEntry = { type: 'status', message: `Status changed to ${updatedTask.status}` };
      if (updatedTask.status === 'Done') {
        const total = Object.values(newDurations).reduce((a, b) => a + b, 0);
        setTimeout(() => {
          alert(`Task "${task.subject}" completed! Total time: ${formatDuration(total)}`);
          notify(`Email: Task "${task.subject}" marked as Done!`);
        }, 100);
      }
    } else if (updatedTask.priority !== task.priority) {
      task = { ...task, ...updatedTask };
      activityEntry = { type: 'priority', message: `Priority changed to ${updatedTask.priority}` };
    } else if (updatedTask.assignee !== task.assignee) {
      task = { ...task, ...updatedTask };
      activityEntry = { type: 'assignee', message: `Assigned to ${updatedTask.assignee}` };
    } else {
      task = { ...task, ...updatedTask };
    }
    if (activityEntry) {
      task = addActivity(task, activityEntry);
    }
    const updated = [...taskList];
    updated[idx] = task;
    setTaskList(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
    window.dispatchEvent(new Event('tasks-updated'));
  };

  // Delete task
  const handleDelete = idx => {
    const updated = taskList.filter((_, i) => i !== idx);
    setTaskList(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
    window.dispatchEvent(new Event('tasks-updated'));
  };

  // Show details modal
  const handleShowDetails = idx => {
    const task = taskList[idx];
    const now = Date.now();
    // Calculate durations for all statuses
    const timeStats = { ...task.statusDurations };
    if (task.statusTimestamps[task.status]) {
      timeStats[task.status] = (timeStats[task.status] || 0) + (now - task.statusTimestamps[task.status]);
    }
    const totalTime = Object.values(timeStats).reduce((a, b) => a + b, 0);
    setDetailsTask(task);
    setDetailsTimeStats(timeStats);
    setDetailsTotalTime(totalTime);
    setShowDetails(true);
  };

  // Export to CSV
  const handleExportCSV = () => {
    const headers = ['Subject', 'Message', 'Status', 'Priority', 'Assignee', 'Received', 'Comments', 'Attachments'];
    const rows = taskList.map(task => [
      task.subject,
      task.message,
      task.status,
      task.priority,
      task.assignee,
      task.receivedAt ? new Date(task.receivedAt).toLocaleString() : '',
      (task.comments || []).join('; '),
      (task.attachments || []).map(a => a.name).join('; ')
    ]);
    let csv = headers.join(',') + '\n' + rows.map(r => r.map(x => '"' + (x || '').replace(/"/g, '""') + '"').join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'tasks.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  // Export to PDF
  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(12);
    doc.text('Tasks Export', 10, 10);
    let y = 20;
    taskList.forEach((task, i) => {
      doc.text(`Subject: ${task.subject}`, 10, y);
      doc.text(`Status: ${task.status} | Priority: ${task.priority} | Assignee: ${task.assignee}`, 10, y + 6);
      doc.text(`Message: ${task.message}`, 10, y + 12);
      y += 22;
      if (y > 270) { doc.addPage(); y = 20; }
    });
    doc.save('tasks.pdf');
  };

  // Simulated email notification
  const notify = msg => {
    // For now, just show a toast/alert
    alert(msg);
  };

  // Group tasks by status
  const filteredTasks = taskList.filter(task =>
    (!search || (task.subject && task.subject.toLowerCase().includes(search.toLowerCase()))) &&
    (!filterStatus || task.status === filterStatus) &&
    (!filterPriority || task.priority === filterPriority)
  );
  filteredTasks.sort((a, b) => PRIORITY_OPTIONS.indexOf(b.priority) - PRIORITY_OPTIONS.indexOf(a.priority));

  const tasksByStatus = STATUS_OPTIONS.reduce((acc, status) => {
    acc[status] = [];
    return acc;
  }, {});
  filteredTasks.forEach((task, idx) => {
    const status = task.status || getDefaultStatus();
    if (!tasksByStatus[status]) tasksByStatus[status] = [];
    // Calculate durations for card
    const now = Date.now();
    const timeStats = { ...task.statusDurations };
    if (task.statusTimestamps[status]) {
      timeStats[status] = (timeStats[status] || 0) + (now - task.statusTimestamps[status]);
    }
    tasksByStatus[status].push({ ...task, idx, timeStats });
  });

  // Add handlers for comments, attachments, assignment, priority
  const addActivity = (task, entry) => {
    return {
      ...task,
      activity: [...(task.activity || []), { ...entry, timestamp: Date.now() }]
    };
  };
  const handleAddComment = (idx, comment) => {
    if (!comment) return;
    const updated = [...taskList];
    updated[idx].comments = [...(updated[idx].comments || []), comment];
    updated[idx] = addActivity(updated[idx], { type: 'comment', message: 'Comment added' });
    setTaskList(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
    window.dispatchEvent(new Event('tasks-updated'));
  };
  const handleUploadFile = (idx, file) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const updated = [...taskList];
    updated[idx].attachments = [...(updated[idx].attachments || []), { name: file.name, url }];
    updated[idx] = addActivity(updated[idx], { type: 'attachment', message: `File attached: ${file.name}` });
    setTaskList(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
    window.dispatchEvent(new Event('tasks-updated'));
  };
  const handleAssign = (idx, assignee) => {
    const updated = [...taskList];
    updated[idx].assignee = assignee;
    updated[idx] = addActivity(updated[idx], { type: 'assignee', message: `Assigned to ${assignee}` });
    setTaskList(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
    window.dispatchEvent(new Event('tasks-updated'));
  };
  const handlePriorityChange = (idx, priority) => {
    const updated = [...taskList];
    updated[idx].priority = priority;
    updated[idx] = addActivity(updated[idx], { type: 'priority', message: `Priority changed to ${priority}` });
    setTaskList(updated);
    localStorage.setItem('tasks', JSON.stringify(updated));
    window.dispatchEvent(new Event('tasks-updated'));
  };

  // Bulk actions
  const handleSelectTask = idx => {
    setSelectedTasks(selected => selected.includes(idx) ? selected.filter(i => i !== idx) : [...selected, idx]);
  };
  const handleSelectAll = status => {
    setSelectedTasks(tasksByStatus[status].map(t => t.idx));
  };
  const handleBulkDelete = () => {
    const updated = taskList.filter((_, idx) => !selectedTasks.includes(idx));
    setTaskList(updated);
    setSelectedTasks([]);
    localStorage.setItem('tasks', JSON.stringify(updated));
    window.dispatchEvent(new Event('tasks-updated'));
  };
  const handleBulkStatus = newStatus => {
    const now = Date.now();
    const updated = taskList.map((task, idx) => {
      if (!selectedTasks.includes(idx)) return task;
      const prevStatus = task.status;
      const prevTime = task.statusTimestamps[prevStatus] || task.receivedAt;
      const duration = now - prevTime;
      const newDurations = { ...task.statusDurations, [prevStatus]: (task.statusDurations[prevStatus] || 0) + duration };
      const newTimestamps = { ...task.statusTimestamps, [newStatus]: now };
      let updatedTask = {
        ...task,
        status: newStatus,
        statusTimestamps: newTimestamps,
        statusDurations: newDurations,
      };
      updatedTask = addActivity(updatedTask, { type: 'status', message: `Status changed to ${newStatus} (bulk)` });
      return updatedTask;
    });
    setTaskList(updated);
    setSelectedTasks([]);
    localStorage.setItem('tasks', JSON.stringify(updated));
    window.dispatchEvent(new Event('tasks-updated'));
  };

  // Dark mode effect
  useEffect(() => {
    document.body.classList.toggle('bg-dark', darkMode);
    document.body.classList.toggle('text-light', darkMode);
  }, [darkMode]);

  return (
    <div>
      <AdminNavbar 
        onSignOut={onSignOut} 
        onShowProfile={() => setShowProfile(true)} 
        onShowSettings={() => setShowSettings(true)} 
      />
      <ProfileModal show={showProfile} onClose={() => setShowProfile(false)} />
      <SettingsModal show={showSettings} onClose={() => setShowSettings(false)} />
      <TaskDetailsModal
        show={!!showDetails}
        onClose={() => setShowDetails(false)}
        task={showDetails?.task}
        timeStats={showDetails?.timeStats}
        totalTime={showDetails?.totalTime}
        onAddComment={comment => handleAddComment(showDetails.idx, comment)}
        onUploadFile={file => handleUploadFile(showDetails.idx, file)}
        onAssign={assignee => handleAssign(showDetails.idx, assignee)}
        onPriorityChange={priority => handlePriorityChange(showDetails.idx, priority)}
      />
      <div className="container py-5">
        <h2 className="mb-4 fw-bold">Admin Dashboard</h2>
        <h4 className="mb-3">Contact Form Tasks</h4>
        <div className="mb-3 d-flex flex-wrap gap-2 align-items-center">
          <input className="form-control w-auto" placeholder="Search subject..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className="form-select w-auto" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <select className="form-select w-auto" value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
            <option value="">All Priorities</option>
            {PRIORITY_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <button className="btn btn-danger btn-sm" disabled={selectedTasks.length === 0} onClick={handleBulkDelete}>Delete Selected</button>
          <select className="form-select form-select-sm w-auto" disabled={selectedTasks.length === 0} onChange={e => { if (e.target.value) handleBulkStatus(e.target.value); }}>
            <option value="">Bulk Status</option>
            {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
          <button className="btn btn-outline-secondary btn-sm" onClick={handleExportCSV}>Export CSV</button>
          <button className="btn btn-outline-secondary btn-sm" onClick={handleExportPDF}>Export PDF</button>
          <button className="btn btn-dark btn-sm" onClick={() => setDarkMode(dm => !dm)}>{darkMode ? 'Light Mode' : 'Dark Mode'}</button>
        </div>
        <div className="row g-4">
          {STATUS_OPTIONS.map(status => (
            <div className="col-12 col-md-6 col-lg-3" key={status}>
              <div className="bg-light rounded p-2 h-100">
                <h5 className="fw-bold text-center mb-3">{status}</h5>
                {tasksByStatus[status].length === 0 ? (
                  <p className="text-muted text-center">No tasks</p>
                ) : (
                  tasksByStatus[status].map(({ idx, timeStats, ...task }) => (
                    <TaskCard
                      key={idx}
                      task={task}
                      onDelete={() => handleDelete(idx)}
                      onEdit={updated => handleEdit(idx, updated)}
                      onShowDetails={() => handleShowDetails(idx)}
                      timeStats={timeStats}
                      onSelect={() => handleSelectTask(idx)}
                    />
                  ))
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
