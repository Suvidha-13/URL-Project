const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const shortid = require("shortid");
const Url = require("../models/Urlmodel");
const utils = require("../Util/util");

// configure dotenv
dotenv.config();
const app = express();
const router = express.Router()

// cors for cross-origin requests to the frontend application
app.use(cors());
// parse requests of content-type - application/json
app.use(express.json());

// Database connection
mongoose
  .connect(process.env.DATABASE_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Db Connected`);
  })
  .catch((err) => {
    console.log(err.message);
  });

// get all saved URLs 
router.get("/all", async (req, res) => {
  Url.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  });
})

// URL shortener endpoint
router.post("/shorten", async (req, res) => {
  const { longUrl } = req.body;
  const base = `http://localhost:4000`;

  const urlId = shortid.generate();
  if (utils.validateUrl(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });
      if (url) {
        res.json(url);
      } else {
        const shortUrl = `${base}/${urlId}`;

        url = new Url({
          longUrl,
          shortUrl,
          urlId,
        });

        await url.save();
        res.json(url);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json('Server Error');
    }
  } else {
    res.status(400).json('Invalid Original Url');
  }
});

// // redirect endpoint
// router.get("/:urlId", async (req, res) => {
//   try {
//     console.log(req.params.urlId)
//     const url = await Url.findOne({ urlId: req.params.urlId });
//     console.log(url)
//     if (url) {
//       url.clicks++;
//       url.save();
//       return res.redirect(url.longUrl);
//     } else res.status(404).json("Not found");
//   } catch (err) {
//     console.log(err);
//     res.status(500).json("Server Error");
//   }
// });

router.get('/:urlId', async (req, res) => {
  try {
    const url = await Url.findOne({ urlId: req.params.urlId });
    console.log(req.params.urlId)
    if (url) {
      console.log(url)
      await Url.updateOne(
        {
          urlId: req.params.urlId,
        },
        { $inc: { clicks: 1 } }
      );
      console.log(url.longUrl)
      return res.redirect(url.longUrl);
    }
    else res.status(404).json('Not found');
  } catch (err) {
    console.log(err);
    res.status(500).json('server error');
  }
});


module.exports = router;


// const {response} = require('express')
// const express = require('express')
// const router = express.Router()
// const URLTemplateCopy = require('../models/URLModel')
// const shortId = require('shortid')

// const mongodb = require('mongodb');
// const app = express();
// app.use(express.json());

// const MongoClient = mongodb.MongoClient;
// const url = "mongodb://127.0.0.1:27017"
// const dbName = "url";
// let db;

// MongoClient.connect(url, (error, client) => {
//     if (error) throw error;
//     console.log('connected to mongodb')
//     db = client.db(dbName);
// });

// router.post('/shorten' , async (request, response) => {

//     try {
//         const {longUrl} = request.body;
//         const shortcode = shortId.generate();
//         const shortUrl = `http://localhost:4000/${shortcode}`;
//         const urlDocument = {longUrl, shortUrl,shortcode};
//         const result = await db.collection('shorturls').insertOne(urlDocument);
//         response.json({shortUrl});
//      }
//      catch(error)
//      {
//         console.error(error);
//         response.status(500).send('Error Occured');
//      }
// })
// module.exports = router;