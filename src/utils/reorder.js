const reorderArr = (list, startIndex, endIndex) => {
  const [removed] = list.splice(startIndex, 1);
  list.splice(endIndex, 0, removed);
  return list;
};

export const reorder = (result, props) => {
  const { lists } = props.board;
  const { id } = props.board;
  if (!result.destination) {
    return;
  }
  if (result.type === 'list') {
    const items = reorderArr(
      lists,
      result.source.index,
      result.destination.index
    );
    props.reorderList(items, id);
  }
  if (result.type === 'card') {
    let { source, destination } = result;
    let filterSourceCards = lists.map(list =>
      list.cards.filter(card => card.listId === source.droppableId)
    );
    let filterDestCards = lists.map(list =>
      list.cards.filter(card => card.listId === destination.droppableId)
    );
    let sourceCards = [].concat.apply([], filterSourceCards);
    let destCards = [].concat.apply([], filterDestCards);
    if (source.droppableId !== destination.droppableId) {
      let target = sourceCards[source.index];
      // sourceCards.splice(source.index, 1);
      // destCards.splice(destination.index, 0, target);
      props.moveCardToNewList(
        target,
        destination.index,
        sourceCards,
        destCards,
        id,
        source,
        destination
      );
    } else {
      const items = reorderArr(
        sourceCards,
        result.source.index,
        result.destination.index
      );
      props.moveCardInList(items, id, source, destination);
    }
  }
};
