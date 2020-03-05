import React from "react";
import {GoogleMap, withScriptjs, withGoogleMap} from "react-google-maps";
import {Drawer} from 'antd';
import DirectionWindow from "./components/directionWindow";
import DirectionsDisplay from './components/directionsDisplay'
// const { compose, withProps, lifecycle } = require("recompose");
// import { compose, withProps, lifecycle } from "recompose"

let key = 0;

function Map({
  closeDrawer, 
  currentDrawerState, 
  mapPolygons, 
  drawerInfos, 
  center, 
  zoom,
  currentDirectionsState, 
  showDirections, 
  hideDirections, 
  originState, 
  destState, 
  travelModeState, 
  setDirections, 
  showModal, 
  hideModal, 
  modalState}){
  //console.log(center);
  //console.log(zoom);
  //console.log(drawerInfos);
  //console.log(mapPolygons)
  //console.log(drawerInfos)
  //console.log(drawerInfos.img);
  //console.log(drawerInfos.services)

  return(
    <GoogleMap
      /* defaultZoom={16.5}
      defaultCenter={center} */
      zoom={zoom}
      center={center}
      options={{ 
        styles: [
          { 
            elementType: "labels", 
            featureType: "poi.business", 
            stylers: [{ visibility: "off", }], 
          }
        ], 
      }}
      >

      <div>
           {mapPolygons.map(mapPolygon => <div key={key++}> {mapPolygon} </div>)}
      </div>

      <DirectionsDisplay 
        visible={currentDirectionsState} 
        origin={originState} 
        destination={destState} 
        travelMode={travelModeState} />

      <Drawer className="drawer"
      title={drawerInfos.name}
      placement="left"
      closable={true}
      onClose={closeDrawer}
      visible={currentDrawerState}
      >
        
      {/* <h4>Charles W. Davidson College of Engineering</h4> */}
      {/* eslint-disable-next-line */}
      <img src={require(`${drawerInfos.img}`)}></img>
      <p>About {drawerInfos.name}:</p>
      <p>{drawerInfos["building desc"]}</p>
      {/* <p>Service Description:</p> */}
      <p>{drawerInfos["service desc"]}</p>

      <DirectionWindow 
        showDirections={showDirections} 
        hideDirections={hideDirections} 
        closeDrawer={closeDrawer} 
        setDirections={setDirections} 
        showModal={showModal} 
        hideModal={hideModal} 
        modalState={modalState}
        initialDest={drawerInfos.name}
        />
      {/* <div>
           {drawerInfos.services.map(service => <li key={key2++}> {service} </li>)}
       </div> */}
    </Drawer>
    </GoogleMap>
  )
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
