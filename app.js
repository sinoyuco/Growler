const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const passport = require('passport');

const users = require('./routes/api/users');
const growls = require('./routes/api/growls');
const bodyParser = require('body-parser');

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

app.use(passport.initialize());
require('./config/passport')(passport);

app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(bodyParser.json());

app.get("/", (req, res) => res.send("Hello World"));

app.use("/api/users", users);
app.use("/api/growls", growls);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));