import React from 'react';
import NewList from './NewList';
import List from './List';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { reorder } from '.././utils/reorder';


const Board = props => {
  const onDragEnd = (result) => {
    return reorder(result, props);
  }
  const renderLists = thisBoard => {
    const { lists, id } = props.board;
    return lists.map((list, index) => {
      return (
        <List
          key={`list_${list.listId}`}
          listId={list.listId}
          boardId={id}
          index={index}
          title={list.title}
          newCard={props.newCard}
          cards={list.cards}
        />
      );
    });
  };
  const { id } = props.board;
  const { title } = props.board;
  const { lists } = props.board;
  return (
    <DragDropContext onDragEnd={onDragEnd}>
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
                {!!lists && !!lists.length && renderLists()}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <div className="add-list-container">
            <NewList boardId={id} newList={props.newList} />
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default Board;
