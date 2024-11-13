import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

// Carousel Images
const images = [
  'https://images.unsplash.com/photo-1599623560574-39d485900c95?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D',
  'https://img.freepik.com/premium-photo/toys-background-copy-space_1036998-268609.jpg?semt=ais_hybrid',
  'https://images.unsplash.com/photo-1612355524120-462e49e4ffe6?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Nnx8fGVufDB8fHx8fA%3D%3D'
];

// Home Page Component
const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="home">
      {/* Fullscreen Carousel */}
      <div className="carousel-container">
        <div
          className="carousel"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Toy ${index + 1}`} />
          ))}
        </div>
        <span className="arrow arrow-left" onClick={prevSlide}>
          &#10094;
        </span>
        <span className="arrow arrow-right" onClick={nextSlide}>
          &#10095;
        </span>
        <div className="logo">Crumble</div>
      </div>

      {/* Video Section */}
      <div className="video-demo">
        <h2>Watch our latest toys in action!</h2>
        <video width="600" controls>
          <source src="https://example.com/toy-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <br />
        <Link to="/toys" className="explore-now">Explore Now</Link>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <h2>What Our Customers Say</h2>
        <div className="testimonial-container">
          <div className="testimonial-box">
            <p>"Crumble has the best toys! My kids love them."</p>
            <p className="testimonial-author">- Sarah J.</p>
          </div>
          <div className="testimonial-box">
            <p>"Great quality and affordable prices. Highly recommend!"</p>
            <p className="testimonial-author">- Michael R.</p>
          </div>
          <div className="testimonial-box">
            <p>"The customer service is top-notch. Will definitely buy again!"</p>
            <p className="testimonial-author">- Emily W.</p>
          </div>
        </div>
      </div>

      {/* Login and Signup Links */}
      <div className="auth-buttons">
        <Link to="/login" className="btn login-btn">Login</Link>
        <Link to="/signup" className="btn signup-btn">Sign Up</Link>
      </div>
    </div>
  );
};

// Export the Home component
export default Home;



