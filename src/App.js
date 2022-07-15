import { UseReducer } from './UserReducer.js';
import { ClassState } from './ClassState.js';
import './App.css';

function App() {
  return (
    <div className="App">
      <UseReducer name="UseReducer"/>
      <ClassState name="ClassState"/>
    </div>
  );
}

export default App;
