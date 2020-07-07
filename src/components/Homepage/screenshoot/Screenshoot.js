import React from "react";
import OwlCarousel from "react-owl-carousel";
import SERVER_URL from "../../../config";
import axios from "axios";
import "../../../../node_modules/owl.carousel/dist/assets/owl.carousel.css";
import "../../../../node_modules/owl.carousel/dist/assets/owl.theme.default.css";

class Screenshoot extends React.Component {
  state = {
    options: {
      loop: true,
      responsiveClass: true,
      nav: true,
      margin: 5,
      autoplayTimeout: 4000,
      smartSpeed: 500,
      center: true,
      navText: [
        '<span class="ti ti-angle-left"></span>',
        '<span class="ti ti-angle-right"></span>'
      ],
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 3
        },
        1200: {
          items: 5
        }
      }
    },
    screenshootData: null
  };
  componentDidMount() {
    axios
      .get(SERVER_URL + "appscreen/active")
      .then(res => {
        if (res.data) {
          this.setState({ screenshootData: res.data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    let datas = this.state.screenshootData;
    let loadingMarkup = "Loading...";
    let screenMarkup =
      datas === null ? (
        ""
      ) : (
        <OwlCarousel
          className="screenshot_slider owl-carousel"
          id="screenshot-carusel"
          // items={5}
          // loop
          // margin={10}
          // nav
          {...this.state.options}
        >
          {datas.map(data => (
            <div className="item" key={data._id}>
              <img
                src={SERVER_URL + "public/" + data.image_appscreenshoot}
                alt={data.image_alt_text}
                title={data.image_alt_text}
              />
            </div>
          ))}
        </OwlCarousel>
      );
    return (
      <section className="screenshot-section section-gap-full">
        <div className="container">
          <div className="section-title">
            <h2 className="text-center">App Screenshots</h2>
          </div>
          <div className="row">
            {datas === null ? loadingMarkup : screenMarkup}
          </div>
        </div>
      </section>
    );
  }
}

export default Screenshoot;
