import React, { Component } from 'react';
import NewList from './NewList';
import List from './List';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

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
    if (result.type === 'list') {
      const items = reorderArr(
        lists,
        result.source.index,
        result.destination.index
      );
      this.props.reorderList(items, boardId);
    }
    if (result.type === 'card') {
      let listId = result.draggableId.split('_')[1];
      let [cards] = lists.map(list =>
        //NOTE: if lists.length > 1 && lists.cards.length === 0, this breaks
        list.cards.filter(card => card.listId === listId)
      );
      const items = reorderArr(
        cards,
        result.source.index,
        result.destination.index
      );
      console.log(items);
      this.props.reorderCard(items, boardId);
    }
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
          <div className="lists-container">
            <Droppable
              type="list"
              droppableId="lists-droppable"
              direction="horizontal"
            >
              {(provided, snapshot) => (
                <div ref={provided.innerRef} className="lists-wrapper">
                  {!!lists && !!lists.length && this.renderLists()}
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
