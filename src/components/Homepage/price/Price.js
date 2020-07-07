import React from "react";

class Price extends React.Component {
  state = {};
  render() {
    return (
      <section className="price-section section-gap-full" id="price-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-5 price-left">
              <h4>
                Our Pricing Plan <br /> and Options
              </h4>
              <p>
                Far curiosity incommode now led smallness allowance. Favour bed
                assure son things yet.
              </p>
            </div>
            <div className="col-lg-7 d-flex price-right">
              <div className="single-price main">
                <div className="top-wrap">
                  <i className="ti ti-medall"></i>
                  <h4>Enterprise</h4>
                  <p>Monthly Fee Tk. 500</p>
                  <h2>
                    Device Price <span>Tk.</span> 3,500
                  </h2>
                </div>
                <div className="bottom-wrap">
                  <ul>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Live Tracking</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Engine Lock &amp; Unlock</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Engine On &amp; Off Alert</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Travel History</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Geo Fencing</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Device Removal Alert</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Speed Violation Alert</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>AC On &amp; Off Notification</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Monthly Report</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Expences Calculation</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>12 Months Warranty</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>24×7 Helpline Facility</span>
                      <i className="ti ti-check"></i>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="single-price">
                <div className="top-wrap">
                  <i className="ti ti-briefcase"></i>
                  <h4>Standard</h4>
                  <p className="relative">Monthly Fee Tk. 300</p>
                  <h2 className="relative">
                    Device Price <span>Tk.</span> 3,500
                  </h2>
                </div>
                <div className="bottom-wrap">
                  <ul>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Live Tracking</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Engine Lock &amp; Unlock</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Engine On &amp; Off Alert</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Travel History</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Geo Fencing</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Device Removal Alert</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Speed Violation Alert</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>AC On &amp; Off Notification</span>
                      <i className="ti ti-close"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Monthly Report</span>
                      <i className="ti ti-close"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>Expences Calculation</span>
                      <i className="ti ti-close"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>12 Months Warranty</span>
                      <i className="ti ti-check"></i>
                    </li>
                    <li className="d-flex justify-content-between align-items-center">
                      <span>24×7 Helpline Facility</span>
                      <i className="ti ti-check"></i>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Price;
