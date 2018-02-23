import React, { Component } from 'react';

class NewListCard extends Component {
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
    this.props.newListCard(this.state.value)
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
          <input type="text" value={this.state.value} onChange={this.handleChange} placeholder="Add a new Card"/>
        <input type="submit" value="Submit" />
      </form>
    )
  }
}

export default NewListCard;
