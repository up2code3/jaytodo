import TextInputWithLabel from "../TextInputWithLabel";
import { useState, useEffect } from "react";

const TodoListItem = ({ todo, onCompleteTodo, onUpdateTodo }) => {
    
  const [isEditing, setIsEditing] = useState(false);

  const [workingTitle, setWorkingTitle] = useState(todo.title)

useEffect(() => {
  setWorkingTitle(todo.title);
},[todo] )

const handleUpdate = (event) => {
if (!isEditing){
  return 
}
event.preventDefault()
onUpdateTodo(
  {...todo,
  title:workingTitle,}
) 
setIsEditing(false)
}

  const handleCancel = () => {
setWorkingTitle(todo.title)
setIsEditing(false)
  }

    const handleEdit = (event) => {
setWorkingTitle(event.target.value)
    }

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
        <button type="button" onClick={handleCancel}> Cancel</button>
        <button type="button" onClick={handleUpdate}> Update</button>
      </form>
    </li>
  );
};

export default TodoListItem;
