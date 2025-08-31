import React, { useState } from 'react'
import { useTodo } from '../Contexts';

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false)
    const [todoMsg, setTodoMsg] = useState(todo.todo)
    const {updateTodo, toggleComplete, deleteTodo} = useTodo()

    const editTodo = () => {
        updateTodo(todo.id, {...todo, todo: todoMsg})
        setIsTodoEditable(false)
    }

    const toggleCompleted = () => {
        toggleComplete(todo.id)
    }

    return (
        <div
            className={`flex items-center border rounded-xl px-4 py-3 gap-x-4 shadow-lg transition-all duration-500 ease-in-out transform hover:scale-[1.02] hover:shadow-xl ${
                todo.completed 
                    ? "bg-gradient-to-r from-emerald-800/80 to-green-800/80 border-emerald-600/50 shadow-emerald-900/20" 
                    : "bg-gradient-to-r from-slate-700/80 to-slate-600/80 border-slate-500/50 shadow-slate-900/30"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer w-5 h-5 rounded-md bg-slate-600 border-slate-400 text-emerald-500 transition-all duration-300 focus:ring-2 focus:ring-emerald-500/50 flex-shrink-0"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg text-white placeholder-slate-400 transition-all duration-300 ${
                    isTodoEditable 
                        ? "border-purple-400/50 px-3 py-1 bg-slate-800/50 focus:border-purple-400 focus:shadow-lg focus:shadow-purple-500/20" 
                        : "border-transparent"
                } ${todo.completed ? "line-through text-slate-300" : ""}`}
                value={todoMsg}
                onChange={(e) => setTodoMsg(e.target.value)}
                readOnly={!isTodoEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-10 h-10 rounded-xl text-lg border border-slate-600/50 justify-center items-center bg-slate-600/50 hover:bg-purple-600/60 hover:border-purple-500/50 transition-all duration-300 ease-in-out shrink-0 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-110 active:scale-95"
                onClick={() => {
                    if (todo.completed) return;

                    if (isTodoEditable) {
                        editTodo();
                    } else setIsTodoEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                <span className="transition-transform duration-300">
                    {isTodoEditable ? "💾" : "✏️"}
                </span>
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-10 h-10 rounded-xl text-lg border border-slate-600/50 justify-center items-center bg-slate-600/50 hover:bg-red-600/60 hover:border-red-500/50 transition-all duration-300 ease-in-out shrink-0 hover:scale-110 active:scale-95"
                onClick={() => deleteTodo(todo.id)}
            >
                <span className="transition-transform duration-300">🗑️</span>
            </button>
        </div>
    );
}

export default TodoItem;