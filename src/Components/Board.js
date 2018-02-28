import React from 'react';
import NewList from './NewList';
import List from './List';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const reorderArr = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const Board = props => {
  const onDragEnd = result => {
    console.log(result);
    const { lists } = props.board;
    const { id } = props.board;
    if (!result.destination) {
      return;
    }
    if (result.type === 'list') {
      const items = reorderArr(
        lists,
        result.source.index,
        result.destination.index
      );
      props.reorderList(items, id);
    }
    if (result.type === 'card') {
      let source = result.source.droppableId;
      let destination = result.destination.droppableId;
      let some = lists.map(list => list.cards.map(card => card.listId))
      // const items = reorderArr(
      //   cards,
      //   result.source.index,
      //   result.destination.index
      // );
      // console.log(items);
      // props.reorderCard(items, id, source, destination);
    }
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
