import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';


const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" })
  const handleClick = (evt) => {
    evt.preventDefault();
    const newNote = { ...note, tag: note.tag.length === 0 ? "General" : note.tag };
    addNote(newNote.title, newNote.description, newNote.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showToast("Note added successfully", "success");
  }
  const onChange = (evt) => {
    setNote({ ...note, [evt.target.name]: evt.target.value });
  }
  return (
      <div className="container my-3" style={{position: 'sticky', top: "6rem"}}>
        <h2>Add a Note</h2>
        <form className='my-3'>
          <div className="mb-1">
            <label htmlFor="title" className="form-label">Title:</label>
            <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" value={note.title} onChange={onChange} />
          </div>
          <div className="mb-1">
            <label htmlFor="exampleFormControlTextarea1" className="form-label">Description:</label>
            <textarea type="text" className="form-control" id='description' name='description' rows="5" value={note.description} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Tag:</label>
            <input type="text" className="form-control" id='tag' name='tag' value={note.tag} onChange={onChange} />
          </div>
          <button disabled={note.title.length < 3 || note.description.length < 5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
  )
}

export default AddNote;
