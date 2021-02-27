import React from 'react';
import { getDate } from '../reusables/utilities';
import "./task-header.scss"

function TaskHeader({ completedTask, taskList }) {
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
          <span>{completedTask}</span>
        </div>

        <div className='app-body_memu'>Clear All Completed Task</div>
      </div>
    </div>
  );
}

export default TaskHeader;

//added task-header component, utilites.js file and then remove some reducant code from the app and TaskList components, also i removed some code from app.scss file 
