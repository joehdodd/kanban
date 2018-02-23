import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import StickyToolbar from './StickyToolbar';
import BoardsHome from './BoardsHome';
import Board from './Board';
import '../App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: []
    };
  }

  newBoard = (boardInfo) => {
    console.log(boardInfo);
    this.setState(prevState => ({
      boards: [ { title: boardInfo }, ...prevState.boards ]
    }))
  }

  render() {
    return (
      <div>
        <StickyToolbar newBoard={this.newBoard}/>
        <Route
          exact
          path='/'
          render={props => (
            <BoardsHome {...props} boards={this.state.boards}/>
          )}
        />
        <Route
          exact
          path='/:boardId'
          render={props => (
            <Board {...props}/>
          )}
        />
      </div>
    );
  }
}

export default App;
