var games = [];
var players = [];
var socketData = [];
var normalScore = 5;

const createGame = (data) => {
  games.push(data);
  // console.log("-create game id", data.gameId);
  return games;
};

const emitEvent = (eventType, data, userId) => {
  socketData.map(sData => {
    if (sData.userId == userId) {
      console.log(eventType, 'to user', userId)
      sData.socket.emit(eventType, data)
    }
  })
}
const getUserType = (data) => {
  var type = 'player';
  games.map((game) => {
    if (game.ownerId == data.userId) type = 'owner';
  });
  // console.log("-get user Type", type);
  return type;
}

const getGame = (data) => {
  var content = {};
  games.map((game) => {
    if (game.gameId == data.gameId) content = game;
  });
  // console.log('get game content', content);
  return content;
}

const getGamePlayers = (data) => {
  var tempPlayers = [];
  players.map((p) => {
    if (p.gameId == data.gameId) tempPlayers.push(p);
  });
  // console.log('get players', tempPlayers);
  return tempPlayers;
}
const gameCheck = (gameId) => {
  var flag = false;
  games.map(g => {
    if (g.gameId == gameId) flag = true;
  })
  return flag;
}
const reJoinGame = (data, socket) => {
  var flag = false;
  if (data)
    if (typeof data.gameId != 'undefined')
      if (gameCheck(data.gameId)) {
        socketData.forEach(function (a) {
          if (a.userId == data.userId) {
            a.socket = socket;
          }
        })
      }
}
const updateAnswer = (data) => {
  const { playerInfo, upData } = data;
  // console.log(playerInfo, upData);
  var temp = [];

  players.forEach(function (a) {
    if (a.userId == playerInfo.userId) {
      var gameAnswer = getGameAnswer(playerInfo);
      console.log(gameAnswer);
      var tempAnswer = upData;
      if(gameAnswer.quizType != 2){
        gameAnswer.quizAnswer.map((item, index)=>{
          if(typeof tempAnswer[index] == 'undefined'){
            tempAnswer[index] = 0;
          }
        });
      }
      a.userAnswers[playerInfo.currentNum] = tempAnswer;
      console.log(a.userAnswers[playerInfo.currentNum]);
    }
    temp.push(a);
  });
  players = [...temp]
  console.log(players);
}
const joinGame = (data, socket) => {
  var flag = false;
  if (gameCheck(data.gameId)) {
    socketData.map(s => {
      if (s.socket.client.id == socket.client.id) flag = true;
    })
    if (!flag) {
      socketData.push({
        userId: data.userId,
        socket: socket
      });
    }
    
    if (!flag) {
      var gameContent = getGame(data);
      var userInitialAnswer = [];
      gameContent.gameContent.map(gc=>{
        if(gc.quizType == 1){
          userInitialAnswer.push([0, 0, 0, 0])
        } else if(gc.quizType == 2) {
          userInitialAnswer.push([0, 0])
        }
      })
      players.push({
        ...data,
        userAnswers: userInitialAnswer
      });
    }

  } else {
    socket.emit('noPinCode', data.gameId);
  }
  // console.log("-new user join into game, id: ", data.userId);
  return {
    gameUsers: getGamePlayers(data),
    gameContent: getGame(data)
  };
};

const checkPinCode = (pinCode) => {
  var flag = false;
  games.map(g => {
    if (g.gameId == pinCode) {
      flag = true;
    }
  })

  return flag;
}
const endGameMake = (gameId) => {
  var gameUsers = getGamePlayers({gameId: gameId});
  gameUsers.map(gameU => {
    emitEvent('updatedGameInfo', {}, gameU.userId);
  })
  games = games.filter((game)=>{
    return game.gameId != gameId;
  })

  var tempPlayers = [];
  players.map((p) => {
    if (p.gameId != gameId) tempPlayers.push(p);
  });
  
  players = tempPlayers;

  console.log(games.length, "remove game");
  console.log(players.length, 'remove payers');

  
}
const nextQuiz = (gameInfo) => { // only for owner user
  var gameUsers = getGamePlayers(gameInfo);
  var gameContent = getGame(gameInfo);
  var flagStatus = 'playing';
  // console.log('next quiz', gameUsers[0].currentNum+1, gameContent.gameContent.length)
  if(gameUsers[0].currentNum+1 >= gameContent.gameContent.length){
    flagStatus = 'end'
  }

  gameContent.gameStatus = flagStatus;
  var gameTemp = [];
  games.map((g) => {
    if (g.gameId == gameContent.gameId) {
      gameTemp.push(gameContent);
    } else {
      gameTemp.push(g);
    }
  })

  gameUsers.forEach(function (a) {
    a.userStatus = flagStatus;
  })
  // console.log(gameUsers, 'updated');
  var flag = false;
  players.forEach(function (a) {
    gameUsers.map(gu => {
      if (gu.userId == a.userId) flag = true
    })
    if (flag) {
      a.userStatus = flagStatus;
      a.currentNum = a.currentNum + 1;
    }
    flag = false;
  })
  // console.log(players, ' updated players');
  gameUsers.map(gameU => {
    emitEvent('updatedGameInfo', gameContent, gameU.userId);
    emitEvent('newUserJoined', gameUsers, gameU.userId);
  })
}

const ownerCheck = (uInfo) => {
  var flag = false;
  games.map(g => {
    // console.log("++++++++subData", g.gameId, uInfo.gameId, g.ownerId, uInfo.userId)
    if (g.gameId == uInfo.gameId && g.ownerId == uInfo.userId) {
      flag = true
    }
  })
  return flag;
}

const getGameAnswer = (userInfo) => {
  // console.log('gameGame Anser from ', userInfo);
  var gameAnswers = "";
  games.map(g => {
    if (g.gameId == userInfo.gameId) {
      gameAnswers = g.gameContent[userInfo.currentNum]
    }
  })
  // console.log("+++++++game anser", gameAnswers);
  return gameAnswers;
}
const calCheckAnswer = (userInfo, quizNum) => {
  // console.log('cac & check answer', userInfo, answerResult);
  var gameAnswer = getGameAnswer(userInfo);
  var userAnswers = userInfo.userAnswers[quizNum];
  var flag = true;
  // console.log(gameAnswer, 'question answer in calcheckanswer');
  if (typeof gameAnswer != 'undefined') {
    console.log(userInfo, userAnswers, gameAnswer, 'in cal check function')
    if (gameAnswer.quizType == 2) {
      if (userAnswers[gameAnswer.quizAnswer] == 1) {
        flag = false;
      }
    } else {
      gameAnswer.quizAnswer.map((gA, index) => {
        if (gA.sel != userAnswers[index]) {
          flag = false;
        }
      })
    }
    console.log(flag, "calculation result ++++++++++++++++")
    if (flag) {
      // points 3 == no, poinst 2 == double poinst 1 = standard
      if (gameAnswer.point == 3) {
        // console.log('point 0 type 3');
        return 0;
      } else if (gameAnswer.point == 2) {
        // console.log('point 10 double');
        return normalScore * 2;
      } else {
        // console.log('point 5 standard');
        return normalScore;
      }
    } else {
      return false
    }

  } else {
    return 0;
  }
}

const toMidState = (playerInfo, answerResult) => {
  var gameUsers = getGamePlayers(playerInfo);
  var gameContent = getGame(playerInfo);
  var flag = 'mid';
  
  if(playerInfo.currentNum >= gameContent.gameContent.length){
    flag = 'end'
  }
  
  if (ownerCheck(playerInfo)) {
  
    players.forEach(function (a) {
  
        a.userStatus = flag;
        if(flag == 'mid')
        a.userScore = Number(a.userScore) + calCheckAnswer(a, playerInfo.currentNum);
        console.log(a.userScore, 'calculation of usre score');
        // a.userAnswers[playerInfo.currentNum] = answerResult;
      // }
    })
    setTimeout(() => {
      games.forEach(function (g) {
        if (g.gameId == playerInfo.gameId) {
          g.gameStatus = flag;
        }
      })
      gameContent = getGame(playerInfo);
      gameUsers = getGamePlayers(playerInfo);
      players.forEach(function (a){
        gameUsers.map(gu => {
          if(gu.userId == a.userId) {
            a.userStatus = flag;
          }
        })
      })

      gameUsers.map(gameU => {
        emitEvent('updatedGameInfo', gameContent, gameU.userId);
        emitEvent('newUserJoined', gameUsers, gameU.userId);
      })
    }, 3000)
  }
}
const startQuiz = (gameInfo, playerInfo) => { // only owner user

  var gameUsers = getGamePlayers(gameInfo);
  var gameContent = getGame(gameInfo);

  gameContent.gameStatus = 'playing';
  var gameTemp = [];
  games.map((g) => {
    if (g.gameId == gameContent.gameId) {
      gameTemp.push(gameContent);
    } else {
      gameTemp.push(g);
    }
  })

  gameUsers.forEach(function (a) {
    a.userStatus = 'playing';
  })
  // console.log(gameUsers, 'updated');
  var flag = false;
  players.forEach(function (a) {
    gameUsers.map(gu => {
      if (gu.userId == a.userId) flag = true
    })
    if (flag) {
      a.userStatus = 'playing';
    }
    flag = false;
  })
  // console.log(players, ' updated players');
  gameUsers.map(gameU => {
    emitEvent('updatedGameInfo', gameContent, gameU.userId);
    emitEvent('newUserJoined', gameUsers, gameU.userId);
  })
}
const disconnectPlayer = (socket) => {
  var userId = '';
  var gameId = '';
  var temp = [];
  socketData.map(d => {
    if (d.socket.client.id == socket.client.id) {
      userId = d.userId
    } else {
      temp.push(d);
    }
  })

  socketData = temp;
  temp = [];
  players.map((user) => {
    if (user.userId == userId) {
      gameId = user.gameId
    } else {
      temp.push(user);
    }
  })

  players = temp;
  temp = [];

  games.map(g => {
    if (g.gameId == gameId && g.ownerId == userId) {

    } else {
      temp.push(g);
    }
  });
  // games = temp;

  // console.log('remove user data user, socket, games', players.length, socketData.length, games.length);

  return players;
};

module.exports = {
  createGame,
  joinGame,
  getUserType,
  getGame,
  getGamePlayers,
  checkPinCode,
  disconnectPlayer,
  nextQuiz,
  startQuiz,
  toMidState,
  reJoinGame,
  updateAnswer,
  endGameMake
};