import React, {Component, Fragment} from 'react';
import {withAuthorization} from '../session';
import MatrialTable from 'material-table';
import {DataTableContext} from '../data-table';
import {Grid} from '@material-ui/core';
import {connect} from 'react-redux'
import {fetchAllUsers,updateUser} from '../../actions'

// For Rejohn need Start
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

class UserListPage extends Component {
  constructor (props) {
    super (props);
    this.state = {
      columns: [
        {title: 'Name', field: 'name'},
        {title: 'Email', field: 'email'},
        {title: 'Contact', field: 'contact'},
        {title: 'Address', field: 'address'},
        {title: 'Organization', field: 'organization_name'},
      ],
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
    
    if(this.props.users.length===0){
      this.props.getUsers();
    }
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
            <DataTableContext.Consumer>
                {tableIcons => (
                  <Grid container justify="center" style={{padding: 20}}>
                    <Grid item md={12} sm={12}>
                      <MatrialTable
                        icons={tableIcons}
                        title="User List"
                        columns={this.state.columns}
                        data={this.props.users}
                        options={{actionsColumnIndex: -1}}
                        editable={{
                          onRowUpdate: (newData, oldData) => {
                            return new Promise (resolve => {
                              this.updateUser (newData, oldData, resolve);
                            });
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                )}
              </DataTableContext.Consumer>
            {/* <Footer /> */}
          </main>
        </div>
      </Fragment>
    );

    // Sohel Sir Code
    /*return (
      <Fragment>
        <DataTableContext.Consumer>
          {tableIcons => (
            <Grid container justify="center" style={{padding: 20}}>
              <Grid item md={10} sm={10}>
                <MatrialTable
                  icons={tableIcons}
                  title="User List"
                  columns={this.state.columns}
                  data={this.props.users}
                  options={{actionsColumnIndex: -1}}
                  editable={{
                    onRowUpdate: (newData, oldData) => {
                      return new Promise (resolve => {
                        this.updateUser (newData, oldData, resolve);
                      });
                    },
                  }}
                />
              </Grid>
            </Grid>
          )}
        </DataTableContext.Consumer>
      </Fragment>
    );*/
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
    updateUser:(newData, oldData, resolve)=>dispatch(updateUser(newData,oldData,resolve))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withAuthorization (condition) (withStyles(styles)(UserListPage)));
