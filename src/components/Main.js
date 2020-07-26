import React, { useState } from "react";
import TaskCard from "./TaskCard";
import { Container, IconButton } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./Main.css";
import AddTaskModal from "./AddTaskModal";

const Main = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [highTasks, setHighTasks] = useState([]);
  const [mediumTasks, setMediumTasks] = useState([]);
  const [lowTasks, setLowTasks] = useState([]);
  const onAddTask = () => setShowModal(true);

  const onDismiss = () => setShowModal(false);

  const createTask = (data) => {
    // /description, priority, createdOn, deadlineDate
    // debugger;
    const priority = data.priority;
    const setTasks =
      priority === "high"
        ? setHighTasks
        : priority === "medium"
        ? setMediumTasks
        : priority === "low"
        ? setLowTasks
        : "";

    setTasks((t) => {
      // t.push(data);
      let arr = [].concat(t);
      arr.push(data);
      return arr;
    });
    setShowModal(false);
  };

  return (
    <Container>
      <div className="title">
        <h3>Tasker</h3>
      </div>
      <div>
        <TaskCard taskList={highTasks} title="High Prio" />
      </div>
      <IconButton
        onClick={onAddTask}
        className="add-button"
        aria-label="Add Task"
        component="span"
      >
        <AddCircleIcon />
      </IconButton>
      {showModal && (
        <AddTaskModal
          visible={showModal}
          createTask={createTask}
          onDismiss={onDismiss}
        />
      )}
    </Container>
  );
};

export default Main;
