import React, { Component } from 'react';
import '../css/Searchbar.css';

import buildingsJSON from '../buildings.json';

export class Searchbar extends Component {
  constructor(props) {
    super(props);
    this.buildings = buildingsJSON;
    this.state = {
      suggestions: [],
      text: ''
    };
    this.handleClick = this.handleClick.bind(this);
  }

  // function that is called whenever input changes
  onTextChanged = e => {
    const value = e.target.value;
    let suggestions = [];

    //user typed a acronymn
    if (this.buildings.filter(b => b.acro === value).length > 0) {
      suggestions = [this.buildings.filter(b => b.acro === value)[0].desc];
      this.setState(() => ({ suggestions, text: value }));
      return;
    }

    if (value.length > 0) {
      const regex = new RegExp([value], 'i');
      suggestions = this.buildings
        .map(b => b.desc)
        .sort()
        .filter(v => regex.test(v));
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  handleClick(building) {
    const center = this.buildings.filter(b => b.desc === building)[0].center;
    this.setState(() => ({ text: building, suggestions: [] }));
    this.props.onSearchClicked(center);
    this.props.clickPolygon(building);
  }

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map((building, idx) => (
          <li key={idx} onClick={() => this.handleClick(building)}>
            {building}
          </li>
        ))}
      </ul>
    );
  }

  render() {
    const { text } = this.state;
    return (
      <div className='autoCompleteText'>
        <input
          value={text}
          onChange={this.onTextChanged}
          placeholder='Search...'
          type='text'
        />
        {this.renderSuggestions()}
      </div>
    );
  }
}

export default Searchbar;
