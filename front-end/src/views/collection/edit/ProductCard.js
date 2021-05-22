/* eslint-disable eqeqeq */
import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  // Avatar,
  // Box,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
} from '@material-ui/core';
import Zoom from 'react-reveal/Zoom';
import global from 'src/utils/global';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1),
    marginLeft: theme.spacing(3)
  },
  quAvatar: {
    width: '100%',
    height: 'auto',
    maxHeight: 200
  },
  hambergerContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  menuItem: {
  },
  menuIcon: {
    marginRight: theme.spacing(1)
  }
}));

const ProductCard = ({
  className, product, indexId, ...rest
}) => {
  const classes = useStyles();
  return (
    <Zoom>
      <Card
        className={clsx(classes.root, className)}
        {...rest}
      >
        <CardContent>
          <Grid
            container
            flexDirection="row"
            spacing={2}
          >
            <Grid
              item
              xl={3}
              lg={3}
              md={3}
              sm={3}
              xs={5}
            >
              <img
                alt="Product"
                src={product.media == '' ? '/static/collection.png' : `${global.serverUrl}upload/${product.media}`}
                variant="square"
                className={clsx(classes.quAvatar, className)}
              />
            </Grid>
            <Grid
              item
              xl={9}
              lg={9}
              md={9}
              sm={9}
              xs={7}
              container
              justifyContent="space-between"
              flexDirection="row"
            >
              <Grid
                item
                xl={11}
                lg={11}
                md={11}
                xs={11}
              >
                <Typography
                  align="left"
                  color="textPrimary"
                  gutterBottom
                  variant="h4"
                >
                  {product.title}
                </Typography>
                <Typography
                  align="left"
                  color="textPrimary"
                  variant="body1"
                >
                  {product.description}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Zoom>
  );
};

ProductCard.propTypes = {
  className: PropTypes.string,
  product: PropTypes.object.isRequired,
  indexId: PropTypes.number
};

export default ProductCard;
