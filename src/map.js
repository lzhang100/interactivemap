import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import { Drawer } from 'antd';
import DirectionWindow from './components/directionWindow';
import DirectionsDisplay from './components/directionsDisplay';

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
  modalState,
  buildingsInfo
}) {
  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      options={{
        gestureHandling: 'greedy',
        styles: [
          {
            elementType: 'labels',
            featureType: 'poi.business',
            stylers: [{ visibility: 'off' }]
          }
        ]
      }}
    >
      <div>
        {mapPolygons.map(mapPolygon => (
          <div key={key++}> {mapPolygon} </div>
        ))}
      </div>

      <DirectionsDisplay
        visible={currentDirectionsState}
        origin={originState}
        destination={destState}
        travelMode={travelModeState}
        buildingsInfo={buildingsInfo}
      />

      <Drawer className="drawer"
      title={drawerInfos.name}
      placement="left"
      closable={true}
      onClose={closeDrawer}
      visible={currentDrawerState}
      >
        
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
        buildingsInfo={buildingsInfo}
        />

      </Drawer>
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
