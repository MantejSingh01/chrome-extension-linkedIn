const express = require("express");
const ScrapData = require("./Puppeteer");
const MongoConnection = require("./mongoDB");
const Modal = require("./mongoDB/Modal");
const SanitizeData = require("./Utils/SanitizeData");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');

const ObjectId = mongoose.Types.ObjectId;

const app = express(express.json());
app.use(bodyParser.json());
app.use(cors());


app.get('/getAllRecords', async (req, res) => {
    try {
        const results = await Modal.DetailsModal.find();
        console.log(results);
        res.status(200).json(results); 
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
});


app.get("/getScrapedData", async (req, res) => {
  try {
    console.log("Received GET request at /getScrapedData",req.query);
    let {title, companyName} = req.query;
    console.log("Received GET request at /getScrapedData",title, companyName);
    const existingDocument = await Modal.DetailsModal.findOne({ Title: title });
    let result;
    if (!existingDocument) {
      result = await ScrapData(companyName);
      result = SanitizeData(result);
      const savedDocument = await Modal.DetailsModal(result).save();
      console.log("Document saved:", savedDocument);
    } else {
      result = existingDocument;
      console.log("Data retrieved from database:", result);
    }

    res.status(200).json(result);
  } catch (error) {
    console.error("Error occurred:", error);
    res.status(500).json({ error: "Failed to fetch or save data" });
  }
});

app.post("/deleteRecord", async (req, res) => {
  console.log(req.body);
  const { id } = req.body;
  let documentIdsToDelete =  id.map((itm)=>  new ObjectId(itm));
  const successful = await Modal.DetailsModal.deleteMany({ _id: { $in: documentIdsToDelete } });
  if (successful.acknowledged) {
    res
      .status(200)
      .json({ message: `Deleted successfully, ${successful.deletedCount}` });
  } else {
    res.status(404).json({ message: `Not Found !!!` });
  }
});
app.listen(3008, async () => {
  console.log("Server is listening on port 3008");
  try {
    const connectionState = await MongoConnection();
    if (connectionState) {
      console.log("Connection to MongoDB successful");
    } else {
      console.error("Connection to MongoDB failed");
    }
  } catch (error) {
    console.error("Error in MongoDB connection:", error);
  }
});
