/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import {
  Hidden,
  makeStyles
} from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import PhotoSizeSelectActualOutlinedIcon from '@material-ui/icons/PhotoSizeSelectActualOutlined';
import AddIcon from '@material-ui/icons/Add';
import StoreContext from 'src/context/index';

const useStyles = makeStyles({
  root: {
    minWidth: 100,
    width: 150,
    cursor: 'pointer',
    marginRight: 3,
    padding: 0,
    '&:hover': {
      backgroundColor: '#c5c5c5',
    }
  },
  selected: {
    minWidth: 100,
    width: 150,
    cursor: 'pointer',
    backgroundColor: '#c5c5c5',
    marginRight: 3,
    padding: 0,
    '&:hover': {
      backgroundColor: '#c5c5c5',
    }
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    padding: 0
  },
  bottomBar: {
    width: 'calc(100% - 200px)',
    position: 'absolute',
    bottom: 0,
    backgroundColor: '#f4f6f8',
    display: 'flex',
    flexDirection: 'row',
    boxShadow: '0px 0 10px rgba(0, 0, 0, 0.5)',
    padding: 3,
    maxHeight: 130
  },
  bottomBarContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: 'calc(100% - 100px)',
    textAlign: 'center',
    overflowX: 'auto'
  },
  buttonContainer: {
    display: 'flex',
    padding: 15,
    paddingTop: 35,
    paddingBottom: 35,
  },
  cardContent: {
    padding: 0,
    paddingTop: 16,
    paddingBottom: 16
  }
});

export default function BottomBar({ items }) {
  const classes = useStyles();
  const { store, setStore } = React.useContext(StoreContext);
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  async function addNewQuiz() {
    const preStore = store;
    const preItems = preStore.items;
    const item = {
      href: '',
      title: '',
      quizType: 1,
      quizAnswer: [
        {
          sel: 0,
          answer: ''
        },
        {
          sel: 0,
          answer: ''
        },
        {
          sel: 0,
          answer: ''
        },
        {
          sel: 0,
          answer: ''
        },
      ],
      quizTime: 20,
      point: 2,
      image: ''
    };
    preItems.push(item);
    setStore({
      items: preItems,
      selectedNav: [{ id: preItems.length - 1 }],
      selectedItem: preItems
    });
    setSelectedIndex(preItems.length - 1);
  }
  async function selectQuiz(id) {
    setSelectedIndex(id);
    const preStore = store;
    setStore({
      items: preStore.items,
      selectedNav: [{ id }],
      selectedItem: items[id]
    });
  }
  useEffect(() => {
    setSelectedIndex(typeof store?.selectedNav === 'undefined' ? 0 : store?.selectedNav[0]?.id);
  }, [store]);
  return (
    <div className={classes.bottomBar}>
      <Hidden mdUp>
        <div className={classes.bottomBarContainer}>
          {items?.map((item, index) => (
            <Card className={selectedIndex === index ? classes.selected : classes.root} onClick={() => { selectQuiz(index); }} variant="outlined">
              <CardContent className={classes.cardContent}>
                <Typography className={classes.pos} color="textSecondary">
                  {item.title.length > 15 ? item.title.slice(0, 15) : item.title || 'Question'}
                </Typography>
                <PhotoSizeSelectActualOutlinedIcon />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className={classes.buttonContainer}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={() => { addNewQuiz(); }}
          >
            <AddIcon />
          </Button>
        </div>
      </Hidden>
    </div>
  );
}
BottomBar.propTypes = {
  items: PropTypes.array
};
