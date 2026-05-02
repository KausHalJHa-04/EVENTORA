
<!-- 🔥 Gradient Header -->
<!-- 🔥 Gradient Banner -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0f2027,50:203a43,100:2c5364&height=200&section=header&text=Eventora&fontSize=40&fontColor=ffffff&animation=fadeIn&fontAlignY=35"/>
</p>

<h3 align="center">🚀 Full-Stack MERN Event Booking Platform</h3>

<p align="center">
  <img src="https://img.shields.io/badge/build-passing-brightgreen" />
  <img src="https://img.shields.io/badge/license-MIT-blue" />
  <img src="https://img.shields.io/badge/stack-MERN-blueviolet" />
  <img src="https://img.shields.io/badge/frontend-React%20%2B%20Tailwind-61DAFB" />
  <img src="https://img.shields.io/badge/backend-Node%20%2B%20Express-green" />
  <img src="https://img.shields.io/badge/database-MongoDB-47A248" />
  <img src="https://img.shields.io/badge/status-active-success" />
</p>

<p align="center">
  <a href="https://eventora-ruby.vercel.app/">
    <img src="https://img.shields.io/badge/Live%20Demo-Vercel-black?logo=vercel" />
  </a>
</p>

---

<h2 align="center">📌 About the Project</h2>

<p align="center">
<b>Eventora</b> is a <b>full-stack MERN application</b> that enables seamless event discovery and booking with a strong focus on 
<b>security, admin control, and real-world booking workflows</b>.  
Unlike traditional platforms, Eventora does not rely on third-party payment gateways — instead, it provides a 
<b>manual verification system</b> where admins validate bookings and payments directly.
</p>

<p align="center">
It is designed to simulate real-world event management systems with features like OTP-based verification, 
role-based access, booking queues, and analytics dashboards.
</p>

---

<h2 align="center">📸 Screenshot</h2>

<p align="center">
  <a href="https://ibb.co/gFWkcCrP">
    <img src="https://i.ibb.co/rfpDXJQc/Screenshot-2026-04-24-013409.png" width="90%" />
  </a>
</p>

---

<h2>✨ Core Features</h2>

<h3>🔐 Authentication & Security</h3>
<ul>
  <li>Secure authentication using <b>JWT (JSON Web Tokens)</b></li>
  <li>Password encryption with <b>bcrypt hashing</b></li>
  <li>Protected routes and middleware-based authorization</li>
  <li>Prevention of unauthorized access using role validation</li>
</ul>

<h3>🔑 Advanced 2FA OTP Verification</h3>
<ul>
  <li>Email-based OTP verification using <b>Nodemailer</b></li>
  <li>Mandatory OTP during <b>account activation</b></li>
  <li>Additional OTP layer for <b>booking confirmation</b></li>
  <li>Helps prevent spam bookings and unauthorized actions</li>
</ul>

<h3>👥 Role-Based Access Control</h3>

<b>Admin Panel:</b>
<ul>
  <li>Full control over event lifecycle (Create, Update, Delete)</li>
  <li>Approve or reject booking requests</li>
  <li>Manually verify payments (Paid / Not Paid)</li>
  <li>Access restricted via database-level role flag</li>
</ul>

<b>User Panel:</b>
<ul>
  <li>Browse and explore available events</li>
  <li>Submit booking requests via OTP verification</li>
  <li>Track booking status (Pending / Approved / Rejected)</li>
  <li>Cancel booking requests</li>
</ul>

---

<h3>🎉 Event Management System</h3>
<ul>
  <li>Create both <b>free and paid events</b></li>
  <li>Add rich event details:
    <ul>
      <li>Descriptions</li>
      <li>External image URLs</li>
      <li>Categories & schedules</li>
      <li>Seat capacity management</li>
    </ul>
  </li>
  <li>Dynamic seat tracking to prevent overflow</li>
</ul>

---

<h3>🧠 Smart Booking Workflow</h3>
<ul>
  <li>OTP-based booking authorization ensures genuine users</li>
  <li>All bookings enter a <b>Pending Queue</b> for admin verification</li>
  <li>Prevents overbooking with real-time seat validation logic</li>
  <li>Designed to mimic real-world manual ticket approval systems</li>
</ul>

---

<h3>📊 Admin Analytics Dashboard</h3>
<ul>
  <li>Real-time tracking of booking metrics</li>
  <li>View:
    <ul>
      <li>Pending booking requests</li>
      <li>Total revenue generated</li>
      <li>Confirmed paid users</li>
    </ul>
  </li>
  <li>Provides insights for event organizers</li>
</ul>

---

<h3>📧 Email Notification System</h3>
<ul>
  <li>Automated emails using <b>Nodemailer</b></li>
  <li>Booking confirmations and OTP delivery</li>
  <li>Improves user communication and trust</li>
</ul>

---

<h3>🎨 Modern UI/UX</h3>
<ul>
  <li>Built using <b>React + Tailwind CSS</b></li>
  <li>Responsive across mobile, tablet, and desktop</li>
  <li>Smooth animations and micro-interactions</li>
  <li>Clean and minimal interface design</li>
</ul>

---
<h2>📁 Full Project Structure</h2>

<pre>
Eventora/
│
├── client/                         # Frontend (React + Vite)
│   ├── public/
│   ├── src/
│   │   ├── assets/                 # Images, icons, static files
│   │   ├── components/             # Reusable UI components
│   │   ├── pages/                  # Main pages (Home, Login, Dashboard, etc.)
│   │   ├── context/                # Global state management
│   │   ├── services/               # API calls (axios/fetch)
│   │   ├── utils/                  # Helper functions
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── routes.jsx              # Routing configuration
│   │
│   ├── index.html
│   └── package.json
│
├── server/                         # Backend (Node + Express)
│   ├── config/                     # DB & environment config
│   ├── controllers/                # Business logic
│   ├── models/                     # Mongoose schemas
│   ├── routes/                     # API routes
│   ├── middleware/                 # Auth & error middleware
│   ├── utils/                      # OTP, email helpers, etc.
│   ├── services/                   # Additional logic layers (if any)
│   ├── server.js                   # Entry point
│   └── package.json
│
├── .gitignore
├── package.json                    # Root scripts
└── README.md
</pre>

---
<h2>🛠️ Tech Stack</h2>

<table>
<tr>
<th>Frontend</th>
<th>Backend</th>
<th>Database</th>
</tr>
<tr>
<td>React.js<br/>Tailwind CSS<br/>Vite</td>
<td>Node.js<br/>Express.js</td>
<td>MongoDB Atlas</td>
</tr>
</table>

---

<h2>⚙️ Setup Instructions</h2>

<pre>
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=supersecretjwtkey_eventora
EMAIL_USER=your_gmail_address
EMAIL_PASS=your_gmail_app_password
PORT=5000
</pre>

---

<h2>💡 Future Improvements</h2>
<ul>
  <li>Stripe / Razorpay integration</li>
  <li>Real-time notifications (WebSockets)</li>
  <li>Seat locking system</li>
  <li>AI-based event recommendations</li>
</ul>

---

<h2>👨‍💻 Author</h2>

<p>
<b>Kaushal Jha</b><br/>
Full Stack Developer (MERN)<br/>
<a href="https://www.linkedin.com/in/kaushal-jha-6073042aa/">LinkedIn</a>
</p>

---

<h2>📜 License</h2>

<p>
This project is licensed under the <b>MIT License</b> — you are free to use, modify, and distribute this software with proper attribution.
</p>

---

<h2>⭐ Support</h2>

<p align="center">
⭐ Star • 🍴 Fork • 📢 Share
</p>

<!-- 🔥 Footer -->
<p align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:2c5364,100:0f2027&height=120&section=footer"/>
</p>
