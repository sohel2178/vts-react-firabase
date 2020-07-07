import React, { Component } from "react";
import axios from "axios";
import { usersUrl } from "../../actions";
import * as ROUTES from "../constant/router";
import { withFirebase } from "../firebase";
import { withRouter, Link } from "react-router-dom";
import { SignUpLink } from "../signup";
import { compose } from "recompose";
import { PasswordForgetLink } from "../password-forget";
import {
  TextField,
  Grid,
  Paper,
  Typography,
  Button,
  Avatar,
  Box,
  Checkbox,
  FormControlLabel
} from "@material-ui/core";

import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";

import LoginBg from "../../images/login-bg.jpg";

const useStyles = makeStyles(theme => ({
  root: {
    height: "100vh"
  },
  image: {
    backgroundImage: `url(${LoginBg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const LoginPage = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <form className={classes.form} noValidate>
            <SignInForm />
            <Grid container>
              <Grid item xs>
                <PasswordForgetLink />
              </Grid>
              <Grid item>
                <SignUpLink />
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
    // <Grid container justify="center" style={{marginTop:20}}>
    //   <Grid item md={6} >
    //     <Paper>
    //       <Grid container spacing={3}  direction="column" style={{padding:10}}>
    //         <Grid item style={{textAlign:"center"}}>
    //           <Typography variant="h4">Sign In</Typography>
    //           <hr/>
    //         </Grid>
    //         <Grid item>
    //           <SignInForm />
    //         </Grid>
    //         <Grid item >
    //           <Grid container justify="space-between" style={{padding:10}}>
    //             <PasswordForgetLink/>
    //             <SignUpLink />
    //           </Grid>
    //         </Grid>
    //       </Grid>
    //     </Paper>
    //   </Grid>
    // </Grid>
  );
};

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};

class LoginBaseForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        console.log(this.props, "From Login Props");
        console.log(this.state, "From Login State");

        axios
          .get(usersUrl + email)
          .then(user => {
            if (user.is_admin) {
              this.props.history.push(ROUTES.HOME);
            } else {
              this.props.history.push(ROUTES.USERHOME);
            }
          })
          .catch(err => console.log(err));

        //
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";
    return (
      <Grid
        container
        direction="column"
        justify="flex-start"
        alignItems="stretch"
      >
        <TextField
          required
          label="Email"
          name="email"
          style={{ margin: 8 }}
          variant="outlined"
          value={email}
          onChange={this.onChange}
        />
        <TextField
          required
          label="Password"
          name="password"
          style={{ margin: 8 }}
          variant="outlined"
          value={password}
          onChange={this.onChange}
          type="password"
          // InputLabelProps={{
          //   shrink: true,
          // }}
        />
        <FormControlLabel
          control={<Checkbox value="remember" color="primary" />}
          label="Remember me"
        />
        {/* <Button variant="contained" color="primary" disabled={isInvalid} onClick={this.onSubmit}> Sign In</Button> */}
        <Button variant="contained" color="primary" onClick={this.onSubmit}>
          {" "}
          Sign In
        </Button>
        {error && <p>{error.message}</p>}
      </Grid>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(LoginBaseForm);

const SignInLink = () => (
  <p style={{ marginLeft: 16 }}>
    <Link to={ROUTES.SIGN_IN}>Already have an account? Sign In</Link>
  </p>
);

export default LoginPage;

export { SignInForm, SignInLink };
