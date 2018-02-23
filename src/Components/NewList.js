import React, { Component } from 'react';

class NewList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleChange = (event) => {
    this.setState({ value: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.newList(this.state.value)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          List Name:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default NewList;
