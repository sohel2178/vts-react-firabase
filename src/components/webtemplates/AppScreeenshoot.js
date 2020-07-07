import React, { Fragment } from "react";
import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  TextField,
  Divider,
  Select,
  Menu,
  MenuItem,
  InputLabel
} from "@material-ui/core";
import $ from "jquery";
import ReactResizeDetector from "react-resize-detector";
import Topbar from "../layouts/Topbar";
import Sidebar from "../layouts/Sidebar";
// Theme
import withStyles from "@material-ui/core/styles/withStyles";
import PhotoCamera from "@material-ui/icons/VisibilityOff";
import DeleteIcon from "@material-ui/icons/Delete";
import { ToastContainer, toast } from "react-toastify";
import "../../../node_modules/react-toastify/dist/ReactToastify.css";
import SERVER_URL from "../../config";
import clsx from "clsx";

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
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: theme.palette.primary
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  },
  paperContent: {
    marginTop: "20px"
  },
  input: {
    display: "none"
  }
});

class AppScreeenshoot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // For Rejohn need Start
      setOpenSidebar: true,
      isDesktop: true,
      appScreenData: [],
      file: null,
      file_image: "",
      file_error: false,
      image_alt_text: "",
      image_alt_text_error: false,
      image_active_status: "",
      image_active_status_error: false
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

  componentDidMount() {
    axios
      .get(SERVER_URL + "appscreen")
      .then(res => {
        this.setState({ appScreenData: res.data });
      })
      .catch(err => console.log(err));
  }

  // onFileChange = e => {};

  onChangeHandler = e => {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
      image_alt_text_error: false,
      image_active_status_error: false
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
    if (this.state.image_alt_text === "") {
      this.setState({ image_alt_text_error: true });
      return;
    }
    if (this.state.image_active_status === "") {
      this.setState({ image_active_status_error: true });
      return;
    }
    if (this.state.file === null) {
      this.setState({ file_error: true });
      return;
    }

    const formData = new FormData();
    formData.append("image_alt_text", this.state.image_alt_text);
    formData.append("image_active_status", this.state.image_active_status);
    formData.append("image_appscreenshoot", this.state.file_image);

    axios
      .post(SERVER_URL + "appscreen", formData)
      .then(res => {
        if (res.data) {
          this.notify();
          axios
            .get(SERVER_URL + "appscreen")
            .then(res => {
              this.setState({ appScreenData: res.data });
            })
            .catch(err => console.log(err));

          this.setState({
            file: null,
            file_image: "",
            file_error: false,
            image_alt_text: "",
            image_alt_text_error: false,
            image_active_status: "",
            image_active_status_error: false
          });
        }
      })
      .catch(err => console.log(err));
  };

  deleteScreenshootHandler = id => {
    axios
      .delete(SERVER_URL + "appscreen/" + id)
      .then(res => {
        if (res.data) {
          axios
            .get(SERVER_URL + "appscreen")
            .then(res => {
              this.setState({ appScreenData: res.data });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  // const[anchorEl, setAnchorEl] = React.useState(null);

  // const handleClick = event => {
  //   setAnchorEl(anchorEl ? null : event.currentTarget);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'transitions-popper' : undefined;

  // For Rejohn need End
  render() {
    const { classes } = this.props;
    let appDatas = this.state.appScreenData;
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

            <GridList className={classes.gridList} cols={2.5}>
              {appDatas === null
                ? ""
                : appDatas.map(appdata => (
                    <GridListTile key={appdata._id}>
                      <img
                        src={
                          SERVER_URL + "public/" + appdata.image_appscreenshoot
                        }
                        alt={appdata.image_alt_text}
                      />
                      <GridListTileBar
                        title={appdata.image_alt_text}
                        classes={{
                          root: classes.titleBar,
                          title: classes.title
                        }}
                        actionIcon={
                          <IconButton
                            aria-label=""
                            // aria-describedby={1}
                            type="button"
                          >
                            <DeleteIcon
                              onClick={() =>
                                this.deleteScreenshootHandler(appdata._id)
                              }
                              className={classes.title}
                            />
                          </IconButton>
                        }
                      ></GridListTileBar>
                    </GridListTile>
                  ))}
            </GridList>

            <Card className={classes.gridTopMargin}>
              <form
                autoComplete="off"
                noValidate
                onSubmit={this.formSubmitHandler}
                method="post"
                encType="multipart/form-data"
              >
                <CardHeader title="Add App Screenshoot"></CardHeader>
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Image Alt Text"
                        name="image_alt_text"
                        value={this.state.image_alt_text}
                        onChange={this.onChangeHandler}
                        error={this.state.image_alt_text_error ? true : false}
                        helperText={
                          this.state.image_alt_text_error
                            ? "Image Alt Text is Require"
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel id="app-screenshoot">
                        Select Active Status
                      </InputLabel>
                      <Select
                        labelId="app-screenshoot"
                        name="image_active_status"
                        required={true}
                        value={this.state.image_active_status}
                        onChange={this.onChangeHandler}
                        fullWidth
                        error={
                          this.state.image_active_status_error ? true : false
                        }
                      >
                        {/* <MenuItem value="0">Inactive</MenuItem> */}
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
                        Please upload Image 360px x 640px
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
                            width: "360px",
                            height: "640px"
                          }}
                        />
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button color="primary" variant="contained" type="submit">
                    Add App Screenshoot
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

export default withStyles(styles)(AppScreeenshoot);
