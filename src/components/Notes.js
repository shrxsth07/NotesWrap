import React, { useContext, useEffect, useRef, useState } from "react";
import Noteitem from "./Noteitem";
import { NoteContext } from "../context/notes/noteContext";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const context = useContext(NoteContext);
  let history = useNavigate();
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      history("/login");
    }
  });
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

  const updateNote = (id, currentNote) => {
    ref.current.click();
    setNote({
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
      _id: id,
    });
    // props.showAlert("Updated Successfully", "success");
    // props.showAlert("Invalid Detials", "danger");
  };
  const handleClick = (e) => {
    // console.log(note);
    editNote(note._id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    props.showAlert("Updated Successfully", "success");
    // addNote(note.title, note.description, note.tag);
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  // const ref = useRef(null);
  return (
    <>
      <AddNote showAlert={props.showAlert} />{" "}
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-toggle="modal"
        data-target="#exampleModal"
      >
        Launch demo modal{" "}
      </button>{" "}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        ari-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note{" "}
              </h5>{" "}
              <button
                type="button"
                className="btn-close"
                data-dismiss="modal"
                arilabel="Close"
              ></button>{" "}
            </div>{" "}
            <div className="modal-body">
              <form className="container my-3">
                <div className="form-group">
                  <label htmlFor="title"> Title </label>{" "}
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                    required
                  />
                </div>{" "}
                <div className="form-group">
                  <label htmlFor="description"> Description </label>{" "}
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    name="edescription"
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>{" "}
                <div className="form-group">
                  <label htmlFor="tag"> Tag </label>{" "}
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    minLength={3}
                    required
                  />
                </div>{" "}
              </form>{" "}
            </div>{" "}
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                Close{" "}
              </button>{" "}
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleClick}
                disabled={
                  note.etitle.length < 5 ||
                  note.edescription.length < 3 ||
                  note.etag.length < 3
                }
              >
                Update Note{" "}
              </button>{" "}
            </div>{" "}
          </div>{" "}
        </div>{" "}
      </div>{" "}
      <div className="container md-3">
        <h1> Your Notes </h1>{" "}
        <div className="row md-3 d-flex">
          {" "}
          {notes.length === 0 && "No notes to display"}{" "}
          {notes.map((note) => {
            return (
              <Noteitem
                note={note}
                key={note._id}
                updateNote={() => {
                  updateNote(note._id, note);
                }}
                showAlert={props.showAlert}
              />
            );
          })}{" "}
        </div>{" "}
      </div>{" "}
    </>
  );
}

export default Notes;
