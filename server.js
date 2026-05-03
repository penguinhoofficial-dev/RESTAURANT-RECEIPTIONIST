const express = require("express");
const app = express();

app.use(express.json());

let bookings = [];

// Book
app.post("/book", (req, res) => {
  const { name, email, date, time, guests } = req.body;
  const booking = { name, email, date, time, guests };

  bookings.push(booking);

  console.log("DATA RECEIVED:", booking);

  res.json({ success: true });
});

// Cancel
app.post("/cancel", (req, res) => {
  const { email } = req.body;

  bookings = bookings.filter(b => b.email !== email);

  res.json({ success: true });
});

// Check user
app.post("/check-user", (req, res) => {
  const { email } = req.body;

  const user = bookings.find(b => b.email === email);

  if (user) {
    res.json({ exists: true, name: user.name });
  } else {
    res.json({ exists: false });
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ✅ ONLY ONE listen
app.listen(3000, () => console.log("Server running"));
