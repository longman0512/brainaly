/* eslint-disable eqeqeq */
/* eslint-disable object-shorthand */
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
import { getClassList, searchClassApi } from 'src/utils/Api';
import global from 'src/utils/global';
import authChecker from 'src/utils/authHelper';
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
const ClassView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [totalNum, setTotalNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const [searchLoading, setSearchLoading] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    console.log(!authChecker('authCheck'));
    if (!authChecker('authCheck')) {
      console.log('return false');
      navigate('/', { replace: true });
      return;
    }
    async function getList() {
      const user = JSON.parse(localStorage.getItem('brainaly_user'));
      setProfile(user);
      await getClassList({
        userid: user?.userId,
        pageNum: 1,
        userType: user?.userType
      }).then((res) => {
        console.log(res);
        const productsArray = [];
        setPageNum(1);
        setTotalNum(Math.ceil(res.total / global.pageNationLimit));
        for (let i = 0; i < res.result.length; i++) {
          const students = JSON.parse(res.result[i].cl_students);
          const newData = {
            title: res.result[i].cl_name,
            media: res.result[i].cl_cover === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].cl_cover}`,
            description: res.result[i].cl_description,
            id: res.result[i].cl_uid,
            studentNum: students.length,
            created: res.result[i].cl_createdAt
          };
          productsArray.push(newData);
          console.log(res.result[i]);
        }
        setProducts(productsArray);
      });
    }
    getList();
  }, []);
  const refreshPage = async () => {
    const user = JSON.parse(localStorage.getItem('brainaly_user'));
    await getClassList({
      userid: user.userId,
      pageNum: pageNum,
      userType: user.userType
    }).then((res) => {
      console.log(res);
      const productsArray = [];
      setTotalNum(Math.ceil(res.total / global.pageNationLimit));
      for (let i = 0; i < res.result.length; i++) {
        const students = JSON.parse(res.result[i].cl_students);
        const newData = {
          title: res.result[i].cl_name,
          media: res.result[i].cl_cover === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].cl_cover}`,
          description: res.result[i].cl_description,
          id: res.result[i].cl_uid,
          studentNum: students.length,
          created: res.result[i].cl_createdAt
        };
        productsArray.push(newData);
        console.log(res.result[i]);
      }
      setProducts(productsArray);
    });
  };
  const getClassPage = async (pageN) => {
    const user = JSON.parse(localStorage.getItem('brainaly_user'));
    await getClassList({
      userid: user.userId,
      pageNum: pageN,
      userType: user.userType
    }).then((res) => {
      console.log(res);
      const productsArray = [];
      setPageNum(pageN);
      setTotalNum(Math.ceil(res.total / global.pageNationLimit));
      for (let i = 0; i < res.result.length; i++) {
        const students = JSON.parse(res.result[i].cl_students);
        const newData = {
          title: res.result[i].cl_name,
          media: res.result[i].cl_cover === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].cl_cover}`,
          description: res.result[i].cl_description,
          id: res.result[i].cl_uid,
          studentNum: students.length,
          created: res.result[i].cl_createdAt
        };
        console.log(res.result[i].cl_createdAt);
        productsArray.push(newData);
        console.log(res.result[i]);
      }
      setProducts(productsArray);
    });
  };
  async function searchPage(query) {
    setSearchLoading(true);
    const userS = JSON.parse(localStorage.getItem('brainaly_user'));
    searchClassApi({
      searchQuery: query.trim(),
      userId: userS.userId,
      userType: userS.userType
    }).then((res) => {
      console.log(res);
      const productsArray = [];

      for (let i = 0; i < res.result.length; i++) {
        const students = JSON.parse(res.result[i].cl_students);
        const newData = {
          title: res.result[i].cl_name,
          media: res.result[i].cl_cover === '' ? '/static/collection.png' : `${global.serverUrl}upload/${res.result[i].cl_cover}`,
          description: res.result[i].cl_description,
          id: res.result[i].cl_uid,
          studentNum: students.length,
          created: res.result[i].cl_createdAt
        };
        console.log(res.result[i].cl_createdAt);
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
  async function search(e) {
    if (!e) {
      console.log('refresh');
      refreshPage();
    } else if (e.key === 'Enter' && e.target.value.trim().length) {
      searchPage(e.target.value, 0);
      setTotalNum(0);
    } else if (e.key === 'Enter' && !e.target.value.trim().length) {
      refreshPage();
    }
  }
  return (
    <Page
      className={classes.root}
      title="Questions"
    >
      <Container maxWidth={false}>
        <Toolbar refresh={refreshPage} searchQuz={search} schLoading={searchLoading} />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {
              products.length ? products.map((product) => (
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
                    refresh={getClassPage}
                  />
                </Grid>
              )) : (
                <Grid
                  item
                  lg={12}
                  md={12}
                  xs={12}
                >
                  <Swinging textProps={profile?.userType == 'student' ? 'No Classes you joined' : 'No Classes you created'} />
                </Grid>
              )
            }
          </Grid>
        </Box>
        {
          !totalNum ? null
            : (
              <Box
                mt={3}
                display="flex"
                justifyContent="center"
              >
                <Pagination
                  color="primary"
                  count={totalNum}
                  size="small"
                  page={pageNum}
                  onChange={(e, pgNum) => {
                    getClassPage(pgNum);
                  }}
                />
              </Box>
            )
        }
      </Container>
    </Page>
  );
};

export default ClassView;
