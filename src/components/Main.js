import React, { useState, useEffect, useCallback } from "react";
import TaskCard from "./TaskCard";
import { Container, IconButton } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./Main.css";
import AddTaskModal from "./AddTaskModal";
import TaskHandler from "../api/TaskHandler";
const GENERIC_ERROR = "Some error happened. Pleas try again later.";

const Main = () => {
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);
  const [highTasks, setHighTasks] = useState([]);
  const [mediumTasks, setMediumTasks] = useState([]);
  const [lowTasks, setLowTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const fetchTasks = useCallback(() => {
    TaskHandler.getAllTasks()
      .then((res) => {
        setTasks(res.data.data);
      })
      .catch((err) => {
        setShowError(true);
      });
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const setTasks = (data) => {
    let highAr = [],
      midArr = [],
      lowArr = [],
      completedArr = [];
    for (let i = 0; i < data.length; i++) {
      let itm = data[i];
      if (itm.priority === "high") {
        highAr.push(itm);
      } else if (itm.priority === "medium") {
        midArr.push(itm);
      } else if (itm.priority === "low") {
        lowArr.push(itm);
      } else if (itm.completed) {
        completedArr.push(itm);
      }
    }
    setHighTasks(highAr);
    setMediumTasks(midArr);
    setLowTasks(lowArr);
    setCompletedTasks(completedArr);
  };

  const onAddTask = () => setShowModal(true);

  const onDismiss = () => setShowModal(false);

  const createTask = (data) => {
    data.completed = false;
    if (!data.deadlineDate) {
      delete data.deadlineDate;
    }
    TaskHandler.createTask(data)
      .then((res) => {
        fetchTasks();
        setShowModal(false);
      })
      .catch((err) => {
        setShowModal(false);
      });
  };

  return (
    <Container>
      <div className="title">
        <h3>Tasker</h3>
      </div>
      {showError && <Alert severity="error">{GENERIC_ERROR}</Alert>}
      <div className="card-container">
        <TaskCard taskList={highTasks} title="High Prio" />
        <TaskCard taskList={mediumTasks} title="Medium Prio" />
        <TaskCard taskList={lowTasks} title="Low Prio" />
        <TaskCard
          className="completed-card"
          taskList={completedTasks}
          title="Completed Tasks"
        />
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
