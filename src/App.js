import React, { Component } from 'react';
import { Layout, Button } from 'antd';
import { Polygon } from 'react-google-maps';
import axios from 'axios';
import './css/app.css';
import './css/navbar.css';
import './map';
import WrappedMap from './map';
import Searchbar from './components/Searchbar.js';
import ServiceSider from './components/ServiceSider.js'

const { Header, Content, Footer } = Layout;

let mapPolygons = [];
let buildingInfo = [];
let hoverTimeout;

class App extends Component {
  constructor(props) {
    super(props);
    this.handleSearchClick = this.handleSearchClick.bind(this);
  }

  state = {
    collapsed: false,
    visible: false,
    showDirections: false,
    originState: '',
    destState: '',
    travelModeState: '',
    modalState: false,
    polygon: [],
    info: { img: './css/engbuilding1.jpg' },
    center: { lat: 37.3352, lng: -121.8811 },
    zoom: 16.5,
    clickedPolygonIndex: -1
  };

  handleSearchClick(building_coords) {
    this.setState({ center: building_coords, zoom: 18.5 });
  }

  onCollapse = collapsed => {
    //console.log(collapsed);
    this.setState({ collapsed });
  };

  showDrawer = () => {
    this.setState({ visible: true });
  };

  onClose = () => {
    mapPolygons[this.state.clickedPolygonIndex].props.options.fillColor = '#36688F';

    this.setState({
      visible: false,
      polygon: mapPolygons
    });
  };

  showModal = () => {
    // console.log('change to showModal');
    this.setState({ modalState: true });
  };

  hideModal = () => {
    // console.log('change to hideModal');
    this.setState({ modalState: false });
  };

  showDirections = () => {
    // console.log('change to showDirections');
    this.setState({ showDirections: true });
  };

  hideDirections = () => {
    // console.log('change to hideDirections');
    this.setState({ showDirections: false });
  };

  setDirections = (origin, dest, travelMode) => {
    this.setState({ originState: origin });
    this.setState({ destState: dest });
    this.setState({ travelModeState: travelMode });
  };

  hoverOverPolygon(name) {
    clearTimeout(hoverTimeout);
    hoverTimeout = setTimeout(() => {
      let polygonIndex;
      for (var i = 0; i < buildingInfo.length; i++) {
        if (buildingInfo[i].name === name) {
          //console.log(mapPolygonsData[i].name);
          polygonIndex = i;
          break;
        }
      }

      mapPolygons[polygonIndex].props.options.fillColor = '#FF0000';

      this.setState({
        polygon: mapPolygons
      });
    }, 100);
  }

  hoverLeavePolygon(name) {
    clearTimeout(hoverTimeout);
    let polygonIndex;

    for (var i = 0; i < buildingInfo.length; i++) {
      if (buildingInfo[i].name === name) {
        polygonIndex = i;
        break;
      }
    }
    mapPolygons[polygonIndex].props.options.fillColor = '#36688F';

    this.setState({
      polygon: mapPolygons
    });
  }

  clickPolygon = name => {
    clearTimeout(hoverTimeout);
    let polygonIndex;
    let polygonData = buildingInfo.filter(function(item) {
      return item.name === name;
    });

    for (var i = 0; i < buildingInfo.length; i++) {
      if (buildingInfo[i].name === name) {
        polygonIndex = i;
        break;
      }
    }

    mapPolygons[polygonIndex].props.options.fillColor = '#FF0000';
    this.setState({
      info: polygonData[0],
      polygon: mapPolygons,
      visible: true,
      clickedPolygonIndex: polygonIndex,
      currHovering: true
    });
  };

  clickService = name => {
    clearTimeout(hoverTimeout);
    let polygonIndex;
    let polygonData = buildingInfo.filter(function(item) {
      return item.name === name;
    });

    for (var i = 0; i < buildingInfo.length; i++) {
      if (buildingInfo[i].name === name) {
        polygonIndex = i;
        break;
      }
    }
    mapPolygons[polygonIndex].props.options.fillColor = '#FF0000';
    this.setState({
      info: polygonData[0],
      polygon: mapPolygons,
      visible: true,
      clickedPolygonIndex: polygonIndex,
      center: { lat: polygonData[0].center.lat, lng: polygonData[0].center.lng },
      zoom: 18.5
    });
  };

  /*Add sample info to make sure the drawer has some information from the start
  Grab all the polygons json objects and store in mapPolygonData
  Create the polygons and store in mapPolygonsData
  clickPolygon is passed the name of the building that was clicked. Set states with info for the drawer, center the map with polygon, and make the drawer visible
  clickPolygon is passed the name of the building that was clicked and center the map with polygon

  */
  componentDidMount() {
    axios.get('http://www.localhost:4000/polygons').then(res => {
      res.data.forEach(building => {
        if ((building.outer !== undefined) & (building.inner !== undefined)) {
          buildingInfo.push(building);
        }
      });
      // });

      var coords = [];
      for (var i = 0; i < buildingInfo.length; i++) {
        coords.push(buildingInfo[i].outer);
        coords.push(buildingInfo[i].inner);

        mapPolygons.push(
          <Polygon
            paths={coords}
            options={{
              strokeColor: '#36688F',
              strokeOpacity: 0,
              strokeWeight: 0,
              fillColor: '#36688F',
              fillOpacity: 0.38
            }}
            onMouseOut={this.hoverLeavePolygon.bind(this, buildingInfo[i].name)}
            onMouseMove={this.hoverOverPolygon.bind(this, buildingInfo[i].name)}
            onClick={this.clickPolygon.bind(this, buildingInfo[i].name)}
          />
        );
        coords = [];
      }
      this.setState({
        polygon: mapPolygons
      });
    });
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className='header'>
          <div className='toolbarNavigation'>
            <div className='toolbarLeftHalf'>
              <div className='toolbarLogo'>
                <img src={require('./css/sjsuLogo.png')} style={{ width: 'auto' }} alt='SJSU'></img>
              </div>
              <div className='projectTitle'>
                <h1>San José State University</h1>
                <h2>Interactive Campus Map</h2>
              </div>
            </div>
            <div className='toolbarRightHalf'>
              <div className='autoCompleteText'>
                <Searchbar
                  center={this.state.center}
                  onSearchClicked={this.handleSearchClick}
                  clickPolygon={this.clickPolygon}
                  buildings={buildingInfo}
                />
              </div>
            </div>
          </div>
        </Header>
        <Layout>
          <ServiceSider clickService={this.clickService}/>
          <Content style={{ margin: '0 16px' }}>
            <div className='links'>
              <a href={'https://www.sjsu.edu'} target={'_blank'} rel='noopener noreferrer'>
                {' '}
                SJSU Home |
              </a>
              <a href={'/'}> ICMap Home </a>
              {this.state.showDirections && (
                <Button type='link' icon='info-circle' onClick={this.showModal}>
                  {' '}
                  Directions Details{' '}
                </Button>
              )}
            </div>
            {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div> */}
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              closeDrawer={this.onClose}
              openDrawer={this.showDrawer}
              currentDrawerState={this.state.visible}
              currentDirectionsState={this.state.showDirections}
              showDirections={this.showDirections}
              hideDirections={this.hideDirections}
              originState={this.state.originState}
              destState={this.state.destState}
              travelModeState={this.state.travelModeState}
              setDirections={this.setDirections}
              showModal={this.showModal}
              hideModal={this.hideModal}
              modalState={this.state.modalState}
              mapPolygons={this.state.polygon}
              center={this.state.center}
              drawerInfos={this.state.info}
              zoom={this.state.zoom}
              buildingsInfo={buildingInfo}
            />
          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          SJSU Interactive Campus Map ©2019 Created by ICMap
        </Footer>
      </Layout>
    );
  }
}

export default App;
