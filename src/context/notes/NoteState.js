import React, {useState} from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = process.env.REACT_APP_BACKEND_URL;
  const [notes, setNotes] = useState([]);
  // Fetching All Notes
  const fetchNotes = async () => {
    try {
      const response = await fetch(`${host}/api/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // Include authentication if necessary
        }
      });
      const json = await response.json();
      setNotes(json); // Assuming API returns an array of notes
    } catch (error) {
      console.error("Error fetching notes.", error);
    }
  };

  // Add a Note
  const addNote = async(title, description, tag) => {
    try {
      await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // Include authentication if necessary
        },
        body: JSON.stringify({title, description, tag})
      });
      fetchNotes();
    } catch (error) {
      console.error("Error adding notes.", error);
    }
  }
  // Edit a Note
  // Here once user clicked on Edit then id of that note accessed and saved in id and then matches with the Note id(_id).
  const editNote = async(id, title, description, tag) => {
    try {
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // Include authentication if necessary
        },
        body: JSON.stringify({title, description, tag})
      });
      fetchNotes();
    } catch (error) {
      console.error("Error updating notes.", error);
    }
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if(element._id === id){
      notes[i].title = title;
      notes[i].description = description;
      notes[i].tag = tag;
      }
    }
  }
  // Delete a Note
  // Here once user clicked on Delete then id of that note accessed and saved in id and then matches with the Note id(_id).
  // All the notes except that id will be saved in newNotes, and then it will updated the notes with setNotes.
  const deleteNote = async (id) => {
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // Include authentication if necessary
        }
      });
      fetchNotes();
    } catch (error) {
      console.error("Error deleting notes.", error);
    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;