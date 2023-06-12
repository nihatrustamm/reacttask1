import React, { Component } from "react";

class SearchPanel extends Component {
  state = {
    term: ""
  };

  onSearchChange = (e) => {
    const term = e.target.value;
    this.setState({ term });
    this.props.onSearchChange(term);
  };

  render() {
    const searchStyle = { fontSize: "20px" };
    const searchText = "Type here to search";
    return (
      <input
        className="form-control search-input"
        style={searchStyle}
        type="text"
        placeholder={searchText}
        value={this.state.term}
        onChange={this.onSearchChange}
      />
    );
  }
}

export default SearchPanel;
