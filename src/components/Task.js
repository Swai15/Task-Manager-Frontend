import React, { useEffect, useState } from "react";
import { DeleteIcon, EditIcon, InfoCircle } from "../icons/icons";

const Task = ({ task, setSelectedProject, activeProjectId }) => {
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [completed, setCompleted] = useState(task.completed);
  const [deleteModal, setDeleteModal] = useState(false);
  const [newTask, setNewTask] = useState({ ...task }); // can't get changed task.completed state. newTask gets the updated change

  // state not working as expected
  const URL = "http://127.0.0.1:8000/api/";

  const handleDescriptionClick = () => {
    console.log("Description opened");
    setDescriptionModal(true);
  };

  const handleCloseModal = () => {
    setDescriptionModal(false);
  };

  // Edit Completed checkbox
  const handleEditClick = async (e) => {
    console.log(task.completed);
    console.log("New task: ", newTask.completed);

    const updatedTask = { ...task, completed: !completed };
    handleUpdatedTask(updatedTask);
  };

  // update checked status in db
  const handleUpdatedTask = async (updatedTask) => {
    try {
      const response = await fetch(`${URL}tasks/${updatedTask.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      const data = await response.json();
      console.log("Task updated: ", data);

      if (response.ok) {
        console.log("Checkbox updated successfully");
        setCompleted(updatedTask.completed);
        setNewTask(data);
      } else {
        console.log("failed to update checkbox");
      }
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  //Delete Task

  const handleDeleteClick = () => {
    setDeleteModal(true);
  };
  const handleDeleteModal = () => {
    setDeleteModal(false);
  };

  const handleDeleteConfirmation = async (e) => {
    try {
      const response = await fetch(`${URL}tasks/${task.id}`, { method: "DELETE" });

      if (response.ok) {
        console.log("Task deleted successfully");

        const updatedList = await fetch(`${URL}projects/${activeProjectId}`);
        const updatedListData = await updatedList.json();
        setSelectedProject(updatedListData);
        console.log(updatedListData);
      } else {
        console.log("failed to delete task ");
      }
    } catch (error) {
      console.error("Error deleting task ", error);
    }
  };

  // Format date, month and date
  const taskDueDate = new Date(task.due_date);
  const options = { day: "numeric", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(taskDueDate);

  return (
    <div className="task-row" key={task.id}>
      <input type="checkbox" checked={completed} onChange={handleEditClick} />

      <p className={newTask.completed ? "task-title" : "task-title completed"}>{task.title}</p>
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

        {deleteModal && (
          <div className="delete-modal-overlay">
            <div className="delete-modal">
              <p>Are you sure you want to delete this task?</p>
              <div>
                <button type="button" className="btn btn-primary " onClick={handleDeleteConfirmation}>
                  Delete
                </button>
                <button type="submit" className="btn btn-secondary" onClick={handleDeleteModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Task;
