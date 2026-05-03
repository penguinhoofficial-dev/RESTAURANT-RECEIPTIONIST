const express = require("express");
const app = express();

app.use(express.json());

let bookings = [];

// ================= BOOK =================
app.post("/book", async (req, res) => {
  const { name, phone, email, date, time } = req.body;

  try {
    const response = await fetch("https://script.google.com/macros/s/AKfycbx1tJcBSiGVAbOpe9qr2KK-UELsBzb8S9hsr2pTahUWBnJgVKsgkA8dFp0lQJQUAJ8u/exec", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, phone, email, date, time })
    });

    const data = await response.json();

    console.log("Sent to Google Sheets:", data);

    bookings.push({ name, phone, email, date, time });

    res.json({ success: true });

  } catch (error) {
    console.error("Error:", error);
    res.json({ success: false });
  }
});

// ================= CANCEL =================
app.post("/cancel", (req, res) => {
  const { email } = req.body;

  bookings = bookings.filter(b => b.email !== email);

  res.json({ success: true });
});

// ================= CHECK USER =================
app.post("/check-user", (req, res) => {
  const { email } = req.body;

  const user = bookings.find(b => b.email === email);

  if (user) {
    res.json({ exists: true, name: user.name });
  } else {
    res.json({ exists: false });
  }
});

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// ================= SERVER =================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
