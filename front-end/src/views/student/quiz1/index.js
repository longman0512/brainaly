import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import { setSocket, emitEvent } from 'src/utils/socket';
import { getQuizList, getQuizPageApi } from 'src/utils/Api';
import global from 'src/utils/global';
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
    height: '100%'
  }
}));
const ProductList = () => {
  const classes = useStyles();
  const [products, setProducts] = useState([]);
  const [proTotalNum, setProTotalNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('brainaly_user'));
    async function getList() {
      await getQuizList({ userid: user.userId }).then((res) => {
        const productsArray = [];
        console.log(res);
        setProTotalNum(Math.ceil(res.total / global.pageNationLimit));
        setPageNum(1);
        for (let i = 0; i < res.result.length; i++) {
          const newData = {
            title: res.result[i].q_name,
            length: JSON.parse(res.result[i].q_content).length,
            description: res.result[i].q_description,
            id: res.result[i].q_uid,
            media: res.result[i].q_cover === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].q_cover}`,
            created: res.result[i].q_created_at
          };
          productsArray.push(newData);
          console.log(res.result[i]);
        }
        setProducts(productsArray);
      });
    }
    getList();
    setSocket();
    emitEvent('connectRoom', user);
  }, []);
  async function refresh() {
    const user = JSON.parse(localStorage.getItem('brainaly_user'));
    getQuizPageApi({ userid: user.userId, pageNum: 0 }).then((res) => {
      const productsArray = [];
      console.log(res);
      setPageNum(1);
      setProTotalNum(Math.ceil(res.total / 3));
      for (let i = 0; i < res.result.length; i++) {
        const newData = {
          title: res.result[i].q_name,
          length: JSON.parse(res.result[i].q_content).length,
          description: res.result[i].q_description,
          id: res.result[i].q_uid,
          media: res.result[i].q_cover === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].q_cover}`,
        };
        productsArray.push(newData);
      }
      console.log(productsArray);
      setProducts(productsArray);
    });
  }

  async function getQuizPage(num) {
    const user = JSON.parse(localStorage.getItem('brainaly_user'));
    getQuizPageApi({ userid: user.userId, pageNum: num }).then((res) => {
      const productsArray = [];
      console.log(res);
      setPageNum(num);
      setProTotalNum(Math.ceil(res.total / 3));
      for (let i = 0; i < res.result.length; i++) {
        const newData = {
          title: res.result[i].q_name,
          length: JSON.parse(res.result[i].q_content).length,
          description: res.result[i].q_description,
          id: res.result[i].q_uid,
          media: res.result[i].q_cover === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].q_cover}`,
        };
        productsArray.push(newData);
      }
      console.log(productsArray);
      setProducts(productsArray);
    });
  }
  return (
    <Page
      className={classes.root}
      title="Questions"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {products.map((product) => (
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
                  handleRefresh={refresh}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={proTotalNum}
            size="small"
            page={pageNum}
            onChange={(e, page) => { getQuizPage(page); }}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default ProductList;
