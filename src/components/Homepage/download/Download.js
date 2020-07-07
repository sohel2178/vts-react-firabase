import React from "react";

class Download extends React.Component {
  render() {
    return (
      <section
        className="download-section section-gap-full"
        id="download-section"
      >
        <div className="container">
          <div className="row download-wrap justify-items-between align-items-center">
            <div className="col-lg-6">
              <h1>Get Started for Free</h1>
              <p>
                To take a trivial example, which of us ever undertakes laborious
                physical exercise.right to find fault with a man
              </p>
            </div>
            <div className="col-lg-6 dload-btn">
              <a href="www.facebook.com" className="primary-btn">
                <span>Google Play</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  style={{ fill: "#fff" }}
                >
                  <g id="surface1">
                    <path d="M 7.125 2 L 28.78125 23.5 L 34.71875 17.5625 L 8.46875 2.40625 C 8.03125 2.152344 7.5625 2.011719 7.125 2 Z M 5.3125 3 C 5.117188 3.347656 5 3.757813 5 4.21875 L 5 46 C 5 46.335938 5.070313 46.636719 5.1875 46.90625 L 27.34375 24.90625 Z M 36.53125 18.59375 L 30.1875 24.90625 L 36.53125 31.1875 L 44.28125 26.75 C 45.382813 26.113281 45.539063 25.304688 45.53125 24.875 C 45.519531 24.164063 45.070313 23.5 44.3125 23.09375 C 43.652344 22.738281 38.75 19.882813 36.53125 18.59375 Z M 28.78125 26.3125 L 6.9375 47.96875 C 7.300781 47.949219 7.695313 47.871094 8.0625 47.65625 C 8.917969 47.160156 26.21875 37.15625 26.21875 37.15625 L 34.75 32.25 Z "></path>
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Download;
