/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';

const Swinging = ({ textProps }) => {
  return (
    <div>
      <div className="globe">
        <div className="bird">
          <div className="body">
            <div className="eye left" />
            <div className="eye right" />
            <div className="beak"><div /></div>
            <div className="feet" />
            <div className="wire" />
          </div>
          <div className="hills" />
          <div className="cloud" />
          <div className="cloud small" />
        </div>
      </div>
      <h2>
        { textProps }
      </h2>
    </div>
  );
};

Swinging.propTypes = {
  textProps: PropTypes.string,
};

export default Swinging;
