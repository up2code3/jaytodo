import TodoListItem from "./TodoListItem"

const todos = [
    {id: 1, title: "review resources"},
    {id:2, title: "take notes"},
    {id:3, title: "code out app"},
  ]

const TodoList = () => {
    return (
        <ul>
        {todos.map(todo => <TodoListItem todo={todo} key={todo.id}/>)}
      </ul>
    )
}

export default TodoList