import express from 'express';
import SBAModel from '../models/SBAModel.js';
import StudentModel from '../models/StudentModel.js';
//import db from '../config/mongodb.js'
import { role } from '../middlewares/variables.js';
const route = express.Router();

route.get('/', async (req, res) => {
  const data = await SBAModel.find();
  res.json(data);
});

//get one by id
route.get('/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('Missing URL parameter: username');
  }
  await SBAModel.findOne({ _id: req.params.id })
    .then(doc => {
      if (doc) {
        return res.json({ success: true, doc });
      } else {
        return res.json({ success: false, error: 'Does not exists' });
      }
    })
    .catch(err => {
      return res.json({ success: false, error: 'Server error' });
    });
});

//get student results
route.get('/student/:id/:year/:term', async (req, res) => {
  console.log(req.params);
  SBAModel.find({
    'students.userID': req.params.id,
    term: req.params.term,
    academicYear: req.params.year,
  }).then(docs => {
    if (!docs) {
      return res.json({ error: 'No Data Yet' });
    }
    let arr = [];
    docs.map(e => {
      arr.push(
        e.students.map(r => {
          return {
            _id: r._id,
            name: r.name,
            userID: r.userID,
            position: r.position,
            exam: r.exam,
            classWork: r.classWork,
            course: e.course,
          };
        })
      );
    });

    console.log(arr);
    var merged = [].concat.apply([], arr);
    let results = merged.filter(i => i.userID === req.params.id);

    return res.json({ docs: results });
  });
});

//get class student
route.get('/class/:class/:year/:term', async (req, res) => {
  let isExist = await SBAModel.find({
    class: req.params.class,
    academicYear: req.params.year,
    term: req.params.term,
  });
  if (isExist) {
    return res.json({ docs: isExist });
  }
  return res.json({ error: 'No Data Yet' });
});

//get class student
route.get('/:class/:year/:term', async (req, res) => {
  let isExist = await SBAModel.findOne({
    class: req.params.class,
    academicYear: req.params.year,
    term: req.params.term,
  });
  if (isExist) {
    return res.json({ docs: isExist });
  }
  return res.json({ error: 'No Data Yet' });
});

//get class course
route.get('/:class/:course/:year/:term', async (req, res) => {
  let isExist = await SBAModel.findOne({
    class: req.params.class,
    course: req.params.course,
    academicYear: req.params.year,
    term: req.params.term,
  });

  if (isExist) {
    return res.json({ docs: isExist });
  }

  let students = await StudentModel.find({
    classID: req.params.class,
    role: role.Student,
  });
  SBAModel.create({
    class: req.params.class,
    course: req.params.course,
    academicYear: req.params.year,
    term: req.params.term,
    students: students.map(e => {
      return {
        name: e.name + '  ' + e.surname,
        userID: e.userID,
        position: '-',
        exam: '',
        classWork: { a1: 0, a2: 0, a3: 0, a4: 0 },
      };
    }),
  })
    .then(docs => {
      if (!docs) {
        return res.json({ success: false, error: 'doex not exists' });
      }
      return res.json({ success: true, docs });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false, error: 'Edit failed' });
    });
});

//create
route.post('/create', async (req, res) => {
  let body = req.body;

  SBAModel.create(body)
    .then(doc => {
      res.json({ success: true, doc });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false, error: err });
    });
});

//update student marks
route.put('/update/student/:id/:studentID', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('Missing URL parameter: username');
  }
  const isExist = await SBAModel.findOne({
    'students._id': req.params.studentID,
  });
  console.log(isExist);
  //console.log(req.params.studentID);
  SBAModel.findOneAndUpdate(
    {
      'students._id': req.params.studentID,
    },
    { $set: { 'students.$': req.body } },
    {
      new: true,
    }
  )
    .then(doc => {
      if (!doc) {
        return res.json({ success: false, error: 'does not exists' });
      }
      return res.json({ success: true, doc });
    })
    .catch(err => {
      console.log(err);
      res.json({ success: false, error: 'Edit failed' });
    });
});

//edit task
route.put('/update/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('Missing URL parameter: username');
  }
  SBAModel.findOneAndUpdate(
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
      console.log(err);
      res.json({ success: false, error: 'Edit failed' });
    });
});

//delete task
route.delete('/delete/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('Missing URL parameter: username');
  }
  SBAModel.findOneAndRemove({
    _id: req.params.id,
  })
    .then(doc => {
      res.json(doc);
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
});

export default route;
