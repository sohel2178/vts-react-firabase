import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { makeStyles } from "@material-ui/styles";
import {
  Card,
  CardHeader,
  CardContent,
  Divider,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  root: {},
  item: {
    display: "flex",
    flexDirection: "column"
  }
}));

const VehicleInfo = props => {
  const { className } = props;
  const classes = useStyles();
  let renderMarkup =
    props.deviceInfo == null ? (
      <Card className={clsx(classes.root, className)}>
        <CardHeader title="Vehicle Information Details" />
        <Divider />
        <CardContent>
          <Typography>Loading....</Typography>
        </CardContent>
      </Card>
    ) : (
      <Table className={classes.table} aria-label="simple table">
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Registration Number
            </TableCell>
            <TableCell align="right">
              {props.deviceInfo.registration_number}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Vehicle Type
            </TableCell>
            <TableCell align="right">Car</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Device Model
            </TableCell>
            <TableCell align="right">{props.deviceInfo.device_model}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              SIM Number
            </TableCell>
            <TableCell align="right">
              {props.deviceInfo.device_sim_number}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Center Number
            </TableCell>
            <TableCell align="right">
              {props.deviceInfo.center_number}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  return (
    <Card className={clsx(classes.root, className)}>
      <CardHeader title="Vehicle Information Details" />
      <Divider />
      <CardContent>{renderMarkup}</CardContent>
    </Card>
  );
};

VehicleInfo.propTypes = {
  className: PropTypes.string
};

export default VehicleInfo;
