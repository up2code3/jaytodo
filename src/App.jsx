import "./App.css";
import TodoList from "./shared/TodoList/TodoList";
import TodoForm from "./features/TodoForm";
import { useState } from "react";

// Dummy light components for this to work
const GreenLight = () => <div style={{ backgroundColor: 'green', width: 1000, height: 10 }} />;
const YellowLight = () => <div style={{ backgroundColor: 'yellow', width: 1000, height: 10 }} />;
const RedLight = () => <div style={{ backgroundColor: 'red', width: 1000, height: 10 }} />;
function App() {
  const [todoList, setTodoList] = useState([]);

  //updateTodoHandler 
  const updateTodoHandler = (editedTodo) => {
    const updatedTodos = todoList.map((todo) => 
      todo.id === editedTodo.id ?
      {...editedTodo} : todo 
    )
    setTodoList(updatedTodos)
  }


  //complete todo helper
  const completeTodo = (id) => {
    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: true } : todo
    );
    setTodoList(updatedTodos);
  };


  //eventhandler
  const addTodo = (title) => {
    const newTodo = {
      title: title,
      id: Date.now(),
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
  };




  const [trafficLightColor, setTrafficLightColor] = useState('green');
  function cycleLight() {
    switch (trafficLightColor) {
      case 'green':
        setTrafficLightColor('yellow');
        return;
      case 'yellow':
        setTrafficLightColor('red');
        return;
      default:
        setTrafficLightColor('green');
        return;
    }
  }
  function renderLight() {
    switch (trafficLightColor) {
      case 'green':
        return <YellowLight />;
      case 'yellow':
        return <RedLight />;
      default:
        return <GreenLight />;
    }
  }
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onCompleteTodo={completeTodo} onUpdateTodo={updateTodoHandler} />
      {renderLight()}
      <button type="button" onClick={cycleLight}>
      Cycle Light
    </button>
    </div>
  );
}

export default App;
