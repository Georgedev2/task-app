import { useState, useEffect } from "react";
import "./App.scss";
import { v4 as uuidv4 } from "uuid";

/* --------- IMPORTING COMPONENTS ----------- */
import TaskInput from "./components/task-input/TaskInput";
import TaskList from "./components/task-list/TaskList";

function App() {
  const tasks = localStorage.getItem("taskApp")
    ? JSON.parse(localStorage.getItem("taskApp"))
    : [];
  const [taskList, setTasklist] = useState(tasks);
  const [completedTask, setCompletedTask] = useState(0);

  //SYNC WITH LOCALSTORAGE & LOCAL STATE
  let sync = (_taskList) => {
    setTasklist(_taskList);
    localStorage.setItem("taskApp", JSON.stringify(_taskList));
    getTotalCompletedTask();
  };

  //ADD TO TASK LIST FROM TASK INPUT
  const addToTaskList = (e) => {
    let inputValue = e.target.value;
    if (inputValue && e.key === "Enter") {
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
      e.target.value = "";
      //sync with local state and local storage
      sync(_taskList);
    }
  };

  //FOR DEVELOPMENT PURPOSE
  useEffect(() => {
    console.log(taskList);
  });

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
  const moveClickedTaskToTop = (task, index) => {
    //make copy of the taskList using map
    const taskListCopy = taskList.map((el) => el);
    taskListCopy.splice(index, 1);
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

  return (
    <div className="App">
      <header className="App-header"></header>
      <div>
        <div>
          <span>Task for</span> <span>{new Date().toISOString()}</span>
        </div>
        <div>
          <span>Total Completed Task</span> 
          <span>{completedTask}</span>
        </div>
        <div>
          <span>Total Task</span>
          <span>{taskList.length}</span>
        </div>
      </div>
      <div>
        <TaskInput addToTaskList={addToTaskList} />
      </div>
      <main className="App-body">
        <TaskList
          taskList={taskList}
          setTasklist={setTasklist}
          onToggleRowModal={toggleRowModal}
          onDeleteATaskItem={deleteATaskItem}
          onMoveClickedTaskToTop={moveClickedTaskToTop}
          onHandleInprogress={handleInprogress}
          onHandleCompleted={handleCompleted}
          onCloseTaskMenu={closeTaskMenu}
        />
      </main>
      <footer className="App-footer"></footer>
    </div>
  );
}

export default App;
//git commmit -a -m
/* Avoid duplication and extract re-usable modules where it makes sense, but don't break things apart needlessly. We want to see that you can create a codebase that is easy to maintain. */

/* 
Organize your code with components. Extract components that help you avoid duplication, but don't break things apart needlessly. We want to see that you can implement the UI with sound HTML semantics. */
