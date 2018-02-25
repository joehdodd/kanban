import React, { Component } from "react";
import { Route } from "react-router-dom";
import StickyToolbar from "./StickyToolbar";
import BoardsHome from "./BoardsHome";
import Board from "./Board";
import "../App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: [
        {
          title: 'Home',
          lists: [
            {
              title: 'To Do',
              cards: [
                { title: 'Finish this project.'},
                { title: 'Start that project.'}
              ]
            },
            {
              title: 'Doing',
              cards: []
            },
            {
              title: 'Done',
              cards: []
            }
          ]
        },
        {
          title: 'Work',
          lists: [
            {
              title: 'To Do',
              cards: [
                { title: 'Finish agonizing.'},
                { title: 'Start a something.'}
              ]
            },
            {
              title: 'Doing',
              cards: [
                { title: 'Brooding.'},
                { title: 'Coding.'}
              ]
            },
            {
              title: 'Done',
              cards: []
            }
          ]
        }
      ]
    };
  }

  newBoard = boardInfo => {
    this.setState(prevState => ({
      boards: [{ title: boardInfo }, ...prevState.boards]
    }));
  };

  render() {
    const { boards } = this.state;
    return (
      <span>
        <StickyToolbar newBoard={this.newBoard} />
        <Route
          exact
          path="/"
          render={props => <BoardsHome {...props} boards={boards} />}
        />
        <Route exact path="/:boardId" render={props => <Board {...props} />} />
      </span>
    );
  }
}

export default App;
