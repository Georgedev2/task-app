import React from "react";
import "./task-list.scss";

const TaskList = ({
  taskList,
  onToggleRowModal,
  onDeleteATaskItem,
  onMoveClickedTaskToTop,
  onHandleInprogress,
  onHandleCompleted,
  onCloseTaskMenu,
}) => {
  return (
    <div className="row-list">
      {taskList.map((task, index) => (
        <div
          className={`row ${task.inprogress && "inprogress"} 
          ${task.completed && "completed"}`}
          key={task.id}
        >
          <div className={`row_title ${task.completed && "line-Through"}`}>
            {task.title}
          </div>

          <div className="row_menu-wrapper">
            <div className="menu-btn">
              <span
                onClick={() => {
                  onToggleRowModal(task.id);
                }}
              >
                &#x22EE;
              </span>
            </div>
            <ul className={`menu ${task.openTaskModal && "showMenu"}`}>
              <span className="menu-close-btn"
                onClick={() => {
                  onCloseTaskMenu();
                }}
              >
                X
              </span>
              <li
                onClick={() => {
                  onHandleCompleted(task.id);
                }}
              >
                Completed
              </li>
              <li
                onClick={() => {
                  onHandleInprogress(task.id);
                }}
              >
                Inprogress
              </li>
              <li
                onClick={() => {
                  onDeleteATaskItem(task.id);
                }}
              >
                Delete
              </li>
              <li
                onClick={() => {
                  onMoveClickedTaskToTop(task, index);
                }}
              >
                &#x2191;
              </li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
