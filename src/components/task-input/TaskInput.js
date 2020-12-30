import { useState } from "react";

const TaskInput = () => {
  return (
    <div className="input-wrapper">
      <input
        type="text"
        placeholder="Enter a task..."
        onKeyDown={addItemHandler}
        className={`todo-input ${showBorder && "danger"}`}
      />
    </div>
  );
};

export default TaskInput;
