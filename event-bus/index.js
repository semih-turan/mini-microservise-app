const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  try {
    await Promise.all([
      axios.post("http://localhost:4000/events", event), // Posts service
      axios.post("http://localhost:4001/events", event), // Comments service
      axios.post("http://localhost:4002/events", event), // Query service
      axios.post("http://localhost:4003/events", event), // Moderation service
    ]);

    res.send({ status: "OK" });
  } catch (error) {
    console.error("Error broadcasting event:", error.message);
    res.status(500).send({ status: "ERROR", message: error.message });
  }
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
    