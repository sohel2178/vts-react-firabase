import React, { Fragment } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  CardHeader,
  Typography,
  Divider,
  TextField,
  CardActions,
  Button
} from "@material-ui/core";
import $ from "jquery";
import ReactResizeDetector from "react-resize-detector";
import Topbar from "../layouts/Topbar";
import Sidebar from "../layouts/Sidebar";
import SERVER_URL from "../../config";
import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
// Theme
import withStyles from "@material-ui/core/styles/withStyles";
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
    padding: "32px",
    marginLeft: "20px",
    height: "100%"
  },
  gridTopMargin: {
    marginTop: "20px"
  }
});

class Templates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // For Rejohn need Start
      setOpenSidebar: true,
      isDesktop: true,
      contact_number_one: "",
      contact_number_one_error: false,
      contact_number_two: "",
      contact_number_two_error: false,
      contact_email_one: "",
      contact_email_one_error: false,
      contact_email_two: "",
      contact_email_two_error: false,
      contact_address: "",
      contact_address_error: false,
      facebook_link: "",
      facebook_link_error: false,
      twitter_link: "",
      twitter_link_error: false,
      linkedin_link: "",
      linkedin_link_error: false
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
    axios
      .get(SERVER_URL + "template")
      .then(res => {
        this.setState({
          contact_number_one: res.data.contact_number_one,
          contact_number_two: res.data.contact_number_two,
          contact_email_one: res.data.contact_email_one,
          contact_email_two: res.data.contact_email_two,
          contact_address: res.data.contact_address,
          facebook_link: res.data.facebook_link,
          twitter_link: res.data.twitter_link,
          linkedin_link: res.data.linkedin_link
        });
      })
      .catch(err => console.log(err));
  }

  onChangeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      contact_number_one_error: false,
      contact_number_two_error: false,
      contact_email_one_error: false,
      contact_email_two_error: false,
      contact_address_error: false,
      facebook_link_error: false,
      twitter_link_error: false,
      linkedin_link_error: false
    });
  };

  notify = () => {
    toast.success("Added Successfully !", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  formContactHandler = e => {
    e.preventDefault();
    if (this.state.contact_number_one === "") {
      this.setState({ contact_number_one_error: true });
      return;
    }
    if (this.state.contact_number_two === "") {
      this.setState({ contact_number_two_error: true });
      return;
    }

    const addContactNumber = {
      contact_number_one: this.state.contact_number_one,
      contact_number_two: this.state.contact_number_two
    };
    // console.log(addContactNumber);

    axios
      .post(SERVER_URL + "template/contact", addContactNumber)
      .then(res => {
        if (res.data) {
          this.notify();
          axios
            .get(SERVER_URL + "template")
            .then(res => {
              this.setState({
                contact_number_one: res.data.contact_number_one,
                contact_number_two: res.data.contact_number_two
              });
            })
            .catch(err => console.log(err));
          this.setState({
            contact_number_one_error: false,
            contact_number_two_error: false
          });
        }
      })
      .catch(err => console.log(err));
  };

  formEmailHandler = e => {
    e.preventDefault();
    if (this.state.contact_email_one === "") {
      this.setState({ contact_email_one_error: true });
      return;
    }
    if (this.state.contact_email_two === "") {
      this.setState({ contact_email_two_error: true });
      return;
    }

    const addEmailAddress = {
      contact_email_one: this.state.contact_email_one,
      contact_email_two: this.state.contact_email_two
    };

    axios
      .post(SERVER_URL + "template/email", addEmailAddress)
      .then(res => {
        if (res.data) {
          this.notify();
          axios
            .get(SERVER_URL + "template")
            .then(res => {
              this.setState({
                contact_email_one: res.data.contact_email_one,
                contact_email_two: res.data.contact_email_two
              });
            })
            .catch(err => console.log(err));
          this.setState({
            contact_email_one_error: false,
            contact_email_two_error: false
          });
        }
      })
      .catch(err => console.log(err));
  };

  formAddressHandler = e => {
    e.preventDefault();
    if (this.state.contact_address === "") {
      this.setState({ contact_address_error: true });
      return;
    }

    const addAddress = {
      contact_address: this.state.contact_address
    };

    axios
      .post(SERVER_URL + "template/address", addAddress)
      .then(res => {
        if (res.data) {
          this.notify();
          axios
            .get(SERVER_URL + "template")
            .then(res => {
              this.setState({
                contact_address: res.data.contact_address
              });
            })
            .catch(err => console.log(err));
          this.setState({
            contact_address_error: false
          });
        }
      })
      .catch(err => console.log(err));
  };

  formSocialHandler = e => {
    e.preventDefault();
    if (this.state.facebook_link === "") {
      this.setState({ facebook_link_error: true });
      return;
    }
    if (this.state.twitter_link === "") {
      this.setState({ twitter_link_error: true });
      return;
    }
    if (this.state.linkedin_link === "") {
      this.setState({ linkedin_link_error: true });
      return;
    }

    const addSocialAddress = {
      facebook_link: this.state.facebook_link,
      twitter_link: this.state.twitter_link,
      linkedin_link: this.state.linkedin_link
    };

    axios
      .post(SERVER_URL + "template/social", addSocialAddress)
      .then(res => {
        if (res.data) {
          this.notify();
          axios
            .get(SERVER_URL + "template")
            .then(res => {
              this.setState({
                facebook_link: this.state.facebook_link,
                twitter_link: this.state.twitter_link,
                linkedin_link: this.state.linkedin_link
              });
            })
            .catch(err => console.log(err));
          this.setState({
            facebook_link_error: false,
            twitter_link_error: false,
            linkedin_link_error: false
          });
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
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
          <Sidebar
            onClose={this.handleSidebarClose}
            open={this.state.setOpenSidebar}
            variant={this.state.isDesktop ? "persistent" : "temporary"}
            userInfo={this.props.userInfo}
          />
          <main className={classes.content}>
            <ToastContainer />
            <Grid container className={classes.gridTopMargin} spacing={2}>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <Card>
                  <CardHeader subheader="Contact Phone Number" />
                  <Divider />
                  <CardContent>
                    <div className={classes.details}>
                      <div>
                        <Typography
                          className={classes.locationText}
                          color="textSecondary"
                          variant="body1"
                        >
                          {this.state.contact_number_one
                            ? this.state.contact_number_one
                            : "Not Set Now"}
                        </Typography>
                        <Typography
                          className={classes.dateText}
                          color="textSecondary"
                          variant="body1"
                        >
                          {this.state.contact_number_two
                            ? this.state.contact_number_two
                            : "Not Set Now"}
                        </Typography>
                      </div>
                    </div>
                    <Divider />

                    <TextField
                      fullWidth
                      label="First Contact Number"
                      name="contact_number_one"
                      value={this.state.contact_number_one}
                      onChange={this.onChangeHandler}
                      error={this.state.contact_number_one_error ? true : false}
                      helperText={
                        this.state.contact_number_one_error
                          ? "Contact Number is Required"
                          : ""
                      }
                    />
                    <TextField
                      fullWidth
                      label="Second Contact Number"
                      name="contact_number_two"
                      value={this.state.contact_number_two}
                      onChange={this.onChangeHandler}
                      error={this.state.contact_number_two_error ? true : false}
                      helperText={
                        this.state.contact_number_two_error
                          ? "Contact Number is Required"
                          : ""
                      }
                    />
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={this.formContactHandler}
                    >
                      Save Contact Number
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <Card>
                  <CardHeader subheader="Contact Email Address" />
                  <Divider />
                  <CardContent>
                    <div className={classes.details}>
                      <div>
                        <Typography
                          className={classes.locationText}
                          color="textSecondary"
                          variant="body1"
                        >
                          {this.state.contact_email_one
                            ? this.state.contact_email_one
                            : "Not Set Now"}
                        </Typography>
                        <Typography
                          className={classes.dateText}
                          color="textSecondary"
                          variant="body1"
                        >
                          {this.state.contact_email_two
                            ? this.state.contact_email_two
                            : "Not Set Now"}
                        </Typography>
                      </div>
                    </div>
                    <Divider />

                    <TextField
                      fullWidth
                      label="First Email Address"
                      name="contact_email_one"
                      value={this.state.contact_email_one}
                      onChange={this.onChangeHandler}
                      error={this.state.contact_email_one_error ? true : false}
                      helperText={
                        this.state.contact_number_one_error
                          ? "Contact Email is Required"
                          : ""
                      }
                    />
                    <TextField
                      fullWidth
                      label="Second Email Address"
                      name="contact_email_two"
                      value={this.state.contact_email_two}
                      onChange={this.onChangeHandler}
                      error={this.state.contact_email_two_error ? true : false}
                      helperText={
                        this.state.contact_email_two_error
                          ? "Contact Email is Required"
                          : ""
                      }
                    />
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={this.formEmailHandler}
                    >
                      Save Email Address
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <Card>
                  <CardHeader subheader="Contact Address" />
                  <Divider />
                  <CardContent>
                    <div className={classes.details}>
                      <div>
                        <Typography
                          className={classes.locationText}
                          color="textSecondary"
                          variant="body1"
                        >
                          {this.state.contact_address
                            ? this.state.contact_address
                            : "Not Set Now"}
                        </Typography>
                      </div>
                    </div>
                    <Divider />

                    <TextField
                      fullWidth
                      label="Contact Address"
                      name="contact_address"
                      multiline
                      rows="4"
                      value={this.state.contact_address}
                      onChange={this.onChangeHandler}
                      error={this.state.contact_address_error ? true : false}
                      helperText={
                        this.state.contact_address_error
                          ? "Contact Address is Required"
                          : ""
                      }
                    />
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={this.formAddressHandler}
                    >
                      Save Contact Address
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
              <Grid item lg={4} sm={6} xl={4} xs={12}>
                <Card>
                  <CardHeader subheader="Social Media Link" />
                  <Divider />
                  <CardContent>
                    <div className={classes.details}>
                      <div>
                        <Typography
                          className={classes.locationText}
                          color="textSecondary"
                          variant="body1"
                        >
                          {this.state.facebook_link
                            ? this.state.facebook_link
                            : "Not Set Now"}
                        </Typography>
                        <Typography
                          className={classes.dateText}
                          color="textSecondary"
                          variant="body1"
                        >
                          {this.state.twitter_link
                            ? this.state.twitter_link
                            : "Not Set Now"}
                        </Typography>
                        <Typography
                          className={classes.dateText}
                          color="textSecondary"
                          variant="body1"
                        >
                          {this.state.linkedin_link
                            ? this.state.linkedin_link
                            : "Not Set Now"}
                        </Typography>
                      </div>
                    </div>
                    <Divider />

                    <TextField
                      fullWidth
                      label="Facebook Link Address"
                      name="facebook_link"
                      value={this.state.facebook_link}
                      onChange={this.onChangeHandler}
                      error={this.state.facebook_link_error ? true : false}
                      helperText={
                        this.state.facebook_link_error
                          ? "Facebook Link Required"
                          : ""
                      }
                    />
                    <TextField
                      fullWidth
                      label="Twitter Link Address"
                      name="twitter_link"
                      value={this.state.twitter_link}
                      onChange={this.onChangeHandler}
                      error={this.state.twitter_link_error ? true : false}
                      helperText={
                        this.state.twitter_link_error
                          ? "Twitter Link Required"
                          : ""
                      }
                    />
                    <TextField
                      fullWidth
                      label="Linkedin Link Address"
                      name="linkedin_link"
                      value={this.state.linkedin_link}
                      onChange={this.onChangeHandler}
                      error={this.state.linkedin_link_error ? true : false}
                      helperText={
                        this.state.linkedin_link_error
                          ? "Linkedin Link Required"
                          : ""
                      }
                    />
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={this.formSocialHandler}
                    >
                      Save Social Information
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </main>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Templates);
