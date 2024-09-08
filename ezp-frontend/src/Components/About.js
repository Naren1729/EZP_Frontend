import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const carouselItems = [
  {
    id: 1,
    icon: 'fa fa-eye',
    title: 'Our Vision',
    description: 'To revolutionize the way people transfer money by providing a secure, transparent, and user-friendly platform. We aim to be the trusted choice for individuals and businesses seeking reliable financial transactions.',
  },
  {
    id: 2,
    icon: 'fa fa-bullseye',
    title: 'Our Mission',
    description: 'Our mission is to ensure that every transaction is safeguarded with advanced encryption and fraud detection technologies. We are committed to offering an intuitive experience while continuously innovating to stay ahead of potential security threats.',
  }
];

export default function About() {
  return (
    <div className="carousel-container">
      <h1>About Us</h1>
      <div className="carousel-items-wrapper">
        <Carousel
          showArrows={true}
          autoPlay={true}
          infiniteLoop={true}
          showThumbs={false}
          showStatus={false}
          transitionTime={500}
        >
          {carouselItems.map(item => (
            <div key={item.id} className="carousel-item">
              <i className={item.icon} aria-hidden="true"></i>
              <h5>{item.title}</h5>
              <p>{item.description}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
