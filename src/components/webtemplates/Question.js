import React, { Fragment } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  CardActions,
  Button,
  CardHeader,
  TextField,
  InputLabel,
  Select,
  MenuItem
} from "@material-ui/core";
import $ from "jquery";
import ReactResizeDetector from "react-resize-detector";
import Topbar from "../layouts/Topbar";
import Sidebar from "../layouts/Sidebar";
// Theme
import withStyles from "@material-ui/core/styles/withStyles";
import clsx from "clsx";
import { ToastContainer, toast } from "react-toastify";
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

class Question extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // For Rejohn need Start
      setOpenSidebar: true,
      isDesktop: true,
      questionData: [],
      question_text: "",
      question_text_error: false,
      question_text_answer: "",
      question_text_answer_error: false,
      question_active_status: "",
      question_active_status_error: false
      // For Rejohn need End
    };
  }

  componentDidMount() {
    axios
      .get(SERVER_URL + "question")
      .then(res => {
        this.setState({ questionData: res.data });
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
      question_text_error: false,
      question_text_answer_error: false,
      question_active_status_error: false
    });
  };

  notify = () => {
    toast.success("Added Successfully !", {
      position: toast.POSITION.TOP_RIGHT
    });
  };

  deleteQuestionHandler = id => {
    axios
      .delete(SERVER_URL + "question/" + id)
      .then(res => {
        if (res.data) {
          axios
            .get(SERVER_URL + "question")
            .then(res => {
              this.setState({ questionData: res.data });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  formSubmitHandler = e => {
    e.preventDefault();
    if (this.state.question_text === "") {
      this.setState({ question_text_error: true });
      return;
    }
    if (this.state.question_text_answer === "") {
      this.setState({ question_text_answer_error: true });
      return;
    }
    if (this.state.question_active_status === "") {
      this.setState({ question_active_status_error: true });
      return;
    }

    const formData = new FormData();
    formData.append("question_text", this.state.question_text);
    formData.append("question_text_answer", this.state.question_text_answer);
    formData.append(
      "question_active_status",
      this.state.question_active_status
    );

    const question = {
      question_text: this.state.question_text,
      question_text_answer: this.state.question_text_answer,
      question_active_status: this.state.question_active_status
    };

    axios
      .post(SERVER_URL + "question", question)
      .then(res => {
        if (res.data) {
          this.notify();
          axios
            .get(SERVER_URL + "question")
            .then(res => {
              this.setState({ questionData: res.data });
            })
            .catch(err => console.log(err));
          this.setState({
            question_text: "",
            question_text_error: false,
            question_text_answer: "",
            question_text_answer_error: false,
            question_active_status: "",
            question_active_status_error: false
          });
        }
      })
      .catch(err => console.log(err));
  };
  deleteQuestionHandler = id => {
    axios
      .delete(SERVER_URL + "question/" + id)
      .then(res => {
        if (res.data) {
          axios
            .get(SERVER_URL + "question")
            .then(res => {
              this.setState({ questionData: res.data });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  questionInactiveHandler = id => {
    axios
      .put(SERVER_URL + "question/" + id + "/inactive")
      .then(res => {
        if (res.data) {
          axios
            .get(SERVER_URL + "question")
            .then(res => {
              this.setState({ questionData: res.data });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  questionActiveHandler = id => {
    axios
      .put(SERVER_URL + "question/" + id + "/active")
      .then(res => {
        if (res.data) {
          axios
            .get(SERVER_URL + "question")
            .then(res => {
              this.setState({ questionData: res.data });
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    let questionDatas = this.state.questionData;

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
              {questionDatas === null
                ? ""
                : questionDatas.map(data => (
                    <Grid item lg={4} md={6} xl={4} xs={12} key={data._id}>
                      <Card className={classes.teamCard}>
                        <CardHeader
                          subheader={data.question_text}
                          title="Question Text"
                        />
                        <Divider />
                        <CardContent>
                          <Typography
                            className={classes.locationText}
                            color="textSecondary"
                            variant="body1"
                          >
                            {data.question_text_answer}
                          </Typography>
                        </CardContent>
                        <Divider />
                        <Button
                          className={classes.uploadButton}
                          color="primary"
                          variant="contained"
                          onClick={() => this.deleteQuestionHandler(data._id)}
                        >
                          Delete
                        </Button>
                        {data.question_active_status ? (
                          <Button
                            variant="contained"
                            onClick={() =>
                              this.questionInactiveHandler(data._id)
                            }
                          >
                            Inctive
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            onClick={() => this.questionActiveHandler(data._id)}
                          >
                            Active
                          </Button>
                        )}
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
              >
                <CardHeader title="Add Question Answer"></CardHeader>
                <Divider />
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Question Text"
                        name="question_text"
                        value={this.state.question_text}
                        onChange={this.onChangeHandler}
                        error={this.state.question_text_error ? true : false}
                        helperText={
                          this.state.question_text_error
                            ? "Question Text is Required"
                            : ""
                        }
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Question Answer Test"
                        name="question_text_answer"
                        multiline
                        variant="outlined"
                        rows="4"
                        value={this.state.question_text_answer}
                        onChange={this.onChangeHandler}
                        error={
                          this.state.question_text_answer_error ? true : false
                        }
                        helperText={
                          this.state.question_text_answer_error
                            ? "Client Comment is Required"
                            : ""
                        }
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <InputLabel id="question-active-status">
                        Select Active Status
                      </InputLabel>
                      <Select
                        labelId="question-active-status"
                        name="question_active_status"
                        required={true}
                        value={this.question_active_status}
                        onChange={this.onChangeHandler}
                        fullWidth
                        error={
                          this.state.question_active_status_error ? true : false
                        }
                      >
                        <MenuItem value="0">Inactive</MenuItem>
                        <MenuItem value="1">Active</MenuItem>
                      </Select>
                    </Grid>
                  </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                  <Button color="primary" variant="contained" type="submit">
                    Add Question Answer
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

export default withStyles(styles)(Question);
