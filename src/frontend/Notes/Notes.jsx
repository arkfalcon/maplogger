import React, { useEffect, useRef } from 'react';
import './Notes.css';

function Notes({ markerNotes, hoveredMarkerId }) {
  const listRef = useRef(null);
  useEffect(() => {
    if (hoveredMarkerId && listRef.current) {
      const highlightedItem = listRef.current.querySelector('.highlighted'); // highlight current marker golden
      if (highlightedItem) {
        highlightedItem.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' }); // autoscroll to current marker
      }
    }
  }, [hoveredMarkerId]);

  return (
    <div className="notes">
      <div className="notes-heading">Notes</div>
      <div className="note-list-container">
        <ul ref={listRef} className='note-items'>
          {Object.entries(markerNotes).map(([featureId, noteText]) => (
            <li key={featureId} className={featureId === hoveredMarkerId ? 'highlighted' : ''} > {noteText} </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notes;