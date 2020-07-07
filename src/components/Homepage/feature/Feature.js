import React, { Fragment } from "react";

import liveTrackig from "../../../images/live-traking.jpg";
import alert from "../../../images/alert.jpg";
import notification from "../../../images/notification.jpg";
import report from "../../../images/report.jpg";
import fuel from "../../../images/fuel.jpg";
import milage from "../../../images/milage.jpg";

const Feature = () => {
  return (
    <Fragment>
      <section
        className="service-section section-gap-full"
        id="feature-section"
      >
        <div className="container">
          <div className="section-title">
            <h2 className="text-center">Our Service</h2>
            <p className="text-center">Discover The Service We Provide</p>
          </div>
          <div className="row">
            <a href="#live-tracing" className="col-lg-4  col-md-6 pb-30">
              <div className="single-service">
                <i className="ti-location-pin"></i>
                <h4>Live Tracking</h4>
              </div>
            </a>
            <a href="#mileage-report" className="col-lg-4  col-md-6 pb-30">
              <div className="single-service">
                <i className="ti-bar-chart"></i>
                <h4>Mileage Report</h4>
              </div>
            </a>
            <a href="#fuel-monitoring" className="col-lg-4 col-md-6 pb-30">
              <div className="single-service">
                <i className="ti-filter"></i>
                <h4>Fuel Monitoring</h4>
              </div>
            </a>
            <a href="#summery-report" className="col-lg-4 col-md-6 pb-30">
              <div className="single-service">
                <i className="ti-write"></i>
                <h4>Summary Report</h4>
              </div>
            </a>
            <a href="#notification" className="col-lg-4 col-md-6 pb-30">
              <div className="single-service">
                <i className="ti-announcement"></i>
                <h4>Notification</h4>
              </div>
            </a>
            <a href="#alert" className="col-lg-4  col-md-6 pb-30">
              <div className="single-service">
                <i className="ti-announcement"></i>
                <h4>Alert</h4>
              </div>
            </a>
          </div>
        </div>
      </section>

      <section className="skill-section section-gap-half" id="live-tracing">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 skill-left">
              <h2>Live Tracking</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum,
                dolores quibusdam pariatur, id dolor vero sit quo eius
                laudantium perferendis similique reiciendis suscipit officia
                iste, aliquid numquam ipsa in tempore.
              </p>
              <div className="bottom-wrap">
                <ul>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Live travel veiw on map</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Live Engine Off/On Show</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Shows status of Traffic on maps</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Live movement of your vehicel</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 skill-right">
              <img
                className="img-fluid"
                src={liveTrackig}
                alt="Live Tracking"
              />
            </div>
          </div>
        </div>
      </section>

      <section
        className="service-des-section section-gap-half"
        id="mileage-report"
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 skill-left">
              <img className="img-fluid" src={milage} alt="Live Tracking" />
            </div>
            <div className="col-lg-6 skill-right">
              <h2>Mileage Report</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum,
                dolores quibusdam pariatur, id dolor vero sit quo eius
                laudantium perferendis similique reiciendis suscipit officia
                iste, aliquid numquam ipsa in tempore.
              </p>
              <div className="bottom-wrap">
                <ul>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> User can see milage report.</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> All day travel report</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Shows total number of times the engine</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> When, where and how much fuel is spent</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="skill-section section-gap-half" id="fuel-monitoring">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 skill-left">
              <h2>Fuel Monitoring</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum,
                dolores quibusdam pariatur, id dolor vero sit quo eius
                laudantium perferendis similique reiciendis suscipit officia
                iste, aliquid numquam ipsa in tempore.
              </p>
              <div className="bottom-wrap">
                <ul>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> When, where and how much fuel was used?</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Know how much you traveled?</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Approximate Fuel consumtion report </span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Calculate Expences of all vehicle in a App </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 skill-right">
              <img className="img-fluid" src={fuel} alt="Live Tracking" />
            </div>
          </div>
        </div>
      </section>

      <section
        className="service-des-section section-gap-half"
        id="summery-report"
      >
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 skill-left">
              <img className="img-fluid" src={report} alt="Live Tracking" />
            </div>
            <div className="col-lg-6 skill-right">
              <h2>Summery Report</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum,
                dolores quibusdam pariatur, id dolor vero sit quo eius
                laudantium perferendis similique reiciendis suscipit officia
                iste, aliquid numquam ipsa in tempore.
              </p>
              <div className="bottom-wrap">
                <ul>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Daily Summary Distance Report</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Monthly Summary Distance Report</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Daily Engine On/Off Report</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Hourly Engine On/Off Report </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="skill-section section-gap-half" id="notification">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 skill-left">
              <h2>Notification</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum,
                dolores quibusdam pariatur, id dolor vero sit quo eius
                laudantium perferendis similique reiciendis suscipit officia
                iste, aliquid numquam ipsa in tempore.
              </p>
              <div className="bottom-wrap">
                <ul>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Engine On/Off Notification</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Ignitions Stust Notification</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Overspeed Notification</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6 skill-right">
              <img
                className="img-fluid"
                src={notification}
                alt="Live Tracking"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="service-des-section section-gap-half" id="alert">
        <div className="container">
          <div className="row align-items-center justify-content-center">
            <div className="col-lg-6 skill-left">
              <img className="img-fluid" src={alert} alt="Live Tracking" />
            </div>
            <div className="col-lg-6 skill-right">
              <h2>Alert</h2>
              <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum,
                dolores quibusdam pariatur, id dolor vero sit quo eius
                laudantium perferendis similique reiciendis suscipit officia
                iste, aliquid numquam ipsa in tempore.
              </p>
              <div className="bottom-wrap">
                <ul>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Overspeed Alert</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> GEO Fence Alert</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> Speed Limit Alert</span>
                  </li>
                  <li className="justify-content-between align-items-center">
                    <i className="ti-hand-point-right"></i>
                    <span> SOS Alert</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Feature;
