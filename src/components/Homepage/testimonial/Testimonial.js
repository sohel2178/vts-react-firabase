import React from "react";
import OwlCarousel from "react-owl-carousel";
import "../../../../node_modules/owl.carousel/dist/assets/owl.carousel.css";
import "../../../../node_modules/owl.carousel/dist/assets/owl.theme.default.css";
import SERVER_URL from "../../../config";
import axios from "axios";

class Testimonial extends React.Component {
  state = {
    options: {
      items: 2,
      loop: true,
      margin: 30,
      dots: true,
      autoplayHoverPause: true,
      smartSpeed: 500,
      autoplay: true,
      responsive: {
        0: {
          items: 1
        },
        768: {
          items: 2
        }
      }
    },
    testiData: null
  };

  componentDidMount() {
    axios
      .get(SERVER_URL + "testimonial/active")
      .then(res => {
        if (res.data) {
          this.setState({ testiData: res.data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    let datas = this.state.testiData;
    let loadingMarkup = "Loading...";
    let testiMarkup =
      datas === null ? (
        ""
      ) : (
        <OwlCarousel
          className="testimonial-carusel owl-carousel"
          id="testimonial-carusel"
          {...this.state.options}
        >
          {datas.map(data => (
            <div className="single-testimonial item" key={data._id}>
              <p>“{data.client_comment}”</p>
              <div className="user-details d-flex flex-row align-items-center">
                <div className="img-wrap">
                  <img
                    src={SERVER_URL + "public/" + data.image_client_comment}
                    alt={data.client_name}
                  />
                </div>
                <div className="details">
                  <h4>{data.client_name}</h4>
                  <p>{data.client_organization_name}</p>
                </div>
              </div>
            </div>
          ))}
        </OwlCarousel>
      );
    return (
      <section
        className="testimonial-section section-gap-full"
        id="testimonial-section"
      >
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 testimonial-left">
              <h2>What People Says</h2>
              <p>
                Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel
                augue. Curabitur ullamcorperi.
              </p>
            </div>
            <div className="col-lg-8 testimonial-right">
              {datas === null ? loadingMarkup : testiMarkup}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Testimonial;
