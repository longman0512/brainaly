/* eslint-disable eqeqeq */
/* eslint-disable no-shadow */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  makeStyles,
  Card,
  CardContent,
  Typography,
  Divider,
  Button
} from '@material-ui/core';
import { getColById, getQuizById } from 'src/utils/Api';
import CollectionContext from 'src/context/collection';
import authChecker from 'src/utils/authHelper';
import global from 'src/utils/global';
import ProductCard from './ProductCard';
import EditDialog from './dialog';
import AddDialog from './AddPop';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 20
  },
  tatsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(3)
  },
  quAvatar: {
    width: 150,
    borderRadius: 5
  },
  hambergerContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  menuItem: {
    width: 100
  },
  menuIcon: {
    marginRight: theme.spacing(1)
  },
  desImage: {
    width: '100%',
    maxHeight: 300,
    objectFit: 'cover',
    borderRadius: 5,
    [theme.breakpoints.up('xs')]: {
      display: 'block'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  divider: {
    marginTop: 5,
    marginBottom: 5
  },
  editButton: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: 30
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
}));
export default function EditCollection() {
  const classes = useStyles();
  const navigate = useNavigate();
  const handle = window.location.search;
  const id = new URLSearchParams(handle).get('id');
  const [product, setProduct] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { collection, setCollection } = React.useContext(CollectionContext);
  const [addOpen, setAddOpen] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState('');

  useEffect(() => {
    if (!authChecker('authCheck')) {
      navigate('/', { replace: true });
      return;
    }
    async function fetchData() {
      const user = JSON.parse(localStorage.getItem('brainaly_user'));
      await getColById({ id }).then(async (res) => {
        const quizList = JSON.parse(res[0].col_quiz);
        setSelectedQuiz(res[0].col_quiz);
        const quizArray = [];
        for (let i = 0; i < quizList.length; i++) {
          const data = { id: quizList[i].id, userid: user?.userId };
          await getQuizById(data).then((res) => {
            console.log(res);
            if (res.length) {
              quizArray.push({
                title: res[0].q_name,
                description: res[0].q_description,
                media: res[0].q_cover,
                id: res[0].q_uid,
                size: JSON.parse(res[0]?.q_content)?.length
              });
            }
          });
        }
        setProduct(quizArray);
        setCollection({
          image: res[0].col_image == ''
            ? '/static/collection.png' : `${global.serverUrl}upload/${res[0].col_image}`,
          description: res[0].col_description,
          title: res[0].col_name,
          product: quizArray,
          quizList,
        });
      });
    }
    fetchData();
  }, []);
  async function handleEdit() {
    setOpen(true);
  }
  const handleClose = () => {
    setOpen(false);
  };
  async function addQuizes() {
    setAddOpen(true);
  }
  const handleAddClose = () => {
    setAddOpen(false);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid
          item
          xl={4}
          lg={4}
          md={12}
          xs={12}
        >
          <Card className={classes.cardContainer}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" variant="h6" gutterBottom>
                {collection.title}
              </Typography>
              <Divider className={classes.divider} />
              <img
                src={collection.image}
                className={classes.desImage}
                alt="Cover Image"
              />
              <Typography variant="body1">
                {collection.description}
              </Typography>
              <div className={classes.editButton}>
                <Button variant="contained" color="primary" onClick={() => { handleEdit(); }} style={{ fontSize: 16 }}>Edit</Button>
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid
          item
          xl={8}
          lg={8}
          md={12}
          xs={12}
        >
          <Card className={classes.cardContainer}>
            <CardContent>
              <div className={classes.headerContainer}>
                <Typography className={classes.title} color="textSecondary" variant="h6" gutterBottom>
                  Add collection content
                </Typography>
                <Button variant="contained" color="primary" onClick={addQuizes}>{collection?.product?.length ? 'Edit Quiz' : 'Add Quiz'}</Button>
              </div>
              <Divider className={classes.divider} />
              <div>
                <Grid container xs={12} spacing={2}>
                  {collection?.product?.map((product, index) => (
                    <Grid
                      item
                      key={product.id}
                      lg={12}
                      md={12}
                      xs={12}
                    >
                      <ProductCard
                        className={classes.productCard}
                        product={product}
                        indexId={index}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <EditDialog
        open={open}
        handleClose={handleClose}
        id={id}
        title={collection.title}
        desc={collection.description}
        image={collection.image}
      />
      <AddDialog
        open={addOpen}
        handleClose={handleAddClose}
        id={id}
        selectedQuiz={selectedQuiz}
      />
    </div>
  );
}
