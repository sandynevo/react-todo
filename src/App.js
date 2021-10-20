import "./styles.css";
import React from "react";

export default function App() {
  const [todos, setTodos] = React.useState([
    { id: 1, text: "Buy Grocerises", done: false },
    { id: 2, text: "Cook Food", done: false },
    { id: 3, text: "Make Bed", done: false }
  ]);

  return (
    <div className="App">
      <h1>Todo List</h1>
      <TodoList todos={todos} setTodos={setTodos} />
      <h2> Add Todo</h2>
      <AddTodo setTodos={setTodos} />
    </div>
  );
}

function TodoList1({ setTodos, todos }) {
  console.log(todos);
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done
          }
        : t
    );
    console.log(updatedTodos);
    console.log(todos);
    setTodos(updatedTodos);
  }
  return (
    <ul>
      {todos.map((todo) => (
        <li
          onDoubleClick={handleToggleTodo(todo)}
          style={{ textDecoration: todo.done ? "line-through" : "" }}
          key={todo.id}
        >
          {todo.text}
        </li>
      ))}
    </ul>
  );
}
function TodoList({ todos, setTodos }) {
  function handleToggleTodo(todo) {
    const updatedTodos = todos.map((t) =>
      t.id === todo.id
        ? {
            ...t,
            done: !t.done
          }
        : t
    );
    setTodos(updatedTodos);
  }

  if (!todos.length) {
    return <p>No todos left!</p>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li
          onDoubleClick={() => handleToggleTodo(todo)}
          style={{
            textDecoration: todo.done ? "line-through" : ""
          }}
          key={todo.id}
        >
          {todo.text}
          <DeleteTodo todo={todo} setTodos={setTodos} />
        </li>
      ))}
    </ul>
  );
}

function AddTodo({ setTodos, todos }) {
  const inputRef = React.useRef();
  function handleAddTodo(event) {
    event.preventDefault();
    const text = event.target.elements.addTodo.value;
    //event.target.elements.todos.length;

    setTodos((prevTodos) => {
      const id = Math.random();
      const todo = {
        id,
        text,
        done: false
      };
      console.log(prevTodos.length);
      return prevTodos.concat(todo);
    });
    inputRef.current.value = "";
  }

  return (
    <form onSubmit={handleAddTodo}>
      <input type="text" name="addTodo" ref={inputRef} placeholder="Add Todo" />
      <button type="submit">Add </button>
    </form>
  );
}

function DeleteTodo({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirm = window.confirm("Do you want to delete this?");
    if (confirm) {
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
      });
    }
  }
  return (
    <span
      style={{
        color: "red",
        fontWeight: "bold",
        marginLeft: "10px",
        curser: "pointer"
      }}
      onClick={handleDeleteTodo}
      role="button"
    >
      X
    </span>
  );
}

function DeleteTodo1({ todo, setTodos }) {
  function handleDeleteTodo() {
    const confirmed = window.confirm("Do you want to delete this?");
    if (confirmed) {
      setTodos((prevTodos) => {
        return prevTodos.filter((t) => t.id !== todo.id);
      });
    }
  }

  return (
    <span
      onClick={handleDeleteTodo}
      role="button"
      style={{
        color: "red",
        fontWeight: "bold",
        marginLeft: 10,
        cursor: "pointer"
      }}
    >
      x
    </span>
  );
}
