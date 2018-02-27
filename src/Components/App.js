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

  newCard = (cardInfo, listId) => {
    const { addCard } = this.props.actions;
    addCard(cardInfo, listId);
  };

  render() {
    const { boards, lists, cards, actions } = this.props;
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
          render={props => (
            <Board
              {...props}
              boards={boards}
              lists={lists}
              cards={cards}
              newList={this.newList}
              newCard={this.newCard}
              reorderList={actions.reorderList}
              reorderCard={actions.reorderCard}
            />
          )}
        />
      </span>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const { boards, lists, cards, router } = state;
  // const { boards } = boards;
  // const { lists } = lists;
  // const { cards } = cards;
  const { location } = router;
  return {
    ...boards,
    lists,
    cards,
    location
  };
}

function mapDispatchToProps(dispatch) {
  return { actions: bindActionCreators(actions, dispatch) };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
