import React, { useState, useEffect } from 'react';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer';
import Features from '../components/Features/Features';
import Women from '../components/HomePageWearCollection/Women';
import Men from '../components/HomePageWearCollection/Mens';
import RentalProcess from '../components/RentalProcess/RentalProcess';
import Banner from '../components/Banner/Banner';

const Home = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {scrolled && <Navbar />}
      <Header />
      <Features />
      <Women />
      <Men />
      <RentalProcess />
      <Banner />
      <Footer />
    </>
  );
};

export default Home;
