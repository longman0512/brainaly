var users = [];
const mysql = require('mysql');
const host = 'localhost';
const user = 'root';
const password = '';
const database = 'brainaly';

const con = mysql.createConnection({
  host,
  user,
  password,
  database,
});

const connectRoom = (data, socket) => {
  users.push({
    ...data,
    socket: socket
  })
  return users;
};

const getDataFromSocket = (socket) => {
  var userData = '';
  var userTemp = [];
  users.map((user) => {
    if (user.socket.client.id == socket.client.id){
      userData = {
        userId: user.userId
      }
    } else {
      userTemp.push(user);
    }
  })
  users = userTemp;
  return userData;
};

const getUserStatus = (userData) => {
  var result = [];

  userData.map((userD) => {
    var temp = '';
    users.map((user) => {
      if (userD.u_id == user.userId) {
        temp = {
          ...userD,
          status: true
        }
      }
    });
    if (temp) {
      result.push(temp);
    } else {
      result.push(userD);
    }
  })

  return result;
};

const newMessage = async (msg, socket) => {
  const query = "INSERT INTO `chats` (`m_from_id`, `m_to_id`, `m_content`) VALUES ("+msg.toId+", "+msg.fromId+", '"+msg.msgContent+"');";
  console.log(socket);
  return await con.query(query, async (err, result) => {
    if (err) throw err;
    console.log(result);
    await con.query("SELECT * FROM `chats` WHERE id = "+result.insertId, (err, subResult) => {
      if (err) throw err;
      console.log(subResult)
      users.map((user) => {
        console.log(msg.toId, user.userId)
        if (msg.toId == user.userId || msg.fromId == user.userId) {
          console.log(msg.fromId, msg.toId, user.userId)
          user.socket.emit('newMsg', {
            msgContent: subResult,
            from_id: msg.fromId
          })
        }
      });
    })
    
  });


}

module.exports = {
  connectRoom,
  getDataFromSocket,
  getUserStatus,
  newMessage,
};