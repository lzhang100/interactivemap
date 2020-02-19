import React, { Component } from "react";
import { Layout, Menu, Icon, Button } from "antd";
import { Polygon } from "react-google-maps";
import axios from "axios";
import './css/app.css';
import './css/navbar.css';
import './map';
import WrappedMap from "./map";
import Searchbar from './components/Searchbar.js';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

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
    info: [],
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
    mapPolygons[this.state.clickedPolygonIndex].props.options.fillColor = "#36688F"

    this.setState({
      visible: false,
      polygon: mapPolygons
    });
  };

  showModal = () => {
    console.log('change to showModal')
    this.setState({ modalState: true });
  };

  hideModal = () => {
    console.log('change to hideModal')
    this.setState({ modalState: false });
  };

  showDirections = () => {
    console.log('change to showDirections')
    this.setState({ showDirections: true });
  };

  hideDirections = () => {
    console.log('change to hideDirections')
    this.setState({ showDirections: false });
  };

  setDirections = (origin, dest, travelMode) => {
    // console.log('original directions')
    // console.log(this.state.originState)
    // console.log(this.state.destState)
    // console.log('passed in origin:', origin)
    // console.log('passed in dest:', typeof dest, dest)
    this.setState({ originState: origin });
    this.setState({ destState: dest });
    this.setState({ travelModeState: travelMode });
    // console.log('new directions')
    // console.log(this.state.originState)
    // console.log(this.state.destState)
  };

  hoverOverPolygon(name) {
    clearTimeout(hoverTimeout);
    // console.log("hover")
    hoverTimeout = setTimeout(() => {
      let polygonIndex;
      for (var i = 0; i < buildingInfo.length; i++) {
        if (buildingInfo[i].desc === name) {
          //console.log(mapPolygonsData[i].name);
          polygonIndex = i;
          break;
        }
      }

      mapPolygons[polygonIndex].props.options.fillColor = "#FF0000";

      this.setState({
        polygon: mapPolygons
      });
    }, 100);
  }

  hoverLeavePolygon(name) {
    clearTimeout(hoverTimeout);
    // console.log("leaving");
    //console.log(name);
    let polygonIndex;

    for (var i = 0; i < buildingInfo.length; i++) {
      if (buildingInfo[i].desc === name) {
        polygonIndex = i;
        break;
      }
    }
    mapPolygons[polygonIndex].props.options.fillColor = "#36688F";

    this.setState({
      polygon: mapPolygons
    });
  }

  clickPolygon = (name) => {
    console.log(name);
    console.log(mapPolygons);
    clearTimeout(hoverTimeout);
    let polygonIndex;
    let polygonData = buildingInfo.filter(function (item) {
      return item.desc === name;
    })

    for (var i = 0; i < buildingInfo.length; i++) {
      if (buildingInfo[i].desc === name) {
        polygonIndex = i;
        break;
      }
    }
    mapPolygons[polygonIndex].props.options.fillColor = "#FF0000";
    this.setState({
      info: polygonData[0],
      polygon: mapPolygons,
      visible: true,
      clickedPolygonIndex: polygonIndex,
      // center: {lat: polygonData[0].center[0].lat, lng: polygonData[0].center[0].lng}
    });
  }

  clickService = (name) => {
    this.clickPolygon(name);
    // this.setState({
    //   info: polygonData[0],
    //   polygon: mapPolygons,
    //   visible: true,
    //   //polygon: mapPolygons,
    //   // center: {lat: polygonData[0].center[0].lat, lng: polygonData[0].center[0].lng}
    // })

  }
  /*Add sample info to make sure the drawer has some information from the start
  Grab all the polygons json objects and store in mapPolygonData
  Create the polygons and store in mapPolygonsData
  clickPolygon is passed the name of the building that was clicked. Set states with info for the drawer, center the map with polygon, and make the drawer visible
  clickPolygon is passed the name of the building that was clicked and center the map with polygon

  */
  componentDidMount() {
    axios.get('http://www.localhost:4000/polygons').then(res => {
      // console.log(res.data);

      res.data.forEach(building => {
        Object.entries(building).forEach(([key, value]) => {
          if ((value.outer !== undefined) & (value.inner !== undefined)) {
            buildingInfo.push(value);
          }
        });
      });

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
            onMouseOut={this.hoverLeavePolygon.bind(this, buildingInfo[i].desc)}
            onMouseMove={this.hoverOverPolygon.bind(this, buildingInfo[i].desc)}
            onClick={this.clickPolygon.bind(this, buildingInfo[i].desc)}
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
          {/* <img
            src={require('./css/logo_sjsu.png')}
            style={{ width: '150px' }}
            alt='SJSU'
          ></img>
          <img src={require('./css/logo2_sjsu.png')} alt='SJSU'></img>
          <Searchbar /> */}
          <div className='toolbarNavigation'>
            <div className='toolbarLeftHalf'>
              <div className='toolbarLogo'>
                <img src={require('./css/logo_sjsu.png')} /*style={{ width: '120px', height: '120px' }}*/ alt="SJSU"></img>
              </div>
              <div className='projectTitle'>
                <img src={require('./css/logo2_sjsu.png')} /*style={{ width: '400px', height: '100px' }}*/ alt="SJSU"></img>
              </div>
            </div>
            <div className='toolbarRightHalf'>
              <div className='autoCompleteText'>
                <Searchbar
                  center={this.state.center}
                  onSearchClicked={this.handleSearchClick}
                />
              </div>
            </div>
          </div>
        </Header>
        <Layout>
          <Sider
            theme='light'
            width='250'
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className='logo' />
            <Menu theme='light' defaultSelectedKeys={['1']} mode='inline'>
              <Menu.Item key='1'>
                <span>Explore Services</span>
              </Menu.Item>
              <SubMenu
                key='sub1'
                title={
                  <span>
                    <Icon type='car' />
                    <span>Parking</span>
                  </span>
                }
              >
                <Menu.Item
                  key='2'
                  onClick={() => this.clickService('North Parking Garage')}
                >
                  North Parking Garage
                </Menu.Item>
                <Menu.Item
                  key='3'
                  onClick={() => this.clickService('South Parking Garage')}
                >
                  South Parking Garage
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key='sub2'
                title={
                  <span>
                    <Icon type='wallet' />
                    <span>Food & Drinks</span>
                  </span>
                }
              >
                <Menu.Item
                  key='4'
                  onClick={() => this.clickService('Student Union')}
                >
                  {' '}
                  Student Union
                </Menu.Item>
                {/* <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item> */}
              </SubMenu>
              <SubMenu
                key='sub3'
                title={
                  <span>
                    <Icon type='printer' />
                    <span>Printers</span>
                  </span>
                }
              ></SubMenu>
            </Menu>
          </Sider>
          <Content style={{ margin: '0 16px' }}>
            <div className='links'>
              <a href={"https://www.sjsu.edu"} target={"_blank"} rel="noopener noreferrer"> SJSU Home |</a>
              <a href={'/'}> ICMap Home </a>
              {this.state.showDirections && <Button type='link' icon="info-circle" onClick={this.showModal}> Directions Details </Button>}
            </div>
            {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div> */}
            <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=AIzaSyAMfYya8nMS02owOTeCWc5o-Z38v9spo9g`}
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
            />
            <Footer style={{ textAlign: 'center' }}>
              SJSU Interactive Campus Map ©2019 Created by ICMap
            </Footer>
          </Content>
          {/* <Footer style={{ textAlign: 'center' }}>SJSU Interactive Campus Map ©2019 Created by ICMap</Footer> */}
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          SJSU Interactive Campus Map ©2019 Created by ICMap
        </Footer>
      </Layout>
      //   <Footer style={{ textAlign: 'center' }}>SJSU Interactive Campus Map ©2019 Created by ICMap</Footer>

      // </Layout>
    );
  }
}

export default App;
