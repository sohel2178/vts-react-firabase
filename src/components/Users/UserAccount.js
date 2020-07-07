import React, {Component, useState, Fragment} from 'react';
import {withAuthorization, AuthUserContext} from '../session';
import {Grid} from '@material-ui/core';
import {connect} from 'react-redux'
import {fetchAllUsers, fetchAllDevices} from '../../actions'


// For Rejohn need Start
import withStyles from '@material-ui/core/styles/withStyles';
import $ from 'jquery';
import ReactResizeDetector from 'react-resize-detector';
import Topbar from '../layouts/Topbar';
import UserSidebar from '../layouts/UserSidebar';
import UserAccountProfile from './UserAccountProfile';
import UserAccountDetails from './UserAccountDetails';
import TotalDevices from '../layouts/TotalDevices';
import ActiveDevices from '../layouts/ActiveDevices';
import InactiveDevices from '../layouts/InactiveDevices';

import clsx from 'clsx';

const styles = (theme) => ({
  root: {
    paddingTop: '56px',
    height: '100%',
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  },
  gridTopMargin: {
    marginTop: '20px'
  }
});
// For Rejohn need End

class UserAccount extends Component {
  constructor (props) {
    super (props);
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
    if(winWidth < 1280){
        this.setState({
          isDesktop: false
        })
    }else {
         this.setState({
          isDesktop: true
         })
    }
  }
 
  handleSidebarOpen = () => {
    this.setState({
      setOpenSidebar: true
    })
  };

  handleSidebarClose = () => {
    this.setState({
      setOpenSidebar: false
    })
  };
  // For Rejohn need End

  componentDidMount () {
    console.log("Sohel Test",this.props)

    if(this.props.users.length===0){
      this.props.getUsers();
    }
    if(this.props.devices.length===0){
      this.props.getAllDevices();
    }
  }

  updateUser = (newData, oldData, resolve) => {
    this.props.updateUser(newData,oldData,resolve)
  };

  render () {
    // For Rejohn need Start
    const {classes} = this.props;
    console.log(this.props.devices,'...............')
    // For Rejohn need End
    
    return(
      <Fragment>
          <div
            className={
              `${this.state.isDesktop? (
                clsx({
                  [classes.root]: true,
                  [classes.shiftContent]: true
                })
              ): (
                clsx({
                  [classes.root]: true,
                  [classes.shiftContent]: false
                })
              )}`
          }
          >
          <ReactResizeDetector handleWidth handleHeight onResize={this.onResize} />  
          <Topbar onSidebarOpen={this.handleSidebarOpen}/>
          <UserSidebar
            onClose={this.handleSidebarClose}
            open={this.state.setOpenSidebar}
            variant={ (this.state.isDesktop) ? 'persistent' : 'temporary'  }
            userInfo={this.props.userInfo}
          />
          <main className={classes.content}>
            <Grid container className={classes.gridTopMargin} spacing={2} >
              <Grid item lg={4} md={6} xl={4} xs={12} >
                <UserAccountProfile userInfo={this.props.userInfo} />
              </Grid>
              <Grid item lg={8} md={6} xl={8} xs={12}>
                <UserAccountDetails />
              </Grid>
            </Grid>
          </main>
        </div>
      </Fragment>
    );

  }
}

const condition = authUser => authUser != null;

const mapStateToProps = (state)=>{
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch)=>{
  return {
    getUsers:()=>dispatch(fetchAllUsers()),
    // updateUser:(newData, oldData, resolve)=>dispatch(updateUser(newData,oldData,resolve)),
    getAllDevices:()=>dispatch(fetchAllDevices()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withAuthorization (condition) (withStyles(styles)(UserAccount)));
