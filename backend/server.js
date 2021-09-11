const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();

// importing routes
const authRoutes = require('./routes/auth');
const statRoutes = require('./routes/stats');

app.use(express.json());
app.use(cors());

const { PORT, DB_CONNECTION }= process.env;
// connect to db
mongoose.connect(`${DB_CONNECTION}`,() => {
    console.log(`connected to db`);
});



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
app.use(authRoutes);
app.use(statRoutes);
