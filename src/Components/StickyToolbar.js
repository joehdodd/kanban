import React from 'react';
import NewBoard from './NewBoard';

const StickyToolbar = props => {
  return (
    <div className="sticky-toolbar-container">
      <NewBoard newBoard={props.newBoard} />
    </div>
  );
};

export default StickyToolbar;
