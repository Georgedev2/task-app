import { useState } from "react";
import "./App.scss";

function App() {
  const [taskList, setTasklist] = useState([
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
  ]);
  const addToTaskList = (e) => {
    let task = e.target.value;
    let _taskList = [...taskList];
    if (task && e.key === "Enter") {
      // clear the input  field
    //  e.target.value = "";
      /*  _taskList.push(task);
      */
    }
    // sync(_todoList);
  };
  return (
    <div className="App">
      <header className="App-header">
        <div className="input-wrapper">
          <input
            type="text"
            className="task-input"
            placeholder="Enter a task..."
            onKeyDown={addToTaskList}
          />
        </div>
      </header>
      <main className="App-body"></main>
      <footer className="App-header"></footer>
    </div>
  );
}

export default App;

/* globalNav-search-0318 {
    color: rgb(255, 255, 255) !important;
    width: 100% !important;
    border: 1px solid rgb(135, 149, 150) !important;
    height: 30px !important;
    position: relative !important;
    font-size: 14px !important; 
    box-sizing: border-box !important;
    font-family: "Amazon Ember", "Helvetica Neue", Roboto, Arial, sans-serif !important;
     border-radius: 2px !important; 
    background-color: transparent !important;
    appearance: textfield !important;
} */
