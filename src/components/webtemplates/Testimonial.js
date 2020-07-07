import React, { Fragment } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  CardActions,
  Button,
  CardHeader,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from "@material-ui/core";
import $ from "jquery";
import ReactResizeDetector from "react-resize-detector";
import Topbar from "../layouts/Topbar";
import Sidebar from "../layouts/Sidebar";
import TagFacesIcon from "@material-ui/icons/TagFaces";
// Theme
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from "clsx";
import { ToastContainer, toast } from "react-toastify";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import SERVER_URL from "../../config";
import axios from "axios";

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
  },
  details: {
    display: "flex"
  },
  avatar: {
    marginLeft: "auto",
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0
  },
  input: {
    display: "none"
  },
  uploadButton: {
    marginRight: theme.spacing(2)
  }
});

class Testimonial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // For Rejohn need Start
      setOpenSidebar: true,
      isDesktop: true,
      testimonialData: [],
      file: null,
      file_image: "",
      client_name: "",
      client_name_error: false,
      client_organization_name: "",
      client_organization_name_error: false,
      client_comment: "",
      client_comment_error: false,
      comment_active_status: "",
      comment_active_status_error: false
      // For Rejohn need End
    };
  }

  componentDidMount() {
    axios
      .get(SERVER_URL + "testimonial")
      .then(res => {
        this.setState({ testimonialData: res.data });
      })
      .catch(err => console.log(err));
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

  onChangeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      client_name_error: false,
      client_organization_name_error: false,
      client_comment_error: false,
      comment_active_status_error: false
    });
  };

  imageHandleChange = event => {
    this.setState({
      file: URL.createObjectURL(event.target.files[0]),
      file_image: event.target.files[0]
    });
  };

  notify = () => {
    toast.success("Added Successfully !", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  formSubmitHandler = e => {
    e.preventDefault();
    if (this.state.client_name === "") {
      this.setState({ client_name_error: true });
      return;
    }
    if (this.state.client_organization_name === "") {
      this.setState({ client_organization_name_error: true });
      return;
    }
    if (this.state.client_comment === "") {
      this.setState({ client_comment_error: true });
      return;
    }
    if (this.state.comment_active_status === "") {
      this.setState({ comment_active_status_error: true });
      return;
    }
    if (this.state.file === null) {
      this.setState({ file_error: true });
      return;
    }

    const formData = new FormData();
    formData.append("client_name", this.state.client_name);
    formData.append(
      "client_organization_name",
      this.state.client_organization_name
    );
    formData.append("client_comment", this.state.client_comment);
    formData.append("comment_active_status", this.state.comment_active_status);
    formData.append("image_client_comment", this.state.file_image);
    axios
      .post(SERVER_URL + "testimonial", formData)
      .then(res => {
        if (res.data) {
          this.notify();
          axios
            .get(SERVER_URL + "testimonial")
            .then(res => {
              this.setState({ testimonialData: res.data });
            })
            .catch(err => console.log(err));
          this.setState({
            file: null,
            file_image: "",
            client_name: "",
            client_name_error: false,
            client_organization_name: "",
            client_organization_name_error: false,
            client_comment: "",
            client_comment_error: false,
            comment_active_status: "",
            comment_active_status_error: false
          });
        }
      })
      .catch(err => console.log(err));
  };

  deleteTestimonialHandler = id => {
    axios
      .delete(SERVER_URL + "testimonial/" + id)
      .then(res => {
        if (res.data) {
          axios
            .get(SERVER_URL + "testimonial")
            .then(res => {
              this.setState({ testimonialData: res.data });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  testimonialInactiveHandler = id => {
    axios
      .put(SERVER_URL + "testimonial/" + id + "/inactive")
      .then(res => {
        if (res.data) {
          axios
            .get(SERVER_URL + "testimonial")
            .then(res => {
              this.setState({ testimonialData: res.data });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  testimonialActiveHandler = id => {
    axios
      .put(SERVER_URL + "testimonial/" + id + "/active")
      .then(res => {
        if (res.data) {
          axios
            .get(SERVER_URL + "testimonial")
            .then(res => {
              this.setState({ testimonialData: res.data });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    let testiDatas = this.state.testimonialData;
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
              {testiDatas === null
                ? ""
                : testiDatas.map(testiData => (
                    <Grid item lg={4} md={6} xl={4} xs={12} key={testiData._id}>
                      <Card className={classes.teamCard}>
                        <CardContent>
                          <div className={classes.details}>
                            <div>
                              <Typography gutterBottom variant="h2">
                                {testiData.client_name}
                              </Typography>
                              <Typography
                                className={classes.locationText}
                                color="textSecondary"
                                variant="body1"
                              >
                                {testiData.client_organization_name}
                              </Typography>
                            </div>
                            <Avatar
                              className={classes.avatar}
                              src={
                                SERVER_URL +
                                "public/" +
                                testiData.image_client_comment
                              }
                            />
                          </div>
                          <div className={classes.progress}>
                            <Typography variant="body1">
                              {testiData.client_comment}
                            </Typography>
                          </div>
                        </CardContent>
                        <Divider />
                        <CardActions>
                          <Button
                            className={classes.uploadButton}
                            color="primary"
                            variant="contained"
                            onClick={() =>
                              this.deleteTestimonialHandler(testiData._id)
                            }
                          >
                            Delete
                          </Button>
                          {testiData.comment_active_status ? (
                            <Button
                              variant="contained"
                              onClick={() =>
                                this.testimonialInactiveHandler(testiData._id)
                              }
                            >
                              Inctive
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={() =>
                                this.testimonialActiveHandler(testiData._id)
                              }
                            >
                              Active
                            </Button>
                          )}
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
            </Grid>

            <Card className={classes.gridTopMargin}>
              <form
                autoComplete="off"
                noValidate
                onSubmit={this.formSubmitHandler}
                method="post"
                encType="multipart/form-data"
              >
                <CardHeader title="Add Client Testimonial"></CardHeader>
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Client Name"
                        name="client_name"
                        value={this.state.client_name}
                        onChange={this.onChangeHandler}
                        error={this.state.client_name_error ? true : false}
                        helperText={
                          this.state.client_name_error
                            ? "Client Name is Required"
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Client Organization Name"
                        name="client_organization_name"
                        value={this.state.client_organization_name}
                        onChange={this.onChangeHandler}
                        error={
                          this.state.client_organization_name_error
                            ? true
                            : false
                        }
                        helperText={
                          this.state.client_organization_name_error
                            ? "Client Organization Name is Required"
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Client Comment"
                        name="client_comment"
                        multiline
                        variant="outlined"
                        rows="4"
                        value={this.state.client_comment}
                        onChange={this.onChangeHandler}
                        error={this.state.client_comment_error ? true : false}
                        helperText={
                          this.state.client_comment_error
                            ? "Client Comment is Required"
                            : ""
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel id="comment-active-status">
                        Select Active Status
                      </InputLabel>
                      <Select
                        labelId="comment-active-status"
                        name="comment_active_status"
                        required={true}
                        value={this.state.comment_active_status}
                        onChange={this.onChangeHandler}
                        fullWidth
                        error={
                          this.state.comment_active_status_error ? true : false
                        }
                      >
                        <MenuItem value="0">Inactive</MenuItem>
                        <MenuItem value="1">Active</MenuItem>
                      </Select>
                    </Grid>

                    <Grid item xs={6}>
                      <input
                        accept="image/x-png,image/jpg,image/jpeg"
                        className={classes.input}
                        id="icon-button-file"
                        type="file"
                        onChange={this.imageHandleChange}
                      />
                      <label htmlFor="icon-button-file">
                        <IconButton
                          color="primary"
                          className={classes.button}
                          aria-label="upload picture"
                          component="span"
                        >
                          <PhotoCamera />
                        </IconButton>
                      </label>
                      <p>
                        {" "}
                        Please upload Image 60px x 60px
                        {this.state.file_error ? (
                          <span style={{ color: "red" }}>
                            {" "}
                            Image upload require
                          </span>
                        ) : (
                          ""
                        )}
                      </p>
                    </Grid>
                    <Grid item xs={6}>
                      {this.state.file === null ? (
                        ""
                      ) : (
                        <img
                          src={this.state.file}
                          style={{
                            width: "60px",
                            height: "60px"
                          }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button color="primary" variant="contained" type="submit">
                    Add Client Testimonial
                  </Button>
                </CardActions>
              </form>
            </Card>
          </main>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(styles)(Testimonial);
