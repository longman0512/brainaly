/* eslint-disable array-callback-return */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
import React, { useEffect } from 'react';
import {
  Grid,
  makeStyles,
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from '@material-ui/core';
import Bounce from 'react-reveal/Bounce';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
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
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    height: 470,
    minWidth: 150,
    overflow: 'hidden',
  },
  stuContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 100
  }
}));

const StudentSection = () => {
  const classes = useStyles();
  return (
    <Box
      component="div"
      mt={15}
      className={classes.boxContainer}
    >
      <Grid
        container
        spacing={7}
      >
        <Grid item xs={12} container direction="column" spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs className={classes.titleContainer}>
            <Bounce top>
              <div style={{ color: '#01025C', fontSize: 46, fontWeight: 'bold' }}>Voice of Our Best Students</div>
            </Bounce>
          </Grid>
        </Grid>
        <Card className={classes.stuContainer}>
          <Grid
            container
            spacing={3}
          >
            <Grid
              xl={4}
              lg={4}
              md={12}
              xs={12}
              item
            >
              <Bounce left>
                <CardMedia
                  className={classes.cover}
                  image="static/images/bestStudent.png"
                />
              </Bounce>
            </Grid>
            <Grid
              xl={8}
              lg={8}
              md={12}
              xs={12}
              item
            >
              <div className={classes.details}>
                <Bounce right>
                  <CardContent className={classes.content}>
                    <Typography component="div" style={{ color: '#01025C', fontSize: 46, fontWeight: 'bold' }}>
                      I Love Learning
                    </Typography>
                    <Typography
                      component="div"
                      style={{
                        color: '#5E2B66', fontSize: 30
                      }}
                    >
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisl eros,
                      pulvinar facilisis justo mollis, auctor consequat urna. Morbi a bibendum metus.
                      Donec scelerisque sollicitudin enim eu venenatis. Duis tincidunt laoreet ex,
                      in pretium orci vestibulum eget. Class aptent taciti sociosqu ad litora torquent
                      per conubia nostra, per inceptos himenaeos.
                    </Typography>
                  </CardContent>
                </Bounce>
              </div>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </Box>
  );
};

export default StudentSection;
