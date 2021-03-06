import React, { Component } from 'react';

class NewListCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      renderForm: false
    };
  }

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { listId, boardId } = this.props;
    this.props.newCard(this.state.value, boardId, listId);
  };

  renderForm = () => {
    this.setState(prevState => ({ renderForm: !prevState.renderForm }));
  };

  render() {
    const { renderForm } = this.state;
    return (
      <span className="list-card-add-container">
        {!renderForm && (
          <span onClick={() => this.renderForm()}>Add a new card</span>
        )}
        {!!renderForm && (
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
              placeholder="Add a new Card"
            />
            <span onClick={() => this.renderForm()}>X</span>
          </form>
        )}
      </span>
    );
  }
}

export default NewListCard;
