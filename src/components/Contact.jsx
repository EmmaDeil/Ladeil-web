import React, { useState } from 'react';

const Contact = ({ onTaskCreated }) => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (onTaskCreated) onTaskCreated(form);
    setSubmitted(true);
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow border-0">
            <div className="card-body p-5">
              <h2 className="mb-4 text-center fw-bold">Contact Us</h2>
              <p className="mb-4 text-center text-muted">We'd love to hear from you! Fill out the form below and our team will get back to you as soon as possible.</p>
              {submitted ? (
                <div className="alert alert-success text-center">Thank you for contacting us! Your message has been received.</div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input type="text" className="form-control" id="name" value={form.name} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={form.email} onChange={handleChange} required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="subject" className="form-label">Subject</label>
                    <input type="text" className="form-control" id="subject" value={form.subject} onChange={handleChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="5" value={form.message} onChange={handleChange} required></textarea>
                  </div>
                  <div className="d-grid">
                    <button type="submit" className="btn btn-primary btn-lg">Send Message</button>
                  </div>
                </form>
              )}
              <hr className="my-5" />
              <div className="text-center">
                <p className="mb-1"><i className="bi bi-envelope me-2"></i> support@faclpro.com</p>
                <p className="mb-1"><i className="bi bi-telephone me-2"></i> +1 (555) 123-4567</p>
                <p><i className="bi bi-geo-alt me-2"></i> 123 Main Street, Suite 100, City, Country</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
