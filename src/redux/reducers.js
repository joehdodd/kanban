import {
  ADD_BOARD,
  ADD_LIST,
  REORDER_LIST,
  ADD_CARD,
  REORDER_CARDS_IN_LIST,
  MOVE_CARD_TO_NEW_LIST
} from './actions';

// eslint-disable-next-line
Array.prototype.insert = function(index, item) {
  this.splice(index, 0, item);
  return this;
};

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
    // case ADD_LIST:
    // // case REORDER_LIST:
    //   return state.map(board => {
    //     if (board.id !== action.boardId) return board;
    //     // console.log(action);
    //     // console.log({...board});
    //     let lists = board.lists;
    //     return {
    //       ...board,
    //       // lists: [...action.list],
    //       lists: lists(board.lists, action)
    //     };
    //   });
    case ADD_CARD:
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
    case REORDER_CARDS_IN_LIST:
      return state.map(board => {
        if (board.id !== action.boardId) return board;
        return {
          ...board,
          lists: board.lists.map(list => {
            if (list.listId !== action.sourceId.droppableId) return list;
            return {
              ...list,
              cards: [...action.card]
            };
          })
        };
      });
    case MOVE_CARD_TO_NEW_LIST:
      return state.map(board => {
        if (board.id !== action.boardId) return board;
        return {
          ...board,
          lists: board.lists.map(list => {
            if (list.listId === action.sourceId.droppableId) {
              return {
                ...list,
                cards: list.cards.filter(
                  (_, index) => index !== action.sourceId.index
                )
              };
            }
            if (list.listId === action.destId.droppableId) {
              return {
                ...list,
                cards: list.cards.insert(
                  action.destination,
                  moveCardToNewList(state, action)
                )
              };
            }
            // return {
            //   ...list,
            //   cards: lists.cards
            // }
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
      console.log(action);
      return [...action.list];
    case ADD_CARD:
      return state.map(list => {
        if (list.listId !== action.listId) return list;
        return {
          ...list,
          cards: cards(list.cards, action)
        };
      });
    case REORDER_CARDS_IN_LIST:
      return state.map(list => {
        if (list.listId !== action.sourceId.droppableId) return list;
        return {
          ...list,
          cards: [...action.card]
        };
      });
    case MOVE_CARD_TO_NEW_LIST:
      return state.map(list => {
        console.log(action);
        if (list.listId === action.destId.droppableId) {
          return {
            ...list,
            cards: list.cards.insert(
              action.destination,
              moveCardToNewList(state, action)
            )
          };
        }
        return {
          ...list,
          cards: [...action.sourceCards]
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
    case REORDER_CARDS_IN_LIST:
      return [...state, ...action.card];
    default:
      return state;
  }
}

export function moveCardToNewList(state = {}, action) {
  switch (action.type) {
    case MOVE_CARD_TO_NEW_LIST:
      return {
        id: action.target.id,
        listId: action.destId.droppableId,
        title: action.target.title
      };
    default:
      return state;
  }
}
