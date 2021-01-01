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
      /*    _taskList.push({
        id: uuidv4(),
        title: inputValue,
        completed: false,
        inprogress: false,
        openTaskModal: false,
      }); */
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
      sync(_taskList);
    }

    //sync(_taskList);
  };

  //for development purpose
  useEffect(() => {
    console.log(taskList);
    //console.log(uuidv4())
  });

  const toggleRowModal = (input) => {
    // let taskList =[...taskList];
    /*  let taskList = taskList.slice();
    console.log(taskList); */
    taskList.forEach((task) => {
      if (task.id === input.id) {
        task.openTaskModal = true;
      } else {
        task.openTaskModal = false;
      }
    });
    console.log(taskList);
    //  sync(taskList);
    /*
    _taskList.forEach((el) => {
      if ((input.id = el.id)) {
        el.openTaskModal = false;
      } else {
        el.openTaskModal = true;
      }
    });
    sync(_taskList); */
  };

  /*  let deleteItemHandler = (i) => {
    let _todoList = todoList.slice();
    let anItem = _todoList.find((ele, index) => {
      return i === index;
    });

    let index = _todoList.indexOf(anItem);
    _todoList.splice(index, 1);

    //  _todoList.some((el, i) => {
    //   if (i === index) {
    //    _todoList.splice(i, 1);
    //   return true;
    //  }

    setTodoList(_todoList);
    localStorage.setItem("todoList123", JSON.stringify(_todoList));
  }; */
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
//git commmit -a -m
