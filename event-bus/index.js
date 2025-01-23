const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;
  
  try {
    axios.post("http://localhost:4000/events", event); // Posts Service
    axios.post("http://localhost:4001/events", event); // Comments Service
    // axios.post("http://localhost:4002/events", event); // Query Service

    res.send({ status: "OK" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send({ status: "ERROR", message: error.message });
  }
});

app.listen(4005, () => {
  console.log("Listening on 4005");
});
    