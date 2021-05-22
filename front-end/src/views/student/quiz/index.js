import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import { setSocket, emitEvent } from 'src/utils/socket';
import { getQuizList, getQuizPageApi, searchQuizApi } from 'src/utils/Api';
import Swinging from 'src/components/Swininging';
import authChecker from 'src/utils/authHelper';
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
const StudentHome = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [proTotalNum, setProTotalNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  useEffect(() => {
    if (!authChecker('authCheck')) {
      navigate('/', { replace: true });
      return;
    }
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
            created: res.result[i].q_created_at,
            played: res.result[i].q_play_num
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
  async function searchPage(query) {
    setSearchLoading(true);
    const userS = JSON.parse(localStorage.getItem('brainaly_user'));
    searchQuizApi({
      searchQuery: query.trim(),
      userId: userS.userId,
    }).then((res) => {
      const productsArray = [];
      for (let i = 0; i < res.result.length; i++) {
        const newData = {
          title: res.result[i].q_name,
          length: JSON.parse(res.result[i].q_content).length,
          description: res.result[i].q_description,
          id: res.result[i].q_uid,
          media: res.result[i].q_cover === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].q_cover}`,
          created: res.result[i].q_created_at,
          played: res.result[i].q_play_num
        };
        productsArray.push(newData);
      }
      console.log(productsArray);
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
  async function refresh() {
    const user = JSON.parse(localStorage.getItem('brainaly_user'));
    getQuizPageApi({ userid: user.userId, pageNum: 0 }).then((res) => {
      const productsArray = [];
      console.log(res);
      setPageNum(1);
      setProTotalNum(Math.ceil(res.total / global.pageNationLimit));
      for (let i = 0; i < res.result.length; i++) {
        const newData = {
          title: res.result[i].q_name,
          length: JSON.parse(res.result[i].q_content).length,
          description: res.result[i].q_description,
          id: res.result[i].q_uid,
          media: res.result[i].q_cover === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].q_cover}`,
          created: res.result[i].q_created_at,
          played: res.result[i].q_play_num
        };
        productsArray.push(newData);
      }
      console.log(productsArray);
      setProducts(productsArray);
    });
  }
  async function search(e) {
    if (!e) {
      console.log('refresh');
      refresh();
    } else if (e.key === 'Enter' && e.target.value.trim().length) {
      searchPage(e.target.value, 0);
      setProTotalNum(0);
    } else if (e.key === 'Enter' && !e.target.value.trim().length) {
      refresh();
    }
  }
  async function getQuizPage(num) {
    const user = JSON.parse(localStorage.getItem('brainaly_user'));
    getQuizPageApi({ userid: user.userId, pageNum: num }).then((res) => {
      const productsArray = [];
      console.log(res);
      setPageNum(num);
      setProTotalNum(Math.ceil(res.total / global.pageNationLimit));
      for (let i = 0; i < res.result.length; i++) {
        const newData = {
          title: res.result[i].q_name,
          length: JSON.parse(res.result[i].q_content).length,
          description: res.result[i].q_description,
          id: res.result[i].q_uid,
          media: res.result[i].q_cover === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].q_cover}`,
          created: res.result[i].q_created_at,
          played: res.result[i].q_play_num
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
                    handleRefresh={refresh}
                  />
                </Grid>
              )) : (
                <Grid
                  item
                  lg={12}
                  md={12}
                  xs={12}
                >
                  <Swinging textProps="No Quiz" />
                </Grid>
              )}
          </Grid>
        </Box>
        {
          !proTotalNum ? null
            : (
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
            )
        }

      </Container>
    </Page>
  );
};

export default StudentHome;
