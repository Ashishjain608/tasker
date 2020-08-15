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
  const { prio, description, createdAt, deadlineDate } = props;
  const taskIcon =
    prio === "high"
      ? highPrioIcon
      : prio === "medium"
      ? mediumPrioIcon
      : prio === "low"
      ? lowPrioIcon
      : "";

  const getDateString = (time) => {
    const date = new Date(time);
    const dateStr = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    return dateStr;
  };

  return (
    <div ref={drag} className="task-item">
      <div className="primary-line">
        <img
          className="task-item-img"
          width="25px"
          src={taskIcon}
          alt="prio icon"
        />
        <span className="task-item-text">{description}</span>
        <IconButton className="task-item-btn">
          <MoreVertIcon />
        </IconButton>
      </div>
      <div className="secondary-line">
        <span>Created on: {getDateString(createdAt)}</span>
        {deadlineDate && (
          <span>Deadline: {getDateString(deadlineDate)}</span>
        )}
      </div>
    </div>
  );
};

export default TaskItem;
