import React, { forwardRef } from 'react';
import { NavLink as RouterLink, Link } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Divider, List, ListItem, colors } from '@material-ui/core';

import DashboardIcon from '@material-ui/icons/Dashboard';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import ImageIcon from '@material-ui/icons/Image';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import SettingsIcon from '@material-ui/icons/Settings';
import PermDeviceInformation from '@material-ui/icons/PermDeviceInformation';
import * as ROUTES from '../constant/router';
import Signout from '../signout';


const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    paddingTop: 0,
    paddingBottom: 0
  },
  navlink: {
    color: colors.blueGrey[800],
    padding: '10px 8px',
    // justifyContent: 'flex-start',
    display: 'flex',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: 'flex',
    alignItems: 'center',
    marginRight: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    '& $icon': {
      color: theme.palette.primary.main
    }
  }
}));



const UserSidebarNav = props => {
  const { className } = props;
  const classes = useStyles();

  return (
    <List className={clsx(classes.root, className)}>
      <ListItem
          className={classes.item}
          disableGutters
          key='Dashboard'
        >
          <Link
            className={classes.navlink}
            to={ROUTES.USERHOME}
          >
            <div className={classes.icon}><DashboardIcon /></div>
            Dashboard
          </Link>
      </ListItem>
      <ListItem
          className={classes.item}
          disableGutters
          key='Users'
        >
          <Link
            className={classes.navlink}
            to={ROUTES.USERDEVICES}
          >
            <div className={classes.icon}><DirectionsCarIcon /></div>
            All Vehicle 
          </Link>
      </ListItem>
      <Divider className={classes.divider} />
      <ListItem
          className={classes.item}
          disableGutters
          key='Profile'
        >
          <Link
            className={classes.navlink}
            to={ROUTES.USERPROFILE}
          >
            <div className={classes.icon}><AccountBoxIcon /></div>
            User Profile
          </Link>
      </ListItem>
      <Signout />
    </List>
  );
};

UserSidebarNav.propTypes = {
  className: PropTypes.string
};

export default UserSidebarNav;
