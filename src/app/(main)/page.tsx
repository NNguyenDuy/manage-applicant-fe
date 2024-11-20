'use client'
import React from 'react'
import { Carousel } from "antd";

const contentStyle: React.CSSProperties = {
  height: '500px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  background: '#364d79',
};

const Home = () => {
  const onChange = (currentSlide: number) => {
    console.log(currentSlide);
  };
  return (
    <div style={{ paddingTop: '20px' }}>
      <Carousel autoplay>
        <div>
          <h3 style={contentStyle}><img src="/assets/images/banner-carousel-1.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  alt="" /></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img src="https://png.pngtree.com/thumb_back/fw800/background/20240322/pngtree-modern-background-banner-designe-vector-image_15650757.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  alt="" /></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img src="https://png.pngtree.com/thumb_back/fw800/background/20210115/pngtree-horizontal-vector-banner-background-image_520682.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  alt="" /></h3>
        </div>
        <div>
          <h3 style={contentStyle}><img src="https://png.pngtree.com/background/20230114/original/pngtree-fresh-green-background-fashion-gradient-e-commerce-banner-background-picture-image_2004868.jpg" style={{ width: '100%', height: '100%', objectFit: 'cover' }}  alt="" /></h3>
        </div>
      </Carousel>
    </div>
  );
};

export default Home
