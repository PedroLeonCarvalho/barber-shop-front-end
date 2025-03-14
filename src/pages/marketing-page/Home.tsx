import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import AppTheme from "../../components/shared-theme/AppTheme";
import AppAppBar from "./components/AppAppBar";
import Hero from "./components/Hero";
import LogoCollection from "./components/LogoCollection";
import Highlights from "./components/Highlights";
import Pricing from "./components/Pricing";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";

export default function Home(props: { disableCustomTheme?: boolean }) {
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />

      <AppAppBar />
      <Hero />
      <div>
        <Divider />
        <Footer />
      </div>
    </AppTheme>
  );
}
