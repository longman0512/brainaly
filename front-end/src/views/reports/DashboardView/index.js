import React from 'react';
import {
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import { getDashboardInfo } from 'src/utils/Api';
import Teachers from './Teachers';
import LatestOrders from './LatestOrders';
import LatestProducts from './LatestProducts';
import Sales from './Sales';
import Students from './Students';
import Classes from './Classes';
import TrafficByDevice from './TrafficByDevice';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const [signed, setSigned] = React.useState(false);
  const [dashboardData, setData] = React.useState({
    latestUsers: [],
    questions: [],
    totalClassNum: 0,
    totalStudentNum: 0,
    totalTeacherNum: 0
  });
  React.useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem('brainaly_user'));
    if (!userInfo || userInfo.userType !== 'admin') {
      window.location = '/admin/signin';
    } else {
      setSigned(true);
    }
  }, []);

  React.useEffect(() => {
    if (signed) {
      getDashboardInfo().then((res) => {
        console.log(res);
        setData({ ...res.result });
      }).catch((err) => {
        console.log(err);
      });
    }
  }, [signed]);

  return (
    <Page
      className={classes.root}
      title="Dashboard"
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={4}
            sm={4}
            xl={4}
            xs={12}
          >
            <Teachers num={dashboardData.totalTeacherNum} />
          </Grid>
          <Grid
            item
            lg={4}
            sm={4}
            xl={4}
            xs={12}
          >
            <Students num={dashboardData.totalStudentNum} />
          </Grid>
          <Grid
            item
            lg={4}
            sm={4}
            xl={4}
            xs={12}
          >
            <Classes num={dashboardData.totalClassNum} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Sales />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <TrafficByDevice
              studentsNum={dashboardData.totalStudentNum}
              teachersNum={dashboardData.totalTeacherNum}
            />
          </Grid>
          <Grid
            item
            lg={4}
            md={6}
            xl={3}
            xs={12}
          >
            <LatestProducts questions={dashboardData.questions} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <LatestOrders latestUsers={dashboardData.latestUsers} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
