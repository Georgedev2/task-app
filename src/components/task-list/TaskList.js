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

{
  /*    <span
                className='menu-close-btn'
                onClick={() => {
                  onCloseTaskMenu();
                }}
              >
                X
              </span> */
}

{
  /*   <li
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
              </li>  */
}
/*     onDeleteATaskItem,
    onMoveClickedTaskToTop,
    onHandleInprogress,
    onHandleCompleted,
    onCloseTaskMenu, */

/* {[
            { handle: deleteATaskItem, label: 'Delete' },
            { handle: moveClickedTaskToTop, label: 'Move To Top' },
            { handle: handleInprogress, label: 'In progress' },
            { handle: handleCompleted, label: 'Completed' },
            { handle: closeTaskMenu, label: 'X' },
          ]} */

/*  useEffect(() => {
 //   console.log(handles);
  }); */
