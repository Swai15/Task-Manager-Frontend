import React, { useState } from "react";
import { DeleteIcon, EditIcon, InfoCircle } from "../icons/icons";

const Task = ({ task }) => {
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [completed, setCompleted] = useState(task.completed);

  const handleDescriptionClick = () => {
    console.log("Description opened");
    setDescriptionModal(true);
  };

  const handleCloseModal = () => {
    setDescriptionModal(false);
  };

  const handleEditClick = async () => {
    setCompleted(!completed);
    console.log("Checkbox toggled");
  };

  const handleDeleteClick = () => {};

  const taskDueDate = new Date(task.due_date);
  const options = { day: "numeric", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(taskDueDate);

  // dynamic checkbox class name
  const taskTitleClassName = task.completed ? "task-title completed" : "task-title";

  return (
    <div className="task-row" key={task.id}>
      <input type="checkbox" checked={completed} onChange={handleEditClick} />

      <p className={taskTitleClassName}>{task.title}</p>
      {/* <p>{task.description}</p> */}
      <p className="task-date">{formattedDate} </p>
      <div className="task-icons">
        <InfoCircle onClick={handleDescriptionClick} />
        <EditIcon onClick={handleEditClick} />
        <DeleteIcon onClick={handleDeleteClick} />

        {descriptionModal && (
          <div className="task-modal">
            <p>{task.description}</p>
            <button onClick={handleCloseModal}></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
