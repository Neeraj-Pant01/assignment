import React, { useState } from 'react';
import { ResizableBox } from 'react-resizable';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ArcherContainer, ArcherElement } from 'react-archer';
import Modal from 'react-modal';

const ItemType = 'CARD';

const DraggableCard = ({ id, text, top, left, onDrop, onResize, openModal }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemType,
    item: { id, left, top },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemType,
    drop: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      onDrop(item.id, delta);
    },
  });

  const handleResize = (event, { size }) => {
    onResize(id, size);
  };

  const halfText = text.slice(0, Math.ceil(text.length / 2));

  return (
    <ArcherElement
      id={id}
      relations={[
        {
          targetId: id === 'card1' ? 'card2' : 'card1',
          targetAnchor: 'top',
          sourceAnchor: 'bottom',
          style: { strokeColor: 'black', strokeWidth: 2 },
        },
      ]}
    >
      <div
        ref={node => drag(drop(node))}
        style={{
          position: 'absolute',
          top,
          left,
          cursor: 'move',
          opacity: isDragging ? 0.5 : 1,
          zIndex: isDragging ? 2 : 1,  // Ensure dragged item stays on top
        }}
      >
        <ResizableBox width={200} height={150} onResize={handleResize}>
          <div style={{ padding: '10px', backgroundColor: 'lightgray', height: '100%' }}>
            <p>{halfText}...</p>
            <button onClick={() => openModal(text)}>Show More</button>
          </div>
        </ResizableBox>
      </div>
    </ArcherElement>
  );
};

const Canvas = () => {
  const [cards, setCards] = useState({
    card1: { top: 50, left: 50, width: 200, height: 150, text: 'This is the first card with some dummy text.' },
    card2: { top: 300, left: 150, width: 200, height: 150, text: 'This is the second card with more dummy text.' },
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalText, setModalText] = useState('');
  const [counter, setCounter] = useState(3);

  const handleDrop = (id, delta) => {
    const card = cards[id];
    setCards({
      ...cards,
      [id]: {
        ...card,
        left: Math.round(card.left + delta.x),
        top: Math.round(card.top + delta.y),
      },
    });
  };

  const handleResize = (id, size) => {
    const card = cards[id];
    setCards({
      ...cards,
      [id]: {
        ...card,
        width: size.width,
        height: size.height,
      },
    });
  };

  const addCard = () => {
    const newCardId = `card${counter}`;
    const row = Math.floor((counter - 1) / 2);
    const col = (counter - 1) % 2;
    const offsetX = 300;
    const offsetY = 250;
    const newLeft = 50 + col * offsetX;
    const newTop = 50 + row * offsetY;
    setCards({
      ...cards,
      [newCardId]: {
        top: newTop,
        left: newLeft,
        width: 200,
        height: 150,
        text: `This is card number ${counter} with dummy text.`,
      },
    });
    setCounter(counter + 1);
  };

  const openModal = (text) => {
    setModalText(text);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <ArcherContainer strokeColor="black">
        <div style={{ marginBottom: '10px' }}>
          <button onClick={addCard}>Add Card</button>
        </div>
        <div style={{ position: 'relative', width: '100%', height: '500px', overflow: 'scroll', border: '1px solid black' }}>
          {Object.keys(cards).map((key) => {
            const { top, left, text } = cards[key];
            return (
              <DraggableCard
                key={key}
                id={key}
                text={text}
                top={top}
                left={left}
                onDrop={handleDrop}
                onResize={handleResize}
                openModal={openModal}
              />
            );
          })}
        </div>
      </ArcherContainer>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Card Details</h2>
        <p>{modalText}</p>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </DndProvider>
  );
};

export default Canvas;
