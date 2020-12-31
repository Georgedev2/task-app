import "./task-input.scss";

const TaskInput = ({ addToTaskList }) => {
  return (
    <div className="input-wrapper">
      <input
        type="text"
        placeholder="Enter a task..."
        onKeyDown={addToTaskList}
        className="task-input"
      />
    </div>
  );
};

export default TaskInput;
