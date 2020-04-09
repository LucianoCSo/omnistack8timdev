const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const server = express();
const routes = require("./routes");

mongoose.connect("mongodb+srv://lucianocosta:kelvilu2020@cluster0-sampm.mongodb.net/omnistack8?retryWrites=true&w=majority", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

server.use(cors({origin: true, credentials: true}));
server.use(express.json());
server.use(routes);

server.listen(3331);