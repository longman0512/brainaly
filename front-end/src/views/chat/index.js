/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable block-scoped-var */
/* eslint-disable no-redeclare */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-alert */
/* eslint-disable eqeqeq */
/* eslint-disable array-callback-return */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  Box,
  Container,
  makeStyles,
  Grid,
  Card,
  TextField,
  InputAdornment,
  SvgIcon,
  Menu
} from '@material-ui/core';
import clsx from 'clsx';
import Flip from 'react-reveal/Flip';
import { Search as SearchIcon } from 'react-feather';
import SendIcon from '@material-ui/icons/Send';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@material-ui/icons/Clear';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Picker from 'emoji-picker-react';
import { v4 as uuid } from 'uuid';
import Page from 'src/components/Page';
import authChecker from 'src/utils/authHelper';
import Typer from 'src/components/Typer';
import { getUsers, getMessageApi, readMsgApi } from 'src/utils/Api';
import {
  onMessageReceived, offEvent, emitEvent, setSocket
} from 'src/utils/socket';
import stringify from 'src/utils/stringify';
import notifyMefunction from 'src/utils/noti';
import global from 'src/utils/global';
import CustomerMsg from './CustomerMsg';
import MyMsg from './MyMsg';
import Users from './Users';

const useStyles = makeStyles((theme) => ({
  rootChat: {
    padding: 15,
    marginTop: 9,
    marginBottom: 70,
    height: 600,
    overflowY: 'scroll'
  },
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  welcome: {
    backgroundColor: 'white',
    minHeight: '100%',
    padding: theme.spacing(3),
    height: 600
  },
  msgInputContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: -50
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [users, setUsers] = React.useState([]);
  const [filteredUsers, setFilterUsers] = React.useState([]);
  const [selId, setSelId] = React.useState(0);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [newUser, setNewUser] = React.useState('');
  const [outUser, setOutUser] = React.useState('');
  const [msgCon, setMsgCon] = React.useState('');
  const [message, setMessage] = React.useState([]);
  const [newMsg, setNewMsg] = React.useState('');
  const [profile, setProfile] = React.useState('');
  const [length, setLength] = React.useState(0);
  const [searchKey, setSearchKey] = React.useState('');
  const [selectedUser, setSelectedUser] = React.useState({ u_name: '', u_avatar: '' });
  const open = Boolean(anchorEl);
  const onEmojiClick = (event, emojiObject) => {
    setMsgCon(msgCon + emojiObject.emoji);
    setAnchorEl(null);
  };

  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authChecker('authCheck')) navigate('/', { replace: true });
  }, []);

  const updateUserState = (data) => {
    if (data.length) {
      emitEvent('getUserStatus', data);
    }
  };

  function searchUser(query) {
    setSearchKey(query);
    if (query == '') {
      setFilterUsers(users);
    } else {
      const aaa = users.filter((user) => {
        console.log(user.u_name, query, 'search users');
        return user.u_name.toLowerCase().indexOf(query.trim().toLowerCase()) >= 0;
      });
      setFilterUsers(aaa);
    }
  }

  function closeSearch() {
    setSearchKey('');
    searchUser('');
    console.log('close search and refresh');
  }

  const updateRead = () => {
    const user = JSON.parse(localStorage.getItem('brainaly_user'));
    var flag = false;
    users.map((user) => {
      console.log(user);
      if (user.u_id == selId && user.newMsgNum) flag = true;
    });
    if (flag) {
      setTimeout(() => {
        console.log({
          to_id: selId,
          from_id: user.userId
        }, 'update message');
        readMsgApi({
          from_id: user.userId,
          to_id: selId
        }).then((res) => {
          const temp = users;
          console.log(temp.length);
          temp.map((Tuser, index) => {
            if (Tuser.u_id == res.data) {
              temp[index].newMsgNum = 0;
            }
          });
          var userTemp = [];
          getUsers({ userId: user.userId }).then((r) => {
            r.map((result) => {
              userTemp.push({
                ...result,
                status: false
              });
            });
            userTemp.sort((x, y) => {
              if (x.newMsgNum < y.newMsgNum) {
                return 1;
              }
              if (x.newMsgNum > y.newMsgNum) {
                return -1;
              }
              return 0;
            });
            setUsers(userTemp);
            setFilterUsers(userTemp);
            updateUserState(userTemp);
          });
        });
      }, 800);
    }
  };
  React.useEffect(() => {
    const user = JSON.parse(localStorage.getItem('brainaly_user'));
    setProfile(user);
    getMessageApi({ client_id: selId, userId: user?.userId }).then((res) => {
      setMessage(res);
    });
  }, [selId]);

  React.useEffect(() => {
    console.log(newUser);
    const userTemp = [];
    if (newUser) {
      users.map((user) => {
        if (user.u_id == newUser.userId) {
          userTemp.push({
            ...user,
            status: true
          });
        } else {
          userTemp.push({
            ...user
          });
        }
      });
    }
    if (userTemp.length) {
      setUsers(userTemp);
      setFilterUsers(userTemp);
    }
  }, [newUser]);

  React.useEffect(() => {
    const userTemp = [];
    users.map((user) => {
      if (user.u_id == outUser?.userId) {
        userTemp.push({
          ...user,
          status: false
        });
      } else {
        userTemp.push({
          ...user
        });
      }
    });
    if (userTemp.length) {
      setFilterUsers(userTemp);
      setUsers(userTemp);
    }
  }, [outUser]);

  const scrollBottom = () => {
    const chatbox = document.getElementById('chatbox');
    if (chatbox) {
      chatbox.scrollTop += 80;
      if (chatbox.scrollTop + 600 < chatbox.scrollHeight) {
        setTimeout(() => {
          scrollBottom();
        }, 10);
      }
    }
  };

  React.useEffect(() => {
    const newM = newMsg.msgContent;

    const temp = users;
    console.log(newMsg, 'new msg content');
    if (newMsg.from_id != profile?.userId) {
      if (newMsg.from_id == selId) {
        var tempMsg = message;
        if (newM && selId) tempMsg.push(newM[0]);
        setTimeout(() => {
          setMessage(tempMsg);
        }, 300);
        setTimeout(() => {
          setLength(tempMsg.length);
          console.log(length);
          scrollBottom();
        }, 100);
      }
      temp.map((user, index) => {
        if (user.u_id == newMsg.from_id) {
          console.log('increase new message num');
          temp[index].newMsgNum = user.newMsgNum + 1;
          notifyMefunction(newMsg.msgContent[0].m_content, user.u_avatar ? `${global.serverUrl}upload/${user.u_avatar}` : null);
        }
      });

      setUsers(temp);
      setFilterUsers(temp);
    } else {
      var tempMsg = message;
      if (newM) tempMsg.push(newM[0]);
      setTimeout(() => {
        setMessage(tempMsg);
      }, 300);
      setTimeout(() => {
        setLength(tempMsg.length);
        scrollBottom();
      }, 100);
    }
  }, [newMsg]);

  const newMessge = (newMsgData) => {
    setNewMsg(newMsgData);
  };

  React.useEffect(() => {
    setSocket();
    const user = JSON.parse(localStorage.getItem('brainaly_user'));
    const userTemp = [];
    getUsers({ userId: user?.userId }).then((res) => {
      res.map((result) => {
        userTemp.push({
          ...result,
          status: false
        });
      });
      userTemp.sort((x, y) => {
        if (x.newMsgNum < y.newMsgNum) {
          return 1;
        }
        if (x.newMsgNum > y.newMsgNum) {
          return -1;
        }
        return 0;
      });
      console.log(userTemp);
      setUsers(res);
      setFilterUsers(res);
      updateUserState(userTemp);
    });
    offEvent('newUser');
    offEvent('outUser');
    offEvent('updateUsersStatus');
    offEvent('newMsg');
    onMessageReceived('newUser', setNewUser);
    onMessageReceived('outUser', setOutUser);
    onMessageReceived('updateUsersStatus', setUsers);
    onMessageReceived('updateUsersStatus', setFilterUsers);
    onMessageReceived('newMsg', newMessge);
    emitEvent('connectRoom', user);
  }, []);

  React.useEffect(() => {
    scrollBottom();
  }, [message]);

  const refresh = (user) => {
    setSelId(user.u_id);
    setSelectedUser(user);
  };

  const handleEmojiPopClick = (event) => {
    updateRead();
    setAnchorEl(event.currentTarget);
  };

  const handleEmojiPopClose = () => {
    setAnchorEl(null);
  };

  const sendMessage = () => {
    if (msgCon) {
      emitEvent('sendMessage', {
        msgContent: stringify(msgCon),
        toId: selId,
        fromId: profile?.userId
      });
    }
    setMsgCon('');
  };

  const keyPressHandle = (event) => {
    if (event.key == 'Enter') {
      sendMessage();
    }
  };
  return (
    <Page
      className={classes.root}
      title="Customers"
    >
      <Container maxWidth={false}>
        {/* <Toolbar /> */}
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            xl={2}
            lg={3}
            md={3}
            xs={3}
          >
            <Flip left>
              <Box mt={3}>
                <Card style={{ padding: 15 }}>
                  <Box maxWidth={500}>
                    <TextField
                      fullWidth
                      onChange={(e) => { searchUser(e.target.value); }}
                      value={searchKey}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon
                              fontSize="small"
                              color="action"
                            >
                              <SearchIcon />
                            </SvgIcon>
                          </InputAdornment>
                        ),
                        endAdornment: (
                          searchKey ? (
                            <InputAdornment position="end" onClick={() => { closeSearch(); }} className="endAdornment">
                              <ClearIcon size={19} />
                            </InputAdornment>
                          ) : null
                        )
                      }}
                      placeholder="Search customer"
                      variant="outlined"
                    />
                  </Box>
                </Card>
                <Users
                  customers={filteredUsers}
                  selectedUser={selId}
                  toUser={refresh}
                  read={updateRead}
                />
              </Box>
            </Flip>
          </Grid>

          <Grid
            item
            xl={10}
            lg={9}
            md={9}
            xs={9}
          >

            {
                selId ? (
                  <div mt={3} className={clsx(classes.rootChat)} id="chatbox">
                    <Card
                      className={clsx('message-box')}
                      key={uuid()}
                      id="chatbox"
                    >
                      {
                    message.length ? message.map((msg) => {
                      return (
                        profile?.userId == msg.m_to_id ? <MyMsg content={msg} />
                          : <CustomerMsg content={msg} selectUser={selectedUser} />
                      );
                    }) : null
                  }
                    </Card>
                  </div>
                ) : (
                  <Flip left>
                    <Box mt={3}>
                      <Card className={clsx(classes.welcome)}>
                        <Typer
                          heading="Welcome to Chat Room:"
                          dataText={[
                            `Hello ${profile.userName}`,
                            'We hope you are fine',
                            'This is Places you can',
                            'Meet Friends And Teachers',
                            'Share Experiences',
                            'Learn many things from your mates',
                            'Enjoy yourself',
                          ]}
                        />
                      </Card>
                    </Box>
                  </Flip>
                )
              }
            {
                selId ? (
                  <div className="msgInputContainer">
                    <Menu
                      id="long-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={open}
                      onClose={handleEmojiPopClose}
                    >
                      <Picker onEmojiClick={onEmojiClick} />
                    </Menu>
                    <EmojiEmotionsIcon className="emojiButton" fontSize="large" onClick={handleEmojiPopClick} />
                    <input
                      type="text"
                      placeholder="Type a Message"
                      className="msgInput"
                      value={msgCon}
                      onChange={(e) => { setMsgCon(e.target.value); }}
                      onKeyPress={(e) => { keyPressHandle(e); }}
                      onClick={updateRead}
                    />
                    <SendIcon className="sendButton" fontSize="large" onClick={sendMessage} />
                  </div>
                ) : null
              }
          </Grid>

        </Grid>

      </Container>
    </Page>
  );
};

export default CustomerListView;
