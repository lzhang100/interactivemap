import React from "react";
import {GoogleMap, withScriptjs, withGoogleMap, Polygon} from "react-google-maps";
import {Drawer} from 'antd';
import DirectionWindow from "./directionWindow";
import DirectionsDisplay from './directionsDisplay'
// const { compose, withProps, lifecycle } = require("recompose");
// import { compose, withProps, lifecycle } from "recompose"

function Map({closeDrawer, openDrawer, currentDrawerState, currentDirectionsState, showDirections, hideDirections, originState, destState, travelModeState, setDirections}){
  // console.log('currentDirectionsState',{currentDirectionsState});
  var engBuildingCoords =[
    {lat: 37.3377, lng: -121.8815},
    {lat: 37.3372, lng: -121.8825},
    {lat: 37.3363, lng: -121.8819},
    {lat: 37.3368, lng: -121.8809},
  ];
  return(
    <GoogleMap
      defaultZoom={16.5}
      defaultCenter={{lat: 37.3352, lng: -121.8811}}
      // center={{lat: 37.272040, lng: -121.861260}}
      options={{ styles: [{ elementType: "labels", featureType: "poi.business", stylers: [{ visibility: "off", }], }], }}
      >
      <Polygon
        paths= {engBuildingCoords}
        options={{ 
          strokeColor: '#36688F',
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: '#36688F',
          fillOpacity: 0.35 
        }}
        onClick={openDrawer}
      />
      <DirectionsDisplay visible={currentDirectionsState} origin={originState} destination={destState} travelMode={travelModeState}/>
      <Drawer className="drawer"
      title="Charles W. Davidson College of Engineering"
      placement="left"
      closable={true}
      onClose={closeDrawer}
      visible={currentDrawerState}
      >
        {/* <h4>Charles W. Davidson College of Engineering</h4> */}
        <img src={require('./css/engbuilding1.jpg')} alt= "Charles W. Davidson College of Engineering"></img>
        <p>The Charles W. Davidson College of Engineering Building houses many of the departments of the engineering programs at SJSU, including:
          Aerospace Engineering
          Biomedical, Chemical and Materials Engineering
          Civil and Environmental Engineering
          Computer Engineering
          Dean's Office
          Electrical Engineering
          General Engineering
          Industrial and Systems Engineering
          Mechanical Engineering
          Extended Studies</p>
        <DirectionWindow showDirections={showDirections} hideDirections={hideDirections} closeDrawer={closeDrawer} setDirections={setDirections}/>
    </Drawer>
    </GoogleMap>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
