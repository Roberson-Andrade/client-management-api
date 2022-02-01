const express = require('express');
const app = require('./app');
const port = process.env.PORT || 3000;
const clientRouter = require('./routers/clientRouter');

app.use(express.json());
app.use(clientRouter);


app.listen(port, () => {
  console.log(`Server is up and running on port: ${port}`);
});
