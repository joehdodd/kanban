const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    // eslint-disable-next-line
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
};

export const ADD_BOARD = 'ADD_BOARD';
export function addBoard(board) {
  return {
    type: ADD_BOARD,
    id: uuidv4(),
    board: board
  };
}

export const ADD_LIST = 'ADD_LIST';
export function addList(list, boardId) {
  return {
    type: ADD_LIST,
    boardId: boardId,
    listId: uuidv4(),
    list: list
  };
}

export const REORDER_LIST = 'REORDER_LIST';
export function reorderList(list, boardId) {
  return {
    type: REORDER_LIST,
    boardId: boardId,
    list: list
  };
}

export const REORDER_CARDS_IN_LIST = 'REORDER_CARDS_IN_LIST';
export function moveCardInList(card, boardId, sourceId, destId) {
  return {
    type: REORDER_CARDS_IN_LIST,
    boardId: boardId,
    sourceId: sourceId,
    destId: destId,
    card: card
  };
}

export const MOVE_CARD_TO_NEW_LIST = 'MOVE_CARD_TO_NEW_LIST';
export function moveCardToNewList(
  target,
  destination,
  sourceCards,
  destCards,
  boardId,
  sourceId,
  destId
) {
  return function(dispatch) {
    dispatch(addCard(target.title, boardId, target.listId));
  };
}
// return {
//   type: MOVE_CARD_TO_NEW_LIST,
//   target: target,
//   destination: destination,
//   sourceCards: sourceCards,
//   destCards: destCards,
//   boardId: boardId,
//   sourceId: sourceId,
//   destId: destId,
// }

export const ADD_CARD = 'ADD_CARD';
export function addCard(card, boardId, listId) {
  return {
    type: ADD_CARD,
    id: uuidv4(),
    boardId: boardId,
    listId: listId,
    card: card
  };
}
