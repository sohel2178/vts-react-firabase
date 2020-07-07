import React, { Component } from 'react';
import {withFirebase} from '../firebase'
import {Link} from 'react-router-dom'
import * as ROUTES from '../constant/router';

import { TextField, Grid, Typography, Button, Avatar, Box } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import LoginBg from '../../images/login-bg.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${LoginBg})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const PasswordForgetPage = () => {
    const classes = useStyles();
    return (
      <Grid container className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forget Pasword
            </Typography>
            <form className={classes.form}>
              <PasswordForgetForm />
              <Grid container >
                <Grid item xs>
                  {/* <PasswordForgetLink/> */}
                </Grid>
                <Grid item>
                  {/* <SignUpLink /> */}
                </Grid>
              </Grid>
              <Box mt={5}>
                <Copyright />
              </Box>
            </form>
          </div>
      </Grid>  
      // <div>
      //   <h1>PasswordForget</h1>
      //   <PasswordForgetForm />
      // </div>
    
    );
}

const INITIAL_STATE = {
    email: '',
    error: null,
  };

class PasswordForgetFormBase extends Component{
    constructor(props) {
        super(props);
    
        this.state = { ...INITIAL_STATE };
      }

      onSubmit = event => {
        const { email } = this.state;
    
        this.props.firebase
          .doPasswordReset(email)
          .then(() => {
            this.setState({ ...INITIAL_STATE });
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
        const { email, error } = this.state;
    
        const isInvalid = email === '';
    
        return (
          <Grid container
            direction="column"
            justify="flex-start"
            alignItems="stretch" >
              <TextField
                required
                label="Email"
                style={{margin:8}}
                variant="outlined"
                name="email"
                value = {this.state.email}
                onChange={this.onChange}
                placeholder="Email Address"/>
              <Button variant="contained" color="primary" onSubmit={this.onSubmit}> Reset My Password</Button>
              {error && <p>{error.message}</p>}
          </Grid>
          // <form onSubmit={this.onSubmit}>
          //   <input
          //     name="email"
          //     value={this.state.email}
          //     onChange={this.onChange}
          //     type="text"
          //     placeholder="Email Address"
          //   />
          //   <button disabled={isInvalid} type="submit">
          //     Reset My Password
          //   </button>
    
          //   {error && <p>{error.message}</p>}
          // </form>
        );
      }
}

const PasswordForgetLink = () => (
    <p>
      <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
    </p>
  );

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);
 
export default PasswordForgetPage;

export { PasswordForgetForm, PasswordForgetLink };