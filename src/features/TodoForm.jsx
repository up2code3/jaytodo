import { useRef, useState} from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";


const TodoForm = ({onAddTodo}) => {
    const [workingTodoTitle, setWorkingTodoTitle] = useState("")
    const todoTitleInput = useRef(null)
    
    const handleAddTodo = (event) => {
        event.preventDefault()
      
        onAddTodo(workingTodoTitle);

 setWorkingTodoTitle("")
        todoTitleInput.current.focus()
    }


    return(
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel 
            labelText="Todo"
id="todoTitle"
            value={workingTodoTitle}
            elementId="todoTitle" 
            ref={todoTitleInput}  
            onChange={(event) => setWorkingTodoTitle(event.target.value)}  
            />
            <button disabled={workingTodoTitle === ''}>Add Todo</button>
        </form>
    )
}

export default TodoForm