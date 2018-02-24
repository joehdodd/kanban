import React, { Component } from 'react';
import ListCard from './ListCard';
import NewListCard from './NewListCard';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listCards: []
    };
  }

  newListCard = (listCardInfo) => {
    this.setState(prevState => ({
      listCards: [ { title: listCardInfo }, ...prevState.listCards ]
    }))
  }

  renderListItems = () => {
    const { listCards } = this.state
    return listCards.map(card => {
     return (
       <ListCard key={card.title} title={card.title}/>
     )
    })
  }

  render() {
    return (
      <div className="list-container">
        <span className="list-title">{this.props.title}</span>
        <NewListCard newListCard={this.newListCard} />
        <div className="list-items">
          {this.renderListItems()}
        </div>
      </div>
    )
  }
}

export default List;
