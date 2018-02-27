import {
  ADD_BOARD,
  ADD_LIST,
  REORDER_LIST,
  ADD_CARD,
  REORDER_CARD
} from './actions';

export function handleBoard(state = {}, action) {
  switch (action.type) {
    case ADD_BOARD:
      return { id: action.id, title: action.board };
    default:
      return state;
  }
}

export function boards(state = [], action) {
  switch (action.type) {
    case ADD_BOARD:
      return [...state, handleBoard(state, action)];
    case ADD_LIST:
    case REORDER_LIST:
      return state.map(board => {
        if (board.id !== action.boardId) return board;
        return {
          ...board,
          lists: lists(board.lists, action)
        };
      });
    case ADD_CARD:
    case REORDER_CARD:
      return state.map(board => {
        if (board.id !== action.boardId) return board;
        return {
          ...board,
          lists: board.lists.map(list => {
            if (list.listId !== action.listId) return list;
            return {
              ...list,
              cards: cards(list.cards, action)
            };
          })
        };
      });
    default:
      return state;
  }
}

export function handleList(state = {}, action) {
  switch (action.type) {
    case ADD_LIST:
      const { list, listId, boardId } = action;
      return { title: list, listId: listId, boardId: boardId };
    default:
      return state;
  }
}

export function lists(state = [], action) {
  switch (action.type) {
    case ADD_LIST:
      return [...state, handleList(state, action)];
    case REORDER_LIST:
      return [...action.list];
    case ADD_CARD:
      return state.map(list => {
        if (list.listId !== action.listId) return list;
        return {
          ...list,
          cards: cards(list.cards, action)
        };
      });
    case REORDER_CARD:
      return state.map(list => {
        if (list.listId !== action.listId) return list;
        return {
          ...list,
          cards: [...action.card]
        };
      });
    default:
      return state;
  }
}

export function handleCard(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      const { card, id, listId } = action;
      return { title: card, id: id, listId: listId };
    default:
      return state;
  }
}

export function cards(state = [], action) {
  switch (action.type) {
    case ADD_CARD:
      return [...state, handleCard(state, action)];
    case REORDER_CARD:
      return [...action.card];
    default:
      return state;
  }
}
