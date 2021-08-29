// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import {useEffect, useState} from "react";

// ----------------------------------------------------------------------



export default function App() {



    return (
    <ThemeConfig>
      <ScrollToTop />
      <Router/>
    </ThemeConfig>
  );
}
