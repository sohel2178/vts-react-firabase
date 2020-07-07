import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import ReactResizeDetector from "react-resize-detector";

import logoForWeb from "../../../images/logo.png";

class Navbar extends React.Component {
  state = {
    resNav: "breakpoint-off",
    menuOnItem: false
  };

  componentDidMount() {
    //Smooth Scrolling Using Navigation Menu
    $('a[href*="#"]').on("click", function(e) {
      $("html,body").animate(
        {
          scrollTop: $($(this).attr("href")).offset().top - 70
        },
        500
      );
      e.preventDefault();
    });
  }

  onResize = () => {
    let winWidth = $(window).width();
    if (winWidth <= 991) {
      this.setState({
        resNav: "breakpoint-on"
      });
    } else {
      this.setState({
        resNav: "breakpoint-off"
      });
    }
  };

  menuOnHandler = () => {
    this.setState({
      menuOnItem: !this.state.menuOnItem
    });
  };

  menuCloseHandler = () => {
    this.setState({
      menuOnItem: false
    });
  };

  render() {
    return (
      <Fragment>
        <ReactResizeDetector
          handleWidth
          handleHeight
          onResize={this.onResize}
        />
        <header className="header-area" id="header-area">
          <div
            className={`dope-nav-container ${this.state.resNav} dope-sticky`}
          >
            <div className="container">
              <div className="row">
                <nav
                  className="dope-navbar justify-content-between"
                  id="dopeNav"
                >
                  <a className="nav-brand" href="/">
                    <img src={logoForWeb} alt="Website Logo" />
                  </a>
                  <div
                    className="dope-navbar-toggler"
                    onClick={this.menuOnHandler}
                  >
                    <span
                      className={`navbarToggler ${
                        this.state.menuOnItem ? "active" : ""
                      }`}
                    >
                      <span></span>
                      <span></span>
                      <span></span>
                    </span>
                  </div>
                  <div
                    className={`dope-menu ${
                      this.state.menuOnItem ? "menu-on" : ""
                    }`}
                  >
                    <div
                      className="dopecloseIcon"
                      onClick={this.menuCloseHandler}
                    >
                      <div className="cross-wrap">
                        <span className="top"></span>
                        <span className="bottom"></span>
                      </div>
                    </div>
                    <div className="dopenav">
                      <ul id="nav">
                        <li>
                          <a href="#banner-section">Home</a>
                        </li>
                        <li>
                          <a href="#about-section">About</a>
                        </li>
                        <li>
                          <a href="#feature-section">Feature</a>
                        </li>
                        <li>
                          <a href="#price-section">Price</a>
                        </li>
                        <li>
                          <a href="#testimonial-section">Testimonial</a>
                        </li>
                        <li>
                          <a href="#download-section">Download</a>
                        </li>
                        <li>
                          {/* <button onClick={this.props.goLogin}>Login</button> */}
                          <Link to="/signin">Login</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </nav>
              </div>
            </div>
          </div>
        </header>
      </Fragment>
    );
  }
}

export default Navbar;
