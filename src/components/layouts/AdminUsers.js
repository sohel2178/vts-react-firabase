import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import { findAdminUsers, calculatePercentage } from '../../Utills/UsersUtills';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.white,
    color: theme.palette.primary.main,
    height: 56,
    width: 56
  },
  icon: {
    height: 32,
    width: 32
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center'
  },
  differenceIcon: {
    color: theme.palette.success.main
  },
  differenceValue: {
    color: '#fff',
    marginRight: theme.spacing(1)
  },
  caption: {
    color: '#fff'
  }
}));

const AdminUsers = props => {
  const { className } = props;
  const classes = useStyles();
  let adminUsers = findAdminUsers(props.homepageuser);
  let percent = calculatePercentage(props.homepageuser.length, adminUsers.length);
  return (
    <Card
      className={clsx(classes.root, className)}
    >
      <CardContent>
        <Grid
          container
          justify="space-between"
        >
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              ADMIN USERS
            </Typography>
            <Typography
              color="inherit"
              variant="h3"
            >
              {adminUsers.length}
            </Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PeopleIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <ArrowUpwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
          {percent}%
          </Typography>
          <Typography
            className={classes.caption}
            variant="caption"
          >
            Since This Month
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

AdminUsers.propTypes = {
  className: PropTypes.string
};

export default AdminUsers;
