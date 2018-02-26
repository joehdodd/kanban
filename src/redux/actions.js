const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    // eslint-disable-next-line
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

export const ADD_BOARD = 'ADD_BOARD';
export function addBoard(board) {
  return {
    type: ADD_BOARD,
    id: uuidv4(),
    board: board
  }
}

export const ADD_LIST = 'ADD_LIST';
export function addList(list, boardId) {
  return {
    type: ADD_LIST,
    boardId: boardId,
    listId: uuidv4(),
    list: list
  }
}

export const REORDER_LIST = 'REORDER_LIST';
export function reorderList(list, boardId) {
  return {
    type: REORDER_LIST,
    boardId: boardId,
    list: list
  }
}

export const ADD_CARD = 'ADD_CARD';
export function addCard(card, listId) {
  return {
    type: ADD_CARD,
    id: uuidv4(),
    listId: listId,
    card: card
  }
}
