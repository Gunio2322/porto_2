import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import AppTheme from '../shared-theme/AppTheme';
import AppAppBar from '../components/AppAppBar';
import Hero from '../components-marketing/Hero';
import LogoCollection from '../components-marketing/LogoCollection';
import Highlights from '../components-marketing/Highlights';
import Pricing from '../components-marketing/Pricing';
import Features from '../components-marketing/Features';
import Testimonials from '../components-marketing/Testimonials';
import FAQ from '../components-marketing/FAQ';
import Footer from '../components/Footer';

export default function MarketingPage(props) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <AppAppBar />
      <Hero />
      <div>
        <LogoCollection />
 
        <Divider />
      
   
        <Highlights />
        <Divider />
        <Features />
        <Divider />
          <Testimonials />
               <Divider />
        <FAQ />
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
