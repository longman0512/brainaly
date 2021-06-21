/* eslint-disable prefer-const */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import {
  Grid,
  makeStyles
} from '@material-ui/core';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  starContainer: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));
const Ranking = ({ stars }) => {
  const showStar = () => {
    let starCont = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= stars) {
        starCont.push(<img src="static/images/star.png" alt="star" style={{ width: 30, height: 30 }} />);
      } else {
        starCont.push(<img src="static/images/star-silver.png" alt="star" style={{ width: 30, height: 30 }} />);
      }
    }
    return starCont;
  };
  const classes = useStyles();
  return (
    <Grid
      item
      className={classes.starContainer}
      xl={12}
      lg={12}
      md={12}
      xs={12}
    >
      {
        showStar()
      }

    </Grid>
  );
};

Ranking.propTypes = {
  stars: PropTypes.number
};

export default Ranking;
