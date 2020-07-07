import React, {Component, Fragment} from 'react';
import {Tabs,Tab} from '@material-ui/core'
import TabPanel from './tab-panel'
import {connect} from 'react-redux'
import {fetchAllDevices,updateDevice,deleteDevice,addDevice,assignDevice,unAssignDevice} from '../../actions';

// For Rejohn need
import withStyles from '@material-ui/core/styles/withStyles';
import $ from 'jquery';
import ReactResizeDetector from 'react-resize-detector';
import Topbar from '../layouts/Topbar';
import Sidebar from '../layouts/Sidebar';
import clsx from 'clsx';

const styles = (theme) => ({
  root: {
    paddingTop: 56,
    height: '100%',
  },
  shiftContent: {
    paddingLeft: 240
  },
  content: {
    height: '100%'
  }
});
// For Rejohn need End

class DevicePage extends Component {
  constructor (props) {
    super (props);
    this.state = {
      open: false,
      columns: [
        {title: 'IMEI', field: 'imei'},
        {title: 'Reg No', field: 'registration_number'},
        {title: 'Center Number', field: 'center_number'},
      ],
      value:0,
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

  handleTabChange= (e,value)=>{
    this.setState({value:value})
  }

  a11yProps = (index)=>{
      return {
          id: 'simple-tab-$'+index,
          'aria-controls': 'simple-tabpanel-$'+index,
        };
  }

  componentDidMount (){
    if(this.props.devices.length===0){
      this.props.getAllDevices();
    }
  }

  render () {
    // For Rejohn need Start
    const {classes} = this.props;
    // For Rejohn need End
    return (
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
        {/* <div> */}
          <Tabs value={this.state.value} onChange={this.handleTabChange} aria-label="simple tabs example" indicatorColor="primary"
          textColor="primary" centered>
          <Tab label="ALL" {...this.a11yProps(0)} />
          <Tab label="ASSIGNED" {...this.a11yProps(1)} />
          <Tab label="UN-ASSIGNED" {...this.a11yProps(2)} />
          </Tabs> 

          <TabPanel value={this.state.value} index={0} 
            data={this.props.devices} 
            updateDevice={this.props.updateDevice}
            deleteDevice={this.props.deleteDevice}
            handleSubmit={this.props.addDevice}
            assignDevice={ this.props.assignDevice}
            unAssignDevice={this.props.unAssignDevice}>
            All
          </TabPanel>

          <TabPanel value={this.state.value} index={1} 
          data={this.props.devices.filter(device=>device.uid!=null)}
          updateDevice={this.props.updateDevice}
          deleteDevice={this.props.deleteDevice}
          handleSubmit={this.props.addDevice}
          assignDevice={ this.props.assignDevice}
            unAssignDevice={this.props.unAssignDevice}>
            ASSIGNED
          </TabPanel>
          <TabPanel value={this.state.value} index={2} 
            data={this.props.devices.filter(device=>device.uid==null)}
            updateDevice={this.props.updateDevice}
            deleteDevice={this.props.deleteDevice}
            handleSubmit={this.props.addDevice}
            assignDevice={ this.props.assignDevice}
            unAssignDevice={this.props.unAssignDevice}
          >
            UN-ASSIGNED
          </TabPanel>
          {/* </div> */}
          </main>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state)=>{
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch)=>{
  return{
    getAllDevices:()=>dispatch(fetchAllDevices()),
    updateDevice:(newData, oldData, resolve)=>dispatch(updateDevice(newData, oldData, resolve)),
    deleteDevice:(oldData,resolve)=>dispatch(deleteDevice(oldData,resolve)),
    addDevice:(newData,resolve)=>dispatch(addDevice(newData,resolve)),
    assignDevice:(oldData,data,resolve)=>dispatch(assignDevice(oldData,data,resolve)),
    unAssignDevice:(device)=> dispatch(unAssignDevice(device))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(DevicePage));
