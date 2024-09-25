import React, { useState, useCallback } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const [visible, setVisible] = useState(null);
  const host = process.env.REACT_APP_BACKEND_URL;
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const showToast = useCallback((message, type) => {
    setVisible({ msg: message, type })
    setTimeout(() => {
      setVisible("");
    }, 3000);
  }, []);

  // Fetching All Notes
  const fetchNotes = async () => {
    setLoading(true);
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
      setLoading(false);
      showToast("Notes fetched successfully", "success");
    } catch (error) {
      setLoading(false);
      console.error("Error fetching notes.", error);
      showToast("Failed to fetch notes", "danger");
    } finally{
      setLoading(false);
    }
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    setLoading(true);
    try {
      await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // Include authentication if necessary
        },
        body: JSON.stringify({ title, description, tag })
      });
      setLoading(false);
      fetchNotes();
      showToast("Note added successfully", "success");
    } catch (error) {
      setLoading(false);
      console.error("Error adding notes.", error);
      showToast("Failed to add note", "danger");
    }finally{
      setLoading(false);
    }
  }
  // Edit a Note
  // Here once user clicked on Edit then id of that note accessed and saved in id and then matches with the Note id(_id).
  const editNote = async (id, title, description, tag) => {
    setLoading(true);
    try {
      await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // Include authentication if necessary
        },
        body: JSON.stringify({ title, description, tag })
      });
      setLoading(false);
      fetchNotes();
      showToast("Note edited successfully", "success");
    } catch (error) {
      setLoading(false);
      console.error("Error editing notes.", error);
      showToast("Failed to edit note", "danger");
    } finally{
      setLoading(false);
    }
    for (let i = 0; i < notes.length; i++) {
      const element = notes[i];
      if (element._id === id) {
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
    setLoading(true);
    try {
      await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token') // Include authentication if necessary
        }
      });
      setLoading(false);
      fetchNotes();
      showToast("Note deleted successfully", "success");
    } catch (error) {
      setLoading(false);
      console.error("Error deleting note.", error);
      showToast("Failed to delete note", "success");
    } finally{
      setLoading(false);
    }
  }
  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, fetchNotes, loading}}>
      {props.children}
      <Toast visible={visible}/>
    </NoteContext.Provider>
  )
}

export default NoteState;

export const Toast = ({visible}) => {
  return (
      <div>
          {visible && (
              <div className={`toast align-items-center text-bg-${visible.type} float-end border-0 show`} role="alert" aria-live="assertive" aria-atomic="true" style={{ position: 'fixed', bottom: '1rem', right: '1rem', zIndex: "10" }}>
                  <div className="d-flex">
                      <div className="toast-body">
                          {visible.msg}
                      </div>
                      <button type="button" className="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
                  </div>
              </div>
          )}
      </div>
  )
}