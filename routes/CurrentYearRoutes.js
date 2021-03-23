import express from "express";
import CurrentModel from "../models/CurrentModel.js";

const route = express.Router();

//get all events
route.get("/", async (req, res) => {
  const docs = await CurrentModel.find();
  res.json(docs);
});

//search event by name

//get one by id
route.get("/:id", async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  await CurrentModel.findOne({ code: req.params.id })
    .then((docs) => {
      if (docs) {
        return res.json(docs);
      } else {
        return res.json({ success: false, error: "Does not exists" });
      }
    })
    .catch((err) => {
      return res.json({ success: false, error: "Server error" });
    });
});

//create
route.post("/create", async (req, res) => {
  let body = req.body;
  //create id
  CurrentModel.create(body)
    .then((doc) => {
      res.json({ success: true, doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: err });
    });
});

//set
route.post("/set/:id", async (req, res) => {
  //check if exist
  let isAdded = await CurrentModel.findOne({
    code: req.params.id,
    years: { $in: [req.body.currentYear] },
  });
  //create id

  if (!isAdded) {
    await CurrentModel.findOneAndUpdate(
      { code: req.params.id },
      { $push: { years: req.body.currentYear } }
    );
  }
  CurrentModel.findOneAndUpdate(
    {
      code: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      if (!doc) {
        //return res.json({success: false, error: "does not exists"})
        CurrentModel.create(body)
          .then((docs) => {
            res.json({ success: true, doc: docs });
          })
          .catch((err) => {
            console.log(err);
            res.json({ success: false, error: err });
          });
      }
      return res.json({ success: true, docs: doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: "something when wrong" });
    });
});

//edit
route.put("/update/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  CurrentModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then((doc) => {
      if (!doc) {
        return res.json({ success: false, error: "does not exists" });
      }
      return res.json({ success: true, docs: doc });
    })
    .catch((err) => {
      console.log(err);
      res.json({ success: false, error: "something when wrong" });
    });
});

//delete
route.delete("/delete/:id", (req, res) => {
  if (!req.params.id) {
    return res.status(400).send("Missing URL parameter: username");
  }
  CurrentModel.findOneAndRemove({
    _id: req.params.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

export default route;
