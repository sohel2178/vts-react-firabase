import React, { Component } from "react";
import { withAuthorization } from "../session";
import { connect } from "react-redux";
import firebase from "firebase";
import ReactMapboxGl, { Layer, Feature } from "react-mapbox-gl";
import * as geolib from "geolib";

// For Rejohn need Start
import withStyles from "@material-ui/core/styles/withStyles";
import MyMarker from "./MyMarker";

const styles = theme => ({});
// For Rejohn need End

const Map = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicmVqb2huIiwiYSI6ImNqeXNqenl6NTBtcmUzbnNlN2swYXhvb2IifQ.4GjRx2WVIwGy8yLaKBTXmg"
});

class Location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialData: this.props.data,
      data: this.props.data,
      rotation: 0
    };
  }

  changeState = (currntData, rotation) => {
    this.setState({ data: currntData, rotation: rotation });
  };

  animate = (data, newData, currentState) => {
    let step = 30;
    let deltaLat = (newData.lat - data.lat) / step;
    let deltaLng = (newData.lng - data.lng) / step;
    let cdata = data;

    let rotation = geolib.getGreatCircleBearing(
      { latitude: data.lat, longitude: data.lng },
      { latitude: newData.lat, longitude: newData.lng }
    );

    function anim() {
      let newLat = cdata.lat + deltaLat;
      let newLng = cdata.lng + deltaLng;

      cdata.lat = newLat;
      cdata.lng = newLng;

      if (step > 0) {
        requestAnimationFrame(anim);
        step--;
      }

      currentState(cdata, rotation);
    }
    requestAnimationFrame(anim);
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    let ref = firebase
      .database()
      .ref()
      .child("devices")
      .child(id);
    ref.on("child_added", data => {
      console.log("called 2");
      if (data.key === "geo") {
        let deviceData = data.val();
        this.setState({
          data: deviceData
        });
      }
    });
    ref.on("child_changed", data => {
      console.log("called 3");
      if (data.key === "geo") {
        let newData = data.val();
        this.animate(this.state.data, newData, this.changeState);
      }
    });
  }

  render() {
    return (
      <Map
        center={[this.state.initialData.lng, this.state.initialData.lat]}
        zoom={[16]}
        style="mapbox://styles/mapbox/streets-v9"
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
      >
        <MyMarker data={this.state.data} rotation={this.state.rotation} />
        <Layer type="symbol" id="marker" layout={{ "icon-image": "marker-15" }}>
          <Feature
            coordinates={[
              this.state.initialData.lng,
              this.state.initialData.lat
            ]}
          />
        </Layer>
      </Map>
    );
  }
}

const condition = authUser => authUser != null;

export default connect()(
  withAuthorization(condition)(withStyles(styles)(Location))
);
