var express = require("express");
const path = require('path');
var app = express();
const server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

const publicDirectoryPath = path.join(__dirname, '/public');
app.use(express.static(publicDirectoryPath));
// app.use("/", express.static(__dirname + "/public"));
// app.use("/response", express.static(__dirname + "/public"));

const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log("Server is up");
});

io.on('connection', function(socket){
  console.log('a user connected: ' + socket.id);
  socket.on('disconnect', function(){
      console.log( 'a user has disconnected: ' + socket.id);
  }); 
});

app.post("/data", function (req, res) {
  console.log(req.body.name);

  io.on("connection", function (socket) {
    io.sockets.emit("data" , req.body.name)    
  });
  
  return res.redirect('/index.html');
});
