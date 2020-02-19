import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';
import { Drawer } from 'antd';

let key = 0;

function Map({
  closeDrawer,
  openDrawer,
  currentDrawerState,
  mapPolygons,
  drawerInfos,
  center,
  zoom
}) {
  // console.log(center);
  // console.log(mapPolygons);
  // console.log(drawerInfos);
  // console.log(drawerInfos.img);
  // console.log(drawerInfos.services);
  console.log(center);
  console.log(zoom);
  return (
    <GoogleMap
      zoom={zoom}
      center={center}
      options={{
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

      <Drawer
        className='drawer'
        title={drawerInfos.desc}
        placement='left'
        closable={true}
        onClose={closeDrawer}
        visible={currentDrawerState}
      >
        {/* <h4>Charles W. Davidson College of Engineering</h4> */}
        {/* <img src={require(`${ drawerInfos.img }`)}></img> */}
        <p>{drawerInfos.desc}</p>
        {/* <div>
           {drawerInfos.services.map(service => <li key={key2++}> {service} </li>)}
       </div> */}
      </Drawer>
    </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;
