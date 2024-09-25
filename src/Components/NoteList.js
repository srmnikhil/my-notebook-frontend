import React from 'react';
import NoteItem from './NoteItem';

const NoteList = ({ notes, updateNote, showToast }) => {
  return (
    <div className="container my-3">
      <h2>Your Notes</h2>
      <div className="mx-4">
        {notes.length === 0 && <i>No notes to display.</i>}
      </div>
      <div className="row">
        {notes.length > 0 && notes.map((note, index) => (
          <NoteItem key={note._id} updateNote={()=>updateNote({
            id: note._id,
            utitle: note.title,
            udescription: note.description,
            utag: note.tag
          })} note={note} index={index} showToast={showToast} />
        ))}
        <hr/>
        <h4 className='text-center'><i>End of your notes.</i></h4>
      </div>
    </div>
  );
};
export default NoteList;
