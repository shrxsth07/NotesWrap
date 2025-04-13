import React from "react";
// import { NoteContext } from "../context/notes/noteContext";
import Notes from "./Notes";
// import AddNote from "./Notes";
const Home = (props) => {
  const { showAlert } = props;
  return (
    <div>
      <Notes showAlert={showAlert} />
    </div>
  );
};

export default Home;
