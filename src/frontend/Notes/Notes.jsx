import React from 'react';
import './Notes.css';

function Notes({ markerNotes, hoveredMarkerId }) {
  return (
    <div className="notes">
      <div className="notes-heading">Notes</div>
      <div className="note-list-container">
        <ul className='note-items'>
          {Object.entries(markerNotes).map(([featureId, noteText]) => (
            <li key={featureId} className={featureId === hoveredMarkerId ? 'highlighted' : ''} > {noteText} </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Notes;