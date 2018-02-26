import React, { Component } from 'react';
import NewList from './NewList';
import List from './List';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const reorderArr = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

class Board extends Component {
  onDragEnd = result => {
    const { boardId } = this.props.match.params;
    const [thisBoard] = this.props.boards
      .filter(board => board.id === boardId)
      .map(board => board);
    if (!result.destination) {
      return;
    }

    const items = reorderArr(
      thisBoard.lists,
      result.source.index,
      result.destination.index
    );
    this.props.reorderList(items, boardId);
  };
  renderLists = thisBoard => {
    return thisBoard.lists.map((list, index) => {
      return (
        <List
          key={`list_${list.listId}`}
          id={`list_${list.listId}`}
          index={index}
          title={list.title}
          newCard={this.props.newCard}
          cards={list.cards}
        />
      );
    });
  };
  render() {
    const { title } = this.props.location.state;
    const { boardId } = this.props.match.params;
    const [thisBoard] = this.props.boards
      .filter(board => board.id === boardId)
      .map(board => board);
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <div className="board">
          <div className="board-info-wrapper">
            <span style={{ color: 'aliceblue' }}>{title}</span>
          </div>
          <div style={{ display: 'grid', gridAutoFlow: 'column' }}>
            <Droppable droppableId="lists-droppable" direction="horizontal">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className="lists-wrapper">
                  {!!thisBoard &&
                    !!thisBoard.lists &&
                    !!thisBoard.lists.length &&
                    this.renderLists(thisBoard)}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="add-list-container">
              <NewList boardId={boardId} newList={this.props.newList} />
            </div>
          </div>
        </div>
      </DragDropContext>
    );
  }
}

export default Board;
