import TaskManager from './TaskManager';
import React from 'react';
import { TaskProvider } from './TaskContext';
import './App.css';

function App() {
  return (
    <div>
      <React.StrictMode>
        <TaskProvider>
          <TaskManager/>
        </TaskProvider>
      </React.StrictMode>
      
    </div>
  );
}

export default App;
