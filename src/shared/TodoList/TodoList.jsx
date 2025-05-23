import TodoListItem from "../TodoList/TodoListItem";



const TodoList = ({ todoList, onCompleteTodo, onUpdateTodo, isLoading}) => {

  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted)
  return (
    <ul>
      {isLoading ? 
      (<li>Loading.....</li>): filteredTodoList.length === 0 ? (<li>"add todo above to get started"</li>) : 
      (filteredTodoList.map((todo) => <TodoListItem  onUpdateTodo={onUpdateTodo} key={todo.id} todo={todo} onCompleteTodo={onCompleteTodo} />))
     }
    </ul>
  );
};

export default TodoList;
