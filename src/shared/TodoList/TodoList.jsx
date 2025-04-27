import TodoListItem from "../TodoList/TodoListItem";



const TodoList = ({ todoList, onCompleteTodo, onUpdateTodo}) => {

  const filteredTodoList = todoList.filter((todo) => !todo.isCompleted)
  return (
    <ul>
      {filteredTodoList.length === 0 ? (
        <li>"add todo above to get started"</li>
      ) : (
       filteredTodoList.map((todo) => <TodoListItem  onUpdateTodo={onUpdateTodo} key={todo.id} todo={todo} onCompleteTodo={onCompleteTodo} />)
      )}
    </ul>
  );
};

export default TodoList;
