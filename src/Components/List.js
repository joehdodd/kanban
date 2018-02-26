import React, { Component } from 'react';
import ListCard from './ListCard';
import NewListCard from './NewListCard';
import { Draggable } from 'react-beautiful-dnd';

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
        <ListCard key={`card_${card.title}`} index={index} title={card.title} />
      );
    });
  };

  render() {
    const { cards } = this.props;
    console.log(this.props);
    return (
      <Draggable
        draggableId={this.props.id}
        index={this.props.index}
        key={this.props.id}
      >
        {(provided, snapshot) => {
          const style = {
            backgroundColor: snapshot.isDragging ? '#f5f5f5' : '#ebebeb',
            ...provided.draggableProps.style,
            transition: snapshot.isDragging
              ? 'background-color 500ms cubic-bezier(0.4, 0.0, 0.2, 1)'
              : ''
          };
          return (
            <div>
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={style}
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
                      <div className="list-items">{this.renderListItems()}</div>
                    )}
                  <NewListCard newCard={this.newCard} />
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
