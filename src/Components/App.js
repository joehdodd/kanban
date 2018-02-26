import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import { Route, withRouter } from "react-router-dom";
import StickyToolbar from "./StickyToolbar";
import BoardsHome from "./BoardsHome";
import Board from "./Board";
import "../App.css";

class App extends Component {
  componentDidMount() {
    console.log(this.props);
  }
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
    const { addBoard } = this.props.actions;
    addBoard(boardInfo);
  };

  newList = listInfo => {
    const { addList } = this.props.actions;
    addList(listInfo);
    // this.setState(prevState => ({
    //   lists: [...prevState.lists, { title: listInfo }]
    // }));
  };

  render() {
    const { boards } = this.props;
    return (
      <span>
        <StickyToolbar newBoard={this.newBoard} />
        <Route
          exact
          path="/"
          render={props => <BoardsHome {...props} boards={boards} />}
        />
        <Route exact path="/:boardId" render={props => <Board {...props} newList={this.newList} />} />
      </span>
    );
  }
}


function mapStateToProps(state, ownProps) {
  const { handleBoards, handleLists, handleCards, router } = state;
  const { boards } = handleBoards;
  const { lists } = handleLists;
  const { cards } = handleCards;
  const { location } = router;
  return {
    boards,
    lists,
    cards,
    location
  }
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
