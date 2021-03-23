import { useState, useEffect } from 'react';
import './edit-task-modal.scss';
import Button from '../buttons/Button';

function EditTaskModal({editingTaskIfor}) {
  const [editForm, setEditForm] = useState({
    key: editingTaskIfor[0].title,
    //title
   // key:''
  });


  //HANDLES CHANGE IN FORM FIELD VALUES
  const handleChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };
  useEffect(() => {
   // console.log(editForm.key);
    console.log(editingTaskIfor)
  });

  return (
    <div className='modal-overlay'>
      <div className='modal'>
        <input
          type='text'
          className='task-modal-input'
          placeholder='Update task'
          name='key'
          value={editForm.key}
          onChange={handleChange}
        />
        <Button label='Update Task' />
      </div>
    </div>
  );
}

export default EditTaskModal;
