import React from 'react';
import { Link } from 'react-router-dom';

const BoardCard = props => {
  return (
    <Link
      to={{
        pathname: `/${props.title}`,
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
