import React, { useEffect, useRef } from "react";

const Home = () => {
  const carouselRef = useRef(null);

  useEffect(() => {
    // Ensure Bootstrap JS is loaded and initialize the carousel
    if (window.bootstrap && carouselRef.current) {
      const carousel = new window.bootstrap.Carousel(carouselRef.current, {
        interval: 2500,
        ride: "carousel",
        pause: false,
        wrap: true,
      });
      return () => carousel.dispose();
    }
  }, []);

  // Animated Counter component
  const AnimatedCounter = ({ end, duration = 2000 }) => {
    const ref = useRef();
    useEffect(() => {
      let start = 0;
      const step = Math.ceil(end / (duration / 16));
      let current = 0;
      const interval = setInterval(() => {
        current += step;
        if (current >= end) {
          current = end;
          clearInterval(interval);
        }
        if (ref.current) ref.current.textContent = current;
      }, 16);
      return () => clearInterval(interval);
    }, [end, duration]);
    return <span ref={ref}>0</span>;
  };

  const testimonials = [
    { name: 'Jane Doe', text: 'FACLPRO transformed our facility management. The dashboard is a game changer!' },
    { name: 'John Smith', text: 'The real-time updates and task tracking are fantastic. Highly recommended.' },
    { name: 'Aisha Bello', text: 'Our team is more productive and our clients are happier. Great support too!' },
  ];

  const faqs = [
    { q: 'What is FACLPRO?', a: 'FACLPRO is a modern facility management and ticketing platform for efficient operations.' },
    { q: 'Can I try a demo?', a: 'Yes! Click the Request a Demo button or contact us via the form.' },
    { q: 'Is my data secure?', a: 'Absolutely. We use industry-standard security and encryption.' },
    { q: 'How do I get support?', a: 'Our support team is available 24/7 via chat, email, and phone.' },
  ];

  function NewsletterSignup() {
    const [email, setEmail] = React.useState('');
    const [submitted, setSubmitted] = React.useState(false);
    return (
      <div className="newsletter-signup bg-light p-4 rounded shadow-sm my-5">
        <h4 className="mb-2">Subscribe to our Newsletter</h4>
        <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="d-flex flex-wrap gap-2">
          <input type="email" className="form-control w-auto" placeholder="Your email" value={email} onChange={e => setEmail(e.target.value)} required />
          <button className="btn btn-primary" type="submit">Subscribe</button>
        </form>
        {submitted && <div className="alert alert-success mt-2">Thank you for subscribing!</div>}
      </div>
    );
  }

  // Live Chat Widget
  function LiveChatWidget() {
    const [open, setOpen] = React.useState(false);
    const [messages, setMessages] = React.useState([
      { from: 'bot', text: 'Hi! How can we help you today?' }
    ]);
    const [input, setInput] = React.useState('');
    const handleSend = () => {
      if (!input.trim()) return;
      setMessages(msgs => [...msgs, { from: 'user', text: input }]);
      setTimeout(() => setMessages(msgs => [...msgs, { from: 'bot', text: 'Thank you! Our team will respond soon.' }]), 1000);
      setInput('');
    };
    return (
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
        {open ? (
          <div className="card shadow-lg" style={{ width: 320 }}>
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
              <span>Live Chat</span>
              <button className="btn btn-sm btn-light" onClick={() => setOpen(false)}>&times;</button>
            </div>
            <div className="card-body" style={{ maxHeight: 220, overflowY: 'auto', background: '#f8f9fa' }}>
              {messages.map((m, i) => (
                <div key={i} className={`mb-2 text-${m.from === 'bot' ? 'secondary' : 'primary'}`}>{m.text}</div>
              ))}
            </div>
            <div className="card-footer d-flex gap-2">
              <input className="form-control form-control-sm" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleSend()} placeholder="Type a message..." />
              <button className="btn btn-sm btn-primary" onClick={handleSend}>Send</button>
            </div>
          </div>
        ) : (
          <button className="btn btn-primary rounded-circle p-3 shadow" onClick={() => setOpen(true)} title="Chat with us">
            <i className="bi bi-chat-dots" style={{ fontSize: 24 }}></i>
          </button>
        )}
      </div>
    );
  }

  // Pricing Calculator
  function PricingCalculator() {
    const [users, setUsers] = React.useState(5);
    const [plan, setPlan] = React.useState('Basic');
    const prices = { Basic: 19, Standard: 49, Premium: 99 };
    const getPrice = () => {
      if (plan === 'Basic') return prices.Basic;
      if (plan === 'Standard') return prices.Standard + Math.max(0, users - 20) * 2;
      if (plan === 'Premium') return prices.Premium + Math.max(0, users - 50) * 1;
      return 0;
    };
    return (
      <div className="container my-5">
        <div className="card p-4 mx-auto" style={{ maxWidth: 420 }}>
          <h4 className="mb-3">Pricing Calculator</h4>
          <div className="mb-2">
            <label>Plan:</label>
            <select className="form-select" value={plan} onChange={e => setPlan(e.target.value)}>
              <option>Basic</option>
              <option>Standard</option>
              <option>Premium</option>
            </select>
          </div>
          <div className="mb-2">
            <label>Number of Users:</label>
            <input type="number" className="form-control" min={1} max={500} value={users} onChange={e => setUsers(Number(e.target.value))} />
          </div>
          <div className="alert alert-info mt-3">
            <strong>Estimated Price: </strong>${getPrice()}/month
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page home">
      <div
        id="homeCarousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="2500"
        ref={carouselRef}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="./img1.jpg" className="d-block w-100" alt="Nature 1" style={{ height: "540px", objectFit: "cover" }} />
            <div className="carousel-caption d-none d-md-block">
              <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4">
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Streamline Facility Management with FACLPRO
                  </h1>
                  <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    Efficiently manage tickets, improve response times, and
                    enhance facility operations with our intuitive system.
                  </h2>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#dce8f3] text-[#101518] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                  <span className="truncate">Request a Demo</span>
                </button>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="./img2.jpg" className="d-block w-100" alt="Mountain" style={{ height: "540px", objectFit: "cover" }} />
            <div className="carousel-caption d-none d-md-block">
              <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4">
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Streamline Facility Management with FACLPRO
                  </h1>
                  <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    Efficiently manage tickets, improve response times, and
                    enhance facility operations with our intuitive system.
                  </h2>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#dce8f3] text-[#101518] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                  <span className="truncate">Request a Demo</span>
                </button>
              </div>
            </div>
          </div>
          <div className="carousel-item">
            <img src="./img3.jpg" className="d-block w-100" alt="Forest" style={{ height: "540px", objectFit: "cover" }} />
            <div className="carousel-caption d-none d-md-block">
              <div className="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-center justify-center p-4">
                <div className="flex flex-col gap-2 text-center">
                  <h1 className="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                    Streamline Facility Management with FACLPRO
                  </h1>
                  <h2 className="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                    Efficiently manage tickets, improve response times, and
                    enhance facility operations with our intuitive system.
                  </h2>
                </div>
                <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-[#dce8f3] text-[#101518] text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em]">
                  <span className="truncate">Request a Demo</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#homeCarousel"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <div className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4">
                <h1
                  className="text-[#101518] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em] max-w-[720px]"
                >
                  Our Key Features
                </h1>
                <p className="text-[#101518] text-base font-normal leading-normal max-w-[720px]">
                  Our ticketing system offers a range of features designed to optimize facility management and improve client communication.
                </p>
              </div>
              <div className="features-slider">
                <div className="features-slider-inner">
                  {/* Repeat the feature cards for seamless animation */}
                  {[0,1].map(i => (
                    <React.Fragment key={i}>
                      <div className="flex flex-1 gap-3 rounded-lg border border-[#d4dce2] bg-gray-50 p-4 flex-col">
                        {/* Ticket Management Card */}
                        <div className="text-[#101518]" data-icon="Ticket" data-size="24px" data-weight="regular">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path
                              d="M227.19,104.48A16,16,0,0,0,240,88.81V64a16,16,0,0,0-16-16H32A16,16,0,0,0,16,64V88.81a16,16,0,0,0,12.81,15.67,24,24,0,0,1,0,47A16,16,0,0,0,16,167.19V192a16,16,0,0,0,16,16H224a16,16,0,0,0,16-16V167.19a16,16,0,0,0-12.81-15.67,24,24,0,0,1,0-47ZM32,167.2a40,40,0,0,0,0-78.39V64H88V192H32Zm192,0V192H104V64H224V88.8a40,40,0,0,0,0,78.39Z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h2 className="text-[#101518] text-base font-bold leading-tight">Ticket Management</h2>
                          <p className="text-[#5c748a] text-sm font-normal leading-normal">
                            Efficiently create, track, and resolve tickets with a user-friendly interface. Prioritize tasks and assign tickets to the right team members.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 gap-3 rounded-lg border border-[#d4dce2] bg-gray-50 p-4 flex-col">
                        <div className="text-[#101518]" data-icon="Users" data-size="24px" data-weight="regular">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path
                              d="M117.25,157.92a60,60,0,1,0-66.5,0A95.83,95.83,0,0,0,3.53,195.63a8,8,0,1,0,13.4,8.74,80,80,0,0,1,134.14,0,8,8,0,0,0,13.4-8.74A95.83,95.83,0,0,0,117.25,157.92ZM40,108a44,44,0,1,1,44,44A44.05,44.05,0,0,1,40,108Zm210.14,98.7a8,8,0,0,1-11.07-2.33A79.83,79.83,0,0,0,172,168a8,8,0,0,1,0-16,44,44,0,1,0-16.34-84.87,8,8,0,1,1-5.94-14.85,60,60,0,0,1,55.53,105.64,95.83,95.83,0,0,1,47.22,37.71A8,8,0,0,1,250.14,206.7Z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h2 className="text-[#101518] text-base font-bold leading-tight">Client Portals</h2>
                          <p className="text-[#5c748a] text-sm font-normal leading-normal">
                            Provide clients with secure portals to submit tickets, track progress, and communicate directly with your team. Enhance transparency and client satisfaction.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 gap-3 rounded-lg border border-[#d4dce2] bg-gray-50 p-4 flex-col">
                        <div className="text-[#101518]" data-icon="PresentationChart" data-size="24px" data-weight="regular">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path
                              d="M216,40H136V24a8,8,0,0,0-16,0V40H40A16,16,0,0,0,24,56V176a16,16,0,0,0,16,16H79.36L57.75,219a8,8,0,0,0,12.5,10l29.59-37h56.32l29.59,37a8,8,0,1,0,12.5-10l-21.61-27H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,136H40V56H216V176ZM104,120v24a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm32-16v40a8,8,0,0,1-16,0V104a8,8,0,0,1,16,0Zm32-16v56a8,8,0,0,1-16,0V88a8,8,0,0,1,16,0Z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h2 className="text-[#101518] text-base font-bold leading-tight">Reporting</h2>
                          <p className="text-[#5c748a] text-sm font-normal leading-normal">
                            Generate detailed reports on ticket resolution times, team performance, and client feedback. Use data-driven insights to improve your facility management
                            processes.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 gap-3 rounded-lg border border-[#d4dce2] bg-gray-50 p-4 flex-col">
                        <div className="text-[#101518]" data-icon="Robot" data-size="24px" data-weight="regular">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path
                              d="M200,48H136V16a8,8,0,0,0-16,0V48H56A32,32,0,0,0,24,80V192a32,32,0,0,0,32,32H200a32,32,0,0,0,32-32V80A32,32,0,0,0,200,48Zm16,144a16,16,0,0,1-16,16H56a16,16,0,0,1-16-16V80A16,16,0,0,1,56,64H200a16,16,0,0,1,16,16Zm-52-56H92a28,28,0,0,0,0,56h72a28,28,0,0,0,0-56Zm-28,16v24H120V152ZM80,164a12,12,0,0,1,12-12h12v24H92A12,12,0,0,1,80,164Zm84,12H152V152h12a12,12,0,0,1,0,24ZM72,108a12,12,0,1,1,12,12A12,12,0,0,1,72,108Zm88,0a12,12,0,1,1,12,12A12,12,0,0,1,160,108Z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h2 className="text-[#101518] text-base font-bold leading-tight">Automation</h2>
                          <p className="text-[#5c748a] text-sm font-normal leading-normal">
                            Automate repetitive tasks such as ticket assignment, status updates, and notifications. Reduce manual effort and ensure timely responses to client requests.
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-10 px-4 py-10 @container">
              <div className="flex flex-col gap-4">
                <h1
                  className="text-[#101518] tracking-light text-[32px] font-bold leading-tight @[480px]:text-4xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]"
                >
                 Our Key Benefits of FACLPRO
                </h1>
                <p className="text-[#101518] text-base font-normal leading-normal max-w-[720px]">
                  Our ticketing system is designed to address the unique challenges of facility management, offering significant advantages.
                </p>
              </div>
              <div className="benefits-slider">
                <div className="benefits-slider-inner">
                  {[0,1].map(i => (
                    <React.Fragment key={i}>
                      <div className="flex flex-1 gap-3 rounded-lg border border-[#d4dce2] bg-gray-50 p-4 flex-col">
                        {/* Increased Efficiency Card */}
                        <div className="text-[#101518]" data-icon="Clock" data-size="24px" data-weight="regular">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path
                              d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm64-88a8,8,0,0,1-8,8H128a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v48h48A8,8,0,0,1,192,128Z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h2 className="text-[#101518] text-base font-bold leading-tight">Increased Efficiency</h2>
                          <p className="text-[#5c748a] text-sm font-normal leading-normal">
                            Optimize workflows and reduce response times with automated ticket routing and real-time updates.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 gap-3 rounded-lg border border-[#d4dce2] bg-gray-50 p-4 flex-col">
                        <div className="text-[#101518]" data-icon="Smiley" data-size="24px" data-weight="regular">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path
                              d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.07,48c-10.29,17.79-27.4,28-46.93,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.07-20a8,8,0,0,1,13.86,8Z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h2 className="text-[#101518] text-base font-bold leading-tight">Better Client Satisfaction</h2>
                          <p className="text-[#5c748a] text-sm font-normal leading-normal">
                            Enhance communication and transparency, leading to higher satisfaction rates and stronger client relationships.
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-1 gap-3 rounded-lg border border-[#d4dce2] bg-gray-50 p-4 flex-col">
                        <div className="text-[#101518]" data-icon="ShieldCheck" data-size="24px" data-weight="regular">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path
                              d="M208,40H48A16,16,0,0,0,32,56v58.78c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm0,74.79c0,78.42-66.35,104.62-80,109.18-13.53-4.51-80-30.69-80-109.18V56H208V88.8a40,40,0,0,0,0,78.39Z"
                            ></path>
                          </svg>
                        </div>
                        <div className="flex flex-col gap-1">
                          <h2 className="text-[#101518] text-base font-bold leading-tight">Improved Accountability</h2>
                          <p className="text-[#5c748a] text-sm font-normal leading-normal">
                            Track and manage all facility-related issues, ensuring every task is completed and documented for auditability.
                          </p>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
      <hr />
      <div className="flex justify-center p-5">
          <div className="layout-content-container flex flex-col max-w-[auto] flex-1">
            <div className="flex flex-wrap justify-between gap-3 p-4">
              <p className="text-[#111518] tracking-light text-[32px] font-bold leading-tight min-w-72">Choose the plan that's right for you</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-5 px-4 py-3 @3xl:grid-cols-4">
              <div className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[#d5dce2] bg-gray-50 p-6 plan-float" style={{width:'30rem'}}>
                <div className="flex flex-col gap-1" >  
                  <h1 className="text-[#111518] text-base font-bold leading-tight">Basic</h1>
                  <p className="flex items-baseline gap-1 text-[#111518]">
                    <span className="text-[#111518] text-4xl font-black leading-tight tracking-[-0.033em]">$19</span>
                    <span className="text-[#111518] text-base font-bold leading-tight">/month</span>
                  </p>
                </div>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#eaedf1] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Choose Basic</span>
                </button>
                <div className="flex flex-col gap-2">
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Up to 5 users
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Basic reporting
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Email support
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Standard ticket management
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Knowledge base access
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Community forum support
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[#d5dce2] bg-gray-50 p-6 plan-float plan-float-delay-1" style={{width:'30rem'}}>
                <div className="flex flex-col gap-1">
                  <h1 className="text-[#111518] text-base font-bold leading-tight">Standard</h1>
                  <p className="flex items-baseline gap-1 text-[#111518]">
                    <span className="text-[#111518] text-4xl font-black leading-tight tracking-[-0.033em]">$49</span>
                    <span className="text-[#111518] text-base font-bold leading-tight">/month</span>
                  </p>
                </div>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#eaedf1] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Choose Standard</span>
                </button>
                <div className="flex flex-col gap-2">
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Up to 20 users
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Advanced reporting
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Priority email support
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    API access
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Enhanced ticket management with automation
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Customizable dashboards
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Dedicated support channel
                  </div>
                </div>
              </div>
              <div className="flex flex-1 flex-col gap-4 rounded-xl border border-solid border-[#d5dce2] bg-gray-50 p-6 plan-float plan-float-delay-2" style={{width:'30rem'}}>
                <div className="flex flex-col gap-1">
                  <h1 className="text-[#111518] text-base font-bold leading-tight">Premium</h1>
                  <p className="flex items-baseline gap-1 text-[#111518]">
                    <span className="text-[#111518] text-4xl font-black leading-tight tracking-[-0.033em]">$99</span>
                    <span className="text-[#111518] text-base font-bold leading-tight">/month</span>
                  </p>
                </div>
                <button
                  className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#eaedf1] text-[#111518] text-sm font-bold leading-normal tracking-[0.015em]"
                >
                  <span className="truncate">Choose Premium</span>
                </button>
                <div className="flex flex-col gap-2">
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Unlimited users
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Custom reporting
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    24/7 phone support
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Dedicated account manager
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    White-labeling
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Full ticket management suite with AI-powered insights
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Priority feature requests
                  </div>
                  <div className="text-[13px] font-normal leading-normal flex gap-3 text-[#111518]">
                    <div className="text-[#111518]" data-icon="Check" data-size="20px" data-weight="regular">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20px" height="20px" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,77.66l-128,128a8,8,0,0,1-11.32,0l-56-56a8,8,0,0,1,11.32-11.32L96,188.69,218.34,66.34a8,8,0,0,1,11.32,11.32Z"></path>
                      </svg>
                    </div>
                    Onboarding and training
                  </div>
                </div>
              </div>
            </div>
      <PricingCalculator />
      <LiveChatWidget />
        {/* Animated Counters Section */}
        <section className="container my-5">
          <div className="row text-center">
            <div className="col">
              <h2><AnimatedCounter end={1200} duration={2000} />+</h2>
              <p>Tickets Resolved</p>
            </div>
            <div className="col">
              <h2><AnimatedCounter end={350} duration={2000} />+</h2>
              <p>Active Clients</p>
            </div>
            <div className="col">
              <h2><AnimatedCounter end={15} duration={2000} />+</h2>
              <p>Years Experience</p>
            </div>
          </div>
        </section>

        {/* Testimonials Carousel */}
        <section className="container my-5">
          <h3 className="text-center mb-4">What Our Clients Say</h3>
          <div id="testimonialsCarousel" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
              {testimonials.map((t, i) => (
                <div className={`carousel-item${i === 0 ? ' active' : ''}`} key={i}>
                  <div className="card mx-auto" style={{ maxWidth: 500 }}>
                    <div className="card-body">
                      <p className="card-text">“{t.text}”</p>
                      <h5 className="card-title mt-3">- {t.name}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#testimonialsCarousel" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container my-5">
          <h3 className="text-center mb-4">Frequently Asked Questions</h3>
          <div className="accordion" id="faqAccordion">
            {faqs.map((faq, i) => (
              <div className="accordion-item" key={i}>
                <h2 className="accordion-header" id={`heading${i}`}>
                  <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${i}`} aria-expanded="false" aria-controls={`collapse${i}`}>{faq.q}</button>
                </h2>
                <div id={`collapse${i}`} className="accordion-collapse collapse" aria-labelledby={`heading${i}`} data-bs-parent="#faqAccordion">
                  <div className="accordion-body">{faq.a}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <NewsletterSignup />
      </div> {/* End of layout-content-container */}
    </div> {/* Close .page.home */}
    </div>
  );
};

export default Home;
