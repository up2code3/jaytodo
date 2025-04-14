import { useRef } from "react";


const TodoForm = ({onAddTodo}) => {
    const todoTitleInput = useRef(null)
    
    const handleAddTodo = (event) => {
        event.preventDefault()
        const title = event.target.title.value
        onAddTodo(title);
        console.log(  event.target.title.value)
        event.target.title.value = "";
        todoTitleInput.current.focus()
    }


    return(
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle"> Todo </label>
            <input type="text" id="todoTitle" name="title" ref={todoTitleInput}/>
            <button>Add Todo</button>
        </form>
    )
}

export default TodoForm