import React from 'react';

const ListCard = props => {
  return (
    <div className="list-item-container">
      <span>{props.title}</span>
    </div>
  )
}

export default ListCard;
