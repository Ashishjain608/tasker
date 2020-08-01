import React from "react";
import "./App.css";
import Main from "./components/Main";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Main />
      </div>
    </DndProvider>
  );
}

export default App;
