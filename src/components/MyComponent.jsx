// src/components/MyComponent.jsx
import React, { useRef } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ArcherContainer from 'react-archer';
import Card from './Card';

const ItemType = 'CARD';

const DraggableCard = ({ id, text, moveCard }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType,
    item: { id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <Card ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      {text}
    </Card>
  );
};

const DroppableArea = ({ children, onDrop }) => {
  const [, drop] = useDrop(() => ({
    accept: ItemType,
    drop: (item) => onDrop(item),
  }));

  return <div ref={drop} style={{ minHeight: '300px', border: '1px dashed gray' }}>{children}</div>;
};

const MyComponent = () => {
  const handleDrop = (item) => {
    // Handle the dropped item logic here
    console.log('Dropped item:', item);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ArcherContainer>
        <DroppableArea onDrop={handleDrop}>
          <DraggableCard id={1} text="Card 1" />
          <DraggableCard id={2} text="Card 2" />
        </DroppableArea>
      </ArcherContainer>
    </DndProvider>
  );
};

export default MyComponent;
