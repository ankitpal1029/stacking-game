const express = require('express');
const cors = require('cors');

require('dotenv').config();
const app = express();

// importing routes
const authRoutes = require('./routes/auth');

app.use(express.json());
app.use(cors());


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});
app.use(authRoutes);
