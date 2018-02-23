import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const BoardCard = props => {
  console.log(props);
  return (
    <Link
      to={{
        pathname: `/${props.title}`,
        state: { ...props }
      }}
    >
      <div className="board-container">{props.title}</div>
    </Link>
  );
};

export default BoardCard;
