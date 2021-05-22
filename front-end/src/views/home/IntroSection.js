/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable max-len */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { Carousel } from 'react-responsive-carousel';

const IntroSection = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Carousel showArrows={false} autoPlay dynamicHeight infiniteLoop showThumbs={false} showStatus={false}>
        <div key="slide1" className="slide-carousel">
          <img src="/static/carousel/slide1.jpg" />
        </div>
        <div key="slide2" className="slide-carousel">
          <img src="/static/carousel/slide2.jpg" />
        </div>
        <div key="slide3" className="slide-carousel">
          <img src="/static/carousel/slide3.jpg" />
        </div>
        <div key="slide4" className="slide-carousel">
          <img src="/static/carousel/slide4.jpg" />
        </div>
      </Carousel>
      <div className="scrolldown scrolldown-container">
        <a href="#joinsection">
          <span />
          Scroll
        </a>
      </div>
    </div>
  );
};

export default IntroSection;
