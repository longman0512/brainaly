import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  colors
} from '@material-ui/core';
import SchoolIcon from '@material-ui/icons/School';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  },
  avatar: {
    backgroundColor: colors.indigo[600],
    height: 56,
    width: 56
  }
}));

const Classes = ({ className, num, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
          spacing={3}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Classes
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              {num}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <SchoolIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

Classes.propTypes = {
  className: PropTypes.string,
  num: PropTypes.number
};

export default Classes;
