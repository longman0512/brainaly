const express = require("express");
const cookieParser = require("cookie-parser");
const path = require("path");
const { getHeapCodeStatistics } = require("v8");
const router = require('./router/router');
const app = express();
const PORT = 3001;
var cors = require('cors');
app.use(cors())
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({limit: '50mb', extended: true }));
app.use(express.urlencoded({limit: '50mb', extended: true,  parameterLimit:50000}));
app.use('/upload', express.static('upload'));  
app.use(cookieParser());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if (req.method === 'OPTIONS') {
      res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
      return res.status(200).json({});
  }
  next();
});
app.use(router);

//setup server
const server = app.listen(PORT, function() {
  console.log("server running: "+PORT);
});

const io = require("socket.io")(server, {
  cors: {
    origin: '*',
  }
}); // socket setup

const {
  connectRoom,
  getDataFromSocket,
  getUserStatus,
  newMessage,
} = require("./socket/socket");

const {
  createGame,
  joinGame,
  getGame,
  getGamePlayers,
  checkPinCode,
  disconnectPlayer,
  startQuiz,
  updateAnswer,
  nextQuiz,
  toMidState,
  endGameMake,
  reJoinGame
} = require('./socketGame/game');
const { ENGINE_METHOD_PKEY_ASN1_METHS } = require("constants");
io.on("connection", function(socket) {
  console.log('new connection of socket');
  socket.emit('rejoinGame');
  socket.on('Rjoingame', (data)=>{
    reJoinGame(data, socket);
  })
  socket.on('connectRoom', (data)=>{
    var users = connectRoom(data, socket);
    socket.broadcast.emit("newUser", data);
  })

  socket.on('createGame', (data) => {
    createGame(data);
    socket.emit('createdGame', data);
  })

  socket.on('joingame', (data) => {
    var { gameUsers, gameContent } = joinGame(data, socket);
    // if( userType == 'player') {
    socket.emit('newUserJoined', gameUsers);
    socket.emit('updatedGameInfo', gameContent);
    socket.broadcast.emit('newUserJoined', gameUsers);
    socket.broadcast.emit('updatedGameInfo', gameContent);
    // }
  })

  socket.on('getGameInfo',async (data) => {
    var gameContent = getGame(data);
    var gameUsers = getGamePlayers(data);
    socket.emit('newUserJoined', gameUsers);
    socket.emit('updatedGameInfo', gameContent);
  })

  socket.on('checkPinCode',async (pinCode) => {
    console.log(pinCode);
    var flag = checkPinCode(pinCode);
    if(flag) {
      socket.emit('okPinCode', pinCode)
    } else {
      socket.emit('noPinCode', pinCode)
    }
  })
  socket.on('getUserStatus', (users)=>{
    var statusResult = getUserStatus(users);
    socket.emit("updateUsersStatus", statusResult);
  })
  socket.on('nextQuiz', (gameInfo)=>{
    nextQuiz(gameInfo);
  })

  socket.on('startQuiz', (gameInfo, playerInfo)=>{
    console.log('start quiz in server.js')
    startQuiz(gameInfo, playerInfo);
  })
  
  socket.on('updateAnswer', (data)=>{
    console.log('update game answer', data)
    updateAnswer(data);
  })

  socket.on('toMidState', (data)=>{
    const { playerInfo, answerResult } = data;
    console.log('on socker server|||||||||||||', playerInfo, answerResult);
    toMidState(playerInfo, answerResult);
  })
  
  socket.on('sendMessage',async (msg) => {
    console.log(msg);
    newMessage(msg, socket);
  })

  socket.on('endGame', (gameId)=>{
    endGameMake(gameId)
  })

  socket.on('disconnect', ()=>{
    console.log('user is disconnected')
    // var players = disconnectPlayer(socket);
    var user = getDataFromSocket(socket);
    socket.broadcast.emit("outUser", user);
    // socket.broadcast.emit("newUserJoined", players);
  })

  
});