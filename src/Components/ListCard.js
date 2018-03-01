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
      {(provided, snapshot) => {
        return (
          <div style={{width: `95%`, marginBottom: `2.5px`}}>
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={provided.draggableProps.style}
            >
              <div className="list-card-container">
                <span>{props.title}</span>
              </div>
            </div>
            {provided.placeholder}
          </div>
        );
      }}
    </Draggable>
  );
};

export default ListCard;
