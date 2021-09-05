const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();
const app = express();

// importing routes
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(cors());

const { PORT, DBUSER, DBPASSWORD }= process.env;
// connect to db
mongoose.connect(`mongodb+srv://${DBUSER}:${DBPASSWORD}@cluster0.e2cl6.mongodb.net/test`,() => {
    console.log(`connected to db`);
});



app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
app.use(authRoutes);
