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

const dummyState = {
  id: 'e97b8cd9-c2c0-455b-9324-ca4d0f5e959f',
  title: 'Home',
  lists: [
    {
      boardId: 'e97b8cd9-c2c0-455b-9324-ca4d0f5e959f',
      listId: 'a820cd78-eee5-47ea-97cb-bfbcbc3e5750',
      title: 'To Do',
      cards: [
        {
          id: '4a4a6a4e-9a54-4234-b88f-cc998c375941',
          listId: 'a820cd78-eee5-47ea-97cb-bfbcbc3e5750',
          title: 'To Do Card 1'
        },
        {
          id: '09ec1bd5-4994-4248-b7d5-8070bac8d5fe',
          listId: 'a820cd78-eee5-47ea-97cb-bfbcbc3e5750',
          title: 'To Do Card 2'
        }
      ]
    },
    {
      boardId: 'e97b8cd9-c2c0-455b-9324-ca4d0f5e959f',
      listId: '8560a8f5-e872-4ae5-b356-2d935af1b6a4',
      title: 'Doing',
      cards: [
        {
          id: '71c48add-4132-413b-954c-508f18a75e07',
          listId: '8560a8f5-e872-4ae5-b356-2d935af1b6a4',
          title: 'Doing Card 1'
        },
        {
          id: 'cd39bd33-9afc-45df-ad28-6e1d01758c49',
          listId: '8560a8f5-e872-4ae5-b356-2d935af1b6a4',
          title: 'Doing Card 2'
        }
      ]
    }
  ]
}

export function boards(state = [dummyState], action) {
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
            console.log(list.listId);
            if (list.listId !== action.sourceId) return list;
            // console.log(action.card.map(card => card.listId === action.listId));
            return {
              ...list,
              cards: [...action.card]
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
    // case REORDER_CARD:
    //   return state.map(list => {
    //     if (list.listId !== action.listId) return list;
    //     return {
    //       ...list,
    //       cards: [...action.card]
    //     };
    //   });
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
    // case REORDER_CARD:
    //   return [...state, ...action.card];
    default:
      return state;
  }
}
