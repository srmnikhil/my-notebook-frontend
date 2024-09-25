import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote, index } = props;
    const handleDelete = () => {
        deleteNote(note._id);
    }
    const handleEdit = () => {
        updateNote(note);
    }
    const noteDate = note.date;
    return (
        <div className='col-md-full'>
            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title mb-0">{index+1}. {note.title}</h5>
                        <div className="ms-auto">
                            <i className="fa-solid fa-file-pen mx-1" style={{ cursor: "pointer", fontSize: "1.2rem" }} onClick={handleEdit} />
                            <i className="fa-solid fa-trash mx-1" onClick={handleDelete} style={{ color: "red", cursor: "pointer", fontSize: "1.2rem" }}></i>
                        </div>
                    </div>
                    <p className='card-text mb-0 text-secondary'><i className='tag'>{note.tag}</i></p>
                    <p className="card-text mb-1" style={{ whiteSpace: 'pre-wrap' }}>{note.description}</p>
                    <p className='card-text float-end text-primary'><i className='tag'>{noteDate}</i></p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem
