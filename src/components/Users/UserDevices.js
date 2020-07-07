import React, { Component, useState, Fragment } from "react";
import { withAuthorization, AuthUserContext } from "../session";
import axios from "axios";
import MatrialTable from "material-table";
import { DataTableContext } from "../data-table";
import {
  Paper,
  Card,
  CardHeader,
  Divider,
  CardContent,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  ListItemSecondaryAction,
  IconButton,
  Grid,
  TextField,
  Fab
} from "@material-ui/core";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { getUserDevices } from "../../actions";
import Navigation from "../navigation";
import * as ROUTES from "../constant/router";
// For Rejohn need Start
import withStyles from "@material-ui/core/styles/withStyles";
import $ from "jquery";
import ReactResizeDetector from "react-resize-detector";
import Topbar from "../layouts/Topbar";
import UserSidebar from "../layouts/UserSidebar";
import TotalUsers from "../layouts/TotalUsers";
import ActiveUsers from "../layouts/ActiveUsers";
import InactiveUsers from "../layouts/InactiveUsers";
import AdminUsers from "../layouts/AdminUsers";
import TotalDevices from "../layouts/TotalDevices";
import ActiveDevices from "../layouts/ActiveDevices";
import InactiveDevices from "../layouts/InactiveDevices";
import SearchIcon from "@material-ui/icons/Search";
import CommentIcon from "@material-ui/icons/Comment";
import RoomIcon from "@material-ui/icons/Room";
import VisibilityIcon from "@material-ui/icons/Visibility";
import DriverPic from "../../images/user1.png";

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
    margin: "20px"
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
  },
  fab: {
    margin: theme.spacing(1)
  }
});
// For Rejohn need End

class UserDevices extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // For Rejohn need Start
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
    if (this.props.devices.length === 0) {
      this.props.getUserDevices(this.props.userInfo._id);
    }
  }

  updateUser = (newData, oldData, resolve) => {
    this.props.updateUser(newData, oldData, resolve);
  };

  render() {
    // For Rejohn need Start
    const { classes } = this.props;
    console.log(this.props.devices, "...............");
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
            <Paper className={classes.paperContent}>
              <Card>
                <CardHeader title="Vehicle List" />
                <Divider />
                <div className={classes.searchGrid}>
                  <Grid container spacing={1} alignItems="flex-end">
                    <Grid item>
                      <SearchIcon />
                    </Grid>
                    <Grid item>
                      <TextField
                        id="input-with-icon-grid"
                        label="Search Your Vehicle"
                        InputProps={{ disableUnderline: true }}
                      />
                    </Grid>
                  </Grid>
                </div>
                <CardContent className={classes.cardContent}>
                  <List>
                    {this.props.devices.map(device => (
                      <Fragment key={device._id}>
                        <Divider />
                        <ListItem alighitems="flex-start">
                          <ListItemAvatar>
                            <Avatar
                              className={classes.bigAvatar}
                              alt="Driver Profile"
                              src=""
                            />
                          </ListItemAvatar>
                          <ListItemText
                            primary="Driver Name: Rejohn"
                            secondary={
                              <React.Fragment>
                                <Typography
                                  component="span"
                                  variant="body2"
                                  className=""
                                  color="textPrimary"
                                >
                                  Registation Number:{" "}
                                  {device.registration_number}
                                </Typography>
                              </React.Fragment>
                            }
                          />

                          <ListItemSecondaryAction>
                            <div>
                              <Link to={`location/${device.id}`}>
                                <Fab
                                  color="primary"
                                  aria-label="view"
                                  className={classes.fab}
                                >
                                  <RoomIcon />
                                </Fab>
                              </Link>
                              <Link to={`vehicle/${device._id}`}>
                                <Fab
                                  color="secondary"
                                  aria-label="details"
                                  className={classes.fab}
                                >
                                  <VisibilityIcon />
                                </Fab>
                              </Link>
                            </div>
                          </ListItemSecondaryAction>
                        </ListItem>
                      </Fragment>
                    ))}

                    {/* <Divider />
                    <ListItem alighItems="flex-start">
                      <ListItemAvatar>
                        <Avatar
                          className={classes.bigAvatar}
                          alt="Driver Profile"
                          src={DriverPic}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Rejohn"
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className=""
                              color="textPrimary"
                            >
                              Dhaka-Metro 22-4678
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <ListItemSecondaryAction>
                        <div>
                          <Link to={ROUTES.USERHOME}>
                            <Fab
                              color="primary"
                              aria-label="add"
                              className={classes.fab}
                            >
                              <RoomIcon />
                            </Fab>
                          </Link>
                          <Link to={`vehicle/12`}>
                            <Fab
                              color="secondary"
                              aria-label="edit"
                              className={classes.fab}
                            >
                              <VisibilityIcon />
                            </Fab>
                          </Link>
                        </div>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <Divider />
                    <ListItem alighItems="flex-start"> */}
                    {/* <ListItemAvatar>
                        <Avatar
                          className={classes.bigAvatar}
                          alt="Driver Profile"
                          src={DriverPic}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary="Rejohn"
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              className=""
                              color="textPrimary"
                            >
                              Dhaka-Metro 22-4678
                            </Typography>
                          </React.Fragment>
                        }
                      />
                      <ListItemSecondaryAction>
                        <div>
                          <Link to={ROUTES.USERHOME}>
                            <Fab
                              color="primary"
                              aria-label="add"
                              className={classes.fab}
                            >
                              <RoomIcon />
                            </Fab>
                          </Link>
                          <Link to={`vehicle/12`}>
                            <Fab
                              color="secondary"
                              aria-label="edit"
                              className={classes.fab}
                            >
                              <VisibilityIcon />
                            </Fab>
                          </Link>
                        </div>
                      </ListItemSecondaryAction>
                    </ListItem> */}
                  </List>
                </CardContent>
              </Card>
            </Paper>
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
)(withAuthorization(condition)(withStyles(styles)(UserDevices)));
