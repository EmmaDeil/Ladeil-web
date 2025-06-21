// import React, { useState } from 'react';

// const AdminLogin = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Fake login: username: admin, password: admin123
//     if (username === 'admin' && password === 'admin123') {
//       onLogin();
//     } else {
//       setError('Invalid credentials');
//     }
//   };

//   return (
//     <div className="container py-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="card shadow border-0">
//             <div className="card-body p-5">
//               <h2 className="mb-4 text-center fw-bold">Admin Login</h2>
//               {error && <div className="alert alert-danger">{error}</div>}
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="username" className="form-label">Username</label>
//                   <input type="text" className="form-control" id="username" value={username} onChange={e => setUsername(e.target.value)} required />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="password" className="form-label">Password</label>
//                   <input type="password" className="form-control" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
//                 </div>
//                 <div className="d-grid">
//                   <button type="submit" className="btn btn-primary btn-lg">Login</button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLogin;
