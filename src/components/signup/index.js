import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom';
import * as ROUTES from '../constant/router';
import {withFirebase} from '../firebase'
import { SignInLink } from '../login';
import {compose} from 'recompose';
import axios from 'axios';
import { Grid,Paper, Button ,TextField, Avatar, Box, Typography } from '@material-ui/core';

import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

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

const SignupPage = () => {
  const classes = useStyles();
    return (
      <Grid container className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <PersonAddIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <form className={classes.form} noValidate>
              <SignUpForm/>
              <Grid container >
                <Grid item xs>
                </Grid>
                <Grid item>
                  <SignInLink/>
                </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    //   <Grid container justify="center">
    //     <Grid md={6} item>
    //       <Paper>
    //         <Grid container direction="column" style={{padding:16}}>
    //           <h1 style={{textAlign:"center"}}>Sign Up</h1>
    //               <SignUpForm/>
    //               <SignInLink/>
    //         </Grid>
    //       </Paper>
    //     </Grid>
    //   </Grid>
     );
}

const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

class SignUpFormBase extends Component{
    constructor(props){
        super(props)
        this.state = {...INITIAL_STATE}
    }

    onSubmit = event=>{
        event.preventDefault();

        const { email, passwordOne } = this.state;

        // console.log(this.props.firebase.createUserWithEmailAndPassword)

        this.props.firebase
            .createUserWithEmailAndPassword(email,passwordOne)
          .then(authUser => {
            let user = {
              email: email
            }
            this.setState({ ...INITIAL_STATE });
            axios.post("http://167.71.227.221:2255/api/users/", user)
            .then(response=>{
              this.props.history.push(ROUTES.SIGN_IN)
            })
            .catch(err => {
              console.log(err)
            })
            
          })
          .catch(error => {
            this.setState({ error });
          });
    
       

    }

    onChange = event=>{
        this.setState({ [event.target.name]: event.target.value });
    }

    render() {
        const {
            username,
            email,
            passwordOne,
            passwordTwo,
            error,
          } = this.state;

        const isInvalid =
            passwordOne !== passwordTwo ||
            passwordOne === '' ||
            email === '' ||
            username === '';
        return (

          <Grid container direction="column" justify="flex-start"
          alignItems="stretch" style={{padding:16}}>

            <TextField
              required
              label="Email"
              style={{margin:8}}
              variant="outlined"
              name="username"
              value={username}
              onChange={this.onChange}
              type="text"/>
            <TextField
                required
                label="Email"
                style={{margin:8}}
                variant="outlined"
                name="email"
                type="email"
                value = {email}
                onChange={this.onChange}/>

            <TextField
                required
                label="Password One"
                style={{margin:8}}
                variant="outlined"
                name="passwordOne"
                type="password"
                value = {passwordOne}
                onChange={this.onChange}/>

            <TextField
                required
                label="Password Two"
                style={{margin:8}}
                variant="outlined"
                name="passwordTwo"
                type="password"
                value = {passwordTwo}
                onChange={this.onChange}/>

                <Button onClick={this.onSubmit} variant="contained" color="primary">Sign Up</Button>


                {error && <p>{error.message}</p>}
          </Grid>
        );
      }


}

const SignUpForm = compose(withRouter,withFirebase) (SignUpFormBase)

const SignUpLink = () => (
    <p>
      <Link to={ROUTES.SIGN_UP}>Don't have an account? Sign Up</Link>
    </p>
  );
 
export default SignupPage;

export {SignUpForm,SignUpLink}