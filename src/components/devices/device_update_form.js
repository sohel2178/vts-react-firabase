import React, { Component } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Select,
  InputLabel,
} from "@material-ui/core";

import {
  REFERENCE_LIST,
  DEVICE_TYPE_LIST,
  VEHICLE_TYPE,
} from "../../Utills/webUtils";

const initialState = {
  id: "",
  registration_number: "",
  device_sim_number: "",
  center_number: "",
  device_model: "GT06",
  vehicle_model: "",
  reference: "",
  vehicle_type: 0,
  service_charge: 0,
};

let counter = 0;

class DeviceUpdateForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClose = () => {
    counter = 0;
    this.props.handleClose();
  };

  handleSubmit = (e) => {
    this.props.handleUpdateDevice(
      this.state,
      this.props.device,
      this.handleClose
    );
  };
  render() {
    const { open, handleClose } = this.props;
    if (counter === 0 && open) {
      this.setState({ ...this.props.device });
      counter++;
    }
    return (
      <Dialog
        disableBackdropClick={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth={450}
      >
        <DialogTitle id="form-dialog-title">Update Device</DialogTitle>
        <DialogContent>
          <DialogContentText>Change Field to Update Device</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="id"
            value={this.state.id}
            label="ID"
            type="text"
            onChange={this.handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="registration_number"
            value={this.state.registration_number}
            label="Registration Number"
            type="text"
            onChange={this.handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="vehicle_model"
            value={this.state.vehicle_model}
            label="Vehicle Model"
            type="text"
            onChange={this.handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="device_sim_number"
            value={this.state.device_sim_number}
            label="Device SIM Number"
            type="text"
            onChange={this.handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="center_number"
            value={this.state.center_number}
            label="Center Number"
            type="text"
            onChange={this.handleChange}
            fullWidth
          />

          <TextField
            margin="dense"
            name="service_charge"
            value={this.state.service_charge}
            label="Service Charge"
            type="text"
            onChange={this.handleChange}
            fullWidth
          />

          <InputLabel htmlFor="device_model" style={{ marginTop: 16 }}>
            References
          </InputLabel>
          <Select
            style={{ marginTop: 10 }}
            native
            value={this.state.reference}
            onChange={this.handleChange}
            inputProps={{
              name: "reference",
              id: "reference",
            }}
            fullWidth
          >
            {REFERENCE_LIST.map((ref) => (
              <option value={ref}>{ref}</option>
            ))}
          </Select>

          <InputLabel htmlFor="device_model" style={{ marginTop: 16 }}>
            Device Model
          </InputLabel>
          <Select
            style={{ marginTop: 10 }}
            native
            value={this.state.device_model}
            onChange={this.handleChange}
            inputProps={{
              name: "device_model",
              id: "device_model",
            }}
            fullWidth
          >
            {DEVICE_TYPE_LIST.map((ref) => (
              <option value={ref}>{ref}</option>
            ))}
          </Select>

          <InputLabel htmlFor="vehicle_type" style={{ marginTop: 16 }}>
            Vehicle Type
          </InputLabel>
          <Select
            style={{ marginTop: 10 }}
            native
            value={this.state.vehicle_type}
            onChange={this.handleChange}
            inputProps={{
              name: "vehicle_type",
              id: "vehicle_type",
            }}
            fullWidth
          >
            {VEHICLE_TYPE.map((item) => (
              <option value={item.value}>{item.name}</option>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleSubmit} color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeviceUpdateForm;
