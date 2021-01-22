import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function useTask() {
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
  return {
    taskList,
    completedTask,
    addToTaskList,
    toggleRowModal,
    deleteATaskItem,
    moveClickedTaskToTop,
    handleInprogress,
    handleCompleted,
    getTotalCompletedTask,
    closeTaskMenu,
  };
}

export default useTask;
