import { useState } from "react";
import { NoteContext } from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  //Get all notes

  const getNotes = async () => {
    //TODO API call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      // body:JSON.stringify({title,description,tag})
    });
    // console.log(response)
    const json = await response.json();
    // console.log(json)
    setNotes(json);
    // setNotes(notes.concat(note))
  };

  //Add a note
  const addNote = async (title, description, tag) => {
    //TODO API call
    // console.log(localStorage.getItem('token'))
    console.log(localStorage.getItem("token"));
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }),
    });

    // console.log(JSON.stringify({ title, description, tag }))
    const note = await response.json();
    console.log(note);
    // const note = json
    setNotes(notes.concat(note));
  };
  //Delete a note
  const deleteNote = async (id) => {
    console.log(localStorage.getItem("token"));
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    // const json = response.json()
    // console.log(json)
    // console.log("Note is deleting...")
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    console.log(newNotes);
    setNotes(newNotes);
  };
  //Edit a note
  const editNote = async (id, title, description, tag) => {
    console.log(id);
    // console.log(title);
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // const json = response.json();
    // console.log(json);
    let newNotes = JSON.parse(JSON.stringify(notes));
    //API call
    for (let i = 0; i < newNotes.length; i++) {
      const element = newNotes[i];
      if (element._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
        break;
      }
    }
    setNotes(notes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {" "}
      {props.children}{" "}
    </NoteContext.Provider>
  );
};

export default NoteState;
