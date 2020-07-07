import React, { Component } from "react";
import { Typography, Grid } from "@material-ui/core";
import PropTypes from "prop-types";

import { DataTableContext } from "../data-table";
import MaterialTable from "material-table";
import DeviceForm from "./device-form";
import UserDialog from "./user-dialog";

import EditIcon from "@material-ui/icons/Edit";
import DeviceUpdateForm from "./device_update_form";

class TabPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      update_open: false,
      userDialogOpen: false,
      device: null,
      columns: [
        { title: "ID", field: "id" },
        { title: "Reg No", field: "registration_number" },
        { title: "Center Number", field: "center_number" },
      ],
    };
  }

  openDialog = () => {
    this.setState({ open: true });
  };

  openUserDialog = (rawData) => {
    this.setState({ userDialogOpen: true, device: rawData });
  };

  updateDevice = (device) => {
    this.setState({ update_open: true, device: device });
  };

  handleUpdateClose = () => {
    this.setState({ update_open: false });
  };

  handleUpdateDevice = (newData, OldData, resolve) => {
    this.props.updateDevice(newData, OldData, resolve);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleUserDialogClose = () => {
    this.setState({ userDialogOpen: false });
  };

  handleSubmit = (newData) => {
    this.props.handleSubmit(newData, this.handleClose);
  };

  itemClick = (user) => {
    let data = { uid: user._id, id: this.state.device.id };
    this.props.assignDevice(
      this.state.device,
      data,
      this.handleUserDialogClose
    );
  };

  render() {
    const { children, value, data, index, ...other } = this.props;

    return (
      <Typography
        component="div"
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        <Grid container justify="center">
          <Grid item md={12} style={{ padding: 20 }}>
            <DataTableContext.Consumer>
              {(icons) => (
                <MaterialTable
                  title="Device List"
                  icons={icons}
                  columns={this.state.columns}
                  data={this.props.data}
                  options={{ actionsColumnIndex: -1 }}
                  actions={[
                    {
                      icon: icons.Add,
                      tooltip: "Add Device",
                      isFreeAction: true,
                      onClick: (event) => this.openDialog(),
                    },

                    (rawData) => ({
                      icon: icons.AttachFile,
                      tooltip: "Assign Device",
                      onClick: (event) => this.openUserDialog(rawData),
                      disabled: rawData.uid != null,
                    }),
                    (rawData) => ({
                      icon: icons.Clear,
                      tooltip: "UN-Assign Device",
                      onClick: (event) => this.props.unAssignDevice(rawData),
                      disabled: rawData.uid == null,
                    }),
                    {
                      icon: EditIcon,
                      tooltip: "Edit",
                      onClick: (e, data) => this.updateDevice(data),
                    },
                  ]}
                  editable={{
                    /* onRowUpdate: (newData, oldData) => {
                      return new Promise((resolve) => {
                        this.props.updateDevice(newData, oldData, resolve);
                      });
                    }, */
                    onRowDelete: (oldData) => {
                      return new Promise((resolve) => {
                        this.props.deleteDevice(oldData, resolve);
                      });
                    },
                  }}
                />
              )}
            </DataTableContext.Consumer>
          </Grid>

          <DeviceForm
            open={this.state.open}
            handleClose={this.handleClose}
            handleSubmit={this.handleSubmit}
            device={this.state.device}
          />

          <DeviceUpdateForm
            open={this.state.update_open}
            device={this.state.device}
            handleClose={this.handleUpdateClose}
            handleUpdateDevice={this.handleUpdateDevice}
          />

          <UserDialog
            userDialogOpen={this.state.userDialogOpen}
            handleUserDialogClose={this.handleUserDialogClose}
            itemClick={this.itemClick}
          />
        </Grid>
      </Typography>
    );
  }
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
