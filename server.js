require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 5000;
const app = express();
const cors = require('cors');
app.use(cors())

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use(express.static(__dirname + '/public'));
app.set('view engine', "ejs");

const mongoose = require('mongoose');




app.use("/", require("./routes/root"));
app.use("/home", require("./routes/home"));
app.use("/contact", require("./routes/contact"));
app.use("/login", require("./routes/login"));
app.use("/sign_up", require("./routes/signup"));
app.use("/categories", require("./routes/category"));
//app.use("/user", require("./routes/userRoute"));
app.use("/crud_panel", require("./routes/crud_panel"));
app.use('/auth', require('./routes/auth'));
app.use('/admin', require('./routes/forAdmin'));


const start = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);

        app.listen(PORT, () => console.log('It works on port: ' + PORT))
    }catch (e) {
        console.log(e);
    }
}

start();