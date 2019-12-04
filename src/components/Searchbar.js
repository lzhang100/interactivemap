import React, { Component } from 'react';
import '../css/Searchbar.css';

export class Searchbar extends Component {
  state = {
    suggestions: [],
    text: ''
  };

  // function that is called whenever input changes
  onTextChanged = e => {
    const value = e.target.value;
    let suggestions = [];
    if (value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      suggestions = this.props.buildings
        .map(building => building.name)
        .sort()
        .filter(v => regex.test(v));
    }
    this.setState(() => ({ suggestions, text: value }));
  };

  renderSuggestions() {
    const { suggestions } = this.state;
    if (suggestions.length === 0) {
      return null;
    }
    return (
      <ul>
        {suggestions.map(building => (
          <li onClick={() => this.suggestionSelected(building)}>{building}</li>
        ))}
      </ul>
    );
  }

  suggestionSelected(value) {
    this.setState(() => ({ text: value, suggestions: [] }));
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
