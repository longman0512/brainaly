/* eslint-disable no-lonely-if */
/* eslint-disable no-shadow */
/* eslint-disable no-redeclare */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable vars-on-top */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-alert */
/* eslint-disable react/button-has-type */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable max-len */
/* eslint-disable react/jsx-indent */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  makeStyles,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  DialogContentText
} from '@material-ui/core';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Flip from 'react-reveal/Flip';
import {
  setSocket,
  emitEvent,
  onMessageReceived,
  offEvent
} from 'src/utils/socket';
import { signUp, playedGame } from 'src/utils/Api';
import cogoToast from 'cogo-toast';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ClearIcon from '@material-ui/icons/Clear';
import Page from 'src/components/Page';
import Loading from 'src/components/Loading';
import global from 'src/utils/global';
import CountDown from 'src/components/CountDown';
import EndGameSection from './endgame';
import Players from './Players';
import Unchecked from './answers/unchecked';
import Checked from './answers/checked';
import UncheckedCom from './answersCom/uncheckedCom';
import CheckedCom from './answersCom/checkedCom';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100vw',
    height: '100vh',
    // overflow: 'hidden',
    background: '#4e54c8',
  },
  header: {
    width: '100vw',
    height: '100vh',
    position: 'fixed',
    top: 50,
    display: 'flex',
    justifyContent: 'center',
    fontSize: 35,
    color: 'white'
  },
  modal: {
    width: '100vw',
    padding: 20
  },
  cardMedia: {
    height: 600
  },
  boxContainer: {
    marginLeft: '5vw',
    marginRight: '5vw',
    marginBottom: 100
  },
  titleInput: {
    marginTop: 30
  },
  titleContainer: {
    marginTop: 40
  },
  contentContainer: {
    marginTop: 40
  },
  buttonContainer: {
    marginTop: 40
  },
  avatar: {
    width: 150,
    height: 150
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'center'
  },
  answerContainer: {
    marginTop: 10,
    width: '90%',
    marginLeft: '5%',
    padding: 10,
    position: 'fixed',
    bottom: 50,
    left: 'calc(2% / 2)'
  },
  answerResultContainer: {
    marginTop: 10,
    width: '90%',
    marginLeft: '5%',
    padding: 10,
    position: 'fixed',
    top: 250,
    left: 'calc(2% / 2)'
  },
  answerSector: {
    padding: 10,
    fontSize: 30,
    color: 'white!important',
  },
  answerResultSector1: {
    padding: 10,
    fontSize: 30,
    color: 'white!important',
    display: 'flex',
    backgroundColor: '#e21b3c',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  answerResultSector2: {
    padding: 10,
    fontSize: 30,
    color: 'white!important',
    display: 'flex',
    backgroundColor: '#1368ce',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column'
  },
  answerResultSector3: {
    padding: 10,
    fontSize: 30,
    color: 'white!important',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#d89e00',
    alignItems: 'center',
    flexDirection: 'column'
  },
  answerResultSector4: {
    padding: 10,
    fontSize: 30,
    color: 'white!important',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#26890c',
    flexDirection: 'column'
  },
  subanswerResult: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  answerHeader: {
    marginBottom: 30,
    color: 'white',
    fontSize: 36
  }
}));

const GamePanel = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [gamePin, setGamePin] = React.useState('');
  const [playerInfo, setPlayerInfo] = React.useState({});
  const [players, setPlayers] = React.useState([]);
  const [gamePinModal, setGamePinModal] = React.useState(false);
  const [gameInfo, setGameInfo] = React.useState({});
  const [nickName, setNickName] = React.useState('');
  const [nickNameModal, setNickNameModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [timeInterval, setTimeInterval] = React.useState(false);
  const [answerResult, setAnswerResult] = React.useState([]);
  const [answerGraphic, setAnswerGraphic] = React.useState(<div className={classes.answerContainer}>{ 'sss ' }</div>);
  const [downTime, setDownTime] = React.useState(0);
  const [cQuizNum, setCurrentQuizNum] = React.useState(-1);
  const [visibleDownCounter, setVisibleDownCounter] = React.useState(false);
  const [uploadAnswerRequest, setUploadAnswerValueRequest] = React.useState(0);
  const [answerResultView, setAnswerResultView] = React.useState(<div className={classes.answerContainer}>{ 'sss ' }</div>);
  const timeIsUp = () => {
    var { currentNum } = playerInfo;
    var quizType = gameInfo?.gameContent ? gameInfo?.gameContent[currentNum]?.quizType : 3;
    if (quizType === 1) {
      const answers = gameInfo?.gameContent[currentNum]?.quizAnswer;
      setAnswerResult([0, 0, 0, 0]);
      setAnswerGraphic(
        <Grid container className={classes.answerContainer}>
          <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[0] === 'undefined' ? null : <UncheckedCom answer={answers[0].answer} order={0} check={answers[0].sel} updateAnswer={() => {}} cAnswer={answerResult} timeCount={downTime} /> }</Grid>
          <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[1] === 'undefined' ? null : <UncheckedCom answer={answers[1].answer} order={1} check={answers[1].sel} updateAnswer={() => {}} cAnswer={answerResult} timeCount={downTime} /> }</Grid>
          <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[2] === 'undefined' ? null : <UncheckedCom answer={answers[2].answer} order={2} check={answers[2].sel} updateAnswer={() => {}} cAnswer={answerResult} timeCount={downTime} /> }</Grid>
          <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[3] === 'undefined' ? null : <UncheckedCom answer={answers[3].answer} order={3} check={answers[3].sel} updateAnswer={() => {}} cAnswer={answerResult} timeCount={downTime} /> }</Grid>
        </Grid>
      );
    } else if (quizType === 2) {
      setAnswerResult([0, 0]);
      const answers = gameInfo?.gameContent[currentNum]?.quizAnswer;
      setAnswerGraphic(
        <Grid container className={classes.answerContainer}>
          { typeof answers === 'undefined' ? null : <CheckedCom order={1} check={answers === 0 ? 1 : 0} updateAnswer={() => {}} cAnswer={answerResult} timeCount={downTime} /> }
          {/* <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers === 'undefined' ? null : <Checked order={1} check={answers === 0 ? 1 : 0} updateAnswer={setAnswerResultcall} cAnswer={answerResult} /> }</Grid> */}
        </Grid>
      );
    }
  };

  React.useEffect(() => {
    return function cleanUP() {
      localStorage.removeItem('brainaly_game');
    };
  }, []);
  function updateAnswerView(uInfo) {
    var gameCorrectAnswers = gameInfo.gameContent[uInfo.currentNum];
    console.log(gameCorrectAnswers, uInfo.currentNum, uInfo.userAnswers, 'display answer result');
    if (gameCorrectAnswers.quizType === 1) {
      var countAnswer = [0, 0, 0, 0];
    } else {
      var countAnswer = [0, 0];
    }
    players.map((p) => {
      console.log(p);
      var pAnswer = p.userAnswers[uInfo.currentNum];
      pAnswer.map((ans, index) => {
        countAnswer[index] += ans;
      });
    });
    var userAnswer = uInfo.userAnswers[uInfo.currentNum];
    if (playerInfo.userId == gameInfo.ownerId) {
      if (gameCorrectAnswers.quizType === 1) {
        setAnswerResultView(
          <Grid container className={classes.answerResultContainer}>
            <Grid item sm={12} className={classes.answerHeader}>
              <h1>{gameInfo?.gameContent ? gameInfo?.gameContent[playerInfo.currentNum].title : null}</h1>
            </Grid>
            <Grid item sm={12} className={classes.subanswerResult}>
            <Grid item md={3} sm={3} xs={3} className={classes.answerResultSector1}>
              <div className="answerResultContain">
                <div className="answer-item">
                  {gameCorrectAnswers.quizAnswer[0].sel ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <ClearIcon fontSize="large" className={classes.icons} />}
                  {gameCorrectAnswers.quizAnswer[0].answer}
                </div>
                <div>
                  {countAnswer[0]}
                </div>
              </div>
            </Grid>
            <Grid item md={3} sm={3} xs={3} className={classes.answerResultSector2}>
              <div className="answerResultContain">
                <div className="answer-item">
                  {gameCorrectAnswers.quizAnswer[1].sel ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <ClearIcon fontSize="large" className={classes.icons} />}
                  {gameCorrectAnswers.quizAnswer[1].answer}
                </div>
                <div>
                  {countAnswer[1]}
                </div>
              </div>
            </Grid>
            </Grid>
            <Grid item sm={12} className={classes.subanswerResult}>
            <Grid item md={3} sm={3} xs={3} className={classes.answerResultSector3}>
              <div className="answerResultContain">
                <div className="answer-item">
                  {gameCorrectAnswers.quizAnswer[2].sel ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <ClearIcon fontSize="large" className={classes.icons} />}
                  {gameCorrectAnswers.quizAnswer[2].answer}
                </div>
                <div>
                  {countAnswer[2]}
                </div>
              </div>
            </Grid>
            <Grid item md={3} sm={3} xs={3} className={classes.answerResultSector4}>
              <div className="answerResultContain">
                <div className="answer-item">
                  {gameCorrectAnswers.quizAnswer[3].sel ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <ClearIcon fontSize="large" className={classes.icons} />}
                  {gameCorrectAnswers.quizAnswer[3].answer}
                </div>
                <div>
                  {countAnswer[3]}
                </div>
              </div>
            </Grid>
            </Grid>
          </Grid>
        );
      } else if (gameCorrectAnswers.quizType === 2) {
        if (gameCorrectAnswers.quizAnswer == 1) {
          var correctAnswer = [0, 1];
        } else {
          var correctAnswer = [1, 0];
        }
        setAnswerResultView(
          <Grid container className={classes.answerResultContainer}>
            <Grid item sm={12} className={classes.answerHeader}>
              <h1>{gameInfo?.gameContent ? gameInfo?.gameContent[playerInfo.currentNum].title : null}</h1>
            </Grid>
            <Grid item md={6} sm={6} xs={6} className={classes.answerResultSector1}>
              <div className="answerResultContain">
                <div className="answer-item">
                {correctAnswer[1] ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <ClearIcon fontSize="large" className={classes.icons} />}
                </div>
                <div>
                  {countAnswer[0]}
                </div>
              </div>
            </Grid>
            <Grid item md={6} sm={6} xs={6} className={classes.answerResultSector2}>
              <div className="answerResultContain">
                <div className="answer-item">
                {correctAnswer[0] ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <ClearIcon fontSize="large" className={classes.icons} />}
                </div>
                <div>
                  {countAnswer[1]}
                </div>
              </div>
            </Grid>
          </Grid>
        );
      }
    } else {
      if (gameCorrectAnswers.quizType === 1) {
        console.log(userAnswer, 'user answer and correct answer');
        setAnswerResultView(
          <Grid container className={classes.answerResultContainer}>
            <Grid item sm={12} className={classes.answerHeader}>
              <h1>{gameInfo?.gameContent ? gameInfo?.gameContent[playerInfo.currentNum].title : null}</h1>
            </Grid>
            <Grid item sm={12} className={classes.subanswerResult}>
            <Grid item md={3} sm={3} xs={3} className={classes.answerResultSector1}>
              <div className="answerResultContain">
                <div className="answer-item">
                {gameCorrectAnswers.quizAnswer[0].sel == userAnswer[0] ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <ClearIcon fontSize="large" className={classes.icons} />}
                {gameCorrectAnswers.quizAnswer[0].answer}
                </div>
              </div>
            </Grid>
            <Grid item md={3} sm={3} xs={3} className={classes.answerResultSector2}>
              <div className="answerResultContain">
                <div className="answer-item">
                {gameCorrectAnswers.quizAnswer[1].sel == userAnswer[1] ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <ClearIcon fontSize="large" className={classes.icons} />}
                {gameCorrectAnswers.quizAnswer[1].answer}
                </div>
              </div>
            </Grid>
            </Grid>
          <Grid item sm={12} className={classes.subanswerResult}>
          <Grid item md={3} sm={3} xs={3} className={classes.answerResultSector3}>
              <div className="answerResultContain">
                <div className="answer-item">
                {gameCorrectAnswers.quizAnswer[2].sel == userAnswer[2] ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <ClearIcon fontSize="large" className={classes.icons} />}
                {gameCorrectAnswers.quizAnswer[2].answer}
                </div>
              </div>
          </Grid>
            <Grid item md={3} sm={3} xs={3} className={classes.answerResultSector4}>
              <div className="answerResultContain">
                <div className="answer-item">
                {gameCorrectAnswers.quizAnswer[3].sel == userAnswer[3] ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <ClearIcon fontSize="large" className={classes.icons} />}
                {gameCorrectAnswers.quizAnswer[3].answer}
                </div>
              </div>
            </Grid>
          </Grid>
          </Grid>
        );
      } else if (gameCorrectAnswers.quizType === 2) {
        if (gameCorrectAnswers.quizAnswer == 1) {
          var correctAnswer = [1, 0];
        } else {
          var correctAnswer = [0, 1];
        }
        console.log(userAnswer, correctAnswer, 'user answer and correct answer');
        setAnswerResultView(
          <Grid container className={classes.answerResultContainer}>
            <Grid item sm={12} className={classes.answerHeader}>
              <h1>{gameInfo?.gameContent ? gameInfo?.gameContent[playerInfo.currentNum].title : null}</h1>
            </Grid>
            <Grid item md={6} sm={6} xs={6} className={classes.answerResultSector1}>
              <div className="answerResultContain">
                <div className="answer-item">
                {userAnswer[0] == correctAnswer[0] ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <ClearIcon fontSize="large" className={classes.icons} />}
                </div>
              </div>
            </Grid>
            <Grid item md={6} sm={6} xs={6} className={classes.answerResultSector2}>
              <div className="answerResultContain">
                <div className="answer-item">
                {userAnswer[1] == correctAnswer[1] ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <ClearIcon fontSize="large" className={classes.icons} />}
                </div>
              </div>
            </Grid>
          </Grid>
        );
      }
    }
  }
  function togglePinModal() {
    setGamePinModal(!gamePinModal);
  }
  React.useEffect(() => {
    console.log(downTime, 'downtime');
    if (downTime <= 0) {
      timeIsUp();
      // if (gameInfo?.gameContent) {
      // }
      for (var i = 0; i < 1000; i++) {
        window.clearInterval(i);
      }
    }
  }, [downTime]);
  function toMidGame() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3500);
    emitEvent('toMidState', {
      playerInfo,
      answerResult
    });
  }
  function countDown() {
    setDownTime((downTime) => downTime - 1);
  }

  function setAnswerResultcall(upData) {
    console.log(upData, 'on index');
    emitEvent('updateAnswer', {
      playerInfo,
      upData
    });
    setAnswerResult([...upData]);
    console.log(gameInfo, 'gameinfo update');
    var { currentNum } = playerInfo;
    // if (playerInfo?.currentNum >= 0) {
    //   var currentNum = playerInfo?.currentNum;
    //   if (currentNum < 0) currentNum = 0;
    // } else {
    //   var currentNum = 0;
    // }
    // if (currentNum >= gameInfo.gameQuizNum) {
    //   currentNum = gameInfo.gameQuizNum - 1;
    // }
    setCurrentQuizNum(currentNum);
    var quizType = gameInfo?.gameContent ? gameInfo?.gameContent[currentNum]?.quizType : 3;
    if (quizType === 1) {
      const answers = gameInfo?.gameContent[currentNum]?.quizAnswer;
      setAnswerResult([0, 0, 0, 0]);
      setTimeout(() => {
        setAnswerGraphic(
          <Grid container className={classes.answerContainer}>
            <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[0] === 'undefined' ? null : <Unchecked owner={playerInfo.userId == gameInfo.ownerId} answer={answers[0].answer} order={0} check={answers[0].sel} updateAnswer={setAnswerResultcall} cAnswer={answerResult} timeCount={downTime} /> }</Grid>
            <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[1] === 'undefined' ? null : <Unchecked owner={playerInfo.userId == gameInfo.ownerId} answer={answers[1].answer} order={1} check={answers[1].sel} updateAnswer={setAnswerResultcall} cAnswer={answerResult} timeCount={downTime} /> }</Grid>
            <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[2] === 'undefined' ? null : <Unchecked owner={playerInfo.userId == gameInfo.ownerId} answer={answers[2].answer} order={2} check={answers[2].sel} updateAnswer={setAnswerResultcall} cAnswer={answerResult} timeCount={downTime} /> }</Grid>
            <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[3] === 'undefined' ? null : <Unchecked owner={playerInfo.userId == gameInfo.ownerId} answer={answers[3].answer} order={3} check={answers[3].sel} updateAnswer={setAnswerResultcall} cAnswer={answerResult} timeCount={downTime} /> }</Grid>
          </Grid>
        );
      }, 300);
    } else if (quizType === 2) {
      setAnswerResult([0, 0]);
      const answers = gameInfo?.gameContent[currentNum]?.quizAnswer;
      setTimeout(() => {
        setAnswerGraphic(
          <Grid container className={classes.answerContainer}>
            { typeof answers === 'undefined' ? null : <Checked owner={playerInfo.userId == gameInfo.ownerId} order={1} check={answers === 0 ? 1 : 0} updateAnswer={setAnswerResultcall} cAnswer={answerResult} timeCount={downTime} /> }
            {/* <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers === 'undefined' ? null : <Checked order={1} check={answers === 0 ? 1 : 0} updateAnswer={setAnswerResultcall} cAnswer={answerResult} /> }</Grid> */}
          </Grid>
        );
      }, 300);
    }
  }
  React.useEffect(() => {
    console.log(gameInfo, 'gameinfo update');
    var { currentNum } = playerInfo;
    // if (playerInfo?.currentNum >= 0) {
    //   var currentNum = playerInfo?.currentNum;
    //   if (currentNum < 0) currentNum = 0;
    // } else {
    //   var currentNum = 0;
    // }
    // if (currentNum >= gameInfo.gameQuizNum) {
    //   currentNum = gameInfo.gameQuizNum - 1;
    // }
    setCurrentQuizNum(currentNum);
    var quizType = gameInfo?.gameContent ? gameInfo?.gameContent[currentNum]?.quizType : 3;
    if (quizType === 1) {
      const answers = gameInfo?.gameContent[currentNum]?.quizAnswer;
      setAnswerResult([0, 0, 0, 0]);
      setAnswerGraphic(
        <Grid container className={classes.answerContainer}>
          <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[0] === 'undefined' ? null : <Unchecked owner={playerInfo.userId == gameInfo.ownerId} answer={answers[0].answer} order={0} check={answers[0].sel} updateAnswer={setAnswerResultcall} cAnswer={answerResult} timeCount={downTime} /> }</Grid>
          <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[1] === 'undefined' ? null : <Unchecked owner={playerInfo.userId == gameInfo.ownerId} answer={answers[1].answer} order={1} check={answers[1].sel} updateAnswer={setAnswerResultcall} cAnswer={answerResult} timeCount={downTime} /> }</Grid>
          <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[2] === 'undefined' ? null : <Unchecked owner={playerInfo.userId == gameInfo.ownerId} answer={answers[2].answer} order={2} check={answers[2].sel} updateAnswer={setAnswerResultcall} cAnswer={answerResult} timeCount={downTime} /> }</Grid>
          <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers[3] === 'undefined' ? null : <Unchecked owner={playerInfo.userId == gameInfo.ownerId} answer={answers[3].answer} order={3} check={answers[3].sel} updateAnswer={setAnswerResultcall} cAnswer={answerResult} timeCount={downTime} /> }</Grid>
        </Grid>
      );
    } else if (quizType === 2) {
      setAnswerResult([0, 0]);
      const answers = gameInfo?.gameContent[currentNum]?.quizAnswer;
      setAnswerGraphic(
        <Grid container className={classes.answerContainer}>
          { typeof answers === 'undefined' ? null : <Checked owner={playerInfo.userId == gameInfo.ownerId} order={1} check={answers === 0 ? 1 : 0} updateAnswer={setAnswerResultcall} cAnswer={answerResult} timeCount={downTime} /> }
          {/* <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>{ typeof answers === 'undefined' ? null : <Checked order={1} check={answers === 0 ? 1 : 0} updateAnswer={setAnswerResultcall} cAnswer={answerResult} /> }</Grid> */}
        </Grid>
      );
    }
    if (gameInfo.gameStatus == 'playing' && !timeInterval) {
      console.log('check interval');
      for (var i = 0; i < 1000; i++) {
        window.clearInterval(i);
      }
      setVisibleDownCounter(true);
      if (playerInfo?.currentNum >= 0) {
        var currentNum = playerInfo?.currentNum;
        if (currentNum < 0) currentNum = 0;
      } else {
        var currentNum = 0;
      }
      setDownTime(gameInfo.gameContent[currentNum].quizTime);
      setTimeout(() => {
        var tInterval = setInterval(() => {
          countDown();
        }, 1000);
        setVisibleDownCounter(false);
      }, 4500);
    }
    if (gameInfo.gameStatus == 'end') {
      localStorage.removeItem('brainaly_game');
    }
  }, [playerInfo]);
  React.useEffect(() => {
    console.log(players, 'players update');
    if (playerInfo.gameId === players[0]?.gameId) {
      players.map((d) => {
        if (d.userId == playerInfo.userId) {
          console.log('userInfo');
          setPlayerInfo(d);
          if (d.userStatus == 'mid') {
            setTimeout(() => {
              updateAnswerView(d);
            }, 1000);
          }
          localStorage.setItem('brainaly_game', JSON.stringify(d));
        }
      });
    }
  }, [players]);
  function enterNickName() {
    emitEvent('checkPinCode', gamePin);
    return true;
  }
  function toggleNickModal() {
    setNickNameModal(!nickNameModal);
  }
  function joinGame() {
    if (!nickName) {
      cogoToast.warn('Please Insert Nick Name', { position: 'top-right' });
      return false;
    }
    setGamePinModal(false);
    console.log(playerInfo);
    const gameUser = {
      userId: Math.random().toString(16).slice(-4),
      userNickName: nickName,
      currentNum: 0,
      userScore: 0,
      userStatus: 'ready',
      gameId: gamePin,
      userAnswers: []
    };
    console.log(gameUser, 'userinfo before use join game');
    localStorage.setItem('brainaly_game', JSON.stringify(gameUser));
    setPlayerInfo(gameUser);
    setNickNameModal(false);
    emitEvent('joingame', gameUser);
    return true;
  }
  function okPinCode() {
    console.log('okPincode');
    setTimeout(() => {
      setLoading(false);
      togglePinModal();
      toggleNickModal();
    }, 1000);
  }
  function noPinCode() {
    console.log('noPincode');
    setTimeout(() => {
      setGamePinModal(true);
      setNickNameModal(false);
      cogoToast.warn('PinCode is invalid', { position: 'top-right' });
      setLoading(false);
    }, 1000);
  }
  function checkPinCode() {
    if (gamePin.length !== 4) {
      cogoToast.warn('Please insert correct Game Pin', { position: 'top-right' });
      return false;
    } if (!gamePin) {
      cogoToast.warn('Please insert Game Pin', { position: 'top-right' });
      return false;
    }
    setLoading(true);
    emitEvent('checkPinCode', gamePin);
    setTimeout(() => {
      if (loading) {
        setLoading(false);
        cogoToast.warn('Network Error! Please try again', { position: 'top-right' });
      }
    }, 3000);
    return true;
  }
  function animationBackground() {
    // Some random colors
    const colors = ['#3CC157', '#2AA7FF', '#1B1B1B', '#FCBC0F', '#F85F36'];

    const numBalls = 50;
    const balls = [];

    for (let i = 0; i < numBalls; i++) {
      const ball = document.createElement('div');
      ball.classList.add('ball');
      ball.style.background = colors[Math.floor(Math.random() * colors.length)];
      ball.style.left = `${Math.floor(Math.random() * 100)}vw`;
      ball.style.top = `${Math.floor(Math.random() * 100)}vh`;
      ball.style.transform = `scale(${Math.random()})`;
      ball.style.width = `${Math.random()}em`;
      ball.style.height = ball.style.width;

      balls.push(ball);
      document.body.append(ball);
    }

    // Keyframes
    balls.forEach((el, i, ra) => {
      const to = {
        x: Math.random() * (i % 2 === 0 ? -11 : 11),
        y: Math.random() * 12
      };

      const anim = el.animate(
        [
          { transform: 'translate(0, 0)' },
          { transform: `translate(${to.x}rem, ${to.y}rem)` }
        ],
        {
          duration: (Math.random() + 1) * 2000, // random duration
          direction: 'alternate',
          fill: 'both',
          iterations: Infinity,
          easing: 'ease-in-out'
        }
      );
    });
  }
  function updatePlayers(data) {
    console.log('userInfo updated', data);
    // if (data.length <= 0) {
    //   togglePinModal();
    // }
    const currentUser = JSON.parse(localStorage.getItem('brainaly_game'));
    if (data && currentUser) {
      if (currentUser.gameId === data[0]?.gameId) {
        setPlayers(data);
        data.map((d) => {
          if (d.userId == playerInfo.userId) {
            console.log('userInfo');
            setPlayerInfo(d);
            localStorage.setItem('brainaly_game', JSON.stringify(d));
          }
        });
      }
    }
  }
  function updateGameInfo(data) {
    console.log('game Info updated', data);
    const currentUser = JSON.parse(localStorage.getItem('brainaly_game'));
    if (currentUser) {
      if (currentUser.gameId === data.gameId) {
        setGameInfo(data);
      }
    }
  }
  function StartGame() {
    console.log('start gaem');
    playedGame({
      gameId: gameInfo.sourceId
    });
    emitEvent('startQuiz', gameInfo, playerInfo);
  }
  function reJoinGame() {
    const cUser = JSON.parse(localStorage.getItem('brainaly_game'));
    console.log('rejoin', cUser);
    emitEvent('Rjoingame', cUser);
  }
  // function uploadAnswer() {
  //   setUploadAnswerValueRequest(Math.random().toString(16).slice(-4));
  // }
  // React.useEffect(() => {
  //   console.log(answerResult.length);
  //   if (answerResult.length) {
  //     console.log('upload answer by server request', answerResult);
  //     emitEvent('updateAnswer', {
  //       playerInfo,
  //       answerResult
  //     });
  //   }
  // }, [setUploadAnswerValueRequest]);
  function endGame() {
    emitEvent('endGame', gameInfo.gameId);
  }
  function completeGame() {
    localStorage.removeItem('brainaly_game');
    setGamePinModal(true);
    setGameInfo({});
    setPlayers([]);
    console.log('endGame');
  }
  React.useEffect(() => {
    window.addEventListener('beforeunload', (event) => {
      event.returnValue = 'Hellooww';
    });

    setSocket();
    // animationBackground();
    offEvent('newUserJoined');
    offEvent('updatedGameInfo');
    offEvent('rejoinGame');
    // offEvent('sendSerAnswer');
    offEvent('okPinCode');
    offEvent('noPinCode');
    offEvent('endedGame');
    onMessageReceived('rejoinGame', reJoinGame);
    onMessageReceived('newUserJoined', updatePlayers);
    onMessageReceived('updatedGameInfo', updateGameInfo);
    onMessageReceived('okPinCode', okPinCode);
    onMessageReceived('endedGame', completeGame);
    // onMessageReceived('sendSerAnswer', uploadAnswer);
    onMessageReceived('noPinCode', noPinCode);
    const currentUser = JSON.parse(localStorage.getItem('brainaly_game'));
    if (!currentUser) {
      setGamePinModal(true);
    } else {
      setPlayerInfo(currentUser);
      emitEvent('joingame', currentUser);
      // emitEvent('getGameInfo', currentUser);
    }
  }, []);

  function NextGame() {
    console.log('next game');
    emitEvent('nextQuiz', gameInfo);
  }
  return (
    <Page
      className={classes.root}
    >
      <div className="area">
        <ul className="circles">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
      <Loading visible={loading} />
      {/*  modals start */}
      <Dialog
        open={gamePinModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        key="hostModal"
        className={classes.modal}
      >
        <DialogTitle id="alert-dialog-title">Insert Game Pin</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <TextField
              placeholder="Pin Code"
              className={classes.titleInput}
              inputProps={{ style: { fontSize: 28, textAlign: 'center' } }}
              onChange={(e) => setGamePin(e.target.value)}
              value={gamePin}
            />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <button className="game-ok" onClick={checkPinCode}>O K</button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={nickNameModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        key="nickNameModal"
        className={classes.modal}
      >
        <Flip>
          <DialogTitle id="alert-dialog-title">Insert your NickName</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <TextField
                placeholder="Nick Name"
                className={classes.titleInput}
                inputProps={{ style: { fontSize: 28, textAlign: 'center' } }}
                onChange={(e) => setNickName(e.target.value)}
                value={nickName}
              />
            </DialogContentText>
          </DialogContent>
        </Flip>
        <DialogActions>
          <button className="game-ok" onClick={joinGame}>Join</button>
        </DialogActions>
      </Dialog>
      {/* modals end */}

      {/* top title */}
      {
        (gameInfo.gameStatus === 'ready') ? (
          <Grid
            container
            spacing={3}
            justify="space-around"
            className={classes.header}
          >
            <Grid
              item
            >
              <h1>Waiting for Users</h1>
            </Grid>
          </Grid>
        ) : null
      }

      {/* start button */}
      { (gameInfo.gameStatus === 'ready' && gameInfo.ownerId === playerInfo.userId)
        ? playerInfo.currentNum
          ? <button className="game-ok next" onClick={StartGame}>Next</button> : <button className="game-ok start" onClick={StartGame}>Start</button>
        : null}
      {
        (gameInfo.gameStatus === 'ready' || gameInfo.gameStatus === 'mid') ? <Players gameContent={gameInfo} playersData={players} userInfo={playerInfo} /> : null
      }
      {/* game plaing */}

      {
        playerInfo.userStatus == 'playing' ? (
          <Grid
            container
            spacing={3}
            justify="space-around"
            className={classes.header}
          >
            <Grid
              item
            >
              <>
                <h1>{gameInfo?.gameContent ? gameInfo?.gameContent[playerInfo.currentNum].title : null}</h1>
                <img src={`${global.serverUrl}upload/${gameInfo?.gameContent ? gameInfo?.gameContent[playerInfo.currentNum].image : null}`} className="quiz-image" />
              </>
            </Grid>
          </Grid>
        ) : null
      }
      {
        playerInfo.userStatus == 'playing'
          ? (
            answerGraphic
          ) : null
      }

      {/* question number display */}
      {
        (typeof gameInfo.gameQuizNum != 'undefined')
          ? (
            (playerInfo.currentNum + 1 <= gameInfo.gameQuizNum)
              ? <div className="question-num-container">{`${playerInfo.currentNum + 1}/${gameInfo.gameQuizNum}`}</div> : null
          ) : null
      }

      {/* quztion time display */}
      {
        (gameInfo.gameStatus == 'playing' && playerInfo.userStatus == 'playing')
          ? <div className="timer">{`${downTime} s`}</div> : null
      }

      {/* mid status */}
      {
        (playerInfo.userId == gameInfo.ownerId && gameInfo.gameStatus == 'mid') ? <button className="game-ok next" onClick={NextGame}>Next</button> : null
      }
      {
        (playerInfo.userId == gameInfo.ownerId && gameInfo.gameStatus == 'playing' && downTime == 0) ? <button className="game-ok next" onClick={toMidGame}>View Mid Result</button> : null
      }
      {
        (playerInfo.userId == gameInfo.ownerId && gameInfo.gameStatus == 'end') ? <button className="game-ok next" onClick={endGame}>End</button> : null
      }
      {
        playerInfo.userStatus == 'mid' ? answerResultView : null
      }

      {/* end game show */}
      {
        gameInfo.gameStatus == 'end'
          ? <EndGameSection game={gameInfo} playersInfo={players} userInfo={playerInfo} /> : null
      }
      <CountDown visible={visibleDownCounter} />
    </Page>
  );
};

export default GamePanel;
