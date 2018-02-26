const uuidv4 = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

class Card extends React.Component {
  onClick = () => {
    const { onClick, id } = this.props;
    onClick(id);
  }
  render() {
    const { title, active = false } = this.props;
    const activeCss = active ? 'active' : '';
    return (
      <div className={`card ${activeCss}`} onClick={this.onClick}>
        <h5>{title}</h5>
      </div>
    );
  }
}

class List extends React.Component {
  handleClick = () => {
    const { onClick, id } = this.props;
    onClick(id);
  }

  onCardClick = cardId => {
    const { onCardClick, id: listId } = this.props;
    onCardClick({ listId, cardId });
  }

  render() {
    const { title, cards } = this.props;
    return (
      <div className="list">
        <button className="add-card" onClick={this.handleClick}>+</button>
        <h4>{title}</h4>
        <div>
          {
            cards.map((card, idx) => {
              return (
                <Card key={idx} {...card} onClick={this.onCardClick} />
              )
            })
          }
        </div>
      </div>
    );
  }
}

class Board extends React.Component {
  onAddCard = listId => {
    const { onAddCard, id: boardId } = this.props;
    const action = {
      boardId,
      listId
    }
    onAddCard(action)
  }
  onCardClick = ({ listId, cardId }) => {
    const { onCardClick, id: boardId } = this.props;
    const action = {
      boardId,
      listId,
      cardId
    }
    onCardClick(action)
  }
  render() {
    const { title, list } = this.props;
    return (
      <div className="board">
        <h3>{title}</h3>
        {
          list.map((items, idx) => {
            return (
              <List onClick={this.onAddCard} onCardClick={this.onCardClick} key={idx} {...items} />
            )
          })
        }
      </div>
    );
  }
}


const cardRedcer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CARD': {
      const { cardId } = action;
      return { title: 'new card...', id: cardId }
    }
    case 'TOGGLE_CARD': {
      return {
        ...state,
        active: !state.active
      }
    }
    default:
      return state;
  }
}

const cardsRedcer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CARD':
      return [...state, cardRedcer(null, action)];
    case 'TOGGLE_CARD': {
      return state.map(card => {
        if (card.id !== action.cardId) return card;
        return cardRedcer(card, action);
      });
    }
    default:
      return state;
  }
}

const listReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_CARD': {
      const { listId } = action;
      return state.map(item => {
        if (item.id !== listId) return item;
        return {
          ...item,
          cards: cardsRedcer(item.cards, action)
        }
      });
    }
    case 'TOGGLE_CARD': {
      const { listId, cardId } = action;
      return state.map(item => {
        if (item.id !== listId) return item;
        return {
          ...item,
          cards: cardsRedcer(item.cards,action)
        }
      });
    }
    default:
      return state;
  }
}

class App extends React.Component {
  state = {
    boards: [
      {
        id: 1,
        title: 'Home',
        list: [
          {
            id: 111,
            title: 'To Do',
            cards: [
              { title: 'Finish this project.', id: 1 },
              { title: 'Start that project.', id: 2 }
            ]
          },
          {
            id: 222,
            title: 'Doing',
            cards: [
              { title: 'Finish Another project.', id: 1 },
              { title: 'Ask on StackOverflow.', id: 2 }]
          },
          {
            id: 333,
            title: 'Done',
            cards: []
          }
        ]
      }
    ]
  }

  onAddCard = ({ boardId, listId }) => {
    const cardId = uuidv4();
    this.setState(prev => {
      const nextState = prev.boards.map(board => {
        if (board.id !== boardId) return board;
        return {
          ...board,
          list: listReducer(board.list, { type: 'ADD_CARD', listId, cardId })
        }
      })
      return {
        ...prev,
        boards: nextState
      }
    });
  }

  onCardClick = ({ boardId, listId, cardId }) => {
    this.setState(prev => {
      const nextState = prev.boards.map(board => {
        if (board.id !== boardId) return board;
        return {
          ...board,
          list: listReducer(board.list, { type: 'TOGGLE_CARD', listId, cardId })
        }
      })
      return {
        ...prev,
        boards: nextState
      }
    });
  }

  render() {
    const { boards } = this.state;
    return (
      <div className="board-sheet">
        {
          boards.map((board, idx) => (
            <Board
              id={board.id}
              key={idx}
              list={board.list}
              title={board.title}
              onAddCard={this.onAddCard}
              onCardClick={this.onCardClick}
            />
          ))
        }
      </div>
    );
  }
}
