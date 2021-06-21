/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  Avatar
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Ranking from './Rankings';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  cardMedia: {
    height: 600
  },
  boxContainer: {
    width: 250
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
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  nameContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 20
  }
}));

const TeacherItem = ({ item }) => {
  const classes = useStyles();

  return (
    <Card calssName={classes.boxContainer} style={{ width: 350, marginLeft: 30 }}>
      <CardContent className={classes.cardContent}>
        <Avatar aria-label="recipe" className={classes.avatar} src={item.photo}>
          {item.name}
        </Avatar>
        <Grid
          xl={12}
          lg={12}
          md={12}
          xs={12}
          item
          container
          flexDirection="row"
          justifyContent="center"
        >
          <Ranking stars={item.star} />
        </Grid>
        <Grid
          xl={12}
          lg={12}
          md={12}
          xs={12}
          item
          container
          flexDirection="row"
          justifyContent="center"
          className={classes.nameContainer}
        >
          <div>{item.name}</div>
        </Grid>
        <Grid
          xl={12}
          lg={12}
          md={12}
          xs={12}
          item
          container
          flexDirection="row"
          justifyContent="center"
          style={{
            marginTop: 10, display: 'flex', justifyContent: 'center', color: 'gray'
          }}
        >
          <div>Talented Teacher</div>
        </Grid>
        <Grid
          xl={12}
          lg={12}
          md={12}
          xs={12}
          item
          container
          flexDirection="row"
          justifyContent="space-between"
          style={{
            marginTop: 30, display: 'flex', justifyContent: 'center'
          }}
        >
          <div style={{
            display: 'flex', justifyContent: 'center', marginRight: 10, alignItems: 'center', width: 100
          }}
          >
            <img src="static/images/class_teacher.png" alt="class" style={{ width: 25, height: 25, marginRight: 10 }} />
            <div>{item.classes}</div>
          </div>
          <div style={{
            display: 'flex', justifyContent: 'center', marginRight: 10, alignItems: 'center', width: 100
          }}
          >
            <img src="static/images/students_svg.svg" alt="student" style={{ width: 30, height: 30, marginRight: 10 }} />
            <div>{item.students}</div>
          </div>
        </Grid>
      </CardContent>
    </Card>
  );
};

TeacherItem.propTypes = {
  item: PropTypes.object
};

export default TeacherItem;
