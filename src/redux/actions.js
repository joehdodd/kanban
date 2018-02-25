export const ADD_BOARD = 'ADD_BOARD';
export function addBoard(board) {
  return {
    type: ADD_BOARD,
    board: board
  }
}

export const ADD_LIST = 'ADD_LIST';
export function addList(list) {
  return {
    type: ADD_LIST,
    list: list
  }
}

export const ADD_CARD = 'ADD_CARD';
export function addCard(card) {
  return {
    type: ADD_CARD,
    card: card
  }
}
