import React from 'react';
import NewList from './NewList';
import List from './List';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const reorderArr = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

const Board = props => {
  const onDragEnd = result => {
    // console.log('drop result', result);
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
      let { source, destination } = result;
      let filterSourceCards = lists.map(list =>
        list.cards.filter(card => card.listId === source.droppableId)
      );
      let filterDestCards = lists.map(list =>
        list.cards.filter(card => card.listId === destination.droppableId)
      );
      let sourceCards = [].concat.apply([], filterSourceCards);
      let destCards = [].concat.apply([], filterDestCards);
      if (source.droppableId !== destination.droppableId) {
        let target = sourceCards[source.index];
        // sourceCards.splice(source.index, 1);
        // destCards.splice(destination.index, 0, target);
        props.moveCardToNewList(
          target,
          destination.index,
          sourceCards,
          destCards,
          id,
          source,
          destination
        );
      } else {
        const items = reorderArr(
          sourceCards,
          result.source.index,
          result.destination.index
        );
        props.moveCardInList(items, id, source, destination);
      }
    }
  };
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
