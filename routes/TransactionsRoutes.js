import express from 'express';
import TransactionsModel from '../models/TransactionsModel.js';
import moment from 'moment';

const route = express.Router();

//get banking details
route.get('/', async (req, res) => {
  const docs = await TransactionsModel.find();
  res.json(docs);
});

//get one bank details
route.get('/:id', async (req, res) => {
  const docs = await TransactionsModel.findOne({ _id: req.params.id });
  if (docs) {
    return res.json(docs);
  } else {
    return res.json({ error: 'Bank not found' });
  }
});

//expenditure
route.get('/expenditure', async (req, res) => {
  const docs = await TransactionsModel.find({
    type: { $regex: 'expenditure' },
  });
  console.log(docs);
  res.json(docs);
});

//get staff
route.get('/staff/pay', async (req, res) => {
  const docs = await TransactionsModel.find({
    category: { $regex: 'pay' },
    type: 'expenditure',
  });
  if (docs) {
    let data = docs.map(e => {
      return {
        amount: e.amount,
        date: e.date,
        paymentMethod: e.paymentMethod,
        chequeNumber: e.chequeNumber,
        userID: e.pay.userID,
        bank: e.bank,
        _id: e._id,
      };
    });
    return res.json(data);
  } else {
    return res.json({ error: 'no data' });
  }
});

route.get('/staff/pay/:month/:year', async (req, res) => {
  console.log(req.params.year);
  const docs = await TransactionsModel.find({
    category: { $regex: 'pay' },
    type: 'expenditure',
  });
  if (docs) {
    let monthData = docs.filter(e => {
      console.log(moment(e.date).year());
      return (
        e.pay.month === req.params.month
        //moment(e.date).year() === req.params.year
      );
    });
    return res.json({ docs: monthData });
  } else {
    return res.json({ error: 'no data' });
  }
});

//get single staff
route.get('/staff/pay/:id', async (req, res) => {
  const docs = await TransactionsModel.find({
    category: { $regex: 'pay' },
    type: 'expenditure',
  });

  if (docs) {
    let data = docs.map(e => {
      return {
        amount: e.amount,
        date: e.date,
        month: e.pay.month,
        accountNumber: e.pay.accountNumber,
        userID: e.pay.userID,
        bank: e.pay.bank,
        _id: e._id,
      };
    });
    return res.json(data);
  } else {
    return res.json({ error: 'no data' });
  }
});

//get fees
route.get('/students/fees', async (req, res) => {
  const docs = await TransactionsModel.find({
    category: { $regex: 'fees' },
    type: 'income',
  });
  if (docs) {
    let data = docs.map(e => {
      return {
        amount: e.amount,
        date: e.date,
        paymentMethod: e.paymentMethod,
        chequeNumber: e.chequeNumber,
        userID: e.fees.userID,
        bank: e.bank,
        type: e.type,
        academicYear: e.fees.academicYear,
        term: e.fees.term,
        _id: e._id,
      };
    });
    return res.json(data);
  } else {
    return res.json({ error: 'Bank not found' });
  }
});

route.get('/student/:id', async (req, res) => {
  const docs = await TransactionsModel.find({ 'fees.userID': req.params.id });
  return res.json(docs);
});

route.post('/create', async (req, res) => {
  TransactionsModel.create(req.body)
    .then(data => {
      if (data) {
        return res.json({ success: true, doc: data });
      } else {
        return res.json({ success: false, message: 'something when wrong' });
      }
    })
    .catch(err => {
      return res.json({ success: false, error: err });
    });
});

//update class register
route.put('/update/:id', async (req, res) => {
  TransactionsModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    req.body,
    {
      new: true,
    }
  )
    .then(doc => {
      return res.json({ success: true, error: 'OK' });
    })
    .catch(err => {
      return res.json({ success: false, error: err });
    });
});

//add transctations
route.post('/add/transactions/:id', async (req, res) => {
  TransactionsModel.findOneAndUpdate(
    {
      _id: req.params.id,
    },
    { $push: { transactions: req.body } },
    {
      new: true,
    }
  )
    .then(doc => {
      return res.json(doc.transactions);
    })
    .catch(err => {
      return res.json({ success: false, error: err });
    });
});

//delete
route.delete('/delete/:id', async (req, res) => {
  TransactionsModel.findOneAndDelete({
    _id: req.params.id,
  })
    .then(doc => {
      return res.json({ success: true, message: 'OK' });
    })
    .catch(err => {
      return res.json({ success: false, error: err });
    });
});

export default route;
