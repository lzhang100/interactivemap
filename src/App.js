import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Polygon } from 'react-google-maps';
import axios from 'axios';
import './css/app.css';
import MapContainer from './map';
import Searchbar from './components/Searchbar.js';
// import WrappedMap from './map';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

let mapPolygons = [];
let buildingInfo = [];

class App extends Component {
  state = {
    collapsed: false,
    visible: false,
    polygon: [],
    info: [],
    center: { lat: 37.3352, lng: -121.8811 }
    // ops:{
    //   strokeColor: '#36688F',
    //   strokeOpacity: 0.8,
    //   strokeWeight: 3,
    //   fillColor: '#36688F',
    //   fillOpacity: 0.35
    // }
  };

  onCollapse = collapsed => {
    //console.log(collapsed);
    this.setState({ collapsed });
  };

  showDrawer = () => {
    this.setState({ visible: true });
  };
  onClose = () => {
    this.setState({ visible: false });
  };

  // changeColor=()=>{
  //   var ops;
  //   if (currentDrawerState == true){
  //     ops = {
  //         strokeColor: '#36688F',
  //         strokeOpacity: 0.8,
  //         strokeWeight: 3,
  //         fillColor: '#36688F',
  //         fillOpacity: 0.35
  //     }
  //   }
  //   else{
  //     ops = {
  //       strokeColor: '#36688F',
  //       strokeOpacity: 0.8,
  //       strokeWeight: 3,
  //       fillColor: 'green',
  //       fillOpacity: 0.35
  //   }
  // }

  handleMouseOver = idx => {
    console.log(mapPolygons[idx]);

    mapPolygons[idx].props.options = {
      strokeColor: '#ffbb00',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#ffbb00',
      fillOpacity: 0.35
    };
    this.setState({
      polygon: mapPolygons
    });
  };
  clickPolygon = name => {
    console.log(name);

    let polygonData = buildingInfo.filter(function(item) {
      //console.log("what's this", item.desc)
      return item.desc === name;
    });
    console.log(polygonData);
    console.log(polygonData[0]);

    this.setState({
      info: polygonData[0],
      visible: true
      // ops:{
      //     strokeColor: '#36688F',
      //     strokeOpacity: 0.8,
      //     strokeWeight: 3,
      //     fillColor: 'green',
      //     fillOpacity: 0.35
      // }

      // center: {lat: polygonData[0].center[0].lat, lng: polygonData[0].center[0].lng}
    });
  };

  clickService = name => {
    //let test = [];
    let polygonData = buildingInfo.filter(function(item) {
      //console.log(item.desc);
      return item.desc === name;
    });
    this.setState({
      info: polygonData[0],
      visible: true
      // center: {lat: polygonData[0].center[0].lat, lng: polygonData[0].center[0].lng}
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
            idx={i}
            paths={coords}
            options={{
              strokeColor: '#36688F',
              strokeOpacity: 0,
              strokeWeight: 3,
              fillColor: '#36688F',
              fillOpacity: 0
            }}
            //options={ops}
            onClick={this.clickPolygon.bind(this, buildingInfo[i].desc)}
            onMouseOver={this.handleMouseOver.bind(this, i)}
          />
        );
        coords = [];
      }
      this.setState({
        polygon: mapPolygons
      });
      // console.log(mapPolygons);
    });
  }

  render() {
    //return <div>I'M READY TO USE THE BACK END APIS! :-)</div>;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Header className='header'>
          <img
            src={require('./css/logo_sjsu.png')}
            style={{ width: '150px' }}
            alt='SJSU'
          ></img>
          <img
            src={require('./css/logo2_sjsu.png')}
            width='600px'
            alt='SJSU'
          ></img>
          <Searchbar />
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
                <span>Services</span>
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
              <a href={'https://www.sjsu.edu'} target={'_blank'}>
                {' '}
                SJSU Home |
              </a>
              <a href={'/'}> ICMap Home </a>
            </div>
            {/* <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>Bill is a cat.</div> */}
            <MapContainer />
            {/* <WrappedMap
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=<API_KEy_HERE>`}
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `100%` }} />}
              mapElement={<div style={{ height: `100%` }} />}
              closeDrawer={this.onClose}
              openDrawer={this.showDrawer}
              currentDrawerState={this.state.visible}
              mapPolygons={this.state.polygon}
              center={this.state.center}
              drawerInfos={this.state.info}
            /> */}
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
