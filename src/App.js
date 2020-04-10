import React, { Component } from 'react';
import { Layout, Menu, Icon, Button } from 'antd';
import { Polygon } from 'react-google-maps';
import axios from 'axios';
import './css/app.css';
import './css/navbar.css';
import './map';
import WrappedMap from './map';
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
          <Sider
            style={{
              overflow: 'auto',
              height: '100vh',
              left: 0
            }}
            breakpoint="md"
            theme='light'
            width='250'
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className='logo' />
            <Menu theme='light' defaultSelectedKeys={['1']} mode='inline'>
              <Menu.Item key='1'>
                <Icon type='menu' /><span>Explore Services</span>
              </Menu.Item>
              <SubMenu
                key='sub1'
                title={
                  <span>
                    <Icon type='bank' />
                    <span>Academic & Adminstrative </span>
                  </span>
                }
              >
                <Menu.Item key='2' onClick={() => this.clickService('Administration')}>
                  {' '}
                  Administration{' '}
                </Menu.Item>
                <Menu.Item key='3' onClick={() => this.clickService('Boccardo Business Center')}>
                  {' '}
                  Boccardo Business Center{' '}
                </Menu.Item>
                <Menu.Item key='4' onClick={() => this.clickService('Business Tower')}>
                  {' '}
                  Business Tower{' '}
                </Menu.Item>
                <Menu.Item key='5' onClick={() => this.clickService('Career Center')}>
                  {' '}
                  Career Center{' '}
                </Menu.Item>
                <Menu.Item key='6' onClick={() => this.clickService('Central Classroom Building')}>
                  {' '}
                  Central Classroom Building{' '}
                </Menu.Item>
                <Menu.Item key='7' onClick={() => this.clickService('Clark Hall')}>
                  {' '}
                  Clark Hall{' '}
                </Menu.Item>
                <Menu.Item key='8' onClick={() => this.clickService('Computer Center')}>
                  {' '}
                  Computer Center{' '}
                </Menu.Item>
                <Menu.Item
                  key='9'
                  onClick={() => this.clickService('Davidson College of Engineering')}
                >
                  {' '}
                  Davidson College of Engineering{' '}
                </Menu.Item>
                <Menu.Item key='10' onClick={() => this.clickService('Dudley Moorehead Hall')}>
                  {' '}
                  Dudley Moorehead Hall{' '}
                </Menu.Item>
                <Menu.Item key='11' onClick={() => this.clickService('Duncan Hall')}>
                  {' '}
                  Duncan Hall{' '}
                </Menu.Item>
                <Menu.Item key='12' onClick={() => this.clickService('Dwight Bentel Hall')}>
                  {' '}
                  Dwight Bentel Hall{' '}
                </Menu.Item>
                <Menu.Item key='13' onClick={() => this.clickService('Health Building')}>
                  {' '}
                  Health Building{' '}
                </Menu.Item>
                <Menu.Item key='14' onClick={() => this.clickService('Hugh Gillis Hall')}>
                  {' '}
                  Hugh Gillis Hall{' '}
                </Menu.Item>
                <Menu.Item
                  key='15'
                  onClick={() => this.clickService('Industrial Studies Building')}
                >
                  {' '}
                  Industrial Studies Building{' '}
                </Menu.Item>
                <Menu.Item
                  key='16'
                  onClick={() => this.clickService('Instructional Resource Center')}
                >
                  {' '}
                  Instructional Resource Center{' '}
                </Menu.Item>
                <Menu.Item key='17' onClick={() => this.clickService('MacQuarrie Hall')}>
                  {' '}
                  MacQuarrie Hall{' '}
                </Menu.Item>
                <Menu.Item key='18' onClick={() => this.clickService('Science Building')}>
                  {' '}
                  Science Building{' '}
                </Menu.Item>
                <Menu.Item key='19' onClick={() => this.clickService('Spartan Complex Central')}>
                  {' '}
                  Spartan Complex Central{' '}
                </Menu.Item>
                <Menu.Item key='20' onClick={() => this.clickService('Spartan Complex East')}>
                  {' '}
                  Spartan Complex East{' '}
                </Menu.Item>
                <Menu.Item key='21' onClick={() => this.clickService('Spartan Memorial')}>
                  {' '}
                  Spartan Memorial{' '}
                </Menu.Item>
                <Menu.Item key='22' onClick={() => this.clickService('Sweeney Hall')}>
                  {' '}
                  Sweeney Hall{' '}
                </Menu.Item>
                <Menu.Item key='23' onClick={() => this.clickService('Tower Hall')}>
                  {' '}
                  Tower Hall{' '}
                </Menu.Item>
                <Menu.Item key='24' onClick={() => this.clickService('Washington Square Building')}>
                  {' '}
                  Washington Square Building{' '}
                </Menu.Item>
                <Menu.Item key='25' onClick={() => this.clickService('Yoshihiro Uchida Hall')}>
                  {' '}
                  Yoshihiro Uchida Hall
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key='sub2'
                title={
                  <span>
                    <Icon type='audio' />
                    <span>Arts & Performance</span>
                  </span>
                }
              >
                <Menu.Item key='26' onClick={() => this.clickService('Event Center')}>
                  {' '}
                  Event Center{' '}
                </Menu.Item>
                <Menu.Item key='27' onClick={() => this.clickService('Music Building')}>
                  {' '}
                  Music Building{' '}
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key='sub3'
                title={
                  <span>
                    <Icon type='trophy' />
                    <span>Athletic & Recreation</span>
                  </span>
                }
              >
                <Menu.Item
                  key='28'
                  onClick={() => this.clickService('Spartan Recreation and Aquatic Center')}
                >
                  {' '}
                  Spartan Recreation and Aquatic Center{' '}
                </Menu.Item>
              </SubMenu>

              <SubMenu
                key='sub4'
                title={
                  <span>
                    <Icon type='wallet' />
                    <span>Dining</span>
                  </span>
                }
              >
                <Menu.Item key='29' onClick={() => this.clickService('Dining Commons')}>
                  {' '}
                  Dining Commons{' '}
                </Menu.Item>
                <Menu.Item key='30' onClick={() => this.clickService('Student Union')}>
                  {' '}
                  Student Union{' '}
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key='sub5'
                title={
                  <span>
                    <Icon type='alert' />
                    <span>Emergency Resources</span>
                  </span>
                }
              >
                <Menu.Item key='31' onClick={() => this.clickService('Student Wellness Center')}>
                  {' '}
                  Student Wellness Center{' '}
                </Menu.Item>
                <Menu.Item
                  key='32'
                  onClick={() => this.clickService('University Police Department')}
                >
                  {' '}
                  University Police Department{' '}
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key='sub6'
                title={
                  <span>
                    <Icon type='home' />
                    <span>Housing</span>
                  </span>
                }
              >
                <Menu.Item key='33' onClick={() => this.clickService('Campus Village 2')}>
                  {' '}
                  Campus Village 2{' '}
                </Menu.Item>
                <Menu.Item key='34' onClick={() => this.clickService('Campus Village A')}>
                  {' '}
                  Campus Village A{' '}
                </Menu.Item>
                <Menu.Item key='35' onClick={() => this.clickService('Campus Village B')}>
                  {' '}
                  Campus Village B{' '}
                </Menu.Item>
                <Menu.Item key='36' onClick={() => this.clickService('Campus Village C')}>
                  {' '}
                  Campus Village C{' '}
                </Menu.Item>
                <Menu.Item key='37' onClick={() => this.clickService('Joe West Housing')}>
                  {' '}
                  Joe West Housing{' '}
                </Menu.Item>
                <Menu.Item key='38' onClick={() => this.clickService('Washburn Hall')}>
                  {' '}
                  Washburn Hall{' '}
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key='sub7'
                title={
                  <span>
                    <Icon type='book' />
                    <span>Libraries</span>
                  </span>
                }
              >
                <Menu.Item
                  key='39'
                  onClick={() => this.clickService('Martin Luther King Jr. Library')}
                >
                  {' '}
                  Martin Luther King Jr. Library{' '}
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key='sub8'
                title={
                  <span>
                    <Icon type='car' />
                    <span>Parking</span>
                  </span>
                }
              >
                <Menu.Item key='40' onClick={() => this.clickService('North Parking Garage')}>
                  {' '}
                  North Parking Garage{' '}
                </Menu.Item>
                <Menu.Item key='41' onClick={() => this.clickService('South Parking Garage')}>
                  {' '}
                  South Parking Garage{' '}
                </Menu.Item>
                <Menu.Item key='42' onClick={() => this.clickService('West Parking Garage')}>
                  {' '}
                  West Parking Garage{' '}
                </Menu.Item>
              </SubMenu>
              <SubMenu
                key='sub9'
                title={
                  <span>
                    <Icon type='printer' />
                    <span>Printing</span>
                  </span>
                }
              >
                <Menu.Item key='43' onClick={() => this.clickService('Campus Village 2')}>
                  {' '}
                  Campus Village 2{' '}
                </Menu.Item>
                <Menu.Item key='44' onClick={() => this.clickService('Campus Village B')}>
                  {' '}
                  Campus Village B{' '}
                </Menu.Item>
                <Menu.Item key='45' onClick={() => this.clickService('Campus Village C')}>
                  {' '}
                  Campus Village C{' '}
                </Menu.Item>
                <Menu.Item key='46' onClick={() => this.clickService('Clark Hall')}>
                  {' '}
                  Clark Hall{' '}
                </Menu.Item>
                <Menu.Item
                  key='47'
                  onClick={() => this.clickService('Davidson College of Engineering')}
                >
                  {' '}
                  Davidson College of Engineering{' '}
                </Menu.Item>
                <Menu.Item key='48' onClick={() => this.clickService('Duncan Hall')}>
                  {' '}
                  Duncan Hall{' '}
                </Menu.Item>
                <Menu.Item
                  key='49'
                  onClick={() => this.clickService('Industrial Studies Building')}
                >
                  Industrial Studies Building{' '}
                </Menu.Item>
                <Menu.Item key='50' onClick={() => this.clickService('Joe West Housing')}>
                  {' '}
                  Joe West Housing{' '}
                </Menu.Item>
                <Menu.Item
                  key='51'
                  onClick={() => this.clickService('Martin Luther King Jr. Library')}
                >
                  {' '}
                  Martin Luther King Jr. Library{' '}
                </Menu.Item>
                <Menu.Item key='52' onClick={() => this.clickService('Science Building')}>
                  {' '}
                  Science Building{' '}
                </Menu.Item>
                <Menu.Item key='53' onClick={() => this.clickService('Student Union')}>
                  {' '}
                  Student Union{' '}
                </Menu.Item>
                <Menu.Item key='54' onClick={() => this.clickService('Sweeney Hall')}>
                  {' '}
                  Sweeney Hall{' '}
                </Menu.Item>
                <Menu.Item key='55' onClick={() => this.clickService('Washington Square Building')}>
                  {' '}
                  Washington Square Building{' '}
                </Menu.Item>
              </SubMenu>
            </Menu>
          </Sider>
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
              googleMapURL={`https://maps.googleapis.com/maps/api/<API KEY>`}
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
