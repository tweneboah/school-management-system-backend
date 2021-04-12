const express = require('express');
const NextkinModel = require('../models/NextofKinModel');
const { createnextKin } = require('../middlewares/validate');

const nextOfKinRoutes = express.Router();

nextOfKinRoutes.get('/', async (req, res) => {
  const data = await NextkinModel.find().sort({
    createdAt: 'desc',
  });
  res.json(data);
});

//get one by id
nextOfKinRoutes.get('/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('Missing URL parameter: username');
  }
  await NextkinModel.findOne({ _id: req.params.id })
    .then(user => {
      if (user) {
        return res.json({ success: true, student: user });
      } else {
        return res.json({ success: false, error: 'Does not exists' });
      }
    })
    .catch(err => {
      return res.json({ success: false, error: 'Server error' });
    });
});

//create
nextOfKinRoutes.post('/create', async (req, res) => {
  let body = req.body;
  const { error } = createnextKin.validate(body);
  if (error) {
    console.log(error);
    return res.json({ success: false, error: error.details[0].message });
  }

  NextkinModel.create(body)
    .then(doc => {
      console.log(doc);
      res.json({ success: true, doc });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false, message: err });
    });
});

//edit
nextOfKinRoutes.put('/update/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('Missing URL parameter: username');
  }
  NextkinModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then(doc => {
      console.log(doc);
      if (!doc) {
        return res.json({ success: false, error: 'doex not exists' });
      }
      return res.json({ success: true, doc });
    })
    .catch(err => {
      res.json({ success: false, message: err });
    });
});

//delete
nextOfKinRoutes.delete('/delete/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('Missing URL parameter: username');
  }
  NextkinModel.findOneAndRemove({
    _id: req.params.id,
  })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = nextOfKinRoutes;
