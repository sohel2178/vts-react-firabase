import React from "react";
import SERVER_URL from "../../../config";
import axios from "axios";

class Contact extends React.Component {
  state = {
    templateData: {}
  };
  componentDidMount() {
    axios
      .get(SERVER_URL + "template")
      .then(res => {
        if (res.data) {
          this.setState({ templateData: res.data });
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    return (
      <section className="contact-section padding-top-120" id="contact-section">
        <div className="container">
          <div className="section-title">
            <h2 className="text-center">Contact Us</h2>
            <p className="text-center">Get in Touch With Me</p>
          </div>
          <div className="row address-wrap justify-content-center">
            <div className="col-lg-3 col-md-4 col-sm-6 single-address-col">
              <i className="ti ti-mobile"></i>
              <p>
                {this.state.templateData.contact_number_one}
                <br /> {this.state.templateData.contact_number_two}
              </p>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-6 single-address-col">
              <i className="ti ti-map-alt"></i>
              <p>{this.state.templateData.contact_address}</p>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12 single-address-col">
              <i className="ti ti-email"></i>
              <p>
                {this.state.templateData.contact_email_one}
                <br /> {this.state.templateData.contact_email_two}
              </p>
            </div>
          </div>
          <div className="row justify-content-center form-row">
            <div className="col-lg-9">
              <form id="contact-form" action="#">
                <div className="row contact-form-wrap justify-content-center">
                  <div className="col-md-6 contact-name form-col">
                    <input
                      name="name"
                      id="name"
                      className="form-control"
                      type="text"
                      placeholder="Name*"
                    />
                  </div>
                  <div className="col-md-6 contact-email form-col">
                    <input
                      name="mail"
                      id="mail"
                      className="form-control"
                      type="email"
                      placeholder="E-mail*"
                    />
                  </div>
                  <div className="col-lg-12">
                    <textarea
                      name="comment"
                      id="comment"
                      className="form-control"
                      rows="8"
                      placeholder="Message"
                    ></textarea>
                  </div>
                  <input
                    type="submit"
                    className="primary-btn"
                    value="Send Message"
                    id="submit-message"
                  />
                  <div id="msg" className="message"></div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Contact;
