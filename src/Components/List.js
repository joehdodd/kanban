import React, { Component } from 'react';
import ListCard from './ListCard';
import NewListCard from './NewListCard';
import { Droppable, Draggable } from 'react-beautiful-dnd';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
  }

  newCard = listCardInfo => {
    this.setState(prevState => ({
      cards: [...prevState.cards, { title: listCardInfo }]
    }));
  };

  renderListItems = () => {
    const { cards } = this.props;
    return cards.map((card, index) => {
      return (
        <ListCard key={`card_${card.id}`} id={card.id} listId={card.listId} index={index} title={card.title} />
      );
    });
  };

  render() {
    const { cards, id } = this.props;
    return (
      <Draggable
        draggableId={this.props.id}
        index={this.props.index}
        key={this.props.id}
        type="list"
      >
        {(provided, snapshot) => {
          return (
            <div>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={provided.draggableProps.style}
                className="list-wrapper"
              >
                <div className="list-container">
                  <div className="list-title">
                    <span>
                      {this.props.title}
                    </span>
                  </div>
                  {!!cards &&
                    !!cards.length && (
                      <Droppable type="card" droppableId="cards-droppable" direction="vertical">
                        {(provided, snapshot) => (
                          <div ref={provided.innerRef} className="list-items">{this.renderListItems()}</div>
                        )}
                      </Droppable>
                    )}
                  <NewListCard listId={id} newCard={this.props.newCard} />
                </div>
              </div>
              {provided.placeholder}
            </div>
          );
        }}
      </Draggable>
    );
  }
}

export default List;
