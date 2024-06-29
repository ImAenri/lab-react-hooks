import React, {useState, useEffect} from 'react';
import './TaskManager.css';

function TaskManager() {
    const [tasks, setTasks] = useState([]);
    const [newTaskText, setNewTaskText] = useState('');

    const handleAddTask = () => {
        const newTask = {
          id: tasks.length + 1,
          text: newTaskText,
          completed: false
        };
        setTasks([...tasks, newTask]);
        setNewTaskText('');
      };
    
    const handleToggleCompleted = (taskId) => {
        setTasks(
          tasks.map((task) => {
            if (task.id === taskId) {
              return { ...task, completed: !task.completed };
            }
            return task;
          })
        );
      };


    useEffect(() => {
        document.title = 'Added a new task!' ;
    })


    return (
        <div className='specialDiv'>
            <h1>Task Manager</h1>
            <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Enter New Task"
            />
            <button onClick={handleAddTask}>Add Task</button>
            <ul>
            {tasks.map((task) => (
                <li key={task.id}>
                <input
                    type="checkbox"
                    checked={task.completed}
                    onChange={() => handleToggleCompleted(task.id)}
                />
                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                    {task.text}
                </span>
                </li>
            ))}
            </ul>
        </div>
    );
  }
  
  export default TaskManager;