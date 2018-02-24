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
      lists: [ { title: listInfo }, ...prevState.lists ]
    }))
  }

  renderLists = () => {
    const { lists } = this.state
    return lists.map(list => {
      let uniqueKey = Math.floor((1 + Math.random()) * 0x10000).toString();
      return (
        <List key={uniqueKey} title={list.title}/>
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
          {this.renderLists()}
          <div className="add-list-container">
            <NewList newList={this.newList}/>
          </div>
        </div>
      </div>
    )

  }
}

export default Board;
