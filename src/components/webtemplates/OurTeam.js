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

class OurTeam extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // For Rejohn need Start
      setOpenSidebar: true,
      isDesktop: true,
      teamData: [],
      file: null,
      file_image: "",
      team_member_name: "",
      team_member_name_error: false,
      facebook_link: "",
      twitter_link: "",
      linkedin_link: "",
      user_active_status: "",
      user_active_status_error: false
      // For Rejohn need End
    };
  }

  componentDidMount() {
    axios
      .get(SERVER_URL + "team")
      .then(res => {
        this.setState({ teamData: res.data });
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
      team_member_name_error: false,
      user_active_status_error: false
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
    if (this.state.team_member_name === "") {
      this.setState({ team_member_name_error: true });
      return;
    }
    if (this.state.user_active_status === "") {
      this.setState({ user_active_status_error: true });
      return;
    }
    if (this.state.file === null) {
      this.setState({ file_error: true });
      return;
    }

    const formData = new FormData();
    formData.append("team_member_name", this.state.team_member_name);
    formData.append("facebook_link", this.state.facebook_link);
    formData.append("twitter_link", this.state.twitter_link);
    formData.append("linkedin_link", this.state.linkedin_link);
    formData.append("user_active_status", this.state.user_active_status);
    formData.append("image_team_member", this.state.file_image);
    axios
      .post(SERVER_URL + "team", formData)
      .then(res => {
        if (res.data) {
          this.notify();
          axios
            .get(SERVER_URL + "team")
            .then(res => {
              this.setState({ teamData: res.data });
            })
            .catch(err => console.log(err));

          this.setState({
            file: null,
            file_image: "",
            file_error: false,
            team_member_name: "",
            team_member_name_error: false,
            facebook_link: "",
            twitter_link: "",
            linkedin_link: "",
            user_active_status: "",
            user_active_status_error: false
          });
        }
      })
      .catch(err => console.log(err));
  };

  deleteTeamHandler = id => {
    axios
      .delete(SERVER_URL + "team/" + id)
      .then(res => {
        if (res.data) {
          axios
            .get(SERVER_URL + "team")
            .then(res => {
              this.setState({ teamData: res.data });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  teamInactiveHandler = id => {
    axios
      .put(SERVER_URL + "team/" + id + "/inactive")
      .then(res => {
        if (res.data) {
          axios
            .get(SERVER_URL + "team")
            .then(res => {
              this.setState({ teamData: res.data });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  teamActiveHandler = id => {
    axios
      .put(SERVER_URL + "team/" + id + "/active")
      .then(res => {
        if (res.data) {
          axios
            .get(SERVER_URL + "team")
            .then(res => {
              this.setState({ teamData: res.data });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    let teamDatas = this.state.teamData;
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
              {teamDatas === null
                ? ""
                : teamDatas.map(teamdata => (
                    <Grid item lg={4} md={6} xl={4} xs={12} key={teamdata._id}>
                      <Card className={classes.teamCard}>
                        <CardContent>
                          <div className={classes.details}>
                            <div>
                              <Typography gutterBottom variant="h2">
                                {teamdata.team_member_name}
                              </Typography>
                            </div>
                            <Avatar
                              className={classes.avatar}
                              src={
                                SERVER_URL +
                                "public/" +
                                teamdata.image_team_member
                              }
                            />
                          </div>
                          <div className={classes.progress}>
                            <Typography variant="body1">
                              <TagFacesIcon />
                              {teamdata.facebook_link}
                            </Typography>
                            <Typography variant="body1">
                              <TagFacesIcon /> {teamdata.twitter_link}
                            </Typography>
                            <Typography variant="body1">
                              <TagFacesIcon /> {teamdata.linkedin_link}
                            </Typography>
                          </div>
                        </CardContent>
                        <Divider />
                        <CardActions>
                          <Button
                            className={classes.uploadButton}
                            color="primary"
                            variant="contained"
                            onClick={() => this.deleteTeamHandler(teamdata._id)}
                          >
                            Delete
                          </Button>

                          {teamdata.user_active_status ? (
                            <Button
                              variant="contained"
                              onClick={() =>
                                this.teamInactiveHandler(teamdata._id)
                              }
                            >
                              Inctive
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              onClick={() =>
                                this.teamActiveHandler(teamdata._id)
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
                <CardHeader title="Add Team Member"></CardHeader>
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Team Member Name"
                        name="team_member_name"
                        value={this.state.team_member_name}
                        onChange={this.onChangeHandler}
                        error={this.state.team_member_name_error ? true : false}
                        helperText={
                          this.state.team_member_name_error
                            ? "Team Member Name is Required"
                            : ""
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Facebook Link"
                        name="facebook_link"
                        value={this.state.facebook_link}
                        onChange={this.onChangeHandler}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Twitter Link"
                        name="twitter_link"
                        value={this.state.twitter_link}
                        onChange={this.onChangeHandler}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Linkedin Link"
                        name="linkedin_link"
                        value={this.state.linkedin_link}
                        onChange={this.onChangeHandler}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel id="user-active-status">
                        Select Active Status
                      </InputLabel>
                      <Select
                        labelId="user-active-status"
                        name="user_active_status"
                        required={true}
                        value={this.state.user_active_status}
                        onChange={this.onChangeHandler}
                        fullWidth
                        error={
                          this.state.user_active_status_error ? true : false
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
                        Please upload Image 216px x 248px
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
                            width: "216px",
                            height: "248px"
                          }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button color="primary" variant="contained" type="submit">
                    Add Team Member
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

export default withStyles(styles)(OurTeam);
