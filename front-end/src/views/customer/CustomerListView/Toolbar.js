import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  SvgIcon,
  TextField,
  CardContent,
  InputAdornment,
  CircularProgress,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import ClearIcon from '@material-ui/icons/Clear';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  searchBar: {
    maxWidth: 300,
  }
}));

const Toolbar = ({ className, setSearchQuery, ...rest }) => {
  const classes = useStyles();
  const [searchKey, setSearchKey] = React.useState('');
  const [schLoading, setLoading] = React.useState(false);

  const closeSearch = () => {
    setLoading(false);
    setSearchKey('');
  };

  React.useEffect(() => {
    setSearchQuery(searchKey);
  }, [searchKey]);
  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box mt={3}>
        <Card>
          <CardContent className={classes.header}>
            <Box maxWidth={500}>
              <Typography
                color="textPrimary"
                variant="h5"
              >
                All Users

              </Typography>

            </Box>

            <TextField
              fullWidth
              size="small"
              className={classes.searchBar}
              value={searchKey}
              onChange={(e) => { setSearchKey(e.target.value); }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">

                    {schLoading ? <CircularProgress color="secondary" size={19} className="pregress" /> : (
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    ) }
                  </InputAdornment>
                ),
                endAdornment: (
                  searchKey ? (
                    <InputAdornment position="end" onClick={() => { closeSearch(); }} className="endAdornment">
                      <ClearIcon size={19} />
                    </InputAdornment>
                  ) : null
                )
              }}
              placeholder="Search User by Name"
              variant="outlined"
            />
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string,
  setSearchQuery: PropTypes.func
};

export default Toolbar;
