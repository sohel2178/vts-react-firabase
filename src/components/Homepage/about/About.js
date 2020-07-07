import React from 'react';
import appImage from '../../../images/app-img.png';


const About = () => {
    return (
        <section className="about-section section-gap-full relative" id="about-section">
            <div className="container">
                <div className="row align-items-center justify-content-between">
                    <div className="col-lg-6 col-md-12 about-left">
                        <img className="img-fluid" src={appImage} alt="App Design" />
                    </div>
                    <div className="col-lg-5 col-md-7 about-right">
                        <h1>Most User Friendly Tracking App</h1>
                        <ul>
                            <li className="d-flex">
                                <div className="icon">
                                    <span className="ti-layout-media-center-alt"></span>
                                </div>
                                <div className="details">
                                    <h4>User Friendly</h4>
                                    <p>
                                        A wonderful serenity has taken possession of my entire soul, like these sweet
                                        mornings of spring which I enjoyed.
                                    </p>
                                </div>
                            </li>
                            <li className="d-flex">
                                <div className="icon">
                                    <span className="ti-alert"></span>
                                </div>
                                <div className="details">
                                    <h4>Simplicity &amp; Secure </h4>
                                    <p>
                                    In this app customer cannot access their information quickly and easily, they will become frustrated and do it another way possibly by using others. Clear, uncluttered screens improve the customer experience.
                                    </p>
                                </div>
                            </li>
                            <li className="d-flex">
                                <div className="icon">
                                    <span className="ti-loop"></span>
                                </div>
                                <div className="details">
                                    <h4>Update Features</h4>
                                    <p>
                                    This app more relevant to our customers and send out updates periodically. This means that you not only end up with a better product, but can respond to security issues as they arise.
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
 
export default About;