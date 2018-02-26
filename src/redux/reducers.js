import { ADD_BOARD, ADD_LIST, ADD_CARD } from './actions';

export function handleBoards(state = { boards: [] }, action) {
  switch (action.type) {
    case ADD_BOARD:
      return {
        ...state,
        boards: [{ id: action.id, title: action.board }, ...state.boards]
      };
    case ADD_LIST:
      const { id } = action;
      console.log(state);
      return {
        ...state,
        boards: state.boards.map(board => {
          console.log(board, board.id, handleLists(board.lists, action));
          return board.id !== id ? board : { ...board, lists: handleLists(board.lists, action) }
        })
      }
    default:
      return state;
  }
}

export function handleLists(state = { lists: [] }, action) {
  switch (action.type) {
    case ADD_LIST:
      return {
        ...state,
        lists: [...state.lists, { id: action.id, title: action.list }]
      };
    default:
      return state;
  }
}

export function handleCards(state = { cards: [] }, action) {
  switch (action.tpe) {
    case ADD_CARD:
      return {
        ...state,
        cards: [...state.cards, { id: action.id, title: action.card }]
      };
    default:
      return state;
  }
}

// NOTE: RESHAPING STATE FOR REDUX
//  state = {
//   boards: [
//     {
//       title: 'Home',
//       lists: [
//         {
//           title: 'To Do',
//           cards: [
//             { title: 'Handle some stuff'},
//             { title: 'Fix some stuff' }
//           ]
//         },
//         {
//           title: 'Doing',
//           cards: [
//             { title: 'Coding' },
//             { title: 'Fixing' }
//           ]
//
//         },
//         {
//           title: 'Done',
//           cards: []
//         },
//
//       ]
//     },
//   ]
// }
