import './task-list.scss';
//import { useEffect } from 'react';

function TaskList(props) {
  const { taskList, handles, onToggleRowModal } = props;

  return (
    <div className='task-list'>
      {taskList.map((task, index) => (
        <div
          className={`a-task 
          ${task.inprogress && 'inprogress'} 
          ${task.completed && 'completed'}`}
          key={task.id}
        >
          <div className={`row_title ${task.completed && 'line-Through'}`}>
            {task.title}
          </div>

          <div className='row_menu-wrapper'>
            <div
              className='menu-btn'
              onClick={() => {
                onToggleRowModal(task.id);
              }}
            >
              {/* Returns vertical tripple dots like this ⋮  */}
              <span>&#x22EE;</span>
            </div>

            <ul className={`task-menu ${task.openTaskModal && 'showMenu'}`}>
              {handles.map((el, idx) => (
                <li
                  key={idx}
                  onClick={() => {
                    el.handle(task.id, index, task);
                  }}
                >
                  {el.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
