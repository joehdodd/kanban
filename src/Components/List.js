import React, { Component } from 'react';
import ListCard from './ListCard';
import NewListCard from './NewListCard';

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
    return (
      <div className="list-container">
        <div className="list-title">
          <span>
            {this.props.title} {this.props.id}
          </span>
        </div>
        {!!cards &&
          !!cards.length && (
            <div className="list-items">{this.renderListItems()}</div>
          )}
        <NewListCard newCard={this.newCard} />
      </div>
    );
  }
}

export default List;
