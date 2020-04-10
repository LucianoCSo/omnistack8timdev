const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const routes = require("./routes");

const httpServer = express();
const server = require('http').Server(httpServer);
const io = require("socket.io")(server );

const connectionUser = {

}

io.on("connection", socket => {
    const { user } = socket.handshake.query;
    connectionUser[ user ] = socket.id; 
});

mongoose.connect("mongodb+srv://lucianocosta:kelvilu2020@cluster0-sampm.mongodb.net/omnistack8?retryWrites=true&w=majority", 
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});
httpServer.use((req, res, next) => {
    req.io = io;
    req.connectionUser = connectionUser;

    return next()
});

httpServer.use(cors({origin: true, credentials: true}));
httpServer.use(express.json());
httpServer.use(routes);

server.listen(3331);