const express = require('express')
const app = express()

const { PORT } = require('./util/config');
const { connectToDatabase } = require('./util/db');

const blogsRouter = require('./controllers/blogs');
const usersRouter = require('./controllers/users');
const loginRouter = require('./controllers/login');

app.use(express.json());

app.use('/api/blogs', blogsRouter);
app.use('/api/users', usersRouter);
app.use('/api/login', loginRouter);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  
  if (error.name === 'SequelizeValidationError') {
    const validationErrors = error.errors.map(err => err.message);
    return response.status(400).json({ error: validationErrors });
  } else {
    response.status(500).json({ error: 'Internal server error' });
  }
}

app.use(errorHandler)

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
}

start();
