const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware configurations
app.use(cors());
app.use(express.json()); // Automatically parses incoming JSON request bodies

// ==========================================
// DATA REGISTRIES (Saves to server RAM memory for now)
// ==========================================
let candidatesRegistry = [
  { id: '1', fullName: 'John Doe', email: 'johndoe@example.com', phone: '+91 98765 43210', designation: 'Software Engineer', department: 'Engineering', joiningDate: '2026-06-01' }
];

let templatesRegistry = [
  { id: '101', name: 'Standard Tech Offer', body: 'Dear {{name}},\n\nWe are pleased to offer you the position of {{designation}} in our {{department}} department. Your starting salary will be ${{salary}} per annum.' }
];

// ==========================================
// API ROUTING ENDPOINTS
// ==========================================

// 1. GET ALL TEMPLATES
app.get('/api/templates', (req, res) => {
  res.json(templatesRegistry);
});

// 2. GET ALL CANDIDATES
app.get('/api/candidates', (req, res) => {
  res.json(candidatesRegistry);
});

// 3. POST REGISTER NEW CANDIDATE (With strict hackathon validation criteria)
app.post('/api/candidates', (req, res) => {
  const { fullName, email, phone, designation, department, joiningDate } = req.body;

  // Rule 1: Validate required fields are not missing
  if (!fullName || !email || !joiningDate) {
    return res.status(400).json({ error: "Missing required parameters: Name, Email, and Joining Date are required." });
  }

  // Rule 2: Validate unique email restriction
  const emailExists = candidatesRegistry.some(c => c.email.toLowerCase() === email.toLowerCase());
  if (emailExists) {
    return res.status(400).json({ error: "Validation Error: A candidate record with this email address already exists." });
  }

  // Rule 3: Validate joining date is strictly a future timeframe (Tomorrow or later)
  const selectedDate = new Date(joiningDate);
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(0,0,0,0);

  if (selectedDate < tomorrow) {
    return res.status(400).json({ error: "Validation Error: Anticipated joining date must look toward a future target timeline." });
  }

  const newCandidate = {
    id: String(candidatesRegistry.length + 1),
    fullName,
    email,
    phone,
    designation,
    department,
    joiningDate
  };

  candidatesRegistry.push(newCandidate);
  res.status(201).json({ message: "Candidate logged cleanly!", candidate: newCandidate });
});

// ==========================================
// RUNNING ENGINE LISTENER
// ==========================================
app.listen(PORT, () => {
  console.log(`🚀 Server running smoothly at: http://localhost:${PORT}`);
});