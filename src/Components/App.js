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

  newCard = (cardInfo, boardId, listId) => {
    const { addCard } = this.props.actions;
    addCard(cardInfo, boardId, listId);
  };

  render() {
    const { boards, cards, actions } = this.props;
    console.log(cards);
    return (
      <span>
        <StickyToolbar newBoard={this.newBoard} />
        <Route
          exact
          path="/"
          render={props => <BoardsHome {...props} boards={boards} />}
        />
        <Route
          exact
          path="/board/:boardId"
          render={({ match }) => (
            <Board
              board={boards.find(board => board.id === match.params.boardId)}
              newList={this.newList}
              newCard={this.newCard}
              reorderList={actions.reorderList}
              moveCardInList={actions.moveCardInList}
              moveCardToNewList={actions.moveCardToNewList}
            />
          )}
        />
      </span>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { boards, cards, router } = state;
  const { location } = router;
  return {
    boards,
    cards,
    location
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
