import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

const EditModal = ({ showToast, note, setNote, modalOpen, closeModal }) => {
  const context = useContext(noteContext);
  const { editNote } = context;

  const handleClick = () => {
    closeModal();
    editNote(note.id, note.utitle, note.udescription, note.utag);
    showToast("Note edited successfully", "success");
  };

  const onChange = (evt) => {
    setNote({ ...note, [evt.target.name]: evt.target.value });
  };

  return (
    <>
      <div className={`modal fade ${modalOpen ? 'show' : 'hide'}`} style={{ display: modalOpen ? 'block' : 'none' }} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden={!modalOpen}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Update Note</h1>
              <button type="button" className="btn-close" onClick={closeModal} aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="utitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="utitle" name='utitle' value={note.utitle} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="udescription" className="form-label">Description</label>
                  <textarea type="text" className="form-control" id='udescription' name='udescription' rows="6" value={note.udescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="utag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id='utag' name='utag' value={note.utag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-danger" onClick={closeModal}>Close</button>
              <button className="btn btn-primary" type="button" onClick={handleClick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>
      {modalOpen && <div className="modal-backdrop fade show" onClick={closeModal}></div>}
    </>
  );
};

export default EditModal;
