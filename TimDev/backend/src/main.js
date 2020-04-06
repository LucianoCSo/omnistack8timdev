const express = require("express");
const mongoose = require("mongoose");
const server = express();
const routes = require("./routes");
const cors = require("cors");

mongoose.connect("mongodb+srv://lucianocosta:kelvilu2020@cluster0-sampm.mongodb.net/omnistack8?retryWrites=true&w=majority", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(3331);