import { ADD_BOARD, ADD_LIST, REORDER_LIST, ADD_CARD } from './actions';

export function boards(
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
      return [...action.list]
    case ADD_CARD:
      const { listId } = action;
      return state.map(list => {
        if (list.listId !== listId) return list;
        return {
          ...list,
          cards: cards(state.cards, action)
        }
      })
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

export function cards(state = [], action) {
  switch (action.type) {
    case ADD_CARD:
      return [...state, handleCard(state, action)];
    default:
      return state;
  }
}
