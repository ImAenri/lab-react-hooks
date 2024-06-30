import React, { useContext, useState, useEffect, useMemo, useCallback, useRef} from 'react';
import './TaskManager.css';
import { TaskContext } from './TaskContext';

function TaskManager() {
    const { state, dispatch } = useContext(TaskContext);
    const [tasks, setTasks] = useState([]);
    const [newTaskText, setNewTaskText] = useState('');
    const [filter, setFilter] = useState('all');
    const inputRef = useRef(null);

    const handleAddTask = () => {
        const newTask = {
          id: tasks.length + 1,
          text: newTaskText,
          completed: false
        };
        setTasks([...tasks, newTask]);
        setNewTaskText('')
        dispatch({ type: 'ADD_TASK', payload: newTask });
        inputRef.current.focus();
      };
    
      const handleToggleCompleted = useCallback((task) => {
        dispatch({
          type: 'UPDATE_TASK',
          payload: { ...task, completed: !task.completed },
        });
      }, [dispatch]);

      const deleteTask = useCallback((taskId) => {
        dispatch({ type: 'DELETE_TASK', payload: taskId }); 
      }, [dispatch]);

      const markTaskDone = useCallback((taskId) => {
        const task = state.tasks.find(task => task.id === taskId);
        if (task) {
          dispatch({
            type: 'UPDATE_TASK',
            payload: { ...task, completed: !task.completed },
          });
        }
      }, [dispatch, state.tasks]);

      const filteredTasks = useMemo(() => {
        switch (filter) {
          case 'completed':
            return state.tasks.filter(task => task.completed);
          case 'incomplete':
            return state.tasks.filter(task => !task.completed);
          default:
            return state.tasks;
        }
      }, [state.tasks, filter]);
    

      useEffect(() => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
          setTasks(JSON.parse(storedTasks));
        }
      }, []);
    
      useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
      }, [tasks]);


    return (
        <div className='specialDiv'>
            <h1>Task Manager</h1>
            <input
            type="text"
            value={newTaskText}
            onChange={(e) => setNewTaskText(e.target.value)}
            placeholder="Enter New Task"
            ref={inputRef}
            />
            <button onClick={handleAddTask}>Add Task</button>
            <div>
              <button onClick={() => setFilter('all')}>All</button>
              <button onClick={() => setFilter('completed')}>Completed</button>
              <button onClick={() => setFilter('incomplete')}>Incomplete</button>
            </div>
            <ul>
            {filteredTasks.map((task) => (
                <li key={task.id} className={task.completed ? 'completed' : ''}>
                  <span
                    style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                    onClick={() => handleToggleCompleted(task)}
                  >
                    {task.text}
                  </span>
                  <button onClick={() => markTaskDone(task.id)}>Done</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </li>
            ))}
            </ul>
        </div>
    );
  }
  
  export default TaskManager;