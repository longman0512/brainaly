import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  makeStyles
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import global from 'src/utils/global';

const useStyles = makeStyles(({
  root: {
    height: '100%'
  },
  image: {
    height: 48,
    width: 48
  }
}));

const LatestProducts = ({ className, questions, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardHeader
        subtitle={`${questions.length} in total`}
        title="Latest Quiz"
      />
      <Divider />
      <List>
        {questions.map((quiz, i) => (
          <ListItem
            divider={i < questions.length - 1}
            key={quiz.q_id}
          >
            <ListItemAvatar>
              <img
                alt="Product"
                className={classes.image}
                src={quiz.q_cover === '' ? '/static/collection.png' : `${global.serverUrl}upload/${quiz.q_cover}`}
              />
            </ListItemAvatar>
            <ListItemText
              primary={quiz.q_name}
              secondary={moment(quiz.q_created_at).format('dddd, MMMM Do YYYY, h:m:ss a')}
            />
            <IconButton
              edge="end"
              size="small"
            >
              <MoreVertIcon />
            </IconButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box
        display="flex"
        justifyContent="flex-end"
        p={2}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          View all
        </Button>
      </Box>
    </Card>
  );
};

LatestProducts.propTypes = {
  className: PropTypes.string,
  questions: PropTypes.array
};

export default LatestProducts;
