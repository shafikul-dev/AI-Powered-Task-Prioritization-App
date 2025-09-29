import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { TasksProvider } from './context/TasksContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <TasksProvider>
      <RouterProvider router={router} />
    </TasksProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
