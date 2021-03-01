import './task-list.scss';
//import { useEffect } from 'react';

function TaskList(props) {
  const { taskList, handles, openTheClickedTaskMenu } = props;

  

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
          {/* task-menu-wrapper task-menu_btn */}
          <div className='row_menu-wrapper'>
            <div
              className='menu-btn'
              onClick={() => openTheClickedTaskMenu(task.id)}
            >
              {/* Returns vertical tripple dots like this ⋮  */}
              <span>&#x22EE;</span>
            </div>

            <ul className={`task-menu ${task.openTaskModal && 'showMenu'}`}>
              {handles.map((el, idx) => {
                if (el.label === 'Close Menu') {
                  //label: 'Close Menu'
                  return (
                    <li
                      key={idx}
                      onClick={() => {
                        el.handle(taskList);
                      }}
                    >
                      {el.label}
                    </li>
                  );
                } else {
                  return (
                    <li
                      key={idx}
                      onClick={() => {
                        el.handle(task.id, index, task);
                      }}
                    >
                      {el.label}
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
