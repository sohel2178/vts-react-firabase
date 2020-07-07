import React, { Component, useState, Fragment } from "react";
import { withAuthorization, AuthUserContext } from "../session";
import { Grid } from "@material-ui/core";
import { connect } from "react-redux";
import { getUserDevices } from "../../actions";
import { findUserDeviceForDetails } from "../../Utills/UsersUtills";

// For Rejohn need Start
import withStyles from "@material-ui/core/styles/withStyles";
import $ from "jquery";
import ReactResizeDetector from "react-resize-detector";
import Topbar from "../layouts/Topbar";
import UserSidebar from "../layouts/UserSidebar";
import VehicleInfo from "./VehicleInfo";
import DriverInfo from "./DriverInfo";
import ActiveDevices from "../layouts/ActiveDevices";
import InactiveDevices from "../layouts/InactiveDevices";

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
  gridTopMargin: {
    marginTop: "20px"
  }
});
// For Rejohn need End

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // For Rejohn need Start
      deviceInfo: null,
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
    console.log(this.props.match.params);
    if (this.props.users.length === 0) {
      this.props.getUserDevices(this.props.userInfo._id);
      let deviceById = findUserDeviceForDetails(this.props.devices, id);
      console.log(deviceById);
      this.setState({
        deviceInfo: deviceById
      });
    }
  }

  render() {
    // For Rejohn need Start
    const { classes } = this.props;
    let deviceInfo = this.state.deviceInfo;

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
            <Grid className={classes.gridTopMargin} container spacing={2}>
              <Grid item md={6} xs={12}>
                <VehicleInfo deviceInfo={deviceInfo} />
              </Grid>
              <Grid item md={6} xs={12}>
                <DriverInfo deviceInfo={deviceInfo} />
              </Grid>
            </Grid>
          </main>
        </div>
      </Fragment>
    );
  }
}

const condition = authUser => authUser != null;

const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getUserDevices: id => dispatch(getUserDevices(id))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withAuthorization(condition)(withStyles(styles)(UserHome)));
