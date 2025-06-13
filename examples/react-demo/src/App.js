import React from 'react';
import DynamicForm from './components/DynamicForm';
import { userFormSchema } from './schemas/user-form';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <h1>Schema转换系统 - React示例</h1>
      <div className="form-demo">
        <DynamicForm schema={userFormSchema} />
      </div>
    </div>
  );
}

export default App;
