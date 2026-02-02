const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());

app.get("/api/transactions", (req, res) => {
  res.json([
    { id: 1, from: "0x123", amount: 0.5 },
    { id: 2, from: "0x456", amount: 1.2 },
    { id: 3, from: "0x789", amount: 0.8 }
  ]);
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
