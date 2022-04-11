import { useState, useEffect } from "react"
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    }
    getTasks();
  }, []);

  //fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:8080/tasks');
    const data = await res.json();
    // console.log('tasks data', data);
    return data;
  };

  //add task
  const addTask = async (task) => {
    // console.log('add task done', task);
    // generate a random id for the new task
    // const id = Math.floor(Math.random() * 100) + 1
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
    const res = await fetch('http://localhost:8080/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await res.json();

    setTasks([...tasks, data]);
  };

  //delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:8080/tasks/${id}`, { method: 'DELETE' });
    // console.log('task deleted', id);
    setTasks(tasks.filter((task) => task.id !== id))
  };

  //toggle reminder
  const toggleReminder = (id) => {
    // console.log('toggle', id);
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder } : task
    ))
  };

  return (
    <div className="container">
      <Header showAdd={showAddTask} onClick={() => setShowAddTask(!showAddTask)} />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? <Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask} /> : 'there is no task'}
    </div>
  );
}

export default App;
