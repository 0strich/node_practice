const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/users');

const db = require('./utils/db');

const app = express();
db.connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const port = 5000;

app.get('/', (req, res) => {
  res.send('root route')
});

app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`listen on port ${port}`)
});