import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Avatar, Typography } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    minHeight: 'fit-content'
  },
  avatar: {
    width: 60,
    height: 60
  },
  name: {
    marginTop: theme.spacing(1)
  }
}));

const Profile = props => {
  const { className, userInfo } = props;
  const classes = useStyles();
  
  return (
    <div
      className={clsx(classes.root, className)}
    >
      <Avatar
        alt="Person"
        className={classes.avatar}
        // component={RouterLink}
        src={userInfo.image}
        // to="/settings"
      />
      <Typography
        className={classes.name}
        variant="h4"
      >
        {userInfo.name}

      </Typography>
    <Typography variant="body2">{userInfo.is_admin ? ('Admin'): ('User')}</Typography>
    </div>
  );
};

Profile.propTypes = {
  className: PropTypes.string
};

export default Profile;
