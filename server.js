const express = require("express");
const app = express();

app.use(express.json());

let bookings = [];

// Book
app.post("/book", async (req, res) => {
  const { name, phone, email, date, time } = req.body;

  try {
    const response = await fetch("PASTE_YOUR_WEB_APP_URL_HERE", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, phone, email, date, time })
    });

    const data = await response.json();

    console.log("Sent to Google Sheets:", data);

    res.json({ success: true });

  } catch (error) {
    console.error("Error sending to Google Sheets:", error);
    res.json({ success: false });
  }
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
