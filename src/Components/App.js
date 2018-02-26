import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../redux/actions';
import { Route, withRouter } from 'react-router-dom';
import StickyToolbar from './StickyToolbar';
import BoardsHome from './BoardsHome';
import Board from './Board';
import '../App.css';

class App extends Component {
  newBoard = boardInfo => {
    const { addBoard } = this.props.actions;
    addBoard(boardInfo);
  };

  newList = (listInfo, boardId) => {
    const { addList } = this.props.actions;
    addList(listInfo, boardId);
  };

  render() {
    const { boards } = this.props;
    return (
      <span>
        <StickyToolbar newBoard={this.newBoard} />
        <Route
          exact
          path="/"
          render={props => (
            <BoardsHome {...props} boards={boards} />
          )}
        />
        <Route
          exact
          path="/board/:boardId"
          render={props => (
            <Board {...props} boards={boards} newList={this.newList} />
          )}
        />
      </span>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { handleBoards, handleCards, router } = state;
  const { boards } = handleBoards;
  // const { cards } = handleCards;
  const { location } = router;
  return {
    boards,
    // cards,
    location
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
