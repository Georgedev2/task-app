import { useState, useEffect } from "react";
import "./App.scss";
import { v4 as uuidv4 } from "uuid";

/* --------- IMPORTING COMPONENTS ----------- */
import TaskInput from "./components/task-input/TaskInput";
import TaskRow from "./components/task-list/TaskList";

function App() {
  const tasks = localStorage.getItem("taskApp")
    ? JSON.parse(localStorage.getItem("taskApp"))
    : [];
  const [taskList, setTasklist] = useState(tasks);

  //sych with localStorage and local state
  let sync = (_taskList) => {
    setTasklist(_taskList);
    localStorage.setItem("taskApp", JSON.stringify(_taskList));
  };

  //add To Task list from task input
  const addToTaskList = (e) => {
    let inputValue = e.target.value;
    let _taskList = [...taskList];

    if (inputValue && e.key === "Enter") {
      _taskList.push({
        id: uuidv4(),
        title: inputValue,
        completed: false,
        inprogress: false,
        openTaskModal: false,
      });
      // clear the input  field
      e.target.value = "";
    }

    sync(_taskList);
  };
  
  //for development purpose
  useEffect(() => {
    console.log(taskList);
  });

  const toggleRowModal = (input) => {
    let _taskList = [...taskList];
    console.log(input);

    _taskList.forEach((el) => {
      if ((input.id = el.id)) {
        el.openTaskModal = false;
      } else {
        el.openTaskModal = true;
      }
    });
    sync(_taskList);
  };

  return (
    <div className="App">
      <header className="App-header">
        <TaskInput addToTaskList={addToTaskList} />
      </header>
      <main className="App-body">
        <TaskRow
          taskList={taskList}
          setTasklist={setTasklist}
          toggleRowModal={toggleRowModal}
        />
      </main>
      <footer className="App-footer"></footer>
    </div>
  );
}

export default App;

/* [
    {
      id: 0,
      title: "Go to the market",
      completed: false,
      inprogress: false,
    },
    {
      id: 0,
      title: "Buy some meat",
      completed: false,
      inprogress: false,
    },
    {
      id: 0,
      title: "Visit some friends",
      completed: false,
      inprogress: false,
    },
  ] */
