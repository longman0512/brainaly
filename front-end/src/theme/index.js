import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';

const theme = createMuiTheme({
  palette: {
    background: {
      dark: '#F4F6F8',
      default: colors.common.white,
      paper: colors.common.white
    },
    primary: {
      main: '#1368ce'
    },
    secondary: {
      main: '#9500ae'
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600]
    },
    nice: {
      main: '#fff'
    },
    warnred: {
      main: '#e21b3c'
    }
  },
  shadows,
  typography: {
    fontFamily: 'Calibri',
    fontWeight: 'bold'
  }
});

export default theme;
