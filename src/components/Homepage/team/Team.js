import React, { Fragment } from "react";
import OwlCarousel from "react-owl-carousel";
import "../../../../node_modules/owl.carousel/dist/assets/owl.carousel.css";
import "../../../../node_modules/owl.carousel/dist/assets/owl.theme.default.css";
import SERVER_URL from "../../../config";
import axios from "axios";

class Team extends React.Component {
  state = {
    options: {
      items: 4,
      loop: true,
      margin: 30,
      dots: true,
      autoplayHoverPause: true,
      smartSpeed: 500,
      autoplay: false,
      responsive: {
        0: {
          items: 1
        },
        767: {
          items: 2
        },
        992: {
          items: 4
        }
      }
    },
    teamData: null
  };

  componentDidMount() {
    axios
      .get(SERVER_URL + "team/active")
      .then(res => {
        if (res.data) {
          this.setState({ teamData: res.data });
        }
      })
      .catch(err => console.log(err));
  }

  render() {
    let teams = this.state.teamData;
    let loadingMarkup = "Loading...";
    let teamMarkup =
      teams === null ? (
        ""
      ) : (
        <OwlCarousel
          className="team-carusel  owl-carousel"
          id="team-carusel"
          {...this.state.options}
        >
          {teams.map(team => (
            <div className="single-team item" key={team._id}>
              <img
                className="img-fluid"
                src={SERVER_URL + "public/" + team.image_team_member}
                alt={team.team_member_name}
              />
              <div className="team-content">
                <h4>{team.team_member_name}</h4>
                <ul>
                  <li>
                    <a target="_blank" href={team.facebook_link}>
                      <span className="ti-facebook"></span>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={team.twitter_link}>
                      <span className="ti-tumblr-alt"></span>
                    </a>
                  </li>
                  <li>
                    <a target="_blank" href={team.linkedin_link}>
                      <span className="ti-linkedin"></span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </OwlCarousel>
      );

    return (
      <section className="team-section section-gap-full">
        <div className="container">
          <div className="section-title">
            <h2 className="text-center">Our Team</h2>
            <p className="text-center">Intoducing the Potential Team.</p>
          </div>
          <div className="row">
            {teams === null ? loadingMarkup : teamMarkup}
          </div>
        </div>
      </section>
    );
  }
}

export default Team;
