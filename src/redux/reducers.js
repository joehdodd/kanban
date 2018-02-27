import {
  ADD_BOARD,
  ADD_LIST,
  REORDER_LIST,
  ADD_CARD,
  REORDER_CARD
} from './actions';

export function boards(
  state = {
    boards: []
  },
  action
) {
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
      console.log(action);
      return [...action.list];
    case ADD_CARD:
      const { listId } = action;
      return state.map(list => {
        if (list.listId !== listId) return list;
        console.log(list);
        return {
          ...list,
          cards: cards(list.cards, action)
        };
      });
    case REORDER_CARD:
      return state.map(list => {
        // if (list.listId !== listId) return list;
        // console.log(list);
        return {
          ...list,
          cards: cards(list.cards, action)
        };
      });
      break;
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
      console.log(action);
      return [...action.card];
    default:
      return state;
  }
}
