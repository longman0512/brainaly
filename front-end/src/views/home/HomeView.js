/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import {
  makeStyles,
} from '@material-ui/core';
import Page from 'src/components/Page';
import IntroSection from './IntroSection';
import JoinSection from './JoinSection';
import TeacherSection from './TeacherSection';
import StudentSection from './BestStuSection';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
    overflow: 'hidden'
  },
  cardMedia: {
    height: 600
  },
  boxContainer: {
    marginLeft: '5vw',
    marginRight: '5vw'
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
  }
}));

const HomeView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Home"
    >
      <IntroSection />
      <JoinSection />
      <TeacherSection />
      <StudentSection />
    </Page>
  );
};

export default HomeView;
