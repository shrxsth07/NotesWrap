import React, { useContext, useState } from "react";
import { NoteContext } from "../context/notes/noteContext";

function AddNote(props) {
  const context = useContext(NoteContext);
  const { notes, addNote } = context;
  const [note, setNote] = useState({ title: "", description: "", tag: "" });
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Added Successfully", "success");
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="container my-3">
        <h1> Add Note </h1>
        <form className="container my-3">
          <div className="form-group">
            <label htmlFor="title"> Title </label>{" "}
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              value={note.title}
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
              id="description"
              value={note.description}
              name="description"
              minLength={3}
              required
              onChange={onChange}
            />{" "}
          </div>
          <div className="form-group">
            <label htmlFor="tag"> Tag </label>{" "}
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              minLength={3}
              required
            />
          </div>
          <button
            type="submit"
            disabled={
              note.title.length < 5 ||
              note.description.length < 3 ||
              note.tag.length < 3
            }
            className="btn btn-primary"
            onClick={handleClick}
          >
            {" "}
            Add Note{" "}
          </button>{" "}
        </form>{" "}
      </div>
    </div>
  );
}

export default AddNote;
