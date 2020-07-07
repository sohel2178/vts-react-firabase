import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { Card, CardContent, Grid, Typography, Avatar } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import PermDeviceInformationIcon from '@material-ui/icons/PermDeviceInformation';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  },
  content: {
    alignItems: 'center',
    display: 'flex'
  },
  title: {
    fontWeight: 700
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
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
    color: theme.palette.primary.main
  },
  differenceValue: {
    color: theme.palette.success.dark,
    marginRight: theme.spacing(1)
  }
}));

const UserTotalDevices= props => {
  const { className } = props;
  const classes = useStyles();
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
              color="textSecondary"
              gutterBottom
              variant="body2"
            >
              TOTAL DEVICES
            </Typography>
            <Typography variant="h3">{props.userTotalDevices.length}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>
              <PermDeviceInformationIcon className={classes.icon} />
            </Avatar>
          </Grid>
        </Grid>
        <div className={classes.difference}>
          <ArrowForwardIcon className={classes.differenceIcon} />
          <Typography
            className={classes.differenceValue}
            variant="body2"
          >
            100%
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

UserTotalDevices.propTypes = {
  className: PropTypes.string
};

export default UserTotalDevices;
