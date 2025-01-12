import React from "react";
import IconCheck from "../public/images/IconCheck.svg";
import IconCross from "../public/images/IconCross.svg";
import { Draggable } from "react-beautiful-dnd";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function TodoItem({ todo, index, completeTodo, deleteTodo }) {
  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="group border-b-[1px] border-[#d3d4db] bg-[#fafafa] dark:bg-[#25273c] dark:border-[#393a4d]  p-4 px-5 text-[#484b6a] dark:text-[#cacde8] first:rounded-t-md "
        >
          <div className="flex items-center justify-between relative">
            <button
              onClick={() => completeTodo(index)}
              className={
                todo.completed
                  ? "w-6 h-6 absolute border bg-gradient-to-br from-[#57DDFF] to-[#C058F3] dark:border-none  rounded-full z-20 cursor-pointer flex justify-center items-center"
                  : "w-6 h-6 absolute border-gradient-br-slate-300-zinc-white gradient-border-1 rounded-full z-20 cursor-pointer hover:border-gradient-br-purple-blue-zinc-white dark:border-gradient-br-grayish-blue-dark-blue dark:hover:border-gradient-br-purple-blue-dark-blue"
              }
            >
              {todo.completed ? <IconCheck /> : ""}
            </button>
            <p
              onClick={() => completeTodo(index)}
              className={
                todo.completed
                  ? "line-through text-[#d3d4db] dark:text-[#4d5066] pl-12 cursor-pointer"
                  : "pl-12 cursor-pointer"
              }
            >
              {capitalizeFirstLetter(todo.title)}
            </p>
            <div
              onClick={() => {
                deleteTodo(index);
              }}
              className="mr-2"
            >
              <IconCross className="sm:hidden ml-3 group-hover:block cursor-pointer" />
            </div>
          </div>
        </li>
      )}
    </Draggable>
  );
}

export default TodoItem;