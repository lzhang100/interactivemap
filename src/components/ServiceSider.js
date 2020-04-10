import React from 'react';
import { Layout, Menu, Icon } from 'antd';
const {  Sider } = Layout;
const { SubMenu } = Menu;

export default class ServiceSider extends React.Component {
  render() {
    return(
      <Sider
      style={{
        overflow: 'auto',
        height: '100vh',
        left: 0
      }}
      breakpoint="md"
      theme='light'
      width='250'
      collapsible='true'

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
        <Icon type='bank' />
        <span>Academic & Adminstrative </span>
        </span>
      }
      >
      <Menu.Item key='2' onClick={() => this.props.clickService('Administration')}>
      {' '}
      Administration{' '}
      </Menu.Item>
      <Menu.Item key='3' onClick={() => this.props.clickService('Boccardo Business Center')}>
      {' '}
      Boccardo Business Center{' '}
      </Menu.Item>
      <Menu.Item key='4' onClick={() => this.props.clickService('Business Tower')}>
      {' '}
      Business Tower{' '}
      </Menu.Item>
      <Menu.Item key='5' onClick={() => this.props.clickService('Career Center')}>
      {' '}
      Career Center{' '}
      </Menu.Item>
      <Menu.Item key='6' onClick={() => this.props.clickService('Central Classroom Building')}>
      {' '}
      Central Classroom Building{' '}
      </Menu.Item>
      <Menu.Item key='7' onClick={() => this.props.clickService('Clark Hall')}>
      {' '}
      Clark Hall{' '}
      </Menu.Item>
      <Menu.Item key='8' onClick={() => this.props.clickService('Computer Center')}>
      {' '}
      Computer Center{' '}
      </Menu.Item>
      <Menu.Item
      key='9'
      onClick={() => this.props.clickService('Davidson College of Engineering')}
      >
      {' '}
      Davidson College of Engineering{' '}
      </Menu.Item>
      <Menu.Item key='10' onClick={() => this.props.clickService('Dudley Moorehead Hall')}>
      {' '}
      Dudley Moorehead Hall{' '}
      </Menu.Item>
      <Menu.Item key='11' onClick={() => this.props.clickService('Duncan Hall')}>
      {' '}
      Duncan Hall{' '}
      </Menu.Item>
      <Menu.Item key='12' onClick={() => this.props.clickService('Dwight Bentel Hall')}>
      {' '}
      Dwight Bentel Hall{' '}
      </Menu.Item>
      <Menu.Item key='13' onClick={() => this.props.clickService('Health Building')}>
      {' '}
      Health Building{' '}
      </Menu.Item>
      <Menu.Item key='14' onClick={() => this.props.clickService('Hugh Gillis Hall')}>
      {' '}
      Hugh Gillis Hall{' '}
      </Menu.Item>
      <Menu.Item
      key='15'
      onClick={() => this.props.clickService('Industrial Studies Building')}
      >
      {' '}
      Industrial Studies Building{' '}
      </Menu.Item>
      <Menu.Item
      key='16'
      onClick={() => this.props.clickService('Instructional Resource Center')}
      >
      {' '}
      Instructional Resource Center{' '}
      </Menu.Item>
      <Menu.Item key='17' onClick={() => this.props.clickService('MacQuarrie Hall')}>
      {' '}
      MacQuarrie Hall{' '}
      </Menu.Item>
      <Menu.Item key='18' onClick={() => this.props.clickService('Science Building')}>
      {' '}
      Science Building{' '}
      </Menu.Item>
      <Menu.Item key='19' onClick={() => this.props.clickService('Spartan Complex Central')}>
      {' '}
      Spartan Complex Central{' '}
      </Menu.Item>
      <Menu.Item key='20' onClick={() => this.props.clickService('Spartan Complex East')}>
      {' '}
      Spartan Complex East{' '}
      </Menu.Item>
      <Menu.Item key='21' onClick={() => this.props.clickService('Spartan Memorial')}>
      {' '}
      Spartan Memorial{' '}
      </Menu.Item>
      <Menu.Item key='22' onClick={() => this.props.clickService('Sweeney Hall')}>
      {' '}
      Sweeney Hall{' '}
      </Menu.Item>
      <Menu.Item key='23' onClick={() => this.props.clickService('Tower Hall')}>
      {' '}
      Tower Hall{' '}
      </Menu.Item>
      <Menu.Item key='24' onClick={() => this.props.clickService('Washington Square Building')}>
      {' '}
      Washington Square Building{' '}
      </Menu.Item>
      <Menu.Item key='25' onClick={() => this.props.clickService('Yoshihiro Uchida Hall')}>
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
      <Menu.Item key='26' onClick={() => this.props.clickService('Event Center')}>
      {' '}
      Event Center{' '}
      </Menu.Item>
      <Menu.Item key='27' onClick={() => this.props.clickService('Music Building')}>
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
      onClick={() => this.props.clickService('Spartan Recreation and Aquatic Center')}
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
      <Menu.Item key='29' onClick={() => this.props.clickService('Dining Commons')}>
      {' '}
      Dining Commons{' '}
      </Menu.Item>
      <Menu.Item key='30' onClick={() => this.props.clickService('Student Union')}>
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
      <Menu.Item key='31' onClick={() => this.props.clickService('Student Wellness Center')}>
      {' '}
      Student Wellness Center{' '}
      </Menu.Item>
      <Menu.Item
      key='32'
      onClick={() => this.props.clickService('University Police Department')}
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
      <Menu.Item key='33' onClick={() => this.props.clickService('Campus Village 2')}>
      {' '}
      Campus Village 2{' '}
      </Menu.Item>
      <Menu.Item key='34' onClick={() => this.props.clickService('Campus Village A')}>
      {' '}
      Campus Village A{' '}
      </Menu.Item>
      <Menu.Item key='35' onClick={() => this.props.clickService('Campus Village B')}>
      {' '}
      Campus Village B{' '}
      </Menu.Item>
      <Menu.Item key='36' onClick={() => this.props.clickService('Campus Village C')}>
      {' '}
      Campus Village C{' '}
      </Menu.Item>
      <Menu.Item key='37' onClick={() => this.props.clickService('Joe West Housing')}>
      {' '}
      Joe West Housing{' '}
      </Menu.Item>
      <Menu.Item key='38' onClick={() => this.props.clickService('Washburn Hall')}>
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
      onClick={() => this.props.clickService('Martin Luther King Jr. Library')}
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
      <Menu.Item key='40' onClick={() => this.props.clickService('North Parking Garage')}>
      {' '}
      North Parking Garage{' '}
      </Menu.Item>
      <Menu.Item key='41' onClick={() => this.props.clickService('South Parking Garage')}>
      {' '}
      South Parking Garage{' '}
      </Menu.Item>
      <Menu.Item key='42' onClick={() => this.props.clickService('West Parking Garage')}>
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
      <Menu.Item key='43' onClick={() => this.props.clickService('Campus Village 2')}>
      {' '}
      Campus Village 2{' '}
      </Menu.Item>
      <Menu.Item key='44' onClick={() => this.props.clickService('Campus Village B')}>
      {' '}
      Campus Village B{' '}
      </Menu.Item>
      <Menu.Item key='45' onClick={() => this.props.clickService('Campus Village C')}>
      {' '}
      Campus Village C{' '}
      </Menu.Item>
      <Menu.Item key='46' onClick={() => this.props.clickService('Clark Hall')}>
      {' '}
      Clark Hall{' '}
      </Menu.Item>
      <Menu.Item
      key='47'
      onClick={() => this.props.clickService('Davidson College of Engineering')}
      >
      {' '}
      Davidson College of Engineering{' '}
      </Menu.Item>
      <Menu.Item key='48' onClick={() => this.props.clickService('Duncan Hall')}>
      {' '}
      Duncan Hall{' '}
      </Menu.Item>
      <Menu.Item
      key='49'
      onClick={() => this.props.clickService('Industrial Studies Building')}
      >
      Industrial Studies Building{' '}
      </Menu.Item>
      <Menu.Item key='50' onClick={() => this.props.clickService('Joe West Housing')}>
      {' '}
      Joe West Housing{' '}
      </Menu.Item>
      <Menu.Item
      key='51'
      onClick={() => this.props.clickService('Martin Luther King Jr. Library')}
      >
      {' '}
      Martin Luther King Jr. Library{' '}
      </Menu.Item>
      <Menu.Item key='52' onClick={() => this.props.clickService('Science Building')}>
      {' '}
      Science Building{' '}
      </Menu.Item>
      <Menu.Item key='53' onClick={() => this.props.clickService('Student Union')}>
      {' '}
      Student Union{' '}
      </Menu.Item>
      <Menu.Item key='54' onClick={() => this.props.clickService('Sweeney Hall')}>
      {' '}
      Sweeney Hall{' '}
      </Menu.Item>
      <Menu.Item key='55' onClick={() => this.props.clickService('Washington Square Building')}>
      {' '}
      Washington Square Building{' '}
      </Menu.Item>
      </SubMenu>
      </Menu>
      </Sider>
    )
  }
}
