import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useNavigate } from 'react-router-dom';
import Page from 'src/components/Page';
import { getCollectionList, getColPageApi, searchColApi } from 'src/utils/Api';
import authChecker from 'src/utils/authHelper';
import global from 'src/utils/global';
import Swinging from 'src/components/Swininging';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%',
    '&:hover': {
      animation: '0.25s ease 0s 1 normal none running'
    }
  }
}));
const ProductList = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [colTotalNum, setColTotalNum] = useState([]);
  const [pageNum, setPageNum] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  useEffect(() => {
    if (!authChecker('authCheck')) {
      navigate('/', { replace: true });
      return;
    }
    async function getList() {
      const user = JSON.parse(localStorage.getItem('brainaly_user'));
      await getCollectionList({ userid: user.userId }).then((res) => {
        const productsArray = [];
        setPageNum(1);
        setColTotalNum(Math.ceil(res.total / global.pageNationLimit));
        for (let i = 0; i < res.result.length; i++) {
          const newData = {
            title: res.result[i].col_name,
            media: res.result[i].col_image === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].col_image}`,
            description: res.result[i].col_description,
            id: res.result[i].col_uid,
            created: res.result[i].col_created_at,
            quizNum: JSON.parse(res.result[i].col_quiz).length,
            questions: res.result[i].col_quiz
          };
          productsArray.push(newData);
          console.log(res.result[i]);
        }
        setProducts(productsArray);
      });
    }
    getList();
  }, []);

  async function getColPage(num) {
    const user = JSON.parse(localStorage.getItem('brainaly_user'));
    getColPageApi({ userid: user.userId, pageNum: num }).then((res) => {
      setPageNum(num);
      const productsArray = [];
      console.log(res);
      setColTotalNum(Math.ceil(res.total / 3));
      for (let i = 0; i < res.result.length; i++) {
        const newData = {
          title: res.result[i].col_name,
          media: res.result[i].col_image === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].col_image}`,
          description: res.result[i].col_description,
          id: res.result[i].col_uid,
          created: res.result[i].col_created_at,
          quizNum: JSON.parse(res.result[i].col_quiz).length,
          questions: res.result[i].col_quiz
        };
        productsArray.push(newData);
        console.log(res.result[i]);
      }
      setProducts(productsArray);
    });
  }
  async function searchPage(query) {
    setSearchLoading(true);
    const userS = JSON.parse(localStorage.getItem('brainaly_user'));
    searchColApi({
      searchQuery: query.trim(),
      userId: userS.userId,
    }).then((res) => {
      console.log(res.result);
      const productsArray = [];
      for (let i = 0; i < res.result.length; i++) {
        const newData = {
          title: res.result[i].col_name,
          media: res.result[i].col_image === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].col_image}`,
          description: res.result[i].col_description,
          id: res.result[i].col_uid,
          created: res.result[i].col_created_at,
          quizNum: JSON.parse(res.result[i].col_quiz).length,
          questions: res.result[i].col_quiz
        };
        productsArray.push(newData);
        console.log(res.result[i]);
      }
      setProducts(productsArray);
      setTimeout(() => {
        setSearchLoading(false);
      }, 500);
    }).catch((err) => {
      console.log(err);
      setTimeout(() => {
        setSearchLoading(false);
      }, 500);
    });
  }
  async function handleRefresh() {
    const user = JSON.parse(localStorage.getItem('brainaly_user'));
    getColPageApi({ userid: user.userId, pageNum: 1 }).then((res) => {
      setPageNum(1);
      const productsArray = [];
      console.log(res);
      setColTotalNum(Math.ceil(res.total / 3));
      for (let i = 0; i < res.result.length; i++) {
        const newData = {
          title: res.result[i].col_name,
          media: res.result[i].col_image === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].col_image}`,
          description: res.result[i].col_description,
          id: res.result[i].col_uid,
          created: res.result[i].col_created_at,
          quizNum: JSON.parse(res.result[i].col_quiz).length,
          questions: res.result[i].col_quiz
        };
        productsArray.push(newData);
        console.log(res.result[i]);
      }
      setProducts(productsArray);
    });
  }

  async function search(e) {
    if (!e) {
      console.log('refresh');
      handleRefresh();
    } else if (e.key === 'Enter' && e.target.value.trim().length) {
      searchPage(e.target.value, 0);
      setColTotalNum(0);
    } else if (e.key === 'Enter' && !e.target.value.trim().length) {
      handleRefresh();
    }
  }

  return (
    <Page
      className={classes.root}
      title="Questions"
    >
      <Container maxWidth={false}>
        <Toolbar searchQuz={search} schLoading={searchLoading} />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {products.length
              ? products.map((product) => (
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
                    refresh={handleRefresh}
                  />
                </Grid>
              )) : (
                <Grid
                  item
                  lg={12}
                  md={12}
                  xs={12}
                >
                  <Swinging textProps="No Collections" />
                </Grid>
              )}
          </Grid>
        </Box>
        {
          !colTotalNum ? null
            : (
              <Box
                mt={3}
                display="flex"
                justifyContent="center"
              >
                <Pagination
                  color="primary"
                  count={colTotalNum}
                  size="small"
                  page={pageNum}
                  onChange={(e, page) => { getColPage(page); }}
                />
              </Box>
            )
        }

      </Container>
    </Page>
  );
};

export default ProductList;
