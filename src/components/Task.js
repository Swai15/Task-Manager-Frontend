import React, { useState } from "react";
import { DeleteIcon, EditIcon, InfoCircle } from "../icons/icons";

const Task = ({ task }) => {
  const [descriptionModal, setDescriptionModal] = useState(false);

  const handleDescriptionClick = () => {
    console.log("Description opened");
    setDescriptionModal(true);
  };

  const handleCloseModal = () => {
    setDescriptionModal(false);
  };

  const handleEditClick = () => {};

  const handleDeleteClick = () => {};

  const taskDueDate = new Date(task.due_date);
  const options = { day: "numeric", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(taskDueDate);

  return (
    <div className="task-row" key={task.id}>
      <input type="checkbox" />
      <p className="task-title">{task.title}</p>
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
