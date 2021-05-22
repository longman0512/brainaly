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
  Avatar
} from '@material-ui/core';
import AliceCarousel from 'react-alice-carousel';
import Zoom from 'react-reveal/Zoom';
import TeacherItem from '../../components/TeacherItem';
import 'react-alice-carousel/lib/alice-carousel.css';

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
  }
}));

const topTeacher = [
  {
    id: 1,
    name: 'Juilia Samara',
    star: 5,
    classes: 10,
    students: 120,
    photo: 'static/images/team-2 1.png'
  },
  {
    id: 1,
    name: 'Juilia Samara',
    star: 4,
    classes: 10,
    students: 120,
    photo: 'static/images/team-2 1.png'
  },
  {
    id: 1,
    name: 'Juilia Samara',
    star: 5,
    classes: 10,
    students: 120,
    photo: 'static/images/team-2 1.png'
  },
  {
    id: 1,
    name: 'Juilia Samara',
    star: 5,
    classes: 10,
    students: 120,
    photo: 'static/images/team-2 1.png'
  },
  {
    id: 1,
    name: 'Juilia Samara',
    star: 5,
    classes: 10,
    students: 120,
    photo: 'static/images/team-2 1.png'
  },
  {
    id: 1,
    name: 'Juilia Samara',
    star: 5,
    classes: 10,
    students: 120,
    photo: 'static/images/team-2 1.png'
  }
];
const TeacherSection = () => {
  const classes = useStyles();
  const [teachers, setTeachers] = React.useState([]);
  const teacher = [];
  useEffect(() => {
    topTeacher.map((item, index) => {
      teacher.push(<TeacherItem item={item} data-value={index + 1} />);
    });
    setTeachers(teacher);
  }, []);
  const responsive = {
    0: { items: 1 },
    568: { items: 2 },
    1024: { items: 3 },
  };
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
            <Zoom top>
              <div style={{ color: '#01025C', fontSize: 46, fontWeight: 'bold' }}>Meet Our Best Teachers</div>
            </Zoom>
          </Grid>
        </Grid>
        <AliceCarousel responsive={responsive} autoPlay mouseTracking disableButtonsControls autoPlayInterval={5000} infinite items={teachers} />
      </Grid>
    </Box>
  );
};

export default TeacherSection;
