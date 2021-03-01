import { useState, useEffect } from 'react';
import './App.scss';
import TaskHeader from './components/task-header/TaskHeader';
import EditTaskModal from './components/reusables/edit-task-modal/EditTaskModal';

import { v4 as uuidv4 } from 'uuid';

/* --------- IMPORTING COMPONENTS ----------- */
import TaskInput from './components/task-input/TaskInput';
import TaskList from './components/task-list/TaskList';

function App() {
  //SETTING OF STATES
  const tasks = localStorage.getItem('taskApp')
    ? JSON.parse(localStorage.getItem('taskApp'))
    : [];
  const [taskList, setTasklist] = useState(tasks);

  //SYNC WITH LOCALSTORAGE & LOCAL STATE
  let sync = (_taskList) => {
    setTasklist(_taskList);
    localStorage.setItem('taskApp', JSON.stringify(_taskList));
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

  //THIS WILL OPEN THE CLICKED TASK MENU
  const openTheClickedTaskMenu = (id) => {
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

    //Close the task menu & then sync with local state and local storage
    closeTaskMenu(filteredItem);
  };

  //MOVE CLICK TASK TO TO
  const moveClickedTaskToTop = (id, idx, task) => {
    //make copy of the taskList using the array map method
    const taskListCopy = taskList.map((el) => el);
    taskListCopy.splice(idx, 1);
    taskListCopy.unshift(task);

    //Close the task menu & then sync with local state and local storage
    closeTaskMenu(taskListCopy);
  };

  //TURN THE INPROGRESS PROPERTY OF THE CLICKED TASK TO TRUE
  const handleInprogress = (id) => {
    //When Inprogress button is clicked turn all task whose completed==true to false then return the modified task
    let taskListCopy = taskList.map((task) => {
      if (task.id === id) {
        task.completed = false;
        return task;
      } else {
        return task;
      }
    });

    // then turn all the all task whose inprogress==false except for the one that was clicked to true
    taskListCopy = taskList.map((task) => {
      if (task.id === id) {
        task.inprogress = true;
        return task;
      } else {
        return task;
      }
    });
    //Close the task menu & then sync with local state and local storage
    closeTaskMenu(taskListCopy);
  };

  //TURN THE COMPLETED PROPERTY OF THE CLICKED TASK TO TRUE
  const handleCompleted = (id) => {
    //When completed button is clicked turn all task whose inprogress==true to true
    let taskListCopy = taskList.map((task) => {
      if (task.id === id) {
        task.inprogress = false;
        return task;
      } else {
        return task;
      }
    });

    // then turn all the all task whose completed==false except for the one that was clicked to false
    taskListCopy = taskList.map((task) => {
      if (task.id === id) {
        task.completed = true;
        return task;
      } else {
        return task;
      }
    });
    //Close the task menu & then sync with local state and local storage
    closeTaskMenu(taskListCopy);
  };

  //THIS FUNCTION WILL CLOSE ANY TASK MENU THAT IS OPEN
  const closeTaskMenu = (taskList) => {
    const taskListCopy = taskList.map((task) => {
      task.openTaskModal = false;
      return task;
    });
    sync(taskListCopy);
  };

  // THIS FUNCTION GET ALL THE ACTIVE TASKS
  const getTotalActiveTask = () => {
    let allActiveTask = taskList.filter((task) => task.completed === false);
    return allActiveTask.length;
  };

  const ClearAllCompletedTasks = (arg) => {
    let allActiveTasks = arg.filter((task) => task.completed === false);
    sync(allActiveTasks);
  };

  //CLOSE ALL TASK MENU WHEN THIS COMPONENT LOADS FOR THE FIRST TIME
  useEffect(() => {
    closeTaskMenu(taskList);
  }, []);

  //FOR DEVELOPMENT PURPOSE
  useEffect(() => {
    //console.log(taskList);
    // localStorage.clear()
  });
  return (
    <div className='App'>
      <header className='App-header'>
        <TaskHeader
          taskList={taskList}
          ClearAllCompletedTasks={ClearAllCompletedTasks}
        />
      </header>
      <div>
        <EditTaskModal />
      </div>

      <main className='App-body'>
        <div>
          <TaskInput addToTaskList={addToTaskList} taskList={taskList} />
        </div>
        <div className='all-tasks-title'>
          <span>{getTotalActiveTask()} Active Tasks</span>
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
          openTheClickedTaskMenu={openTheClickedTaskMenu}
        />
      </main>
      <footer className='App-footer'></footer>
    </div>
  );
}

export default App;
//git commmit -a -m

/*  
let lg = console.log;
export const modifyLedgerItemActions = (formInputData) => (
  dispatch,
  getState
) => {
  const ledgerData = getState().ledgerData.slice();
  ledgerData.forEach((itms, i) => {
    if (formInputData.id === itms.id) {
      ledgerData.splice(i, 1, formInputData);
    }
  });

  dispatch({
    type: MODIFY_LEDGER_ITEM,
    payload: ledgerData,
  });
}; */
