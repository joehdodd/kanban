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
     return (
       <List title={list.title}/>
     )
    })
  }

  render() {
    const { title } = this.props.location.state;
    return (
      <div className="board-container">
        <span>{title}</span>
        <NewList newList={this.newList}/>
        {this.renderLists()}
      </div>
    )

  }
}

export default Board;
