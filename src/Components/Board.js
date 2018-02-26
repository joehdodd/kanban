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
    let lists = this.props.lists.filter(list => list.boardId === boardId);
    if (!result.destination) {
      return;
    }

    const items = reorderArr(
      lists,
      result.source.index,
      result.destination.index
    );
    this.props.reorderList(items, boardId);
  };
  renderLists = thisBoard => {
    const { boardId } = this.props.match.params;
    let lists = this.props.lists.filter(list => list.boardId === boardId);
    return lists.map((list, index) => {
      return (
        <List
          key={`list_${list.listId}`}
          id={list.listId}
          index={index}
          title={list.title}
          newCard={this.props.newCard}
          cards={list.cards}
        />
      );
    });
  };
  render() {
    const { boardId } = this.props.match.params;
    const { title } = this.props.location.state;
    let lists = this.props.lists.filter(list => list.boardId === boardId);
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
                  {!!lists &&
                    !!lists.length &&
                    this.renderLists()}
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
