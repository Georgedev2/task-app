import React from 'react';
import { getDate } from '../reusables/utilities';
import './task-header.scss';

function TaskHeader({ taskList, ClearAllCompletedTasks }) {
  const getTotalCompletedTask = (arg) => {
    // GET THE TOTAL NUMBER OF ALL COMPLETED TASKS
    let allCompletedTasks = arg.filter((task) => task.completed === true);
    return allCompletedTasks.length;
  };

  return (
    <div className='app-body'>
      <div className='app-body_date'>
        <span>Task for</span> <span>{getDate()}</span>
      </div>
      <div className='app-body_memu'>
        <div className='menu-first-child'>
          <span>Total Task</span>
          <span>{taskList.length}</span>
        </div>
        <div className='app-body_memu'>
          <span>Total Completed Task</span>
          <span>{getTotalCompletedTask(taskList)}</span>
        </div>

        <div className='app-body_memu' onClick={()=>{ClearAllCompletedTasks(taskList)}}>
          Clear All Completed Task
        </div>
      </div>
    </div>
  );
}

export default TaskHeader;
