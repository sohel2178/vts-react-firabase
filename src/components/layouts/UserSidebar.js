import React from 'react';
import clsx from 'clsx';
import { Divider, Drawer } from '@material-ui/core';

// Added By Rejohn
import withStyles from '@material-ui/core/styles/withStyles';
import UserSidebarNav  from './UserSidebarNav';
import UserProfile  from './UserProfile';

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


class UserSidebar extends React.Component {
  
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
        <UserProfile userInfo={userInfo} />
        <Divider className={classes.divider} />
        <UserSidebarNav
          className={classes.nav}
        />
      </div>
    </Drawer>
    );
  }
}
 
export default withStyles(styles)(UserSidebar);