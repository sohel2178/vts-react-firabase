import React from 'react';

class Overview extends React.Component {
    state = {  }
    render() { 
        return (
            <section className="explore-section section-gap-full relative">
                <div className="overlay overlay-bg"></div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 explore-left">
                            <h3>Explore More</h3>
                            <h1>Other Features</h1>
                            <p>
                                The bedding was hardly able to cover it and seemed ready to slide off any moment.His many legs,
                                pitifully thin compared with
                                the size of the rest of him.
                            </p>
                            <div className="d-flex counter-wrap">
                                <div className="single-counter">
                                    <h2>2.5K+</h2>
                                    <p>Download</p>
                                </div>
                                <div className="single-counter">
                                    <h2>2K+</h2>
                                    <p>Review</p>
                                </div>
                                <div className="single-counter">
                                    <h2>3.4K+</h2>
                                    <p>Active User</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6 explore-right"></div>
                    </div>
                </div>
            </section>
        );
    }
}
 
export default Overview;