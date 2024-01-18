import React, { createContext, useContext, useEffect, useState } from "react";
import { DeleteIcon, EditIcon, InfoCircle } from "../icons/icons";
import EditTaskForm from "./EditTaskForm";
import updateProjectList from "../utils/UpdateProjectList";
import AuthContext from "../context/AuthContext";

const Task = ({ task, projects, setProjects, setSelectedProject, activeProjectId }) => {
  const { authTokens } = useContext(AuthContext);
  const [descriptionModal, setDescriptionModal] = useState(false);
  const [completed, setCompleted] = useState(task.completed);
  const [deleteModal, setDeleteModal] = useState(false);
  const [projectTitle, setProjectTitle] = useState(""); // New state to store the project title
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [newTask, setNewTask] = useState({ ...task }); // can't get changed task.completed state. newTask gets the updated change

  const [editModal, setEditModal] = useState(false);

  const URL = "http://127.0.0.1:8000/api/";

  // description click
  const handleDescriptionClick = () => {
    console.log("Description opened");
    setIsModalOpen(true);
    const project = projects.find((project) => project.id === task.project);
    if (project) {
      setProjectTitle(project.title);
    }
    setDescriptionModal(true);
  };

  // Description Modal
  const handleCloseModal = () => {
    console.log("Description closed");
    setDescriptionModal(false);
    setIsModalOpen(false);
  };

  //edit task click
  const handleEditTaskCLick = () => {
    setEditModal(true);
    setIsModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModal(false);
    setIsModalOpen(false);
  };

  // Edit Completed checkbox
  const handleEditClick = async (e) => {
    console.log(task.completed);
    console.log("New task: ", newTask.completed);
    console.log(authTokens.access);

    const updatedTask = { ...task, completed: !completed };
    HandleCheckTask(updatedTask);
  };

  // update checked status in db
  const HandleCheckTask = async (updatedTask) => {
    try {
      const response = await fetch(`${URL}tasks/${updatedTask.id}/`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + String(authTokens.access),
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
    setIsModalOpen(true);
  };
  const handleDeleteModal = () => {
    setDeleteModal(false);
    setIsModalOpen(false);
  };

  const handleDeleteConfirmation = async (e) => {
    try {
      const response = await fetch(`${URL}tasks/${task.id}`, { method: "DELETE" });

      if (response.ok) {
        console.log("Task deleted successfully");
        updateList();
        updateProjectList(setProjects, authTokens);
      } else {
        console.log("failed to delete task ");
      }
    } catch (error) {
      console.error("Error deleting task ", error);
    }
  };

  // update task list after change
  const updateList = async () => {
    try {
      const updatedList = await fetch(`${URL}projects/${activeProjectId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authTokens.access}`,
        },
      });
      const updatedListData = await updatedList.json();
      setSelectedProject(updatedListData);
      console.log(updatedListData);
    } catch (error) {
      console.error("Failed to update task list: ", error);
    }
  };

  // Get priority classes
  const setPriorityClass = () => {
    switch (task.priority) {
      case "Low":
        return "low-priority-border";
      case "Medium":
        return "medium-priority-border";
      case "High":
        return "high-priority-border";
      default:
        return "";
    }
  };

  // Format date, month and date
  const taskDueDate = new Date(task.due_date);
  const options = { day: "numeric", month: "long" };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(taskDueDate);

  return (
    // <div className="task-row task-row-style" key={task.id}>
    <div className={`task-row task-row-style ${isModalOpen ? "modal-open" : "modal-close"}`} key={task.id}>
      <input type="checkbox" checked={completed} onChange={handleEditClick} className={setPriorityClass()} />

      <p className={newTask.completed ? "task-title completed" : "task-title "}>{task.title}</p>
      <p className="task-date">{formattedDate} </p>
      <div className="task-icons">
        <InfoCircle onClick={handleDescriptionClick} />
        <EditIcon onClick={handleEditTaskCLick} />
        <DeleteIcon onClick={handleDeleteClick} />

        {/* Description modal */}
        {descriptionModal && (
          <div className={`description-modal-overlay ${isModalOpen ? "modal-open" : ""}`}>
            <div className="description-modal card p-4 w-75">
              <h4 className="mb-4 description-heading">{task.title}</h4>
              <p className="mb-2">
                <strong>Project:</strong> {projectTitle}
              </p>
              <p className="mb-2">
                <strong>Priority:</strong> {task.priority}
              </p>
              <p className="mb-2">
                <strong>Due Date:</strong> {task.due_date}
              </p>
              {task.description && (
                <p className="mb-2">
                  <strong>Details:</strong> {task.description}
                </p>
              )}

              <div className="mt-4">
                <button type="text" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {editModal && <EditTaskForm setProjects={setProjects} taskToEdit={task} projects={projects} onCloseEditModal={handleCloseEditModal} setSelectedProject={setSelectedProject} activeProjectId={activeProjectId} />}

        {/* Delete Modal */}
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
