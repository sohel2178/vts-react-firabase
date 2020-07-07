import React, {Component, Fragment} from 'react';
import {withAuthorization} from '../session';
import {Grid, Typography} from '@material-ui/core';
import {connect} from 'react-redux'

// For Rejohn need Start
import withStyles from '@material-ui/core/styles/withStyles';
import $ from 'jquery';
import ReactResizeDetector from 'react-resize-detector';
import Topbar from '../layouts/Topbar';
import Sidebar from '../layouts/Sidebar';

import NotFoundImage from '../../images/notfound.png';

import clsx from 'clsx';

const styles = (theme) => ({
  root: {
    paddingTop: '56px',
    height: '100%',
  },
  content: {
    textAlign: 'center'
  },
  image: {
    marginTop: 50,
    display: 'inline-block',
    maxWidth: '100%',
    width: 560
  }
});
// For Rejohn need End

class NotFound extends Component {
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
  }

  updateUser = (newData, oldData, resolve) => {
    this.props.updateUser(newData,oldData,resolve)
  };

  render () {
    // For Rejohn need Start
    const {classes} = this.props;
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
          <Sidebar
            onClose={this.handleSidebarClose}
            open={this.state.setOpenSidebar}
            variant={ (this.state.isDesktop) ? 'persistent' : 'temporary'  }
            userInfo={this.props.userInfo}
          />
          <main className={classes.content}>
            <Grid
                container
                justify="center"
                spacing={2}
              >
                <Grid
                  item
                  lg={6}
                  xs={12}
                >
                  <div className={classes.content}>
                    <Typography variant="h1">
                      404: The page you are looking for isn’t here
                    </Typography>
                    <Typography variant="subtitle2">
                      You either tried some shady route or you came here by mistake.
                      Whichever it is, try using the navigation
                    </Typography>
                    <img
                      alt="Under development"
                      className={classes.image}
                      src={NotFoundImage}
                    />
                  </div>
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
    // getUsers:()=>dispatch(fetchAllUsers()),
    // // updateUser:(newData, oldData, resolve)=>dispatch(updateUser(newData,oldData,resolve)),
    // getAllDevices:()=>dispatch(fetchAllDevices()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withAuthorization (condition) (withStyles(styles)(NotFound)));