import React, { useState } from 'react';
import { Draggable } from 'react-draggable';
import { Resizable } from 'react-resizable';

const Card = ({ text, id, x, y, width, height, onSelect, onResize, onDrag }) => {
  const [showMore, setShowMore] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  const handleShowMore = () => {
    setShowMore(true);
  };

  const handlePopupOpen = () => {
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
  };

  return (
    <Draggable
      axis="both"
      handle=".card-header"
      defaultPosition={{ x, y }}
      onDrag={(e, ui) => onDrag(id, ui.x, ui.y)}
    >
      <Resizable height={200} width={300}
        // size={{ width, height }}
        onResize={(e, { size }) => onResize(id, size.width, size.height)}
      >
        <div
          className="card"
          style={{
            position: 'absolute',
            top: y,
            left: x,
            width,
            height,
          }}
        >
          <div className="card-header">
            <p>
              {showMore ? text : text.substring(0, 50) + '...'}
              {showMore ? (
                <button onClick={handlePopupClose}>Close</button>
              ) : (
                <button onClick={handleShowMore}>Show more</button>
              )}
            </p>
          </div>
          {popupOpen && (
            <div className="popup">
              <p>{text}</p>
              <button onClick={handlePopupClose}>Close</button>
            </div>
          )}
        </div>
      </Resizable>
    </Draggable>
  );
};

export default Card;