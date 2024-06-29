const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

const app = express();
dotenv.config();

app.use(morgan("common"));
app.use(cors({
    origin: ["*"],
    methods: ["GET", "POST", "PATCH", "DELETE", "UPDATE", "PUT"],
    credentials: true,
}));
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));

const API_PREFIX = "api";
const auth = require('./routes/user.auth');
app.use(`/${API_PREFIX}/auth`, auth);

const adminRoutes = require('./routes/admin.routes');
app.use(`/${API_PREFIX}/admin`, adminRoutes);


module.exports = app;
