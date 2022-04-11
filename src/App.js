import { useState } from "react"
import AddTask from "./components/AddTask";
import Header from "./components/Header";
import Tasks from "./components/Tasks";

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Doctors Appointment',
      day: 'Feb 5th at 2:30pm',
      reminder: true
    },
    {
      id: 2,
      text: 'Meeting at School',
      day: 'Feb 6th at 1:30pm',
      reminder: true
    },
    {
      id: 3,
      text: 'food shopping',
      day: 'Feb 5th at 2:30pm',
      reminder: false
    }
  ])

  //add task
  const addTask = (task) => {
    // console.log('add task done', task);
    // generate a random id for the new task
    const id = Math.floor(Math.random() * 100) + 1
    const newTask = { id, ...task };
    setTasks([...tasks, newTask]);
  }

  //delete task
  const deleteTask = (id) => {
    // console.log('task deleted', id);
    setTasks(tasks.filter((task) => task.id !== id))
  }

  //toggle reminder
  const toggleReminder = (id) => {
    // console.log('toggle', id);
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, reminder: !task.reminder } : task
    ))
  }

  return (
    <div className="container">
      <Header />
      <AddTask onAdd={addTask} />
      {tasks.length > 0 ? <Tasks tasks={tasks} onToggle={toggleReminder} onDelete={deleteTask} /> : 'there is no task'}
    </div>
  );
}

export default App;
