const express = require("express");
const bodyParser = require('body-parser'); 
const cors = require('cors');
const connect = require('./src/database/mongoose');
const userRoute = require('./src/routes/UserRoute');
const ticketRoute = require('./src/routes/TicketRoute');
const port = 3000;
const app = express();

connect();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/',userRoute);
app.use('/api/',ticketRoute);
app.listen(port , () => console.log(` Hello world app listening on port ${ port } ! 💣🧨 `))