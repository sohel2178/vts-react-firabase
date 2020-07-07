import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Typography,
  Table, TableBody, TableCell, TableRow,
  Button
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import DriverPic from '../../images/user1.png'

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  },
  imageContainer: {
    height: 128,
    width: 128,
    margin: '0 auto',
    borderRadius: '5px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%'
  },
}));

const DriverInfo = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
        <CardHeader
          title="Driver Information Details"
        />
        <Divider />
        <CardContent>
          <div className={classes.imageContainer}>
            <img
              alt="Product"
              className={classes.image}
              src={DriverPic}
            />
          </div>
          <Typography
              align="center"
              gutterBottom
              variant="h4"
            >
              Md. Rejohn
            </Typography>
            <Typography
              align="center"
              variant="body1"
            >
              01717546533
            </Typography>
          
        </CardContent>
        <Divider />
        <CardActions>
          <Link to={`edit/12`} >
            <Button
              color="primary"
              variant="contained"
            >
              Update Driver Info
            </Button>
          </Link>
        </CardActions>
    </Card>
  );
};

DriverInfo.propTypes = {
  className: PropTypes.string
};

export default DriverInfo;
