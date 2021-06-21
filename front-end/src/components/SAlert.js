/* eslint-disable react/button-has-type */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

const Swinging = ({ textProps }) => {
  return (
    <div id="success-box">
      <div className="dot" />
      <div className="dot two" />
      <div className="face">
        <div className="eye" />
        <div className="eye right" />
        <div className="mouth happy" />
      </div>
      <div className="shadow scale" />
      <div className="message">
        <h1 className="alert">Success!</h1>
        <p>yay, everything is working.</p>
      </div>
      <button className="button-box"><h1 className="green">continue</h1></button>
    </div>
  );
};

Swinging.propTypes = {
  textProps: PropTypes.string,
};

export default Swinging;
