import { useEffect ,useRef} from "react";

export default function AddTask({taskList, setTaskList, task, setTask}) {
  function handleSubmit(e) {
    e.preventDefault();
    const taskValue = e.target.task.value.trim ();
    if(!taskValue){
      alert("Task cannot be empty.");
      return;
    }
    if (task.id) {
      const date = new Date();
      const updatedTaskList = taskList.map((todo) =>
        todo.id === task.id ? {
          id: task.id,
          name: task.name,
          time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`
        } : todo
      );
      setTaskList(updatedTaskList);
    } else {
      const date = new Date();
      const newTask = {
        id: date.getTime(),
        name: e.target.task.value,
        time: `${date.toLocaleTimeString()} ${date.toLocaleDateString()}`
      };
      setTaskList([...taskList, newTask]);
    }
    setTask({});
  }
  const inputRef =useRef(null);
  useEffect(()=>{
    if(task.id && inputRef.current){
      inputRef.current.focus();
      // Set cursor position to the end of the text
const length = inputRef.current.value.length;
inputRef.current.setSelectionRange(length, length);

    }
    },[task.id]);

  return (
    <section className="addTask">
      <form onSubmit={handleSubmit}>
        <input
        ref={inputRef}
          onChange={(e) => setTask({...task, name: e.target.value})}
          value={task.name || ""}
          type="text"
          placeholder="Add Task"
          name="task"
          autoComplete="off"
          maxLength={25}
        />
        <button type="submit">{task.id ? "Update" : "Add"}</button>
      </form>
    </section>
  );
}