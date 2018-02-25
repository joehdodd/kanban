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

  newList = listInfo => {
    this.setState(prevState => ({
      lists: [...prevState.lists, { title: listInfo }]
    }));
  };

  renderLists = () => {
    const { lists } = this.props.location.state;
    console.log(lists);
    return lists.map((list, index) => {
      return (
        <List
          key={`list_${list.title}`}
          index={index}
          title={list.title}
          newCard={this.props.newCard}
          cards={list.cards}
        />
      );
    });
  };

  render() {
    const { title, lists } = this.props.location.state;
    return (
      <div className="board">
        <div className="board-info-wrapper">
          <span style={{color: 'aliceblue'}}>{title}</span>
        </div>
        <div className="lists-wrapper">
          {!!lists &&
            !!lists.length &&
            this.renderLists()}
          <div className="add-list-container">
            <NewList newList={this.newList} />
          </div>
        </div>
      </div>
    );
  }
}

export default Board;
