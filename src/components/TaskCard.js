import React from "react";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import TaskItem from "./TaskItem";

const TaskCard = (props) => {
  const { title, taskList } = props;
  console.log("taskList", taskList);
  const type = title.includes("High")
    ? "high"
    : title.includes("Medium")
    ? "medium"
    : title.includes("Low")
    ? "low"
    : title.includes("Completed")
    ? "completed"
    : "";
  return (
    <div>
      <Card>
        <CardHeader
          className={`card-header font-header-${type}`}
          title={title}
        />
        <CardContent className="card-content">
          {taskList.map((itm) => (
            <TaskItem
              prio={itm.priority}
              deadlineDate={itm.deadlineDate}
              description={itm.description}
              createdAt={itm.createdAt}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCard;
