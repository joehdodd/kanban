import React from 'react';
import { Link } from 'react-router-dom';

const BoardCard = props => {
  // console.log(props);
  return (
    <Link
      to={{
        pathname: `/board/${props.id}`,
        state: { ...props }
      }}
    >
      <div className="board-card-container">
        <span className="board-card-title">{props.title}</span>
      </div>
    </Link>
  );
};

export default BoardCard;
