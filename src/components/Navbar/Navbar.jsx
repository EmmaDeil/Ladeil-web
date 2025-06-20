import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  // <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-0">
  //   <div className="container-fluid">
  //     <Link className="navbar-brand d-flex align-items-center" to="/">
  //       <i className="bi bi-bootstrap-fill me-2"></i>
  //       FACLPRO
  //     </Link>
  //     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
  //       <span className="navbar-toggler-icon"></span>
  //     </button>
  //     <div className="collapse navbar-collapse" id="navbarNav">
  //       <ul className="navbar-nav ms-auto">
  //         <li className="nav-item">
  //           <Link className="nav-link" to="/">Services</Link>
  //         </li>
  //         <li className="nav-item">
  //           <Link className="nav-link" to="/about">About</Link>
  //         </li>
  //         <li className="nav-item">
  //           <Link className="nav-link" to="/contact">Contact</Link>
  //         </li>
  //         <li className="nav-item">
  //           <Link className="nav-link" to="/">Pricing</Link>
  //         </li>
  //         <li className="nav-item">
  //           <Link className="nav-link" to="/customers">Customers</Link>
  //         </li>
  //       </ul>
  //     </div>
  //   </div>
  // </nav>
  <div>
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/">
      <i className="bi bi-bootstrap-fill me-2"></i>
        FACLPRO
      </Link>
        {/* <a class="navbar-brand" href="#">
          <img
            src="/docs/5.3/assets/brand/bootstrap-logo.svg"
            alt="Logo"
            width="30"
            height="24"
            class="d-inline-block align-text-top"
          />
          Bootstrap
        </a> */}
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <Link className="nav-link active" to="/" aria-current="page">Services</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/customers">Customers</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pricing">Pricing</Link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
);

export default Navbar;
