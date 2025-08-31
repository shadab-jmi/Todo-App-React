import React from 'react'
import { useTodo } from '../Contexts';

function TodoForm() {
    const [todo, setTodo] = React.useState("")
    const {addTodo} = useTodo()

    const add = (e) => {
        e.preventDefault();

        if(!todo) return

        addTodo({todo, completed: false})
        setTodo("")
    }

    return (
        <form onSubmit={add} className="flex shadow-lg rounded-xl overflow-hidden">
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-slate-600/50 rounded-l-xl px-4 py-3 outline-none duration-300 bg-slate-700/50 text-white placeholder-slate-400 focus:bg-slate-700/70 focus:border-purple-500/50 focus:shadow-lg focus:shadow-purple-500/20 transition-all"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
            />
            <button 
                type="submit" 
                className="rounded-r-xl px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shrink-0 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
            >
                Add
            </button>
        </form>
    );
}

export default TodoForm;

