import React from 'react';
import {DirectionsRenderer} from "react-google-maps";
import {message } from 'antd';


export default class DirectionsDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.renderer = React.createRef()
        this.state = {
          display: false, 
          directions: '',
        };
      }

    render(){
        return (
          this.props.visible && this.state.display) && <DirectionsRenderer directions={this.state.directions} panel={ document.getElementById('directionPanel') }/>
        }

    componentDidUpdate(prevProps) {
      if (this.props.origin !== prevProps.origin || this.props.destination !== prevProps.destination || this.props.travelMode !== prevProps.travelMode) {
        const DirectionsService = new google.maps.DirectionsService();
        var origin_info = this.props.buildingsInfo.filter(b => b.name === this.props.origin);
        var origin = ((origin_info.length === 0) ? this.props.origin : origin_info[0].center.lat.toString() + ', ' + origin_info[0].center.lng.toString());
        var dest_info = this.props.buildingsInfo.filter(b => b.name === this.props.destination);
        var dest = ((dest_info.length === 0) ? this.props.destination : dest_info[0].center.lat.toString() + ', ' + dest_info[0].center.lng.toString());
        DirectionsService.route({
          origin: {query: origin},
          destination: {query: dest},
          travelMode: this.props.travelMode,
        }, (response, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            this.setState({directions: response},);
            this.setState({display: true});
          } else {
            console.error(`error fetching directions ${response}`);
            this.setState({directions: null});
            this.setState({display: false});
            message.error('Error fetching directions, please enter correct destination/origin', 5);
          }
        });
    }
  }
}