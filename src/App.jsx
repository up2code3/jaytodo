import "./App.css";
import TodoList from "./shared/TodoList/TodoList";
import TodoForm from "./features/TodoForm";
import { useState, useEffect } from "react";
import TodosViewForm from "./features/TodosViewForm";


const token = `Bearer ${import.meta.env.VITE_PAT}`;


const url = `https://api.airtable.com/v0/${import.meta.env.VITE_BASE_ID}/${
  import.meta.env.VITE_TABLE_NAME
}`;


//URL encoder
const encodeUrl = ({ sortField, sortDirection, queryString }) => {
  let searchQuery = "";
  let sortQuery = `sort[0][field]=${sortField}&sort[0][direction]=${sortDirection}`;
  if(queryString){
    searchQuery = `&filterByFormula=SEARCH("${queryString}",+title)`;
  }
  return encodeURI(`${url}?${sortQuery}${searchQuery}`);
};

// Dummy light components for this to work
const GreenLight = () => (
  <div style={{ backgroundColor: "green", width: 1000, height: 10 }} />
);
const YellowLight = () => (
  <div style={{ backgroundColor: "yellow", width: 1000, height: 10 }} />
);
const RedLight = () => (
  <div style={{ backgroundColor: "red", width: 1000, height: 10 }} />
);
function App() {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [sortField, setSortField] = useState("createdTime");
  const [sortDirection, setSortDirection] = useState("desc");
  const [queryString, setQueryString] = useState("")

  console.log(setSortDirection, setSortField);
  useEffect(() => {
    const fetchTodos = async () => {
      setIsLoading(true);
      const options = {
        method: "GET",
        headers: { Authorization: token },
      };
      try {
        const resp = await fetch(
          encodeUrl({ sortField, sortDirection, queryString }),
          options
        );

        if (!resp.ok) {
          throw new Error(resp.status);
        }

        let data = await resp.json();

        const fetchTodos = data.records.map((record) => {
          const example = {
            id: record.id,
            ...record.fields,
          };

          if (example.booleanProperty) {
            example.booleanProperty = false;
          }

          return example;
        });
        setTodoList([...fetchTodos]);
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTodos();
  }, [sortDirection, sortField, queryString]);

  //updateTodoHandler
  const updateTodoHandler = async (editedTodo) => {
    const originalTodo = todoList.find((todo) => todo.id === editedTodo.id);

    const payload = {
      records: [
        {
          id: editedTodo.id,
          fields: {
            title: editedTodo.title,
            isCompleted: editedTodo.isCompleted,
          },
        },
      ],
    };

    const updatedTodos = todoList.map((todo) =>
      todo.id === editedTodo.id ? { ...editedTodo } : todo
    );
    setTodoList(updatedTodos);
    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );

      if (!resp.ok) {
        throw new Error(
          `Fetch failed with status: ${resp.status} ${resp.statusText}`
        );
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(`${error.message}. Reverting todo...`);
      const revertedTodo = todoList.map((todo) =>
        todo.id === originalTodo.id ? { ...originalTodo } : todo
      );
      setTodoList([...revertedTodo]);
    } finally {
      isSaving(false);
    }
  };

  //complete todo helper
  const completeTodo = async (id) => {
    const originalTodo = todoList.find((todo) => todo.id === id);

    const payload = {
      records: [
        {
          id: id,
          fields: {
            title: originalTodo.title,
            isCompleted: true,
          },
        },
      ],
    };

    const options = {
      method: "PATCH",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );

      if (!resp.ok) {
        throw new Error(
          `Fetch failed with status: ${resp.status} ${resp.statusText}`
        );
      }
    } catch (error) {
      console.log(error.message);
      setErrorMessage(`${error.message}. Reverting todo... back to original`);
      const revertedTodo = todoList.map((todo) =>
        todo.id === originalTodo.id ? { ...originalTodo } : todo
      );
      setTodoList([...revertedTodo]);
    } finally {
      isSaving(false);
    }

    const updatedTodos = todoList.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: true } : todo
    );
    setTodoList(updatedTodos);
  };

  //eventhandler
  const addTodo = async (newTodo) => {
    const payload = {
      records: [
        {
          fields: {
            title: newTodo.title,
            isCompleted: newTodo.isCompleted,
          },
        },
      ],
    };

    const options = {
      method: "POST",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    };

    try {
      setIsSaving(true);

      const resp = await fetch(
        encodeUrl({ sortField, sortDirection, queryString }),
        options
      );

      if (!resp.ok) {
        throw new Error(resp.status);
      }

      const { records } = await resp.json();
      const { id, fields } = records[0];

      const savedTodo = {
        id,
        ...fields,
      };
      console.log("Saved todo:", savedTodo, records[0]);

      if (!records[0].fields.isCompleted) {
        savedTodo.isCompleted = false;
      }

      setTodoList([...todoList, savedTodo]);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSaving(false);
    }
  };

  const [trafficLightColor, setTrafficLightColor] = useState("green");
  function cycleLight() {
    switch (trafficLightColor) {
      case "green":
        setTrafficLightColor("yellow");
        return;
      case "yellow":
        setTrafficLightColor("red");
        return;
      default:
        setTrafficLightColor("green");
        return;
    }
  }
  function renderLight() {
    switch (trafficLightColor) {
      case "green":
        return <YellowLight />;
      case "yellow":
        return <RedLight />;
      default:
        return <GreenLight />;
    }
  }
  return (
    <div>
      <h1>Todo List</h1>
      <TodoForm onAddTodo={addTodo} isSaving={isSaving} />
      <TodoList
        todoList={todoList}
        onCompleteTodo={completeTodo}
        onUpdateTodo={updateTodoHandler}
        isLoading={isLoading}
      />
      <hr />
      <TodosViewForm
      queryString={queryString}
      setQueryString={setQueryString}
      sortField={sortField}
      setSortField={setSortField}
      sortDirection={sortDirection}
      setSortDirection={setSortDirection}
      />
      <hr />

      {errorMessage && (
        <div>
          <hr />
          <p>{errorMessage}</p>
          <button onClick={() => setErrorMessage("")}>Dismiss</button>
        </div>
      )}

      {renderLight()}
      <button type="button" onClick={cycleLight}>
        Cycle Light
      </button>
    </div>
  );
}

export default App;
