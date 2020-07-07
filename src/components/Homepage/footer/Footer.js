import React, { Fragment } from "react";
import $ from "jquery";
import SERVER_URL from "../../../config";
import axios from "axios";

class Footer extends React.Component {
  state = {
    templateData: {}
  };

  componentDidMount() {
    $(window).on("scroll", function() {
      if ($(this).scrollTop() > 600) {
        $(".scroll-top").fadeIn(600);
      } else {
        $(".scroll-top").fadeOut(600);
      }
    });

    $(".scroll-top").on("click", function() {
      $("html,body").animate(
        {
          scrollTop: 0
        },
        500
      );
      return false;
    });

    axios
      .get(SERVER_URL + "template")
      .then(res => {
        if (res.data) {
          this.setState({ templateData: res.data });
        }
      })
      .catch(err => console.log(err));
  }
  getYear = () => {
    let year = new Date();
    return year.getFullYear();
  };

  render() {
    return (
      <Fragment>
        <footer className="footer-section section-gap-half">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-5 footer-left">
                <p className="copyright-text">
                  &copy; 2019 to {this.getYear()} A name of faith
                </p>
              </div>
              <div className="col-lg-7">
                <br />
                <ul id="social">
                  <li>
                    <a
                      target="_blank"
                      href={this.state.templateData.facebook_link}
                    >
                      <i className="ti-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href={this.state.templateData.twitter_link}
                    >
                      <i className="ti-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      target="_blank"
                      href={this.state.templateData.linkedin_link}
                    >
                      <i className="ti-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </footer>
        <div className="scroll-top">
          <i className="ti-angle-up"></i>
        </div>
      </Fragment>
    );
  }
}

export default Footer;
