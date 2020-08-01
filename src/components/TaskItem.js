import React from "react";
import highPrioIcon from "../icons/high_priority.png";
import mediumPrioIcon from "../icons/medium_priority.png";
import lowPrioIcon from "../icons/low_priority.png";
import "./TaskItem.css";
import { TaskItemType } from "./Constants";
import { useDrag } from "react-dnd";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const TaskItem = (props) => {
  const [{ isDragging }, drag] = useDrag({
    item: { type: TaskItemType.TASKITEM },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

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
    <div ref={drag} className="task-item">
      <div className="primary-line">
        <img width="25px" src={taskIcon} alt="prio icon" />
        {description}
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className="secondary-line">
        <span>Created on: {new Date(createdOn).toDateString()}</span>
        {deadlineDate && (
          <span>Deadline: {new Date(deadlineDate).toDateString()}</span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
