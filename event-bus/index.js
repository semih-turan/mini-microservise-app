const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  try {
    await Promise.all([
      axios.post("http://localhost:4000/events", event),
      axios.post("http://localhost:4001/events", event),
      axios.post("http://localhost:4002/events", event),
    ]);

    console.log("Event Broadcasted:", event.type); // Debug için log ekleyelim
    res.send({ status: "OK" });
  } catch (error) {
    console.error("Error broadcasting event:", error.message);
    res.status(500).send({ status: "ERROR", message: error.message });
  }
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
    