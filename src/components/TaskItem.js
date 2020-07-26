import React from "react";
import highPrioIcon from "../icons/high_priority.png";
import mediumPrioIcon from "../icons/medium_priority.png";
import lowPrioIcon from "../icons/low_priority.png";
import "./TaskItem.css";

const TaskItem = (props) => {
    // debugger;
  const { prio, description, createdOn, deadlineDate } = props;
  const taskIcon =
    prio === "high"
      ? highPrioIcon
      : prio === "medium"
      ? mediumPrioIcon
      : prio === "low"
      ? lowPrioIcon
      : "";
  return (
    <div>
      <div className="primary-line">
        <img width="25px" src={taskIcon} alt="prio icon" />
        {description}
      </div>
      <div className="secondary-line">
        <span>Created on: {new Date(createdOn).toDateString()}</span>
        {deadlineDate && <span>Deadline: {new Date(deadlineDate).toDateString()}</span>}
      </div>
    </div>
  );
};

export default TaskItem;
