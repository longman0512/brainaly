/* eslint-disable vars-on-top */
/* eslint-disable eqeqeq */
/* eslint-disable max-len */
/* eslint-disable no-var */
import React from 'react';
import PropTypes from 'prop-types';
import {
  makeStyles,
  Card,
  IconButton,
  Typography,
  Grid
} from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
// import cogoToast from 'cogo-toast';

const useStyles = makeStyles({
  container: {
    // backgroundColor: 'white'
  },
  icons: {
    color: '#fff'
  },
  checking: {
    // backgroundColor: 'white'
    transition: 'transform .5s ease',
    '&:hover': {
      transform: 'scale(1.05)'
    },
    cursor: 'pointer'
  },
  textSection: {
    width: '100%',
  },
  root: {
    minHeight: 100,
    padding: 10,
    alignItems: 'center',
    textAlign: 'center',
    display: 'flex'
  },
  answerSector: {
    padding: 10,
    fontSize: 30,
    color: 'white!important',
  },
});
const colors = [
  '#1368ce',
  '#e21b3c'
];
export default function Unchecked({
  order, check, cAnswer, updateAnswer, timeCount, owner
}) {
  const classes = useStyles();
  const [cResult, setCResult] = React.useState(cAnswer);
  async function updateCheck(pos, status) {
    console.log(status, timeCount, order);
    var answer = cAnswer;
    answer[pos] = cAnswer[pos] === 1 ? 0 : 1;
    if (pos == 0) {
      answer[1] = answer[0] == 1 ? 0 : 1;
    } else {
      console.log('pos = 1', answer[1]);
      answer[0] = answer[1] == 1 ? 0 : 1;
    }
    console.log(answer, 'updatedanswer');
    // if (timeCount == 0) {
    //   cogoToast.warn('Time is up', { position: 'top-right' });
    // } else {
    updateAnswer([...answer]);
    setCResult([...answer]);
    // }
  }
  return (
    <>
      <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>
        <div className={classes.container}>
          <Card className={classes.root} style={{ backgroundColor: colors[0] }} onClick={() => { updateCheck(0, check); }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <div className={classes.textSection}>
                <Typography variant="h3" style={{ color: '#fff' }}>
                  True
                </Typography>
              </div>
              <div style={{ alignItems: 'center', display: 'flex' }}>
                {
                  !owner ? (
                    <IconButton aria-label="delete" className={classes.checking}>
                      {cResult[0] === 1 ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <RadioButtonUncheckedIcon fontSize="large" className={classes.icons} />}
                    </IconButton>
                  ) : null
                }

              </div>
            </div>
          </Card>
        </div>
      </Grid>
      <Grid item md={6} sm={6} xs={12} className={classes.answerSector}>
        <div className={classes.container}>
          <Card className={classes.root} style={{ backgroundColor: colors[1] }} onClick={() => { updateCheck(1, check); }}>
            <div style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
              <div className={classes.textSection}>
                <Typography variant="h3" style={{ color: '#fff' }}>
                  False
                </Typography>
              </div>
              <div style={{ alignItems: 'center', display: 'flex' }}>
                {
                  !owner ? (
                    <IconButton aria-label="delete" className={classes.checking}>
                      {cResult[1] === 1 ? <CheckCircleIcon fontSize="large" className={classes.icons} /> : <RadioButtonUncheckedIcon fontSize="large" className={classes.icons} />}
                    </IconButton>
                  ) : null
                }
              </div>
            </div>
          </Card>
        </div>
      </Grid>
    </>
  );
}
Unchecked.propTypes = {
  order: PropTypes.number,
  check: PropTypes.bool,
  updateAnswer: PropTypes.func,
  cAnswer: PropTypes.array,
  timeCount: PropTypes.number,
  owner: PropTypes.bool
};
