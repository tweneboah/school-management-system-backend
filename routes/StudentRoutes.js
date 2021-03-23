import express from 'express';
import StudentModel from '../models/StudentModel.js';
import CourseModel from '../models/CoursesModel.js';
import bcrypt from 'bcrypt';
import { login, changePassword } from '../middlewares/validate.js';
import { stringtoLowerCaseSpace } from '../middlewares/utils.js';
import { role } from '../middlewares/variables.js';
import ClassesModel from '../models/ClassesModel.js';
import TransactionsModel from '../models/TransactionsModel.js';

const route = express.Router();

//get all students
route.get('/', async (req, res) => {
  const data = await StudentModel.find({ role: role.Student });
  let docs = data.filter(e => e.withdraw !== true);
  res.json(docs);
});

//withdraw
route.get('/withdraw', async (req, res) => {
  const data = await StudentModel.find({
    role: role.Student,
  });
  let docs = data.filter(e => e.withdraw === true);
  res.json(docs);
});

route.get('/past', async (req, res) => {
  const data = await StudentModel.find({
    role: role.Student,
  });

  let isExist = async id => {
    let result = await ClassesModel.findOne({ classCode: id });
    console.log(id);
    return result;
  };

  let allData = data.map(user => {
    return {
      role: user.role,
      withdraw: user.withdraw,
      name: user.name,
      userID: user.userID,
      middleName: user.middleName,
      gender: user.gender,
      profileUrl: user.profileUrl,
      status: user.status,
      classID: user.classID,
      exists: isExist(user.classID) ? true : false,
    };
  });

  let pastStudents = allData.filter(e => e.exists === false);
  res.json(pastStudents);
});

//unpaid fees
route.get('/unpaidfees', async (req, res) => {
  const docs = await TransactionsModel.find({
    category: { $regex: 'fees' },
    type: 'income',
  });

  let data = docs.map(e => {
    return {
      amount: e.amount,
      userID: e.fees.userID,
      bank: e.bank,
      type: e.type,
      academicYear: e.fees.academicYear,
      term: e.fees.term,
      _id: e._id,
    };
  });
  const students = await StudentModel.find({ role: role.Student });
  let results = students.map(e => {
    let fees = data.find(i => i.userID === e.userID);
    return {
      userID: e.userID,
      name: e.name + ' ' + e.surname,
      classID: e && e.classID,
      amount: (e && fees.amount) || 0,
      academicYear: (e && fees.academicYear) || null,
      term: (e && fees.term) || null,
      status: e && e.status,
      fees: e && e.fees,
    };
  });

  res.json(results);
});

//get one student by id
route.get('/student/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('Missing URL parameter: username');
  }
  await StudentModel.findOne({ userID: req.params.id, role: role.Student })
    .then(user => {
      if (user) {
        return res.json({ success: true, student: user });
      } else {
        return res.json({ success: false, error: 'Student does not exists' });
      }
    })
    .catch(err => {
      return res.json({ success: false, error: 'WRONG error' });
    });
});

//admission
route.get('/student/admission/:from/:to', async (req, res) => {
  const admission = await StudentModel.countDocuments({
    role: role.Student,
    createdAt: { $gte: req.params.from, $lte: req.params.to },
  });
  const border = await StudentModel.countDocuments({
    role: role.Student,
    createdAt: { $gte: req.params.from, $lte: req.params.to },
    status: 'border',
  });
  const day = await StudentModel.countDocuments({
    role: role.Student,
    createdAt: { $gte: req.params.from, $lte: req.params.to },
    status: 'day',
  });

  res.json({
    admission,
    border,
    day,
  });
});

//get studentCourses
route.get('/student/courses/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('Missing URL parameter: username');
  }
  await StudentModel.findOne({ userID: req.params.id, role: role.Student })
    .then(async user => {
      if (user) {
        await CourseModel.find({ code: user.classID });
        return res.json({ success: true, courses: user.courses });
      } else {
        return res.json({ success: false, error: 'Student does not exists' });
      }
    })
    .catch(err => {
      return res.json({ success: false, error: 'WRONG error' });
    });
});

//get category num
route.get('/number/:category/:value', async (req, res) => {
  // if (!req.params.id) {
  //   return res.status(400).send("Missing URL parameter: username");
  // }
  await StudentModel.find({
    role: role.Student,
    [req.params.category]: req.params.value,
  })
    .then(user => {
      return res.json({
        success: true,
        docs: user.map(e => {
          return {
            status: e.status,
            fees: e.fees,
          };
        }),
      });
    })
    .catch(err => {
      console.log(err);
      return res.json({ success: false, error: 'WRONG error' });
    });
});

//search students by id or name
route.get('/search/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('Missing URL parameter: username');
  }
  await StudentModel.find({
    role: role.Student,
    $or: [
      {
        userID: req.params.id,
      },
      {
        name: { $regex: req.params.id },
      },
      {
        lastname: { $regex: req.params.id },
      },
    ],
  })
    .then(user => {
      if (user) {
        return res.json({ success: true, users: user });
      } else {
        return res.json({ success: false, error: 'Student does not exists' });
      }
    })
    .catch(err => {
      return res.json({ success: false, error: 'WRONG error' });
    });
});

//search students by id or name
route.get('/search/:id/:name/:classID', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('Missing URL parameter: username');
  }
  await StudentModel.find({
    role: role.Student,
    $or: [
      {
        userID: { $regex: req.params.userID },
      },
      {
        name: { $regex: req.params.name },
      },
      {
        classID: req.params.classID,
      },
    ],
  })
    .then(user => {
      if (user) {
        return res.json({ success: true, users: user });
      } else {
        return res.json({ success: false, error: 'Student does not exists' });
      }
    })
    .catch(err => {
      console.log(err);
      return res.json({ success: false, error: 'WRONG error' });
    });
});

//get all parents
route.get('/parents', async (req, res) => {
  await StudentModel.find({ role: role.Student })
    .then(user => {
      if (user) {
        let results = user.map(a => a.guadian);
        var merged = [].concat.apply([], results);
        return res.json({ success: true, docs: merged });
      } else {
        return res.json({
          success: false,
          error: 'No parents details available',
        });
      }
    })
    .catch(err => {
      console.log(err);
      return res.json({ success: false, error: 'WRONG error' });
    });
});

//search parents
route.get('/parents/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('Missing URL parameter: username');
  }
  await StudentModel.findOne({ _id: req.params.id })
    .then(user => {
      if (user.guadian.length > 0) {
        return res.json({ success: true, docs: user.guadian });
      } else {
        return res.json({
          success: false,
          error: 'No parents details available',
        });
      }
    })
    .catch(err => {
      console.log(err);
      return res.json({ success: false, error: 'WRONG ERROR' });
    });
});

//get students in class
route.get('/class/:id', async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('Missing URL parameter: username');
  }
  await StudentModel.find({ classID: req.params.id, role: role.Student })
    .then(user => {
      if (user.length > 0) {
        return res.json({ success: true, users: user });
      } else {
        return res.json({ success: false, error: 'No Students in this class' });
      }
    })
    .catch(err => {
      console.log(err);
      return res.json({ success: false, error: 'Server error' });
    });
});

//get students by gender, section , dormitory

//create student
route.post('/create', async (req, res) => {
  let body = req.body;

  const studentExist = await StudentModel.findOne({
    $and: [
      {
        email: body.email,
        name: body.name,
        surname: body.surname,
        role: role.Student,
      },
    ],
  });
  if (studentExist) {
    return res.json({ success: false, error: 'Student already exist' });
  }

  //calculate student num
  const currentYear = new Date().getFullYear();
  const number = await StudentModel.countDocuments({ role: role.Student });
  let studentId = 'BK' + currentYear + (number + 1);

  //check if userid exist
  const studentIDexist = await StudentModel.findOne({ userID: studentId });
  if (studentIDexist) {
    studentId = 'BK' + currentYear + (number + 2);
  }

  let setuserID = body.setuserID;

  bcrypt.hash(studentId, 10, (err, hash) => {
    if (err) {
      return res.json({ success: false, error: 'something went wrong' });
    }
    const userData = {
      ...body,
      password: hash,
      userID: setuserID ? setuserID : studentId,
    };
    StudentModel.create(userData)
      .then(user => {
        return res.json({ success: true, student: user });
      })
      .catch(e => {
        console.log(e);
        return res.json({ success: false, error: 'something went wrong' });
      });
  });
});

//login
route.post('/signin', async (req, res) => {
  let body = req.body;
  body = {
    ...body,
    role: stringtoLowerCaseSpace(body.role),
  };
  const { error } = login.validate(body);
  if (error) {
    return res.send({ error: error.details[0].message });
  }
  StudentModel.findOne({
    userID: body.userID,
    role: body.role,
  })
    .then(user => {
      if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          return res.json({ success: true, student: user });
        } else {
          return res.json({ error: 'Wrong Password or Student ID' });
        }
      } else {
        return res.json({ error: 'Wrong Password or Student ID' });
      }
    })
    .catch(err => {
      console.log(err);
    });
});

//update profile pic

//change password
route.put('/changePassword/:id', async (req, res) => {
  const { error } = changePassword.validate(req.body);
  if (error) {
    return res.json({ success: false, error: error.details[0].message });
  }
  StudentModel.findOne({ userID: req.params.id }).then(user => {
    if (user) {
      if (bcrypt.compareSync(req.body.oldPassword, user.password)) {
        bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
          if (err) {
            return res.json({ success: false, error: err });
          }
          StudentModel.findOneAndUpdate(
            {
              studentID: req.params.id,
            },
            { password: hash },
            {
              new: true,
            }
          )
            .then(doc => {
              return res.json({
                success: true,
                message: 'Password successfully changed',
              });
            })
            .catch(e => {
              return res.json({ success: false, error: e + 'e' });
            });
        });
      } else {
        return res.json({ success: false, error: 'Wrong old password' });
      }
    } else {
      return res.json({ success: false, error: 'Student does not exist' });
    }
  });
});

//update info
//address, nextof kin , classes, courses
//change password
route.put('/update/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('Missing URL parameter: username');
  }
  StudentModel.findOneAndUpdate(
    {
      userID: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then(doc => {
      if (!doc) {
        return res.json({ success: false, error: 'doex not exists' });
      }
      return res.json({ success: true, student: doc });
    })
    .catch(err => {
      res.json({ success: false, error: err });
    });
});

//change students class
route.post('/upgrade/class', (req, res) => {
  const { currentlass, nextclass } = req.body;

  StudentModel.updateMany(
    {
      role: role.Student,
      classID: currentlass,
    },
    { classID: nextclass },
    {
      new: true,
    }
  )
    .then(doc => {
      if (!doc) {
        return res.json({ success: false, error: 'doex not exists' });
      }
      return res.json({ success: true, student: doc });
    })
    .catch(err => {
      res.json({ success: false, error: err });
    });
});

//change student dormitories
route.post('/upgrade/dormitories', (req, res) => {
  const { currentdormitory, nextdormitory } = req.body;

  StudentModel.updateMany(
    {
      role: role.Student,
      dormitoryID: currentdormitory,
    },
    { dormitoryID: nextdormitory },
    {
      new: true,
    }
  )
    .then(doc => {
      if (!doc) {
        return res.json({ success: false, error: 'doex not exists' });
      }
      return res.json({ success: true, student: doc });
    })
    .catch(err => {
      res.json({ success: false, error: err });
    });
});

//change student campus
route.post('/upgrade/campus', (req, res) => {
  const { currentcampus, nextcampus } = req.body;

  StudentModel.updateMany(
    {
      role: role.Student,
      campusID: currentcampus,
    },
    { campusID: nextcampus },
    {
      new: true,
    }
  )
    .then(doc => {
      if (!doc) {
        return res.json({ success: false, error: 'doex not exists' });
      }
      return res.json({ success: true, student: doc });
    })
    .catch(err => {
      res.json({ success: false, error: err });
    });
});

//delete student
route.delete('/delele/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).send('Missing URL parameter: username');
  }
  StudentModel.findOneAndRemove({
    userID: req.params.id,
  })
    .then(doc => {
      if (!doc) {
        return;
      }
      return res.json({
        success: true,
        message: ` ${req.params.id} is successfully DELETED`,
      });
    })
    .catch(err => {
      res.status(500).json(err);
    });
});
export default route;
