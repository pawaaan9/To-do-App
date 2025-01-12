import React from "react";

function TodoFilter({ filterStatus, setFilterStatus, clearCompleted, todos }) {
  const handleClick = (status) => {
    setFilterStatus(status);
  };

  const buttons = [
    { label: "All", value: "all" },
    { label: "Active", value: "active" },
    { label: "Completed", value: "completed" },
  ];

  return (
    <div>
      <div className="p-4 px-4 flex justify-between text-sm bg-[#fafafa] dark:bg-[#25273c] rounded-md rounded-t-none text-[#9293a4] dark:text-[#4d5066] shadow-xl ">
        <div>{`${todos.length} items left`}</div>
        <div className="hidden sm:flex justify-center gap-4 cursor-pointer font-bold">
          {buttons.map((b, index) => (
            <button
              key={index}
              className={
                filterStatus === b.value
                  ? "text-[#3a7bfc]"
                  : "hover:text-[#484b6a] dark:hover:text-[#e4e5f1]"
              }
              onClick={() => handleClick(b.value)}
            >
              {b.label}
            </button>
          ))}
        </div>
        <div className="cursor-pointer ">
          <button
            className="hover:text-[#484b6a] dark:hover:text-[#e4e5f1]"
            onClick={() => clearCompleted()}
          >
            Clear Completed
          </button>
        </div>
      </div>

      {/*Mobile*/}
      <div className="sm:hidden p-4 mt-6 px-4 flex justify-center gap-4 text-sm bg-[#fafafa] dark:bg-[#25273c] font-bold rounded-md text-[#9293a4] dark:text-[#4d5066] shadow-xl">
        {buttons.map((b, index) => (
          <button
            key={index}
            className={
              filterStatus === b.value
                ? "text-[#3a7bfc]"
                : "hover:text-[#484b6a] dark:hover:text-[#e4e5f1]"
            }
            onClick={() => handleClick(b.value)}
          >
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TodoFilter;
