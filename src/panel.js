import React from 'react';
import 'antd/dist/antd.css';
import './css/app.css'
import {Modal, Button} from "antd";

export default class Panel extends React.Component {
  state = {
    visible: false,
    showButton: true
};

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  handleCancel = e => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  render() {
    const showButton = this.state.showButton;
    let button;

    if (showButton) {
      button = <Button icon="info-circle" onClick={this.showModal}/>
    }

    return (
      <div>
        {button}
        <Modal
          title="Directions Details"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
        <div id="panel"></div>
        </Modal>
      </div>
    );
  }
}
