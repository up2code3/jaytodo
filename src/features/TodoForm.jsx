import { useRef, useState } from "react";
import TextInputWithLabel from "../shared/TextInputWithLabel";

const TodoForm = ({ onAddTodo, isSaving }) => {
    const [workingTodoTitle, setWorkingTodoTitle] = useState("");
    const todoTitleInput = useRef(null);

    const handleAddTodo = (event) => {
        event.preventDefault();
        if (workingTodoTitle.trim() === "") return; // Prevent adding empty todo

        onAddTodo({
            title: workingTodoTitle,
            isCompleted:false
        });
        setWorkingTodoTitle("");
        todoTitleInput.current.focus();
    };

    return (
        <form onSubmit={handleAddTodo}>
            <TextInputWithLabel
                labelText="Todo"
                id="todoTitle"
                value={workingTodoTitle}
                elementId="todoTitle"
                ref={todoTitleInput}
                onChange={(event) => setWorkingTodoTitle(event.target.value)}
            />
            <button disabled={workingTodoTitle.trim() === "" || isSaving}>
                {isSaving ? "Saving..." : "Add Todo"}
            </button>
        </form>
    );
};

export default TodoForm;