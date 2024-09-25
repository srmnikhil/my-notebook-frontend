import { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from '../Components/AddNote';
import { useNavigate } from 'react-router-dom';
import NoteList from '../Components/NoteList';
import EditModal from '../Components/EditModal';

const Dashboard = ({ showToast, setLoading, loading }) => {
  let navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const context = useContext(noteContext);
  const { notes, fetchNotes } = context;
  const [currentNote, setCurrentNote] = useState({ utitle: "", udescription: "", utag: "" });
  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetchNotes();
      /* eslint-disable */
    }
    else {
      navigate("/login", { replace: true });
    }
  }, [])
  const updateNote = (updatedNote) => {
    setCurrentNote(updatedNote);
    setModalOpen(true);
  }
  const closeModal = () => {
    setModalOpen(false);
  }
  return (
    <>
      <div className="d-flex mx-4 my-4">
        <div className="col-12 col-md-6 mb-4"  style={{ flex: '1', marginRight: '10px' }}>
          <AddNote showToast={showToast} setLoading={setLoading} loading = {loading}/>
        </div>
        <div className='col-12 col-md-6 mb-4' style={{ flex: '1' }}>
          <NoteList notes={notes} updateNote={updateNote} showToast={showToast} />
        </div>
      </div>
      <div>
        <EditModal note={currentNote} setNote={setCurrentNote} modalOpen={modalOpen} closeModal={closeModal} showToast={showToast} />
      </div>
    </>
  )
}

export default Dashboard;


