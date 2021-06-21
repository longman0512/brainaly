/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, Navigate } from 'react-router-dom';
import authChecker from 'src/utils/authHelper';

// ----------------------------------------------------------------------

function AuthProtect({ children }) {
  const navigate = useNavigate();

  // React.useEffect(() => {
  //   if (!authChecker('authCheck')) {
  //     navigate('/', { replace: true });
  //   } else {
  //     console.log('');
  //     navigate(children, { replace: true });
  //   }
  // }, []);
  const auth = authChecker('authCheck');
  if (auth) {
    return <Navigate to={children} />;
  }
  return <Navigate to="/" />;
}
AuthProtect.propTypes = {
  children: PropTypes.string
};

export default AuthProtect;
