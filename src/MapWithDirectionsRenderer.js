/*global google*/
import React from "react";
import './css/app.css';
import './map';

// import WrappedMap from "./map";

//const { Layout, Menu, Breadcrumb, Icon } = antd;

const { compose, withProps, lifecycle } = require("recompose");
const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
} = require("react-google-maps");

const MapWithDirectionsRenderer = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyAMfYya8nMS02owOTeCWc5o-Z38v9spo9g",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();
      console.log('send message');
      DirectionsService.route({
        origin: new google.maps.LatLng(37.336236, -121.881530),
        destination: new google.maps.LatLng(37.3355, -121.8850),
        travelMode: google.maps.TravelMode.WALKING,
      }, (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
        } else {
          console.error(`error fetching directions ${result}`);
        }
      });
    }
  })
)(props =>
  <GoogleMap
    defaultZoom={17}
    defaultCenter={new google.maps.LatLng(37.3352, -121.8811)}
  >
    {props.directions && <DirectionsRenderer directions={props.directions} />}
    panel={document.getElementById('panel')} />}
  </GoogleMap>
);

export default MapWithDirectionsRenderer