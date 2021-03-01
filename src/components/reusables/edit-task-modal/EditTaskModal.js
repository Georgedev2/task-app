import React from 'react';
import "./edit-task-modal.scss"

function EditTaskModal() {
  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <input type='text' className='task-modal-input' />
        <button>Update Task</button>
      </div>
    </div>
  );
}

export default EditTaskModal;
