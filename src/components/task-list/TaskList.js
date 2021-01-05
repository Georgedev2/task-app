import React from "react";
import "./task-list.scss";

const TaskRow = ({ taskList, onToggleRowModal, onDeleteATaskItem }) => {
  return (
    <div className="row-list">
      {taskList.map((task) => (
        <div className="row" key={task.id}>
          {/*  <div className="row_numb">{task.id}.</div> */}

          <div className="row_title">{task.title}</div>

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
              <span>X</span>
              <li>Completed</li>
              <li>Inprogress</li>
              <li
                onClick={() => {
                  onDeleteATaskItem(task.id);
                }}
              >
                Delete
              </li>
              <li>&#x2191;</li>
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskRow;
