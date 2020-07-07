import React, { forwardRef } from "react";
import { NavLink as RouterLink, Link } from "react-router-dom";
import clsx from "clsx";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/styles";
import { Divider, List, ListItem, colors, Collapse } from "@material-ui/core";

import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import CreateIcon from "@material-ui/icons/Create";
import ImageIcon from "@material-ui/icons/Image";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import HowToVoteIcon from "@material-ui/icons/HowToVote";
import SettingsIcon from "@material-ui/icons/Settings";
import PermDeviceInformation from "@material-ui/icons/PermDeviceInformation";
import * as ROUTES from "../constant/router";
import Signout from "../signout";

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: "flex",
    paddingTop: 0,
    paddingBottom: 0
  },
  navlink: {
    color: colors.blueGrey[800],
    padding: "10px 8px",
    // justifyContent: 'flex-start',
    display: "flex",
    textTransform: "none",
    letterSpacing: 0,
    width: "100%",
    fontWeight: theme.typography.fontWeightMedium
  },
  icon: {
    color: theme.palette.icon,
    width: 24,
    height: 24,
    display: "flex",
    alignItems: "center",
    marginRight: theme.spacing(1)
  },
  divider: {
    margin: theme.spacing(2, 0)
  },
  active: {
    color: theme.palette.primary.main,
    fontWeight: theme.typography.fontWeightMedium,
    "& $icon": {
      color: theme.palette.primary.main
    }
  },
  nested: {
    paddingLeft: "6px"
  }
}));

// const CustomRouterLink = forwardRef((props, ref) => (
//   <div
//     ref={ref}
//     style={{ flexGrow: 1 }}
//   >
//     <RouterLink {...props} />
//   </div>
// ));

const SidebarNav = props => {
  const { className } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List className={clsx(classes.root, className)}>
      <ListItem className={classes.item} disableGutters key="Dashboard">
        <Link className={classes.navlink} to={ROUTES.HOME}>
          <div className={classes.icon}>
            <DashboardIcon />
          </div>
          Dashboard
        </Link>
      </ListItem>
      <ListItem className={classes.item} disableGutters key="Users">
        <Link className={classes.navlink} to={ROUTES.USERSLIST}>
          <div className={classes.icon}>
            <PeopleIcon />
          </div>
          Users List
        </Link>
      </ListItem>
      <ListItem className={classes.item} disableGutters key="Devices">
        <Link className={classes.navlink} to={ROUTES.DEVICES}>
          <div className={classes.icon}>
            <PermDeviceInformation />
          </div>
          Devices List
        </Link>
      </ListItem>
      <Divider className={classes.divider} />
      <ListItem
        className={classes.item}
        disableGutters
        onClick={handleClick}
        key="Setting"
      >
        <Link className={classes.navlink} to="#">
          <div className={classes.icon}>
            <SettingsIcon />
          </div>
          Setting
        </Link>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem className={classes.item} disableGutters key="Template">
            <Link className={classes.navlink} to={ROUTES.TEMPLATE}>
              <div className={classes.icon}>
                <DashboardIcon />
              </div>
              Template
            </Link>
          </ListItem>
          <ListItem
            className={classes.item}
            disableGutters
            key="AppScreenshoot"
          >
            <Link className={classes.navlink} to={ROUTES.APPSCREENSHOOT}>
              <div className={classes.icon}>
                <ImageIcon />
              </div>
              AppScreenshoot
            </Link>
          </ListItem>
          <ListItem className={classes.item} disableGutters key="Question">
            <Link className={classes.navlink} to={ROUTES.QUESTION}>
              <div className={classes.icon}>
                <CreateIcon />
              </div>
              Question
            </Link>
          </ListItem>
          <ListItem className={classes.item} disableGutters key="Team">
            <Link className={classes.navlink} to={ROUTES.TEAM}>
              <div className={classes.icon}>
                <HowToRegIcon />
              </div>
              Our Team
            </Link>
          </ListItem>
          <ListItem className={classes.item} disableGutters key="Testimonial">
            <Link className={classes.navlink} to={ROUTES.TESTIMONIAL}>
              <div className={classes.icon}>
                <HowToVoteIcon />
              </div>
              Testimonial
            </Link>
          </ListItem>
        </List>
      </Collapse>

      <Divider className={classes.divider} />
      <Signout />
    </List>
  );
};

SidebarNav.propTypes = {
  className: PropTypes.string
};

export default SidebarNav;
