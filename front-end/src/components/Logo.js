import React from 'react';

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/logo.png"
      {...props}
      style={{ height: '48px' }}
    />
  );
};

export default Logo;
