import { ADD_BOARD, ADD_LIST, ADD_CARD } from './actions';

export function handleBoards(state = { boards: [] }, action) {
  switch (action.type) {
    case ADD_BOARD:
      return { ...state, boards: [{ title: action.board }, ...state.boards] };
    default:
      return state;
  }
}

export function handleLists(state = { lists: [] }, action) {
  switch (action.type) {
    case ADD_LIST:
      return { ...state, lists: [...state.lists, { title: listInfo }] };
    default:
      return state;
  }
}

export function handleCards(state = { cards: []})

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
