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
    //  console.log(taskList);
    //console.log(uuidv4())
    //localStorage.clear()
  });

  const toggleRowModal = (id) => {
    //console.log(id);
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

    // console.log(modifiedTaskList);
    sync(modifiedTaskList);
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

  /*  */
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

/*   delete
const handleClick = (index) => {
    const List = list.slice();
    List.splice(index, 1);
    setList(List);
  };
 */
/*   
move to the top
const clickHandler = (item, index) => {
    const List = list.slice();
    List.splice(index, 1);
    List.unshift(item);
    setlist(List);
  }; */
