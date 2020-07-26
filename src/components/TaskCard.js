import React from "react";
import { Card, CardHeader, CardContent } from "@material-ui/core";
import TaskItem from "./TaskItem";

const TaskCard = (props) => {
  const { title, taskList } = props;
  console.log('taskList', taskList);
  return (
    <div>
      <Card>
        <CardHeader title={title} />
        <CardContent>
          {taskList.map((itm) => (
            <TaskItem
              prio={itm.priority}
              deadlineDate={itm.deadlineDate}
              description={itm.description}
              createdOn={itm.createdOn}
            />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default TaskCard;
