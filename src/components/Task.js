import React from "react";

const Task = ({ task }) => {
  return (
    <div key={task.id}>
      <h4>{task.title}</h4>
      <p>{task.description}</p>
      <small>{task.due_date} </small>
    </div>
  );
};

export default Task;
