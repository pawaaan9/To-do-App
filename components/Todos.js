import React from "react";
import TodoItem from "./TodoItem";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TodoFilter from "./TodoFilter";
import ThemeToggler from "./ThemeToggler";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("todos"));
    if (items) {
      setTodos(items);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const completeTodo = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  const addTodo = (text) => {
    const capitalizedText = text.charAt(0).toUpperCase() + text.slice(1);
    const newTodos = [
      {
        title: capitalizedText,
        completed: false,
        id: Math.random().toString(36).slice(2, 7),
      },
      ...todos,
    ];
    setTodos(newTodos);
  };

  const deleteTodo = (index) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const onDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(source.index, 1);
    items.splice(destination.index, 0, reorderedItem);

    setTodos(items);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    if (!input.trim()) {
      return;
    }
    addTodo(input);
    setInput("");
  };

  return (
    <div className="flex flex-col mt-20 max-w-[500px] w-full px-6 sm:px-0 z-50">
      <header className="flex justify-between items-center mb-16">
        <div>
          <h1 className="sm:text-4xl text-3xl font-bold uppercase text-white tracking-[.50em] text-left ">
            Todo
          </h1>
        </div>
        <div>
          <ThemeToggler />
        </div>
      </header>
      <form
        onSubmit={submitHandler}
        className="relative flex items-center mb-14"
      >
        <div className="w-6 h-6 absolute ml-5 border border-slate-300 rounded-full z-10 dark:border-[#393a4d] dark:text-[#4d5066]" />
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          type="text"
          className="absolute w-full p-4 pl-16  rounded-md focus:outline-none bg-[#fafafa] text-[#484b6a] dark:bg-[#25273c] dark:text-[#cacde8] placeholder:text-[#9293a4] "
          placeholder="Create a new todo"
        />
      </form>

      {todos.length ? (
        <>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="characters">
              {(provided) => (
                <ul
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="shadow-xl"
                >
                  {todos
                    .filter((t) => {
                      if (filterStatus === "all") return t;
                      else if (filterStatus === "active")
                        return t.completed === false;
                      else if (filterStatus === "completed")
                        return t.completed === true;
                    })
                    .map((todo, index) => (
                      <TodoItem
                        key={todo.id}
                        index={index}
                        todo={todo}
                        completeTodo={completeTodo}
                        deleteTodo={deleteTodo}
                      />
                    ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
          <TodoFilter
            todos={todos}
            filterStatus={filterStatus}
            setFilterStatus={setFilterStatus}
            clearCompleted={clearCompleted}
          />
          <div className="text-[#9293a4] text-sm text-center my-16  dark:text-[#777b93]">
            Drag and drop to reoder list
          </div>
        </>
      ) : (
        <div className="p-8  bg-[#fafafa] dark:bg-[#25273c] rounded-md text-center text-[#9293a4] shadow-md">
          No Todos! Add one
        </div>
      )}
    </div>
  );
}

export default Todos;