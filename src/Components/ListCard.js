import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

const ListCard = props => {
  return (
    <Draggable
      type="card"
      draggableId={props.id}
      index={props.index}
      key={props.id}
    >
      {(provided, snapshot) => (
        <div className="list-card-wrapper">
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
              ...provided.draggableProps.style
            }}
            className="list-card-container"
            >
            <span>{props.title}</span>
          </div>
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default ListCard;
