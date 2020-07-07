import React from 'react';
import clsx from 'clsx';
import { Divider, Drawer } from '@material-ui/core';

// Added By Rejohn
import withStyles from '@material-ui/core/styles/withStyles';
import  SidebarNav  from './SidebarNav';
import  Profile  from './Profile';

const styles = (theme) => ({
  drawer: {
    width: 240,
    [theme.breakpoints.up('lg')]: {
      marginTop: 64,
      height: 'calc(100% - 64px)'
    }
  },
  root: {
    backgroundColor: theme.palette.white,
    width: '240px',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    padding: theme.spacing(2)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  nav: {
    marginBottom: theme.spacing(2)
  }
});


class Sidebar extends React.Component {
  
  state = {  }
  render() { 
    const {classes, onClose, open, variant, userInfo} = this.props;
    return (
      <Drawer 
      anchor="left"
      // classes={ classes.drawer }
      onClose={onClose}
      open={open}
      variant={variant}
    >
      <div
        className={clsx(classes.root)}
        style={{paddingTop: '70px'}}
      >
        <Profile userInfo={userInfo} />
        <Divider className={classes.divider} />
        <SidebarNav
          className={classes.nav}
        />
      </div>
    </Drawer>
    );
  }
}
 
export default withStyles(styles)(Sidebar);