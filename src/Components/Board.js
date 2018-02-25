import React, { Component } from 'react';
import NewList from './NewList';
import List from './List';

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }

  newList = (listInfo) => {
    this.setState(prevState => ({
      lists: [ ...prevState.lists, { title: listInfo }  ]
    }))
  }

  renderLists = () => {
    const { lists } = this.state;
    return lists.map((list, index) => {
      return (
        <List key={`list_${list.title}`} index={index} title={list.title} newCard={this.props.newCard}/>
      )
    })
  }

  render() {
    const { title } = this.props.location.state;
    return (
      <div className="board">
        <div className="board-info-wrapper">
          <span>{title}</span>
        </div>
        <div className="lists-wrapper">
          { !!this.state.lists && !!this.state.lists.length &&
            this.renderLists()
          }
          <div className="add-list-container">
            <NewList newList={this.newList}/>
          </div>
        </div>
      </div>
    )

  }
}

export default Board;
