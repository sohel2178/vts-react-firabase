import React, { Fragment } from "react";
import Navbar from "./navbar/Navbar";
import Banner from "./banner/Banner";
import About from "./about/About";
import Feature from "./feature/Feature";
import Screenshoot from "./screenshoot/Screenshoot";
import Question from "./question/Question";
// import Overview from "./overview/Overview";
import Testimonial from "./testimonial/Testimonial";
import Price from "./price/Price";
import Download from "./download/Download";
import Team from "./team/Team";
import Contact from "./contact/Contact";
import Footer from "./footer/Footer";

import "../../assets/css/themify-icons.css";
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min";

class HomeLayout extends React.Component {
  render() {
    return (
      <Fragment>
        <Navbar goLogin={this.props.goLogin} />
        <Banner />
        <About />
        <Feature />
        <Screenshoot />
        <Question />
        <Testimonial />
        <Price />
        {/* <Overview /> */}
        <Team />
        <Download />
        <Contact />
        <Footer />
      </Fragment>
    );
  }
}

export default HomeLayout;
