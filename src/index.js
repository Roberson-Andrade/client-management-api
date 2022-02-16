const express = require('express');
const app = require('./app');
const port = process.env.PORT || 3000;
const clientRouter = require('./routers/clientRouter');
const projectRouter = require('./routers/projectRouter');
const userRouter = require('./routers/userRouter');
require('./database/index');

app.use(express.json());
app.use(userRouter);
app.use(clientRouter);
app.use(projectRouter);

app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});