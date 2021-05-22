/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  // Button,
  ListItem,
  makeStyles,
  Grid,
  Avatar
} from '@material-ui/core';
import PhotoSizeSelectActualOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActualOutlined';
import Typography from '@material-ui/core/Typography';
import StoreContext from 'src/context/index';
import global from 'src/utils/global';
import Selected from './selected';
import Unselected from './unselected';

const useStyles = makeStyles((theme) => ({
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0,
    marginBottom: 10,
    marginTop: 10,
    flexDirection: 'column',
    textAlign: 'left',
    cursor: 'pointer',
  },
  button: {
    color: theme.palette.text.secondary,
    fontWeight: theme.typography.fontWeightMedium,
    justifyContent: 'flex-start',
    letterSpacing: 0,
    padding: '10px 8px',
    textTransform: 'none',
    width: '100%'
  },
  icon: {
    marginRight: theme.spacing(1)
  },
  title: {
    marginRight: 'auto'
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium
    },
    '& $icon': {
      color: theme.palette.primary.main
    }
  },
  quizBox: {
    width: '90%',
    height: 100,
    textAlign: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgrey',
    borderRadius: 5
  },
  quizBanner: {
    textAlign: 'left',
    width: '100%',
    marginBottom: 3
  },
  quizImg: {
    textAlign: 'center',
    width: '30%',
    height: 40
  },
  quizImgContainer: {
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center'
  }
}));

const NavItem = ({
  className,
  href,
  title,
  type,
  answer,
  nomer,
  image,
  ...rest
}) => {
  const classes = useStyles();
  const [content, setContent] = useState(null);
  const { store, setStore } = React.useContext(StoreContext);
  useEffect(() => {
    if (type === 1) {
      setContent(
        <Grid container xs={12}>
          <Grid item md={6} style={{ marginTop: 5 }}>
            {answer[0].sel === 1 ? <Selected /> : <Unselected />}
          </Grid>
          <Grid item md={6} style={{ marginTop: 5 }}>
            {answer[1].sel === 1 ? <Selected /> : <Unselected />}
          </Grid>
          <Grid item md={6} style={{ marginTop: 5 }}>
            {answer[2].sel === 1 ? <Selected /> : <Unselected />}
          </Grid>
          <Grid item md={6} style={{ marginTop: 5 }}>
            {answer[3].sel === 1 ? <Selected /> : <Unselected />}
          </Grid>
        </Grid>
      );
    } else {
      setContent(
        <Grid container xs={12} style={{ marginTop: 15 }}>
          <Grid item md={6}>
            {answer === 1 ? <Selected /> : <Unselected />}
          </Grid>
          <Grid item md={6}>
            {answer === 1 ? <Unselected /> : <Selected />}
          </Grid>
        </Grid>
      );
    }
  }, [store]);
  return (
    <ListItem
      className={clsx(classes.item, className)}
      disableGutters
      {...rest}
    >
      <Typography variant="body1" className={classes.quizBanner}>
        {nomer}
        .
        {' '}
        {type === 1 ? 'Quiz' : 'True or False'}
      </Typography>
      <div className={classes.quizBox}>
        <Typography variant="body1">
          {title.length > 15 ? title.slice(0, 15) : title || 'Question'}
        </Typography>
        <div className={classes.quizImgContainer}>
          {
            image ? (
              <Avatar
                alt="Product"
                src={`${global.serverUrl}upload/${image}`}
                variant="square"
                className={clsx(classes.quizImg, className)}
              />
            ) : <PhotoSizeSelectActualOutlinedIcon style={{ fontSize: 30 }} />
          }
        </div>
        {content}
      </div>
    </ListItem>
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string,
  answer: PropTypes.array,
  type: PropTypes.number,
  nomer: PropTypes.number,
  image: PropTypes.string
};

export default NavItem;
