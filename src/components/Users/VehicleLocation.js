import React, { Component, useState, Fragment } from "react";
import { withAuthorization, AuthUserContext } from "../session";
import { Paper } from "@material-ui/core";
import { connect } from "react-redux";
import { getUserDevices } from "../../actions";

import firebase from "firebase";


// For Rejohn need Start
import withStyles from "@material-ui/core/styles/withStyles";
import $ from "jquery";
import ReactResizeDetector from "react-resize-detector";
import Topbar from "../layouts/Topbar";
import UserSidebar from "../layouts/UserSidebar";
import Location from "../location/Location";


import clsx from "clsx";

const styles = theme => ({
  root: {
    paddingTop: "56px",
    height: "100%"
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: "100%"
  },
  paperContent: {
    marginTop: "20px",
    margin: "20px",
    height: "550px"
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  searchGrid: {
    paddingLeft: "10px",
    marginBottom: "10px"
  },
  cardContent: {
    padding: "0px"
  }
});
// For Rejohn need End


class VehicleLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // For Rejohn need Start
      deviceData: null,
      setOpenSidebar: true,
      isDesktop: true
      // For Rejohn need End
    };
  }

  // For Rejohn need Start
  onResize = () => {
    let winWidth = $(window).width();
    if (winWidth < 1280) {
      this.setState({
        isDesktop: false
      });
    } else {
      this.setState({
        isDesktop: true
      });
    }
  };

  handleSidebarOpen = () => {
    this.setState({
      setOpenSidebar: true
    });
  };

  handleSidebarClose = () => {
    this.setState({
      setOpenSidebar: false
    });
  };
  // For Rejohn need End

  componentDidMount() {


    const { id } = this.props.match.params;
    let ref = firebase
      .database()
      .ref()
      .child("devices")
      .child(id);

    ref.on("child_added", data => {
      if (data.key === "geo") {
        let deviceData = data.val();
        this.setState({
          deviceData: deviceData
        });
      }
    });
   
  }

  render() {
    // For Rejohn need Start
    const { classes } = this.props;
    let renderMap =
      this.state.deviceData === null ? (
        "Loading...."
      ) : (
        <Location
          data={this.state.deviceData}
          deviceId={this.props.match.params}
        />
      );
    // For Rejohn need End

    return (
      <Fragment>
        <div
          className={`${
            this.state.isDesktop
              ? clsx({
                  [classes.root]: true,
                  [classes.shiftContent]: true
                })
              : clsx({
                  [classes.root]: true,
                  [classes.shiftContent]: false
                })
          }`}
        >
          <ReactResizeDetector
            handleWidth
            handleHeight
            onResize={this.onResize}
          />
          <Topbar onSidebarOpen={this.handleSidebarOpen} />
          <UserSidebar
            onClose={this.handleSidebarClose}
            open={this.state.setOpenSidebar}
            variant={this.state.isDesktop ? "persistent" : "temporary"}
            userInfo={this.props.userInfo}
          />
          <main className={classes.content}>
            <Paper className={classes.paperContent}>{renderMap}</Paper>
          </main>
        </div>
      </Fragment>
    );
  }
}

const condition = authUser => authUser != null;

// const mapStateToProps = state => {
//   return {
//     ...state
//   };
// };

const mapDispatchToProps = dispatch => {
  return {
    // getUserDevices: id => dispatch(getUserDevices(id))
  };
};

export default connect()(
  withAuthorization(condition)(withStyles(styles)(VehicleLocation))
);
