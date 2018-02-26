import { ADD_BOARD, ADD_LIST, REORDER_LIST, ADD_CARD } from './actions';

export function handleBoards(
  state = {
    boards: []
  },
  action
) {
  const { boardId } = action;
  switch (action.type) {
    case ADD_BOARD:
      return {
        ...state,
        boards: [{ id: action.id, title: action.board }, ...state.boards]
      };
    case ADD_LIST:
      let nextState = state.boards.map(board => {
        if (board.id !== boardId) return board;
        return {
          ...board,
          lists: lists(board.lists, action)
        };
      });
      return {
        ...state,
        boards: nextState
      };
    case REORDER_LIST:
      const { list } = action;
      nextState = state.boards.map(board => {
        if (board.id !== boardId) return board;
        return {
          ...board,
          lists: [...list]
        }
      })
      return {
        ...state,
        boards: nextState
      };
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
    default:
      return state;
  }
}

export function handleCard(state = {}, action) {
  switch (action.type) {
    case ADD_CARD:
      const { card, id } = action;
      return { title: card, id: id };
    default:
      return state;
  }
}

export function handleCards(state = [], action) {
  switch (action.tpe) {
    case ADD_CARD:
      return [...state, handleCard(null, action)];
    // {
    //   ...state,
    //   cards: [...state.cards, { id: action.id, title: action.card }]
    // };
    default:
      return state;
  }
}
