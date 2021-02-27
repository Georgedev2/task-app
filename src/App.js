import { useState, useEffect } from 'react';
import './App.scss';
import TaskHeader from './components/task-header/TaskHeader';

import { v4 as uuidv4 } from 'uuid';

/* --------- IMPORTING COMPONENTS ----------- */
import TaskInput from './components/task-input/TaskInput';
import TaskList from './components/task-list/TaskList';

function App() {
  const tasks = localStorage.getItem('taskApp')
    ? JSON.parse(localStorage.getItem('taskApp'))
    : [];
  const [taskList, setTasklist] = useState(tasks);
  const [completedTask, setCompletedTask] = useState(0);

  //SYNC WITH LOCALSTORAGE & LOCAL STATE
  let sync = (_taskList) => {
    setTasklist(_taskList);
    localStorage.setItem('taskApp', JSON.stringify(_taskList));
    getTotalCompletedTask();
  };

  //ADD TO TASK LIST FROM TASK INPUT
  const addToTaskList = (e) => {
    let inputValue = e.target.value;
    if (inputValue && e.key === 'Enter') {
      let _taskList = [
        ...taskList,
        {
          id: uuidv4(),
          title: inputValue,
          completed: false,
          inprogress: false,
          openTaskModal: false,
        },
      ];
      // clear the input  field
      e.target.value = '';
      //sync with local state and local storage
      sync(_taskList);
    }
  };

  //TOGGLE A TASK MODAL
  const toggleRowModal = (id) => {
    const modifiedTaskList = taskList.map((task) => {
      if (task.id === id) {
        task.openTaskModal = true;
        return task;
        // Here we modify each property of the array element passed to the map function and then return it.
      } else {
        task.openTaskModal = false;
        return task;
      }
    });
    //sync with local state and local storage
    sync(modifiedTaskList);
  };

  //DELETE A TASK ITEM
  const deleteATaskItem = (id) => {
    //This will filter out the task that was clicked from the task list and the sync the resulting tasklist
    const filteredItem = taskList.filter((el) => {
      return el.id !== id;
    });
    //sync with local state and local storage
    sync(filteredItem);
  };

  //MOVE CLICK TASK TO TO
  const moveClickedTaskToTop = (id, idx, task) => {
    //make copy of the taskList using the array map method
    const taskListCopy = taskList.map((el) => el);
    taskListCopy.splice(idx, 1);
    taskListCopy.unshift(task);

    //sync with local state and local storage
    sync(taskListCopy);
  };

  //TURN THE INPROGRESS PROPERTY OF THE CLICKED TASK TO TRUE
  const handleInprogress = (id) => {
    const taskListCopy = taskList.map((task) => {
      if (task.id === id) {
        task.inprogress = true;
        return task;
      } else {
        return task;
      }
    });
    //sync with local state and local storage
    sync(taskListCopy);
  };

  //TURN THE COMPLETED PROPERTY OF THE CLICKED TASK TO TRUE
  const handleCompleted = (id) => {
    const taskListCopy = taskList.map((task) => {
      if (task.id === id) {
        task.completed = true;
        return task;
      } else {
        return task;
      }
    });
    sync(taskListCopy);
  };

  // TOTAL COMPLETED TASKS
  const getTotalCompletedTask = () => {
    let totalCompletedTasks = taskList.filter(
      (task) => task.completed === true
    );
    setCompletedTask(totalCompletedTasks.length);
  };
  // CLOSE MENU MODAL
  const closeTaskMenu = () => {
    const taskListCopy = taskList.map((task) => {
      task.openTaskModal = false;
      return task;
    });
    sync(taskListCopy);
  };

  //FOR DEVELOPMENT PURPOSE
  useEffect(() => {
    //console.log(taskList);
    // localStorage.clear()
  });
  return (
    <div className='App'>
      <header className='App-header'>
        <TaskHeader taskList={taskList} completedTask={completedTask} />
      </header>

      <main className='App-body'>
        <div>
          <TaskInput addToTaskList={addToTaskList} />
        </div>
        <TaskList
          taskList={taskList}
          setTasklist={setTasklist}
          handles={[
            { handle: closeTaskMenu, label: 'Close Menu' },
            { handle: deleteATaskItem, label: 'Delete Task' },
            { handle: moveClickedTaskToTop, label: 'Move To Top' },
            { handle: handleInprogress, label: 'In progress' },
            { handle: handleCompleted, label: 'Completed' },
          ]}
          onToggleRowModal={toggleRowModal}
        />
      </main>
      <footer className='App-footer'></footer>
    </div>
  );
}

export default App;
//git commmit -a -m

