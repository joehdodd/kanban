import React, { Component } from 'react';

class NewBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.newBoard(this.state.value);
  };

  render() {
    return (
      <form className="new-board-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          placeholder="Add a new Board"
        />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default NewBoard;
