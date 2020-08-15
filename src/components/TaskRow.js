import React from "react";
import { useDrop } from "react-dnd";
import { TaskItemType } from "./Constants";

function TaskRow({i, children}) {
  const [{ isOver }, drop] = useDrop({
    accept: TaskItemType.TASKITEM,
    drop: (itm, monitor) => {
      console.log("itm", itm);
      console.log("monitor", monitor);
      debugger;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver()
    }),
  });

  return (
  <div ref={drop}>
      {children}
   </div>);
}

export default TaskRow;
