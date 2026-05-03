const express = require("express");
const app = express();

app.use(express.json());

// BOOK API
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

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});

// CANCEL API
app.post("/cancel", (req, res) => {
  res.json({ success: true });
});

// CHECK USER API
app.post("/check-user", (req, res) => {
  res.json({ exists: false });
});

// TEST ROUTE (VERY IMPORTANT)
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// PORT
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
