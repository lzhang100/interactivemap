import React from 'react';
import 'antd/dist/antd.css';
import '../css/app.css'
import { Button, Icon, Modal, Form, Radio, Row, Col, AutoComplete} from 'antd';
import {message } from 'antd';

const DirectionCreateForm = Form.create({ name: 'form_in_modal' })(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.options = this.props.buildingsInfo.map(b => b.name);
      this.state = {
        origin: '',
        destination: '',
      };
    }

    handleClick = () =>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          var currLoc = pos.lat + ', ' + pos.lng
          this.props.form.setFieldsValue({
            origin: currLoc,
          });
          document.getElementById('currLoc').innerHTML = 'Current Location（Latitude, Longitude）'
        }.bind(this), function() {
          message.error('Error: The Geolocation service failed.', 5);
        });
      } else {
        // Browser doesn't support Geolocation
        message.error('Error: Your browser doesn\'t support geolocation.', 5);
      }
    }

    render() {
      const { visible, onCancel, onCreate, onClear, form, initialDest} = this.props;
      const { getFieldDecorator } = form;
      return (
        <Modal
          visible={visible}
          title="Get Directions"
          onCancel={onCancel}
          footer={null}
          closeIcon={
            <Icon type="fullscreen-exit" />
          }
        >
          <Form layout="vertical">
            <Form.Item label="From">
              <Row gutter={3}>
              <Col span={24}>
                {getFieldDecorator('origin', {
                  rules: [{ required: true, message: 'Please input origin!' }],
                })(
                  <AutoComplete
                    dataSource={this.options}
                    placeholder="Please input origin here"
                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                  />
                  )}
              </Col>
              {/* <Col span={2}> */}
                {/* <Button icon="environment" onClick={this.handleClick}> */}
                  {/* Get current location */}
                {/* </Button> */}
              {/* </Col> */}
            </Row>
            <div id = 'currLoc'></div>
            </Form.Item>
            <Form.Item label="To">
              {getFieldDecorator('destination',{
                rules: [{ required: true, message: 'Please input the destination!' }],
                initialValue: initialDest,
              })(
                <AutoComplete
                    dataSource={this.options}
                    placeholder="Please input origin here"
                    filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                  />
                )}
            </Form.Item>
            <Form.Item label="Travel Mode">
              {getFieldDecorator('travelMode', {
                initialValue: 'WALKING',
              })(
                <Radio.Group buttonStyle="solid">
                  <Radio.Button value="DRIVING">Driving</Radio.Button>
                  <Radio.Button value="TRANSIT">Transit</Radio.Button>
                  <Radio.Button value="WALKING">Walking</Radio.Button>
                </Radio.Group>,
              )}
            </Form.Item>
          </Form>
          <Row justify="center">
            <Col xs={24} md={8} lg={8} >
              <Button key='onclear' type="danger" onClick={onClear}>Clear Directions</Button>
            </Col>
            <Col xs={24} md={8} lg={8}>
              <Button key='oncreate'type="primary" onClick={onCreate}>Get Directions</Button>
            </Col>
            <Col xs={24} md={8} lg={8}>
              <Button key='onexit' type="default" icon="fullscreen-exit" onClick={onCancel}>Return To Map</Button>
            </Col>
          </Row>
          <div id='directionPanel'></div>
        </Modal>
      );
    }
  },
);

export default class DirectionWindow extends React.Component {
  handleCancel = () => {
    this.props.hideModal();
  };

  handleClear = () => {
    const { form } = this.formRef.props;
    form.resetFields();
    document.getElementById('directionPanel').innerHTML = "";
    document.getElementById('currLoc').innerHTML = "";
    this.props.hideDirections();
    this.props.hideModal();
    this.props.closeDrawer();
  };

  handleCreate = () => {
    const { form } = this.formRef.props;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.showDirections();
      this.props.closeDrawer();
      this.props.setDirections(values.origin, values.destination, values.travelMode)
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    return (
      <div>
        <Button type="primary" onClick={this.props.showModal}>
          Get Directions
        </Button>
        <DirectionCreateForm
          wrappedComponentRef={this.saveFormRef}
          visible={this.props.modalState}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
          onClear={this.handleClear}
          initialDest={this.props.initialDest}
          buildingsInfo={this.props.buildingsInfo}
        />
      </div>
    );
  }
}